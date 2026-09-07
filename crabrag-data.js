window.talk = {
  title: "CrabRAG：Why your assistant needs graph memory, not more tokens",
  speaker: "Stephen Chin · VP of Developer Relations, Neo4j",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 1",
  pdf: "pdfs/crabrag.pdf",
  assets: "assets/crabrag",
  source: "EWFH-7055-transcript.txt",
  cues: [
    {
      start: "12:11:13", end: "12:12:09", slide: 1,
      label: "开场：助手缺的是记忆，不是更多 token",
      transcript: "Hello and welcome, everybody, to CrabRAG. I'm going to talk about why your assistant needs memory and not just more tokens. My name is Stephen Chin, I'm VP of Developer Relations at Neo4j, and also an Agentic AI Foundation ambassador — very excited to be at the inaugural event here in Shanghai. How many folks here are using some sort of agent like OpenClaw, Hermes agent, or Goose? Hopefully everybody who didn't raise their hand gets inspired to try some of these technologies out — it's really powerful. You can think of it like ChatGPT, but it actually does your work, and not just things which are allowed by your company and by the integrations. It lets you do coding, a lot of research, and different projects.",
      transcript_zh: "大家好，欢迎来到 CrabRAG。我要讲的是为什么你的助手需要的是记忆，而不只是更多 token。我叫 Stephen Chin，是 Neo4j 的开发者关系副总裁，也是 Agentic AI Foundation 的大使——非常兴奋能来上海参加这场首届活动。在座有多少人在用某种 agent，比如 OpenClaw、Hermes agent 或者 Goose？希望没举手的朋友会受到启发去试试这些技术，它真的很强大。你可以把它想象成 ChatGPT，但它真的替你干活，而且不只限于公司和集成所允许的范围。它能写代码，也能做大量研究和各种项目。",
      note: "12:11:13 正式开场；举手互动后约一分钟仍在标题页口述 agent 的价值。Wordly 把姓名转成 Stephen Chen。"
    },
    {
      start: "12:12:14", end: "12:12:37", slide: 2,
      label: "认识 Crabd：演示很好看的小助手",
      transcript: "One of the most popular ones is OpenClaw — this is the little claw, our buddy Crabd, and we're going to walk through his life and how he deals with being an agent. He's our little personal assistant: he's eager, he's plugged into all of your tools, and he demos beautifully. I have a demo at the end of the talk as well, where I'll show all these technologies coming together.",
      transcript_zh: "最流行的之一是 OpenClaw——这就是那只小螃蟹，我们的伙伴 Crabd，我们会跟着他的一生，看他怎么当一个 agent。他是我们的小个人助手：劲头十足，接入了你所有的工具，而且演示起来特别好看。演讲最后我还有一个 demo，把这些技术串起来给大家看。",
      note: "deck 第 2 页起主角叫 Crabd，但 3–5 页等正文仍残留旧名 Clawd，字幕稿统一写作 Crabd。"
    },
    {
      start: "12:12:44", end: "12:13:11", slide: 3,
      label: "失忆 crab·1：每次醒来都不知自己是谁",
      transcript: "And he just has one little problem, which is he's very forgetful. If you've used personal agents, I'm sure you know: you wake up in the morning and ask it to follow up on a task it's doing, and it's like, okay, I don't remember anything from yesterday. I have no idea what happened before. Maybe I'll find it in my memory files... but yeah, I don't even know who I am anymore. So personal agents, aside from the SOUL.md file, really have no personality. They don't know who they are. They don't have any memory state.",
      transcript_zh: "而他只有一个小问题：他非常健忘。用过个人 agent 的肯定都知道：你早上醒来，让它跟进昨天在做的一个任务，它会说，好吧，我不记得昨天的任何事了，完全不知道之前发生过什么，也许能在记忆文件里找到……对了，我连自己是谁都不知道了。所以个人 agent 除了 SOUL.md 那个文件，真的没有性格，不知道自己是谁，也没有任何记忆状态。",
      note: "Wordly 把 SOUL.md 转成 sol.md；slide 台词是 agent 的第一人称吐槽，对应 THE FORGETFUL CRAB·1。"
    },
    {
      start: "12:13:18", end: "12:13:34", slide: 4,
      label: "失忆 crab·2：满抽屉工具仍喝不到汤",
      transcript: "And they also have challenges with picking the right tools to use — so often they'll reach for the wrong tools. Clearly, he's not going to get much food out of that. Making sure that your agents have the right tools, have the right things at their disposal so they can be effective, means that they do get to eat their soup.",
      transcript_zh: "他们在挑对工具这件事上也有困难，所以经常会伸手拿错工具。很明显，这样他是吃不到什么东西的。确保你的 agent 拥有合适的工具、手边有合适的东西，他们才能真正喝到那碗汤。",
      note: "问题从来不是工具数量，而是知道此刻该用哪个——一抽屉工具仍然喝不到汤。"
    },
    {
      start: "12:13:46", end: "12:14:05", slide: 5,
      label: "失忆 crab·3：记不住最好的朋友",
      transcript: "Also, they don't really have context and memory of conversations, of different interactions, other than what you've told them. Even Crabd's best friend, who he eats crab cakes with every Friday, he doesn't remember, unfortunately. So maybe his memory file — the Markdown files got wiped out — and all he has is logs and information to look through to try to figure out who he is and what his identity is.",
      transcript_zh: "另外，除了你亲口告诉他们的，他们对对话和各种交互几乎没有上下文和记忆。连 Crabd 最好的朋友——每个周五一起吃蟹饼的那位——很遗憾他也不记得。也许他的记忆文件、那些 Markdown 被清空了，只剩日志和信息可以翻，试图弄清自己是谁、身份是什么。",
      note: "日志记得“聊过”，记不得谁、对谁、为什么——关系的缺失为后面图谱部分埋线。"
    },
    {
      start: "12:14:09", end: "12:14:15", slide: 6,
      label: "Crabd 的大脑：一文件夹 Markdown",
      transcript: "All right, so let's talk a bit about how agents actually work under the scenes. Basically, it's a whole bunch of going through a typical LLM.",
      transcript_zh: "好，那我们来聊聊 agent 在幕后到底是怎么工作的。基本上，就是一遍又一遍地跑一个典型的 LLM。",
      note: "过渡页，轻量 cue；“剧透：一个装满 Markdown 的文件夹”的答案由下一页展开。"
    },
    {
      start: "12:14:26", end: "12:14:37", slide: 7,
      label: "循环容易，记忆才是难点",
      transcript: "It's going through prompts, it's thinking, it's calling tools, it's observing — and what gets remembered between different sessions are essentially Markdown files or memory files.",
      transcript_zh: "它经历提示、思考、调用工具、观察——而不同会话之间真正留下来的，本质上就是 Markdown 文件或记忆文件。",
      note: "对应 PROMPT→THINK→CALL A TOOL→OBSERVE 循环；旧版把这段并进第 8 页，实际先停在循环页。"
    },
    {
      start: "12:14:38", end: "12:15:11", slide: 8,
      label: "文件即 agent：注入上下文的脆弱平衡",
      transcript: "Typically you'll have a SOUL.md that describes your agent's personality, maybe gives it specific orders — like you're doing coding, or being a personal assistant. In addition, you have AGENTS.md for personality and boundaries injected, USER.md, MEMORY.md, TOOLS.md, and then memory files per day, where it aggregates and stores and builds memory over time. These get injected into the context, so when you ask it a question it has a little bit more information. But it's kind of fragile: do you inject too much context? Then you're breaking the context boundary of your model. You inject too little context, then it doesn't have the right information to do its job.",
      transcript_zh: "通常你会有一个 SOUL.md 来描述 agent 的性格，也许还给出具体指令，比如你是写代码的、还是做个人助理。除此之外还有注入性格与边界的 AGENTS.md、USER.md、MEMORY.md、TOOLS.md，以及按天聚合、随时间积累记忆的记忆文件。这些会被注入上下文，这样你提问时它就多一点信息。但这挺脆的：注入太多上下文，会撑破模型的上下文边界；注入太少，它又没有干活所需的信息。",
      note: "Wordly 把各文件名转成 llm-d，按 deck 修正为 SOUL/AGENTS/USER/MEMORY/TOOLS.md；透明、可 Git，但完全是扁平的。"
    },
    {
      start: "12:15:22", end: "12:15:46", slide: 9,
      label: "代价：无结构记忆一天烧几百万 token",
      transcript: "Did the tool call overflow and actually take over the entire context? And without any structured memory, you're easily burning millions and millions of tokens a day. Who has an incredibly high cloud budget on their personal agent when it goes wrong? Okay, so people aren't being honest. You can actually burn quite a lot of credits on repeated requests, inefficient use, inefficient caching. So making sure this all works smoothly is important to make sure that you're not racking up a big bill.",
      transcript_zh: "工具调用会不会溢出、直接占满整个上下文？而没有结构化记忆，你一天轻松烧掉几百万 token。谁的个人 agent 出岔子时云端账单高得吓人？好吧，看来大家都不老实。重复请求、低效使用、低效缓存，真能烧掉不少额度。让这一切顺畅运转很重要，别让账单越滚越大。",
      note: "对应 slide 口号 Don't read more. Remember better.；OpenClaw 按设计就是 anti-RAG，token 账单会说话。"
    },
    {
      start: "12:15:51", end: "12:16:11", slide: 10,
      label: "Hermes：自己写 skill 的程序性记忆",
      transcript: "One of the interesting memory systems is Hermes agent. It uses skill files as its main memory structure, which is an interesting approach, and it works quite well because it builds its own skills to do different tasks. Skill files — you can think of them as basically small instructions for how to accomplish a task, which you can share with other people, share in public repos, and reuse.",
      transcript_zh: "有个挺有意思的记忆系统是 Hermes agent。它把 skill 文件当作主要的记忆结构，这个思路很有意思、效果也不错，因为它会为不同任务自己构建 skill。Skill 文件你可以理解为一套“怎么完成某件事”的小型说明书，可以分享给别人、放进公开仓库复用。",
      note: "同一份 SOUL.md 身份 + 封顶的 MEMORY.md，加一条学习回路：做任务→赢几次→存成 SKILL.md。"
    },
    {
      start: "12:16:20", end: "12:16:23", slide: 11,
      label: "PART TWO：skill 的三种坏法（分节页）",
      transcript: "But if you get the wrong skill, or if you have too many skills, a lot of things can go wrong.",
      transcript_zh: "但如果选错了 skill，或者 skill 太多，很多东西都会出问题。",
      note: "PART TWO 分节页，现场一翻而过；轻量 cue，字幕取“三种失效方式”的引子句。"
    },
    {
      start: "12:16:24", end: "12:16:36", slide: 12,
      label: "skill 坏法·1：会吃虾，败给蛤蜊",
      transcript: "So here's our buddy Crabd. He has a pile of shrimp — he has a shrimp-eating skill — but apparently he doesn't know how to get the clam. He doesn't have the right skill for the job which he's doing here.",
      transcript_zh: "来看我们的伙伴 Crabd。他面前有一堆虾，他也有吃虾的 skill，但显然他不知道怎么对付那只蛤蜊。他此刻手上的活，缺的正是对应的 skill。",
      note: "吃虾技能完美无缺，蛤蜊是新的——没有 clam.md，他就直接停住；skill 不自适应、没有回退。"
    },
    {
      start: "12:16:39", end: "12:16:48", slide: 13,
      label: "skill 坏法·2：选错 skill 还自信执行",
      transcript: "I think he might have chosen the wrong skill here, because if you're on the beach, you don't want to be on jet skis. So again, if you confidently pick the wrong skill and apply it, you're not going to get great results.",
      transcript_zh: "我觉得他这里可能选错了 skill——在沙滩上，你总不至于想骑摩托艇吧。所以说，如果自信满满地选错 skill 还照着执行，结果不会好看。",
      note: "slide 画面是“想慢跑却选了滑水”，口头说的是沙滩摩托艇；Hermes hub 自带约 700 个 skill，挑选本身就是难题。"
    },
    {
      start: "12:16:56", end: "12:17:05", slide: 14,
      label: "skill 坏法·3：会敲壳不会吃，无法组合",
      transcript: "And now he has the crack-shell skill, but he doesn't have the eating skill loaded, so he's still not going to get his favorite treat, which is that nice little clam. So poor crab is not going great.",
      transcript_zh: "现在他有了“敲开壳”的 skill，却没装上“吃肉”的 skill，所以还是吃不到他最爱的那口——那只肥美的蛤蜊。可怜的螃蟹过得不太顺。",
      note: "crack → eat 的链式组合 slide 上标注 Hold that thought，要到图谱部分才解开。"
    },
    {
      start: "12:17:11", end: "12:17:37", slide: 15,
      label: "第三只助手 Goose：MCP 即扩展",
      transcript: "One of the ways you can make your agents a little bit smarter is by integrating MCP servers. Goose is a great example of this — one of the projects in the Agentic AI Foundation, donated by Block. It allows you to basically treat MCP servers as your memory structure, and gives you a lot of capabilities for integrating tools and different services as well, which is really great. How many folks have given Goose a try already? Okay, so a bunch of folks in the audience.",
      transcript_zh: "让 agent 聪明一点的办法之一是接入 MCP server，Goose 就是个好例子——它是 Agentic AI Foundation 的项目，由 Block 捐赠。它让你基本可以把 MCP server 当作记忆结构，还提供大量集成工具和各种服务的能力，这真的很棒。在座有多少人已经试过 Goose？好，观众里有不少人都用过。",
      note: "Goose：开源、跑在本机，桌面/CLI/API 皆可；slide 强调 70+ MCP 扩展、100% 本地。“MCP 即记忆”一句同时是下一页的主标题。"
    },
    {
      start: "12:17:43", end: "12:18:08", slide: 16,
      label: "Goose 记忆：记忆只是又一个 MCP server",
      transcript: "This is a great way of extending what you can do, by having MCP servers you can call to access tools. We do a lot of things with graph MCP servers — at Neo4j, you can also integrate graph technology using MCP calls, which is amazing. But again, it's challenging to have your agent both have a whole bunch of MCP tools and get back large tool calls it needs to process, and then to figure out the right things it needs to say.",
      transcript_zh: "这是一种很好的扩展方式：现在你有了可以调用来访问工具的 MCP server。我们做了很多 graph MCP server 的工作——在 Neo4j，你也可以通过 MCP 调用接入图技术，这非常神奇。但反过来说，让 agent 同时握着一大堆 MCP 工具、再收回一大坨需要处理的工具调用结果，然后从中理出该说什么，这本身就很有挑战。",
      note: "slide 上 remember_memory()/retrieve_memories() 等触发词机制未逐条口述；记忆文件在 ~/.config/goose/memory/，还是同一类 catch。"
    },
    {
      start: "12:18:19", end: "12:18:29", slide: 17,
      label: "MCP 给了工具，给不了判断力",
      transcript: "So if it picks the wrong tool again, you could be inventing a new game like pickleball by playing tennis with table-tennis rackets.",
      transcript_zh: "所以如果它又选错了工具，你可能就像拿着乒乓球拍打网球一样，发明出一项新运动——匹克球。",
      note: "轻量 cue，对应 Right game. Wrong paddle.；slide 自嘲“也可能他只是发明了匹克球”。"
    },
    {
      start: "12:18:30", end: "12:18:33", slide: 18,
      label: "工具过载：上下文塞满，飞不起来",
      transcript: "Or you can just have too much overload of different tools available, and it's too much weight — now your context is getting filled up and you become less effective over time.",
      transcript_zh: "又或者，可选的工具太多、负载太重——上下文被一点点塞满，你随时间越来越不好使。",
      note: "轻量 cue；对应 Remembers everything. Can't take off.——扁平记忆只增不减。"
    },
    {
      start: "12:18:34", end: "12:18:49", slide: 19,
      label: "危险：随手调用、转头就忘",
      transcript: "And it's quite dangerous as well. When you have a lot of tools, it's very easy to just call the commands and then forget everything directly from the MCP call. So you're giving your agent a lot of freedom, but also you're giving a lot of capabilities to make mistakes.",
      transcript_zh: "而且这还挺危险的。工具一多，随手一调就是命令，MCP 调用里的东西转头就忘。你给了 agent 很大自由，同时也给了它很多犯错的资本。",
      note: "对应 Plugging straight into the socket.——记忆只是松散工具调用时，危险的那一个永远只差一次调用。"
    },
    {
      start: "12:18:56", end: "12:19:02", slide: 20,
      label: "PART THREE：给他个向量库吧（分节页）",
      transcript: "So another way we can solve this problem with memory is by applying a vector database.",
      transcript_zh: "解决记忆问题的另一条路，是上一个向量数据库。",
      note: "轻量 cue；slide 上十几个向量库名牌（Pinecone/FAISS/Weaviate/Qdrant…+Good Luck）现场未逐个念。"
    },
    {
      start: "12:19:03", end: "12:19:15", slide: 21,
      label: "向量检索：按相似度找最近的点",
      transcript: "Vector databases basically let you look things up by similarity searches. There are a whole bunch of them available — Milvus is an example of one, which is part of the AI and Data Foundation, which I'm also a part of and on the board of.",
      transcript_zh: "向量数据库基本上让你按相似度搜索来查找。这类产品有一大堆——Milvus 是其中之一，它属于 AI and Data Foundation，我自己也在这个基金会里，还是董事会成员。",
      note: "最近邻机制讲得简略；Milvus 一句其实对应上一页的选型列表，基金会名 Wordly 转丢前缀，即 LF AI & Data。"
    },
    {
      start: "12:19:32", end: "12:19:37", slide: 22,
      label: "向量的坑：相似不等于相关",
      transcript: "Vector databases are very good, but they can also be quite challenging, because they give things back for similarity results, but they don't do as good of a job of actually coming up with structural relationships. So you often get back results which look similar but aren't exactly the same.",
      transcript_zh: "向量数据库很好用，但也相当有挑战：它返回的是相似度结果，却不太擅长给出结构化的关系。所以你经常拿回“看着相似、其实不是一回事”的结果。",
      note: "Similar ≠ related，Nearest ≠ right——向量知道两个东西长得像，不知道谁导致了谁、谁连着谁。"
    },
    {
      start: "12:19:45", end: "12:19:51", slide: 23,
      label: "向量坑·1：apple 变成 Apple MacBook",
      transcript: "And this produces its own set of challenges — like, clearly he didn't want to eat the MacBook. He wanted to eat an apple, although that's very easy to confuse, because they're basically the same word.",
      transcript_zh: "这会带来它自己的一类麻烦——比如，他显然不想吃那台 MacBook。他想吃的是一个 apple（苹果），虽然这确实很容易搞混，因为两个词基本一样。",
      note: "相似度检索返回了最近的匹配：另一颗“苹果”，咬了三口才发现不对。"
    },
    {
      start: "12:19:56", end: "12:20:09", slide: 24,
      label: "向量坑·2：没有多跳，到不了终点",
      transcript: "Often the path to get there is not obvious. It's very hard in vector databases to skip and connect multiple different relationships and hops together. Even if the end destination is close, you often don't have enough information to actually get there.",
      transcript_zh: "通往终点的路径往往并不显然。在向量数据库里，很难把多个不同的关系和跳数衔接、串联起来。哪怕终点就在附近，你也常常没有足够的信息真正到达。",
      note: "食物离他两跳远：越过石头、绕过树枝——相似度只给你最近的东西，从不给路径。"
    },
    {
      start: "12:20:16", end: "12:20:32", slide: 25,
      label: "向量坑·3：99% 匹配不是你的壳",
      transcript: "And one of those shells is his, but he can't figure it out. So just getting a 99% match doesn't mean it's your shell, especially when you're doing a critical enterprise or business application. You need to have more precision, more accuracy, to get back results which actually will give you the correct answer all the time.",
      transcript_zh: "这些壳里有一只是他的，可他认不出来。99% 的相似匹配不代表就是你的壳——尤其是在关键的企业或业务应用里。你需要更高的精度、更准的准确性，才能每次都拿回真正正确的答案。",
      note: "“哪个壳是我的？”——所有权是 (Crabd)-[:OWNS]→(shell) 关系，不是长相；相似度看不见身份、归属和历史。"
    },
    {
      start: "12:20:36", end: "12:20:48", slide: 26,
      label: "PART FOUR：让图登场（分节页）",
      transcript: "So one of the ways you can solve this is using techniques like GraphRAG.",
      transcript_zh: "解决这个问题的方式之一，就是用 GraphRAG 这样的技术。",
      note: "轻量 cue；PART FOUR 分节页——关系、路径、身份、从敲壳到吃肉的链条，图原生全存。"
    },
    {
      start: "12:20:49", end: "12:20:58", slide: 27,
      label: "图为连接数据而生：节点与关系",
      transcript: "GraphRAG is a way of applying graph technology as the retrieval part of your vector lookups, and it's built for connected data. So now you're representing nodes and relationships.",
      transcript_zh: "GraphRAG 是把图技术用作向量检索环节的一种方法，它为连接数据而生。现在你表示的是节点和关系。",
      note: "实体是节点，关系是被存储、带类型、可遍历的一等公民边——向量丢掉的那部分正是图的组成材料。"
    },
    {
      start: "12:20:59", end: "12:21:29", slide: 28,
      label: "一次遍历的多跳答案：朋友·蛤蜊·北礁",
      transcript: "You are able to traverse those and do multi-hop traversals to define the destination you're looking for, and this gives you more precise and more repeatable results. You can see here that Crabd is friends with his best friend — now he actually knows who his best friend is. He likes clams, and they're found at the North Reef, so he can both find his clams and eat his clams with his best friend, using a connected set of data now, which is easier to traverse and helps him navigate all of those different relationships.",
      transcript_zh: "你可以遍历它们、做多跳遍历来定位你要找的目标，这也带来更精确、更可复现的结果。可以看到 Crabd 和他最好的朋友是朋友关系——现在他真的知道自己最好的朋友是谁了。他喜欢蛤蜊，而蛤蜊在 North Reef 出没，所以借助一套连通的数据，他既能找到蛤蜊，还能和好朋友一起吃——这样的数据更容易遍历，帮他导航所有这些不同的关系。",
      note: "deck 用 :FRIENDS_WITH/:LIKES/:FOUND_AT 演示“该带朋友去哪吃饭”——一条跳链、一个答案；页面上主角仍写作 Clawd。"
    },
    {
      start: "12:21:34", end: "12:21:57", slide: 29,
      label: "答案即解释：准确、可解释、可审计",
      transcript: "And now you get answers which are accurate — so it precisely tells him the information he wants; that gives you precise context. They're explainable, because you know the portion of the graph which was returned. And they're auditable, because now you have a way of looking into the data and figuring out exactly which of those parts of the data are relevant for your application, if somebody else wants to figure out how your application is getting the results.",
      transcript_zh: "现在你得到的答案是准确的——它精确告诉他想要的信息，给出精准的上下文。它是可解释的，因为你知道返回的是图的哪一部分。它还是可审计的，因为你有办法透视数据、精确弄清其中哪些部分与你的应用相关——如果别人想弄明白你的应用是怎么得出结果的，也做得到。",
      note: "遍历路径即引用；答错时能追溯到具体哪条边出了问题——Show your work, every time."
    },
    {
      start: "12:22:01", end: "12:22:38", slide: 30,
      label: "Live demo：homelab 的数字孪生",
      transcript: "Okay, so I'm going to show you a demo of this. The demo is going to be using OpenClaw, and we're going to be building a graph off of a digital twin of an infrastructure scenario. The infrastructure scenario is my home lab. What I did is I took my home setup, which is a three-cluster Proxmox setup. It runs a bunch of different services — I have services like my kids' Minecraft server, media servers. I have this demo also running in the home lab server.",
      transcript_zh: "好，我来给大家放个 demo。demo 会用 OpenClaw，基于一个基础设施场景的数字孪生来建图。这个基础设施场景就是我的 homelab。我把我家里的环境——一套三集群的 Proxmox——搬了进来，上面跑着一堆不同的服务，比如我孩子的 Minecraft 服务器、媒体服务器；这个 demo 本身也跑在 homelab 的服务器上。",
      note: "slide 标语 There is no spoon. There is only the graph.；三步（边做边写图/追问靠遍历/新会话仍记得）未逐条口述。deck 上为 4 台主机、3 节点集群。"
    },
    {
      start: "12:22:41", end: "12:23:25", slide: 31,
      label: "demo 架构：VLAN + Cogni + 本地 Neo4j",
      transcript: "So this is set up in a separate VLAN. It has Cogni, which I'm using for the memory system — Cogni is connected to a Neo4j instance, so it's running a local Neo4j database, and then using some LLMs to do the processing. If you were doing an infrastructure case like this, this is just large enough that it doesn't fit in the standard context window for a one-million-context model. So it has to select what information to put in the context and what information is available on each query. And I'll show you side by side: if you give a vector database and similarity results back, and if you do a graph retrieval, what's the difference between the two of those?",
      transcript_zh: "它部署在一个独立的 VLAN 里，用 Cogni 做记忆系统——Cogni 连着一个 Neo4j 实例，也就是跑了一个本地 Neo4j 数据库，再用一些 LLM 做处理。如果你做的是这类基础设施场景，它的体量刚好大到塞不进百万上下文模型的标准上下文窗口，所以每次查询都得筛选哪些信息放进上下文、哪些信息备查。我会并排展示：一边是向量数据库返回相似度结果，一边是做图检索，两者差别在哪。",
      note: "Wordly 把 Cogni 转成 Cockney；架构图上的 pfSense/HAProxy/VLAN100/默认拒绝防火墙等细节未逐条念。"
    },
    {
      start: "12:23:30", end: "12:23:44", slide: 32,
      label: "homelab 架构图（重复页）",
      transcript: "Okay, so let's take a look at the demo.",
      transcript_zh: "好，那我们来看这个 demo。",
      note: "与第 31 页完全相同的 homelab 架构图重复贴出，现场未再展开；轻量 cue，字幕取切入 demo 的过渡句。"
    },
    {
      start: "12:23:49", end: "12:25:02", slide: 33,
      label: "Cockpit 演示：WAN 暴露的停止维护软件",
      transcript: "So here you can see our GraphRAG cockpit — let me refresh it, so we have clean results. Basically what this lets us do: on the left side is standard vector search; on the right side is our graph memory. It'll show us the Cypher queries and the things which are going on, and it will also show us the graph. And we'll pick this one: any WAN-exposed end-of-life software. It's going to ask both models at the same time, and while it's running, you can see basically a diagram of what's happening here. So in my home lab there's a couple of services which have exposed software — one of those is my daughter's Minecraft server. I think it's running... oh, it's running an outdated WordPress server. So that's her WordPress server for a Minecraft server — a very outdated WordPress server, and it's exposed to the internet. And basically this would be an easy way for an attacker to hack into my home lab, because there's security vulnerabilities in this.",
      transcript_zh: "这里可以看到我们的 GraphRAG cockpit——我刷新一下，拿一份干净的结果。它让我们能做的：左边是标准向量检索，右边是我们的图记忆。它会显示正在执行的 Cypher 查询和正在进行的事情，还会把图画出来。我们选这一条：任何暴露在 WAN 上且已停止维护的软件。它会同时向两个模型提问；趁它运行，你可以看到一张示意图，展示这里正在发生什么。我的 homelab 里有几个服务开着暴露的软件——其中之一是我女儿的 Minecraft 服务器。我记得它跑的是……哦，它跑着一个过时的 WordPress 服务器。就是给她 Minecraft 服务器配的那个 WordPress——版本非常旧，而且直接暴露在互联网上。因为上面有安全漏洞，这基本上是攻击者侵入我 homelab 的一条捷径。",
      note: "Wordly 把 Cypher 转成 cipher；第一问选定后现场先自问自答了答案（过时 WordPress）。"
    },
    {
      start: "12:25:08", end: "12:26:00", slide: 34,
      label: "Cogni 算法：蓝节点相似、绿节点一跳",
      transcript: "So here are the Cypher queries which are getting fired off, and here's the graph which got retrieved — you can see there's a bunch of connected nodes. The algorithm that Cogni uses on top of Neo4j is: first it does a vector search and it gets back the blue nodes there — so the blue highlighted nodes are the similarity search. And then it looks for results one hop away which are related — those are the green nodes which got returned. And then it goes through all of the green nodes and stack-ranks and prioritizes them according to which ones are more relevant for the query which you launched. You can configure it to do one, two, three, or the number of hops you want; in this case, I have it set to do one hop.",
      transcript_zh: "这些是正在发出去的 Cypher 查询，这是取回来的图——可以看到一堆相连的节点。Cogni 在 Neo4j 之上用的算法是：先做一次向量检索，拿回那批蓝色节点——蓝色高亮的就是相似度检索结果；然后找一跳之外相关的结果，也就是返回的绿色节点；接着把所有绿色节点过一遍，按与你发起查询的相关度做堆叠排序和优先级排序。跳数可以配成一跳、两跳、三跳或者任意数目，这里我配的是一跳。",
      note: "此页为无文字截图页，正好承载检索图可视化；33/34 两页 LIVE DEMO 现场交替停留，cue 按内容顺序就近分配。"
    },
    {
      start: "12:26:04", end: "12:27:03", slide: 33,
      label: "同模型同数据：向量自信答错，图找对",
      transcript: "So on the vector search side, it guessed my machine, which is wrong — that's not exposed to the internet. It guessed pfSense, which of course is exposed to the internet, but that wasn't outdated. And then another service, it failed. On the GraphRAG side, you can see it found exactly the right instance which was exposed, and then explains why this is a vulnerable server. So same model, same data: I basically took the same exact digital twin and loaded it up in a vector database and a graph database, and you can see the exact comparison of how different the results are in terms of accuracy. Now it confidently gave an answer on the left, even though it got an incorrect answer — and that's even more challenging, because if you're building something for real and it gives you back the wrong answer, then you're misleading your customers, your clients, or you're just giving the wrong answer back from a system.",
      transcript_zh: "向量检索这边，它猜的是我的某台机器——错了，那台并没有暴露在互联网上；又猜 pfSense——pfSense 当然暴露在互联网上，但它不是停止维护的软件；还有一个服务，直接失败了。GraphRAG 这边可以看到，它精确找到了那台既暴露又过时的实例，并且解释了为什么这是一台脆弱的服务器。同样的模型、同样的数据：我把同一份数字孪生分别装进了向量库和图数据库，能清楚看到两边在准确度上的差别。左边虽然拿到了错误答案，却给得非常自信——这反而更麻烦：如果你在做真实产品，返回了错误答案，那你就是在误导你的客户，或者说系统干脆给出了错的答案。",
      note: "Wordly 把 guessed 转成 guest；same model, same data——唯一变量是记忆与检索方式；自信地错比失败更危险。"
    },
    {
      start: "12:27:04", end: "12:29:18", slide: 34,
      label: "第二问：GraphRAG 更慢但更准更可解释",
      transcript: "We'll do one more scenario: what services bind on 0.0.0.0 on a management port, and are exposed beyond the LAN? You can see my Matrix server and HAProxy are both WAN-exposed, so that's a problem for both of those, because they have some management services exposed — again, another security vulnerability. And then we'll see how the two agents do in finding this vulnerability. You can see this is an entirely different shape of graph: it anchored on pfSense — pfSense is the router or the gateway — and it traced back the exposed services; a lot of the green dots in the graph side keyed in on figuring out which were the WAN-exposed services. Let's look at the vector side: pfSense, OpenClaw, my Nextcloud server — okay, so it kind of got the wrong answer again, and it told us to go in the logs and look for more specific information. The GraphRAG side found HAProxy and the services which were exposed, so it found the correct services. So again, it took a little bit longer for the GraphRAG queries to come back, but it gave us more precise and more explainable information — exactly the services which are WAN-exposed and expose the management ports. Okay, so I hope you enjoyed the short demo. This is my fallback in case the network didn't work, but it did.",
      transcript_zh: "再来一个场景：哪些服务在管理端口上绑定 0.0.0.0、并且暴露在 LAN 之外？可以看到我的 Matrix 服务器和 HAProxy 都暴露在 WAN 上——两个都有问题，因为它们有一些管理服务是暴露的，又是一个安全漏洞。然后看看两个 agent 在发现这个漏洞上表现如何。可以看到这张图的形状完全不同：它锚定在 pfSense 上——pfSense 是路由器、也是网关——然后回溯出暴露的服务；图这边很多绿点都聚焦在弄清哪些是 WAN 暴露的服务上。看向量这边：pfSense、OpenClaw、我的 Nextcloud 服务器——好吧，又基本答错了，还让我们去翻日志找更具体的信息。GraphRAG 这边找到了 HAProxy 和那些暴露的服务，找到了正确的服务。所以说，GraphRAG 查询确实回来得慢一点，但它给了我们更精确、更可解释的信息——正是在管理端口上暴露于 WAN 的那些服务。希望你们喜欢这个短 demo。这是我准备的网络失灵备用方案，还好网络一切正常。",
      note: "讲者坦率承认 GraphRAG 查询更慢，但强调更精确、可解释；结尾 fallback 一句提示此页可能就是预录的备用演示截图。"
    },
    {
      start: "12:29:27", end: "12:30:01", slide: 35,
      label: "同一只螃蟹，新的图大脑（三大框架都能接）",
      transcript: "So now our friendly crab — the same crab, new brain, with the graph brain — and now he's able to do a lot more things than he was before. And you can do the same thing with your agents. Everything I showed for integrating Neo4j and Cogni has a plugin, an integration with OpenClaw — so that's what I was running the demo on. It also has a new plugin and integration with Hermes agent as well. And you can do the same thing with Goose and MCP servers. So basically you can already do the integration with the three most popular agent frameworks.",
      transcript_zh: "现在我们的螃蟹朋友——同一只螃蟹，新的大脑，一颗图的大脑——能做到比以前多得多的事情了。你的 agent 也可以做同样的事。我演示的 Neo4j 和 Cogni 集成全部都有 OpenClaw 的插件集成——我刚才的 demo 跑的就是它。它也有一个新的 Hermes agent 插件集成。Goose 加 MCP server 同样可以做到。也就是说，三个最流行的 agent 框架现在都已经可以接入。",
      note: "对应 ENLIGHTENED 页：挑对 skill、从敲壳到吃到肉的自助餐一条链；多跳免费、工具选择有据。"
    },
    {
      start: "12:30:12", end: "12:30:21", slide: 36,
      label: "记住整个 crew：关系构成的世界",
      transcript: "Now he can find all of his friends by building relationships, and then following the graph to traverse and then discover all of his crustacean friends.",
      transcript_zh: "现在他能通过建立关系、再沿着图去遍历，找到他所有的甲壳类朋友。",
      note: "轻量 cue；谁介绍谁认识、谁喜欢什么、谁欠人情——不是记得更多，而是理解一个由关系构成的世界。"
    },
    {
      start: "12:30:22", end: "12:30:50", slide: 37,
      label: "新书《GraphRAG: The Definitive Guide》",
      transcript: "And if you want to find out more details, this is the book which I just finished writing for O'Reilly — GraphRAG: The Definitive Guide. It's now out in early release — actually finished release online if you want to read it online; the print copy will be out in December if you want to buy a print copy. And this goes through basic GraphRAG techniques, it goes through memory, it goes through ontologies for how you build your graph. So basically, end to end, how you can do all this stuff.",
      transcript_zh: "想了解更多细节的话，这就是我刚为 O'Reilly 写完的书——《GraphRAG: The Definitive Guide》。现在已经出了早期版本——实际上完整的在线版已经上线，想在线读的可以直接读；印刷版十二月出版，想买纸质版的可以到时候买。它覆盖基础的 GraphRAG 技术，讲记忆，也讲如何为你的图构建本体。基本上是端到端地讲透这套东西该怎么做。",
      note: "deck 署名与 Michael Hunger、Jesus Barrasa 合著，300 页，2026 年 12 月印刷版。"
    },
    {
      start: "12:30:55", end: "12:31:20", slide: 38,
      label: "Graph Academy 免费课程与 context graphs",
      transcript: "Another great resource is Graph Academy. Graph Academy is free online training that you can take, and it has courses on building chatbots in Python and JavaScript. We have a new course on context graphs — so that's another great course to learn about how to build graphs which incorporate not only entities, but also reasoning and decision traces.",
      transcript_zh: "另一个很棒的资源是 Graph Academy。Graph Academy 是可以自由参加的免费在线培训，上面有用 Python 和 JavaScript 构建 chatbot 的课程。我们还有一门新的 context graphs 课程——也是一门很好的课，教你构建不只包含实体、还包含推理和决策轨迹的图。",
      note: "slide 口号 Give your crab a graph.；入口 dev.neo4j.com/ga。"
    },
    {
      start: "12:31:24", end: "12:31:45", slide: 39,
      label: "谢谢 + 预告 4:35 context graphs 第二场",
      transcript: "And thank you very much for coming to my talk. I have a second talk on context graphs at the end of the day — so if you want to hear more about context graphs, I'll go into more detail of those in the 4:35 talk. And happy to take any questions since we're about at time and I don't want to hold people up from lunch — just come up to the stage if you have any questions and I'll answer them one on one. So thank you very much.",
      transcript_zh: "非常感谢大家来听我的演讲。今天活动收尾前我还有第二场关于 context graphs 的演讲——想深入了解 context graphs 的朋友，4:35 那场我会讲得更细。时间也差不多了，不想耽误大家去吃午饭——有问题的话欢迎直接到台前来，我一对一回答。非常感谢！",
      note: "Wordly 把 4:35 转成 435；QA 移到台下一对一进行，按约定不收录。"
    }
  ]
};
