export type AgentRole =
  | "orchestrator"
  | "product"
  | "design"
  | "frontend"
  | "review"
  | "deploy"
  | "docs";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  capabilities: string[];
  status: "idle" | "thinking" | "running" | "done" | "failed";
}

