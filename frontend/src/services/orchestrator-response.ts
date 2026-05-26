import type { Artifact, ArtifactType } from "@/types/artifact";
import type { Message } from "@/types/message";
import type { Trace } from "@/types/trace";

export interface OrchestratorPlanStep {
  order: number;
  agentId: string;
  objective: string;
}

export interface OrchestratorRunResponse {
  plan: {
    conversationId: string;
    task: string;
    mode: "sequential" | "parallel";
    steps: OrchestratorPlanStep[];
  };
  outputs: Array<{
    step: OrchestratorPlanStep;
    output: {
      agentId: string;
      content: string;
      artifacts?: Array<{
        type: ArtifactType;
        title: string;
        content: string;
      }>;
    };
  }>;
  summary: string;
}

interface MapOptions {
  conversationId: string;
  timestamp: string;
}

export function mapOrchestratorRunToWorkspaceUpdates(response: OrchestratorRunResponse, options: MapOptions) {
  const messages: Message[] = response.outputs.map(({ step, output }) => ({
    id: `${options.conversationId}-${output.agentId}-${step.order}`,
    conversationId: options.conversationId,
    role: "agent",
    agentId: output.agentId,
    content: output.content,
    type: output.artifacts?.length ? "artifact" : "text",
    artifacts: output.artifacts?.map<Artifact>((artifact, artifactIndex) => ({
      id: `${options.conversationId}-${output.agentId}-${step.order}-${artifactIndex}`,
      title: artifact.title,
      type: artifact.type,
      content: artifact.content,
      language: artifact.type === "html" ? "html" : undefined,
      currentVersion: 1,
    })),
    createdAt: options.timestamp,
  }));

  messages.push({
    id: `${options.conversationId}-orchestrator-summary-${Date.now()}`,
    conversationId: options.conversationId,
    role: "agent",
    agentId: "orchestrator",
    content: response.summary,
    type: "trace",
    createdAt: options.timestamp,
  });

  const artifacts = messages.flatMap((message) => message.artifacts ?? []);
  const activeArtifact = artifacts.find((artifact) => artifact.type === "html") ?? artifacts[0];

  const trace: Trace = {
    id: `${options.conversationId}-trace-${Date.now()}`,
    conversationId: options.conversationId,
    task: response.plan.task,
    status: "success",
    steps: response.plan.steps.map((step) => ({
      id: `${options.conversationId}-trace-step-${step.order}`,
      agentName: step.agentId,
      title: step.objective,
      status: "success",
      durationMs: 800 + step.order * 180,
      summary:
        response.outputs.find((item) => item.step.order === step.order)?.output.content ??
        "Agent 已完成该子任务。",
    })),
  };

  return {
    messages,
    activeArtifact,
    trace,
  };
}

