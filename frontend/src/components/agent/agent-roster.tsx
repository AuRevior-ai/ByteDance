import { Bot, Braces, ClipboardList, Palette, ShieldCheck } from "lucide-react";
import type { Agent } from "@/types/agent";

const agents: Agent[] = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "orchestrator",
    description: "拆解任务、分派 Agent、聚合结果",
    capabilities: ["plan", "route", "trace"],
    status: "running",
  },
  {
    id: "pm",
    name: "Product Manager",
    role: "product",
    description: "梳理需求与页面结构",
    capabilities: ["spec", "scope"],
    status: "done",
  },
  {
    id: "designer",
    name: "UI Designer",
    role: "design",
    description: "生成视觉方向和组件布局",
    capabilities: ["layout", "style"],
    status: "done",
  },
  {
    id: "frontend",
    name: "Frontend Engineer",
    role: "frontend",
    description: "输出可预览页面代码",
    capabilities: ["react", "html"],
    status: "thinking",
  },
  {
    id: "reviewer",
    name: "Code Reviewer",
    role: "review",
    description: "检查代码质量与风险",
    capabilities: ["review", "diff"],
    status: "idle",
  },
];

const icons = {
  orchestrator: Bot,
  product: ClipboardList,
  design: Palette,
  frontend: Braces,
  review: ShieldCheck,
  deploy: Bot,
  docs: ClipboardList,
};

export function AgentRoster() {
  return (
    <section className="min-h-0 flex-1 overflow-auto p-3">
      <div className="mb-2 px-1 text-xs uppercase tracking-[0.18em] text-muted">Agents</div>
      <div className="space-y-2">
        {agents.map((agent) => {
          const Icon = icons[agent.role];
          return (
            <div key={agent.id} className="rounded-md border border-line bg-canvas p-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md bg-panelSoft text-accent">
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{agent.name}</p>
                  <p className="truncate text-xs text-muted">{agent.description}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {agent.capabilities.map((capability) => (
                  <span key={capability} className="rounded border border-line px-1.5 py-0.5 text-[11px] text-muted">
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

