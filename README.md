# AgentHub Studio

AgentHub Studio 是一个以 IM 聊天为核心入口的多 Agent 协作平台。用户可以像在飞书群聊里协作一样，创建会话、@ 不同 Agent、由 Orchestrator 拆解任务，并把代码、网页、Diff、部署状态等产物沉淀成可预览、可追踪、可复盘的 Artifact。

本仓库是 6.10 提交前的初始工程框架，重点先把团队协作边界、目录结构、启动方式和交付物位置固定下来。

## 项目结构

```text
AgentHub-Studio/
  frontend/            # 前端工作区：Next.js、工作台 UI、聊天流、Preview、Trace 面板
  backend/             # 后端工作区：NestJS、API、Prisma、Agent Adapter、Orchestrator
  docs/                # 产品文档、技术文档、API 文档、Demo 脚本
  ai-collaboration/    # AI 协作记录：rules、spec、prompt、debug log、decision record
  tests/               # 测试用例、E2E、API 测试集合
  demo/                # Demo 视频和截图素材
  docker-compose.yml   # 本地 PostgreSQL + Redis
  .env                 # 本地环境变量，不提交
  .env.example         # 协作者复制用的环境变量模板
```

## 三人开发区域

### A. 前端负责人

主要目录：`frontend/`

负责内容：

- 三栏工作台：左侧会话/Agent，中间聊天流，右侧 Preview/Trace。
- IM 聊天体验：新建会话、搜索、置顶、归档、消息气泡、Markdown、代码块。
- Agent 交互：`@Agent` 选择器、多 Agent 状态、Orchestrator 计划卡片。
- Artifact UI：代码卡片、HTML 预览卡片、Diff 卡片、部署状态卡片、文件卡片。
- Preview 工作台：iframe 预览、Monaco 代码展示、版本切换、全屏预览。

协作规则：

- 页面级代码放在 `frontend/src/app/`。
- 复用组件放在 `frontend/src/components/`，按 `chat`、`agent`、`artifact`、`preview`、`trace` 拆分。
- API 请求统一放在 `frontend/src/services/`。
- 前端类型统一放在 `frontend/src/types/`，不要在组件里重复声明接口。

### B. 后端 / AI 架构负责人

主要目录：`backend/`

负责内容：

- NestJS API：Conversation、Message、Agent、Artifact、Trace、Deployment。
- Prisma 数据模型：User、Agent、Conversation、Message、Artifact、ArtifactVersion、Trace。
- AI Adapter：OpenAI-compatible Adapter、Mock Adapter、Tool Adapter。
- Orchestrator：任务拆解、Agent 选择、顺序/并行调度、失败降级、结果聚合。
- 安全与稳定性：API Key 只留在后端，统一错误处理，Mock 模式可兜底演示。

协作规则：

- 业务模块放在 `backend/src/modules/<module-name>/`。
- 跨模块类型放在 `backend/src/common/types/`。
- Prisma Schema 放在 `backend/prisma/schema.prisma`。
- 所有 AI 调用必须经过 `ai-adapters`，不要散落在 Controller 或业务组件里。

### C. 测试 / 产品 / 文档 / 集成负责人

主要目录：`docs/`、`ai-collaboration/`、`tests/`、`demo/`

负责内容：

- 产品设计文档：`docs/product-design.md`
- 技术设计文档：`docs/technical-design.md`
- API 文档：`docs/api-documentation.md`
- 测试用例：`tests/test-cases.md`
- AI 协作记录：`ai-collaboration/`
- 3 分钟 Demo 脚本与素材：`docs/demo-script.md`、`demo/`

协作规则：

- 每天至少更新一次 `ai-collaboration/08-daily-log.md`。
- 每个关键 Prompt 记录到 `ai-collaboration/06-prompt-history.md`。
- 每个架构取舍记录到 `ai-collaboration/07-decision-record.md`。
- 6.8 起冻结新增功能，只补 Bug、文档和演示链路。

## 本地启动

首次拉取后：

```bash
corepack enable
corepack pnpm install
cp .env.example .env
docker compose up -d
corepack pnpm --filter @agenthub/backend prisma:generate
corepack pnpm --filter @agenthub/backend prisma:migrate
corepack pnpm dev
```

默认地址：

- 前端：http://localhost:3000
- 后端：http://localhost:3001/api
- PostgreSQL：localhost:5432
- Redis：localhost:6379

当前初始框架支持 Mock 模式。`AI_PROVIDER=mock` 时，即使没有真实 API Key，也能先开发 UI、Orchestrator 流程和演示脚本。

## 环境变量

`.env` 是本地文件，已经被 `.gitignore` 忽略，不要提交真实 Key。协作者只需要参考 `.env.example` 自行复制。

关键变量：

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | 前端访问后端 API 的地址 |
| `DATABASE_URL` | Prisma 连接 PostgreSQL |
| `REDIS_URL` | 后续 BullMQ / 缓存使用 |
| `AI_PROVIDER` | `mock` 或 `openai-compatible` |
| `OPENAI_API_KEY` | 比赛或模型供应商提供的 API Key |
| `OPENAI_BASE_URL` | OpenAI-compatible API Base URL |
| `OPENAI_MODEL` | 默认模型名 |

## Git 协作

推荐分支：

```text
main                       # 稳定可演示版本
dev                        # 日常集成版本
feature/frontend-chat
feature/backend-agent
feature/orchestrator
feature/artifact-preview
feature/trace-report
```

提交规范：

```text
feat: add agent selector
fix: handle stream timeout fallback
docs: update technical design
test: add artifact preview cases
refactor: extract agent adapter
```

建议每天晚上合并一次到 `dev`，每两天挑稳定版本合并到 `main`。合并前至少确认：

- 前端页面能打开。
- 后端 API 能启动。
- `.env` 没有被提交。
- AI 协作记录当天有更新。

## P0 验收链路

6.8 前优先跑通这条稳定 Demo 链路：

1. 新建群聊会话。
2. 输入网页生成需求并 @ Orchestrator。
3. Orchestrator 拆解任务并分派 PM、UI Designer、Frontend Engineer、Code Reviewer。
4. 多个 Agent 依次回复。
5. 生成 HTML Artifact 并在右侧 iframe 预览。
6. 用户要求局部修改，系统生成 Diff。
7. 应用 Diff 后产生新版本。
8. 点击部署，显示部署状态卡片。
9. 打开 Trace 面板查看完整调用链。
10. 导出 AI 协作报告。

## 当前优先级

第一优先级：多 Agent 协作链路真实跑通。  
第二优先级：Artifact 预览、Diff、版本历史做得稳定好看。  
第三优先级：AI Trace 和协作记录完整，能服务答辩。  
第四优先级：README、产品文档、技术文档、Demo 视频专业完整。
