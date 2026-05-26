import { apiClient } from "./api-client";
import type { OrchestratorRunResponse } from "./orchestrator-response";

interface RunOrchestratorInput {
  task: string;
  conversationId: string;
  agentIds: string[];
}

export function runOrchestrator(input: RunOrchestratorInput) {
  return apiClient<OrchestratorRunResponse>("/orchestrator/run", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

