window.talk = {
  title: "Connecting the Dots with Context Graphs",
  speaker: "Stephen Chin · VP of Developer Relations, Neo4j",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/context-graphs.pdf",
  assets: "assets/context-graphs",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "16:35:15", end: "16:35:42", slide: 1,
      label: "标题页与自我介绍",
      transcript: "Hello and welcome, everybody, to the final talk of the day. I'm going to be talking about connecting the dots with context graphs. My name is Stephen Chin, I'm VP of Developer Relations at Neo4j, and also an LF Ambassador — very pleased to be supporting the new AI Foundation and helping to move things forward.",
      transcript_zh: "大家好，欢迎来到今天的最后一场演讲。我要讲的主题是“用 context graphs 连接各个点”。我叫 Stephen Chin，是 Neo4j 的开发者关系副总裁，同时也是一名 LF Ambassador——很高兴能支持新的 AI Foundation，帮助事情向前推进。",
      note: "Wordly 把 Neo4j 转写成“Neo4j's”、“a F ambassador”应为 LF Ambassador（Linux Foundation 大使，与 AGNTCON 主办方呼应）。"
    },
    {
      start: "16:35:53", end: "16:36:43", slide: 2,
      label: "被 AI 审过代码：机器人反过来审判我们",
      transcript: "How many folks over the past year have had their code reviewed by AI? And how did that make you feel? Whenever I get an AI code review it's critical — did you remember to do this, did you check this test, did you do code coverage correctly? And even if you address everything it says and ask it again, it will find new things wrong. The tables have been flipped on us: instead of us judging the robots, the robots are now judging us. You're probably feeling a bit like Neo in the Matrix — we're now the machines, and the agents are chasing us around.",
      transcript_zh: "过去这一年，有多少人的代码被 AI 审查过？那是什么感受？每次我收到 AI 代码审查，它都很挑剔——你记得做这个了吗？这个测试检查了吗？代码覆盖率统计对了吗？哪怕你把它说的问题全都改掉再问一次，它还能找出新的毛病。局面已经被反转了：不是我们审判机器人，现在是机器人在审判我们。你们可能都有点像《黑客帝国》里的 Neo——如今我们成了机器，agents 正在后面追着我们跑。",
      note: "整版配图页（deck 提取不出文字），对应 AI 代码审查段子；此页约停留 50 秒。"
    },
    {
      start: "16:36:53", end: "16:37:06", slide: 3,
      label: "墨菲斯之问：我只给你真相",
      transcript: "I'm going to give you all a choice as an audience. You can take the blue pill and stay in this world — this matrix where we have all these dispersed, unconnected systems.",
      transcript_zh: "我要给在座各位一个选择。你可以吃下蓝色药丸，留在这个世界里——这个矩阵里到处都是分散、互不连通的系统。",
      note: "黑客帝国台词页（ALL I AM OFFERING IS THE TRUTH），引出红蓝药丸二选一。"
    },
    {
      start: "16:37:06", end: "16:37:29", slide: 4,
      label: "现状：上下文散落在孤岛与人脑中",
      transcript: "So you have some of your data in CRM systems, in Slack and messages, things stuck in support tickets — and you're being asked to actually solve real business challenges when you have all this disconnected data.",
      transcript_zh: "你的一部分数据在 CRM 系统里、在 Slack 和消息里，还有些东西卡在工单里——而你要在这样的割裂数据之上，去解决真实的业务挑战。",
      note: "slide 图示 CRM/Slack/Zendesk/Jira/Zoom/PagerDuty 之间全是问号；口头描述蓝药丸世界。"
    },
    {
      start: "16:37:29", end: "16:38:11", slide: 5,
      label: "红药丸：决策轨迹成为一等公民",
      transcript: "Or you can take the red pill. We're going to build a system of reasoning which contains all of this data pulled in with different MCP servers — the decisions, the reasoning traces, evidence chains — and then we're going to try to produce more repeatable, more holistic responses using connected data. Who's going to go with the red pill? ... A few of us — the rest of you can get out.",
      transcript_zh: "或者，你可以吃下红色药丸。我们要建一套 system of reasoning，用不同的 MCP server 把这些数据都接进来——包括决策、推理轨迹、证据链——然后尝试用连通的数据给出更可复现、更全面的响应。谁选红药丸？……只有几个，其余各位可以出去了。",
      note: "slide 为折扣审批示例：System of Reasoning 连接 Evidence/Policy/Precedent/Outcome，Decision Trace as First-Class Data。"
    },
    {
      start: "16:38:11", end: "16:38:47", slide: 6,
      label: "上下文图进入 Gartner 炒作周期",
      transcript: "So I think we all want this — we all want a system of reasoning, we all want connected data. And Gartner also wants us to have connected data: context graphs have now officially made the Gartner hype cycle — this is their AI hype cycle where they predict which things are trending, and you can see GraphRAG moving up and to the right.",
      transcript_zh: "我想我们都要这个——都要一套 system of reasoning，都要连通的数据。Gartner 也希望我们用上连通的数据：context graphs 已经正式登上了 Gartner 的 hype cycle——这是他们预测技术趋势的 AI 炒作周期曲线，你可以看到 GraphRAG 正在向右上方爬升。",
      note: "Gartner《Hype Cycle for Agentic AI》2026 年 4 月版（报告 ID G00842058），Context Graphs 首次上榜。"
    },
    {
      start: "16:38:47", end: "16:39:07", slide: 7,
      label: "机会：成为组织里的超级英雄",
      transcript: "And this is important, because it's a technology which allows us to make sense of all this disparate and disconnected information. And it's a huge opportunity as well — if you're able to solve this problem effectively for your business, you can be the superhero of your organization by actually solving these hard data challenges.",
      transcript_zh: "这一点很重要，因为这项技术让我们能够理清所有这些零散、割裂的信息。它也是一个巨大的机会——如果你能为自己的企业有效地解决这个问题，真正拿下这些难啃的数据挑战，你就会成为组织里的超级英雄。",
      note: "整版配图页（deck 提取不出文字），一带而过；紧接着下一页才点出技术选型。"
    },
    {
      start: "16:39:07", end: "16:39:23", slide: 8,
      label: "技术底座：知识图谱",
      transcript: "And the technology we're going to use for this is knowledge graphs. If you're not familiar with knowledge graphs already, they are a different way of structuring information — closest to what you would draw on a whiteboard or sketch out when you're describing a problem.",
      transcript_zh: "而我们要用来做这件事的技术就是 knowledge graph。如果你还不熟悉它：它是一种不同的信息组织方式——最接近你在白板上画的图，或者描述一个问题时随手勾画的草图。",
      note: "整版图可视化页；开场句即此页标题。"
    },
    {
      start: "16:39:23", end: "16:40:22", slide: 9,
      label: "三要素：节点、关系、属性",
      transcript: "It's constructed with nodes — here we have two person nodes, Dan and Ann. All the nodes have properties: the name, the birth date, the Twitter handle. Relationships: we know Dan lives with Ann, and Dan drives the car that Ann owns, so we know who wears the pants in this relationship. And we also know a bit about the car — it has a bunch of properties including an embedding. Including embeddings on your graph is a great way to get the benefits of similarity search, but also get the structure of graphs and relationships.",
      transcript_zh: "它由节点构成——这里有两个 person 节点，Dan 和 Ann。所有节点都有属性：姓名、生日、Twitter 账号。再看关系：我们知道 Dan 和 Ann 同住，Dan 开的是 Ann 名下的车——所以这段关系里谁说了算，一目了然。关于这辆车我们也知道不少——它有一堆属性，其中包括一个 embedding。把 embedding 放进图里，既能享受相似度检索的好处，又保留了图的结构和关系。",
      note: "slide 上汽车节点带 DescEmbedding 向量属性——图结构与相似检索可以兼得。"
    },
    {
      start: "16:40:22", end: "16:40:46", slide: 10,
      label: "存储、可视化、分析：可解释 AI",
      transcript: "By combining AI with graph technology you're building a better visualization layer for your AI technology. It allows you to store a lot of this information in nodes and relationships, which persist and you can grow over time — and then you can do better analysis with visualizations and tools that help you pull the relationships and the hidden connections out of your data.",
      transcript_zh: "把 AI 和图技术结合起来，你就是在为 AI 技术搭建一个更好的可视化层。它让你把这些信息存进可以持久化、随时间不断生长的节点和关系里——然后再借助可视化和工具做更好的分析，把数据里的关系和隐藏的关联挖掘出来。",
      note: "slide 三栏 Storing / Visualizing / Analysing，正好对应这三句。"
    },
    {
      start: "16:40:46", end: "16:41:28", slide: 11,
      label: "LLM×知识图谱：天生互补",
      transcript: "And this combination of LLMs and knowledge graphs is not new — probably the most well known paper about this is the Microsoft GraphRAG paper, which introduced the concept a few years ago. There have been hundreds of research papers about combining knowledge graphs and LLMs, and you can see graphs and graph techniques in all the major models and AI techniques now. A lot of this has become a natural synergy: combining the benefits of a graph representation together with the language, creativity and reasoning you get out of LLMs.",
      transcript_zh: "LLM 和 knowledge graph 的这种组合并不新鲜——最出名的论文大概就是 Microsoft 的 GraphRAG 论文，几年前提出了这个概念。关于把知识图谱和 LLM 结合起来的研究论文已有数百篇，如今在所有主流模型和 AI 技术里都能看到图和图技术的身影。这在很大程度上已经成为一种天然的协同：把图表示的好处，和 LLM 带来的语言、创造力和推理能力结合在一起。",
      note: "slide 双环图：KG 提供 Knowledge/Context/Reasoning，LLM 提供 Language/Creativity，BETTER TOGETHER。"
    },
    {
      start: "16:41:28", end: "16:42:04", slide: 12,
      label: "直连 LLM：有答案但不连数据",
      transcript: "Now, here's a quick example of the difference between just calling an LLM directly. You can call out to ChatGPT or Claude or Kimi and ask a question — it will always give an answer. In this case we're asking about a particular patient's emphysema, a breathing condition, and it says the care plan should include preventing further damage to the lungs, et cetera — very generic.",
      transcript_zh: "来看一个简单的例子，看看直接调用 LLM 会有什么不同。你可以调用 ChatGPT、Claude 或者 Kimi 提一个问题——它永远会给你一个答案。这里我们问的是某个患者的肺气肿（一种呼吸系统疾病），它回答说护理计划应该包括防止肺部进一步损伤等等——非常泛泛。",
      note: "Wordly 把 Kimi 转写成“Kimmy”；slide 评级 Good（not connected to real data）。"
    },
    {
      start: "16:42:04", end: "16:42:29", slide: 13,
      label: "向量 RAG：有依据但不完整",
      transcript: "If you do vector RAG you can get better information, because it actually has the patient's medical information and history at its disposal — but it's limited to similarity searches, so you get a less holistic picture of the patient. It recommends respiratory therapy, deep breathing and coughing exercises. It's grounded now, but it's not a complete answer.",
      transcript_zh: "如果用向量 RAG，得到的信息会更好，因为它手里确实有患者的医疗信息和病史——但它局限于相似度检索，所以你对患者的了解仍不够完整。它推荐的是呼吸治疗、深呼吸和咳嗽练习。这回有依据了，但还不是完整的答案。",
      note: "slide 为 Baseline RAG：LlamaIndex + GPT-4.0 + Chroma 向量库，评级 Better（grounded but incomplete）。"
    },
    {
      start: "16:42:29", end: "16:43:22", slide: 14,
      label: "GraphRAG：完整且准确的答案",
      transcript: "And if you do the same thing with GraphRAG, you get a complete and factual answer. It recommends medication management, smoking cessation counseling, pulmonary rehabilitation exercises — the patient has already had some treatment, they're in rehab, and you can see the emphysema is probably caused by smoking. If you were a doctor, this is the sort of answer you'd want to give the patient: specific and actionable advice, grounded in full information about the condition, the patient records, and the time span for their treatment. And you can only do this with the right context, the right data.",
      transcript_zh: "而如果用 GraphRAG 做同样的事，你会得到一个完整、真实的答案。它推荐药物管理、戒烟咨询、肺部康复训练——说明这位患者已经接受过一些治疗、正在康复期，而且可以看出肺气肿很可能是吸烟引起的。如果你是医生，这正是你想给患者的答案：具体、可执行的建议，建立在关于病情、病历和治疗康复时间跨度的完整信息之上。而这一切，只有靠正确的上下文、正确的数据才能做到。",
      note: "三级对比在此页补齐：GraphRAG（Neo4j + LangChain + OpenAI）评级 Best；医疗例子也是后面 context graph 的伏笔。"
    },
    {
      start: "16:43:22", end: "16:43:31", slide: 15,
      label: "我会功夫了：能力已装载（梗图）",
      transcript: "And when you have this, now we can do a lot of cool things with our new capabilities to solve hard problems with memory.",
      transcript_zh: "有了这些，我们就可以用新的能力做很多酷的事情——用记忆来解决难题。",
      note: "整版梗图页（I KNOW KUNG FU），快速翻过，标志从检索对比转入记忆主题。"
    },
    {
      start: "16:43:31", end: "16:44:27", slide: 16,
      label: "三种记忆：短期、长期、推理",
      transcript: "There are three main types of memory which are critical for agents to do their work. The first is short term memory — the current context, what you're currently working on. Then long term memory — your episodic history over multiple turns, working with maybe the same or different customer information or records. And then reasoning memory — this is what separates a normal knowledge graph from a context graph: it has the context and the decisions which happened before recorded in the same graph. So when you ask it to make a decision, it's grounded not only in information about the scenario, but it also knows what has previously been recommended or decided.",
      transcript_zh: "对 agents 完成工作来说，有三种关键的记忆。第一种是短期记忆——当前的上下文，你眼下正在处理的东西。第二种是长期记忆——跨多轮的情节式历史，处理的可能是同一批、也可能是不同的客户信息和记录。第三种是推理记忆——它正是普通 knowledge graph 和 context graph 的分水岭：此前的上下文和决策都记录在同一张图里。于是当你让它做决策时，它不仅基于场景本身的信息，还知道之前被推荐过、被决策过什么。",
      note: "全场核心分类框架；16:44:27 附近有几秒现场口误杂音（“Oops… one, two…”），已略去。"
    },
    {
      start: "16:44:32", end: "16:45:31", slide: 17,
      label: "短期记忆：多级实体抽取流水线",
      transcript: "So the short term memory — this is your conversation storage. You can use multi-stage extraction to build this out, with different extractors and merge strategies. You can do entity resolution to dedupe, fuzzy and semantic matching to make sure you're getting back the right entities. On the right is an example pipeline: you take the raw text, run it through spaCy, GLiNER 2, and an LLM fallback. That gets you to a reasonably good set of data inside your knowledge graph, with clear extracted entities which describe the conversation and allow you to answer questions about it.",
      transcript_zh: "先说短期记忆——它就是你的会话存储。可以用多级抽取来构建，配合不同的抽取器和合并策略。还可以做实体归一去重，用模糊匹配和语义匹配确保取回的是正确的实体。右边是一条示例流水线：把原始文本依次送过 spaCy、GLiNER 2，再兜底用 LLM。这样就能在 knowledge graph 里得到一组相当不错的数据，抽出清晰的实体来描述这段对话，进而支持对它的提问。",
      note: "Wordly 转写“Spacy Gleaner two”应为 spaCy / GLiNER 2（slide 标注三档耗时约 5ms / 50ms / 500ms）。"
    },
    {
      start: "16:45:31", end: "16:46:15", slide: 18,
      label: "长期记忆：POLE+O 领域模型",
      transcript: "On top of this you need to have a domain model which actually models the long term, the temporal relationships — this is done with the POLE model: People, Organizations, Locations, Events and Objects. What this does is give you long term persistence across your entire history of different transactions, storing these together with the entities you extracted previously for your domain. You can pull this directly out of conversations and build it up automatically. So now you don't have a single conversation — you have a whole range of conversations in a time span.",
      transcript_zh: "在此之上，你还需要一个真正刻画长期 temporal 关系的领域模型——用的是 POLE 模型：People（人）、Organizations（组织）、Locations（地点）、Events（事件）和 Objects（物件）。它的作用是让你在全部历史交易记录之上获得长期持久化，并把它们和之前为领域抽取的实体存在一起。这些可以直接从对话里抽取、自动积累起来。于是你手里不再是单独一段对话，而是一整段时间跨度里的成串对话。",
      note: "Wordly 转写成“Paul O / polo model”，实为 POLE 模型；slide 列出跨会话持久化、时间关系、向量检索等能力。"
    },
    {
      start: "16:46:15", end: "16:47:01", slide: 19,
      label: "推理记忆：决策溯源与合规审计",
      transcript: "And then the critical part is the final part, the reasoning memory. You need to capture the tool call traces, the provenance — decision provenance — and have your model learn from experience, so that over repeated invocations it's improving itself. And this is valuable not only for improving the quality of the results, but for compliance and debugging: if you get questions from auditors, or you're trying to figure out why your application is giving good or not good results, you actually know and understand the history and the provenance it's using to provide answers and results.",
      transcript_zh: "然后最关键的是最后一层：推理记忆。你需要捕获 tool call 轨迹和溯源——决策溯源——并让模型从经验中学习，在反复调用中不断自我改进。这不仅对提升结果质量有价值，对合规和调试同样重要：当审计人员来问话，或者你想弄清楚应用为什么给出好或不好的结果时，你真正掌握并理解了它用来给出答案和结果的那段历史与来龙去脉。",
      note: "slide 四点：工具调用全审计、从经验学习、决策因果链、合规与调试——讲者称之为“让 AI 可解释的那一层”。"
    },
    {
      start: "16:47:01", end: "16:47:18", slide: 20,
      label: "接线员，我需要一个出口（梗图）",
      transcript: "So now, just like in the Matrix, we've loaded up all this information in our cyber brain — and now we have new capabilities. We can pull all this information back; we now have temporal information, we have reasoning and decision traces.",
      transcript_zh: "现在，就像《黑客帝国》里那样，我们已经把所有这些信息装进了赛博大脑——于是我们有了新的能力。我们可以把这些信息全部调取回来；我们有了时间维度的信息，有了推理和决策轨迹。",
      note: "整版梗图页（OPERATOR, WE NEED AN EXIT），快速翻过，转入“为什么用图”的架构论证。"
    },
    {
      start: "16:47:18", end: "16:48:27", slide: 21,
      label: "为什么用图：关系是一等公民",
      transcript: "And graphs and graph databases are a great way of doing this, for several reasons from an architectural standpoint. First, in a graph database relationships are first class — it's not just a join or an afterthought. This makes multi-hop traversal possible and also very cheap, so you can navigate your entities, your POLE model, your decision traces freely, and get very accurate information. You can use algorithms like FastRP to do structural similarity in your graph and get explainable decisions. Now you have cross-session knowledge, and you're building on top of a foundation which is already production ready: it's ACID compliant, it can scale up to tens of terabytes of data in a single instance, scale out horizontally, and you can layer memory technologies on top of it.",
      transcript_zh: "而图和图数据库是做这件事的绝佳方式，从架构角度看有几点理由。首先，在图数据库里关系是一等公民——不是一次 join，也不是事后补上的一笔。这让多跳遍历成为可能，而且成本极低，你可以自由地在实体、POLE 模型、决策轨迹之间穿行，拿到非常精确的信息。可以用 FastRP 这类算法在图上做结构相似度，得到可解释的决策。于是你有了跨会话的知识，而且是站在一个已经生产就绪的地基上：它满足 ACID，单实例可以扩到几十 TB，也能水平扩展，还可以在上面再叠加各种记忆技术。",
      note: "Wordly 把 FastRP 转写成“Fastapi”；slide 另列 FastRP 图嵌入找相似情形、Neo4j 企业级规模。"
    },
    {
      start: "16:48:27", end: "16:49:22", slide: 22,
      label: "Neo4j agent memory 记忆框架",
      transcript: "Did anyone come to my earlier talk this morning? In that talk I used Cognee, an open source framework for doing memory management built on top of Neo4j — those guys do a great job; Vasily, the CEO, came to our graph gathering and talked about what they're doing with memory, and they're doing great stuff with Claude and Codex in coding environments. Now, in this talk what I'm using is Neo4j agent memory — an open source memory framework we built at Neo4j, to show how you can apply this model to enterprise business cases to extract and get the context graphs, these reasoning traces. It has APIs for short term, for long term, and for reasoning memory to build and encode those inside a Neo4j graph database.",
      transcript_zh: "今天上午有谁来听过我上一场演讲吗？那一场我用的是 Cognee，一个构建在 Neo4j 之上的开源记忆管理框架——他们做得很棒；CEO Vasily 来过我们的 graph gathering，讲了他们在记忆方面的工作，他们在 Claude 和 Codex 编码环境里做得非常出色。而今天这场，我用的是 Neo4j agent memory——我们在 Neo4j 做的开源记忆框架，用来展示如何把这个模型落到企业业务场景里，抽取并得到 context graphs、得到这些推理轨迹。它提供了短期、长期和推理记忆的 API，把这一切构建并编码进 Neo4j 图数据库里。",
      note: "Wordly 转写“Cockney”按发音与上下文应为开源记忆框架 Cognee；slide 列出 add_message / start_trace / record_tool_call 等三段式 API。"
    },
    {
      start: "16:49:22", end: "16:50:11", slide: 23,
      label: "记忆图模型：消息连实体连推理",
      transcript: "And this is what it might look like in a graph. You have your conversations and your messages being stored and cached inside the graph database, linked to your people, your organizations — your POLE model. In addition you have your reasoning traces, where decisions and tool calls were made, and they're connected together. So you can follow the tool call to the organization, to the person, to the message with that person. This gives you connected data where you can begin to traverse and solve very hard business challenges with a connected contextual memory.",
      transcript_zh: "而放到图里，它大概长这样。你的会话和消息被存储、缓存在图数据库里，并关联到你的人员、组织——也就是你的 POLE 模型。此外还有推理轨迹，决策和 tool call 都记在里面，而且彼此连通。于是你可以沿着 tool call 追到组织、追到人、再追到与那个人的消息。这就给了你连通的数据，可以开始遍历，用连通的上下文记忆去解决非常棘手的业务难题。",
      note: "slide 为 neo4j-agent-memory 的图 schema（FIRST_MESSAGE / NEXT_MESSAGE / TRIGGERED / HAS_STEP / USED_TOOL 等关系）。"
    },
    {
      start: "16:50:11", end: "16:50:59", slide: 24,
      label: "Lenny's Memory：播客变图谱",
      transcript: "And the first example of this is a short demo using Lenny's memory, which has 300 different podcasts. Anyone familiar with Lenny's memory? Lenny's podcast — he was a product manager, and he does a podcast where he brings on a bunch of AI startups and influencers and folks in the field. There's a lot of valuable insights in his podcast, but it's very hard to listen to 300 one-hour episodes — 300 hours of content. We can solve this with AI and turn all this information into a context graph. So this is an application you can try — lennys-memory.app — and it has all the information from the episodes, plus a bunch of MCP tools loaded up which allow it to pull back and get different information.",
      transcript_zh: "第一个例子是用 Lenny's memory 做的一个小 demo，里面有 300 期播客。有人了解 Lenny's memory 吗？Lenny's Podcast——他曾是产品经理，做的播客会请来很多 AI 创业公司、行业意见领袖和这个领域里的人。他的播客里有大量有价值的洞见，但要听完 300 期、每期一小时的节目——整整 300 小时内容——实在太难了。我们可以用 AI 解决这个问题，把所有这些信息变成一张 context graph。这是一个你可以自己上手试的应用——lennys-memory.app——它装入了全部节目信息，还加载了一组 MCP 工具，可以按需取回各种不同的信息。",
      note: "slide 架构：300+ 期播客 → 实体抽取 → 知识图谱 → Pydantic AI agent，支持图谱检索、会话记忆、推理复用、可视化。"
    },
    {
      start: "16:51:06", end: "16:51:29", slide: 25,
      label: "Demo：Brian Chesky 期的地点检索",
      transcript: "And then you can see here that we can answer questions about, for example, show me locations mentioned in a particular episode — the Brian Chesky episode. Now it's pulling back the exact information from the episode with the guest and putting that together into a map which shows us all the different areas and locations that were discussed in that podcast.",
      transcript_zh: "在这里可以看到，它能回答诸如“给我看看某一期节目里提到的地点”这样的问题——比如 Brian Chesky 那一期。此刻它正从那期节目里连同嘉宾一起取回准确信息，拼成一张地图，把这期播客谈到的所有区域和地点展示出来。",
      note: "分节页 Lenny's memory demo；现场切到 lennys-memory.app 演示。"
    },
    {
      start: "16:51:29", end: "16:51:50", slide: 26,
      label: "截图：跨期嘉宾与地点的连线",
      transcript: "This is normally very hard and obtuse information to extract and pull together, because it involves different times, different guests, different organizations. But a graph model is a great way of representing, extracting and pulling this.",
      transcript_zh: "这类信息平时非常难抽取、难汇总，因为它牵涉不同的时间、不同的嘉宾、不同的组织。而图模型是表示、抽取和汇集这些信息的绝佳方式。",
      note: "demo 截图页（仅 Neo4j 页脚文字），一带而过。"
    },
    {
      start: "16:51:50", end: "16:52:10", slide: 27,
      label: "我们需要图，很多图（梗图）",
      transcript: "But we can do more — if we have more graphs, we have more technology. And now let's talk about what we can do with a context graph for a financial services example.",
      transcript_zh: "但我们还能做更多——图越多，技术越多。接下来就谈谈用 context graph 在金融场景里能做些什么。",
      note: "整版梗图页（WE NEED GRAPHS… LOTS OF GRAPHS），快速翻过，转入金融场景。"
    },
    {
      start: "16:52:10", end: "16:52:58", slide: 28,
      label: "上下文图 vs 传统审计日志",
      transcript: "A typical audit log is just transactions, records and timestamps. It's very hard to actually figure out what happened, because you don't have connections between the different events — but there's always underlying connections. If you're doing fraud detection or customer service for a bank, the same customer may call back multiple times — those are connected, even if they're not connected directly. You might have transactions against the same accounts, even by different people — that's related information. A context graph captures that, because now you're linking relationships and entities, instead of a single flat audit log you have to go through to find those relationships.",
      transcript_zh: "典型的审计日志只有交易、记录和时间戳。很难真正弄清发生了什么，因为不同事件之间没有连接——但底层关联其实一直存在。如果你在银行做反欺诈或客服，同一个客户可能多次来电——这些记录是相关的，即便没有直接连在一起。同一账户下可能有多笔交易，哪怕来自不同的人——那也是相关信息。Context graph 能把这些都捕获下来，因为你在把关系和实体连接起来，而不是在一条扁平的审计日志里大海捞针般找关系。",
      note: "slide 定义：context graph 是捕获决策轨迹、推理与因果链的知识图谱——记录完整的“为什么”。"
    },
    {
      start: "16:52:58", end: "16:53:51", slide: 29,
      label: "检索：向量召回加图算法回灌",
      transcript: "And you can build this out with search that does context retrieval. The way it's done in the demo is a combination of vector search and knowledge graph algorithms. The easiest way to get started with GraphRAG is to first do a vector lookup against your embeddings — that gives you back a whole bunch of results which are similar but maybe not related. Then you trace those to the graph, and once you have the graph you can either pull back the nearest neighbors or use algorithms like Louvain for community grouping. Then you pass that data back to the agent loop, and that gets added back into your contextual memory — a great pattern for the financial services scenario.",
      transcript_zh: "你还可以用做上下文检索的搜索来把它建起来。demo 里的做法是向量搜索加知识图谱算法的组合。上手 GraphRAG 最简单的方式，是先对 embedding 做一次向量查询——它会返回一大堆相似、但未必相关的结果。然后把这些结果追到图上；有了图之后，既可以取回最近邻，也可以用 Louvain 之类的算法做社区分组。再把这批数据传回 agent loop，加回到你的上下文记忆里——这正是金融场景下的一个绝佳模式。",
      note: "slide 流程图：Query → 向量+图检索（含 GDS）→ Agent Loop → Contextual Memory，与讲解逐句对应。"
    },
    {
      start: "16:53:51", end: "16:54:29", slide: 30,
      label: "金融场景数据模型三层拆解",
      transcript: "Our entities are going to be people, accounts, transactions and organizations. Our events are going to be decisions, approvals and rejections on top of those transactions. And for the context, we'll have the policies applied, risk factors, and what reasoning or prior decisions went on. This gives you a model for modeling a financial transaction on top of the context graph framework.",
      transcript_zh: "实体层是人员、账户、交易和组织。事件层是基于这些交易产生的决策、批准和拒绝。上下文层则有适用的策略、风险因素，以及当时的推理和先前的决策。这就在 context graph 框架之上给了你一套刻画金融交易的数据模型。",
      note: "slide 三层 ENTITIES / EVENTS / CONTEXT，配套博客 neo4j.com/blog/agentic-ai/hands-on-with-context-graphs-and-neo4j。"
    },
    {
      start: "16:54:29", end: "16:55:07", slide: 31,
      label: "Demo 架构：十个 MCP 工具",
      transcript: "The architecture of the demo: we have a support ticket system, CRM, and internal business data — all these disparate systems from the start of the talk — with ten different MCP tools available to the agent, and embeddings created inside our graph, so the graph contains both the graph data and the embeddings. It gets the feedback loop of additional reasoning traces as decisions are made, and then a simple UI on top to visualize the graphs and let our human agents interact with it. Let me show you what this looks like.",
      transcript_zh: "demo 的架构：有工单系统、CRM 和内部业务数据——也就是开场提到的那些割裂系统——通过十个不同的 MCP 工具提供给 agent；embedding 就在我们的图里生成，所以这张图既装着图数据，也装着 embedding。随着决策不断产生，新的推理轨迹又会回灌进来形成反馈回路；最上面是一个简单的 UI，既可视化这些图，也让我们的人类坐席与之交互。让我给大家看看它长什么样。",
      note: "slide 技术栈：FastAPI + Claude Agent SDK、Next.js / Chakra UI、Neo4j AuraDS + GDS（FastRP/KNN/Louvain/PageRank）、NVL 可视化。"
    },
    {
      start: "16:55:07", end: "16:55:24", slide: 32,
      label: "Context Graph Demo 开场",
      transcript: "Again, this is a demo which you can all try yourself — it's at context-graph-demo.vercel.app.",
      transcript_zh: "再说一次，这是一个你们都可以自己试的 demo——地址是 context-graph-demo.vercel.app。",
      note: "分节页；demo 地址 context-graph-demo.vercel.app，现场切换演示。"
    },
    {
      start: "16:55:24", end: "16:55:57", slide: 33,
      label: "Demo：Jessica 的提额申请",
      transcript: "And you can see here we're asking about a decision for a credit increase for Jessica Norris — we want to figure out if we should give Jessica her credit increase. On the right you can see the graph that's loaded; on the left are the Cypher queries and the information coming back from the graph database. You can see it's pulling back related transactions, different compliance decisions which were made previously.",
      transcript_zh: "这里可以看到，我们正在询问关于 Jessica Norris 提额申请的决策——想知道该不该批准她的额度提升。右边是加载出来的图，左边是 Cypher 查询和图数据库返回的信息。可以看到它取回了相关交易，以及先前做过的各种合规决策。",
      note: "Wordly 把 Cypher 转写成“cipher”；第 33/34 页均为 demo 截图，讲者连续讲解。"
    },
    {
      start: "16:55:57", end: "16:56:59", slide: 34,
      label: "有据拒绝：欺诈史与保证金交易",
      transcript: "Now it's going to pull this information together and give us an informed decision. As a human, you make a decision: we obviously want to help out Jessica, but we can't — she has a history of previous rejections, high severity fraud, and margin trading on her accounts. It's always unfortunate when you have to reject a request, but in this case you would feel comfortable having a well supported answer for why you're rejecting it. And this is the sort of information and help we should be giving our customers and the folks using the AI systems we build — and you can only do it by building a better data model, better context, so that your agents are able to give that clear guidance back to your customers.",
      transcript_zh: "现在它要把这些信息汇总起来，给出一个有依据的决策。作为人类，你要做决定：我们当然想帮 Jessica，但帮不了——她有多次被拒绝的记录、高严重度的欺诈，账户上还有保证金交易。拒绝一笔申请总是令人遗憾，但在这种情形下，你会很有底气地拿出一套理由充分的答案去解释为什么拒绝。这正是我们应该给客户、给我们所构建 AI 系统的使用者的信息和帮助——而做到这一点，唯有靠更好的数据模型、更好的上下文，你的 agents 才能把清晰的指引回报给客户。",
      note: "demo 截图页；拒绝理由来自图中先前决策、高严重度欺诈与保证金交易记录，呼应第 5 页“决策轨迹”主线。"
    },
    {
      start: "16:56:59", end: "16:57:41", slide: 35,
      label: "Graph Academy 免费课程",
      transcript: "So I want to leave you with some resources to learn more. The first is Neo4j Graph Academy — free online training, with a bunch of courses for building out chatbots in JavaScript and Python, and a new context graph course which we just launched. This is a resource we keep updated, because we want to educate people about how to use graphs and get better at applying them, particularly for AI.",
      transcript_zh: "最后我想给大家留几个可以深入学习的资源。第一个是 Neo4j Graph Academy——免费的在线培训，有一整套用 JavaScript 和 Python 搭建聊天机器人的课程，还有我们刚上线的全新 context graph 课程。这份资源我们会持续更新，因为我们希望大家学会使用图、用好图，尤其是用在 AI 上。",
      note: "入口 dev.neo4j.com/ga-rag；新上线的 context graph 课程与本场内容直接对应。"
    },
    {
      start: "16:57:41", end: "16:58:09", slide: 36,
      label: "Neo4j 创业加速计划",
      transcript: "And the second resource: if you're a startup — anyone here a startup? Okay, some folks. We have a free startup accelerator program where we want to help startups be successful with graph technology. We give you access to Aura, our cloud environment, plus mentoring and resources to help bootstrap you and make you successful with graph technology from day one. So if you're interested, give this a try and reach out — you can reach out to me as well, and I can help accelerate things with the startup program team.",
      transcript_zh: "第二个资源：如果你是创业公司——在座有创业者吗？好，有一些。我们有一个免费的创业加速计划，希望帮助创业公司在图技术上取得成功。我们会给你 Aura——我们的云环境——的使用权限，加上导师辅导和各类资源，帮你完成起步，从第一天起就把图技术用好。如果你感兴趣，不妨试一试、联系我们——也可以直接找我，我可以和创业计划团队一起帮你加速。",
      note: "slide 三项支持：Runway（Aura 额度）/ Expertise（架构验证）/ Exposure（联合营销）。"
    },
    {
      start: "16:58:09", end: "16:58:26", slide: 37,
      label: "谢谢 & 联系方式",
      transcript: "And we'd love to see more people using and applying graph technology to solve all sorts of innovative business challenges. So with that, thanks very much for coming to my talk — and also thank you for attending AGNTCON Shanghai.",
      transcript_zh: "我们乐见更多人使用和应用图技术，去解决各种创新的业务难题。今天就讲到这里，非常感谢大家来听我的演讲——也感谢各位参加 AGNTCON 上海场。",
      note: "Stephen Chin @steveonjava；Wordly 把会场名转写成“Agent Khan”，其后为现场问答环节，未收录。"
    }
  ]
};
