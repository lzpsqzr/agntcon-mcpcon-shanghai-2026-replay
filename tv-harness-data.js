window.talk = {
  title: "I Taught an Agent to Build TV Apps",
  speaker: "Giovanni Laquidara",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 2",
  pdf: "pdfs/tv-harness.pdf",
  assets: "assets/tv-harness",
  source: "USAR-0989-transcript.txt",
  cues: [
    {
      start: "10:10:42", end: "10:10:58", slide: 1,
      label: "开场互动：谁写过 TV 应用",
      transcript: "Hello, everyone. So first of all, raise your hand if you ever developed a TV app for smart TV. One, maybe two — yes, that's nice. The presentation is flickering a little bit on the screen, but I guess we can try.",
      transcript_zh: "大家好。首先，做过智能电视 TV 应用开发的请举手。一个、也许两个——很好。投在屏幕上的画面有点闪烁，不过我想我们可以试试。",
      note: "标题页：I Taught an Agent to Build TV Apps（现场纪要称 Amazon TV App: Coding Harness）。开场约一分钟被投影闪烁打断。"
    },
    {
      start: "10:11:02", end: "10:11:43", slide: 2,
      label: "自我介绍：Amazon 设备团队布道师",
      transcript: "I'm Giovanni Laquidara, developer advocate at Amazon, Amazon Devices and Services. That means I work with all the Amazon devices — for example, the TVs that we are selling in other countries as well. I support developers, educating them about how to develop smart TV apps.",
      transcript_zh: "我是 Giovanni Laquidara，Amazon 设备与服务（Devices and Services）团队的 developer advocate。也就是说我对接 Amazon 的所有设备——比如我们也在其他国家销售的电视。我支持开发者，教他们如何开发智能电视应用。",
      note: "WHOAMI 页：Sr. Developer Advocate & Builder · Amazon London ｜ giolaq.dev。自我介绍中间夹着几次调屏幕的插话，已略去。"
    },
    {
      start: "10:11:48", end: "10:12:56", slide: 3,
      label: "三大难题：碎片化、遥控器、性能",
      transcript: "Nowadays I'm actually teaching AI agents how to build TV apps. Why? Because developing TV apps is hard, and there is not a lot of training data around at the moment. The three main problems: fragmentation — multiple operating systems and hardware, each with a different toolchain, SDKs and APIs; control — instead of a touch screen, the user controls your app with a remote control, with a directional cross, totally different, probably most similar to game development, and there is not so much training around that; and performance — many TV hardware are really low, so the apps need to be tailored for performance.",
      transcript_zh: "而如今我在教 AI agent 写 TV 应用。为什么？因为 TV 应用开发很难，眼下也没有多少训练数据。三大问题：碎片化——多种操作系统、多种硬件，各有各的工具链、SDK 和 API；操控——用户不是用触摸屏，而是用遥控器上的十字方向键操控你的应用，完全是另一套方式，最接近的可能是游戏开发，而那方面的训练数据也不多；还有性能——很多电视硬件很弱，应用必须为性能做裁剪。",
      note: "三难题与 slide 三个卡片一一对应；十字方向键即 D-pad。"
    },
    {
      start: "10:13:01", end: "10:13:38", slide: 4,
      label: "碎片化版图：5+ 平台各有工具链",
      transcript: "This is like the fragmentation world of the TV — the main operating systems. We have Android TV; in Amazon we have TVs whose platform actually has two operating systems, one Android-based and another one a brand new operating system we have at Amazon, where React Native is the main way to develop apps. Then of course you have LG with webOS, Roku. Each platform has its own toolchain and constraints — even simply the API for the App Store is different.",
      transcript_zh: "这就是电视的碎片化版图——主流操作系统。有 Android TV；Amazon 的电视平台上其实装着两个操作系统，一个是基于 Android 的，另一个是我们在 Amazon 全新做的操作系统，React Native 是那里开发应用的主要方式。然后当然还有 LG 的 webOS、Roku。每个平台都有自己的工具链和约束——连应用商店的 API 都不一样。",
      note: "新 OS 即 Amazon Vega（Wordly 把名字转丢了）；本页 logo：Tizen / Fire TV / Android TV / webOS / Apple TV / Roku。"
    },
    {
      start: "10:13:41", end: "10:13:54", slide: 5,
      label: "热闹的一面：AI one-shot 网页应用",
      transcript: "AI is good at one-shotting. This is what I saw online — I tried a lot of one-shot web apps or web games, and it was actually kind of good.",
      transcript_zh: "AI 很擅长 one-shot（一次性生成）。这些是我在网上看到的——我自己也试过很多一次生成的 web 应用或网页游戏，效果确实还不错。",
      note: "THE HYPE 页是三条推文：全栈 web 应用、俄罗斯方块、3D 纸飞机游戏；现场快速带过。"
    },
    {
      start: "10:13:54", end: "10:14:09", slide: 6,
      label: "现实：one-shot 生成的 TV 应用不行",
      transcript: "But I tried with TV apps and it was not so great. I asked with a simple prompt, create a TV app in React Native. It started to just use the things on my laptop, but the result was not adaptable to other TVs. So it was not a great one.",
      transcript_zh: "但换到 TV 应用上就不那么行了。我用一个简单的提示词试过：用 React Native 创建一个 TV 应用。它就开始直接用我笔记本上有的东西，可做出来的东西没法适配其他电视。所以那次 one-shot 不算成功。",
      note: "THE REALITY 页是那次尝试的终端记录（agent 检测到 Vega/Kepler 工具链）。讲者两次提到画面偏暗。"
    },
    {
      start: "10:14:23", end: "10:15:05", slide: 7,
      label: "决定：自建可观察、可配置、独立的 harness",
      transcript: "So that's why I decided to build my own AI agent — actually my own harness — to build TV apps able to build and run across the different operating systems. We will see how I developed it and how it's configured. I wanted something observable — in every moment I know what's happening; configurable — which model to use, which tool to use; and independent — not controlled by any other company. It's totally open source. And I have a run here now — it's running here on a terminal UI, and you can explore the different steps.",
      transcript_zh: "所以我决定自己做一套 AI agent——确切说是自己的 harness——来构建能跨不同操作系统构建和运行的 TV 应用。我们会看到我怎么开发它、怎么配置。我要它可观察——任何时刻我都知道发生了什么；可配置——用什么模型、用什么工具；并且独立——不受任何其他公司控制。它完全开源。而且现在就有一个 run 在跑，跑在这个终端 UI 上，可以翻看各个步骤。",
      note: "Observable / Configurable / Independent 三关键词是全场主线；此后多处现场切到 TUI 看运行中的 harness。"
    },
    {
      start: "10:15:32", end: "10:15:47", slide: 8,
      label: "输入极简：一个 prompt + 两个 JSON",
      transcript: "The design I wanted for this harness: it takes as input only one prompt and two JSON configuration files that give me the content of the TV app. Most TV apps are about content — videos to be played, images to show, recipes to show — and a branding, the theme and colors of the TV app.",
      transcript_zh: "我给这套 harness 的设计是：输入只有一个 prompt 和两个 JSON 配置文件，由它们给出 TV 应用的内容。大多数 TV 应用就是内容——要播的视频、要展示的图片、菜谱——再加品牌，也就是 TV 应用的主题和配色。",
      note: "MEET TV-BUILD：content.json + brand.json → tv-build → Android TV / Fire TV / Web。"
    },
    {
      start: "10:16:03", end: "10:16:16", slide: 9,
      label: "一条流水线：从规划到自动测试",
      transcript: "This AI agent is essentially a pipeline with different phases, starting from the planning up to the testing and visual QA using the browser, and even the Android test. At the very end of the pipeline, the Android emulator starts automatically and tests.",
      transcript_zh: "这个 AI agent 本质上是一条多阶段流水线，从规划一直到测试、用浏览器做视觉 QA，甚至还有 Android 测试。流水线的最后会自动启动 Android 模拟器来测试。",
      note: "GENERATE → PERSONALITY → PROVE 三段共十个阶段。"
    },
    {
      start: "10:16:16", end: "10:16:40", slide: 10,
      label: "各阶段职责与最爱的 creative UI",
      transcript: "Each one of these phases has a specific task. One that I really like is the creative UI part — it's really fun, because I made the harness, the agent, free to develop something creative. It's really good at designing, in this case, TV apps.",
      transcript_zh: "这十个阶段各有具体任务。我个人最喜欢 creative UI 那一段——很有意思，因为我让 harness、让 agent 自由发挥去做创意。它真的很擅长设计，在这里就是设计 TV 应用。",
      note: "本页逐阶段列职责：plan / scaffold / branding / content / screens / creative_ui / navigation / verify / build_loop / visual_qa_loop / android_test_loop。"
    },
    {
      start: "10:16:40", end: "10:17:16", slide: 11,
      label: "每个阶段 = 一个全新 agent 循环",
      transcript: "Each phase is an actual agent: it has some prompt and skills associated to it, then there is a reasoning, it picks up a tool to complete the task. After executing the steps, it checks if the output is good enough for this phase; otherwise it's looping through the phase. If it's good enough, it passes the output to another phase — so another agent.",
      transcript_zh: "每个阶段都是一个真正的 agent：有自己的 prompt 和关联的 skills，然后做推理、挑一个工具来完成任务。执行完步骤后，它会检查这个阶段的产出够不够好；不够好就在该阶段里继续循环，够了就把产出交给下一个阶段——也就是另一个 agent。",
      note: "本页标题即 a fresh agent per phase；循环上限 maxTurns。"
    },
    {
      start: "10:17:16", end: "10:18:01", slide: 12,
      label: "引擎：AWS 开源 Strands Agent SDK",
      transcript: "What did I use to develop this harness? Each agent is using Strands Agent SDK — an open source SDK to build agentic harnesses by AWS. There are two SDKs, one in Python and one in TypeScript; I use the TypeScript one. It's super simple: you just need the Agent API — you can configure the models, you can add tools, you can add hooks. This is the hello world of an agent using Strands, and then you just invoke the agent with your prompt.",
      transcript_zh: "我用什么开发了这套 harness？每个 agent 用的都是 Strands Agent SDK——AWS 出的开源 SDK，专门用来搭 agent 式 harness。它有两个 SDK，一个 Python 一个 TypeScript，我用的是 TypeScript。用法非常简单：只需要 Agent API——可以配置模型、加工具、加 hooks。这就是用 Strands 写 agent 的 hello world，然后用你的 prompt 调用 agent 就行。",
      note: "页上示例还演示了 BeforeToolCall hook 拦截校验；strandsagents.com。Wordly 把 Strands 转成过 strength。"
    },
    {
      start: "10:18:12", end: "10:18:33", slide: 13,
      label: "执行器代码：自己消费流式消息",
      transcript: "If you want to have control over it — in my harness, each phase was actually a loop. I just looped through the streaming messages between the harness and the model: there is actually a while until the message streaming is complete.",
      transcript_zh: "如果你想对它有更多控制——在我的 harness 里，每个阶段其实就是一个循环。我自己去遍历 harness 与模型之间的流式消息：实际就是一个 while 循环，直到消息流结束。",
      note: "执行器代码：agent.stream() 限制 maxTurns，while (!next.done) 逐事件 handleStreamEvent / trackEventUsage。"
    },
    {
      start: "10:18:33", end: "10:18:51", slide: 14,
      label: "工具代码：把 bash 包成工具",
      transcript: "To define a tool, you just need the tool API. Using this API, for example, you define the usage of the shell, bash, as a tool to be used, and then you pass this to the agent API.",
      transcript_zh: "定义工具只需要 tool API。用这个 API，比如，把 shell、bash 定义成一个可用的工具，然后把它传给 agent API。",
      note: "页上 bash 工具带 zod inputSchema（command / cwd / timeout）；错误以文本返回、绝不抛异常。"
    },
    {
      start: "10:18:51", end: "10:19:33", slide: 15,
      label: "两层工具：agent 工具 + 平台 CLI",
      transcript: "For my harness I use what I call two layers of tools. One is a native kind of tool: bash, read file — the classic tools like writing a file, adding a file, listing files, using git to commit and push the code. Then builder tools for the specific platforms. And I also use external command line tools: the Android CLI to build for Android, ADB as well to drive the emulator, Gradle, Expo using React Native, and the Vega SDK tool that we are building at Amazon for the CLI.",
      transcript_zh: "在我的 harness 里，我用的是我所说的两层工具。一层是原生类工具：bash、读文件——写文件、加文件、列文件这些经典操作，还有用 git 提交推送代码。另一层是面向具体平台的构建工具。我还用了一批外部命令行工具：构建 Android 的 Android CLI、驱动模拟器的 ADB、Gradle、React Native 用的 Expo，以及我们在 Amazon 正在做的 Vega SDK 命令行工具。",
      note: "agent 持有 8 个 Strands 工具，平台 CLI（android CLI / adb / gradle / expo / vega SDK）经 bash + skills 触达。Wordly 把 Vega 转写成了 Baker。"
    },
    {
      start: "10:19:47", end: "10:19:59", slide: 16,
      label: "content.json：应用放什么内容",
      transcript: "The inputs I use are a couple of JSON files — I really like to see the structure of it. One is about the content: imagine this file pointing to the right videos that you want to show in the TV app.",
      transcript_zh: "我的输入是一对 JSON 文件——我很喜欢能直接看到它的结构。一个是关于内容的：想象这个文件指向你想在 TV 应用里展示的那些视频。",
      note: "content.json 结构：title / categories / videos（thumbnail、HLS 流地址）/ featured。"
    },
    {
      start: "10:19:59", end: "10:20:23", slide: 17,
      label: "brand.json + 一句话定调感觉",
      transcript: "Another JSON is about the branding, the theming: the colors are defined with HTML color codes, plus a small prompt where I decide, okay, I want a dark and cinematic app like Netflix, with the neon accents. It's a really short prompt — this is the only prompt I give at the start of the harness.",
      transcript_zh: "另一个 JSON 关于品牌和主题：颜色用 HTML 色值定义，再加一小段 prompt，由我来定调，比如我想要一个 Netflix 那种深色、电影感的应用，带霓虹点缀。这段 prompt 非常短——是我在 harness 开头给的唯一一个 prompt。",
      note: "brand.json（primary/accent/background 色值）+ prompt.txt（dark & cinematic、neon glow on focus、editorial typography）。"
    },
    {
      start: "10:20:31", end: "10:20:53", slide: 18,
      label: "强输入：从两个模板应用出发",
      transcript: "The harness doesn't start from scratch — that's also why I need less prompt. It starts from two template apps: one is in React Native, one is Kotlin Multiplatform, and it adapts the code for the TV apps using them as a starting point. That was also the technique to give it the right use cases, the right best practices for a TV app.",
      transcript_zh: "harness 不是从零开始的——这也是我需要的 prompt 更少的原因。它从两个模板应用出发：一个 React Native、一个 Kotlin Multiplatform，以它们为起点去改写成 TV 应用。这也是把正确的用例、正确的 TV 应用最佳实践喂给它的技巧。",
      note: "两个模板：github.com/AmazonAppDev/react-native-multi-tv-app-sample 与讲者自己的 kmptv（Kotlin Multiplatform，Android TV + Apple TV）。"
    },
    {
      start: "10:20:53", end: "10:21:30", slide: 19,
      label: "瘦 harness、胖 skills",
      transcript: "The harness is using the skills — it's loading them dynamically; every agent, every phase has its own skills. The TypeScript code is a little bit more than 1,000 lines; all the business logic about TV apps is in the skills.",
      transcript_zh: "harness 用的是 skills——动态加载；每个 agent、每个阶段都有自己的 skills。TypeScript 代码只有一千行出头；所有关于 TV 应用的业务逻辑都在 skills 里。",
      note: "口号 Thin harness, fat skills：约 1200 行 TS 对约 3000 行 markdown；每个 skill 用 frontmatter 声明适用阶段。"
    },
    {
      start: "10:21:30", end: "10:22:05", slide: 20,
      label: "skill 内容：焦点、色彩物理、十英尺 UI",
      transcript: "The skills contain information about focus — how to use the remote controller in the app — TV color physics, and even the ten-foot UI paradigm. Ten-foot UI is the way we name the interface of a TV, because usually the user is at about ten feet from your app, from the screen — so about three meters. It's the industry standard.",
      transcript_zh: "skills 里装的是焦点（focus）——应用里怎么用遥控器——电视色彩特性，甚至还有 ten-foot UI 范式。Ten-foot UI 是我们给电视界面起的叫法，因为用户通常距离你的应用、距离屏幕大约十英尺，差不多三米。这是行业标准的叫法。",
      note: "skill 细节：focus roots、D-pad 事件、overflow 陷阱；电视面板会过饱和；3 米距离的排版判断。"
    },
    {
      start: "10:22:05", end: "10:23:13", slide: 21,
      label: "自我改进：修完 bug 沉淀成 skill",
      transcript: "An interesting part of this harness is that it's learning by itself. When it finds an issue, it tries to fix it — each loop is trying to fix the issue. Then there is another agent, another phase, judging if this issue can possibly happen in the future. If it can, the solution is stored into a skill, and this skill is going to be applied in the future. There is a directory with all these skills, and there is a judgment process for them.",
      transcript_zh: "这套 harness 一个有意思的地方是它会自我学习。发现问题时它会试着修——每个循环都在试图修掉问题。然后还有另一个 agent、另一个阶段来判断这个问题将来有没有可能再发生。如果可能，解决方案就会被存成一个 skill，以后就会套用。这些 skills 都放在一个目录里，并且有一套对它们的评审机制。",
      note: "评分规则：自评可复用性 1–5 分，≥4 分才写入 skills/auto/*.md；加载 3 次且零复发晋升 core。"
    },
    {
      start: "10:23:13", end: "10:23:30", slide: 22,
      label: "阶段内部循环：改码→检查→提交",
      transcript: "Each loop is actually editing the code, doing some checks — static checks, or testing — and then always retrying or committing. Every code is committed with a meaningful commit by the agents, so each phase can be recovered if you want.",
      transcript_zh: "每个循环都是真正在改代码、做检查——静态检查或测试——然后要么重试、要么提交。每一次提交都由 agent 写上有意义的提交信息，这样任何阶段想要回溯都能恢复。",
      note: "本页口号：verification = feedback，git commit = recovery point。"
    },
    {
      start: "10:23:30", end: "10:24:01", slide: 23,
      label: "机械验证：文件在、能构建才算过",
      transcript: "There are simple tests that each phase can do: unit tests, even created automatically, and simple checks — for example, whether the build is happening and whether the final binary of the app is there in that directory. If the file exists, fine, the building phase is done, so I can pass the APK to another agent of the pipeline to test it. Otherwise, it's looping.",
      transcript_zh: "每个阶段能做的还有简单测试：单元测试（甚至自动生成），以及一些简单检查——比如构建是否发生、应用最终的二进制包在不在那个目录里。文件存在就说明构建阶段完成，可以把 APK 交给流水线的另一个 agent 去测；不然就继续循环。",
      note: "机械检查清单：file exists / grep / TypeScript / focus / build / screenshots；超成本上限则中止。"
    },
    {
      start: "10:24:11", end: "10:24:26", slide: 24,
      label: "Android 三件套：CLI、Gradle、ADB",
      transcript: "For Android I use, like I said, three layers of tools: ADB, the Android debug bridge, to control the emulator. And I think it's running — yeah. Now it's controlling the browser for testing. These are all the phases — each one of them is an agent.",
      transcript_zh: "Android 这边，如前所说，我用三层工具：ADB，也就是 Android 调试桥，用来控制模拟器。我想它正在跑——对。现在它在控制浏览器做测试。这些都是各个阶段——每一个都是一个 agent。",
      note: "android CLI（智能层）/ Gradle（构建引擎）/ ADB（设备通道）三层；讲完即切现场 TUI。"
    },
    {
      start: "10:25:26", end: "10:25:39", slide: 25,
      label: "Android CLI：为 agent 优化的新工具",
      transcript: "I also used the Android CLI — an optimized CLI to control all the Android notions for development. It's something new that Google developed — a CLI optimized for agents.",
      transcript_zh: "我还用了 Android CLI——一个为开发场景优化的命令行，能管 Android 开发的方方面面。这是 Google 新出的东西——一个为 agent 优化的 CLI。",
      note: "android info 探测成功才启用、失败回退 gradle-adb、--require-android-cli 禁止静默回退；describe / emulator / layout / screen capture。"
    },
    {
      start: "10:25:39", end: "10:25:48", slide: 26,
      label: "三层如何叠起来",
      transcript: "Like I said: ADB is controlling, Gradle is building, and the Android CLI is the layer on top controlling all the logic for Android. ADB is for discovering the device — it actually automates starting the emulator for you and testing.",
      transcript_zh: "就像我说的：ADB 负责设备控制，Gradle 负责构建，Android CLI 是压在最上面、统管 Android 所有逻辑的那一层。ADB 负责发现设备——它会替你自动启动模拟器并测试。",
      note: "三层叠放图（Android CLI → Gradle → ADB），现场一带而过。"
    },
    {
      start: "10:25:50", end: "10:26:35", slide: 27,
      label: "终测：模拟器截图 + 十字键导航",
      transcript: "There is an early testing phase with a browser — using Chrome, because it's super quick to test with the Chrome dev tools. After that, the Android test loop is on the emulator: it starts the emulator, runs the app, takes screenshots, and then checks if they are correct enough for a TV app. I stop the loop at three attempts — this is configurable, and each one of these phases has a log file you can connect to via tail.",
      transcript_zh: "早期有一个用浏览器做的测试阶段——用 Chrome，因为配着 Chrome 开发者工具测起来非常快。之后 Android 测试循环跑在模拟器上：启动模拟器、运行应用、截图，然后判断这些截图对 TV 应用来说够不够正确。我把循环上限设为三次尝试——这是可配置的，而且每个阶段都有日志文件，可以用 tail 连上去看。",
      note: "android_test_loop：无头启动 TV AVD、D-pad 导航、adb logcat 查崩溃；30 分钟 / 3 次迭代封顶。"
    },
    {
      start: "10:24:30", end: "10:25:11", slide: 28,
      label: "现场 TUI：每个阶段自我叙述",
      transcript: "You can explore these using the keyboard. I can press Enter and see all the messages exchanged between the harness and the model — for example, this is a bash that has been used, and pressing Enter again shows exactly the command that has been executed. If I press X, there is the verify loop; the build loop is this one: every time it tries to build the app, if there is an issue in the compilation, it just fixes it, and I can follow this. It's totally observable — there is the timing and also the cost, which is not like a thousand dollars; more or less $40 for this run.",
      transcript_zh: "可以用键盘来翻看这些。我按回车就能看到 harness 与模型之间交换的全部消息——比如这里用了一次 bash，再按回车就能看到确切执行了什么命令。按 X 是 verify 循环；build 循环是这一个：每次构建应用，编译出了问题就直接修，我可以一路跟着看。这一切完全可观察——有耗时也有成本，这次 run 大概 40 美元，不是一千美元那种。",
      note: "OBSERVABILITY · LIVE 页对应的是这段现场 TUI 演示（human→TUI、agent→log、同一份事件流）；翻页顺序上讲者在 Android 页与 TUI 之间来回切，故此 cue 时间早于前一页。"
    },
    {
      start: "10:27:01", end: "10:27:20", slide: 29,
      label: "运行留痕：输出目录里全都有",
      transcript: "This harness, because I wanted to control everything, produces a lot of logs — every phase has its own prompt, generating its own results. And everything is in a directory, an output directory — this is the one that I'm running now, with all the checkpoints. So if something happened, I can understand what's happening and also I can restart it.",
      transcript_zh: "这套 harness——因为我想掌控一切——会产生大量日志：每个阶段有自己的 prompt，生成自己的结果。所有东西都在一个目录、一个输出目录里——比如现在跑的这个，里面是全部检查点。这样出了状况，我能搞清楚发生了什么，也能重启。",
      note: "out/<runId>/：各阶段 prompt 与 response、run.log、screenshots/、visual-diff、report.md 共 34 个文件。"
    },
    {
      start: "10:26:40", end: "10:26:50", slide: 30,
      label: "CLI 为 agent 设计：别的 agent 也能开",
      transcript: "This harness is usable even by another AI agent — for example, I can use my OpenClaw to control it. It's going to have all the information to run it, and all the information to know what's happening.",
      transcript_zh: "这套 harness 甚至可以交给另一个 AI agent 来用——比如我可以用我的 OpenClaw 来操控它。它能拿到运行所需的全部信息，也能知道正在发生什么。",
      note: "命令页（tv-build init / run / refine / resume / replay / doctor…）底部写明所有命令支持 --json / --detach、为 AI agent 优化设计——正对应这句；此 cue 时间在前后两页之间回跳，属现场来回切屏。"
    },
    {
      start: "10:27:30", end: "10:27:37", slide: 31,
      label: "可恢复：断点续跑省时省钱",
      transcript: "If, after 40 minutes, there is a bug of this harness and something happened so that it stops at that phase, I can resume from that phase — I don't need to build from scratch again and wait for another 40 minutes.",
      transcript_zh: "如果跑了 40 分钟后这套 harness 出了个 bug、停在了那个阶段，我可以从那个阶段续跑——不需要从头再建一遍、再等一个 40 分钟。",
      note: "--resume / --resume <id> --from-phase verify / --generate-only；失败的 run 只损失一个阶段的成本。"
    },
    {
      start: "10:27:45", end: "10:28:07", slide: 32,
      label: "任意供应商：Bedrock/OpenRouter/Anthropic",
      transcript: "It's also configurable, because the Strands SDK allows us to use the API that we want. For example, I can use the Bedrock API to get our own model provider, or I can use OpenRouter, or I can use the API for Anthropic.",
      transcript_zh: "它也可配置，因为 Strands SDK 让我们用自己想用的 API。比如我可以用 Bedrock API 接我们自己的模型服务，也可以用 OpenRouter，或者 Anthropic 的 API。",
      note: "THE SEAM：统一 executor 契约（pipeline-engine.ts），换 provider 只是在 model-factory 加一个分支，不是重写。"
    },
    {
      start: "10:28:07", end: "10:28:17", slide: 33,
      label: "两条命令，随便换模型",
      transcript: "This is configurable from a configuration file, and I can use online models, or simply the local Claude on my laptop — so it's even a layer on top of Claude, if you want, if you don't want to use your own models or your own providers.",
      transcript_zh: "这些都在一个配置文件里配。我可以用在线模型，也可以直接用笔记本上的本地 Claude——所以如果不想用自己的模型或供应商，它甚至可以架在 Claude 上面跑。",
      note: "两条命令：claude-run（Claude CLI 子进程，推荐）/ run（API 多供应商）；快速翻页。"
    },
    {
      start: "10:28:17", end: "10:28:38", slide: 34,
      label: "按阶段配模型：规划用强、执行用廉",
      transcript: "Like I said, this is the configuration file. You can choose a different provider per phase, a different model — a different brain per phase. For example, for planning you can use the smarter models, and for executing, less.",
      transcript_zh: "就像我说的，这就是那个配置文件。你可以给每个阶段选不同的供应商、不同的模型——每个阶段一颗不同的大脑。比如规划阶段可以用更聪明的模型，执行阶段用差一点的。",
      note: "harness.config.json 示例：默认 openrouter 的 deepseek-v4-flash，visual_qa_loop 单独换成 claude-sonnet-4。"
    },
    {
      start: "10:28:38", end: "10:29:08", slide: 35,
      label: "成品示例：四个 AI 生成的 TV 应用",
      transcript: "These are some examples of TV apps it can produce — the UI images are AI generated, because I didn't have all the videos to show. It's also able to creatively change between a left-side drawer — the menu coming from the left side — or you can decide, design independently, to put the navigation on top — a top navigation.",
      transcript_zh: "这些是它能产出的 TV 应用示例——UI 图是 AI 生成的，因为我没有那么多视频素材可放。它还能有创意地在左侧抽屉——从左边滑进来的菜单——和顶部导航之间做变化，可以独立决定把导航放在顶上。",
      note: "THE PROOF：烹饪（Italian Night）、体育（欧冠）、奇幻（Dragons Awakening）、Zelda 四个示例界面。"
    },
    {
      start: "10:29:08", end: "10:29:28", slide: 36,
      label: "八周数字：一次 run 约 30 分钟",
      transcript: "I spent more or less eight weeks developing this. It's something that I use a lot to develop TV apps, and it takes more or less 30 minutes to do one run.",
      transcript_zh: "我前后花了大概八周开发它。这是我开发 TV 应用时用得很勤的工具，跑一次大概 30 分钟。",
      note: "RECEIPTS 页另有：58 次 run、467 个阶段会话、每次 $2–5、22 个 bug 换 22 条护栏、178 次提交；口头只报了三项（demo 那次成本约 $40，与页上均值口径不同）。"
    },
    {
      start: "10:29:31", end: "10:30:41", slide: 37,
      label: "五条配方：模板、小阶段、skills、验证、日志",
      transcript: "There are SDKs out there like Strands and others, but for your domain, these are the guidelines that I want to suggest. Start from a template or a code base you already have, instead of a prompt — the models are really good at understanding code, so if you already have something that follows best practices, start from that. Analyze and divide all the work into small phases. Use skills a lot — it's really easy to debug, and it's optimizing your context. Verify everything with static checks or unit tests — something super deterministic, so the agent can apply the results and be sure the result is deterministic. And log everything — it produces many lines of logs that sometimes I don't enjoy reading, but I pass them to another harness, another agent, to understand what's happening. Having as much information as possible is the best.",
      transcript_zh: "外面有 Strands 这些 SDK，但换到你的领域，我想给的是这几条建议。从模板或现成代码库出发，而不是从 prompt 出发——模型非常擅长读懂代码，如果你手上已经有符合最佳实践的东西，就从它开始。把全部工作分析、拆成小阶段。多用 skills——很好调试，也能优化上下文。用静态检查或单元测试验证一切，要那种完全确定性的东西，这样 agent 应用结果时能确信结果是确定的。还有，把一切都记日志——它产出的日志多到我有时不想读，但我会交给另一个 harness、另一个 agent 去理解发生了什么。信息越多越好。",
      note: "五步配方：Proven template / Small phases / Skills, not prompts / Verify mechanically / Log everything。"
    },
    {
      start: "10:30:48", end: "10:31:04", slide: 38,
      label: "收束：围绕领域难点建 harness",
      transcript: "So if you want to do it for your domain, put your knowledge of that domain into the skills — this is one of the most important things. And try to understand and implement the observability of it, so you try to control everything.",
      transcript_zh: "所以如果你想在自己的领域这么做，把你对那个领域的知识放进 skills——这是最重要的事情之一。然后试着去理解并实现它的可观察性，让你能掌控一切。",
      note: "三原则：控制流确定性 / 领域判断进 skills 与 tools / 验证与可观察性当产品功能做；开源仓库 github.com/giolaq/tv-build-harness。"
    },
    {
      start: "10:31:08", end: "10:31:45", slide: 39,
      label: "谢谢 & GitHub 二维码",
      transcript: "This is on my GitHub — there is the URL QR code. And more or less, so, this is it running: now it's doing the visual loop, automatically screenshotting everything and understanding if it's correct — like I can show you here, the first iteration of this run created an app like this. That's it — thank you.",
      transcript_zh: "项目在我的 GitHub 上——这里有 URL 二维码。差不多就是这样，它还在跑：现在做的是视觉循环，自动把所有页面截图并判断对不对——可以给你看，这次 run 的第一轮迭代生成的是这样一个应用。就到这里——谢谢大家。",
      note: "结尾切回 demo 看了一眼 visual loop 的截图分析后致谢；页上写着 questions welcome — the emulator is warm。"
    }
  ]
};
