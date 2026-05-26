# 技术设计文档

## 总体架构

```text
User
  -> Frontend Workspace (Next.js)
  -> Backend API (NestJS)
  -> Orchestrator Service
  -> Agent Router
  -> Agent Adapter (mock / openai-compatible / tool)
  -> Artifact + Trace persistence (Prisma + PostgreSQL)
```

## 技术栈

- 前端：Next.js、React、TypeScript、Tailwind CSS、Zustand、React Query。
- 后端：NestJS、TypeScript、Prisma、PostgreSQL、Redis。
- AI：OpenAI-compatible API Adapter + Mock Adapter。
- 测试：Vitest、Playwright、API 测试集合。

## 模块边界

- `conversations`：会话创建、搜索、置顶、归档。
- `messages`：消息保存、上下文拼接、重新生成。
- `agents`：Agent 列表、自建 Agent、能力标签。
- `orchestrator`：任务拆解、调度、聚合、失败降级。
- `ai-adapters`：统一模型或工具调用接口。
- `artifacts`：产物创建、编辑、预览、导出。
- `versions`：Artifact 版本历史。
- `deployments`：模拟或真实部署状态。
- `traces`：AI 调用链路、Prompt 摘要、耗时、错误。

## 第一阶段落地

先用 Mock Adapter 跑通端到端链路，再替换为 OpenAI-compatible Adapter。这样可以保证 Demo 不依赖外部 API 稳定性。

