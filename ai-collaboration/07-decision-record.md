# Decision Record

## ADR-001: 采用前后端分离架构

日期：2026-05-26

决策：采用 `frontend/` Next.js + `backend/` NestJS 的前后端分离结构。

原因：

- 架构表达更清晰，适合答辩讲解。
- 前后端职责边界明确，方便三人并行开发。
- 后端可以独立承载 AI Adapter、Orchestrator、Trace 和 Artifact 管理。

代价：

- 初期工程配置比全栈 Next.js 更重。
- 需要维护跨端类型和接口约定。

