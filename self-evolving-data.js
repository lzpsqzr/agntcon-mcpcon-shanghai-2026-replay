window.talk = {
  title: "How We Built Reliable Self-Evolving Agent Skills",
  speaker: "Jayita Bhattacharyya (MTS @ Domyn) · Subhro Das",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/self-evolving.pdf",
  assets: "assets/self-evolving",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "15:04:57", end: "15:05:40", slide: 1,
      label: "标题页：可靠的自进化 agent 技能",
      transcript: "Hello everyone, very good afternoon. My name is Subhro, I'm from India, I'm an ML engineer and I work at a company called Mattoboard, based in Las Vegas. Today we're going to be talking about how we build reliable self-evolving agent skills. This is an intermediate talk — I'm already expecting some of you have worked with agents, building them and putting them into production. So let's get started.",
      transcript_zh: "大家好，下午好。我叫 Subhro，来自印度，是一名机器学习工程师，在一家位于拉斯维加斯的公司 Mattoboard 工作。今天我们要讲的是如何构建可靠的自进化 agent 技能。这是一场中级演讲——我默认你们中有些人已经做过 agent、把它们部署到生产环境了。那我们开始吧。",
      note: "整场由 Subhro 主讲（字幕 S2 声道），合作讲者 Jayita 只在结尾道谢时出现；Wordly 把 Mattoboard 转写成了 Murderbot。"
    },
    {
      start: "15:05:44", end: "15:06:14", slide: 1,
      label: "讲者自介：AI×硬件、PyTorch 贡献者",
      transcript: "This is just a small introduction about me. I work at the intersection of AI and hardware. I'm an open-source contributor, currently actively contributing to PyTorch and VLM. I've spoken at a few conferences and presented posters at PyTorch Conference, PyCon US, PyCon Japan, et cetera, and some of my research papers are published at the Scientific Python Conference 2024 and 2026.",
      transcript_zh: "简单介绍一下我自己：我工作在 AI 与硬件的交叉领域，是开源贡献者，目前活跃贡献于 PyTorch 和 VLM；在 PyTorch Conference 做过海报展示，也在 PyCon US、PyCon Japan 等会议演讲过，还有一些研究论文发表在 2024 年和 2026 年的 Scientific Python Conference 上。",
      note: "自我介绍没有独立 slide，在标题页上讲完。"
    },
    {
      start: "15:06:28", end: "15:07:25", slide: 2,
      label: "这不是 Agent 入门课",
      transcript: "As this is already an intermediate talk, I'm expecting you already know some things about agents — you've put AI agents into production, made them scalable, and set up evals and observability for them. And I hope you're also using some of the coding tools, like Claude Code, Kimi or DeepSeek, to code in your day-to-day life. These are the table of contents: I'm going to talk about DSPy and its benefits, chain of thought and ReAct agents, and a section of DSPy which is GEPA; we're also going to talk about evals, observability, reflection and feedback loops, and agent skills.",
      transcript_zh: "既然已经是中级演讲，我就默认你们对 agent 已有所了解——已经把 AI agent 推上生产、做过扩展、给它们配好了评估和可观测性。也希望你们日常已经在用 Claude Code、Kimi 或 DeepSeek 这类编程工具来写代码。这是今天的内容目录：我会讲 DSPy 和它的好处、思维链和 ReAct agent，以及 DSPy 的一个部分 GEPA；我们还会讲评估、可观测性、反思与反馈回路，以及 agent 技能。",
      note: "目录是口头报的，deck 里没有目录页；“Claude Code / Kimi”按发音还原，Wordly 原文作 Cloud Code / Kimmy。"
    },
    {
      start: "15:07:36", end: "15:08:55", slide: 3,
      label: "GPT-5 提示词解剖：脆且难维护",
      transcript: "Every one of you, using any kind of AI agent, must have used some kind of prompt engineering to get the desired output. This is basically the anatomy of a GPT-5 prompt, and you can see it has a lot of sections: role, task, context, reasoning, output format, and stop conditions. Each and every time you want to change your model, you get very different results; a little change in this kind of prompt also results in a different set of outputs. And there is always one or the other test case that fails — you want your output in a very solid JSON structure, and some of your test cases will always fail in production. At the end of the day we are all engineers, and we don't want to spend much time tweaking the prompt; these are highly complex, high-maintenance things. What we want is someone to manage our entire prompt engineering — and we have a solution for it.",
      transcript_zh: "你们每个人在用各种 AI agent 的时候，多少都做过某种提示词工程来得到想要的输出。这就是一个 GPT-5 提示词的解剖，可以看到它有好多段落：角色、任务、上下文、推理、输出格式、停止条件。每次换模型，结果都很不一样；这类提示词稍微改一点，输出就换了一套。而且总有一两个测试用例会挂——你想要输出是非常规整的 JSON 结构，可在生产环境里总有测试用例失败。说到底我们都是工程师，不想把时间花在调提示词上；这东西高度复杂、维护成本高。我们想要的是有“人”替我们管掉整个提示词工程——而我们正好有解决方案。",
      note: "页面梗：LLM 只是随机鹦鹉、我们是开发者不是鹦鹉；左图即 GPT-5 prompt 解剖（Role/Task/Context/Reasoning/Output format/Stop conditions）。"
    },
    {
      start: "15:08:59", end: "15:09:50", slide: 4,
      label: "DSPy：声明式自改进 Python",
      transcript: "Welcome to DSPy — declarative self-improving Python, a library by Stanford University, open source. You can use it and it eliminates all your prompt guesswork; it's very much Python-native, and it's also self-improving — we'll explain how it is self-improving and talk more about the optimizers. In DSPy you have support for type hints, Pydantic and LiteLLM, so you can switch between LLMs at ease, and you can also fine-tune your own prompts here.",
      transcript_zh: "欢迎来到 DSPy——声明式自改进 Python，斯坦福大学的开源库。你可以直接用，它消除你所有的提示词猜测；非常 Python 原生，而且自改进——我们会解释它怎么自改进，并多讲讲优化器。DSPy 支持类型提示、Pydantic 和 LiteLLM，可以在多个 LLM 之间轻松切换，也可以在这里微调你自己的提示词。",
      note: "Wordly 全程把 DSPy 转写成 DSP、“Pydantic, LiteLLM”转写成 Pydantic light LLM，均以 deck 文字为准修正。"
    },
    {
      start: "15:09:56", end: "15:11:09", slide: 5,
      label: "第一个 Signature：dspy.LM 与 history",
      transcript: "We'll move on to how we use signatures in DSPy. This is a very small example of how to get started — a very small signature. In the first left section we're just using dspy.LM and configuring our own model. By the way, for installing DSPy you can just pip install dspy. You just declare it with dspy.LM to define your own LLM provider, mention the API base and the API keys, and that's how easy it is to do one single inference in DSPy. If you move on to the right, I'm doing lm.history — in the LLM history you can see all the chats with the LLM, everything that is composed together of whatever you did here.",
      transcript_zh: "接下来看我们在 DSPy 里怎么用签名。这是一个入门的小例子，一个非常小的签名。左边第一部分我们只是用 dspy.LM 配置自己的模型——顺带一提，安装 DSPy 只要 pip install dspy；用 dspy.LM 声明你的 LLM 提供方，填上 API base 和 API key，在 DSPy 里做一次推理就这么简单。再看右边，我调用了 lm.history——在里面能看到与 LLM 的全部对话，你在这里做的一切都被组合记录在一起。",
      note: "左图配置 dspy.LLM 连本地 Ollama 的 llama3.2，右图 lm.history 揭示框架自动生成的真实 prompt——从 prompt 到程序。"
    },
    {
      start: "15:11:18", end: "15:12:21", slide: 6,
      label: "高效 Signature：零提示词情感分类",
      transcript: "This is a very good example of an efficient signature using DSPy — we move on to how to write more efficient signatures. It's a very simple example of a sentiment classifier: in the signature we have declared positive, negative and neutral sentiments; we define the input bucket, and we also define the output with the return types. Once we run this, you can see the prediction statement classifying the sentiment as positive, and classifying the confidence as 0.85 — and I didn't have to do any kind of prompt engineering here; it's almost like a classifier. If I do dspy.Predict I get the result, and if I do prediction.confidence I get the direct score. That's how easy it is.",
      transcript_zh: "这是用 DSPy 写高效签名的一个好例子——我们看看怎么写更高效的签名。一个非常简单的情感分类器：签名里声明了 positive、negative、neutral 三种情感；我们定义输入字段，也用返回类型定义了输出。一跑起来，就能看到预测语句把情感分类为 positive、置信度 0.85——而我完全没做任何提示词工程，它就像一个分类器。dspy.Predict 直接给出结果，prediction.confidence 直接给出分数，就这么简单。",
      note: "示例输出 Positive / 置信度 0.85，与 slide 代码注释一致。"
    },
    {
      start: "15:12:27", end: "15:14:07", slide: 7,
      label: "CoT 与 ReAct：签名切换两种范式",
      transcript: "Now we move on to some of the advanced sections. We're almost familiar with how chain-of-thought programming and ReAct programming work, so the point here is to show these chain-of-thought and ReAct methods using DSPy signatures. On the first left-hand side you can see the chain of thought: I'm running with the default LLM, putting in the question, and just using dspy.ChainOfThought — their own function — and calling it. In the results section, with lm.inspect_history you can see each and everything: the question, the reasoning and the answer — the reasoning that DSPy has already generated. Everything is automatically handled by DSPy itself, without you having to worry about prompt engineering or anything. On the right-hand side we come back to ReAct agents, where I've given access to two tools: one is the math tool, the second is the search-Wikipedia tool, and then you kind of go on with the outputs and see all the results in lm.inspect_history. Again the same thing — we're not using any kind of prompt engineering here; it's basically all handled by DSPy.",
      transcript_zh: "现在进入进阶部分。思维链编程和 ReAct 编程大家基本都熟悉，这里的重点是用 DSPy 签名来展示这两种方法。左边第一个是思维链：我用默认 LLM，放入问题，直接调用 dspy.ChainOfThought 这个框架自带的函数。结果部分用 lm.inspect_history 能看到全部内容——问题、推理和答案，推理是 DSPy 自动生成的。一切都由 DSPy 自己处理，你完全不用操心提示词工程。右边回到 ReAct agent：我给了它两个工具的访问权，一个是数学工具，第二个是搜索 Wikipedia 的工具，然后你跟着输出走，在 lm.inspect_history 里看到所有结果。同样的——完全没写提示词工程，基本上都由 DSPy 处理。",
      note: "两个例子用同一主角（David Gregory / Kinnairdy 城堡）做对照：CoT 纯推理，ReAct 只挂 math 和 Wikipedia 两个工具。"
    },
    {
      start: "15:14:16", end: "15:15:25", slide: 8,
      label: "评估三法：金标准／规则／LLM 裁判",
      transcript: "This is a very good question — is evals all you need? There are many ways to define your metric, but I think the most approachable methods are these three. The real-world takeaway is basically not to rely on any one of them, but to use a combination of more than one of these methods. Labeled data comparisons, as we know, are basically the gold standard. Then we have rule-based checks, where we evaluate with code — factors like: is the output valid JSON or not, does it contain the required field we want, or is it a number within the expected range? And in LLM-as-a-judge, as the meme says, it's just one LLM judging another. So yeah, these are some of the methods of evals.",
      transcript_zh: "一个很好的问题：只做评估就够了吗？定义指标的方法很多，但最平易近人的是这三种。真实世界的结论是：不要只依赖其中任何一种，而要组合使用多种方法。标注数据对比，如我们所知，基本是金标准；其次是基于规则的检查，用代码来评估——比如输出是不是合法 JSON、有没有包含我们要求的必填字段、数值是否在预期范围内；至于 LLM 当裁判，就像那个梗图说的，不过是一个 LLM 在评判另一个 LLM。这些就是评估的一些方法。",
      note: "要点是三种方法组合使用，而非三选一；标题借用“X Is All You Need”句式。"
    },
    {
      start: "15:15:29", end: "15:17:43", slide: 9,
      label: "GEPA＝遗传＋帕累托，优化任何东西",
      transcript: "This is one of the most important parts of the slides — how to optimize with GEPA. GEPA stands for genetic plus Pareto: you have genetic improvements — the child will always be better than the parents, and every further generation always gets better and better. DSPy has this thing, optimize anything: it explains everything as X, and X can be considered as anything — a code optimization problem, a numeric optimization problem, you want to improve your agent, you want to improve your policy — everything can be considered as X. You have an evaluator where you define the rules: how you want the performance to be, how you want your scalability to be. That's all combined into GEPA and it generates a score. Unlike reinforcement learning, where you just get a score and you try to improve that score, in GEPA it also generates actionable side information along with it — it defines what went wrong here, why is this the score, and how can we improve the score. It actually depends on domain to domain — it's very much dependent on what domain expertise you have and what you're trying to achieve. Then you have the return result through the LLM, and what GEPA does is combine all of this score and this actionable side info and try to improve the score.",
      transcript_zh: "这是全片最重要的部分之一——怎么用 GEPA 做优化。GEPA 代表遗传（genetic）加帕累托（Pareto）：遗传式改进——子代总是比父代更好，每一代都越来越好。DSPy 有个“优化任何东西”的思路：一切都表示为 X，而 X 可以是任何东西——代码优化问题、数值优化问题，你想改进你的 agent、改进你的策略，一切都可以看作 X。你有一个评估器，在里面定义规则：性能要怎样、可扩展性要怎样。这些全部组合进 GEPA，它生成一个分数。和强化学习只给你一个分数、你去改那个分数不同，GEPA 还会随之生成可执行的辅助信息：它说明哪里出了错、为什么是这个分数、怎样才能改进这个分数。这其实因领域而异——非常依赖你有什么领域专长、想在这个领域达成什么。然后结果经由 LLM 返回，GEPA 把分数和这些可执行辅助信息合在一起，去改进这个分数。",
      note: "对应 slide 的 x → f(x) → score＋可执行辅助信息（ASI）→ LLM 闭环图；Wordly 把 GEPA 听成 japa / Chepa。"
    },
    {
      start: "15:17:57", end: "15:18:43", slide: 9,
      label: "闭环自进化：千次 rollout 抵 RL 两万四",
      transcript: "This is one of the most important sections here — taking all your skills, all your strings, and putting them into your evaluator, whatever functions that you want to optimize. Then you put it in the LLM, and then you kind of bring it back to the string evaluator, and the process runs on — this is basically a self-evolving loop. A real-life use case is where you use, let's say, GRPO or reinforcement learning: in reinforcement learning it typically requires around 24,000 or more iterations to get to a particular point when you push things into production, but in GEPA you can do that within 400 to around 1,200 rollouts. That is a pretty significant improvement.",
      transcript_zh: "这是最重要的章节之一：把你所有的技能、所有的字符串放进评估器——任何你想优化的函数；然后送进 LLM，再回到字符串评估器，流程循环往复——这基本上就是一个自进化闭环。一个真实用例：用 GRPO 或强化学习，要把东西推到生产上的某个水平，通常需要大约 24000 次甚至更多迭代；而用 GEPA，大约 400 到 1200 次 rollout 就能做到。这是相当显著的提升。",
      note: "讲者在后面反馈回路一节又把 GEPA 迭代数说成 800–1200，与此处 400–1200 略有出入，均按原话保留。"
    },
    {
      start: "15:18:56", end: "15:19:43", slide: 10,
      label: "AIME 实测：GPT-4.1 提升 10%",
      transcript: "This was on the AIME dataset, and we had a 10% improvement with the GPT-4.1 performance models here. The way to think about this is that GEPA is essentially precomputing the reasoning during the optimization phase itself — it figures out a good general plan or strategy during optimization. So at inference time, or during a new task instance, the model doesn't have to recover or rediscover that reasoning. And it's basically two iterations — there is one smaller model and one bigger model that kind of iterate.",
      transcript_zh: "这是在 AIME 数据集上的结果：GPT-4.1 模型拿到了 10% 的提升。理解方式是：GEPA 本质上是在优化阶段就把推理预先算好了——在优化期间就找出一个不错的通用计划或策略。这样到了推理时、遇到新的任务实例，模型不必再恢复或重新发现那段推理。而且大概只要两轮迭代——一个小模型和一个大模型来回迭代。",
      note: "deck 数据更细：GPT-4.1 Mini 从 46.6% 提到 56.6%（AIME 2025，仅 2 轮 GEPA 迭代）；Wordly 把 AIME 听成 Army。"
    },
    {
      start: "15:19:46", end: "15:20:55", slide: 11,
      label: "可观测是任何 agent 栈的必选项",
      transcript: "Speaking about observability — I think for any kind of agent stack, observability is a must. And this is what you can do to track your observability. There are two to three basic things that we developers always track: end-to-end logging of whatever your agent is doing — you capture the intermediate reasoning of your agents, not just the final output, but also the intermediate reasoning and whatever tools it is accessing in between those steps. This matters even more when you're using processes like ReAct or chain of thought — you can trace the full sequence: you have one tool and you can basically track whatever tools your agent is using. You can track the token consumption, the performance, whatever model it's using, and also measure the cost over time.",
      transcript_zh: "说到可观测性——我认为对任何 agent 栈来说，可观测性都是必选项。这页是你可以怎么去跟踪它。我们开发者常抓的基本上有两三件事：对 agent 做的一切做端到端日志——捕捉 agent 的中间推理，不只是最终输出，还包括中间推理以及各步骤之间访问了哪些工具。在使用 ReAct 或思维链这类过程时，这一点更重要——你可以追踪完整序列：跟踪 agent 到底用了哪些工具、token 消耗、性能、用的是什么模型，还可以随时间度量成本。",
      note: "配的是 Langfuse 式观测平台截图（token、成本、延迟、错误面板）；15:19:57 一句转写破碎，已按上下文清理。"
    },
    {
      start: "15:21:02", end: "15:22:14", slide: 12,
      label: "反馈回路：从误差分析再教系统",
      transcript: "This is the point where everything comes into place — this is the feedback loop. And this feedback loop is not generally for DSPy or specific; it's very much specific to when you are building an agent, or basically self-evolving agent skills. So here's the life cycle: you first of all build a draft, then you build your evals, you build everything and you deploy the first version. And then after that you'll notice certain things are breaking in production, certain things are not working — so what do you do? You basically pull the stack traces and everything you have logged, and then you do the error analysis here — the execution alignment — and from there you teach the system again. That goes back into the feedback loop, and then the process continues again and again. It is kind of similar to what we do in RL, but it is much fewer iterations compared to RL — around like 800 to 1,200 iterations. That's how the agent learns from its own mistake.",
      transcript_zh: "到这里一切才串起来——这就是反馈回路。这个反馈回路不是 DSPy 专用的；它非常适用于你在构建 agent、或者说构建自进化 agent 技能的时候。生命周期是这样的：先写个草稿，然后建评估、把一切建好，部署第一个版本。之后你会发现生产里有些东西在坏、有些不工作——那怎么办？把栈追踪和所有已记录的日志拉出来，在这里做误差分析、执行对齐，然后再教系统一次。这回到反馈回路里，流程一次又一次继续。这有点像我们在强化学习里做的，但迭代次数少得多——大约 800 到 1200 次。agent 就是这样从自己的错误中学习的。",
      note: "对应闭环图 Thought→Action→Execution→Reflection→Alignment；口中的“execution alignment”即图中的执行／对齐节点。"
    },
    {
      start: "15:22:19", end: "15:23:23", slide: 13,
      label: "skill.md：按需加载的领域知识包",
      transcript: "We do have to define some of the skill.md files here. So these are some of the skill.md files — this is basically the structure that a skill.md file should be. The key benefit here is that we want to prevent the context bloat: instead of loading everything in the agent itself, it just might need to load some kind of specific knowledge that is relevant to the task. And on the right hand you can see what a skill actually looks like: you have a directory with a skill.md, and you also have the YAML front-matter with the name and description there. And so the takeaway here is basically the skills — how do you scale your domain expertise across the agent system without bloating.",
      transcript_zh: "我们还得在这里定义一些 skill.md 文件。这些就是一些 skill.md 文件——基本上就是 skill.md 应有的结构。关键好处是防止上下文膨胀：不必把所有东西都装进 agent 本身，它只需要加载与任务相关的特定知识。右边可以看到一个技能实际长什么样：一个目录里放着 skill.md，还有带 name 和 description 的 YAML 头。所以这里的要点就是技能——如何把你的领域专长扩展到整个 agent 系统、又不引起膨胀。",
      note: "目录＋skill.md＋YAML（name/description）是 Agent Skills 的标准结构；本页承接上一页“teach the system again”的落点。"
    },
    {
      start: "15:23:29", end: "15:23:38", slide: 14,
      label: "资源页：DSPy 与 GEPA 论文链接",
      transcript: "And these are the slides, and these are some of the core resources that you can scan — it contains the paper, the agent skills and all the observability. You can find it in my slides.",
      transcript_zh: "这些是幻灯片，还有一些可以扫码的核心资源——里面有论文、agent 技能和所有可观测性相关内容，你可以在我的 slides 里找到。",
      note: "资源清单：DSPy 官方文档、GEPA 论文／博客／独立库、Agent Skills、Evals、Observability。"
    },
    {
      start: "15:23:38", end: "15:23:43", slide: 15,
      label: "Takeaways：You tell me（现场跳过）",
      transcript: "And so the takeaway here is basically the skills — how do you scale your domain expertise.",
      transcript_zh: "所以这里的要点其实就是技能——你如何扩展自己的领域专长。",
      note: "Takeaways 页只写着 You tell me!!!!!，现场未逐页讲解；transcript 取 15:23:17 讲者在 skill.md 页收尾的要点句，时间取资源页之后的收场空档。"
    },
    {
      start: "15:23:43", end: "15:23:48", slide: 16,
      label: "致谢页：两位讲者联系方式",
      transcript: "Thank you.",
      transcript_zh: "谢谢。",
      note: "致谢页现场未展开；字幕只捕捉到另一声道（S3，应为合作讲者 Jayita 或主持人）的一句 Thank you，end 按收场顺延 5 秒。"
    }
  ]
};
