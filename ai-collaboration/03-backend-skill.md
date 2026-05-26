# Backend Skill

## 后端协作约定

- Controller 只处理入参和返回，不写复杂业务逻辑。
- Agent 调用只经过 `ai-adapters`。
- Orchestrator 负责计划、路由、聚合和 Trace。
- Demo 期间必须保留 Mock 模式兜底。
- API Key 只从后端环境变量读取，不透传前端。

