import { Injectable } from "@nestjs/common";
import { AgentsService } from "../agents/agents.service";
import { MockAgentAdapter } from "../ai-adapters/mock-agent.adapter";

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly agentsService: AgentsService,
    private readonly mockAgentAdapter: MockAgentAdapter,
  ) {}

  createPlan(input: { task: string; conversationId: string; agentIds?: string[] }) {
    const agentIds = input.agentIds?.length ? input.agentIds : ["pm", "designer", "frontend", "reviewer"];

    return {
      conversationId: input.conversationId,
      task: input.task,
      mode: "sequential",
      steps: agentIds.map((agentId, index) => ({
        order: index + 1,
        agentId,
        objective: this.describeObjective(agentId),
      })),
    };
  }

  async run(input: { task: string; conversationId: string; agentIds?: string[] }) {
    const plan = this.createPlan(input);
    const outputs = [];

    for (const step of plan.steps) {
      const agent = this.agentsService.findOne(step.agentId);
      const output = await this.mockAgentAdapter.generate({
        task: input.task,
        conversationId: input.conversationId,
        context: [],
        agent,
      });
      outputs.push({ step, output });
    }

    return {
      plan,
      outputs,
      summary: "Mock Orchestrator 已完成顺序调度。下一步接入 OpenAI-compatible Adapter 和 Trace 持久化。",
    };
  }

  private describeObjective(agentId: string) {
    const objectives: Record<string, string> = {
      pm: "澄清需求、输出页面结构和验收标准",
      designer: "输出视觉方向、布局和交互建议",
      frontend: "生成可预览 Artifact",
      reviewer: "审查代码并给出 Diff 修改建议",
      deploy: "生成部署状态和预览链接",
    };

    return objectives[agentId] ?? "完成指定 Agent 子任务";
  }
}

