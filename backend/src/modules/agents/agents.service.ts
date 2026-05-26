import { Injectable, NotFoundException } from "@nestjs/common";
import type { AgentProfile } from "../../common/types/agent.types";

const builtinAgents: AgentProfile[] = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "orchestrator",
    description: "理解用户意图，拆解任务，分派 Agent 并聚合结果。",
    systemPrompt: "You are the lead orchestrator. Build a clear task plan and coordinate specialized agents.",
    capabilities: ["task-planning", "agent-routing", "trace"],
    provider: "mock",
    model: "mock-orchestrator",
    isBuiltin: true,
  },
  {
    id: "pm",
    name: "Product Manager",
    role: "product",
    description: "梳理需求、定义页面结构和验收标准。",
    systemPrompt: "You are a product manager. Clarify scope and produce practical product structure.",
    capabilities: ["spec", "scope", "acceptance"],
    provider: "mock",
    model: "mock-product",
    isBuiltin: true,
  },
  {
    id: "designer",
    name: "UI Designer",
    role: "design",
    description: "生成视觉方向、组件层级和交互建议。",
    systemPrompt: "You are a UI designer. Produce refined, demo-friendly interface guidance.",
    capabilities: ["layout", "visual-direction", "interaction"],
    provider: "mock",
    model: "mock-design",
    isBuiltin: true,
  },
  {
    id: "frontend",
    name: "Frontend Engineer",
    role: "frontend",
    description: "生成可预览的页面代码和前端组件。",
    systemPrompt: "You are a frontend engineer. Produce runnable code with clear structure.",
    capabilities: ["react", "html", "artifact"],
    provider: "mock",
    model: "mock-frontend",
    isBuiltin: true,
  },
  {
    id: "reviewer",
    name: "Code Reviewer",
    role: "review",
    description: "检查代码质量、风险和可演示稳定性。",
    systemPrompt: "You are a code reviewer. Find risks and propose focused diffs.",
    capabilities: ["review", "diff", "risk"],
    provider: "mock",
    model: "mock-review",
    isBuiltin: true,
  },
];

@Injectable()
export class AgentsService {
  findAll() {
    return builtinAgents;
  }

  findOne(id: string) {
    const agent = builtinAgents.find((item) => item.id === id);
    if (!agent) {
      throw new NotFoundException(`Agent ${id} not found`);
    }

    return agent;
  }
}

