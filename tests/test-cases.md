# Test Cases

## 会话测试

- 新建会话后出现在左侧列表。
- 切换会话后聊天流正确更新。
- 搜索关键词能过滤会话。
- 置顶会话排在列表顶部。
- 归档会话不影响历史数据。

## 单 Agent 测试

- 选择 Frontend Engineer 后发送需求。
- Agent 返回代码块或 Artifact。
- 追问时能带上上一轮上下文。

## 群聊测试

- `@Orchestrator` 后生成 Task Plan。
- Orchestrator 能依次调用 PM、Designer、Frontend、Reviewer。
- 最终回复包含聚合摘要。

## Artifact 测试

- HTML Artifact 能在右侧 Preview 展示。
- Diff 卡片能展示修改前后。
- 应用 Diff 后版本号增加。
- 下载源码能拿到最新内容。

## Trace 测试

- Trace 面板展示任务拆解。
- 每个 Agent 调用都有状态。
- 失败时记录错误和重试信息。

## 异常测试

- API Key 无效时切换 Mock 兜底。
- AI 调用超时时返回可读错误。
- Agent 返回空结果时 Orchestrator 给出降级说明。
- Artifact 生成失败时聊天流不崩溃。

