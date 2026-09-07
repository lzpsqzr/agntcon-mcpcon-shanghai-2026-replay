window.talk = {
  title: "Coordination Engineering: The next leap in AI Agent engineering",
  speaker: "openJiuwen 社区团队",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/coordination.pdf",
  assets: "assets/coordination",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "14:35:42", end: "14:36:27", slide: 1,
      label: "开场：从治理一个 agent 到治理一个团队",
      transcript: "Hello, everyone. It's an honor to be here to discuss coordination engineering with you. It isn't something already established — it is still an engineering concept that has been developing over the past few years. First we learned to express problems to the model as a prompt; then we started to focus on how to organize the context, and further brought tools, skills, state and the execution loop into the harness — that is what we are all doing now: harness engineering. But now, when a task requires multiple agents to complete it together, our engineering object changes again: we not only need individual agents to do the work, but also organize the division of labor, communication, verification and recovery within the whole team. For now we call this set of engineering problems coordination engineering — not a fixed standard, but an engineering space we discovered in practice.",
      transcript_zh: "大家好，很荣幸今天来这里和大家探讨协调工程（coordination engineering）。它并不是一个已经定型的东西，而是过去几年一直在发展的工程概念。最初我们学会把问题写成 prompt 交给模型；接着开始关注如何组织 context，进一步又把工具、技能、状态和执行循环纳入 harness——这就是我们现在都在做的事：harness 工程。而现在，当一个任务需要多个 agent 共同完成时，我们的工程对象又变了：我们不仅要让单个 agent 把活干出来，还要组织整个团队内的分工、通信、验证与恢复。目前我们暂且把这套工程问题称为协调工程——它不是一个固定的标准，而是我们在实践中发现的一块工程空间。",
      note: "讲者全场未自报姓名（Wordly 记为 S3），deck 与口述均以 openJiuwen 社区团队名义，故 speaker 写团队名；14:34:09 与 14:35:15 两行试音未收录。对 harness 工程的回顾即第 5 页的分层图，此处先作口头铺垫。"
    },
    {
      start: "14:36:45", end: "14:37:36", slide: 2,
      label: "编排尚未收敛：层级、聊天室、团队制、人居中心",
      transcript: "First, the current state of the industry. Since the first half of this year, many multi-agent collaboration projects have emerged from the open-source community and industry. They have made many real attempts, but the approaches are far from converged. Some systems emphasize hierarchical coordination of tasks and have task graphs; others rely on methods like chat rooms to perform handoff engineering. Some are organized in a team-based manner, mimicking human task-based organizational collaboration; others put a human in the centre as the coordinator, assigning different tasks to different agents. The list of products here is simply to help us understand these forms. What is more noteworthy is a common change: people are no longer just talking to agents in a chat box — they increasingly participate in the task breakdown, the judgment, and the acceptance of results. Because of this, the collaboration mechanism is beginning to become an independent engineering problem.",
      transcript_zh: "先看行业现状。从今年上半年开始，开源社区和产业界涌现了很多多 agent 协同相关的项目。它们做了很多真实尝试，但路线远没有收敛：有的系统强调任务的层级编排，建有任务图；有的依赖聊天室这类方式在内部做 handoff 工程；有的按团队制组织，模仿人类以任务为单位的组织协作；还有的把人放在中心当协调者，给不同 agent 分配不同任务。这里列出的产品只是为了帮我们理解这些形态。更值得注意的是一个共同变化：人们不再只是在聊天框里和 agent 对话，而是越来越多地参与到任务拆解、判断和结果验收当中。正因为如此，协同机制开始变成一个独立的工程问题。",
      note: "页面产品例（Claude Code Agent Teams、Multica、Paperclip、WorkBuddy）讲者未逐一点评，只作形态示例。"
    },
    {
      start: "14:38:00", end: "14:38:31", slide: 3,
      label: "agent 变多，四类成本同步放大",
      transcript: "When we split a task into multiple agents, we also expand the scope of the whole task — but that doesn't necessarily lead to better results automatically. More members increase token, scheduling and communication overhead; after the paraphrasing, summarizing and aggregation, distortion may also occur; dependencies between tasks create new failure modes; and performing unified verification on all these outputs is also a challenge. In an enterprise environment we additionally face state persistence, security isolation and fault recovery. And if we keep expanding the capability boundary, the overall systemic cost will also increase significantly.",
      transcript_zh: "当我们把一个任务拆给多个 agent，整个任务的范围也被放大了——但这并不会自动带来更好的结果。成员变多，token 调度和通信开销会上升；经过转述、摘要、聚合之后还可能发生失真；任务之间的依赖会引入新的失败模式；对所有输出做统一验证也是一项挑战。在企业环境里，我们还会遇到状态持久化、安全隔离和故障恢复等问题。而如果继续把能力边界往外推，整体系统成本也会显著上升。",
      note: "对应页面四成本：token 与调度开销、上下文连续性与漂移、协调失败与任务依赖、验证与归属；企业环境三约束（分布式状态、安全隔离、语义一致恢复）为页面补充。"
    },
    {
      start: "14:38:52", end: "14:39:35", slide: 4,
      label: "窗口不是可用空间：一维压缩到二维派生",
      transcript: "What we usually picture as a multi-agent setup is a team differentiating human roles, like an organizational structure. But from the fundamental principles of agents, we can view it as a new concept of context engineering. The original context engineering manages context in a one-dimensional way — with one-dimensional context management we can only perform compression, rollback and some fine-grained operations. As long-horizon tasks expand, the context space ultimately becomes a new bottleneck for complex problems, so we spawn new agents — that is the second dimension — and finally aggregate the results back. In this process another important point is cross: multiple agents on their respective paths can cross-reference information, which is what we can do for multi-dimensional discussions and similar activities.",
      transcript_zh: "我们通常理解的多 agent 方案，多半是团队里区分人的角色，类似人类的组织架构。但从 agent 的基本原理出发，可以把它看成 context 工程的一个新概念。原来的 context 工程是以一维方式管理上下文：一维管理只能做压缩、回滚和一些细粒度操作。随着长程任务规模扩大，上下文空间对复杂问题最终会成为新的瓶颈，于是我们派生新的 agent——这是第二个维度——最后再把结果聚合回来。这个过程中还有很重要的一点是 cross：多个 agent 在各自的路径上可以交叉引用信息，这就是我们做多维度讨论之类活动的基础。",
      note: "Wordly 把“长程任务”转写成 Great Wall project，已按语义更正；cross 对应页面“并行上下文之间中途交换事实”。"
    },
    {
      start: "14:39:49", end: "14:40:21", slide: 4,
      label: "三维 fork 与四维时间：分支演化、共享记忆",
      transcript: "In the third dimension, my agent can actually fork during execution. This fork is not quite the same as spawning a separate agent: the agent can create a checkpoint at any point during execution and then create a clone. From there they evolve along different timelines, and their information can be retrieved in real time because their communication is always available and reachable. The fourth dimension is the temporal dimension: we can add another frame to the collaborative process to do self-evolutionary work and accumulate shared memories. So the multi-agent system can be understood as a multi-dimensional extension oriented around contexts.",
      transcript_zh: "第三个维度是我的 agent 可以在执行过程中 fork。这个 fork 和前面说的分离出 agent 不太一样：agent 可以在执行的任意时刻打一个 checkpoint，然后创建一个克隆体；此后它们沿不同的时间线演化，而信息可以实时取回，因为它们之间的通信始终可达。第四个维度是时间维度：我们可以在协同过程里再加一帧，做自进化的工作，以及共享记忆的积累。所以多 agent 系统可以理解为围绕 context 的多维扩展。",
      note: "Wordly 把 checkpoint 转写成 chat point、末句转写为 multi-frame / subcultures，均按上下文工程口径整理，未逐字保留。"
    },
    {
      start: "14:40:35", end: "14:41:00", slide: 5,
      label: "协调工程：Harness 工程向团队层的扩展",
      transcript: "Based on the previous observations, we can view coordination engineering as a natural extension of harness engineering to the team level. The harness remains responsible for the tools, skills, state and execution loops of a single agent; coordination focuses more on how tasks are broken down, how members communicate, how results are verified, and how to recover from failures — we also need to consider how to save a successful collaboration for reuse. Whether the name ultimately becomes a consensus is not really important. The important thing is that these problems already exist, and we need to solve them with engineering methods.",
      transcript_zh: "基于前面的观察，可以把协调工程看成 harness 工程向团队层面的自然延伸。harness 仍然负责单个 agent 的工具、技能、状态和执行循环；协调更多关注任务怎么拆、成员怎么通信、结果怎么验证、失败怎么恢复——还要考虑怎么把一次成功的协作保存下来复用。这个名字最终是否成为共识并不重要，重要的是这些问题已经存在，需要我们用工程方法去解决。",
      note: "对应页面分层：Harness（Tools/Skills/State/Execution loop）不变，Coordination 加上分工、通信、验证、恢复与可复用经验。"
    },
    {
      start: "14:41:13", end: "14:41:42", slide: 6,
      label: "路线基座：openJiuwen 框架与四个目标",
      transcript: "Our whole route is built on the open-source project openJiuwen. To briefly introduce it, it is actually an agent framework. At its underlying level there are agents, system services, and also runtimes for distributed scenarios, and we build the agent framework on top of that. Our main objectives are fourfold: native multi-agent collaboration, native self-evolution, and production usability for enterprises; additionally, we have optimized the Ascend computing power for optimal performance.",
      transcript_zh: "我们整条路线构建在开源项目 openJiuwen 之上。简单介绍一下：它其实是一个 agent 框架。底层有相关 agent、系统服务，以及分布式场景下的一些运行时，在此之上再搭起 agent framework。我们的目标主要有四个：原生多 agent 协同、原生自进化、面向企业的生产可用性；此外我们还针对 Ascend 算力做了优化，以获得最佳性能。",
      note: "Wordly 把 openJiuwen 转写成 Open9Win / Open Nine Questions（九问），已按 deck 更正；四个目标即第 19 页的四特性，底层架构在第 17 页展开。"
    },
    {
      start: "14:41:57", end: "14:42:37", slide: 6,
      label: "Swarm 引擎：协作、SwarmFlow、SwarmChat、SwarmSkill",
      transcript: "In terms of overall coordination engineering we actually created a swarm engine, and on it we provided four basic capabilities. One of them is autonomous collaboration: you can understand it as multiple agents forming a team and allowing them to work freely with each other — first communication, then task assignment. Another is SwarmFlow, which is more like a dynamic workflow carried by code. A third is SwarmChat, a collaborative space similar to a group chat. Then SwarmSkill, a skill-compatible skill format whose main purpose is to control how the team splits tasks and assigns members. On this basis we will also accumulate Swarm Memory.",
      transcript_zh: "在整体协调工程上，我们实际上做了一个 swarm 引擎，在它上面提供了四项基础能力。其一是自主协同：可以理解为我用多个 agent 组成一个团队，让它们彼此自由协作——先通信，再分配任务。其二是 SwarmFlow，更像由代码承载的动态工作流。其三是 SwarmChat，一个类似群聊的协同空间。然后是 SwarmSkill，一种兼容 skill 的技能格式，主要用来控制团队怎么拆任务、怎么分配成员。在此基础上我们还会积累 Swarm Memory。",
      note: "Wordly 将 SwarmFlow 转写成 Soon Flow / Stone Flow、SwarmChat 写成 Swim Chat，均按 deck 拼写更正；页面 HITS（Human in the Swarm）未展开。"
    },
    {
      start: "14:43:03", end: "14:43:39", slide: 7,
      label: "从一次性子 agent 到长寿命队友",
      transcript: "Let's talk about the difference between a teammate and a sub-agent — actually Claude Code has already discussed this concept. A sub-agent can be considered a one-time, short-lived agent that performs a very fixed task with a fixed objective and is then recycled. A teammate is more like a long-lived member, allowing continuous interaction and the assignment of different tasks. When dealing with multiple agents we need to mind two points: how to isolate them, and what needs to be shared. In a code-based scenario it's natural to use techniques like worktrees to isolate team members; then we have team workspaces to share the artefacts, instead of simply passing tasks between them through messages.",
      transcript_zh: "这里聊聊 teammate 和 sub-agent 的区别，其实 Claude Code 之前已经讨论过这个概念。sub-agent 可以看成一次性的、短寿命的 agent，执行一个目标非常固定的任务，完成后就被回收。teammate 则更像长寿命的成员，可以持续交互、不断被分配不同任务。面对多个 agent，要注意两点：怎么隔离、哪些要共享。在代码场景里，很自然用 worktree 这类技术隔离团队成员；再用 team workspace 共享产出物，而不是单纯靠消息在彼此之间传任务。",
      note: "Wordly 把 worktree 转写成 work-trading、“长寿命”转写成 Great Wall，已更正；页面对照 One-shot subagent（Tasks，一个结果即回收）与 Long-lived teammate（Messages，成员跨任务存续）。"
    },
    {
      start: "14:44:04", end: "14:44:25", slide: 8,
      label: "计划冻结为任务图，Leader 退出热路径",
      transcript: "Once this overall plan is transformed into a task graph, we can actually remove the main agent — or what you consider the leader — from the current agent loop, and let the task graph run along the whole code execution engine. We added a TeamScheduler module to this process. Its main function is to advance the tasks based on the pre-planned schedule; during this process it minimizes the need to wake up agents and assigns tasks to the designated owners. If conflicts or malfunctions arise among team members, or there are areas requiring escalation, the scheduler relays the issue to the leader for dynamic replanning.",
      transcript_zh: "当整体计划被转成任务图之后，我们其实可以把主 agent——也就是你理解的那个 leader——从当前的 agent 循环里拿出来，让任务图沿着整个代码执行引擎去跑。我们在这个过程中加了一个 TeamScheduler 模块。它的主要功能是按预先排好的计划推进任务，过程中尽量少唤醒 agent，并把任务分配给指定的人选。如果团队成员之间出现冲突或故障，或者有需要上报的地方，调度器会把问题转给 leader 做动态重规划。",
      note: "页面另有调度器预指派 owner / 依赖 / reviewer 与“队友在各自任务内保持自治”的标注；验证门槛见下一条。"
    },
    {
      start: "14:44:39", end: "14:45:13", slide: 8,
      label: "验证层三角色：Verifier、Inspector、Challenger",
      transcript: "With this scheduler, one thing becomes simpler: we can perform verification based on the task dimension. And in this verification layer we actually set up three roles. The Verifier mainly performs deterministic verification, and its cost is relatively low. The Inspector mainly performs inspection tasks, primarily scoring. The Challenger, from an opposing perspective, offers supplementary suggestions to allow the agent to perform the task more effectively. Of course, not all three elements need to be added to the verification layer; adjustments can be made depending on the task or scenario.",
      transcript_zh: "有了这个调度器，有一件事变简单了：可以按任务维度做验证。在验证层里我们设了三个角色。Verifier 主要做确定性验证，成本相对较低。Inspector 主要做检查类工作，以打分为主。Challenger 则从对立视角提出补充建议，让 agent 把任务做得更有效。当然，并不是三个都要加进验证层，可以按任务和场景调整。",
      note: "页面硬门槛：Verifier 或 Challenger 失败即任务失败、Inspector 均值 ≥ 0.85，讲者未逐字念出。"
    },
    {
      start: "14:45:34", end: "14:45:59", slide: 9,
      label: "SwarmFlow：代码承载的动态工作流及其痛点",
      transcript: "The next thing is the SwarmFlow we created. Actually our initial inspiration was the dynamic workflow of Claude Code, but when we actually used this dynamic workflow, some problems arose. In a dynamic workflow the agent calls are stateless: if I need to inherit some context in a long-horizon task, I first need to let the previous agent output its context, and then concatenate it onto the subsequent agent. This may cause problems in more complex scenarios, or scenarios involving loops or verification, and may affect the entire script.",
      transcript_zh: "接下来是我们做的 SwarmFlow。最初的灵感其实来自 Claude Code 的动态工作流，但真正用起来之后出现了一些问题：动态工作流里 agent 调用是无状态的。如果在一个长程任务里要继承某些上下文，我得先让前一个 agent 把它的上下文输出出来，再拼接给后面的 agent。这在一些更复杂的场景、或者带循环或验证的场景里可能出问题，进而影响整个脚本。",
      note: "Wordly 原句把 SwarmFlow 先后转写成 Stone Flow 和 Soon Flow、Claude Code 写成 Cloud Code、“长程任务”写成 Great Wall task，均按 deck 更正。"
    },
    {
      start: "14:46:24", end: "14:46:48", slide: 9,
      label: "算子：agent_session、human、verify",
      transcript: "It is very complex to build, so we proposed a stateful agent — the agent_session operator — which essentially creates an agent that can perform multiple rounds of interaction by sending messages, with the entire context continuous, which simplifies script writing. At the same time, the dynamic workflow doesn't have human-computer interaction capabilities, so we added a human operator. This human operator forwards the current information to the outside world, through an external channel, to a person — for example through some IM software — where someone performs approvals and interactive operations. At the same time we also encapsulate some verification operators for the verification-related things we just talked about, and these functions are ready to use out of the box.",
      transcript_zh: "这样构建太复杂了，所以我们提出了有状态的 agent——agent_session 算子：本质上创建一个可以通过消息进行多轮交互的 agent，整个上下文是连续的，这让脚本编写变简单了。同时，动态工作流没有 human-in-the-loop 的交互能力，所以我们加了 human 算子。这个 human 算子把当前信息通过外部通道转发给外面的人，比如通过某个 IM 软件，由人来做相应的审批和交互操作。同时我们也会把刚才说的验证相关的东西封装成验证算子，这些功能开箱即用。",
      note: "对应页面原语 agent() / agent_session() / human() / verify() 及 pipeline、map_parallel、WAL；两层预算与 Run control（Stop 封存不可恢复）未展开。"
    },
    {
      start: "14:47:15", end: "14:47:42", slide: 9,
      label: "代码屏障：改流程不许动已执行的 agent",
      transcript: "One more thing to note here is the workflow. Although the code carries the entire planning, it becomes difficult to handle if the plan changes. Claude Code's solution is to rewrite the code, but during the rewriting process we find that if the rewritten flow affects agents that have already executed, it may produce non-reversible side effects. These issues will be highlighted in long-horizon tasks, so we added one when rewriting the code — a code barrier. If I modify the code, it won't allow me to change an agent that has already executed; it can only modify the subsequent flow, so the operations I have already executed, and the related operations that were successfully executed, will not be affected.",
      transcript_zh: "关于 workflow 还有一点要注意：虽然代码承载了整个计划，但计划一旦变化就不好处理了。Claude Code 的方案是重写代码，但重写过程中我们发现，如果改动影响到已经执行过的 agent，可能产生不可逆的副作用。这些问题在长程任务里会被放大，所以我们在重写代码时加了一道代码屏障（code barrier）：如果我修改代码，它不允许我改动已经执行过的 agent，只能修改后续流程，这样已经执行的操作和已成功执行的相关结果就不会受影响。",
      note: "代码屏障（现场纪要锚点）即页面 WAL / 可回放设计要防的不可逆副作用；Wordly 原句把 Claude Code 说成 Cloud。"
    },
    {
      start: "14:48:10", end: "14:48:44", slide: 10,
      label: "SwarmChat：讨论直接长成任务",
      transcript: "This page mainly talks about the chat room model I just mentioned. We create a shared space where I can bring in people, expert agents and team leaders — a cross-team, cross-person, multi-agent interactive space. It involves a brainstorming process: before many tasks or ideas are broken down into concrete tasks, they go through a discussion or debate, and this process is then incorporated into the chat workflow. After concrete tasks are generated through mutual communication, they are assigned and executed through the team mechanism mentioned earlier; then we proceed with the specific execution.",
      transcript_zh: "这一页主要讲刚才提到的聊天室模型。我们会创建一个共享空间，把人、专家 agent 和 team leader 都拉进来，这是一个跨团队、跨人、多 agent 的交互空间。它涉及头脑风暴的过程：很多任务或想法在被拆成具体任务之前，会先经过讨论或辩论，这个过程会被纳入聊天工作流。通过相互交流生成具体任务之后，再按前面提到的团队机制去分配和执行，然后进入具体执行。",
      note: "14:48:16 一句（“like super power”云云）Wordly 转写失真严重，按群聊协作语义并入未逐字保留；页面强调 SwarmChat 是共享决策与任务生成入口，不是跨团队后台任务协议。"
    },
    {
      start: "14:48:59", end: "14:49:19", slide: 10,
      label: "团队是执行单元，组织是团队间协作",
      transcript: "In this process I can think of a team as the basic execution unit of a task. Here we also mention the concept of organization — the mutual collaboration between teams, which you can understand as a large-scale handoff. I can break down a task vertically and assign it to different teams; after they complete the task we take the results back. After all these tasks are broken down and completed, we bring them back to the chat space for further planning.",
      transcript_zh: "在这个过程中，可以把 team 看成任务的基本执行单元。这里还会提到组织（organization）的概念，也就是团队之间的相互协作，可以理解成一种大规模的 handoff。我可以把一个任务纵向拆开，分给不同的团队；它们完成之后我们把结果收回来。等所有任务都拆解、完成之后，再回到聊天空间做下一轮规划。",
      note: "Wordly 的“回归分析（regression analysis）”按页面“结果回流驱动下一步决策（results return and inform the next decision）”语义清理。"
    },
    {
      start: "14:49:40", end: "14:50:11", slide: 11,
      label: "编排的是 harness 这个运行时，不是调用",
      transcript: "The next two points are about how we actually optimize when doing multi-agent collaboration. One is whether we should choose suitable harnesses as the relevant members. Besides our native openJiuwen harnesses, we also support Claude Code, Codex and the DeepSeek Harness. For similar projects there are actually many technical methods to integrate them through CLI plus skills or MCP. At the same time we also support the RSI process of our native harnesses — in fact we hope each harness in the team has its own special expertise, and performs a specific type of task.",
      transcript_zh: "接下来两点讲我们做多 agent 协同时实际怎么优化。第一点是要不要选择合适的 harness 来充当相关成员：除了我们原生的 openJiuwen harness，我们也支持 Claude Code、Codex 和 DeepSeek Harness。对类似项目，业界其实有很多通过 CLI 加 skill 或 MCP 做集成的技术手段。同时我们也支持原生 harness 的 RSI 过程——实际上我们希望团队里的每个 harness 都有自己的专长，去执行某一类特定任务。",
      note: "Wordly 把 openJiuwen harness 转写成 nine-question honeys、CLI 写成 CRI、DeepSeek Harness 写成 Deepik，均按 deck 更正；页面术语 Expert RSI——bad case 沉淀进 prompt/skill/tool/rail，不改变团队结构。"
    },
    {
      start: "14:50:34", end: "14:50:56", slide: 12,
      label: "按任务难度与成员角色双轴选模型",
      transcript: "Another point, which many projects also mention, is how to choose the model. After the task is decomposed, shouldn't the model be decomposed too? We basically consider it in two dimensions: one is the model type — the model's own strength and cost; the other is that its reasoning effort can also be adjusted. We draw a diagram like this, placing different tasks at different positions on the diagram, and based on this we can roughly assign different models to different tasks and different members.",
      transcript_zh: "另一点很多项目也都会提：怎么选模型。任务拆解之后，模型是不是也该拆一拆？我们基本从两个维度考虑：一个是模型类型，即模型本身的强弱和成本；另一个是推理强度（reasoning effort）也可以调节。我们会画这样一张图，把不同任务放到图上不同位置，据此大致给不同任务、不同成员分配不同的模型。",
      note: "页面：关键验证与规划用高推理强度、编码与检索用低强度（fast, cheap）；双轴动态调度是方向而非完全落地能力。"
    },
    {
      start: "14:51:24", end: "14:51:48", slide: 13,
      label: "SwarmSkill：协作沉淀为可版本化的包",
      transcript: "The next point is the concept of SwarmSkill, which primarily uses skills to carry the process — how multiple agents perform related tasks, and how a type of task is broken down. Besides the skill-based data structure (SKILL.md), we define some role concepts, as well as a workflow-based data structure (workflow.md). This workflow MD is essentially about planning the workflow when breaking down and assigning tasks: it can be described in natural language, drawn graphically with tools like Mermaid, or even implemented in code. There are also related things such as constraints, or dependencies on other sub-skills.",
      transcript_zh: "下一点是 SwarmSkill 的概念，它主要用 skill 来承载过程：多个 agent 怎么执行相关任务、一类任务怎么拆。除了基于 skill 的数据结构（SKILL.md），我们还会定义一些角色概念，以及基于工作流的数据结构（workflow.md）。这个 workflow MD 本质上是在拆分和分配任务时对工作流的规划：可以用自然语言描述，可以用 Mermaid 之类工具画图，甚至可以用代码实现；另外还有约束，以及对其他子 skill 的依赖。",
      note: "页面还列 roles/、bind.md、dependencies.yaml、scripts/workflow.py（可选，开放协作 SwarmSkill 可不带）等字段，讲者未逐一展开。"
    },
    {
      start: "14:52:05", end: "14:52:41", slide: 13,
      label: "自进化：轨迹固化成技能，双层优化",
      transcript: "Then we follow the SwarmSkill to create self-evolution: after we complete a specific task, for example, based on the trajectory we ask whether you want to solidify the current process into a skill. If this skill is successfully refined, it will continuously optimize itself when similar tasks are executed later. Our optimizations are basically on two levels. One is optimization at the team level, which involves improving collaboration among team members — identifying areas for collaboration, determining which information needs to be shared, and decomposing tasks. The other is optimization at the member level, focusing on the individual agent's expertise and how its workflow should be optimized when handling these tasks.",
      transcript_zh: "然后我们会基于 SwarmSkill 做自进化：完成一个具体任务后，比如会基于轨迹弹出询问，要不要把当前流程固化成一个 skill。如果这个 skill 被成功提炼出来，后续执行类似任务时它就会不断自我优化。我们的优化基本分两层：一层是团队层面，改进成员之间的协作，包括识别哪些地方需要协作、哪些信息需要共享、任务怎么拆；另一层是成员层面，关注单个 agent 的专长，以及处理这类任务时它的工作流该怎么优化。",
      note: "对应页面 Real tasks → Bad cases → gate → New version 的沉淀闭环与可归因文本梯度（定位调 prompt、context、memory、tool 还是 skill）。"
    },
    {
      start: "14:53:02", end: "14:53:34", slide: 14,
      label: "一份事件日志，三种投影",
      transcript: "When we work with multiple agents we often encounter a problem: with multiple agents, all the actions in between become black boxes — how does my agent run, how is my task decomposed, how does my workflow work — these become significant issues, and I need to capture all the logs and perform some analysis. In this process we designed a unified event log: besides the agent's trajectory, we also captured the trajectory of collaboration between teams, the workflow trajectory, and the trajectory of task division. These trajectories then serve as a single source of fact for three types of projection. One projection is used for agent RL; another is used for the leader to make a macro-level judgment; and the third is similar to protocols like OpenTelemetry, mainly for observation-related content.",
      transcript_zh: "做多 agent 时我们常遇到一个问题：多个 agent 之间的所有动作都成了黑盒——我的 agent 怎么跑、任务怎么拆、工作流怎么运作，这些都成了大问题，需要抓取全部日志来做分析。为此我们设计了统一的事件日志：除了 agent 的轨迹，还捕获团队之间的协作轨迹、工作流轨迹和任务拆分轨迹。这些轨迹随后作为单一事实源做三种投影：一种用于 agent RL；一种给 leader 做宏观判断；第三种类似 OpenTelemetry 这类协议，主要面向观测相关的内容。",
      note: "Wordly 把 OpenTelemetry 转写成 hotels、agents/workflow 写成 A-frames / overflow；第一投影前还有一处转写噪音已略去。页面三读法：Agent 执行轨迹 / Leader 责任视图 / Operations 健康视图。"
    },
    {
      start: "14:53:53", end: "14:54:20", slide: 15,
      label: "监督、纠偏、恢复：长任务不靠运气",
      transcript: "This page mainly talks about the work we've done in terms of reliability. As mentioned earlier, when multiple agents collaborate with each other we actually encounter many failure issues, much more complex than in a single-agent scenario. Therefore we add many hook points to the entire agent harness to identify specific faults. Some faults are handled within the scope of a single agent, while others are handled at the swarm level according to their severity — handed over to the leader and asked to make relevant task adjustments, or a specific agent is used to inject specific prompt words.",
      transcript_zh: "这一页主要讲可靠性方面的工作。前面提到，多个 agent 相互协作时其实会遇到很多失败问题，比单 agent 场景复杂得多。所以我们会在整个 agent harness 上加很多 hook 点来识别特定故障。有些故障在单个 agent 的范围内处理，另一些按严重程度在 swarm 层面处理，比如交给 leader 去做相应的任务调整等等，或者用特定的 agent 注入特定的提示词。",
      note: "对应页面 Supervisor 察觉异常 → Correction 注入上下文 → Checkpoint 按一致语义恢复；百万级并发等平台口径讲者未提。"
    },
    {
      start: "14:54:46", end: "14:55:32", slide: 16,
      label: "复用稳定前缀，跟着缓存走",
      transcript: "This talks about some of our work on computing power affinity. We have some inference servers from Ascend, so in agent scenarios — especially swarm scenarios where multiple agents actually run simultaneously, which places relatively high demands on model inference overhead — we can do related optimizations. Agents generated based on forks, common prompts, and shared collaboration principles all involve extracting a shared prefix, so we made many optimizations to the inference service to minimize inference overhead. The overall gains are around the twenty-percent level — for example in first-token latency, and in the prefix cache hit rate. The main thing is proactive management: during the team's execution I can identify which caches need related operations — whether to evict, unload, or preload.",
      transcript_zh: "这页讲算力亲和方面的工作。我们有一些 Ascend 的推理服务器，所以在 agent 场景——尤其是多个 agent 同时运行的 swarm 场景，对模型推理开销的要求比较高——可以做相关优化。基于 fork 生成的 agent、公共 prompt、共享的协作原则，这些都涉及抽取共享前缀，所以我们对推理服务做了很多优化，把推理开销降到最低。整体收益在百分之二十这个量级，比如首 token 时延和前缀缓存命中率。主要手段是主动管理：在团队执行过程中，我能识别哪些缓存需要做相关操作——是驱逐、卸载还是预加载。",
      note: "页面实测口径：前缀命中下首 token 时延 −22%+、前缀缓存命中 +20%+；架构级异构调度成本 −50%、吞吐 +10%；链式哈希为实验方向未计入。14:55:15 数字句 Wordly 转写严重失真（head root / QQ 云云），已按页面数据核对清理。"
    },
    {
      start: "14:56:04", end: "14:56:08", slide: 17,
      label: "openJiuwen 技术全景：从应用到算力",
      transcript: "This page is about the overall technical map of our openJiuwen community in the agent field. In the application layer there is WorkSwarm, which I just mentioned — you can think of it as a personal office assistant, but we mainly focus on multi-agent. At the bottom layer we have an agent framework to carry the overall capabilities, and at the next lower layer the distributed runtime I mentioned does some enterprise-level work. Then there are the most basic layers, such as models, infrastructure and hardware.",
      transcript_zh: "这一页是 openJiuwen 社区在 agent 领域的整体技术版图。应用层就是我刚才提到的 WorkSwarm，可以把它理解为个人办公助理，但我们主要做多 agent。底层有一个 agent framework 承载整体能力，再往下是我刚才提到的分布式运行时，做一些企业级的工作；再往下就是最基础的几层，比如模型、基础设施和硬件。",
      note: "全景页约 15 秒带过，各层组件（Agent Gateway、RSI / Swarm / Harness Engine、MCP Hub、Workflow Canvas 等）现场未展开。"
    },
    {
      start: "14:56:22", end: "14:56:31", slide: 18,
      label: "同一模型，搬动结果的 harness",
      transcript: "This is a ranking run we recently performed on SWE-bench and Terminal-Bench. Compared with the current strongest baselines, the percentage increased by about three points, which proves that having extra members can be effective in some of our long-horizon and coding work.",
      transcript_zh: "这是我们最近在 SWE-bench 和 Terminal-Bench 上做的一次打榜。与当前最强的基线相比，成绩高了大约三个百分点，这说明在一些长程任务和编码工作上，多几个成员确实能起作用。",
      note: "页面对照 Claude Opus 4.5 与 GPT-5.6 Sol（SWE-bench Verified 82.6% vs 79.2%、Terminal-Bench 2.1 87.19% vs 83.8%）；数据时点 2026-09-01，论文 Beyond Static Harnesses for Long-Horizon Coding Agents，已随 WorkSwarm 上架 HarmonyOS / Windows / macOS。"
    },
    {
      start: "14:56:55", end: "14:57:17", slide: 19,
      label: "通用 Agent OS：四特性与生产落地",
      transcript: "The entire openJiuwen project is currently being implemented in Postal Savings Bank of China, the University of Science and Technology of China, Huawei Cloud OfficeAce, and Xiaoyi's open platform. In other words, some of the multi-agent related content mentioned earlier is already in commercial use.",
      transcript_zh: "整个 openJiuwen 项目目前在邮储银行（Postal Savings Bank of China）、中国科学技术大学（USTC）、华为云 OfficeAce 以及小艺的开放平台落地。也就是说，前面提到的一些多 agent 相关内容已经在商业使用了。",
      note: "四特性（多 agent 原生、自进化、企业级、算力亲和）在 14:41:42 介绍 openJiuwen 时口述过，本页只念落地名单；数据口径 DataFun：10+ 行业、50+ 商用客户。"
    },
    {
      start: "14:57:17", end: "14:57:27", slide: 20,
      label: "社区与入口：官网、公众号、仓库",
      transcript: "These are some QR codes for our community — you can scan them to follow us. We have an official website, a WeChat official account, a GitHub repository for our open-source community, and some repositories on AtomGit in China. We currently have a relatively high star count, and our contribution rate iterates quite quickly, with two to three versions released almost every week.",
      transcript_zh: "这些是我们社区的二维码，大家可以扫码关注。我们有官网、微信公众号，开源社区的 GitHub 仓库，以及国内 AtomGit 上的一些仓库。我们目前的 star 数比较高，贡献迭代也很快，几乎每周发布两到三个版本。",
      note: "页面社区数字（550+ 行业伙伴、1.7M+ 核心开发者、36K+ stars、300M+ 媒体印象、Linux Foundation AAIF 金牌会员）讲者未逐项念出；Wordly 的“Git Code”按 deck 更正为 AtomGit（atomgit.com/openJiuwen）。"
    },
    {
      start: "14:57:34", end: "14:57:34", slide: 21,
      label: "谢谢：协作在团队收敛处完成",
      transcript: "Okay, that's all I wanted to share today. Thank you, everyone.",
      transcript_zh: "好，我今天想分享的就是这些，谢谢大家。",
      note: "结束页口号“Coordination completes when the team converges”与 #AGNTCon #MCPCon 标签未口述；15:01:30 起为下一场候场与事务性对话，未收录。"
    }
  ]
};
