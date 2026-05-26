import { CheckCircle2, CircleDashed, Timer } from "lucide-react";
import type { Trace } from "@/types/trace";

const trace: Trace = {
  id: "trace-demo",
  conversationId: "demo-conversation",
  task: "生成 AI 简历作品集网页",
  status: "running",
  steps: [
    {
      id: "s1",
      agentName: "Orchestrator",
      title: "任务拆解",
      status: "success",
      durationMs: 820,
      summary: "识别为网页生成任务，拆成产品结构、视觉方案、前端代码、审查优化四步。",
    },
    {
      id: "s2",
      agentName: "Product Manager",
      title: "页面信息架构",
      status: "success",
      durationMs: 1120,
      summary: "产出 Hero、项目、技能、联系 CTA 的单页结构。",
    },
    {
      id: "s3",
      agentName: "Frontend Engineer",
      title: "HTML Artifact",
      status: "running",
      summary: "正在生成可预览页面代码。",
    },
  ],
};

export function TracePanel() {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <div className="rounded-md border border-line bg-canvas p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-mint">Trace</p>
        <h3 className="mt-2 text-lg font-semibold">{trace.task}</h3>
        <p className="mt-2 text-sm text-muted">记录 Orchestrator 和各 Agent 的调用顺序、耗时、Prompt 摘要与结果。</p>
      </div>

      <div className="mt-4 space-y-3">
        {trace.steps.map((step) => {
          const Icon = step.status === "success" ? CheckCircle2 : CircleDashed;
          return (
            <article key={step.id} className="rounded-md border border-line bg-canvas p-4">
              <div className="flex items-start gap-3">
                <Icon className={step.status === "success" ? "text-mint" : "text-amber"} size={18} />
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
          );
        })}
      </div>
    </div>
  );
}

