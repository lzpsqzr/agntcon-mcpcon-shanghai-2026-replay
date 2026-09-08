// 场次注册表：每个 slug 对应同目录下的 <slug>-data.js（定义 window.talk）。
// 顺序即下拉框顺序；同一事件的场次按议程时间排。pages/speaker 供首页展示。
window.talks = [
  { group: "Day 2 · Hall 1", slug: "fc-sandbox",       label: "阿里云 FC Sandbox",                     speaker: "赵庆杰 · 阿里云",      pages: 21 },
  { group: "Day 2 · Hall 1", slug: "anika",            label: "Securing MCP Pipelines",                speaker: "Anika Tibrewal",       pages: 28 },
  { group: "Day 2 · Hall 1", slug: "gateway-identity", label: "MCP Gateway → Agent Identity",          speaker: "Yating Mou · 蚂蚁",    pages: 14 },
  { group: "Day 2 · Hall 1", slug: "crabrag",          label: "CrabRAG：图记忆而非更多 token",          speaker: "Stephen Chin · Neo4j", pages: 39 },
  { group: "Day 2 · Hall 1", slug: "agentic-os",       label: "Mission-Critical Agentic OS Runtime",   speaker: "刘超 · Process Mission", pages: 12 },
  { group: "Day 2 · Hall 2", slug: "tv-harness",       label: "I Taught an Agent to Build TV Apps",    speaker: "Giovanni Laquidara · Amazon", pages: 39 },
  { group: "Day 2 · Hall 2", slug: "voice-agents",     label: "Lost in Conversation（语音打断）",      speaker: "Irvin Cardoza",        pages: 19 },
  { group: "Day 2 · Hall 2", slug: "deerflow",         label: "DeerFlow 语义轨迹优化",                 speaker: "Willem Jiang · Nan Gao · 字节", pages: 19 },
  { group: "Day 2 · Hall 2", slug: "a2a-fleet",        label: "从单兵到军团：A2A 多智能体系统",        speaker: "Sylph Lin · Google Cloud", pages: 19 },
  { group: "Day 2 · Hall 2", slug: "coordination",     label: "Coordination Engineering",              speaker: "openJiuwen 社区",      pages: 21 },
  { group: "Day 2 · Hall 2", slug: "self-evolving",    label: "Reliable Self-Evolving Agent Skills",   speaker: "Subhro Das · Jayita B. · Domyn", pages: 16 },
  { group: "Day 2 · Hall 2", slug: "edge-cloud",       label: "边云端协同 AI 推理（Intel）",           speaker: "Shane Wang · Intel",   pages: 21 },
  { group: "Day 2 · Hall 2", slug: "context-graphs",   label: "Connecting the Dots with Context Graphs", speaker: "Stephen Chin · Neo4j", pages: 37 }
];
