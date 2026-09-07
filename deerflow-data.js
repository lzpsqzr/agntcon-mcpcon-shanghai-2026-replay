window.talk = {
  title: "From Token Explosion to Semantic Trajectories: Optimizing Agent Execution in DeerFlow",
  speaker: "Willem Jiang（Jiang Ning）· Nan Gao（DeerFlow / 字节跳动）",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/deerflow.pdf",
  assets: "assets/deerflow",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "11:39:27", end: "11:40:13", slide: 1,
      label: "开场：从 token 消耗讲到执行轨迹",
      transcript: "Hello, it's time to begin. My name is Jiang Ning — my English name is Willem. Today Gao Nan and I will share some of the experience we gained during the development of DeerFlow. First, how many of you know about DeerFlow? Quite a few — that's good. And how many people are using an agent harness? A lot. Are you all very concerned about token consumption? Actually, today we're not just going to talk about token consumption, but also about other things related to its trajectory.",
      transcript_zh: "大家好，时间到了，我们开始吧。我叫 Jiang Ning，英文名 Willem。今天我和 Gao Nan 会分享一些我们在开发 DeerFlow 过程中积累的经验。先问一下，在座有多少人了解 DeerFlow？不少，很好。那有多少人在用 agent harness？也挺多。大家是不是都很关心 token 的消耗？今天我们不只讲 token 消耗，也会讲跟它的执行轨迹相关的其他问题。",
      note: "讲者自称 Jiang Ning、英文名被 Wordly 转成 William，按 deck 封面修正为 Willem Jiang；deck 上第二位讲者署名 Nan Gao。"
    },
    {
      start: "11:40:28", end: "11:41:57", slide: 2,
      label: "DeerFlow：从深度研究到超级 agent",
      transcript: "Let me give you a brief introduction — about half of you may not be familiar with DeerFlow. Last year we started an agent framework, initially working on deep research. At the beginning of this year we made a second version: this super agent approach is not just about deep research. Besides deep research, it can also help you with other tasks, like generating videos, and there are many things you can do with code. To make it work better, we mainly rely on the harness framework. This year many models have much better support for long-horizon tasks, and relying on the corresponding tools and skills, we can perform the corresponding operations for specific domain tasks. Today our focus will still be on deep research, one of our core competencies — let's talk about where we are, right here in the harness.",
      transcript_zh: "先简单介绍一下，在座大概有一半人可能还不熟悉 DeerFlow。去年我们启动了一个 agent 框架，最初做的就是深度研究。今年年初我们做了第二个版本：这种超级 agent 的思路不只是做深度研究，除了深度研究之外，它还能帮你做其他任务，比如生成视频，代码方面也有很多可以做的。要让它们工作得更好，主要依靠 harness 框架来完成这部分。今年很多模型对长程任务的支持都好了很多，依托相应的工具和 skills，我们就能针对特定领域任务做相应的操作。今天我们的视野仍会聚焦在深度研究上，它是我们的核心能力之一——我们就从这里、就在这个 harness 里讲起。",
      note: "Wordly 把 harness 转成 Hannis、长程任务转成 Great Wall mission，已按 deck（long-horizon agent framework）修正。"
    },
    {
      start: "11:42:12", end: "11:43:35", slide: 3,
      label: "深度研究：典型的五段 agent 循环",
      transcript: "Let's take a closer look at how deep research is conducted. It's a typical agent loop, and it involves five parts. The first part: we need to break down this task and make a plan. Then we assign these tasks and do the corresponding research, take the research results and do some evaluation. The data source is not just something you can crawl from the internet — the model itself also has some knowledge — but because of hallucinations, we actually need to do a lot of cross-validation. On another level, based on this information we refine and extract the data, and after that the corresponding report can be generated. The process from step two to four is a continuous cycle: it constantly tries to obtain more information. Whether the report is complete, whether the problem is considered comprehensively, is actually done at this level.",
      transcript_zh: "我们来仔细看看深度研究是怎么做的。它其实是一个典型的 agent loop，一共五个部分。第一部分，我们要把任务拆解、做出计划；然后把这些任务分配下去、做对应的研究，再拿研究结果做评估。数据来源不只是从网上爬到的内容，模型自身也有一些知识，但因为有幻觉的存在，我们实际上要做大量的交叉验证。再一层是基于这些信息做提炼和抽取，之后生成相应的报告。其中二到四步是一个不断循环的过程：它持续尝试获取更多信息。报告的完整性、问题考虑得是否全面，其实都是在这个层面完成的。",
      note: "对应 deck 五步 Plan / Search / Evaluate / Refine / Synthesize；讲者口中的“二到四步循环”即现场纪要的“循环 2-4 轮”。"
    },
    {
      start: "11:43:35", end: "11:44:42", slide: 4,
      label: "具体实现：预调研、并行子任务与证据校验",
      transcript: "In the specific implementation, the process is like the diagram of DeerFlow. Here we have the problem we want to study — we first do a simple analysis: a term like 'loop engineer' may have different meanings in different contexts, so beforehand we do some research, some simple surveys, and then break the task down into smaller parts to improve efficiency. Since running the research usually takes a long time, we use a multi-agent approach: break it into sub-tasks and run them in parallel. The results still need to be cross-validated — the version we made last year was often criticized for the model having some hallucinations, so the new version has also done a lot of work on the verification of evidence. Then we organize and summarize these results, and finally generate a report. That's roughly the process, but in the actual process we experienced some interesting things that we wanted to share with everyone.",
      transcript_zh: "具体实现上，流程就像这张 DeerFlow 的图。拿到要研究的问题后，我们先做一个简单分析：比如“loop engineer”这个词在不同语境下含义可能不同，所以要事先做一些调研、简单的 survey，再把任务拆成更小的部分来提升效率。由于跑一次研究通常耗时很长，我们采用多 agent 的方式：拆成子任务并行执行。得到的结果仍要交叉验证——去年那版经常被批评模型有幻觉，所以新版在证据校验上也做了很多工作。然后把这些结果整理归纳，最终生成报告，流程大致如此。不过在实际过程中我们也遇到一些有意思的事情，想分享给大家。",
      note: "此页为架构图（How Deep Research Works），deck 上几乎无文字，讲解全部落在图上。"
    },
    {
      start: "11:44:57", end: "11:45:49", slide: 5,
      label: "工具调用全留在上下文，只增不减",
      transcript: "As you can see from the process, when using this agent to do deep research, it actually requires a lot of data integration. Generally we use a search engine — specifically, an agent-friendly one — to perform the interaction and receive a lot of data as the result. If you don't process this data properly, it will accumulate in your messages. It's important to emphasize that the large model itself has no memory, so every time we interact with it, we need to store all the information in our context. This accumulation of context will only increase, and that's a crucial reason why tokens matter so much. So how you organize the context is very important.",
      transcript_zh: "从刚才的流程可以看到，用这个 agent 做深度研究时，其实需要大量的数据整合。一般来说我们会用到一个工具：搜索引擎，而且是 agent 友好的那种，通过它交互并拿到大量数据作为结果。如果不对这些数据做恰当处理，它们就会不断累积到你的消息里。这里要强调，大模型本身没有记忆，每次交互都要把所有信息放进上下文里。上下文的累积只会不断增加，这也是为什么 token 消耗如此关键。所以怎么组织这些上下文，就非常重要。",
      note: "slide 口号：A large payload can be paid for again and again；“模型无记忆→全量进上下文”是全场 token 问题的根。"
    },
    {
      start: "11:46:12", end: "11:47:33", slide: 6,
      label: "社区 bug 报告：研究任务莫名失效",
      transcript: "The reason we know there's a trick to it is that we received a lot of bug reports — I actually got to know Gao Nan through bug reports in the community. When version 2.0 was first released, around March or April, we were getting a lot of complaints from the community about running a research project: a version that was working fine two days ago, or a week ago, suddenly stopped working again. What do we do in this situation? Debug. For that we need to enable the context. Here I have a simple diagram showing the overall context when it reaches step 14 — you can see quite well which information is useful and which is not. Our problem at the time was fairly complicated, because the context could easily become full. If you fill up your context, we often do compression, but if you don't adjust the parameters well, it has no effect after compression, and it keeps doing this.",
      transcript_zh: "我们之所以知道这里面有坑，是因为收到了大量 bug 报告——我和 Gao Nan 就是在社区的 bug 报告里认识的。2.0 刚发布的时候，大概三四月份，社区里抱怨很多：跑一个研究项目，前两天或上周还好好的，突然又不能用了。这种情况怎么办？调试。这就需要把上下文打开。这里有一张简单的图，展示跑到第 14 步时的整体上下文，哪些信息有用、哪些没用，可以看得很清楚。当时我们的问题比较麻烦，因为上下文很容易被塞满。塞满之后我们通常会做压缩，但参数调不好，压缩就没有效果，它就会一直这样循环。",
      note: "调试动机段：第 14 步上下文图是口头引用；“上下文塞满、压缩无效”直接引出日志的局限。"
    },
    {
      start: "11:47:33", end: "11:49:12", slide: 6,
      label: "传统日志说不清成本为何增长",
      transcript: "As it continues to expand, we need corresponding tools to help us. Generally speaking, we can use logs to record our interactions with large models. However, traditional methods like Langfuse or Langsmith — purely log entries — have certain limitations: although they can pull down each message, it's not ideal for us; finding the problem can be challenging. Another area is our harness, which has room for improvement, especially in the tool call functionality — not all of that information needs to be stored in the context. And even if our harness doesn't change, switching models gives different results — from the harness perspective, the model is often a black box that we can only access through API calls. The previous loop has its decision points — when the information is more than enough. The tools used to analyze logs don't provide enough clues, and that is a major reason why we need to explore the trajectory.",
      transcript_zh: "随着上下文不断扩大，我们需要相应的工具来帮忙。一般来说可以用日志记录与大模型的交互，但 Langfuse、Langsmith 这类传统方式——纯日志条目——有一定局限：虽然能把每条消息拉下来，但对我们就不够理想，定位问题仍然很难。另一个层面是我们的 harness 本身还有优化空间，尤其是 tool call 这部分，并不是所有信息都需要存进上下文。而且即使 harness 不变，换一个模型结果也会不同——从 harness 的视角看，模型往往是个黑盒，只能通过 API 调用接触。前面那个循环有自己的决策点——比如信息什么时候算够了。用来分析日志的工具给不出足够的线索，这正是我们要去探索轨迹的重要原因。",
      note: "Wordly 转成 Long Fuse / Long Smith，按行业惯称修为 Langfuse / Langsmith；同页两条 cue，本条收在“要研究轨迹”的转折句。"
    },
    {
      start: "11:49:34", end: "11:51:32", slide: 7,
      label: "Issue #3114：29K→71K 的 token 螺旋",
      transcript: "This is actually a specific issue — if you're interested you can follow up: it's 3114. It's about a stress test we did before releasing version 2.0. Because it was June, coinciding with the World Cup, we used it to make a summary of the World Cup or European football. After we sent out the research message, it needed to go through multiple rounds of calls, and the context space grows very rapidly. Most models are currently around 1M, so you might think this growth from 29K to 71K wouldn't have a significant impact. But if you switch to last year's model, which only supports 64K, it basically won't run. When we hit that bug, the issue was that this part kept performing searches, and we don't know when it will be enough — this part is actually a black box for us; the only thing we can do is compress it in advance. But you can see that by the third round it is already close to 64K, and if we compress at this time the results are very poor — there isn't much room left, it can't be compressed any further. In that case, the research task is very likely to fail. If multiple agents are running it, it might be slightly better, but a certain task might still fail; if we can only use one agent to run it, it's a complete disaster. After a failure, it's very difficult to get the task completed. So in this process we not only need to look at where the message came from, but also investigate the actual growth phenomenon — that's also a very important reason why we want to study the execution path in depth.",
      transcript_zh: "这是一个很具体的 issue，感兴趣可以跟进：3114。它是 2.0 发布前我们做压力测试时出现的。当时是六月，正好赶上世界杯，我们就用它做世界杯、欧洲足球的总结。研究消息发出去之后，需要经过多轮调用，上下文空间增长非常快。现在大多数模型的上下文在 1M 上下，你可能会觉得从 29K 涨到 71K 影响不大；但换成去年只支持 64K 的模型，基本就跑不动了。当时遇到 bug 的问题就在于：这一部分在不停地搜索，什么时候算够我们并不知道——这部分对我们是个黑盒，唯一能做的就是提前压缩。可到第三轮时已经接近 64K，这时候再压缩效果很差——剩余空间不多，压不动了。这种情况下研究任务很可能失败。多 agent 跑会稍好一点，但某个任务还是可能失败；如果只能用一个 agent 跑，那就是彻底的灾难，失败之后很难再把任务完成。所以在这个过程中，我们不仅要看消息从哪来，还要探究实际的膨胀现象——这也是我们想深入研究执行路径的一个很重要的原因。",
      note: "“around 1 terabyte”应为 1M 级上下文（Wordly 失真）；29K→71K 与 deck 一致，来源标注 GitHub Issue #3114，世界杯压测即 deck 上的欧洲足球任务。"
    },
    {
      start: "11:52:01", end: "11:53:11", slide: 8,
      label: "一次失败被放大：错误回显、重试重发",
      transcript: "Even when we are doing some fixed operations — especially recently, when we ran a smoke test on DeerFlow — we found that many times when the agent makes a call, it will make various attempts, and if the previous call fails, it will attempt to perform some recovery operations, but in a different way. The tool call might be made repeatedly. Since our implementation was relatively mechanical, to prevent it from continuously making these calls, we added middleware to monitor it: if the same tool is called more than a hundred times, that definitely indicates a problem, and we need to interrupt the process to avoid this situation. But why one hundred times? We can't answer that either. In this process, why the agent's call and its trajectory can produce such a trajectory is a mystery to us. This led to a lot of discussions between Gao Nan and me — he also had some ideas about this, so I'll hand him the microphone.",
      transcript_zh: "即便做一些固定操作时——尤其最近我们对 DeerFlow 做冒烟测试——发现 agent 很多时候发起调用会做各种尝试，如果上一次调用失败，它会尝试恢复操作，但换一种方式进行，tool call 可能会被反复发起。由于我们的实现比较机械，为了防止它不停调用，我们加了 middleware 做监控：同一个工具被调用超过一百次，那肯定有问题，就中断流程。但为什么是一百次？我们也答不上来。为什么 agent 的调用、它的轨迹会走出这样的轨迹，对我们来说是个谜。这也引发了我和 Gao Nan 之间的大量讨论——他正好有一些想法，我把话筒交给他。",
      note: "deck 量化：一条错误路径约回显 24K 字符；“为什么是 100 次”讲者坦承无法回答，顺势交棒第二位讲者。"
    },
    {
      start: "11:53:34", end: "11:55:10", slide: 9,
      label: "观测系统：运行时数据到信念的流水线",
      transcript: "Okay, thank you. Jiang Ning has summarized DeerFlow for us, outlining the motivations behind our development of the observation system. Next I'll give you a brief introduction to the observation system within DeerFlow, showing how it works at runtime. You can see a data flow chart on the slide, which can actually be divided into three layers. The blue nodes one and two are the data collection side: we use probes to collect data during the DeerFlow runtime. Raw data or some outputs from middleware are then cleaned and desensitized in the second step, transforming the data into a data contract form that the observation system can accept. The fourth step is the writer, and the consumer of the writer is actually the projector: its role is to transform the data stored in the database into entities within the observation system. The red part is the assessor: its function is to determine conclusions that cannot be reached through fixed rules — for example, we don't really have a clear way of defining whether a task is completed or not. The seventh step is to give this assertion an identity: when it was derived, and through what configuration.",
      transcript_zh: "好，谢谢。Jiang Ning 刚才为我们总结了 DeerFlow，也讲了我们开发观测系统的动机。接下来我简单介绍一下 DeerFlow 里的观测系统，看它在运行时是怎么工作的。PPT 上是一张数据流图，实际可以分成三层。蓝色的一、二号节点是数据采集侧：我们用探针（probes）在 DeerFlow 运行时采集数据；第二步会把原始数据或 middleware 的一些输出做清洗和脱敏，转换成观测系统能接受的数据契约形式。第四步是 writer，writer 的消费者其实是 projector：它把数据库里存的数据转换成观测系统里的实体。红色的部分是 assessor，负责判定那些靠固定规则得不出结论的部分，比如任务算不算完成，我们并没有明确的定义方式。第七步是给这条断言（assertion）一个身份：什么时候、通过什么配置推导出来的。",
      note: "11:53:11 附近话筒交接：从 Willem Jiang（S2）交给 Nan Gao（字幕标记由 S3 起再改标 S1，为同一人）；页上为八步管线 probes→…→resolve belief。"
    },
    {
      start: "11:55:10", end: "11:56:54", slide: 10,
      label: "主流轨迹只讲 what，答不了 why",
      transcript: "In the process of developing and using DeerFlow we accumulated a lot of data, and when Jiang Ning and I reached a certain stage in developing this observation system, we looked back at this data and wanted to dig out something from it. The mainstream solutions for current observation systems, whether Langfuse or Langsmith, are essentially about the structured presentation of runtime data — they couldn't answer why the agent made that decision at this step. So the real issue here isn't about creating a better visualization or a better structured presentation to help developers debug. Data is just data: the most direct information it conveys is the state of the agent at a certain moment in a certain context, and what action it took. I don't know if any of you have used the ADK harness's trajectory recently — the functionality is highly regarded, but its header is actually based on the actions of the agents as the first citizen, the calls. We wanted to change direction: focus on the agent's decision-making process itself, rather than the actions themselves.",
      transcript_zh: "在开发和使用 DeerFlow 的过程中我们积累了大量数据。我和 Jiang Ning 把观测系统做到一定阶段后回头看这些数据，想从里面挖出点东西。目前主流的观测方案，无论是 Langfuse 还是 Langsmith，本质上都是运行时数据的结构化呈现，回答不了 agent 为什么在这一步做了那个决策。所以真正的问题不在于做出更好的可视化、更好的结构化呈现来帮开发者调试。数据只是数据：它传达的最直接信息，是 agent 在某个时刻、某个上下文里的状态，以及它做了什么动作。不知道大家最近用没用过 ADK harness 的轨迹功能——口碑很好，但看它的表头，其实是以 agent 的动作、也就是调用（call）为一等公民。我们想换个方向：聚焦 agent 的决策过程本身，而不是动作本身。",
      note: "Wordly 把 ADK 转成 dpc；deck 对照行：Renaming web_search to “information gathering” is still a description of the action, not a reason。"
    },
    {
      start: "11:56:54", end: "11:57:59", slide: 11,
      label: "Why 的建模：阶段、缺口、立场",
      transcript: "So let's continue thinking along these lines: how do we answer the question why — explain why the agent, given this context, made this decision. Based on this, we created a model for each step. The modeling is divided into phases, and we provided a total of five semantics: plan, act, verify, present, and recover. Then the gap: what is missing right now. And the stance that follows refers to the choice or action the agent makes in this state. This actually provides us with a dimension to compare trajectories and discover what kind of patterns exist between them.",
      transcript_zh: "我们沿着这条线继续想：怎么回答 why 这个问题——解释 agent 为什么在这个上下文下做出了这个决策。基于这一点，我们为每一步建了一个模型。这个建模按阶段（phase）划分，一共给了五种语义：plan、act、verify、present、recover。然后是缺口（gap）：当前还缺什么。后面的立场（stance）指 agent 在这个状态下做出的选择或动作。这其实给我们提供了一个维度，去比较不同轨迹、发现它们之间存在什么样的模式。",
      note: "Wordly 把 recover 转成 record、phase 转成 face，已按 deck 修正；deck 页脚示例是“第 7 次 web search：该 decide 却在 acquire”。"
    },
    {
      start: "11:57:59", end: "11:58:30", slide: 13,
      label: "轨迹单元：决策窗口与输出窗口",
      transcript: "The slide I just showed you — we can abstractly call it a trace unit, which is a unit or step in a trajectory. In this step there are two very important data structures: the decision window and the output window on the right. The decision window records the current context, which includes the system prompts and user input. The one on the right, the output window, records the feedback to the agent after the environment performs the action — for example, the tool result.",
      transcript_zh: "刚才给大家看的那张图，可以抽象地称为一个轨迹单元（trace unit），也就是轨迹中的一个单元或一步。这一步里有两种非常重要的数据结构：决策窗口（decision window）和右侧的输出窗口（output window）。决策窗口记录当前上下文，包括系统提示词和用户输入；右边的输出窗口记录环境执行之后给 agent 的反馈，比如工具结果（tool result）。",
      note: "此页为纯图页（deck 无文字），讲者口头命名 trace unit 并讲解两个窗口；讲完才翻到第 12 页的公式页，故本条在前。"
    },
    {
      start: "11:58:47", end: "11:59:51", slide: 12,
      label: "打标缺口与立场：规则表 + LLM 标注",
      transcript: "We can see that we can express 'why' using the following formula. It's not really a formula, but 'why' is related to the following values: the phase; the gaps the agent faces before executing this step of the tool call; the choices the agent makes, and which gap it is meant to address; and the last one is like a pointer, indicating which context block these decisions point to. You might wonder where these values come from. There are two producers: one is a rule table that we configure, which produces these semantics according to fixed rules; the other is an agent that we configure to read these contexts — the decision window and the outcome window — and automatically fill in the semantic values.",
      transcript_zh: "可以看到，我们可以用下面这个式子来表达 why。它其实算不上公式——why 与这几个值相关：阶段（phase）；agent 执行这一步工具调用之前面对的缺口（gap）；agent 做出的选择，以及它针对的是哪个缺口；最后一个像指针，标明这些决策指向哪一块上下文。大家可能会问这些值从哪来。它们有两个生产者：一个是我们配置的规则表，按固定规则产生这些语义；另一个是我们配置的一个 agent，去读决策窗口和结果窗口，自动填入这些语义值。",
      note: "对应 deck 公式 why(step) = phase · gap_before · action_role → aims_at · decision_basis；两个生产者即 rule assessor 与 LLM annotator。"
    },
    {
      start: "12:00:05", end: "12:02:13", slide: 14,
      label: "工作流 vs 行为模式：一张分解表",
      transcript: "If we want to extract a continuous workflow or agent behavior pattern from the trajectory, we need to string together the entire trajectory: we extract the phase from the data structure, put it into a state machine — every time the phase changes, we add an edge — and eventually extract a graph like this. But as you can see, this graph is very messy, because it includes the structural changes brought by the task and the state transitions in this graph, and the differences in agent configurations, or the different large models used, lead to localized variations, resulting in this chaotic appearance. Our solution is a breakdown table: from the messy state changes I can extract a cleaner workflow, and separately, the agent's behavioral patterns of local changes. Here's a very simple example, taking the web search of an agent doing deep research. In the table on the left, the values are clearly related to the domain, while 'release' refers to the agent's own identity — it has nothing to do with it. So we can draw a preliminary conclusion: the number of times this web search is executed is actually related to the domain, that is, to the task, and has little to do with the agent itself. Looking at the right side, you can draw the opposite conclusion: it has nothing to do with the domain, since it's related to the agent's identity.",
      transcript_zh: "如果想从轨迹里抽取连续的工作流或 agent 行为模式，就要把整条轨迹串起来：从数据结构里抽出阶段，放进一个类似状态机的图里——阶段每变化一次就加一条边——最终抽出这样一张图。但可以看到这张图很乱，因为其中既有任务带来的结构变化和状态迁移，又有 agent 配置差异、所用大模型不同导致的局部变化，所以看起来杂乱。我们的解法是给一张分解表：从刚才那张乱图里，既能抽出更干净的工作流，也能单独抽出 agent 局部变化的行为模式。举个很简单的例子，就以做深度研究的 agent 的 web search 为例。左边这张表的值明显与领域（domain）相关，而 release 指的是 agent 自身的版本身份，与它无关——所以可以初步得出结论：web search 执行多少次其实和领域、也就是任务相关，与 agent 本身关系不大。再看右边，可以得出相反的结论：与领域无关，而与 agent 的版本身份相关。",
      note: "对应 deck 左右两张表：workflow 随 domain 变、跨 release 稳；behavior pattern 相反——讲者用 web search 次数当例子。"
    },
    {
      start: "12:02:24", end: "12:04:03", slide: 15,
      label: "策略表对照：找到可量化的优化目标",
      transcript: "But we can't just discard the agent's behavior patterns, so we provide this table. The left column is the data we just discussed; horizontally is the gap in the data structure and the decision the agent makes at this step, and the number in the middle represents the probability that the agent, when faced with this gap, chooses the corresponding action. These statistics are actually obtained from running this trajectory. The part I marked in red is obviously a bit abnormal: when an agent's gap is 'decision' — he should have made a decision, but he chose to acquire information. In the context of deep research, he was asking for information, so we can't say he was wrong. Therefore we need to perform some statistical analysis on this data: we collect all the deep research trajectories to look for similar situations — if they do, we group them together; if not, we group them into another group — then calculate the difference between the success rates of these two groups, and use this value as a basis for optimization. The optimization target in the bottom right corner is what we want to optimize. This actually provides us with a quantifiable tool, giving us something to work with — otherwise we would be adjusting the harness settings based entirely on intuition.",
      transcript_zh: "但 agent 的行为模式不能直接丢掉，所以我们给出这张表。左列是刚才讨论的数据结构里的缺口（gap），横向上是 agent 在这一步做的决策，中间的数字表示 agent 面对这个缺口时选择对应动作的概率。这些统计值都是从实际跑出来的轨迹里得到的。我标红的那部分明显有点异常：当 agent 的缺口是 decision 时，它本该做决策，却选择了继续获取信息。在深度研究的语境下它是在要信息，所以我们不能说它错了。因此要对这些数据做统计分析：收集所有深度研究的轨迹，找类似情况——有就归成一组，没有就归另一组——再计算两组成功率的差值，把这个值作为优化的依据。右下角的优化目标就是我们要优化的点。这给了我们一个可量化的工具、有抓手，否则调 harness 的参数就全凭直觉了。",
      note: "标红单元格对应 deck 的 decision×acquire 0.41；对照原则 lift ≥ 0.2、n ≥ 3 在页脚。"
    },
    {
      start: "12:04:15", end: "12:06:31", slide: 16,
      label: "把模式固化进 Harness 的四个旋钮",
      transcript: "To summarize, what we want to do is solidify a trajectory, or rather a workflow, into a single fixed path — a method to solidify the harness of the model itself. There are actually three things to solidify: the workflow written on the left, the behavior, and the target. We can use different embedding methods depending on the type of data. The workflow can be directly embedded into the skill. For agent behavior patterns, we can simply modify the configuration of the harness itself — for example, how many loops you need to loop before you stop. And the target is the problem it's supposed to solve: if the actions an agent takes in response to a specific gap are not what we expected, we choose to address this part in the tool description, guiding it through the corresponding gaps with the correct tools. Then finally, delegation: imagine you want to take the behavior pattern of a relatively strong large model and apply it to a relatively weaker, more cost-effective model. There must be some procedural elements that can narrow the gap through this methodology, but the intelligence of the large model itself is an insurmountable chasm. A weaker model simply doesn't have the capability to verify whether the model itself is working correctly, so we provide a delegation mechanism, allowing the weaker agent to request a stronger agent using a more powerful model to perform the verification work for it.",
      transcript_zh: "总结一下，我们要做的是把轨迹、或者说工作流固化成一条固定的路径，也就是把模式固化进模型自身 harness 的方法。要固化的其实有三样：左边写的工作流、行为，以及目标。可以根据要嵌入的数据类型采用不同的嵌入方式：工作流可以直接嵌入到 skill 里；agent 行为模式则可以通过修改 harness 自身的配置，比如循环多少次之后停止；目标要解决的问题，是 agent 对特定缺口做出的动作不符合预期，那就在工具描述（tool description）里处理，用正确的工具引导它走过相应的缺口。最后是委托（delegation）：可以设想这样一个场景，想把一个较强的大模型的行为轨迹或行为模式，套到一个更弱、更便宜的模型上。有些程序性的东西可以通过这套方法缩小差距，但大模型自身的智力是无法逾越的鸿沟。弱模型不具备“验证自己做得对不对”的能力，所以我们提供了 delegation 机制：让较弱的 agent 请求一个使用更强模型的 agent，替它完成验证工作。",
      note: "deck 四个执行器：skill scaffold（SKILL.md）、stop criterion（循环上限）、tool description remap、delegation；语义轨迹复用即“强模型模式套弱模型”。"
    },
    {
      start: "12:06:32", end: "12:06:37", slide: 17,
      label: "Replay 复现 bug（现场跳过页）",
      transcript: "Yes, that's right. And then, we handed it back to Jiang Ning.",
      transcript_zh: "对，是这样。接下来我们交还给 Jiang Ning。",
      note: "此页现场未逐页讲解，时间取 Nan Gao 交还话筒的相邻句；页上内容为 Select → Restore → Inspect → Re-run → Compare 与“Replay 控制起始状态而非模型确定性”。"
    },
    {
      start: "12:06:54", end: "12:07:45", slide: 18,
      label: "三条经验：效率、上下文、轨迹价值",
      transcript: "To summarize briefly, our exploration can be divided into three directions. The first is that the task itself, even if successful, is not necessarily the most efficient — there is actually a lot of room for optimization. The second part: the context of interacting with the larger model actually has a cumulative effect, and in this process there is still a lot of work we can do. The last one, which I think is quite important, is this trajectory: it contains a lot of very detailed information, which is also a very valuable resource that can be further explored. As Gao Nan mentioned earlier, we can extract some workflow and behavior patterns from it. At this level, there's a lot of work that can be continuously optimized during the process. We want to encourage everyone to make better use of this information, because as we keep working on DeerFlow, these things are gradually being accumulated and refined.",
      transcript_zh: "简单总结一下，我们的探索可以分成三个方向。第一，任务本身即便成功了，也未必是最有效率的，其实还有很大的优化空间。第二部分，与大模型交互的上下文实际上有累积效应，这里面还有很多工作可做。最后一点我认为相当重要，就是这条轨迹：它包含大量非常细节的信息，是很有价值、可以进一步挖掘的资源。就像 Gao Nan 刚才讲的，我们能从中抽取一些工作流和行为模式。在这个层面还有很多可以持续优化的工作，我们鼓励大家更好地利用这些信息——随着我们在 DeerFlow 上的持续投入，这些东西会不断积累和提炼。",
      note: "Willem Jiang 接回话筒做全场总结，三条对应 deck 页上 01/02/03。"
    },
    {
      start: "12:09:50", end: "12:09:51", slide: 19,
      label: "致谢与 Q&A：会后大厅继续交流",
      transcript: "Okay, we're almost done. If anyone is interested, you can email us. We'll be in this lobby in a bit, and you're welcome to come and chat with us. Thank you, everyone.",
      transcript_zh: "好，我们差不多到时间了。感兴趣的朋友可以给我们发邮件，稍后我们就在这个大厅里，欢迎大家来找我们聊。谢谢大家。",
      note: "12:08:00 起进入问答（不同模型产生不同轨迹、统计需控制变量等），QA 按要求未收录；本页附仓库 github.com/bytedance/deer-flow。"
    }
  ]
};
