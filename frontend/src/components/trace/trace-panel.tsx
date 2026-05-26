"use client";

import { CheckCircle2, CircleDashed, Loader2, Timer, XCircle } from "lucide-react";
import { useWorkspaceStore } from "@/stores/workspace-store";
import type { TraceStep } from "@/types/trace";

function StepIcon({ step }: { step: TraceStep }) {
  if (step.status === "success") {
    return <CheckCircle2 className="text-mint" size={18} />;
  }

  if (step.status === "failed") {
    return <XCircle className="text-danger" size={18} />;
  }

  if (step.status === "running") {
    return <Loader2 className="animate-spin text-amber" size={18} />;
  }

  return <CircleDashed className="text-muted" size={18} />;
}

export function TracePanel() {
  const trace = useWorkspaceStore((state) => state.trace);

  if (!trace) {
    return (
      <div className="min-h-0 flex-1 p-4">
        <div className="rounded-md border border-line bg-canvas p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-mint">Trace</p>
          <h3 className="mt-2 text-lg font-semibold">等待 Orchestrator 运行</h3>
          <p className="mt-2 text-sm text-muted">发送任务后，这里会展示任务拆解、Agent 调用和结果摘要。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <div className="rounded-md border border-line bg-canvas p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-mint">Trace</p>
          <span className="rounded border border-line px-2 py-1 text-xs text-muted">{trace.status}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold">{trace.task}</h3>
        <p className="mt-2 text-sm text-muted">记录 Orchestrator 和各 Agent 的调用顺序、耗时、Prompt 摘要与结果。</p>
      </div>

      <div className="mt-4 space-y-3">
        {trace.steps.map((step) => (
          <article key={step.id} className="rounded-md border border-line bg-canvas p-4">
            <div className="flex items-start gap-3">
              <StepIcon step={step} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold">{step.title}</h4>
                  {step.durationMs ? (
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Timer size={13} />
                      {step.durationMs}ms
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-accent">{step.agentName}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{step.summary}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
