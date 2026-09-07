window.talk = {
  title: "Lost in Conversation: Why Voice Agents Break When Users Interrupt",
  speaker: "Irvin Cardoza",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/voice-agents.pdf",
  assets: "assets/voice-agents",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "11:10:29", end: "11:11:14", slide: 1,
      label: "标题页：自我介绍与开场“招供”",
      transcript: "Good morning, guys. My name is Irvin — I'm a 20-year-old student from Simon Fraser University in Vancouver, and a software engineer at Electronic Arts. What I'm going to be talking about today is mostly voice agents, but a very specific scenario: what happens when you interrupt them. I do have a confession to make, though. From the time I submitted these slides to now, there has been so much advancement in AI that — this topic, why voice agents break when users interrupt — voice agents actually don't break. So I tried to deviate more into how to recover when you interrupt a voice agent.",
      transcript_zh: "大家早上好。我叫 Irvin，是一名 20 岁的学生，来自温哥华的 Simon Fraser University，同时也是 Electronic Arts 的软件工程师。今天要讲的主要是语音 agent，但聚焦一个非常具体的场景：当你打断它们时会发生什么。不过我得先坦白一件事：从提交这些幻灯片到现在，AI 进步太快——这个题目，“语音 agent 为什么会在用户打断时崩掉”——语音 agent 其实已经不崩了。所以我更多转向讲：打断语音 agent 之后，如何恢复。",
      note: "正式开场约 11:10:29 才开始；此前近两分钟是调试麦克风的噪音（Jack / Hello），未收录。"
    },
    {
      start: "11:11:29", end: "11:11:47", slide: 2,
      label: "何为打断：意图在对话中不断变化",
      transcript: "So what I mean by interruption is, for example: let's say we have a voice agent that handles my travels, and I ask it to book me a flight to Shanghai tomorrow. As the voice agent is talking, I interrupt it constantly — oh, actually, can you do this? oh, actually, can I do that? — continuously giving it constraints. So the intent that the voice agent needs to understand keeps changing.",
      transcript_zh: "我说的“打断”是什么意思？举个例子：假设有一个帮我打理出行的语音 agent，我让它明天帮我订一张去上海的机票。在它说话的同时，我不停地打断——“哦，其实能不能这样？”“哦，能不能那样？”——不断给它加约束。于是语音 agent 需要理解的意图一直在变。",
      note: "幻灯片上放的是 Maya 改面试时间的对话示例，讲者口头换成了订机票的例子；该页以图示为主。"
    },
    {
      start: "11:11:56", end: "11:12:15", slide: 3,
      label: "Barge-in 已解决：停、听、再反应",
      transcript: "What is actually solved is something called barge-in. Most big companies — OpenAI, Gemini, LiveKit — all solve this. The current architecture for most voice agents is: the voice agent is speaking, I interrupt it, it stops talking, it understands what I said next, and then reacts on it.",
      transcript_zh: "真正被解决了的叫 barge-in（抢话处理）。大多数大公司——OpenAI、Gemini、LiveKit——都解决了这个问题。现在大多数语音 agent 的架构是：语音 agent 正在说话，我打断了它，它就停止说话，理解我接下来说了什么，然后据此做出反应。",
      note: "Wordly 把 LiveKit 转写成“Lifekit”，已按 deck 修正；11:11:56 的 barge-in 即本场已知锚点。"
    },
    {
      start: "11:12:25", end: "11:12:56", slide: 4,
      label: "停止说话容易，知道该停什么难",
      transcript: "But this wouldn't work in large-scale applications, especially in big companies, where a voice agent is handling multiple MCP calls. For example, let's say we have an AI receptionist at a company. I go to it and ask it to book a meeting with Sam in such-and-such meeting room at 12:00. As it's actually doing these operations, it needs to call multiple MCP tools: one to book the calendar, one for the room booking, one to send an email to Sam. But here's a problem.",
      transcript_zh: "但这在规模化应用上行不通，尤其是在大公司里，语音 agent 要同时处理多个 MCP 调用。比如公司里有一个 AI 前台接待，我走过去让它 12 点在某间会议室帮我约 Sam 开会。它实际执行这些操作时，需要调用多个 MCP 工具：一个订日历、一个订会议室、一个给 Sam 发邮件。但问题来了。",
      note: "页上把“该停什么”分成三层：Speech（平台级）/ State（共同责任）/ Action（应用各自处理），讲者用 AI 前台的例子口述。"
    },
    {
      start: "11:13:00", end: "11:13:55", slide: 5,
      label: "并发：打断时各工具处于不同阶段",
      transcript: "When I interrupt that agent now, this whole workflow gets interrupted, and we don't know — it might have already booked a calendar invite, it might have already sent an email, or it might be in the middle of doing something. We're interrupting many MCP workflows at the same time. That's where the problem is. What we need is something known as interruption recovery: see what's changed with the new intent, what is still valid, and what should happen next. It's very easy to stop a voice agent, but how it recovers when it's stopped and given new commands is more important, because current voice agents are built for a very linear conversation — and for large-scale applications handling multiple MCP tool calls, we need a recovery mechanism.",
      transcript_zh: "这时我打断这个 agent，整条工作流都被打断，而我们并不清楚状况：日历邀请可能已经发出，邮件可能已经发送，也可能正在执行中——我们是在同时打断多个 MCP 工作流，问题就出在这里。我们需要的是“打断恢复”（interruption recovery）：看清新意图改变了什么、哪些仍然有效、接下来应该做什么。让语音 agent 停下来很容易，但停下来、接到新指令之后如何恢复才更重要——现在的语音 agent 是为非常线性的对话构建的，要在规模化场景里处理多个 MCP 工具调用，就需要恢复机制。",
      note: "页上图示正对应此场景：SPEECH 已停止 / CALENDAR 已完成 / ROOM BOOKING 运行中 / EMAIL 未开始；段末关于线性对话的引申仍停留在本页。"
    },
    {
      start: "11:14:06", end: "11:14:29", slide: 6,
      label: "三个真相：意图、听到、已发生",
      transcript: "So with that, this is more of an architecture that I propose, and it can be built with any technical knowledge — you can customize the technical aspect; I'm just providing an architecture here. I call it the three truths. When interrupted, it needs to look at three things: one, the intent of the interruption; two, what exactly the human heard; and three, what has happened. I'll go into depth on all three.",
      transcript_zh: "接下来是我提出的一个架构，用任何技术知识都可以搭建——技术层面你可以自行定制，我在这里只是提供一个架构。我把它叫做“三个真相”（three truths）。被打断时，agent 需要看三件事：一是打断的意图；二是人类到底听到了什么；三是已经发生了什么。下面我逐一展开。",
      note: "Wordly 把 three truths 转写成“three routes”，已按 deck 修正。"
    },
    {
      start: "11:14:33", end: "11:15:04", slide: 7,
      label: "真相一·意图：附和不等于打断",
      transcript: "The first truth is intent, and intent goes two ways. One meaning: let's say a voice agent is talking to me and I'm just saying 'yeah' — those are not interruptions, they're more agreements, so they can't be classified as interruptions. Voice agents need to be able to differentiate my agreements from interruptions. And the second meaning intent could have is the literal one: what I want changed, and what I have told the voice agent.",
      transcript_zh: "第一个真相是意图（intent），它有两层含义。第一层：语音 agent 在对我说话时，我可能只是回应“嗯”——这不是打断，更像是附和，不能归为打断。语音 agent 要能把我的附和与真正的打断区分开。第二层是字面含义：我想改动什么、我对语音 agent 交代了什么。",
      note: "“yeah”类应答是本页关键例子：agreement 与 interruption 的区分。"
    },
    {
      start: "11:15:11", end: "11:16:31", slide: 8,
      label: "真相二·听到的：生成的多，播出的少",
      transcript: "The second truth, which is more interesting, is what did they hear. The statement is: the model may generate more than the user actually hears. Let's say I'm talking to a voice agent — the LLM is generating text in the back end, but the text-to-speech that's actually talking to me might have delivered only half of what the LLM generated before I interrupted it. It's like a conversation with someone who has a lot to tell you: once you interrupt, there's a lot in their head they never got to say, and you don't know about it. LLMs have that same kind of back end. Take this example: the model generated in the back end, 'I moved the interview to 4 p.m., booked a room and emailed Maya' — but I interrupted it right after '4 p.m.' So what I actually heard is only 'I moved it to 4 p.m.' The model needs to be aware that I haven't heard all of what it had to say before I interrupted it. This is where the human-agent collaboration concept comes into play.",
      transcript_zh: "第二个真相更有意思：对方到底听到了什么。核心命题是：模型生成的内容可能多于用户实际听到的内容。比如我在和语音 agent 对话，LLM 在后端不断生成文本，但真正对我说话的文本转语音（TTS）可能在我打断之前，只播出了 LLM 生成内容的一半。这就像和人聊天：对方有一大堆话要讲，你一打断，他脑子里还有很多没来得及说的话，而你并不知情。LLM 同样有这样一个“后端”。举个例子：模型在后端生成了“我把面试改到下午 4 点，订好了房间，也给 Maya 发了邮件”，而我在听到“下午 4 点”之后就立刻打断，那我实际听到的只有“我把……改到了下午 4 点”。模型必须意识到：在打断之前，我并没有听完它要说的全部。这正是人机协作（human-agent collaboration）概念发挥作用的地方。",
      note: "讲者先口误说 speech to text 随即自我更正为 text to speech，已清理；页上即 Maya 示例的“生成 vs 听到”对比。"
    },
    {
      start: "11:16:40", end: "11:17:20", slide: 9,
      label: "对账三步：停响应、记所闻、更新状态",
      transcript: "It might have generated a lot more text, but it hasn't actually told the human about it. It needs to have that set context: he hasn't heard the rest of what I was supposed to say, so I need to adjust my next prompt accordingly. And this is just a suggestion on how to handle the previous problem: stop the response immediately; track what the user actually heard, not everything the model generated; and update the conversation state, so that when it starts replying it doesn't assume that all of the LLM-generated context is the context for the next call.",
      transcript_zh: "它可能生成了多得多的文本，但并没有真正告诉用户。它需要持有这个既定上下文：“用户没听到我后半段要说的话，所以我要相应调整下一个提示词。”这只是处理上一个问题的一种建议：立即停止响应；追踪用户实际听到的内容，而不是模型生成的全部；并更新对话状态，这样它开始下一轮回复时，就不会默认把 LLM 生成的全部上下文当作下一轮调用的上下文。",
      note: "本页三条 bullet（停响应 / 追踪实际听到 / 更新对话状态）与字幕一一对应，讲者以“一个建议”的口吻引出。"
    },
    {
      start: "11:17:27", end: "11:18:02", slide: 10,
      label: "真相三·已发生：已订的会、已发的邮件",
      transcript: "The third truth, which is probably the most important one, is what has happened. Coming back to that AI receptionist example: let's say the receptionist has already booked a meeting for me, already booked a room, already emailed Sam. Once these things have already happened, it's hard to revert. So there needs to be a set state that's tracking all the actions the agent has already called, all these MCP tools. If an email is already sent, it needs to recover that; if it has already booked a meeting room, it needs to cancel the meeting room. That's what I mean by what has happened.",
      transcript_zh: "第三个真相可能最重要：已经发生了什么。回到 AI 前台的例子：假设前台已经帮我订好了会议、订好了会议室、给 Sam 发了邮件。这些事一旦发生，就很难撤销。所以需要有一个固定的状态，去追踪 agent 已经执行过的所有动作、调用过的所有这些 MCP 工具。邮件已经发出，就要补救；会议室已经订好，就要取消。这就是“已经发生了什么”的含义。",
      note: "本页 bullets（工具可能已在跑 / 停下对话≠外部动作停 / 已完成的需补偿）被讲者用前台案例整体覆盖。"
    },
    {
      start: "11:18:15", end: "11:18:30", slide: 11,
      label: "工具状态：响应取决于生命周期阶段",
      transcript: "Similar to the previous idea: if it's just executing a call, it needs to know whether it can cancel that call once interrupted, or once I tell it to cancel that meeting. And if it has already done an action — say it already booked a meeting room for me to meet Sam at 4 p.m. — it needs to revert, or call actions that actually change it, like canceling the meeting room and emailing Sam that the meeting is cancelled.",
      transcript_zh: "和前面的思路类似：如果它只是在执行某个调用，就要知道被打断之后（或我让它取消会议时）能否取消这个调用；如果动作已经完成——比如已经订好会议室让我 4 点和 Sam 见面——它就需要回退，或者调用真正能改变结果的动作，比如取消会议室、给 Sam 发邮件说会议取消了。",
      note: "页上图示把生命周期分为 PROPOSED（丢弃）/ EXECUTING（安全则取消）/ COMMITTED（补偿恢复），讲者口头只讲了后两档。"
    },
    {
      start: "11:18:36", end: "11:19:04", slide: 12,
      label: "取消 ≠ 回滚：副作用不会自动消失",
      transcript: "So cancellation is always not equal to rollback: stopping a task doesn't guarantee that its effects disappear. Similar to the receptionist — reserve a room. There are a lot of tasks that need these recovering MCP calls: if it's charging a card, we need to go for a refund; if it's reserving a room, we need to cancel the reservation. There's a lot of context that the agent needs.",
      transcript_zh: "所以取消永远不等于回滚：停止一个任务，并不保证它的实际影响随之消失。就像前台的例子——订房间。很多任务都需要这类“恢复性”的 MCP 调用：刷了卡就要走退款，订了房间就要取消预订。agent 需要的上下文其实非常多。",
      note: "页上第三例 send_email() 标注“无可靠撤销方式”，比口述更狠；页脚结论为 Cancellation stops execution. Recovery repairs state."
    },
    {
      start: "11:19:15", end: "11:19:35", slide: 13,
      label: "打断契约：继续、取消或补偿的依据",
      transcript: "So with those three truths, I present a new architecture called the interruption contract. This contract is basically where an agent needs to consider the three truths we spoke about, and based on that it needs to give a basis for whether to continue, cancel, or compensate for the response. Now, to go in depth into this...",
      transcript_zh: "基于讲过的这三个真相，我提出一个新架构，叫做“打断契约”（interruption contract）。这个契约要求 agent 把我们讲到的三个真相都考虑进来，并在此基础上给出依据，决定对这次响应是继续、取消还是补偿。下面来深入讲一讲……",
      note: "全场核心主张页；下一页的架构图随即把三个状态展开。"
    },
    {
      start: "11:19:40", end: "11:21:16", slide: 14,
      label: "架构走查：中断控制器查三个状态",
      transcript: "Let's say I'm the user and I interrupt the agent. The first thing it needs to check is intent: did I mean to interrupt, or was it just an agreement? Once it knows that, it needs to check the output state — what I actually heard, not just what the LLM generated, because these are very different things. Think of it like the human brain: if someone interrupts me, I have a lot of things planned to say that I haven't said yet, so they don't know what I was going to say; similarly, an LLM is generating that amount of text. The way voice agents are designed right now: speech-to-text, tokenization, LLM generation, and once the LLM has generated, it uses text-to-speech to speak it back — but all this happens in real time, so these things are happening at four different times, and an interruption interrupts that whole workflow. If the LLM has generated a lot more text and the text-to-speech has only said half of it, the LLM might think the whole generated context is part of the next context — but it needs a tracker saying: the human has only heard this much before interrupting me, they haven't heard anything after that. That's the difference, and that's something most voice agents right now, from testing, aren't able to do. Because if it's already done some action, there's no recovering from it.",
      transcript_zh: "假设我就是用户，我打断了 agent。它首先要检查的是意图：我是真想打断，还是只是附和？确认之后，它要检查输出状态——我实际听到了什么，而不只是 LLM 生成了什么，因为这两者是完全不同的。可以把它想象成人脑：有人打断我时，我脑子里已经准备好很多话还没说出口，对方并不知道我要说什么；同理，LLM 也在生成着那个量级的文本。现在语音 agent 的设计是：语音转文本、tokenization、LLM 生成，LLM 生成完再由文本转语音说出来——而这一切都实时发生，四件事处在四个不同的时间点上，打断会中断这整条工作流。如果 LLM 已生成大量文本而 TTS 只说了一半，LLM 可能以为整段生成上下文都属于下一轮上下文；但必须有一个追踪器标明“用户在打断前只听到了这里，之后的都没听到”。这个差异，据我测试，目前大多数语音 agent 都做不到。因为一旦动作已经执行，就无从恢复。",
      note: "该页以图示为主：USER INTERRUPTS → INTERRUPTION CONTROLLER（INTENT / OUTPUT / ACTION STATE）→ RECOVERY POLICY（CONTINUE / CANCEL / COMPENSATE）；Wordly 转写中的“OCI agent”疑为“AI agent”，已按上下文清理。"
    },
    {
      start: "11:21:32", end: "11:22:21", slide: 14,
      label: "现状：为线性对话而生，缺打断机制",
      transcript: "There's been a lot of improvements, but it's not at a state where it can go large scale. If we're building an AI receptionist, it's a normal human tendency to interrupt — and even if you're having an argument with a voice AI agent, there are no tests or mechanisms that are built to handle these problems. Current voice AI agents are built for a very linear conversation: I speak first, then the agent speaks, then I speak. But when it has more things to do — call a lot of MCP calls, a lot of actions — that's when the problem of interruption comes. Let's say the AI receptionist is handling ten tasks simultaneously: when we interrupt, we're interrupting those ten tasks at the same time.",
      transcript_zh: "已经有很大进步，但还没到能规模化的程度。如果我们要做一个 AI 前台，打断本就是人类的正常习惯——就算你和语音 AI 争起来，也没有任何为这些问题而建的测试或机制。现在的语音 AI agent 是为非常线性的对话构建的：我先说，agent 再说，然后我再说。可一旦它要做更多事——调用大量 MCP、执行大量动作——打断问题就来了。假设 AI 前台同时处理十个任务，我们一打断，就是同时打断这十个任务。",
      note: "这段是讲完架构图后的现状评述，推断仍停留在架构页上（未翻页）。"
    },
    {
      start: "11:22:32", end: "11:22:42", slide: 15,
      label: "要点：停是 UX，恢复是系统属性",
      transcript: "So the takeaway is that stopping speech — the very linear aspect of it — is very easy, and recovering from the interruptions is what actually matters more. Reliable agents don't just stop; they recover coherently.",
      transcript_zh: "要点是：让语音停下——其中非常线性的那部分——非常容易，而从打断中恢复才是真正更重要的。可靠的 agent 不只是会停下，而是能连贯地恢复。",
      note: "与 slide 文字逐句对应：Stopping speech is a UX behavior. Recovering from interruption is a systems property."
    },
    {
      start: "11:22:53", end: "11:23:14", slide: 16,
      label: "过渡页：线性对话与规模化落差",
      transcript: "So the main takeaway is that the current voice AI agents, in my opinion, are very developed for linear type conversations. And as we expand more into voice agents — some of the voice agents right now are amazing — when we try to bring this to large-scale companies, like having a full receptionist run by AI, or having it do multiple tasks at the same time, that's when the problems of interruptions come.",
      transcript_zh: "所以我的主要结论是：现在的语音 AI agent 是为线性对话高度优化的。随着我们向语音 agent 更深入拓展——现在有些语音 agent 已经非常惊艳——但要把它带到大公司做规模化落地，比如让 AI 全职担任前台接待，或者让它同时处理多项任务，打断问题就会随之出现。",
      note: "该页为无正文的大会过渡页（以图示为主），现场未单独讲解；字幕取 takeaway 之后的收尾复述前半段。"
    },
    {
      start: "11:23:27", end: "11:23:37", slide: 17,
      label: "动作状态三分支（现场未逐页讲解）",
      transcript: "Imagine we're asking an AI receptionist to do this: book a meeting, send an email, and collect a package, or do some admin work. But when we keep interrupting, there's a lot of these MCP tool calls that are actually taking place, and we're interrupting this whole flow. So that's what a problem is.",
      transcript_zh: "想象我们让一个 AI 前台做事：订个会、发封邮件、取个包裹，或者做点行政工作。而我们不停打断时，背后正发生着大量 MCP 工具调用，我们打断的是这整个流程。问题就在这里。",
      note: "该页图示（NOT STARTED→阻止 / RUNNING→尽量取消 / COMPLETED→保留或补偿）现场未逐页讲解；字幕取收尾复述中“多工具调用被整条打断”的相邻句，与图示主题相合。"
    },
    {
      start: "11:23:39", end: "11:23:42", slide: 18,
      label: "模板占位页（现场未展示）",
      transcript: "While we take this to scale.",
      transcript_zh: "在我们把它推向规模化的时候。",
      note: "此页是未编辑的模板占位页（Click to edit…），疑为导出 PDF 时误留，现场未讲解；字幕取紧邻的收束句。"
    },
    {
      start: "11:23:43", end: "11:23:52", slide: 19,
      label: "结束页：致谢与问答邀请",
      transcript: "Thank you — and that was my presentation. I do have time for questions if anyone has any.",
      transcript_zh: "谢谢大家，我的演讲就是这些。如果有人有问题，我还有时间回答。",
      note: "结束页为大会品牌页（AGNTCon + MCPCon China）；随后的 QA（LiveKit 填充词过滤、韵律 prosody 检测等）按约定未收录。"
    }
  ]
};
