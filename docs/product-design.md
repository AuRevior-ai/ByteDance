# 产品设计文档

## 项目定位

AgentHub Studio 是一个 IM 式多 Agent 协作平台。用户通过单聊或群聊方式调用不同 AI Agent，由 Orchestrator 拆解复杂任务，并把 Agent 回复沉淀成可预览、可编辑、可部署、可追踪的 Artifact。

## 目标用户

- 希望快速生成网页、代码、文档等产物的学生开发者。
- 希望用 AI 协作方式完成课程设计、比赛 Demo 和作品集的团队。
- 需要复盘 AI 协作过程、沉淀 Prompt 与规则的项目小组。

## P0 功能

- IM 聊天主界面：会话列表、单聊、群聊、消息流、输入框。
- Agent 系统：内置 Agent、自建 Agent、能力标签、System Prompt。
- Orchestrator：任务拆解、Agent 分派、结果聚合、失败降级。
- Artifact：代码、HTML、Diff、文档、部署状态卡片。
- Preview：右侧 iframe 预览、代码查看、版本切换。
- Trace：任务计划、Agent 调用链路、Prompt 摘要、耗时和状态。

## 核心 Demo 任务

帮我生成一个 AI 简历作品集网页，要求深色高级风格，包含个人介绍、项目展示、技能标签和联系方式。请让产品经理先规划结构，UI 设计师给出视觉方案，前端工程师生成代码，代码审查员检查并优化，最后部署成可预览页面。

