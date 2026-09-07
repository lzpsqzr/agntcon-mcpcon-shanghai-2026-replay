window.talk = {
  title: "From MCP Gateway to Agent Identity: Building Enterprise-Grade Access Infrastructure for AI Agents",
  speaker: "Yating Mou · 蚂蚁集团",
  event: "AGNTCON + MCPCON China 2026 · Day 2 · Hall 1",
  pdf: "pdfs/gateway-identity.pdf",
  assets: "assets/gateway-identity",
  source: "EWFH-7055-transcript.txt",
  cues: [
    {
      start: "11:10:25", end: "11:10:27", slide: 1,
      label: "标题页：从 MCP Gateway 到 Agent Identity",
      transcript: "From MCP gateway to agent identity — building an enterprise-grade agent access infrastructure.",
      transcript_zh: "从 MCP Gateway 到 Agent Identity——为企业级 agent 搭建访问基础设施。",
      note: "开场即念标题；字幕前两行（“Xiao. Hongcai.” / “La”）为问候的转写碎片，未收入正文。"
    },
    {
      start: "11:10:48", end: "11:11:12", slide: 2,
      label: "网关团队：从 API 网关到 Agent 基础设施",
      transcript: "First, let me introduce our team. I'm a member of the gateway team, and my colleagues are here today as well. Our team primarily develops traditional API gateways, and in the past two years we have also built AI-infrastructure products: the MCP gateway, agent registry, agent gateway, agent authentication, and sandbox outbound proxy. I'll adjust the sharing order a bit — I'll start with agent authentication and introduce the MCP gateway last.",
      transcript_zh: "先介绍一下我们的团队：我来自网关团队，今天团队的其他同事也在现场。我们主要做传统 API 网关，过去两年也做了一些 AI 基础设施产品，包括 MCP Gateway、Agent Registry、Agent Gateway、Agent 身份认证，以及 Sandbox 出网代理。分享顺序我稍作调整：先讲 Agent 身份认证，MCP Gateway 放到最后。",
      note: "Wordly 将所属团队转写为 “Xiaohongshu gateway team”，与场次信息（蚂蚁集团网关团队）不符，疑为转写误差，正文按“网关团队”保留；讲者在此预告 MCP Gateway 留到最后讲。"
    },
    {
      start: "11:11:31", end: "11:11:52", slide: 3,
      label: "核心问题：这次调用究竟是谁发起的",
      transcript: "Whether you're in a technical or a non-technical role, the frequency of using and creating agents has increased significantly this year — which raises a question: who exactly participated in and initiated this call? We often get requests from business colleagues. Some say, 'This interface is very important — I don't want users calling it through an agent. Can you intercept those requests?' Others ask, 'What percentage of my interface is currently called by an agent versus through my system?'",
      transcript_zh: "无论技术还是非技术岗位，今年大家使用和创建 agent 的频率都显著提高了，这就带来一个问题：这次调用到底是谁参与、谁发起的？我们经常收到业务同学的两类诉求：有人说“这个接口很重要，我不想让用户通过 agent 调它，能不能拦下来”；也有人问“我的接口现在有多大比例是被 agent 调的、多大比例走我自己的系统”。",
      note: "两类业务诉求（拦截 agent 调用、统计 agent 调用占比）正是本页 Subject = User / Actor = Agent 拆分的动机。"
    },
    {
      start: "11:12:10", end: "11:12:20", slide: 4,
      label: "WHY NOW：身份链断裂的三大痛点",
      transcript: "These control and auditing requirements all point to the indispensability of agent identity. On the other hand, agents often hold tokens or long-term API keys, which leads to issues like amplified privileges and difficulty managing their lifecycle.",
      transcript_zh: "这些管控和审计诉求都指向一件事：agent 身份不可或缺。另一方面，agent 往往持有 token 或长期 API key，会带来权限放大、生命周期难管理等问题。",
      note: "本页三张卡片（Identity Loss / Privilege Amplification / Audit Gaps）现场未逐卡讲解，要点并入上一页的业务诉求陈述；11:12:20 起约 20 秒在切换带中文标注的 PPT 版本，未收录。"
    },
    {
      start: "11:12:41", end: "11:13:11", slide: 5,
      label: "场景：用户下发任务，agent 规划外呼",
      transcript: "I referenced the protocol framework and designed a unified identity authentication system to manage inbound and outbound access by agents. Let's use a familiar scenario as an example: the user sends a task to the agent; after receiving the task, the agent starts planning and generates a series of requests to call external resources. For inbound control, the user completes the login process.",
      transcript_zh: "我们参考协议框架设计了一套统一的身份认证体系，管理 agent 的入站与出站访问。用一个熟悉的场景举例：用户把任务下发给 agent；agent 收到任务后开始规划，产生一系列调用外部资源的请求。入站控制这边，用户先完成登录。",
      note: "11:12:41–11:12:43 两行为改口碎片（“in this scenario, we / I referenced it”），已并入首句；切换 PPT 后从本页重新进入正题。"
    },
    {
      start: "11:13:25", end: "11:13:55", slide: 5,
      label: "入站验用户身份，出站携带双主体",
      transcript: "After obtaining the user's identity, we verify whether the user has permission to access the agent; for requests that pass verification, we inject both the user's identity and the agent's identity into the agent's context. In the outbound part, once the agent receives a task, we expect it to carry both the agent's and the user's identities when requesting other resources — outbound calls let us enforce permission control based on the agent's identity at the egress.",
      transcript_zh: "拿到用户身份后，先校验用户是否有权限访问这个 agent；校验通过的请求，我们会把用户身份和 agent 身份一并注入 agent 的上下文。出站这边，agent 接到任务后去请求其他资源时，我们期望它同时携带 agent 身份和用户身份——这样出站调用就能在出网处基于 agent 身份做权限管控。",
      note: "对应本页 Inbound Authorization 与 Outbound Authorization 两条泳道；双主体 User + Agent 上下文贯穿整条调用链。"
    },
    {
      start: "11:14:11", end: "11:14:15", slide: 6,
      label: "四块工作：从身份载体到最小权限",
      transcript: "I've divided our work into four parts: first, the unified identity carrier based on JWT; second, the registration of agent identity; third, token acquisition and refresh; and fourth, minimum access permissions.",
      transcript_zh: "我们的工作分成四部分：第一，基于 JWT 的统一身份载体；第二，agent 身份的注册；第三，token 的获取与刷新；第四，最小访问权限。",
      note: "本页为全篇路线图，现场一句话带出四部分，后续第 7–11 页依次展开。"
    },
    {
      start: "11:14:29", end: "11:15:05", slide: 7,
      label: "JWT 载体：主体、agent、资源三概念",
      transcript: "The carrier of unified identity is JWT — we chose the JWT-based form, which means the payload is transparent. In a single call there are three concepts. First, the subject: in the scenario we just described it is the user; if the initiator doesn't involve a user — say, a scheduled task — it can be an agent. Then the agent is of course an agent. Finally, the resource: it can be an API, an MCP, or even an agent.",
      transcript_zh: "统一身份的载体是 JWT——我们选 JWT 这种形态，意味着 payload 是透明的。单次调用里有三个概念：首先是主体（subject），在刚才的场景里就是用户；如果某次调用的发起方不涉及用户，比如定时任务，那也可以是一个 agent。中间的 agent 自然就是 agent。最后是资源，资源可以是 API、MCP，甚至是另一个 agent。",
      note: "对应本页 Claim Sources：Business / Consumer / Employee 三类身份来源进 sub。"
    },
    {
      start: "11:15:15", end: "11:15:45", slide: 7,
      label: "委托链嵌套与 RFC 8693 token exchange",
      transcript: "In this example we include the fields we're most interested in: the subject, and the delegation chain. If the delegation chain is long — the user goes through this agent, which calls another agent, and finally generates an outbound call to external resources — that's the nested case: RFC 8693 defines token exchange in a nested manner.",
      transcript_zh: "示例里放的是我们最关心的字段：主体，以及委托链。如果委托链比较长——用户经过这个 agent，再调用另一个 agent，最后产生一次访问外部资源的出站调用——就出现了嵌套的情形：RFC 8693 定义的正是嵌套方式的 token exchange。",
      note: "act 的嵌套写法（agent:cube 内再嵌 agent:edith）即这条委托链的 token 表达。"
    },
    {
      start: "11:16:06", end: "11:16:30", slide: 7,
      label: "sub 命名空间与权限不入 token",
      transcript: "Within an enterprise there are often many different identity systems, so in the design of the sub we added a namespace — the prefix in this example: 'euser' represents the company's internal employee management system. And we deliberately did not put the scope — the permissions part — in this identity token; we want it to be dynamic.",
      transcript_zh: "企业内部往往有很多套身份体系，所以我们在 sub 的设计里加了命名空间，也就是示例里的前缀：比如 euser 代表公司内部的员工身份系统。另外我们刻意没有把 scope（权限部分）放进这个身份 token——我们希望它是动态的。",
      note: "Wordly 将 scope 转写为 “scoop”，已更正；11:16:06 首句“委托链后面详讲”为过渡句，未收入；本页示例 sub 为 euser:martina。"
    },
    {
      start: "11:16:47", end: "11:17:18", slide: 8,
      label: "网关在协议边界重建可信上下文",
      transcript: "And this diagram shows more clearly how the gateway rebuilds the delegation-chain context. In the first example, the user goes through the existing, robust authentication system and the gateway obtains the identity; it then puts the user's identity and the agent Edith into this carrier. If Edith needs to access another agent, Cube, another round of context reconstruction occurs — you'll see this nesting.",
      transcript_zh: "这张图更清楚地展示了网关如何重建委托链上下文。第一个例子里，用户走完既有的、成熟的认证体系，网关拿到身份后，把用户身份和它要访问的 agent Edith 放进这个载体。如果 Edith 还要访问另一个 agent Cube，就会再发生一轮上下文重建——你会看到这种嵌套。",
      note: "Wordly 将 Edith 转写为 “Elise”，已按 deck 更正；本页左侧 token 为 sub: euser:martina + act: agent:edith，右侧为 sub: agent:cube 内嵌 act: agent:edith。"
    },
    {
      start: "11:17:32", end: "11:18:00", slide: 8,
      label: "嵌套只看最外层：资源的上一跳",
      transcript: "This nesting design has one point — its outermost layer: the previous link of the accessed resource. I think this design is quite reasonable: at this stage we care more about who was the immediate caller of the resource; if we later have finer-grained control needs over the whole delegation chain, we can analyze further based on this.",
      transcript_zh: "这种嵌套设计有一个要点：最外层就是被访问资源的上一跳。我认为这个设计比较合理——现阶段我们更关心资源的上一个调用方是谁；以后如果要对整条委托链做更精细的管控，也可以在此基础上进一步分析。",
      note: "对应本页结论：网关在协议边界 Verify + Rebuild，旧服务无需理解 Agent 协议。"
    },
    {
      start: "11:18:19", end: "11:18:51", slide: 9,
      label: "注册即取证：平台托管自动注册",
      transcript: "The second part is agent identity registration. It's different from service-discovery registration — it doesn't register the IP address. Its purpose is to let the agent obtain a token to prove its identity, or issue its own identity token, and we then manage permissions for that identity. The first path: the agent is deployed through the company's internal standard agent platform — we integrate with that platform, the agent registers automatically, and we inject the credentials into its instance.",
      transcript_zh: "第二部分是 agent 身份注册。它和服务发现的注册不同——不注册 IP 地址，目的是让 agent 拿到能证明身份的 token，或者说能签发自己的身份 token，我们再对这个身份做权限管理。第一种方式：agent 通过公司内部标准 agent 平台部署，我们与平台对接，agent 自动完成注册，我们把凭证注入它的实例。",
      note: "Path A：平台托管 · Auto-Register · 注入 Identity JWT。"
    },
    {
      start: "11:19:06", end: "11:19:13", slide: 9,
      label: "自管 agent：公钥注册私钥不出域",
      transcript: "For agents deployed in non-standard ways — say you want to run an agent locally — we provide public-key registration: you keep your private key and register the public key on the platform; then the agent can issue a token that represents its legitimate identity.",
      transcript_zh: "对以非标准方式部署的 agent——比如你想在本地跑一个——我们提供公钥注册的方式：私钥自己保留，把公钥注册到平台上，之后 agent 就能签发代表其合法身份的 token。",
      note: "Path B：开发者自管 · 注册 Public JWK · private_key_jwt，私钥始终留在 agent 环境内。"
    },
    {
      start: "11:19:35", end: "11:20:02", slide: 10,
      label: "取 token：网关代理与自发登录两路",
      transcript: "The third part is obtaining and refreshing tokens. If the token doesn't carry user authorization — it only represents the agent's identity — we've just covered how to obtain it with those two methods. If it does carry user authorization, there are two types: an agent proxied by the gateway can obtain it within a specific request; an agent not proxied by the gateway must launch the login page itself and present its identity credentials, such as an authorization code, to obtain the unified identity certificate issued by the platform.",
      transcript_zh: "第三部分是 token 的获取与刷新。如果 token 不携带用户授权、只代表 agent 身份，获取方式刚才讲过了，就是那两种。那如果 token 携带用户授权呢？这里有两类：由网关代理的 agent，可以在具体请求中直接获取；不经网关代理的 agent，则要自己拉起登录页，带上 authorization code 之类的身份凭证，去换取平台签发的统一身份凭证。",
      note: "对应本页 Path 1 Gateway-Managed（读取网关注入的信任请求头）与 Path 2 Token Exchange API。"
    },
    {
      start: "11:20:09", end: "11:20:31", slide: 10,
      label: "刷新即校验：委托状态实时查询",
      transcript: "On refresh, the agent presents the expired credentials together with its own identity verification to obtain new credentials. Why don't we set an expiration restriction here? Mainly because even when the token is intact, we still dynamically query whether the user delegation actually holds — so we don't restrict it for now.",
      transcript_zh: "刷新时，agent 拿着过期的凭证，加上自己的身份证明，去换新的凭证。为什么这里不设有效期限制？主要因为即使凭证完好，我们也会动态查询用户委托是否实际生效，所以这里暂时不做限制。",
      note: "对应 Path 3 Refresh with Live Delegation Check：单凭一个过期的 JWT 永远不够，委托状态实时核验。"
    },
    {
      start: "11:20:40", end: "11:20:56", slide: 11,
      label: "最小权限 = 用户权限 ∩ agent 权限",
      transcript: "The fourth part is minimum access permissions. When we perform outbound verification on the agent, we take the intersection of the user's original permissions and the agent's permissions — the focus is on the agent's permissions.",
      transcript_zh: "第四部分是最小访问权限。对 agent 做出站校验时，我们取用户原有权限与 agent 权限的交集——重点在 agent 的权限上。",
      note: "本页主公式：Effective Permissions = Agent Permissions ∩ User Permissions。"
    },
    {
      start: "11:21:02", end: "11:21:52", slide: 11,
      label: "双策略：资源 owner 预授权 / 用户授权",
      transcript: "We've divided this into two strategies, depending on how the resource owner manages the resource. The first: the resource requires pre-authorization by the agent — the agent must obtain the owner's consent before it can access the resource. The second: the agent must obtain the user's consent before it can access the resource on the user's behalf. You can require only one, only the other, or both combined, depending on the importance of the resource.",
      transcript_zh: "我们分成两种策略，取决于资源归属方如何管理资源。第一种：资源要求 agent 预先授权，即 agent 必须先取得资源 owner 的同意才能访问；第二种：agent 要先获得用户授权、取得用户同意，才能代表用户访问。可以只选其中一种，也可以两种叠加，视资源的重要程度而定。",
      note: "Wordly 将 resource owner 转写为 “honor of the resource”，已按语义更正；两种策略可单选或叠加，对应资源 owner 审批与 User Delegation 两条线。"
    },
    {
      start: "11:22:18", end: "11:22:33", slide: 11,
      label: "Cedar 策略：审批后下发网关集群",
      transcript: "For the pre-authorization part we have a management backend: the agent's manager applies on the platform for the permissions to access a resource; once approvals are granted, we generate the corresponding control policy for that resource — at the underlying layer we use Cedar policy, chosen because its conditions are more flexible, and if we later want RBAC or ABAC extensions we can build on it. The policy is then distributed to the gateway cluster where the resource resides.",
      transcript_zh: "预授权这部分我们有管理后台：agent 的管理者在平台上申请访问某个资源所需的权限，审批通过后，我们为该资源生成相应的管控策略——底层用的是 Cedar 策略，选它是因为条件表达更灵活，以后要做 RBAC 或 ABAC 的扩展也有基础。策略随后下发到资源所在的网关集群。",
      note: "Wordly 将 Cedar 转写为 “seed policy”、ABAC 为 “ABAAC”，已按 deck 更正；对应本页控制面四步（申请 → 审批 → 编译 Cedar 规则 → 下发）。"
    },
    {
      start: "11:22:45", end: "11:22:45", slide: 12,
      label: "交付路径：从可达到可管",
      transcript: "That concludes the introduction to agent authentication. Our goal now is to move from simply being accessible to being governable.",
      transcript_zh: "Agent 身份认证部分就介绍到这里。我们的目标是让大家从“可达”走向“可管”。",
      note: "本页五个 Unified（入口 / 身份 / 授权 / 动态策略 / 审计）现场未逐项讲解，一句话带过；本 cue 仅一句，起止同秒。"
    },
    {
      start: "11:22:59", end: "11:23:12", slide: 13,
      label: "三要点：独立 actor、短时身份、网关桥接",
      transcript: "To summarize in three points. First, an agent is an independent actor — it is neither a container for the user token nor an unlimited extension of the user's permissions. Second, put identity into short-term proofs and keep permissions dynamic — revocable and auditable. Third, the gateway acts as the medium connecting the new and the existing worlds, forming an end-to-end chain of trust.",
      transcript_zh: "总结三点。第一，agent 是一个独立的 actor——它既不是用户 token 的容器，也不是用户权限的无限延伸。第二，把身份放进短期证明里，让权限保持动态、可撤销、可审计。第三，网关承担连接新旧世界的媒介，形成端到端的信任链。",
      note: "Wordly 对第一点的转写夹有口误碎片（“top AA … an independent action”），已按 deck 更正为 An Agent Is an Independent Actor。"
    },
    {
      start: "11:23:28", end: "11:23:48", slide: 12,
      label: "补讲 MCP Gateway：协议卸载保持无状态",
      transcript: "Finally, the MCP gateway part — since there have been quite a few presentations on this topic already, I'll keep it brief. We already have a lot of RPC and HTTP services internally, so the MCP gateway mainly handles the offloading of the MCP protocol, while maintaining the stateless characteristics of a traditional API gateway.",
      transcript_zh: "最后简单讲讲 MCP Gateway——这个话题前面的分享已经很多了，我就简短带过。因为内部已经有大量 RPC 和 HTTP 服务，MCP Gateway 主要做 MCP 协议的卸载，整体上保持传统 API 网关的无状态特性。",
      note: "MCP Gateway 的展开在发布的 14 页 PDF 中没有对应页（现场另翻了产品页），按“从连通到治理”主题归入第 12 页，时间上位于 Takeaways 之后；Wordly 将 RPC/HTTP 转写为 “IPC and HTP”，已按语义更正。"
    },
    {
      start: "11:24:04", end: "11:24:38", slide: 12,
      label: "MCP Gateway：URL、版本、托管、限流",
      transcript: "From the user's perspective, each MCP server has its own unique URL, and the gateway ensures compatibility with different versions of the MCP protocol; we also support hosting stdio servers as remote servers. We additionally provide an MCP tool that searches for other tools and returns a top-K list of related tools. In terms of functionality we support robust multi-dimensional rate limiting for access, multi-version release management, and observability.",
      transcript_zh: "从用户视角看，每个 MCP server 都有自己唯一的 URL，网关负责兼容不同版本的 MCP 协议；我们也支持把 stdio 的 server 托管成远程服务。另外还提供了一个 MCP 工具，用来检索其他工具，返回 top-K 的相关工具列表。功能上支持多维度的访问限流、多版本发布管理和可观测能力。",
      note: "同上归第 12 页；限流 / 多版本发布 / 可观测即网关“治理”面；11:24:32 的碎片句（“version released”）为翻页口癖，未收录。"
    },
    {
      start: "11:24:47", end: "11:24:47", slide: 14,
      label: "Q&A：可归因、有界、可撤销、可审计",
      transcript: "OK, that's all for my sharing. Are there any questions?",
      transcript_zh: "好，我的分享就到这里，大家有什么问题吗？",
      note: "仅收录收尾句，现场问答与寒暄不收；本页口号 Every agent action should be attributable, bounded, revocable and auditable。"
    }
  ]
};
