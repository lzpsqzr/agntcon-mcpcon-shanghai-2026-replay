window.talk = {
  title: "From MCP Tools to Managed Agents（从 MCP 工具到托管 Agent）",
  speaker: "赵庆杰 · 阿里云 Sandbox",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 1",
  pdf: "pdfs/fc-sandbox.pdf",
  assets: "assets/fc-sandbox",
  source: "EWFH-7055-transcript.txt",
  cues: [
    {
      start: "09:05:14", end: "09:07:25", slide: 1,
      label: "标题页：可信、可追溯的沙箱执行环境",
      transcript: "Let me briefly introduce myself first: I come from Alibaba Cloud and am currently responsible for Alibaba Cloud's FC sandbox. The topic today is how we help businesses quickly build a trusted, traceable, and securely executable sandbox environment. Today's agents can already do simple things like writing an email or code development, but the real challenge appears in production: if an agent performs queries or modifications on an existing database, abnormal situations may make the model retry, insert multiple entries in a row, or even delete data that should not have been deleted. How do we create a trustworthy, traceable, and accountable environment for these agents?",
      transcript_zh: "先简单介绍一下：我来自阿里云，目前负责阿里云的 FC sandbox。今天要分享的话题是，我们如何帮助企业快速构建一个可信、可追溯、可以安全执行的基础沙箱环境。现在的 Agent 已经能完成写邮件、做代码开发这类简单任务，但真正的挑战在进入生产环境之后：如果 Agent 要对现有数据库做查询或修改，异常情况下模型可能不知所措地重试，连续插入多条数据，甚至删掉不该删的数据。如何为这些 Agent 营造一个可信、可追溯、可问责的环境，就是今天要讲的内容。",
      note: "自我介绍与“生产环境安全”动机都在标题页口述（约两分半）；Wordly 把讲者姓名转写成 Zhuang Zhang，应为赵庆杰。"
    },
    {
      start: "09:07:50", end: "09:08:16", slide: 2,
      label: "三部分议程：任务、难题、设计与实现",
      transcript: "My topic will be shared in three parts. The first part is what problems our agent needs to solve — mainly clarifying our scenario. The second part is, based on this scenario, what conditions or challenges need to be addressed. Finally, I'll briefly share some of our solutions for agent sandboxes. We're short on time today, so I can only share part of it; if you'd like to discuss further, you can download the file afterwards and we can work on it together.",
      transcript_zh: "我的主题分三部分。第一部分讲我们的 Agent 需要解决什么问题，主要是把场景讲清楚；第二部分基于这个场景，讲需要满足哪些条件、应对哪些挑战；最后简要分享我们在 Agent 沙箱上的一些解决方案。今天时间有限，只能讲其中一部分，如果大家有兴趣深入讨论，可以会后下载文件，我们一起研究。",
      note: "对应议程页的三部分；字幕里的 download the file 指会后分享的 deck。"
    },
    {
      start: "09:08:44", end: "09:09:00", slide: 3,
      label: "Part 1 开场：Agent 任务需要什么",
      transcript: "Let me start with an example of what our agents need. On a Monday morning, a normal agent might get a task like: 'Can you help me analyze the business situation of the previous week?' And this one sentence, given to an agent, may have to be performed as many tasks — for example logging into an internal system and reading data and PDF documents.",
      transcript_zh: "先举一个例子，看看我们的 Agent 需要什么。比如一个普通的 Agent，周一早上可能接到这样的任务：“帮我分析一下上一周的业务情况”。这句话交给 Agent 做，可能要拆成很多子任务，比如登录内部系统、读取数据、读一些 PDF 文档。",
      note: "Part 1 分节页停留很短；周报示例从前一页延续进来，下一页按任务类型逐项展开。"
    },
    {
      start: "09:09:00", end: "09:10:44", slide: 4,
      label: "四类任务场景：代码、数据、浏览器、协作",
      transcript: "This one task may involve many subtasks: logging into internal systems, reading data and PDF documents to generate a weekly report. It is a query-type task, and one challenge is whether the agent has the necessary access permissions. Document formats may conflict, so we need Python code to filter data — which means installing packages, setting up environments, and writing code. Dependencies, connections and credentials are also needed for the office environment, such as browsers, document readers, or spreadsheet software. The common requirement is that the agent must operate in multiple environments, call multiple systems, and install all dependencies properly without interfering with each other — beyond the agents previously designed for one task at a time. A customer-service document is another scenario like this, what we call agent servicing.",
      transcript_zh: "这一个任务可能要执行很多子任务：登录内部系统、读数据和 PDF 文档，用来生成周报。这是查询类任务，挑战之一是 Agent 是否具备必要的访问权限；文档格式可能冲突，需要用 Python 代码过滤数据——这就要装包、配环境、写代码。办公环境还需要连接、凭据这类依赖，比如浏览器、文档阅读软件、表格计算软件。所有这些的共同要求是：Agent 必须能在多个环境里运行、调用多个系统、安装各种依赖且互不干扰，这超出了以前一次只做一个任务的 Agent 的能力。客服文档是另一个类似场景，我们称之为 agent servicing。",
      note: "页面四列（代码开发/数据与办公/浏览器操作/多 Agent 协作）与示例逐项对应；Wordly 的 PGF browsers 应为 PDF 浏览器类办公工具（推测）。"
    },
    {
      start: "09:10:58", end: "09:12:07", slide: 5,
      label: "任务描述：运行条件要说清楚",
      transcript: "As our agents evolve, they increasingly handle complex tasks — this involves the agent loop on one side and our infrastructure on the other, working together. How do we coordinate the infrastructure with the agent's runtime, ensure the runtime environment is set up quickly, and quickly integrate access control with our agent? If you have agent development experience, you know completing a happy path is very simple; but when you go into production and need to record and track these tasks — for example identifying which agent or sandbox executed a command, and how to trace back to that sandbox — there is currently no very quick solution.",
      transcript_zh: "随着 Agent 不断演进，要处理的任务越来越复杂——这既涉及 Agent loop 的发展，也需要基础设施配合完成。怎么让基础设施环境和 Agent 的运行时协调起来，快速把运行环境搭好，并把访问控制快速接入 Agent？做过 Agent 开发的都知道，跑通 happy path 很简单；但进入生产、要记录和追踪任务时——比如识别是哪个 Agent 或哪个沙箱执行的命令、如何回溯到那个沙箱——目前还没有很现成的方案。",
      note: "对应“任务配置”页的运行环境/操作权限/任务状态几格，属概括性对应（推测）；happy path 到生产可追溯是本页现场落点，Wordly 曾转写成 happy kiss。"
    },
    {
      start: "09:12:27", end: "09:14:53", slide: 6,
      label: "基础设施职责：隔离/接入/状态/审计",
      transcript: "If an agent finishes a task in ten minutes, should the computing resources it occupies be released? A traditional agent environment constantly occupies the compute and causes waste; what we need is rapid release — snapshot and save the environment, then restore it in as little as one second when the task continues. First, the execution environment must be isolated: with multiple agents in the same sandbox, packages and operations would interfere with each other. Then there is runtime integration — multi-cloud or local environments, and how to decouple at the runtime layer; the retention of state for every session, so an agent restarted in another sandbox keeps a consistent state graph; and access audit — if you use OpenTelemetry to trace business logic but never add the execution environment, you won't know where the code was executed or where the problem occurred.",
      transcript_zh: "如果 Agent 十分钟就做完了任务，它占用的计算资源该不该释放？传统 Agent 环境会一直占着算力，造成浪费；我们需要的是快速释放——把环境快照保存下来，任务继续时最快一秒就能恢复。首先，执行环境必须是隔离的：多个 Agent 放在同一个沙箱里，装的包和操作会互相干扰。其次是 Runtime 接入——面对多云或本地环境，如何在运行时层解耦；再者是每个会话的状态保留，让 Agent 重启后哪怕跑在另一个沙箱里，状态图依然一致；最后是访问审计——如果只用 OpenTelemetry 追踪业务逻辑、没把执行环境加进去，就不知道代码在哪里执行、问题出在哪里。",
      note: "页面四项职责（执行隔离/Runtime 接入/状态保留/访问与审计）在字幕里逐项出现；开头的资源释放问题承接上一页的资源需求。"
    },
    {
      start: "09:14:58", end: "09:15:23", slide: 7,
      label: "Part 2：执行环境的三个难题",
      transcript: "These are some of the challenges we currently face when developing agents on infrastructure environments. If we think about it more carefully, the common problem among these challenges is the comparison: an agent needs an execution environment, and this environment is very different from traditional microservices.",
      transcript_zh: "这些就是我们目前在基础设施环境上开发 Agent 面临的一些挑战。更仔细地想，这些挑战有一个共同点：Agent 需要一个执行环境，而这个环境与传统微服务非常不同。",
      note: "Part 2 分节页停留很短，“三个难题”未逐条点名，直接进入与传统微服务的对比；首句是上一页挑战清单的收束。"
    },
    {
      start: "09:15:50", end: "09:16:15", slide: 8,
      label: "难题一：信任边界在 Guest 之外",
      transcript: "In traditional microservices the execution environment is likely trustworthy, because it runs your business code and is unlikely to exceed your expectations, such as allowing your business code to obtain a key. But in an agent-based environment, if you don't properly control the behavior of your model, it might obtain more key information — for example a key to your memory state — and once the security is breached, the consequences could be your data or your temporary key being leaked. That is the problem of security isolation for infrastructure.",
      transcript_zh: "传统微服务里，执行环境大概率是可信的，因为它跑的是你的业务代码，不太可能超出预期——比如让业务代码拿到密钥这类信息。而在 Agent 环境里，如果没有好好约束模型的行为，它可能获取更多密钥信息，比如拿到通往你内存状态的钥匙；一旦安全被攻破，后果可能是数据泄露或临时密钥泄露。这就是今天 Agent 开发在基础设施层面的安全隔离问题。",
      note: "对应“难题一·信任边界”：Guest 内不可信、密钥不能放进业务环境；页面右列“平台独立校验”的解法在后文第 17 页展开。"
    },
    {
      start: "09:16:43", end: "09:17:33", slide: 9,
      label: "难题二：任务要等待，实例闲置烧钱",
      transcript: "In the original microservices era, many requests shared one environment: one 2C4G machine handling hundreds or thousands of tasks, with controllable cost. But during an agent's long-running task you cannot achieve that data sharing — each user, each session, may be handled by a separate agent occupying its own resources, and if you stop midway, your agent sits constantly idle and the cost increases accordingly. In an online environment, that cost is many times greater compared to microservices.",
      transcript_zh: "在早期的微服务时代，多个请求共享一个环境：一台 2C4G 的机器能处理成百上千个任务，成本可控。但 Agent 的长任务做不到这种数据共享——每个用户、每个会话的请求可能由一个独立的 Agent 处理，各自占着资源；你中途停下来去干别的，Agent 就一直闲置，成本随之上涨。在线环境里，这个成本相比微服务要高出很多倍。",
      note: "页面主题是“任务需要等待、实例不必一直运行”，现场主要从成本与资源共享角度讲（推测为同一问题的成本面）；快照/恢复的解法在第 15/16 页。"
    },
    {
      start: "09:18:03", end: "09:18:10", slide: 10,
      label: "难题三：凭据应该放在哪里",
      transcript: "Another major challenge is where to store our credentials — the credentials for our database connection, the credentials (AKSK) for accessing our object storage, or other third-party information such as OAuth 2.0. In our agent-based scenario, this is very difficult to achieve with complete security and isolation. That is my brief summary of the big challenges that agent development presents to infrastructure.",
      transcript_zh: "另一个很大的挑战是凭据存在哪里——数据库连接的凭据、访问对象存储的 AKSK，还有 OAuth 2.0 这类第三方信息的凭据，都放在哪里？在 Agent 场景下，要做到完全的安全隔离非常难。这就是我对 Agent 开发给基础设施带来挑战的简要总结。",
      note: "对应“难题三·访问控制”的身份与凭据一格；本段只有两条字幕，讲者随即进入 Part 3。"
    },
    {
      start: "09:18:37", end: "09:18:53", slide: 11,
      label: "Part 3：Sandbox 的设计与实现",
      transcript: "Next I'll share how we, as Alibaba Cloud Function Compute (FC), solve these problems in a sandbox scenario. These problems are quite detailed, so I'll briefly mention our technical solution first; more details will be provided later on our official website or in our technical sharing sessions. First, let me briefly explain the architecture of our sandbox.",
      transcript_zh: "接下来分享我们作为阿里云函数计算（FC），是如何在沙箱场景里解决这些问题的。这些问题相当细，我先简要讲一下技术方案，更详细的内容之后会在官网或技术分享里给出。先简单讲一下我们沙箱的架构。",
      note: "Part 3 分节页；字幕的 as a function of Alibaba Cloud 即函数计算 FC；末句为翻到架构页的过渡。"
    },
    {
      start: "09:18:53", end: "09:20:11", slide: 12,
      label: "总体架构：Agent、控制面与 Sandbox",
      transcript: "Our first layer is the entry point, which comes from various agents that may depend on various frameworks — for example Claude Code or Codex, essentially our local coding agents, or another type where the runtime is something you develop yourself based on our frameworks and is managed by the platform. We combine the agent's session information with the sandbox identifier to select a certain sandbox for execution, and finally work with our MCP tools to complete a long task or a question and answer together. Simply put: when an agent comes in, it goes through a gateway, which breaks the task down based on its characteristics and decides what kind of task it is and what environment it should be executed in — a local environment or a remote cloud sandbox; and several cloud sandboxes can also work together.",
      transcript_zh: "我们的第一层是入口，来自各种 Agent，它们可能依赖不同的框架——比如 Claude Code 或 Codex 这类本地编码 Agent；也可能是另一类：Runtime 由你基于我们的框架自己开发，由平台统一管理。我们把 Agent 当前的会话信息和沙箱标识组合起来，选定某个沙箱去执行，最后结合 MCP 工具一起完成一个长任务或一次问答，再回复给系统。简单说：Agent 进来要先过网关，网关根据任务特征做拆解，判断它是什么任务、该在什么环境执行——本地环境还是远端云沙箱；也可以由多个云沙箱协同完成。",
      note: "对应总体架构页；Wordly 的 cloud code 应为 Claude Code（deck 同页还有 Codex/ADK 与 MCP 网关）；网关拆解对应控制面的调度与 Session 管理职责。"
    },
    {
      start: "09:23:19", end: "09:25:06", slide: 13,
      label: "创建主路径：Session 身份与独立配置",
      transcript: "How do we quickly create a sandbox? When an agent receives a request or a task, creating this sandbox first needs an identification that is unchangeable — a globally unique identity of the sandbox, unique to you. The business system or a third-party system binds the data to your session, so that all requests from all your agents can be routed to the same sandbox for execution. This keeps the environment, the processes, and the business logic isolated, and the whole execution environment of your agent secure and recoverable. The network mounting and storage configuration mounting here are agent-level, not microservice-level: in a microservice, all users might share a single service with a single configuration, but in an agent scenario you may face an agent with an independent configuration, possibly its own sandbox keys or independent network policies. This actually involves a very large scale — our solution can support sandboxes at the million level.",
      transcript_zh: "沙箱是怎么快速创建的？Agent 收到请求或任务后，要创建沙箱首先需要一个不可变的标识——沙箱的全局唯一身份，只属于你。业务系统或第三方系统把数据绑定到你的会话上，这样你所有 Agent 的请求都能路由到同一个沙箱执行。这保证了环境、进程和业务逻辑的隔离，你 Agent 的整个执行环境安全且可恢复。这里的网络挂载和存储配置挂载是 Agent 级的，不是微服务级的：微服务场景下所有用户可能共享一个服务、一份配置；而 Agent 场景下，你面对的可能是一个拥有独立配置的 Agent，可能有自己独立的沙箱密钥、独立的网络策略。这实际上涉及非常大的规模——我们的方案可以支持百万级的沙箱。",
      note: "页面上的组件主路径（API Server→EERouter→Placement→EEAgent）现场未逐步展开，讲的是 Session 身份绑定与按 Agent 独立配置（推测对应此页）；Wordly 的 Gold Identity 推测为“全局唯一身份”，Milliondus Sandbox 应为百万级沙箱。"
    },
    {
      start: "09:20:39", end: "09:21:25", slide: 14,
      label: "MicroVM 隔离：冷启动小于 100 毫秒",
      transcript: "After we've completed the orchestration, we can choose a highly isolated and secure sandbox environment to execute in. This sandbox environment achieves a level similar to a MicroVM: unlike Docker's approach of running a shared-kernel container, it is a secure-container MicroVM with the characteristics of a virtual machine — secure isolation, yet lightweight, less susceptible to escape, and in large-scale scenarios it is not easy to bypass Docker's resource limits and obtain other information. What we've achieved is a cold start time of less than 100 milliseconds: you can very quickly cold-start a new sandbox, or a dormant one, almost without feeling it.",
      transcript_zh: "编排完成后，我们就可以选择一个高度隔离、安全的沙箱环境来执行。这个沙箱环境达到了类似 MicroVM 的水平：不同于 Docker 那种共享内核的容器方案，它用的是安全容器微 VM，具备虚拟机的特性——安全隔离，同时又轻量、不易被逃逸，在大规模场景下也不容易绕过 Docker 的资源限制去获取其他信息。我们做到的是冷启动时间小于 100 毫秒：可以几乎无感地快速冷启动一个新沙箱，或者唤醒一个休眠中的沙箱。",
      note: "对应“执行隔离·MicroVM 边界”页；Wordly 的 Michael VM 应为 MicroVM。此页时间早于第 13 页字幕——讲者先讲隔离再回头讲创建流程，数组按页码排序。"
    },
    {
      start: "09:28:06", end: "09:30:53", slide: 15,
      label: "模板与快照：1→N 创建、1→1 恢复",
      transcript: "Why can our sandbox be created so quickly? This is one of our core competitive advantages. A Java application in a typical microservice scenario takes several minutes to start — at best thirty seconds — and even one and a half minutes affects the experience; in our agent environment the challenge is to start up seamlessly. In the example just given, if resuming the task after a meeting takes a few minutes, the success rate drops. How did we do it? We use a default template kept in a specific state: not a traditional Docker image, but a snapshot — in the old scenario you start the Java application, do health checks, establish the data connections; in our template scenario, this series of actions is snapshotted after the runtime has actually started running, not before. Docker's snapshot at that stage is just the configuration, not yet running; ours is a snapshot taken after the environment has run. It supports multi-level caching for fast startup, so an environment can be replicated without copying everything from scratch, and tasks facing different packages can continue from the same image. In short, through these capabilities we achieve both 1-to-N rapid warm-up and creation, and 1-to-1 restore from a snapshot.",
      transcript_zh: "为什么我们的沙箱环境能快速创建？这其实是我们的核心竞争优势之一。典型微服务场景里，Java 应用启动通常要几分钟，做得好也要三十秒，哪怕一分半钟也会影响体验；而在沙箱或 Agent 环境里，我们要做到无缝启动。就像刚才的例子，任务做到一半去开个会，回来要继续时如果得等几分钟，成功率会大打折扣。我们怎么做的？用的是系统里的默认模板，让模板保持在一个特定状态：不用传统的 Docker 镜像，而是快照——以前是启动 Java 应用、做健康检查、建立数据连接；在我们的模板快照方案里，这一串动作是在 Runtime 真正跑起来之后才拍快照，而不是之前。Docker 在那个阶段拍的只是配置、还没在运行；我们拍的是环境跑起来之后的状态。这份快照支持多级缓存、快速启动，环境可以复用而不必从头复制，面对不同安装包的任务也能从同一份镜像继续。总之，通过这些能力我们既能 1→N 快速预热创建，也能 1→1 从快照恢复。",
      note: "对应“模板与快照”页；页面上的 1→N 创建新 Sandbox / 1→1 恢复同一 Session 即结尾的两种用法（Wordly 转写成 1:2 or 1:1）。"
    },
    {
      start: "09:21:54", end: "09:23:00", slide: 16,
      label: "休眠与恢复：整体快照毫秒级还原",
      transcript: "So where do we store our state? We can take a snapshot of the entire sandbox environment — including memory and storage — and save it, and when you use it, directly and quickly restore this snapshot, in about 100 milliseconds. Another option, since the whole snapshot-and-storage process also incurs costs, is to selectively mount a specific directory dynamically: with NAS storage or OSS storage you can mount a bucket or a directory for an agent, and these directories are mutually isolated — my agent cannot access other directories. Confidential information such as your session data can also be stored there, and reloaded when the agent is dormant or starting up, achieving cost savings.",
      transcript_zh: "那我们的状态存在哪里？在沙箱里我们提供几种方案：可以对整个沙箱环境——包括内存和存储——做快照保存，用的时候直接快速恢复这份快照，大概 100 毫秒。由于整个快照和存储过程也有成本，另一种做法是按需动态挂载特定目录：用 NAS 存储或 OSS 存储，可以给 Agent 挂一个 bucket、一个目录，最多能挂成千上万个；这些目录之间相互隔离，我的 Agent 访问不了别人的目录，既灵活又省钱。会话数据这类很机密的信息也可以存在那里，Agent 休眠或启动时重新加载，实现成本节省。",
      note: "此页现场未逐页讲解：EERouter 状态机（Normal→Pausing→Paused→Resuming、SessionVersion 条件写）没有展开，cue 取自前面“快照保留 + 动态挂载”的口述（推测对应休眠与恢复主题）；动态目录挂载同时呼应第 12/17 页的存储挂载能力。"
    },
    {
      start: "09:25:32", end: "09:27:49", slide: 17,
      label: "凭据平台托管：出口劫持、占位换真钥",
      transcript: "How do we address the security issues inside our sandbox? In a traditional sandbox you might put your keys in your business code, your configuration file, or even a remote storage like Redis, retrieve them into memory and use them temporarily. But in this untrusted environment, the model or the agent could obtain your information through memory, and once leaked it could be stolen — many such failures can already be seen in the community. In our sandbox we essentially achieve zero key storage: we put our keys on the trusted platform side, and every outgoing network request is intercepted outside the sandbox; after this interception, we replace the fake keys or placeholders with the real key recorded by our platform. To make it concrete: the execution code inside the sandbox only writes a placeholder — for example a fake AKSK. When the real request goes out on the network, I intercept it at the point outside my sandbox and replace your placeholder with the real key. The same hijacking works for any network request or certificate decryption, so you only need to write your business code, without worrying about any key information — the platform's controls outside the sandbox guarantee the security of your whole network.",
      transcript_zh: "我们怎么解决沙箱内部的一些安全问题？传统沙箱里，你可能把密钥放在业务代码、配置文件，甚至 Redis 这类远端存储里，用的时候取出来放在内存中临时使用。但在这个不可信的环境里，模型或 Agent 可能通过内存拿到这些信息，一旦泄露就可能被窃取——社区里已经能看到很多这样的失败案例。我们的沙箱基本做到了零密钥存储：密钥放在可信的平台侧，所有出网请求都会在沙箱之外被平台拦截，拦截之后把假密钥或占位符替换成平台记录的真实密钥。举个具体例子：沙箱内的执行代码只写一个占位符，比如一个假的 AKSK；真正出网请求时，我在沙箱外的出口点拦截，把占位符换成真实密钥，实现你的目的。任何网络请求或证书解密都能做到这种接管，帮你加密后再放行。也就是说，你只需要写业务代码，完全不用操心密钥信息；沙箱之外由平台的管控保证整个网络的安全。",
      note: "对应“存储凭据由平台自动轮换”页的凭据托管思路，也是第 8/10 页信任边界问题的解法；deck 里的受限 STS 与自动轮换在后面 09:33 段展开。"
    },
    {
      start: "09:33:22", end: "09:34:37", slide: 17,
      label: "临时凭据：平台自动轮换与权限收窄",
      transcript: "There are some deeper capabilities around credentials. The usual snapshots or keys are long-term keys, but in our scenario we can achieve temporary ones. A long-term key is definitely insecure; a temporary key may have a validity period of a few minutes or even 24 hours, in which case you would normally need to perform rotation in your business logic — but in our scenario, our platform does the automatic rotation for you. You don't need to control the lifecycle of these keys, so your business logic stays very clean, containing only business code. Another point is permission binding: if you use object storage with an agent, how do you ensure the agent can only access a specific bucket? Or a connection string that only allows access to a specific database? Combined with our identity system and RAM-based permission binding, this achieves a strong level of isolation that only allows access to specific permissions.",
      transcript_zh: "凭据方面还有一些更深的能力。通常的快照或密钥是长期密钥，而在我们的场景里可以用临时的。长期密钥肯定不安全；临时密钥的有效期可能是几分钟甚至 24 小时，按理你得在业务逻辑里做轮换——但在我们的场景里，平台会帮你自动轮换。你不需要管理这些密钥的生命周期，业务逻辑因此非常干净，只有业务代码。另一点是权限绑定：Agent 用对象存储时，怎么保证它只能访问特定的 bucket？或者通过连接串只允许访问特定的数据库？结合我们的身份体系和基于 RAM 的权限绑定，就能做到只允许访问特定权限的强隔离。",
      note: "对应第 17 页的“申请受限 STS、到期前自动轮换、收窄授权策略”；页面结论“任务代码不用自己定时更新挂载凭据”即字幕的“业务逻辑保持干净”。"
    },
    {
      start: "09:34:58", end: "09:35:53", slide: 18,
      label: "AgentRun：MCP 工具的身份与授权",
      transcript: "Another important issue is the integration of our MCP tools. MCP may have many types — internal services or cloud services — and several authentication methods, such as OAuth. How can these be integrated quickly in a sandbox environment? We have a standard solution: our cloud identity can connect seamlessly with yours. This identity can be understood as a person: you put this person into your enterprise system and assign certain execution permissions to achieve permission isolation — for example, if I'm a salesperson, I can't access a database in our R&D department; I only have the very specific permissions of a salesperson. Connecting this cloud identity with the internal identity system is already supported for some traditional internal systems; it only requires a little configuration to complete.",
      transcript_zh: "另一个重要问题是 MCP 工具的集成。MCP 有很多类型——内部服务或云服务——认证方式也有好几种，比如 OAuth；怎么在沙箱环境里快速集成？我们有一套标准方案：用我们的云身份与你的体系无缝打通。这个身份可以理解为一个人：把这个人放进你的企业系统，赋予某些执行权限，实现权限隔离——比如我是销售，就访问不了我们研发部门的数据库，只拥有销售这个角色非常特定的权限。云身份与内部身份体系的对接，已经支持一些传统的内部系统，只需要少量配置就能完成。",
      note: "对应 AgentRun 集成页（MCP Hook、Cedar 授权、凭据注入、调用记录）；Wordly 的 electronic identity 推测指云上 RAM/子账号身份，internal health and safety system 应为内部统一身份/权限系统。"
    },
    {
      start: "09:31:16", end: "09:32:58", slide: 19,
      label: "冷热会话分级存储",
      transcript: "Another issue after taking a snapshot is the cost of storage. There is a logic behind this: a session that keeps running within 24 hours is considered very active, but if a session has not been recovered for, say, 3,000 — is that unrecovered data considered dead or inactive? If data storage relies on taking extremely fast snapshots to help the business get up and running, the cost might be unsustainable. So session-based data recovery automatically distinguishes hot and cold sessions and uses different storage for different data, reducing the overall computing cost of the agent. For very active data, based on our fast storage, we may recover it within a few hundred milliseconds; but for a session untouched for three or seven thousand seconds, recovery may take a while, for example one or two minutes — a time that is actually acceptable. You may have used other agents, such as Codex, and unfortunately seen a very important session take relatively long to recover; very likely some kind of cold-storage archiving has been done underneath.",
      transcript_zh: "拍了快照之后还有一个问题：存储成本。这背后有一套逻辑：24 小时内一直拉起来跑的算非常活跃的会话；但如果一个会话比如 3000 秒都没有恢复，这些没被恢复的数据算不算死了、不活跃了？如果数据存储全靠极快的快照来帮业务拉起，成本可能扛不住。所以基于会话的数据恢复会自动区分冷热会话，用不同的存储存放不同的数据，降低 Agent 整体的计算成本。非常活跃的数据基于我们的快速存储，几百毫秒就能恢复；而三五千秒没动过的会话，恢复可能要一会儿，比如一两分钟——这个时间其实是可以接受的。大家应该用过 Codex 这类 Agent，很遗憾地见过非常重要的会话恢复时间比较长；我们可能不知道背后的原理，但很可能就是做了某种冷存储归档。",
      note: "对应“资源使用与保护”页的存储与恢复取舍；3000/七千秒按秒理解（推测），页面上的“休眠前再检查、限制恢复并发”未展开。此段时间早于第 18 页字幕，讲者先讲存储分级再讲身份集成。"
    },
    {
      start: "09:36:16", end: "09:37:59", slide: 19,
      label: "按空闲策略休眠：闲置 1/5 计价",
      transcript: "Another important point, very effective for cost savings: when an agent's session is dormant or a task is consuming computing resources — for example the person goes off to do something else after the task — how do we save cost? We offer two solutions. The first is based on your CPU utilization: we can put the agent into an idle state. When the price drops to one fifth of the base price — the active price is the normal price, when requests and executions exceed the CPU threshold — once it falls below, say, 3% or some percentage of the threshold, it enters the idle state, and in this state the price naturally becomes one fifth of the base price. You recover very quickly, because it only lowers your price while your execution environment is still working. The second type is the deep hibernation and snapshotting just mentioned: when we detect your task has been completed or the utilization is very low, we immediately take a snapshot for you — an automatic snapshot including your memory and your storage. After that, all your payments only include a storage fee, with no other compute, which greatly saves cost. When you come back and want to restore the task, we directly use the resume function to restore your content and computation.",
      transcript_zh: "还有一个重点，对省成本非常有效：Agent 会话休眠、任务还在占计算资源时——比如人做完任务去干别的了——怎么省成本？我们实际上提供两套方案。第一种基于 CPU 利用率：可以把 Agent 切到闲置状态。活跃价就是正常价，请求和执行超过 CPU 阈值算活跃；一旦降到比如阈值的 3% 或某个百分比以下，就进入闲置状态，这个状态下价格自然变成基础价的五分之一。恢复会非常快，因为它只是降了价格，你的执行环境还在工作。第二种就是刚才提到的深度休眠加快照：检测到任务已完成或利用率非常低时，立即自动帮你拍一份快照，包括内存和存储。拍完之后，你付的就只有存储费，没有其他计算费用，大大节省成本。等你回来想恢复任务，直接用 resume 功能把内容和计算都恢复。",
      note: "对应“按空闲策略休眠，按请求恢复”页；闲置降到基础价 1/5 与深度休眠只付存储费是本页两个要点。"
    },
    {
      start: "09:38:26", end: "09:38:26", slide: 20,
      label: "异常处理：一句带过（现场跳过页）",
      transcript: "Due to time constraints, I'll just give a quick overview here — like how to handle some unusual or abnormal situations that occur during hibernation. I won't go into detail here.",
      transcript_zh: "由于时间关系，这里只快速过一下——比如休眠过程中出现的一些异常情况该怎么处理，我就不展开细讲了。",
      note: "现场未逐页讲解：讲者明确说“不展开”；页面内容为快照发布失败/源实例释放失败/恢复失败时保留中间态并由 Reconciler 对账。时间戳为单条字幕，start 与 end 相同。"
    },
    {
      start: "09:38:26", end: "09:38:29", slide: 21,
      label: "谢谢，欢迎交流",
      transcript: "Okay, that concludes our sharing session. Because of the limited time, many technical details were not covered — if you're interested, we can communicate afterwards. Okay, bye-bye.",
      transcript_zh: "好，今天的分享就到这里。因为时间有限，很多技术细节没有覆盖，如果有兴趣，可以会后和我交流。好，拜拜。",
      note: "收尾页的三条总结（隔离靠平台约束/先有快照再释放实例/凭据与策略统一管理）未逐条念出；QA 与闲聊未收录。"
    }
  ]
};
