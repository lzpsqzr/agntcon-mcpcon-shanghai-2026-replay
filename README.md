# Slides × Transcript

线上地址：<https://lzpsqzr.github.io/agntcon-mcpcon-shanghai-2026-replay/>

一个无构建步骤的静态原型：左半是预渲染的 slide 图片，右半是字幕卡片；点击卡片切换到对应 slide，可全文搜索、字幕中英切换、方向键翻条目。使用图片而非内嵌 PDF，是为了避免不同浏览器的 PDF 查看器忽略页码切换。

启动方式：

```sh
cd /Users/gogo/Projects/meeting-notes
python3 -m http.server 8000
```

在浏览器打开 <http://localhost:8000/slides-demo/>，右上角下拉框切换场次。

## 收录场次（13 场）

| 分组 | slug | 场次 | 页数 |
| ---- | ---- | ---- | ---- |
| Day 2 · Hall 1 | `fc-sandbox` | 阿里云 FC Sandbox：From MCP Tools to Managed Agents（赵庆杰） | 21 |
| Day 2 · Hall 1 | `anika` | Securing MCP Pipelines（Anika Tibrewal） | 28 |
| Day 2 · Hall 1 | `gateway-identity` | 蚂蚁：From MCP Gateway to Agent Identity（Yating Mou） | 14 |
| Day 2 · Hall 1 | `crabrag` | CrabRAG：图记忆而非更多 token（Stephen Chin · Neo4j） | 39 |
| Day 2 · Hall 1 | `agentic-os` | Mission-Critical Agentic OS Runtime（刘超） | 12 |
| Day 2 · Hall 2 | `tv-harness` | TV App Coding Harness（Amazon） | 39 |
| Day 2 · Hall 2 | `voice-agents` | Lost in Conversation：语音 agent 的打断难题（Irvin Cardoza） | 19 |
| Day 2 · Hall 2 | `deerflow` | DeerFlow：From Token Explosion to Semantic Trajectories（Willem Jiang 等） | 19 |
| Day 2 · Hall 2 | `a2a-fleet` | 从单兵到军团：A2A 多智能体分布式系统（Sylph Lin · Google Cloud） | 19 |
| Day 2 · Hall 2 | `coordination` | Coordination Engineering：多 agent 协同工程（openJiuwen 社区） | 21 |
| Day 2 · Hall 2 | `self-evolving` | How We Built Reliable Self-Evolving Agent Skills（Jayita B.） | 16 |
| Day 2 · Hall 2 | `edge-cloud` | 边云端协同 AI 推理的分布式编排（Shane Wang · Intel） | 21 |
| Day 2 · Hall 2 | `context-graphs` | Connecting the Dots with Context Graphs（Stephen Chin） | 37 |

字幕来源：Day 2 Hall 1 = `EWFH-7055-transcript.txt`，Day 2 Hall 2 = `USAR-0989-transcript.txt`（均为 Wordly 现场转写；中文讲者的场次是 Wordly 的英文译文）。`mcp-summit-slides` 只收了 Day 2 的官方 PDF，Day 1（AgentCon keynotes）没有对应 deck，未收录。

## 数据结构

- `index.html`：首页——现场照片、参会体会（"驯服时刻"）、四个词观察、13 场回放入口。
- `player.html`：回放器（slide × 字幕对照）。
- `data.js`：场次注册表（slug → 下拉框/首页卡片）。加新场次 = 渲染 slide 图 + 新建 `<slug>-data.js` + 复制 PDF 到 `pdfs/` + 注册一行。
- `<slug>-data.js`：每场一个 `window.talk`，`cues` 数组每条含 `start`/`end`（字幕时间戳）、`slide`（页码）、`label`（中文概括）、`transcript`（原声清理版）、`transcript_zh`（中文译文）、`note`（编辑注释：跳页说明、Wordly 转写勘误等）。
- `assets/<slug>/slide-NN.jpg`：`pdftoppm -jpeg -scale-to 1280` 预渲染。
- `pdfs/<slug>.pdf`：该场官方 deck（发布到 GitHub Pages 用，仓库自包含）。
- `field-photos/`：现场照片（首页照片墙）。

## 已知边界

- Day 2 的 Himanshu 供应链审计、Stop Embedding Your Database、腾讯 Cube Sandbox、阶跃星辰智能路由四场没有官方 PDF，未收录。
- `mcp-summit-slides` 里有三对重复文件（`jayita-digital-credentials.pdf` 实为 self-evolving deck、`shane-wang-edge-cloud.pdf` 与 `distributed-orchestration.pdf` 重复、`a2a-from-solo-to-fleet.pdf` 与 `congbill-to-fleet-a2a.pdf` 重复），各只做了一份。
- 现场跳过/快速翻过的页也有 cue，但 note 里注明了"现场未逐页讲解"；讲者口头引用、deck 里没有的数字也在 note 标注。

## 下一步（可选）

- 从 JSONL 自动提取字幕，替代手工切时间窗。
- "拖拽校准页码"的编辑界面。
