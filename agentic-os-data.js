window.talk = {
  title: "Mission-Critical Agentic OS Runtime",
  speaker: "Chao Liu（刘超）· Process Mission",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 1",
  pdf: "pdfs/agentic-os.pdf",
  assets: "assets/agentic-os",
  source: "EWFH-7055-transcript.txt",
  cues: [
    {
      start: "15:04:32", end: "15:05:14", slide: 1,
      label: "开场：使命关键域的 Agentic OS 设计",
      transcript: "Hello everyone, my name is Liu Chao, and I'm from Process Mission. Today I'd like to share with you our design for an agent OS aimed at mission-critical and security-critical domains. There are two key terms here: one is Ralph loops, which were very popular recently, and the other is dynamic workflow. For this kind of critical task domain we value high reliability, high security, and high factual accuracy. Our session will revolve around a few topics: the key design elements inside this agentic OS include Humanize, and we also tailored a unified agent runtime based on the DeepSeek harness.",
      transcript_zh: "大家好，我是刘超，来自 Process Mission。今天想和大家分享我们面向使命关键与安全关键领域的 agent OS 设计。这里有两个关键词：一个是最近很火的 Ralph loop，另一个是 dynamic workflow。对这类关键任务领域，我们看重高可靠性、高安全性和高事实准确性。今天的分享围绕几个话题展开：agentic OS 内部的关键设计元素包括 Humanize，我们还基于 DeepSeek harness 定制了一套统一的 agent runtime。",
      note: "Wordly 把 RALPH loop 转写成 router loops、长程任务转写成 Great Wall mission，均按 deck 修正；议程口述在标题页完成。"
    },
    {
      start: "15:05:29", end: "15:06:27", slide: 2,
      label: "长程任务：完成率与漂移公式",
      transcript: "The first thing to discuss is the effectiveness of long-running missions. When evaluating whether a long-running mission is performed well, a key indicator is the completion rate of the mission goals — and the quality of that completion. We can describe it with a simple formula: first, the drift rate of your overall task execution — when your task drifts, overall goal completion decreases, and a key factor affecting that drift is the context of your language model. Another indicator is the frequency at which it triggers context compression. Another is whether, after each round of conversation or each completed task, the agent performs a self-check — a simple code review or text review, or test engineering like TDD, or specialized quality-checking tools. We need to check the completion status of the task, as well as the frequency and quality of these checks.",
      transcript_zh: "首先要讨论的是长程任务的成效。评估一个长程任务做得好不好，关键指标是任务目标的完成率，以及完成的质量。我们可以用一个简单公式来描述：首先是整个任务执行过程的漂移率——当任务发生漂移，整体目标完成度就会下降，而影响漂移的关键因素是语言模型的上下文。另一个指标是触发上下文压缩的频率；还有一个是每一轮对话或每个任务完成后，agent 是否会做自检——是简单做一次 code review 或文本审查，还是引入 TDD 这类测试工程，或使用专门的质量检查工具。我们需要检查任务的完成状态，以及这些检查的频率和质量。",
      note: "对应 slide 公式 CQ₁₀₀ ≈ (1−D₁₀₀)×A(N)：漂移率 D、自检频率与精度 A 是主要质量因子，横轴为对话轮数。"
    },
    {
      start: "15:06:49", end: "15:07:11", slide: 2,
      label: "谁来检查：子智能体交叉评审",
      transcript: "Does the agent act as both the executor and the assessor in a single conversation, or does it use a specialized subagent or other tools to help with the assessment? Here are a few simple examples — one is Humanize. There is also the conversation of our ordinary agents: if we assume a long task involving a hundred rounds of conversation and iteration, the overall result is actually quite good. Why does it perform so well? Because it has dedicated builder agents and reviewer agents working in a competitive manner to push the task forward.",
      transcript_zh: "它是在同一场对话里既当执行者又当评审者，还是用专门的 subagent 或其他工具来帮忙评估？这里举几个简单例子——一个是 Humanize；还有我们普通 agent 的对话：假设做一个涉及一百轮对话与迭代的长任务，整体效果其实相当好。为什么表现这么好？因为它有专门的 builder agent 和 reviewer agent，以相互竞争的方式推动任务前进。",
      note: "Wordly 把这一句的比喻转写成了 artist/painting，按上下文还原为执行者与评审者；另有一个转写为 shopping order system 的示例名无法核实，未收入。"
    },
    {
      start: "15:07:42", end: "15:07:42", slide: 2,
      label: "普通智能体：单轮对话靠人工 prompt",
      transcript: "This kind of task also performs quite well — for example, Codex handles it very well; although it is done in a single conversation, the performance is actually a bit lacking. It is really the conversation of our ordinary agent: it relies more on the prompt input from humans, and the quality of your prompt input actually determines the performance of the long-running conversation.",
      transcript_zh: "这类任务表现也相当不错——比如 Codex 处理得很好；虽然是单轮对话完成的，表现其实有点欠缺。它本质上是我们普通 agent 的对话：更多依赖人类的 prompt 输入，你输入 prompt 的质量实际上决定了长程对话的表现。",
      note: "对应 slide 曲线里 Normal Agent Chat 的下沿段：单轮对话质量取决于人类 prompt，由此引出 Humanize 1.0。"
    },
    {
      start: "15:08:03", end: "15:08:33", slide: 3,
      label: "Humanize 1.0：RLCR 与 Codex 审查",
      transcript: "So why did it have such good results? That's what we'll introduce next. First, Humanize 1.0 — it was created quite early, initially to solve the problem of upgrading and iterating the whole system build when using performance simulators for architecture research. The most crucial design element of this evolving agent harness is its Ralph loop with Codex review: it incorporates Codex into the traditional Ralph loop. Humanize 1.0 was most active around the beginning of the year, from April to May.",
      transcript_zh: "那为什么它会有这么好的结果？这就是我们接下来要介绍的。先说 Humanize 1.0——它做得比较早，最初是在用性能模拟器做架构研究时，用来解决整个系统构建的升级迭代问题。这个不断演进的 agent harness 最关键的设计元素，是带 Codex review 的 Ralph loop：把 Codex 引入传统的 Ralph loop。Humanize 1.0 最活跃的时期在年初，四月到五月。",
      note: "Wordly 把 Humanize 转写成 Home Light/humanization，rough loop 实为 Ralph loop（RALPH-LOOP WITH CODEX REVIEW）。"
    },
    {
      start: "15:08:56", end: "15:09:27", slide: 3,
      label: "选型逻辑：Claude 快、Codex 稳",
      transcript: "At that time we all knew the performance of Claude's Opus 4.6 language model was excellent — it was fast and the generated quality was good. At that stage, Codex's overall performance was that its token generation speed might not match the task completion speed, but it was relatively stable, and its performance in checking and reviewing was very good. So we designed this based on the performance of these CLIs and their own language models. The RLCR loop requires that you first input a carefully designed plan; version 1.0 provides relevant skills to help you generate such a plan — it will reasonably break down your goals and long-running tasks into several smaller goals and corresponding milestones.",
      transcript_zh: "当时我们都知道 Claude 的 Opus 4.6 语言模型性能很出色——速度快，生成质量也好。那个阶段 Codex 的整体表现是 token 生成速度可能赶不上任务完成速度，但比较稳定，在检查和审查方面表现得非常好。所以我们基于这些 CLI 的性能和它们各自的语言模型做了这个设计。RLCR loop 要求你先输入一份精心设计的 plan；1.0 版本提供相关 skill 帮你生成这样的 plan——它会合理地把你的目标和长程任务拆解成若干小目标和对应的里程碑。",
      note: "字幕中的 Cloud 按上下文修正为 Claude；分工是 Claude 当 builder、Codex 当 reviewer，对应 slide 的 plan.md 时序。"
    },
    {
      start: "15:09:44", end: "15:10:12", slide: 3,
      label: "停止钩子：想停先过审查",
      transcript: "Then the builder agent, which is Claude, is responsible for pushing these tasks forward as much as possible. Within Claude's stop hook, Codex is forcibly attached to help with the review — in other words, whenever your builder agent wants to stop, it forces Codex to intervene and perform a review. This review has two scenarios: either your overall goal hasn't been achieved, in which case it returns to the builder to continue the process; or it judges whether the task has been completed — but whether it was completed correctly, with high quality, without bugs, are all points that need attention. Then it goes back to the builder to continue until all the conditions are met, and only then is your long-running mission considered over.",
      transcript_zh: "然后是 builder agent，也就是 Claude，负责尽可能把任务往前推。在 Claude 的 stop hook 里，会强制挂上 Codex 帮忙审查——也就是说，每当你的 builder agent 想停下来，就会强制让 Codex 介入做一次 review。这个 review 有两种情形：要么整体目标还没达成，就回到 builder 继续流程；要么它判断任务是否完成——但是否正确完成、质量高不高、有没有 bug，都是需要关注的点。然后回到 builder 继续，直到所有条件都满足，才认为你的长程任务结束。",
      note: "对应 slide 时序图：builder 想结束（Not finished / You finished?）时强制挂载 Codex 审查，Bug found 就打回。"
    },
    {
      start: "15:10:39", end: "15:11:34", slide: 3,
      label: "token 曲线：先建设后审查",
      transcript: "In the bottom left corner there is a very interesting statistic: the token consumption in this model. We noticed that in the early stages the builder agent's token consumption was very high, because it wanted to complete all tasks as quickly as possible and push things forward; for review, the consumption was not that high — partly because the goals broken down in the early stages may not have been completed yet, so consumption stays limited until it reaches a critical point where almost all the tasks are nearly completed, and they basically reach a balance. Going further, the reviewer's responsibility and goal is to find as many potential problems as possible in the completed work, so it conducts thorough reviews and its investment keeps increasing; the builder, having completed the previous tasks, mainly fixes the P0/P1 issues encountered in the early stages, and later focuses on some simpler problems.",
      transcript_zh: "左下角有一个很有意思的统计：这个模型里的 token 消耗。我们注意到早期阶段 builder agent 的 token 消耗非常高，因为它想尽快完成所有任务、尽可能往前推；而 review 的消耗没那么高——部分原因是早期拆解的目标可能还没完成，消耗维持有限，直到接近某个临界点、几乎所有任务都快完成时，两者基本达到平衡。再往后，reviewer 的职责和目标是尽可能多地在已完成的工作里找潜在问题，所以会做彻底的审查，投入不断增加；而 builder 之前的任务都完成了，主要在修早期遇到的 P0/P1 问题，之后会转向修一些更简单的问题。",
      note: "对应 slide 左下角 Builder/Reviewer token 趋势图（相对趋势非绝对基准）；讲者口头补了 P0/P1 优先修复的解释。"
    },
    {
      start: "15:11:45", end: "15:12:26", slide: 3,
      label: "实战效果与 1.0 的局限",
      transcript: "In our practical experience this model has performed quite well — for example, web coding, or refactoring tasks on complex code systems; or, for mission-critical applications and certifications in certain industries, you can actually implement them in this way, which is a very good approach. However, version 1.0 also had some limitations: at that time it only supported two agent backends, Claude and Codex. Later we found the performance of domestic models was also quite good, but 1.0 did not extend well — the design of its entire workflow was mainly based on the plugins of Claude and Codex, plus some of our batch scripts, so the scalability wasn't actually that strong.",
      transcript_zh: "在我们的实践经验里，这个模型表现得相当好——比如 web coding，或者复杂代码系统上的重构任务；或者对某些行业的使命关键应用与认证，其实也可以用这种方式实现，是很好的路径。不过 1.0 也有局限：当时只支持两个 agent 后端，Claude 和 Codex。后来我们发现国产模型的表现也相当不错，但 1.0 没有做好扩展——整个工作流的设计主要基于 Claude 和 Codex 的插件，加上我们的一些批处理脚本，所以扩展性其实没那么强。",
      note: "字幕中的 version 0 是口误，实指 1.0；扩展性局限直接引出下一页 Humanize 2.0 的重写动机。"
    },
    {
      start: "15:12:42", end: "15:13:30", slide: 4,
      label: "Humanize 2.0：编排能力抽成 CLI",
      transcript: "So we have Humanize 2.0. The mission of Humanize 2.0 is to abstract the workflow orchestration capabilities from the best practices of RLCR, and to create a CLI that supports a large number of agents. Why do we need a CLI that supports a large number of agents? Because the people who build the models understand their own models better — when they launched their own agent CLIs, they made many optimizations for their own long-running models. Our expectation is to hand over the ability to tune the model itself to the model vendor, and we will focus on the effect of workflow orchestration. Besides agent support, we also hope to have more unified trace output to help us with auditing and verification. So besides rewriting the previous version 1.0, Humanize 2.0 also supports many other interesting workflows.",
      transcript_zh: "于是我们有了 Humanize 2.0。Humanize 2.0 的任务，是把 workflow 编排能力从 RLCR 的最佳实践里抽象出来，并做一个能支持大量 agent 的 CLI。为什么需要支持大量 agent 的 CLI？因为做模型的人最懂自己的模型——他们推出自己的 agent CLI 时，针对自己的长程模型做了很多优化。我们的期望是把调优模型本身的能力交还给模型厂商，我们专注于 workflow 编排的效果。除了 agent 支持之外，我们还希望有更统一的 trace 输出，帮助我们做审计和验证。所以在重写 1.0 之外，Humanize 2.0 还支持很多其他有趣的工作流。",
      note: "字幕中的 ILCR 实为 RLCR、long green 实为长程（long-running）；One flow, many agents, one trace 的口号与此对应。"
    },
    {
      start: "15:13:44", end: "15:14:35", slide: 4,
      label: "RLAR 与多智能体接力",
      transcript: "We support workflows such as RLAR, where it is no longer a builder but an actor — it doesn't have such strong access-control validation, but it offers a lot of flexibility. Another feature of this framework is that it allows multiple agents to work together in the same workspace or repository in a relay-like manner. Different agents do not share context; they merely relay the process documents or the descriptions we generate for the whole repository. You can configure two agents, or even ten agents — there aren't that many limitations. One advantage is that you can easily evaluate the performance of different agents; another is that you can use different agents to implement the parts you need, which greatly improves the flexibility of the whole system, and it also prevents issues like a new language model or an agent CLI update from affecting the design of your entire workflow.",
      transcript_zh: "我们支持诸如 RLAR 这样的工作流——它不再是 builder 而是 actor，没有那样强的访问控制校验，但灵活性很高。这个框架的另一个特性，是允许多个 agent 以接力方式在同一个 workspace 或仓库里协作。不同的 agent 不共享上下文，只是接力传递我们生成的整个仓库的过程文档或描述。你可以配两个 agent，甚至十个 agent，没有那么多限制。一个好处是可以方便地评估不同 agent 的表现；另一个是可以按需用不同的 agent 实现你需要的部分，大大提升整个系统的灵活性，也能避免新语言模型或 agent CLI 更新影响你整个工作流的设计。",
      note: "字幕中的 RAR 与 frame teeth 按 deck 修正为 RLAR 与 framework；RLAR 对应 official/rlar（actor + fresh reviewer），flame_chase 系列现场未点名。"
    },
    {
      start: "15:15:07", end: "15:15:26", slide: 5,
      label: "实践成果：KDA 榜单与机器人",
      transcript: "Here we've listed some of the better practices of Humanize — there are actually many examples, but I've simply picked two: KDA, a work that optimizes the performance of CUDA operators. Basically, after KDA came out it was used to create its dynamic workflow, and it is generally ranked in the top three on the leaderboard — almost every week it is in the top three or the top 5%, and at most it can optimize the original operator to a factor of 1.69. In addition, we have a robot whose coding heavily utilizes Humanize, and it has also entered the crowdfunding and mass-production stage.",
      transcript_zh: "这里列了 Humanize 的一些较好实践——例子其实很多，我只简单挑两个：KDA，一个优化 CUDA 算子性能的工作。KDA 出来之后，基本被用来创建它的 dynamic workflow，在 leaderboard 上一般排前三——几乎每周都在前三或前 5%，最多能把原有算子优化到 1.69 倍。另外我们有一个机器人，它的编码大量使用了 Humanize，目前已经进入众筹和量产阶段。",
      note: "字幕中的 SDA/kDa/renovations 均按 deck 修正为 KDA；机器人即 Beni，slide 另标注 1.17–1.69× SOTA 与 SOLExecBench L1 #1。"
    },
    {
      start: "15:15:44", end: "15:16:25", slide: 6,
      label: "边缘约束：需要统一运行时",
      transcript: "As we saw from the previous introduction to Humanize, its ability to execute long-running tasks is quite good, especially in workflow orchestration and planning — however, it presents even greater challenges for mission-critical scenarios like ours. For example, these scenarios might be used on the edge, where resources are deterministic: you might not be able to support all agent backends, and you can't possibly integrate all models. In that case, we need to provide a unified agent runtime as its backend to drive the entire design. So we created an agent harness, or agent runtime, for the client side; after participating in the DeepSeek harness internal testing and its official open-source release, we found that the DeepSeek harness is also quite suitable for this kind of client-side implementation.",
      transcript_zh: "从前面 Humanize 的介绍可以看到，它执行长程任务的能力相当不错，尤其是 workflow 编排和规划——但对我们这类使命关键场景，挑战反而更大。比如这些场景可能用在边缘端，资源是确定性的：你可能没法支持所有的 agent 后端，也不可能接入所有模型。这种情况下，我们需要提供一个统一的 agent runtime 作为后端，来驱动整个设计。所以我们做了一个面向客户端的 agent harness，也就是 agent runtime；后来参加 DeepSeek harness 的内测和正式开源发布后，我们发现 DeepSeek harness 也相当适合这类客户端实现。",
      note: "Rein 早期的技术底座在字幕中转写为 Piqu，无法对应确切名称，按“另一套底座”处理；tiptic harness 修正为 DeepSeek harness。"
    },
    {
      start: "15:16:52", end: "15:17:58", slide: 6,
      label: "插件化与 Agent Preset",
      transcript: "There are two main reasons. First, it's based on a plug-in design philosophy: when the harness was open-sourced it actually included more than seventy plugins, mainly geared towards the client side, or rather towards certain coding scenarios. Based on our observations, we might not need that many plugins — we are more geared towards situations with deterministic resources and controllable consumption. Besides the high level of customization this plugin base provides, another very important design feature is the agent preset — essentially a preset for the agent's operating environment. Once your language model runs on your system, it will need support for system prompts, tool calls, and now sandboxes. Traditionally, different long-running models only perform well within their respective vendor-provided agent CLIs; we can use agent presets to configure different language models with the environment that best suits them — the one that makes them most comfortable at work — and push things forward. Since many of our features are implemented using plugins, I can achieve maximum resource reuse: a unified agent runtime on which different language models can run, and I can improve the performance of each language model as much as possible.",
      transcript_zh: "主要有两个原因。第一，它基于插件化的设计理念：harness 开源时其实带了七十多个插件，主要面向客户端，或者说面向某些编码场景。按我们的观察，我们可能用不了那么多插件，我们更面向确定性资源、消耗可控的情形。在插件带来的很高的定制能力之外，另一个非常重要的设计特性是 agent preset——本质上是对 agent 运行环境的预设。你的语言模型要在系统上跑，就需要 system prompt、tool call，以及现在的 sandbox 等支持。传统上，不同的长程模型只在各自厂商提供的 agent CLI 里才表现好；我们可以用 agent preset 为不同的语言模型配置最适合它的环境——让它工作得最舒服——把事情往前推。由于我们的很多功能是用插件实现的，我能实现最大程度的资源复用：一个统一的 agent runtime，不同的语言模型都能在上面跑，并且尽可能提升每个语言模型的表现。",
      note: "字幕中的 Lock & Green 修正为 long-running；Agent Preset 即 persona、tools、context 的预设组合，Rein owns the front door。"
    },
    {
      start: "15:18:25", end: "15:19:01", slide: 7,
      label: "OS 全景：定位在中间件层",
      transcript: "We have a preview of this panoramic view — just a simple representation here. If I were in a mission-critical OS, where would it fit in? Actually, our discussion is still focused on the middleware level. In our actual testing, for some highly real-time tasks, no matter how much optimization you do, it's still difficult to meet our needs; but for some scenarios, such as monitoring, security auditing, and asynchronous non-real-time control, the agent can already handle all of these tasks. Given these goals and needs, we can use the deterministic orchestration capabilities of version 2.0 to help us make better plans, and then use a unified agent runtime with agent presets to support more models to meet our needs.",
      transcript_zh: "我们有这样一个全景预览——这里只是简单表示。如果放在一个使命关键 OS 里，它处在什么位置？其实我们的讨论仍集中在中间件层。在实际测试中，对一些强实时任务，无论做多少优化，都很难满足我们的需求；但对一些场景，比如监控、安全审计、异步非实时控制，agent 已经能全部胜任。基于这些目标和需求，我们可以用 2.0 的确定性编排能力帮我们做更好的规划，再用统一的 agent runtime 通过 preset 支持更多模型，满足我们的需求。",
      note: "对应 slide 自底向上的分层图：Linux OS 与 x86-64/ARM64/RISC-V64 之上是 ROS 2、DDS 等中间件，再上是 Rein 与 Humanize 2.0 动态工作流。"
    },
    {
      start: "15:19:09", end: "15:19:45", slide: 8,
      label: "权限流：事前生成合规动作流",
      transcript: "Besides providing the agent preset, a crucial aspect is that we still need to perform relevant verification and auditing on its permissions. Our view here: for mission-critical scenarios like this, the real-time requirements are quite high, so we don't want all the low-level commands executed by the agent — whether within the sandbox or directly reading and writing files — to undergo the security and compliance audit of the entire workflow before it performs these actions. We need to maintain the security of the top layer first, and then combine it with a solution like the sandbox to provide a real-time solution for permission verification.",
      transcript_zh: "除了 agent preset 之外，很关键的一点是我们仍要对它的权限做相应的校验和审计。我们的看法是：对这类使命关键场景，实时性要求很高，我们不希望 agent 执行的每条底层命令——无论是在 sandbox 里，还是直接读写文件——都要在执行前经过整个工作流的安全合规审计。我们先把顶层的安全性保住，再结合 sandbox 这类方案，提供一个实时的权限校验方案。",
      note: "slide 口号 Generate once / execute many：事先生成权限合规的动作流（command·path·scope），执行期只放行校验过的流。"
    },
    {
      start: "15:20:13", end: "15:20:44", slide: 9,
      label: "三级审计与人工门闸",
      transcript: "Another scenario is that we still want the agent to be transparent and controllable to us: the output of the agent during operation should be auditable, archived and retained. This also involves some situations that require human intervention — we have divided it into three levels. The L0 level is when it performs some readable operations, or some of the permitted ones: if these resources are not sensitive, we can let the agent do it itself. The second scenario, in the L1 case, is that it may request some resources from your system or access resources outside its own workspace, which may involve some key points that require human approval. When the highest level, L2, is reached, it might involve access to highly sensitive resources in your system — in such cases, human intervention is required to enforce the process.",
      transcript_zh: "另一个场景是，我们希望 agent 对我们是透明、可控的：agent 运行时的输出要可审计、可归档留存。这也涉及一些需要人工介入的情形，我们把它分成三级。L0 是它执行一些可读操作，或者说一些被允许的操作：如果这些资源不敏感，可以让 agent 自己做。第二种情形，L1 的情况，是它可能向系统申请一些资源，或访问自己 workspace 之外的资源，这就可能涉及一些需要人工审批的关键点。到最高级 L2 时，可能涉及访问系统里高度敏感的资源——这种情况下必须强制人工介入流程。",
      note: "三级对应 slide 的 L0 读/L1 工作区写/L2 系统与外部；审计落盘于 .rein/{sessions,traces} 与 effect-ledger.jsonl，现场未点名路径。"
    },
    {
      start: "15:20:53", end: "15:21:32", slide: 10,
      label: "Demo：hypervisor 上 Linux+RTOS 双域",
      transcript: "Here's a demo example: it actually supports different domains through a low-level hypervisor. One is the domain oriented towards this kind of decision-making; the other is the RTOS domain oriented towards reliability and real-time control. We actually deploy the entire agent OS runtime on Linux, which can coexist with other middleware, such as ROS and DDS, which we have listed here. In this way we can monitor and audit the entire system, and since it's on Linux, it won't affect the real-time performance of the entire system — thus we can achieve a very good balance between real-time performance, reliability, and the overall intelligence of the system.",
      transcript_zh: "这里是一个 demo 例子：它实际上通过底层 hypervisor 支持不同的域。一个面向决策类场景；另一个是面向可靠性与实时控制的 RTOS 域。我们实际上把整个 agent OS runtime 部署在 Linux 上，可以与其他中间件共存，比如这里列出的 ROS 和 DDS。这样我们就能对整个系统做监控和审计；因为在 Linux 上，不会影响整个系统的实时性——由此在实时性、可靠性和系统整体智能之间取得非常好的平衡。",
      note: "字幕中的 Atos domain 按任务背景修正为 RTOS domain（slide 上为 Zephyr VM）、Rose 修正为 ROS；+20–30% 等估算数字现场未逐条念。"
    },
    {
      start: "15:21:41", end: "15:22:52", slide: 11,
      label: "下一步：权限、回放与基准",
      transcript: "Our next plan is to implement permission verification, which is something we still hope to do. To be more specific: how should we design for scenarios that are highly sensitive to real-time performance? And for scenarios that are not that sensitive but have high security requirements, we might need a better security-auditing strategy. We already support auditing capabilities, including tracing — can we achieve trace replay, meaning we can perform it outside of the original device environment, within our development environment? It has been very helpful for the iteration of our entire system; however, there are also many challenges in designing agents for complex, multi-architecture device systems. Another important point: for agents, having a very useful benchmark is something I think is very important — how do you quantify the behavior of your entire agent? We will also open-source a benchmark for mission-critical scenarios to quantify the performance of various agent harnesses.",
      transcript_zh: "我们的下一步计划是实现权限校验，这是我们还希望做的。更具体地说：对强实时敏感的场景该怎么设计？对不那么实时敏感但安全要求高的场景，我们可能需要更好的安全审计策略。我们已经支持了包括 trace 在内的审计能力——能不能做到 trace replay，也就是在原始设备环境之外、在我们的开发环境里回放？这对整个系统的迭代非常有帮助；不过为复杂的多架构设备系统设计 agent 也有很多挑战。另一个重要的点是，对 agent 来说，有一个非常好用的 benchmark 我觉得非常重要——你怎么量化整个 agent 的行为？我们也会开源一个面向使命关键场景的 benchmark，来量化各种 agent harness 的表现。",
      note: "字幕中的 trace replies 修正为 trace replay；四项计划对应 slide 11 的 Permission Matrix、Audit Replay、Linux+Zephyr、Benchmark。"
    },
    {
      start: "15:23:05", end: "15:23:05", slide: 12,
      label: "开源仓库与致谢",
      transcript: "Okay, that's all for my sharing. Here's a list of some of the repositories we mentioned earlier — feel free to check them out if you're interested. Okay, thank you.",
      transcript_zh: "好，我的分享就到这里。这里列出了我们前面提到的一些仓库，有兴趣的话欢迎去看看。谢谢大家。",
      note: "三个仓库为 processmission/rein、PolyArch/humanize、humanfia/humanize2；15:24 之后为会场调设备的闲聊，未收。"
    }
  ]
};
