window.talk = {
  title: "Distributed Orchestration and Architecture Evolution for Edge-Cloud Collaborative AI Inference",
  speaker: "Shane Wang · Intel",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/edge-cloud.pdf",
  assets: "assets/edge-cloud",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "16:04:39", end: "16:05:03", slide: 1,
      label: "开场：Intel 云边端协同推理方案",
      transcript: "Alright, let me begin. I'm from Intel — my name is Shane — and today I'm going to introduce what we've developed: an integrated cloud-edge-device collaborative inference solution.",
      transcript_zh: "好，我开始吧。我来自 Intel，我叫 Shane。今天要给大家介绍的是我们开发的一套整合的云—边—端协同推理解决方案。",
      note: "Wordly 把讲者自称的名字转写成 Qing，按 deck 修正为 Shane；开场即点题云边端协同推理。"
    },
    {
      start: "16:05:03", end: "16:06:24", slide: 2,
      label: "纯云端推理的四类瓶颈",
      transcript: "Both pure cloud and pure edge computing have their drawbacks. Pure cloud AI inference has latency issues — the round trip generally exceeds one hundred milliseconds. Since I come from a hardware company, I'll look at AI inference mainly from that perspective. Besides high latency, pure cloud inference also needs a lot of bandwidth: to run inference on images or videos in the cloud you need huge bandwidth, sometimes costing more than the inference itself. There is also data autonomy — the data belongs to me; it can't become someone else's just because it is uploaded — plus security: friends at state-owned enterprises are very worried that data put in the cloud might leak, whether personal or corporate secrets. And the dependence on the network is high: once the internet is disconnected, you can hardly do anything.",
      transcript_zh: "纯云和纯边缘计算各有短板。纯云 AI 推理首先有时延问题——往返时延普遍超过一百毫秒。我来自硬件公司，所以主要从硬件公司的视角来看 AI 推理。除了时延高，纯云推理还需要大量带宽：要把图像、视频放到云端推理，带宽开销巨大，有时甚至超过推理本身的费用。还有数据自主性问题——数据是我的，不能一上传就变成云厂商的。此外是安全：一些在国企的朋友非常担心数据放到云端会泄露，不管是个人隐私还是企业机密。最后是对网络的依赖太高：一旦断网，你可能什么都做不了。",
      note: "四个瓶颈（时延/带宽/隐私/网络依赖）逐条口头展开；hardware company 的自我定位插在第一个瓶颈之后。"
    },
    {
      start: "16:06:41", end: "16:07:43", slide: 3,
      label: "纯边缘/端侧推理的局限",
      transcript: "Conversely, running inference purely on the edge or device side also has problems. Our company has hardware like PCs or laptops, but generally these are insufficient for large models, especially those with tens or hundreds of billions of parameters. To run such models on local compute you need heavy pruning or quantization, which hurts inference accuracy. Then there is maintenance and operations: edge nodes are scattered everywhere, and monitoring, updating and troubleshooting them is quite troublesome. Finally, energy consumption — many edge nodes run on batteries, and always-on inference services drain them very fast.",
      transcript_zh: "反过来，推理全放在边缘或端侧也有问题。我们公司有 PC、笔记本这类硬件，但它们一般跑不动大模型，尤其是几十亿、上百亿参数规模的。要靠本地算力跑这类模型，就得做深度裁剪或量化，这又会损失推理精度。再者是运维：边缘节点四处分散，监控、更新、排障相当麻烦。最后是能耗——很多边缘节点靠电池供电，推理服务全天候在线，电量消耗会非常厉害。",
      note: "Wordly 的 APCs 按 Intel 产品语境修正为 PC；算力、精度、运维、能耗四条与 deck 页一一对应。"
    },
    {
      start: "16:08:11", end: "16:09:47", slide: 4,
      label: "云边端协同：分而治之",
      transcript: "Cloud inference has its problems, edge inference has its own issues — this can't be solved on a single dimension. The industry's idea is to combine them into cloud, edge and device. The device collects data and performs inference with very low latency, though on a small model; it interacts with users and does simple filtering. The cloud handles large-model inference, long-term planning, global scheduling, even training and updating data. In between, the edge: edge servers don't have to live in a data center — they can sit inside an enterprise or a department — running small-to-medium models under compute limits. Being within the enterprise, their real-time performance is much better than the cloud's and their latency lower. The edge also helps with filtering — not everything needs to go to the cloud — and with desensitization: only desensitized data goes up for further reasoning, taking that work off the middle.",
      transcript_zh: "云端推理有问题，边缘推理也有问题，单一维度解决不了，所以业界的思路是把云、边、端结合起来。端侧负责采集数据，并以极低时延做推理，但只能跑小模型，承担与用户交互和简单过滤。云端负责大模型推理、长期规划、全局调度，甚至按需更新数据、做训练。中间的边侧：边缘服务器不一定放在数据中心，可以落在企业或部门内部，受算力限制跑中小模型；因为就在企业内，实时性远好于云端、时延更低。边缘还能帮忙做过滤——不是什么都要传上云——以及脱敏：把脱敏后的内容放到云端再做进一步推理，中间这些活它都能分担。",
      note: "三层分工：device 采集+低时延小模型，cloud 训练+调度+复杂推理，edge 企业内中小模型+过滤脱敏。"
    },
    {
      start: "16:10:02", end: "16:10:52", slide: 5,
      label: "拐点：从 LLM 到多智能体",
      transcript: "Since this event is AGNTCon, we know AI is developing from simple dialogue into the form of agents. We've seen online surveys: today maybe only one percent of companies' software uses agents, but by 2028 — just a prediction — thirty-three percent of software will contain agents to some extent. So what happens after an enterprise has agents? The same contradictions appear. One is latency control: some agents need latency under one hundred milliseconds, especially for real-time tasks. Then there is privacy and security, as mentioned earlier; and we can use the cloud for very deep, very large model inference.",
      transcript_zh: "既然这次是 AGNTCon，我们知道 AI 正从简单对话走向 agent 形态。我们看过网上的调研：现在企业软件里用 agent 的也许只有 1%，但到 2028 年——这只是预测——33% 的软件会在某种程度上包含 agent。那么企业有了 agent 之后会发生什么？同样会碰到前面说的矛盾。一是时延控制：有些 agent 要求时延不超过 100 毫秒，尤其是实时任务。再就是前面提到的隐私与安全；同时可以用云端做非常深、超大模型的推理。",
      note: "Gartner 数字（今天 <1% → 2028 年约 33%）来自 deck 引用框，讲者口头强调这只是预测；三股力量收在时延、隐私两点上。"
    },
    {
      start: "16:11:05", end: "16:12:16", slide: 6,
      label: "参考架构：端侧本地推理栈",
      transcript: "To break through the compute limits of the edge and device side, we proposed what we call a reference architecture. This picture has two colors of boxes. The blue ones are what originally runs locally for inference — on a PC or laptop. Reading top to bottom, the top shows agents or applications: often not a single agent but a group of agents working together. Below that we provide APIs, possibly in the form of microservices, using cloud-edge collaboration and cloud infrastructure. Further down are local inference frameworks, which use local models. On the edge, given compute limits, these are small-to-medium models — so a conversion toolkit turns the large model into a small-to-medium one, and finally your machine's CPU, GPU or NPU runs the corresponding inference.",
      transcript_zh: "基于突破边端算力限制这个目标，我们提出了一个所谓的参考架构。这张图有两种颜色的框。蓝色框是原本放在本地做推理的部分，比如在 PC 或笔记本上。从上往下看，最上面是 agent 或应用：往往不是一个 agent，而是一组 agent 协同工作。再往下我们提供一些 API，可能以微服务形式，借助云边协同使用云端基础设施。再往下是本地推理框架，使用本地模型；边缘侧受算力限制多用中小模型，因此有模型转换工具箱把大模型转成中小模型，最后由你机器上的 CPU、GPU 或 NPU 执行相应推理。",
      note: "蓝色框=端侧本地栈：agent/应用 → 微服务 API → 本地推理框架 → 模型转换 → CPU/GPU/NPU。"
    },
    {
      start: "16:12:42", end: "16:14:58", slide: 6,
      label: "参考架构：隐私、路由与云边协同层",
      transcript: "Without the white part, the blue boxes would be enough to run on your machine, configured by its hardware specs. For cloud-edge-device collaborative inference we added this white part, divided into several layers. First privacy protection, based on your policy — for a business or an individual: what may go to the cloud, what absolutely may not, what partly may; during reasoning, information is filtered accordingly. There is also auditing, and anonymization as mentioned earlier: my name and actions are turned into symbolic codes or vectors, so even after cloud reasoning the cloud doesn't actually know what I said. Then smart routing: everyone has many large models, and the unit price and capability of their tokens differ; by task you decide which large model to run — even within one task, subtasks can run different models — so semantic routing here helps with task analysis. Resource awareness assesses the token economy — which large model is most cost-effective — and an adaptation layer handles things like load balancing when inference tasks are heavy. Then we mainly use the cloud infrastructure: Kubernetes in the cloud, or KubeEdge to manage edge infrastructure resources.",
      transcript_zh: "如果没有白色部分，蓝色框按你机器的硬件规格就够跑了。为了做云边端协同推理，我们加了这块白色部分，分成几层。先是隐私保护，基于你的策略——企业或个人的——哪些可以放云、哪些绝对不行、哪些部分可以，推理过程中据此过滤信息。还有审计，以及前面说的匿名化：把我的名字、行为转成符号编码或向量再上云推理，云端就算推理完也不知道我说了什么。然后是 smart routing：大家手上有多个大模型，token 单价和能力各不相同，可以按任务决定哪个任务跑哪个大模型，甚至同一任务里的子任务也可以跑不同模型，这里的语义路由帮你做任务分析。资源感知评估 token 经济性——哪个大模型性价比最高；适配层则做负载均衡这类事，推理任务很重时用得上。底层主要是云基础设施：云端用 Kubernetes，边缘用 KubeEdge 来管理基础设施资源。",
      note: "白色部分=云边协同层：privacy protection（policy check / regex audit / data masking）、smart routing（token 单价与能力）、负载均衡；架构图出处 oaaif.org，deck 上 Inference Gateway 标注 LiteLLM Proxy Server。"
    },
    {
      start: "16:15:20", end: "16:15:36", slide: 7,
      label: "支柱一：异构计算与图切分",
      transcript: "If this runs on a corporate LAN or in the cloud, it is not just about your CPU and GPU — you need to see which individual chip suits it best, because each chip has its own strengths and weaknesses. So besides managing the local XPU, we do heterogeneous computing management within the cloud infrastructure. In addition, graph partitioning: partitioning the model's graph and distributing the weights to different resource nodes — the first main part is matching reasoning work to those different resources.",
      transcript_zh: "如果跑在企业局域网或云里，就不只是 CPU、GPU 的事了——要看哪种芯片最合适，因为每颗芯片各有强弱。所以在管理本地 XPU 之外，我们还能在云基础设施里做异构计算管理。另外是图切分：把模型的图切开后，将权重分发到不同资源节点上——第一大部分就是按不同资源匹配相应的推理工作。",
      note: "支柱 01：Xeon/Gaudi/NPU 异构匹配 + 运行时图切分；支柱的引入句在上一条末尾（16:14:58）。"
    },
    {
      start: "16:15:50", end: "16:16:14", slide: 7,
      label: "支柱二：网络感知调度",
      transcript: "The second part is network-aware scheduling. It means monitoring the network at all times: when the network goes down, or is unstable or laggy, how do we switch collaborative reasoning to a more stable state? If a node is unstable, I can place the workload elsewhere, or even go multi-cloud — if one cloud feels unstable or its latency is high, we switch to another cloud.",
      transcript_zh: "第二部分是网络感知调度，意思是随时监测网络：断网、不稳或卡顿时，怎么把协同推理切到更稳定的状态？某个节点不稳定，我可以把负载放到别处，甚至多云——感觉某朵云不稳或时延高，就切到另一朵云。",
      note: "支柱 02：实时遥测，网络不稳时切换节点甚至换云。"
    },
    {
      start: "16:16:37", end: "16:16:53", slide: 7,
      label: "支柱三：断网自愈",
      transcript: "Another factor: can it self-heal after a network outage? As mentioned earlier, with a pure cloud solution, once the network drops many things stop — it is too reliant on the network. Now we have edge computing, and what comes out of the edge includes some basic models. So if the connection to the cloud is lost, we can switch to the edge and keep the inference service uninterrupted.",
      transcript_zh: "再一个因素是断网后能否自愈。前面说过，纯云方案一旦断网很多事就停了，对网络依赖太重。现在有了边缘计算，边缘侧也带着一些基础模型，所以与云的连接断了以后，可以切到边缘，让推理服务不中断。",
      note: "支柱 03：断网后切到边缘保底模型，服务不中断。"
    },
    {
      start: "16:17:18", end: "16:18:16", slide: 8,
      label: "一次请求的旅程：端边云分工",
      transcript: "Let's see how a reasoning request works. If a user has an intent, it is first sent to the device layer — the device is not necessarily an embedded device; a PC or laptop is also your device. The device has a simple XPU: it can wake the device, do basic tasks like filtering or biometric authentication, and handle more complex tasks like managing local personal data, including personal vector databases and knowledge bases. If an enterprise knowledge base sits at the edge, the edge's compute is better than the device's, and inference runs on that knowledge base there — the knowledge base is privately owned by the enterprise, which is exactly why privacy matters and it can't be placed in the cloud. For very heavy tasks needing large or even super-large models for deeper reasoning, after edge filtering and desensitization you can then put them into the cloud.",
      transcript_zh: "来看一个推理请求是怎么走的。用户有了意图，先送到端层——端不一定是很简单的嵌入式设备，你用的 PC、笔记本也是你的端。端上有简单的 XPU：可以唤醒设备、做过滤或生物识别认证这类基础任务，还能处理更复杂的任务，比如管理本地个人数据，包括个人向量库和知识库。如果企业知识库放在边缘，边缘算力比端好，就在上面基于知识库做推理；这个知识库是企业私有的，所以数据隐私恰恰是重点，不能放云里。遇到很重的、需要大模型甚至超大模型做深层推理的任务，经边缘过滤、脱敏之后，再考虑放到云端。",
      note: "请求路径 USER → DEVICE → EDGE → CLOUD；讲者强调 device 不限于嵌入式设备，PC 也是 device；PC 是否算 edge 的辨析在下一条开头。"
    },
    {
      start: "16:18:44", end: "16:19:48", slide: 9,
      label: "社区共建：Sedna/KServe/LiteLLM",
      transcript: "Looking at the community, there are actually many similar projects. Inside the KubeEdge community there is a sub-project called Sedna, a work done for cloud-edge collaborative reasoning. Triton Inference Server has similar functions, and KServe can also help you with inference and graph partitioning. Under the Linux Foundation there is LF Edge, and OAAIF is currently running this activity — they collaborated on using edge inference together with the cloud. There is also LiteLLM, an open source project for routing reasoning requests to models: for example, email goes through one model, while writing code runs the cloud model. We ourselves are working on this within the reference architecture as well.",
      transcript_zh: "再看社区，其实有很多类似项目。KubeEdge 社区里有个子项目叫 Sedna，就是做云边协同推理的工作。Triton Inference Server 有类似功能，KServe 也能帮你做推理、图切分这些事。Linux 基金会下有 LF Edge，还有个 OAAIF 正在做这件事，他们合作把边缘推理与云结合起来。另外还有 LiteLLM 这个开源项目，用于推理请求的路由：比如写邮件走这个小模型，写代码就跑云端模型。我们自己也在参考架构里做这件事。",
      note: "Wordly 转写失真严重：Cooper edge/Senator=KubeEdge Sedna，Twitter's inference server=Triton，key server=KServe，Lottery=LiteLLM（即 deck 第 6 页的 Inference Gateway）；16:18:47 讲者提到此页当时被遮挡了一下。"
    },
    {
      start: "16:20:02", end: "16:20:17", slide: 10,
      label: "优势一：毫秒级实时响应",
      transcript: "Afterwards there are actually many benefits. The most typical is latency — the response time is shorter. Because of this core advantage, the inference path is shorter, it can generate a closed loop locally, and it can optimize the execution process — this addresses the latency issue.",
      transcript_zh: "之后其实有很多好处，最典型的就是时延——响应时间更短。因为这个核心优势：推理路径更短，能在本地形成闭环，还能优化执行过程，时延问题就解决了。",
      note: "slide 上 <20ms 等数字未逐条念，只讲了路径更短、本地闭环、执行优化。"
    },
    {
      start: "16:20:17", end: "16:20:41", slide: 11,
      label: "优势二：隐私与数据主权",
      transcript: "Secondly, private data does not need to go to the cloud or onto the internet. You can anonymize a lot of private data, or process it on an edge platform, like an internal enterprise knowledge base or a personal knowledge base. This protects your private data and also supports data autonomy — my data is always mine.",
      transcript_zh: "第二，私有数据不必放到云上或公网。很多私有数据可以匿名化，或者放在边缘平台上处理，比如企业内部知识库或个人知识库。这样既保护了私有数据，也保住了数据自主——我的数据永远是我的。",
      note: "对应 PIPL/GDPR 页；讲者以企业/个人知识库的落地方式来解释脱敏与数据主权。"
    },
    {
      start: "16:21:00", end: "16:21:10", slide: 12,
      label: "优势三：省带宽、降成本",
      transcript: "It also helps with network bandwidth: through edge or device-side computing, even filtering can be done with models, so you don't have to put one hundred percent of the data online. This saves resources, optimizes the system and reduces costs.",
      transcript_zh: "对网络带宽也有帮助：通过边缘或端侧计算，连过滤都可以用模型来做，不必把 100% 的数据都放到线上。这样既省资源、优化系统，也降低成本。",
      note: "slide 上 35%-40% 成本节省、80% 骨干流量削减未逐字念。"
    },
    {
      start: "16:21:10", end: "16:21:51", slide: 13,
      label: "优势四：离线自治与高可靠",
      transcript: "And finally, what happens if the connection drops? It is highly available — even if the connection drops, it still provides uninterrupted service. It can also automatically migrate or switch when the network lags. In cloud-edge collaboration, when the cloud has model updates, it can send incremental updates to the edge to keep iterating, without shipping the whole model down and up. On your local machine too — if some data is allowed, you can put it on the cloud for training, then further optimize the local model afterwards.",
      transcript_zh: "最后是断连了怎么办。它是高可用的：即使连接断了，服务也不中断。网络卡顿时还能自动迁移或切换。云边协同时，云端有模型更新，可以把增量更新发到边缘持续迭代，不必把整个模型搬上搬下。本地机器也一样——某些数据如果允许，可以放到云端训练，之后再进一步优化本地模型。",
      note: "三卡页（不中断服务/动态迁移/增量更新）与讲者叙述一一对应，末尾补了云端训练回流优化本地模型。"
    },
    {
      start: "16:22:12", end: "16:22:59", slide: 14,
      label: "场景：个人 AI 助手",
      transcript: "Let's look at some scenarios — I won't go into too much detail. Take personal AI. Some of our friends at large state-owned enterprises, like aircraft companies, have told us they have this need: they are extremely protective of their own information, and if putting it online for reasoning leaked it, they would be in deep trouble — that is absolutely off the table. For a personal AI assistant, if I'm particularly sensitive about certain things, many parts of the work can be done offline, even locally, with small-to-medium models. Our company also has such equipment — for example a photo box: you can search your historical photos or send messages, and it helps you find your photos locally by running the inference process.",
      transcript_zh: "看几个场景，我不展开细讲。比如个人 AI。我们一些国企的朋友，像大型飞机公司，就明确说有这种需求：对自己的信息看得极重，放到线上推理一旦泄露就麻烦大了，这种事绝对不能上网。对个人 AI 助手来说，如果我对某些东西特别敏感，很多工作可以离线甚至本地完成，用中小模型就行。我们公司也有这类设备，比如一个照片盒子：你可以搜历史照片、发消息，它就在本地跑推理帮你找到照片。",
      note: "讲者补充的国企/飞机制造企业客户顾虑是 deck 上没有的现场素材；照片盒子是 Intel 自家设备举例。"
    },
    {
      start: "16:23:13", end: "16:23:34", slide: 15,
      label: "场景：机器人与具身智能",
      transcript: "There are other scenarios, like embodied intelligence, mainly because of its latency requirements — they can't be too long. If I'm doing obstacle avoidance, I can put that locally, but the robot's own computing power is insufficient. If I do it through the cloud and the latency is long, the robot becomes very, very sluggish.",
      transcript_zh: "还有其他场景，比如具身智能，主要卡在时延要求上——不能太长。做避障可以放在本地，但机器人本体算力不够；如果走云端，时延一长，机器人就会变得非常迟钝。",
      note: "Wordly 的 crowd intelligence 按 deck 修正为 embodied intelligence（具身智能）。"
    },
    {
      start: "16:24:01", end: "16:24:09", slide: 16,
      label: "场景：工业质检瑕疵检测",
      transcript: "Then there's industry, like factories doing product quality inspection — inspecting wafers and chips for scratches or defects. The production line itself collects a lot of photos; if this problem exists, the speed can't keep up, and quality inspection gets paralyzed.",
      transcript_zh: "再就是工业领域，比如工厂做产品质量检测，检测晶圆和芯片上的划痕、缺陷。产线本身采集大量照片，这个问题不解决，速度就跟不上，质检就瘫掉了。",
      note: "Wordly 把某晶圆厂客户名转成 Starlink，无从还原已略去；<5ms、省 95% 带宽、漏检率 -20% 等数字未逐字念。"
    },
    {
      start: "16:24:09", end: "16:24:19", slide: 17,
      label: "场景：智慧交通绿波调度",
      transcript: "And then there's this one, which I won't go into detail about — intelligent transportation, involving traffic lights or green waves. The traffic lights can be a node at the edge of the intersection, while the filtering of the whole road segment can be coordinated by the cloud platform.",
      transcript_zh: "然后是这个我不细讲的——智能交通，涉及红绿灯或绿波。红绿灯可以放在路口的边缘节点上，而我整个路段的过滤、协同则由云平台统一调度。",
      note: "讲者明说此页不细讲；红绿灯=路口边缘节点，绿波协同由云平台统一下发。"
    },
    {
      start: "16:24:19", end: "16:24:23", slide: 18,
      label: "场景：自动驾驶协同感知",
      transcript: "Autonomous driving is the same; we can do that now. And because we want to introduce a platform, there are actually similar things inside it — you can go and see them.",
      transcript_zh: "自动驾驶也是一样，我们现在就能做。因为要介绍一个平台，平台里面其实有类似的东西，大家可以去看。",
      note: "自动驾驶页一带而过，顺势转入 AI Hub 平台演示；Wordly 把平台名转写成形如 Tomorrow's Platform 的乱码，已略。"
    },
    {
      start: "16:24:39", end: "16:25:10", slide: 19,
      label: "AI Hub 上的云边端 agent 示例",
      transcript: "Our hub actually carries many applications. One of them, which I'd describe as an agent application, uses the collaborative reasoning mechanism we proposed — cloud-edge-device. Looking at its client, it interacts with the user through the client. On the edge side it has a vertical model — a pre-trained vertical model — plus some edge agents to help you do inference at the edge. In the cloud there are large cloud models and cloud-based incremental computing, since the model can also be updated this way. It adopts this architecture, and this agent application can actually be seen on our Intel AI Hub.",
      transcript_zh: "我们的 hub 上其实有很多应用。其中一个我把它归为 agent 应用，用的就是我们提出的云边端协同推理机制。看它的 client，通过客户端与用户交互；边缘侧有一个 vertical model——预训练的垂直模型——还有一些边缘 agent 帮你在边缘做推理；云端则是大模型和云端增量计算，因为模型也可以这样更新。它采用的就是这套架构，这个 agent 应用在我们的 Intel AI Hub 上就能看到。",
      note: "Wordly 把 hub 名转写成 limiter，按 deck 定为 Intel AI Hub；示例应用=client + 边缘垂直模型 + 云端大模型/增量计算。"
    },
    {
      start: "16:25:23", end: "16:25:32", slide: 20,
      label: "转场：AI Hub 演示与 Demo Booth",
      transcript: "If anyone is interested, you can go to the Demo Booth and check it out tomorrow. There is also a website where you can see all these applications. Let me show you now.",
      transcript_zh: "如果有兴趣，可以去 Demo Booth 看，明天就能看到。还有一个网站，上面能看到所有这些应用。我现在给大家放一下。",
      note: "播视频前约半分钟在调试设备（16:25:27–16:25:32 的两句已略）。"
    },
    {
      start: "16:26:03", end: "16:26:42", slide: 20,
      label: "AI Hub 视频：应用分类总览",
      transcript: "This is a video without sound. It categorizes the many agent applications on the hub into types. There are enterprise applications — some already used by enterprises, like a manufacturing company in Shanghai; it is not one application but a bunch of them. Then applications related to healthcare; education — we've worked with universities in Shanghai on educational agent applications; entertainment like gaming; open source projects from foundations doing charitable work, such as rare diseases; and product-related ones we call productivity improvements. The first ones I'll click on are the enterprise applications.",
      transcript_zh: "这是个没有声音的视频。它把 hub 上很多 agent 应用按类型分了类。有企业应用——有些确实已被企业使用，比如上海一家制造企业，而且不是一个应用，是一堆。还有医疗相关的；教育——我们和上海一些高校合作做过教育类 agent 应用；娱乐，比如游戏；还有一些基金会的开源项目做公益，比如罕见病；以及跟产品相关、我们叫生产力提升的。我先点开的是企业应用。",
      note: "视频静音播放，按企业/医疗/教育/娱乐/公益/生产力分类展示 AI Hub 上的应用。"
    },
    {
      start: "16:27:07", end: "16:29:13", slide: 20,
      label: "AI Hub 平台：算力支撑与撮合",
      transcript: "There are all sorts of things here, and the platform actually serves two purposes. One is whether the code is fully open source — some is, some isn't, depending on the authors; most of these applications are not developed by us but by third-party authors themselves. Our purpose is to provide computing power support: the platform is built on Intel hardware — edge devices such as PCs, Xeon servers and GPUs, with AI acceleration included — so these applications can use it at the edge. That includes AI PCs: a group of PCs managed as a cluster using KubeEdge. Third-party authors can put applications here to showcase them, and users who know nothing about them can see what an agent can do — whether it can help write papers — and actually try them out. The level of openness varies: some are open source, others only give an account and password that may expire in seven days, but behind them all is Intel platform hardware. Some companies say there is a lot of AI technology and they don't understand it all — so they post their requirements on the platform, and developers help them connect. So it's a platform for both display and demand — a matcher — and behind the scenes it uses the cloud-edge-device collaborative inference mechanism to access the servers.",
      transcript_zh: "这里面什么都有，这个平台其实有两个作用。一是代码是否完全开源——有的开源有的不开源，取决于作者；这些应用大多不是我们开发的，都是第三方作者自己做的。我们的目的是提供算力支撑：平台底层是 Intel 硬件——PC、Xeon 服务器、GPU 这类边缘设备，还包含 AI 加速——所以这些应用可以在边缘使用。也包括边缘上的 AI PC：一组 PC 用 KubeEdge 管成一个集群。第三方作者把应用放上来展示，完全不了解的用户也能看看这个 agent 能做什么、能不能帮着写论文，并且实际试用。开放程度各不相同：有的开源，有的只给账号密码、可能七天过期，但背后都是 Intel 平台硬件。有些公司说 AI 技术太多、自己搞不懂，就把需求发到平台上，开发者帮他们接入。所以它是个既做展示又做需求的平台——一个撮合者——背后用云边端协同推理机制接入服务器。",
      note: "Cooper Edge=KubeEdge；AI Hub 兼作供需撮合：企业发需求、开发者接入，底座是 Intel 硬件与云边端协同推理；16:27:16 有一处现场小位移已略。"
    },
    {
      start: "16:30:12", end: "16:30:27", slide: 21,
      label: "收尾致谢",
      transcript: "That's roughly it. If any developers or users are interested, you can go and take a look. Okay, that's about all for my speech — I don't know if there are any questions. Okay, thank you, everyone.",
      transcript_zh: "大概就是这些。如果有开发者或用户感兴趣，可以去看一下。好，我的演讲差不多就到这里，不知道大家有没有问题。好，谢谢大家。",
      note: "16:29:18 起换人调试、16:29:21 说视频只有一分钟，16:30:55 之后认领线缆/翻页笔的换场闲聊均未收录。"
    }
  ]
};
