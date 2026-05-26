# Orchestrator Skill

## 初版调度流程

```text
用户任务
  -> 读取会话上下文和 Pin 消息
  -> 生成 Task Plan
  -> 选择 Agent
  -> 顺序调用 Agent
  -> 收集输出和 Artifact
  -> 写入 Trace
  -> 聚合最终回复
```

## 默认 Agent 顺序

1. Product Manager
2. UI Designer
3. Frontend Engineer
4. Code Reviewer
5. Deploy Agent

