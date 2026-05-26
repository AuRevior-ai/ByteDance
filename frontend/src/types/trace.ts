export interface TraceStep {
  id: string;
  agentName: string;
  title: string;
  status: "pending" | "running" | "success" | "failed";
  durationMs?: number;
  summary: string;
}

export interface Trace {
  id: string;
  conversationId: string;
  task: string;
  status: "running" | "success" | "failed";
  steps: TraceStep[];
}

