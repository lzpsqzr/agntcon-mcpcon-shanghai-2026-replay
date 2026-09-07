// 场次：a2a-fleet（AGNTCON + MCPCON China 2026 · Day 2 · Hall 2 · Google Cloud）
// 源字幕 USAR-0989-transcript.txt 为 Wordly 英文转写（讲者原声中文），transcript 为清理版英文原话，transcript_zh 为中译。
// 正式开场 12:12:41，致谢收尾 12:39:25；12:12:00-12:12:27 的调麦噪音与场外 QA 均不收录。
// 讲者翻页快于 deck：议程页（2/3/13）一句带过，技术栈总览页（17）未逐层讲解；
// 12:27:16 讲者翻回第 11 页架构图口头重画后进入元件页；12:28:02-12:28:23 约 20 秒为现场切屏演示（真实 Agent Card JSON），幻灯片停留第 14 页。
window.talk = {
  title: "从单兵到军团：基于 A2A 协议构建高可扩展的多智能体分布式系统",
  speaker: "Sylph Lin · AI Evangelist, Google Cloud",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/a2a-fleet.pdf",
  assets: "assets/a2a-fleet",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "12:12:41", end: "12:12:56", slide: 1,
      label: "标题页：从单兵到军团",
      transcript: "Okay, everyone — hello, industry leaders. Today I'd like to introduce how to use the A2A protocol to transform your agent from a single soldier into a formation for corps-wide operations.",
      transcript_zh: "好，各位大家好，业界的伙伴们。今天我想为大家介绍，如何用 A2A 协议把你的 agent 从单兵作战，改造成军团级协同作战的编制。",
      note: "开场白；Wordly 把讲者自我介绍转写成乱码“I'm Google Cloud Self”（实为 Sylph，Google Cloud），transcript 已略去。"
    },
    {
      start: "12:13:18", end: "12:13:22", slide: 2,
      label: "议程：WHY 与 HOW 两件事",
      transcript: "Today we'll mainly talk about two things — I noticed the screen has a slight color cast, please don't mind it. One is why we need to use the A2A protocol, and the other is how we actually start using it.",
      transcript_zh: "今天主要讲两件事——我注意到屏幕有点偏色，大家不要太在意。一是我们为什么需要用 A2A 协议，二是实际怎么开始用它。",
      note: "无高亮的议程总览页，现场一带而过。"
    },
    {
      start: "12:13:22", end: "12:13:35", slide: 3,
      label: "议程高亮 WHY（过渡页）",
      transcript: "Okay, let's look at the first part first.",
      transcript_zh: "好，我们先来看第一部分。",
      note: "WHY 高亮的议程页仅此一句过渡，其后十余秒为翻页间隙，end 取下一 cue 起点之前。"
    },
    {
      start: "12:13:35", end: "12:13:47", slide: 4,
      label: "Gartner：2028 年 33% 企业软体",
      transcript: "This is a report from Gartner. We can see that by 2028, 33 percent of enterprise software will have started to incorporate intelligent agents, and 15 percent of everyday work will gradually be handled by intelligent systems — so this is a major trend across the industry, and the importance of intelligent systems keeps increasing.",
      transcript_zh: "这是 Gartner 的报告。可以看到到 2028 年，33% 的企业软体会开始引入智能体，15% 的日常工作会逐渐交给智能系统处理——这是整个行业的大趋势，智能系统的重要性会越来越高。",
      note: "锚点页：Gartner 预测（2024 年不足 1% → 2028 年 33%）由讲者口述带出，“Garner”已修正为 Gartner。"
    },
    {
      start: "12:14:07", end: "12:14:34", slide: 5,
      label: "Google Cloud 调研：52% 已上生产",
      transcript: "This is Google's own report — if you're interested, there's a QR code beside it for downloading. Among enterprises already using generative AI, 52 percent of executives say they have already put AI agents into production environments. The corners at the bottom show the common applications: everyone is familiar with customer service, where intelligent agents are already very common, and applications in marketing, security, technical support, product innovation and so on are flourishing.",
      transcript_zh: "这是 Google 自己的报告，有兴趣可以扫旁边的二维码下载。在已使用生成式 AI 的企业中，52% 的高阶主管表示已经把 AI agent 实际导入生产环境。下面两角是这些技术的常见应用：客户服务大家都熟悉，智能体已经非常普遍；行销、安全、技术支持、产品创新等方向的应用也在百花齐放。",
      note: "deck 注明出处 Google Cloud《The ROI of AI, 2025》；Wordly 把“已使用生成式 AI 的企业”误转为 seven pages，已按 deck 修正。"
    },
    {
      start: "12:14:34", end: "12:14:59", slide: 6,
      label: "智能体时代：个人上限被抬高",
      transcript: "So we say that in the current era of intelligent agents, individual capabilities have been greatly enhanced. We used to say one person's ability is limited, so we need a team — and of course it is. Even if you work 996 to the point of exhaustion, how much time do you actually get in a week? Besides, you can't know everything: even a jack-of-all-trades might know front-end, back-end and databases — but what about law? Finance? User experience? You can't possibly know it all.",
      transcript_zh: "所以我们说，在如今这个智能体时代，个人能力的上限被大幅提高了。以前常说一个人能力有限、需要团队——当然确实有限：就算 996 干到累垮，一周又能挤出多少时间？何况你不可能什么都懂：就算你是全才，懂前端、后端、数据库，那法律呢？财务呢？用户体验呢？不可能全部都懂。",
      note: "996 的自嘲为讲者现场即兴展开。"
    },
    {
      start: "12:15:07", end: "12:15:50", slide: 7,
      label: "团队的变化：传统分工 vs 人机协同",
      transcript: "But in the era of agents, this has gradually been broken down, and we've seen some different structures. A traditional team is probably like this: five or ten people — we talk about a squad, a scrum, a team — everyone forms a small team, each person is good at many things, and we all work together to get things done. The picture on the right is actually not just about the future team anymore: within our own organization, we sometimes see this kind of diagram when reporting new team plans — the good thing is the headcount hasn't increased, but we've added a lot of agents.",
      transcript_zh: "但在智能体时代，这个上限逐渐被打破，我们看到了一些不一样的组织形态。传统团队大概是这样：五个人、十个人，讲一个 squad、一个 scrum、一个团队，每人会很多东西，大家一起协作把事情做完。右边这张图其实已经不只是“未来的团队”了：在我们自己的组织里，汇报新团队规划时有时就会看到这种图——好处是 headcount 没有增加，但加进了大量的 agent。",
      note: "“black com”为 headcount 的转写误，已修正；右图对应“人类与多智能体协同”的未来团队。"
    },
    {
      start: "12:15:50", end: "12:16:26", slide: 7,
      label: "少量人类 + 一群 agent 的编队",
      transcript: "So in the future we'll see teams consisting of a relatively small number of humans working alongside a large group of agents to get the work done. In the past, five or ten people might form one or two small teams; in the future, those five or ten people might produce more — five or six teams, seven or eight teams. This model is a very, very different change. I believe we're already seeing this trend in some organizations, and it's very similar to the trend found in BCG's investigation.",
      transcript_zh: "所以未来我们会看到：由相对少量的人类，带着一大群 agent 协同把工作完成。过去可能是五到十个人组成一两个小团队；未来同样五到十个人，可能产出五六个、七八个团队。这个模式是非常非常大的变化。我相信在一些组织里已经看到这个趋势，而且和 BCG 调查发现的趋势非常一致。",
      note: "Wordly 转写为 VCG，按发音修正为 BCG（讲者口头引用的咨询调查）。"
    },
    {
      start: "12:16:33", end: "12:17:40", slide: 8,
      label: "三种架构：单兵 / 中央集权 / 分散自治",
      transcript: "Okay, with this trend, the following has emerged: we saw three different structures. On the left is the single intelligent agent system, which is already very mature — many organizations even have processes that use it to complete their work. The one in the middle is called the collaborative intelligent agent system: it can automatically schedule multiple sub-agents to complete tasks. You might be familiar with this if you're using systems like Google's, or competitors' Claude Code or Codex — they already have this capability: they start up sub-agents, assign tasks, let those sub-agents complete them and report back, and finally summarize the whole work to produce the results we need. Going further to the right is the so-called A2A multi-agent system.",
      transcript_zh: "好，顺着这个趋势，就出现了下面这些形态：我们看到了三种不同的架构。左边是单一智能体系统，已经非常成熟，很多组织甚至有流程在用它完成工作。中间这种叫协同（子）智能体系统：它可以自动调度多个子智能体来完成任务。如果你在用 Google 的、或竞品的 Claude Code、Codex 这类系统，可能已经很熟悉——它们已经具备这个能力：启动子智能体、派任务、让子智能体完成后回报，最后汇总整个工作，产出我们需要的结果。再往右，就是所谓的 A2A 多智能体系统。",
      note: "“Cloud Code”为 Claude Code 的转写误，已修正；deck 页脚注明中间架构即“中央集权”、右侧为“分散自治”。"
    },
    {
      start: "12:17:53", end: "12:18:20", slide: 8,
      label: "没有绝对优劣，看场景迁移",
      transcript: "There's no absolute advantage or disadvantage among these three; it depends on your usage scenario. Often, the single intelligent agent system on the left can achieve excellent results, so there's no need to move to the right. But when you encounter some potential limitations, you must consider whether the current architecture is insufficient for your specific problems, and whether you should move it to the right. So here we've listed two areas: the problems a single intelligent agent system might encounter — under what circumstances you should move toward a multi-agent system; and under what circumstances centralized control of a multi-agent system is insufficient — when you should consider moving toward an A2A architecture.",
      transcript_zh: "这三者没有绝对的优劣，取决于使用场景。很多时候左边的单一智能体系统就能取得非常好的效果，不需要往右走。但当你遇到一些潜在的限制时，就要考虑现在的架构是不是不足以解决你的具体问题、要不要往右迁移。所以这里列了两个方向：单一智能体系统可能遇到的问题——什么情况下应该往多智能体系统走；以及多智能体系统的中央集权不足——什么情况下应该考虑往 A2A 架构走。",
      note: "对应 deck 两组“迁移要件”，为第 9、10 页做引子。"
    },
    {
      start: "12:18:36", end: "12:19:30", slide: 9,
      label: "单兵问题一：工具选择过载",
      transcript: "Let's open them up separately. What problems might we encounter with a single intelligent agent system? Several important aspects are mentioned here. The first is tool overload, which everyone is certainly familiar with: when playing with AI, you see a lot of great skills online — hey, this one is pretty good, let's install it; this one too, let's install it — and then you find you've installed four front-end skills and three skills that can upgrade slides. When using it, things become chaotic: it might call the wrong thing, make overlapping calls, or fail to produce the expected results. When there are many tools and they're very similar, it becomes difficult to choose — the agent can't determine which one is correct. In that case, split it into multiple different intelligent agents, each responsible for different things, and it would be better to give each different tools.",
      transcript_zh: "我们分别展开看。单一智能体系统会遇到什么问题？这里提到几个重要的方面。第一个是工具过载，大家肯定很熟悉：玩 AI 的时候，今天在网上看到一堆很棒的技能——诶这个不错，装上；这个也不错，装上——结果发现自己装了四个前端的 skill、三个能升级幻灯片的 skill。用的时候就乱了：可能调错东西、重复调用，或做不出预期结果。工具一多又很相似，选择就很困难，agent 判断不了哪个才对。这种情况就拆成多个不同的智能体、各管一摊，给它们不同的工具会更好。",
      note: "“装了四个前端 skill、三个改幻灯片的 skill”为讲者原话举例。"
    },
    {
      start: "12:19:50", end: "12:20:06", slide: 9,
      label: "单兵问题二：对话语境污染",
      transcript: "The second part is the so-called context pollution. When a single intelligent agent is doing something, there are many dialogue windows inside it; after running for a while, you need to compress the dialogue and do some additional processing. But if it plays multiple different roles, things become more difficult and the pollution gets more serious. If that's the case, you can also consider moving toward multi-agent systems — to do memory isolation.",
      transcript_zh: "第二部分是所谓的语境污染。单一智能体做事时，里面有大量的对话窗口；跑一阵子之后要压缩对话、做一些额外处理。但如果它同时扮演多个不同角色，事情就会更难、污染也更严重。这种情况也可以考虑往多智能体系统走——做记忆隔离。",
      note: "结束句对应 deck“解决记忆隔离”。"
    },
    {
      start: "12:20:29", end: "12:20:52", slide: 9,
      label: "单兵问题三：工作流程失控",
      transcript: "The third issue is workflow loss of control. When a single agent is operating, we let it figure out how to solve problems on its own — you can use Antigravity or other similar architectures and still have this problem. Sometimes you find that after doing a certain amount of work, because of ReAct, it goes astray and starts looking for something else; you think it's going the wrong direction, so it keeps trying and trying. In the end you burn through a bunch of tokens and still get no answer. These three are very typical problems of a single intelligent agent, so by shifting to a collaborative sub-agent system, we can effectively solve division of responsibilities, memory isolation, and deterministic control.",
      transcript_zh: "第三个问题是工作流程失控。单个 agent 运行时，我们让它自己想办法解决问题——你用 Antigravity 或其他类似架构都还是会有这个问题。有时会发现它做了一段时间后，因为 ReAct 走偏了、去找别的东西；你觉得方向不对，它就一直试啊试，最后烧掉一堆 token，还是得不到答案。这三点是单一智能体非常典型的问题，所以转向协同子智能体系统，可以有效解决职责分工、记忆隔离和确定性控制。",
      note: "收束句正好对应 deck 页脚三个“解决”关键词。"
    },
    {
      start: "12:21:07", end: "12:21:46", slide: 10,
      label: "中央集权问题一：信任边界失效",
      transcript: "But collaborative intelligent agents are not without their limitations. A collaborative intelligent agent is somewhat like a centralized system, where you have an omniscient and omnipotent central manager coordinating these sub-agents. What problems might it encounter? The first and most typical one is trust boundaries. Often, these intelligent agents may belong to different apps, different organizations, and different departments; they can't all be bundled together and operated together — they must be developed independently, so there's the so-called cross-domain communication problem. And this boundary isn't just a department; it could also be an app or a company.",
      transcript_zh: "不过协同智能体也不是没有局限。它有点像中央集权系统：有一个全知全能的中央管理者来协调这些子智能体。它会遇到什么问题？第一个、也是最典型的，是信任边界。这些智能体往往分属不同的 app、不同的组织、不同的部门，没办法全部绑在一起运作，必须独立开发，于是就有所谓的跨域通讯问题。而且这个边界不只是一个部门，也可能是一个 app 或一家公司。",
      note: "“boundary”一词被 Wordly 误转为 desire，已按语义修正。"
    },
    {
      start: "12:21:57", end: "12:22:19", slide: 10,
      label: "中央集权问题二：共享状态越权",
      transcript: "The first and second ones are actually quite similar. With the second, we often won't share this information with others — not with other departments, other apps, or other companies; we'll only reveal the portion they need to know so things can move forward. But if you want to build a centralized, collaborative intelligent agent, then all of this has to be transparent, which is not feasible in many business practices.",
      transcript_zh: "第一和第二个其实很像。第二个我们会遇到的情况是：这些信息往往不会给别人——不给其他部门、其他 app、其他公司，只透露对方需要知道的那部分，让事情推进得下去。但如果要做中央集权的协同智能体，这些就必须全部透明，而在很多商业实务上这是做不到的。",
      note: "对应 deck“共享状态越权 / 解决资料隐私”。"
    },
    {
      start: "12:22:34", end: "12:23:15", slide: 10,
      label: "中央集权问题三：自主博弈缺失",
      transcript: "The third issue is the lack of autonomous game-playing. When a centralized intelligent agent is scheduling all tasks, it inevitably results in these sub-agents not having their own autonomy. The idea of independent operation is good, but centralized sub-agents won't refuse your work — you assign it, and they carry it out. With A2A it's not strictly so: if an agent thinks this job isn't suitable for it, it can refuse. With independent A2A agents, each has its own optimal solution, so each strives for its best outcome — for example, during bidding or resource acquisition, independent agents operating independently have some advantages over a centralized system.",
      transcript_zh: "第三个问题是自主博弈的缺失。中央智能体调度所有任务时，子智能体就不可避免地没有自己的自主性。独立运作的理念是好的，但中央集权下的子智能体不会拒绝你的工作——你派了它就做。A2A 不是这样：如果它觉得这个活不适合自己，可以拒绝。独立的 A2A agent 各自有自己的最优解，会为自己的最佳结果去争取——比如在竞价或抢资源的场景里，独立运作的 agent 相比中央集权系统是有优势的。",
      note: "“自主博弈”取 deck 关键词，指博弈论意义上的对等谈判与自主拒绝。"
    },
    {
      start: "12:23:21", end: "12:24:37", slide: 10,
      label: "全局最优还是更大范围的局部最优",
      transcript: "Of course, some people might question: 'Hey, what if I had an omniscient, omnipotent authority today that can see everything — wouldn't it get the optimal solution across the entire domain, while independent intelligent agents only get a locally optimal solution?' In some cases, yes. But think about it carefully: is the so-called global optimal solution really globally optimal? Many times it isn't — the so-called global optimum is just a local optimum on a larger scale. Does the optimum for the whole company still apply at the national level? At the global level? Or at a level beyond the human species? It might not. So 'global optimum' is sometimes a very vague term — there's actually no such thing as a truly global one; what we call global is often just something relatively large, a local optimum within that scope. Therefore, by dividing things into different A2A agents, you can achieve game theory among them, with each agent striving to maximize the interests it represents — which is harder to achieve in a centrally controlled intelligent agent system.",
      transcript_zh: "当然有人可能会质疑：“如果今天有一个全知全能、什么都能看的中央权威，是不是就能拿到全域最优解，而独立智能体只能拿到局部最优？”某些情况下是的。但仔细想想：所谓的全局最优解真的是全局最优吗？很多时候不是——所谓全局最优，只是更大尺度上的局部最优。对全公司最优的，放到国家层面还成立吗？全球层面呢？超越人类物种的层面呢？可能就不成立了。所以“全局最优”有时是很模糊的词——其实不存在真正的全局，我们说的全局往往只是相对大一点的范围，是那个范围内的局部最优。因此，拆成不同的 A2A agent，反而能在它们之间形成博弈，各自为自己代表的一方争取利益最大化——这在中央集权的智能体系统里反而更难做到。",
      note: "全局 vs 局部最优的辩证为现场即兴展开，deck 无对应文字，讲解停留在第 10 页。"
    },
    {
      start: "12:24:55", end: "12:26:08", slide: 11,
      label: "A2A 协议：Google 开源与冰箱便签",
      transcript: "So, this A2A protocol — as you might know, it was developed by Google and then contributed to the open-source community, which really aligns with Google's culture and ecosystem, because Google often operates in a similar way. The concept of A2A is very simple: to put it simply, when an organization has enough intelligent agents — or enough smart people — it will naturally find a way to solve the problem. That might be a belief behind A2A, and to some extent a culture behind Google. You might have seen a good example in an older book: an engineer put a note on the refrigerator — about a search problem, I think — and then some engineers saw it, took it, and solved the problem. Many times we don't know the actual process, the correct order, or who can solve the problem, but as long as there are enough smart people in the organization, they will naturally find a way. That's the concept behind A2A: as there are more and more capable agents in the organization, I don't need to predefine all the processes and methods — they will naturally find the problems and handle them.",
      transcript_zh: "再来谈 A2A 协议。大家可能知道，它由 Google 开发，后来贡献给了开源社群——这其实非常符合 Google 的文化与生态，因为 Google 内部常常就是这样运作的。A2A 的概念很简单：某种程度上，当一个组织里有足够多的智能体、或足够多的聪明人，它自然能找到解决问题的办法。这或许是 A2A 背后的一种信念，某种程度上也是 Google 背后的文化。你们可能在一些老书里看过一个好例子：有位工程师在冰箱上贴了张便签——我记得是关于某个搜索问题的——后来几位工程师看到、认领，就把问题解决了。很多时候我们并不知道实际的流程、正确的顺序、谁能解决这个问题；但只要组织里有足够多的聪明人，他们自然会有办法。这就是 A2A 背后的概念：当组织里的 agent 越来越多、能力足够时，我不需要预先定义各种流程和方法，它们自然会找到问题并处理掉。",
      note: "冰箱便签故事出自讲者提到的一本旧书（Wordly 转写含“Search Berlin”一类乱码，细节不可辨，未据以补写）；本页左列 HTTP/SSE/JSON-RPC 等基础标准要点现场未逐条念。"
    },
    {
      start: "12:26:25", end: "12:27:04", slide: 12,
      label: "A2A 与 MCP：互补而非竞争",
      transcript: "These two — A2A and MCP — don't actually conflict; some people think they're mutually exclusive, but that's not entirely true. The two deal with different issues. MCP handles how an agent communicates with the underlying data — the underlying database, or another system like Salesforce; you communicate with those systems through MCP. A2A handles the communication between two agents: the things agents do, like exchanging data, assigning tasks, and sharing memories. So the two processes are not mutually exclusive — they're complementary, and we hope both can appear in the system to make things better.",
      transcript_zh: "A2A 和 MCP 这两者其实并不冲突；有些人觉得它们互斥，其实不完全是。两者处理的是不同的问题：MCP 处理 agent 怎么跟底层资料沟通——底层数据库，或 Salesforce 之类的另一套系统，你通过 MCP 和这些系统沟通。A2A 处理的是两个 agent 之间的沟通——agent 之间交换数据、派任务、共享记忆这类事情。所以两者并不互斥，而是互补的；我们希望系统里两者都出现，把事情做得更好。",
      note: "Wordly 把 MCP 错误展开为 Multi-Channel Programming / Multi-Agent Processing，已按 deck 修正为 Model Context Protocol；右侧 ADK+A2A+MCP 分层图未逐层展开。"
    },
    {
      start: "12:27:08", end: "12:27:10", slide: 13,
      label: "议程高亮 HOW：进入实操",
      transcript: "Okay, that concludes this part of the explanation. So how do we begin?",
      transcript_zh: "好，架构的讲解就到这里。那要怎么开始用呢？",
      note: "HOW 高亮的议程过渡页，仅一句带过，随即翻回第 11 页的架构图。"
    },
    {
      start: "12:27:16", end: "12:27:55", slide: 11,
      label: "回看架构图：发现可用的 agent",
      transcript: "It's essentially the A2A protocol. Conceptually, it's structured like this: we have a user, and a client — like your laptop, or your server — and I interact with the other agents in the organization through one of my client agents. Here's the question: how do I find those agents? For that we have what's called an agent registry — you have to register somewhere, so the client agent knows, oh, I actually have this many available agents to use. Only then can we communicate with these intelligent agents through various discovery mechanisms.",
      transcript_zh: "它本质上就是 A2A 协议。概念上的结构是这样：我们有一个 user，可能有一个 client——比如你的笔记本电脑或服务器——我再通过我的一个 client agent，去和组织里其他的 agent 互动。这里有个问题：我怎么找到那些 agent？这就有了所谓的 agent registry（注册表）：你必须先在某处注册，client agent 才知道原来我有这么多可用的 agent。之后才能通过各种发现机制与这些智能体沟通。",
      note: "讲者在 HOW 开头翻回第 11 页的 How it works 架构图（End-User / Client / Client Agent / Remote Agent Mesh）口头重画；registry 为口头补充，slide 图上未标注。"
    },
    {
      start: "12:28:02", end: "12:28:08", slide: 14,
      label: "基础元件引入（现场切屏演示）",
      transcript: "So, the basic components of A2A are probably these.",
      transcript_zh: "那么，A2A 的基础元件大概就是这些。",
      note: "此处约 20 秒字幕只剩碎片（Oh / two / The），为讲者现场切屏演示——打开真实的 /.well-known/agent.json（Agent Card JSON）；演示期间幻灯片停留本页（14），随后回到讲解。"
    },
    {
      start: "12:28:23", end: "12:28:45", slide: 14,
      label: "Agent Card：agent 的公开说明书",
      transcript: "The Agent Card is usually placed here — it's in JSON format, at the well-known agent.json. Simply put, it informs others: what can I do with my agent credentials? What capabilities do I possess? When you communicate with me, what input should you send, and what output will I return? That's how I let others know how to communicate with me and what I can do — it's like a simple user manual for an agent.",
      transcript_zh: "Agent Card 通常就放在这里——JSON 格式，放在 /.well-known/agent.json。简单说，它用来告诉别人：我这个 agent 的凭据能做什么？我具备哪些能力？跟我沟通时该送什么输入、我会回什么输出？用这种方式让别人知道该怎么跟我沟通、我能做什么——它就像 agent 的一份简单使用说明书。",
      note: "“agent car / agent Jason / Asian”等均为 Agent Card、agent.json 的转写误，已修正；切屏演示正发生在本页讲解之前。"
    },
    {
      start: "12:29:07", end: "12:29:17", slide: 14,
      label: "运行期元件：Task 与 Message",
      transcript: "In the middle section, during runtime, there are two things: a task and a message. The task is easy to understand — it's responsible for managing the overall workflow, including the state machine and lifecycle management. The message is the framework used to exchange information during the collaborative work process.",
      transcript_zh: "中间运行期的部分有两样东西：Task 和 Message。Task 很好理解，负责管理整体的工作流，包括状态机和生命周期管理；Message 则是协同工作过程中用来交换信息的框架。",
      note: "对应 deck“管理状态机与非同步生命周期 / 协同过程中的语义交流”。"
    },
    {
      start: "12:29:22", end: "12:30:09", slide: 14,
      label: "Artifacts 与 Part：交付与承载",
      transcript: "What happens after the output is complete? You'll have an artifact. Simply put, an artifact is the output after completing a task — it could be a report, source code, structured data, an audio file, or a markdown. And the part is actually a relatively small unit, but it carries all this text, JSON, files and so on — we wrap them in parts. Parts can appear in messages and can appear in artifacts: you package the encapsulated source code, files, text and so on into parts. So the A2A architecture is not complicated — with just these few simple things, you can build a complete agent-to-agent system.",
      transcript_zh: "输出完成之后会得到什么？会有一个 artifact。简单说，artifact 就是任务完成后的产出，可能是一份报告、源代码、结构化数据、音频文件或 markdown。而 part 其实是一个相对小的单元，但所有这些文本、JSON、文件都由它承载——我们会把它们包成 part。part 既可以出现在 message 里，也可以出现在 artifact 里；把这些源代码、文件、文本封装成 part 就可以了。所以 A2A 的架构并不复杂，就这几个简单的东西，就能搭出一个完整的 agent-to-agent 系统。",
      note: "artifact 举例按 deck 修正（Wordly 转写为 city code / water depth indicator / mark dunk 等乱码）。"
    },
    {
      start: "12:30:23", end: "12:31:05", slide: 15,
      label: "运作流程 1-2：发现握手、任务实例化",
      transcript: "The logic of the whole operation is very simple — it consists of four steps. The first step is the discovery and handshake we just talked about: the client uses the Agent Card to find certain agents, and the Agent Card tells it what it can do and how to interact with it. If I confirm this agent can do the job for me, then I complete the handshake and move to the second stage: my client side — the client agent you just saw — generates a task and delivers it to a certain agent, so that agent can carry it out.",
      transcript_zh: "整个运作的逻辑很简单，就四步。第一步就是刚才讲的发现与握手：client 通过 Agent Card 找到某些 agent，Agent Card 告诉它这个 agent 能做什么、要怎么互动。如果我确认这个 agent 能替我做这件事，就完成握手，进入第二阶段：我的客户端——也就是刚才看到的 client agent——生成一个 Task，把任务交给某个 agent 去执行。",
      note: "对应 deck 步骤 01 Discovery & Negotiation 与 02 Task Instantiation。"
    },
    {
      start: "12:31:05", end: "12:31:39", slide: 15,
      label: "运作流程 3-4：非同步执行与交付",
      transcript: "The third step is asynchronous execution — A2A work may not finish quickly, so it may be dropped and the remote agent executes it for a period of time. During execution, it can send data back to the waiting client through webhooks or SSE, so the client knows the current progress — like when your boss assigns you a task and you periodically report your progress to your boss. Moving further to the right of the flow, after the whole process completes, the agent sends the artifact back to the client to complete the task.",
      transcript_zh: "第三步是非同步执行——A2A 的工作不一定很快完成，可能先放著，让远程 agent 执行一段时间。执行过程中，它可以通过 webhook 或 SSE 把数据回传给等待中的 client，让 client 知道当前进度——就像老板交办任务后，你会定期向他汇报进度那样。流程再往右，整个过程完成后，agent 会把 artifact 送回给 client，任务就此结案。",
      note: "对应 deck 步骤 03 Execution & Event Streaming 与 04 Resolution & Delivery。"
    },
    {
      start: "12:31:56", end: "12:32:10", slide: 15,
      label: "链式委托：agent 也能变成新 client",
      transcript: "Of course, there's also the possibility of triggering the next A2A round during this process — remember what we talked about earlier, that there might be a mesh of agents? If one agent receives a task today, that agent might become a new client and look for another agent to assist in handling it. It may keep going back and forth, and the process isn't necessarily over in one go.",
      transcript_zh: "当然，过程中还可能触发下一轮 A2A——还记得前面说的，之后可能形成一个 agent mesh 吗？今天某个 agent 接到任务，它自己可能变成新的 client，再去找另一个 agent 协助处理。就这样来来回回，流程不一定一次走完。",
      note: "“next A-circle”为转写乱码，按上下文清理为下一轮 A2A 委托。"
    },
    {
      start: "12:32:26", end: "12:33:49", slide: 15,
      label: "动态流程：谁举手谁来接",
      transcript: "Another beautiful thing about A2A's architecture is that it can achieve what's called dynamic flow. Traditionally, companies have two types of processes. One is the so-called fixed process, which has a very clear SOP — step one, step two, step three, step four, in that order. Generally speaking, when we talk about Antigravity, we define a workflow; if you're writing a program, you'll have a graph or DAG diagram telling it how to follow the whole process, and the agent follows it step by step until it's finished. But in real business environments, there are many tasks for which no one knows the correct workflow — it's a new attempt, it still needs testing, and it's not stable yet. With dynamic processes, many times we ask within the organization, 'Who can do this? Who knows how to do this?' and they raise their hands. A2A has the characteristic of dynamically generating such processes: I need to arrange a trip today — which agent can book tickets? Raise your hand! If you can book tickets, great, I'll ask you for the ticket booking. Who can book hotels? That agent can book hotels, so I delegate the hotel booking to them. As long as your organization has enough agents and their capabilities are complete, we believe it will find a way to solve the problem.",
      transcript_zh: "A2A 架构另一个漂亮的地方，是它能实现所谓的 dynamic flow（动态流程）。传统上公司有两种流程：一种是固定流程，有非常清楚的 SOP——第一步、第二步、第三步、第四步，按顺序来。一般讲到 Antigravity，就是先定义一个 workflow；写程序的话会有 graph 或 DAG 图，告诉它整个流程怎么走，agent 就照着一步步执行到结束。但真实业务环境里，很多任务没人知道正确的工作流程——因为这是新的尝试，还要测试、还不稳定。动态流程下，很多时候我们就在组织里问：“谁能做这个？谁会做这个？”有人举手。A2A 就有这种动态生成流程的特性：我今天要安排一趟出差——哪个 agent 会订票？举手！会订票太好了，订票就找你；谁会订酒店？那个 agent 会，订酒店就委托给它。只要组织里的 agent 够多、能力够完整，相信它就会找到办法把问题解决。",
      note: "固定 vs 动态流程的展开 deck 无独立页，讲解停留在运作流程页（15）；起句承自 12:32:10 的收束句。"
    },
    {
      start: "12:33:57", end: "12:34:44", slide: 16,
      label: "A2A 如何解决前述三个问题",
      transcript: "Okay, let's review what we just talked about: the difficulties that traditional centralized AI systems encounter, and how A2A solves them. For the issue of trust boundaries failing, the A2A approach is simple: I only expose the Agent Card — I tell you what this agent can do, and I won't reveal anything else. This effectively controls cross-domain communication. As for sharing state and exceeding authority, we only interact through task assignment and get the artifact results back. What exactly happened inside — what data I contributed, what data I connected to — people outside don't know; it's basically encapsulated within this agent and doesn't need to be revealed to the outside world.",
      transcript_zh: "好，我们回顾一下刚讲的内容：传统中央集权 AI 系统遇到的困难，A2A 怎么解决。信任边界失效的问题，A2A 的做法很简单：我只暴露 Agent Card——告诉你这个 agent 能做什么，其他一概不揭露，这样就有效控制了跨域通讯。至于共享状态越权：我们只通过任务派工互动，把 artifact 结果拿回来。中间到底发生了什么、我贡献了什么数据、连了哪些数据——外面的人不知道，基本都封装在这个 agent 里，不需要对外揭露。",
      note: "对应 deck 三个解法中的“跨域通讯”与“资料隐私”。"
    },
    {
      start: "12:35:00", end: "12:35:06", slide: 16,
      label: "经销商比喻：只给结果不给供应链",
      transcript: "There's actually a similar example in life: if you find a distributor today and the distributor helps you purchase things, you don't need to worry about how they do it — you just tell them what you want, and in the end they give you what you need. You don't need to know what they do afterwards; they have their own way of handling it. But you can't expect them to say, 'It's okay, just expose all my other suppliers to me' — impossible, they won't give you that. So just treat it as something that can partially reveal information but still help you get the job done.",
      transcript_zh: "生活里其实有类似的例子：今天你找一个经销商帮你采购，你不需要管他是怎么做的——你只要告诉他要什么，最后他给你你要的东西。你不需要知道他背后怎么处理，他自有他的办法。但你不能指望他说“没关系，把其他供应商都摊开给我看”——不可能，他不会给你这种东西。所以就把它当成一个会部分揭露信息、又能帮你把事办成的对象。",
      note: "经销商例子为讲者口头补充，deck 无对应内容，讲解仍停留第 16 页。"
    },
    {
      start: "12:35:32", end: "12:35:42", slide: 16,
      label: "利益冲突：各自最优即可博弈",
      transcript: "As for the rightmost one, the lack of autonomous game-playing: because each agent operates independently, there's no problem there — they can compete based on the optimal strategy each set up for itself, the method most advantageous to its own agent. Whether it's competing with other agents for premium pricing, vying for resources, or managing conflicts, there won't be this loss of autonomy.",
      transcript_zh: "至于最右边的自主博弈缺失：因为每个 agent 独立运作，当然就没有这个问题——它们可以按各自为自己设定的最优策略、对自己最有利的方式去竞争。不管是和其他 agent 抢优惠价格、争资源，还是处理冲突，都不会失去这种自主性。",
      note: "至此 deck 三个“解决”讲齐；随后进入工具推荐段。"
    },
    {
      start: "12:35:59", end: "12:36:04", slide: 17,
      label: "技术栈总览（现场一带而过）",
      transcript: "After talking a lot about the how, I'll share a few small tools with you — no, not small tools, but small ones with GitHub links. First, Google has developed a tool called ADK that can easily create agents.",
      transcript_zh: "讲了半天怎么做，接下来跟大家分享几个小工具——不，不是小工具，是几个带 GitHub 链接的小东西。首先是 Google 开发的一个叫 ADK 的工具，可以很方便地创建 agent。",
      note: "技术栈总览页（ADK / MCP / Agent Platform Runtime / A2A 四层）现场未逐层讲解，仅以此句带过，随即进入 ADK 2.0 页。"
    },
    {
      start: "12:36:04", end: "12:36:28", slide: 18,
      label: "ADK 2.0：Graph 工作流与 Agent Skills",
      transcript: "What about this ADK? Of course, it also supports the A2A protocol. So if any of you need help developing agents, ADK is a great little tool, and the new 2.0 version also supports the graph-based workflows we just introduced: you can draw something like a DAG graph and let it execute — it fully supports that — and it also supports industry-standard agent skills.",
      transcript_zh: "这个 ADK 怎么样呢？它当然也支持 A2A 协议。所以各位如果有开发 agent 的需求，ADK 是个很好用的小工具；新的 2.0 版还支持我们刚介绍的 graph-based workflow——可以画一个类似 DAG 的图让它执行，它都完整支持；同时也支持业界标准的 Agent Skills。",
      note: "“grave design grave-based workflow”为 graph-based workflows 的转写误，已按 deck 修正；本页 Python 多工作流等要点现场未逐条展开。"
    },
    {
      start: "12:36:55", end: "12:37:44", slide: 19,
      label: "agents-cli：把 ADK 封装成 Skills",
      transcript: "I know that nowadays you might not be writing code directly from scratch, but that's okay — we've also made something really fun called agents-cli, and I highly recommend you give it a try. If you've written your own ADK agent... this thing actually includes two parts. The first is very simple: it has a series of skills — it has encapsulated the skills so that your vibe-coding agents know how to write an ADK agent. In the past, when you needed to write an agent or an ADK agent, these harnesses or vibe-coding agents might not be familiar with them or understand them. That's okay — you can install this batch of skills, and the agent will clearly show the vibe-coding agent how to write it, what the specifications are, and what the conditions are. It also has a series of pre-packaged CLIs, making it easy to call these parameters; it interacts directly with the Google Cloud platform, so you can write your agent and have it automatically install and deploy it to your Google Cloud environment.",
      transcript_zh: "我知道现在大家可能不会直接从零写代码，没关系——我们也做了一个很好玩的东西叫 agents-cli，强烈推荐你试试。如果你自己写过 ADK agent……这个东西其实包含两部分。第一很简单：它有一系列 skills——把 skill 封装好，让你的 vibe-coding agent 知道怎么写 ADK agent。以前要写 agent 或 ADK agent 时，这些 harness、这些 vibe-coding agent 可能不熟、不太懂；没关系，现在装上这一批 skills，agent 就会清楚地告诉 vibe-coding agent 怎么写、规范是什么、条件是什么。它还有一系列预封装的 CLI，方便调用这些参数；直接和 Google Cloud 平台互动，你写好 agent，它就自动安装并部署到你的 Google Cloud 环境里。",
      note: "“Agent COI”为 agents-cli、“Vicodin agents”为 vibe-coding agents 的转写误，已修正；对应 deck 本页 Skills 封装与 CLI 要点。"
    },
    {
      start: "12:37:59", end: "12:38:41", slide: 19,
      label: "自动化 Eval：本地小集、云端大集",
      transcript: "Another advantage is that it has its own evaluation framework — I find this very convenient to use. It performs both offline and online evaluations. If you don't need to deploy it online and the evaluation set is quite small, you can run it directly on the ground — once it runs on your local machine, the result will be the same as if you ran it in the cloud. However, sometimes our evaluation sets are very large — some of my clients, for example, have thousands of evaluation cases — which is quite pointless to run locally. Google Cloud provides a ready-made framework: you can send your data to the cloud to run and get the results back. Then you can just ignore it, go eat your meal, make your coffee, and continue doing other things on your computer; after a while, when it's finished, it uploads the results back to you — very convenient.",
      transcript_zh: "另一个优点是它自带评估框架，我用起来觉得非常方便。它做离线和线上两种评估。如果不需要部署上线、评估集很小，可以直接在本机跑——本地跑完的结果和云端跑是一样的。但有时我们的评估集很大，比如我的一些客户有几千条评估，本机跑就没什么意义了。Google Cloud 提供现成的框架：把数据送上云端跑，结果回传给你。之后你就可以不管它，去吃饭、冲咖啡，在电脑上继续做别的事；过一阵子跑完，结果自动回传给你，非常方便。",
      note: "对应 deck“离线与线上评估 / 自动编写并运行评估任务，持续迭代直至满足标准”。"
    },
    {
      start: "12:38:57", end: "12:39:08", slide: 19,
      label: "兼容主流 Coding Agent 与 Plugin 1.0",
      transcript: "It supports all kinds of mainstream coding agents — even if you're not using Antigravity, you can use other frameworks without any problem, because it's basically a well-encapsulated thing, like an agent skill. We've also supported the new agent plugin 1.0 protocol, so it works with things like coding agents, Codex, Cursor, Windsurf and so on.",
      transcript_zh: "它支持各种主流的 coding agent——就算你不用 Antigravity，用其他框架也完全没问题，因为它本质上封装得很好，就像一个 agent skill 一样。我们也支持了新的 agent plugin 1.0 协议，所以像是 coding agent、Codex、Cursor、Windsurf 等等都支持。",
      note: "“agent plugin 1.0 protocol”按转写保留（deck 未提及，无法核对）；deck 页脚注明原生支持 Antigravity、Gemini CLI、Claude Code 等。"
    },
    {
      start: "12:39:12", end: "12:39:25", slide: 19,
      label: "结语：会后聊 ADK 与 A2A 开发",
      transcript: "Okay, so that's my part. If you have any questions about developing with Google ADK or A2A projects, please feel free to ask later — we can discuss and exchange ideas outside. Thank you, everyone.",
      transcript_zh: "好，我这部分就到这里。如果大家对用 Google ADK 或 A2A 项目做开发有任何问题，欢迎等一下再来问，我们可以在外面讨论交流。谢谢大家。",
      note: "致谢收尾，幻灯片停在末页（agents-cli，含扫码体验入口）；QA 留到场外，未收录。"
    }
  ]
};
