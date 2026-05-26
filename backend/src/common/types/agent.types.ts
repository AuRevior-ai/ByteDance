export type AgentRole =
  | "orchestrator"
  | "product"
  | "design"
  | "frontend"
  | "review"
  | "deploy"
  | "docs";

export interface AgentProfile {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  provider: "mock" | "openai-compatible" | "tool";
  model: string;
  isBuiltin: boolean;
}

export interface AgentInput {
  task: string;
  conversationId: string;
  context: string[];
  agent: AgentProfile;
}

export interface AgentOutput {
  agentId: string;
  content: string;
  artifacts?: Array<{
    type: "code" | "html" | "diff" | "document" | "deployment" | "file";
    title: string;
    content: string;
  }>;
}

