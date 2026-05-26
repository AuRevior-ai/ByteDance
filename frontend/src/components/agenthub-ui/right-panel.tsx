import { Check, ExternalLink, Laptop, Monitor, MoreHorizontal, Rocket, ShieldCheck } from "lucide-react";
import { trackingSteps, versions } from "./mock-data";
import { SoftCard, StatusBadge } from "./ui-primitives";
import { cn } from "./utils";

function PreviewCard() {
  return (
    <SoftCard className="p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <MoreHorizontal size={17} className="text-slate-400" />
          <h2 className="text-base font-bold text-slate-900">预览</h2>
        </div>
        <div className="flex items-center gap-2">
          {[Laptop, Monitor, ExternalLink].map((Icon, index) => (
            <button
              className={cn(
                "grid size-8 place-items-center rounded-lg border border-[#dfe7f4] bg-white text-slate-500",
                index === 0 && "bg-indigo-50 text-indigo-500",
              )}
              key={index}
              type="button"
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-[#dfe7f4] bg-gradient-to-br from-[#eef3ff] via-[#eff0ff] to-[#dfe7ff] p-5">
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-lg bg-white text-violet-500">✦</span>
            AgentHub Studio
          </div>
          <div className="flex items-center gap-6 text-slate-500">
            <span>产品</span>
            <span>解决方案</span>
            <span>定价</span>
            <span>资源</span>
            <span>登录</span>
          </div>
        </div>

        <div className="relative mt-8 text-center">
          <div className="absolute -left-12 top-10 size-44 rounded-full bg-white/45 blur-sm" />
          <h3 className="relative text-[28px] font-black tracking-[-0.04em] text-slate-950">多 Agent 协作，边聊边做</h3>
          <p className="relative mt-3 text-sm text-slate-600">让复杂任务像对话一样自然完成</p>
          <div className="relative mt-5 flex justify-center gap-3">
            <button className="rounded-xl bg-[#7b61ff] px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(123,97,255,0.28)]">
              立即体验
            </button>
            <button className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-[0_8px_18px_rgba(111,124,161,0.12)]">
              查看演示
            </button>
          </div>

          <div className="relative mt-8 grid grid-cols-[1.2fr_1fr] gap-3 px-8">
            <div className="h-20 rounded-xl border border-white/70 bg-white/70 p-2 shadow-[0_10px_25px_rgba(111,124,161,0.16)]">
              <div className="mb-2 h-2 w-16 rounded bg-orange-200" />
              <div className="space-y-1.5">
                <div className="h-2 rounded bg-indigo-100" />
                <div className="h-2 w-4/5 rounded bg-emerald-100" />
                <div className="h-2 w-3/5 rounded bg-slate-100" />
              </div>
            </div>
            <div className="h-20 rounded-xl border border-white/70 bg-white/70 p-2 shadow-[0_10px_25px_rgba(111,124,161,0.16)]">
              <div className="flex -space-x-2">
                {["林", "陈", "许", "周", "王"].map((name) => (
                  <span className="grid size-6 place-items-center rounded-full border-2 border-white bg-indigo-100 text-[9px] text-indigo-700" key={name}>
                    {name}
                  </span>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-indigo-50 p-2 text-left text-[9px] text-slate-500">Agent 正在协作生成页面...</div>
            </div>
          </div>
        </div>
      </div>
    </SoftCard>
  );
}

function TaskTrackingCard() {
  return (
    <SoftCard className="p-5">
      <h2 className="text-base font-bold text-slate-900">任务追踪</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">总体进度</span>
        <span className="text-sm font-bold text-slate-900">83%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[83%] rounded-full bg-gradient-to-r from-[#7b61ff] to-[#9b8cff]" />
      </div>
      <div className="mt-5 space-y-3">
        {trackingSteps.map(([title, status, kind]) => (
          <div className="flex items-center justify-between gap-3" key={title}>
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full",
                  kind === "done" ? "bg-emerald-50 text-emerald-500" : "bg-blue-50 text-blue-500",
                )}
              >
                {kind === "done" ? <Check size={13} /> : <span className="size-2 rounded-full bg-blue-400" />}
              </span>
              <span className="truncate text-xs font-medium text-slate-700">{title}</span>
            </div>
            <StatusBadge tone={kind === "done" ? "green" : "blue"}>{status}</StatusBadge>
          </div>
        ))}
      </div>
    </SoftCard>
  );
}

function VersionDeployPanel() {
  return (
    <SoftCard className="flex min-h-0 flex-col overflow-hidden p-4">
      <div className="grid grid-cols-3 border-b border-[#dfe7f4] text-center text-sm font-semibold text-slate-500">
        {["版本历史", "部署状态", "评论建议"].map((tab, index) => (
          <button
            className={cn(
              "relative pb-3",
              index === 0 && "text-[#6f5cf6] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-0.5 after:rounded-full after:bg-[#7b61ff]",
            )}
            key={tab}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="agenthub-scroll mt-4 grid min-h-0 flex-1 grid-cols-[128px_1fr] gap-4 overflow-auto pr-1">
        <div className="space-y-3">
          {versions.map((item, index) => (
            <div
              className={cn(
                "rounded-xl border p-3",
                index === 0 ? "border-indigo-200 bg-indigo-50/70" : "border-transparent bg-transparent",
              )}
              key={item.version}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{item.version}</span>
                {item.tag ? <StatusBadge tone="violet">{item.tag}</StatusBadge> : null}
              </div>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-700">{item.title}</p>
              <p className="mt-1 text-xs text-slate-400">林晓宇　{item.time}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(111,124,161,0.07)]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                  <ShieldCheck size={15} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">预览环境</h3>
                  <p className="mt-2 text-sm font-semibold text-blue-600">preview.agenthub.studio</p>
                  <p className="mt-1 text-xs text-slate-400">2 分钟前</p>
                </div>
              </div>
              <StatusBadge tone="green">已通过</StatusBadge>
            </div>
          </div>

          <div className="rounded-2xl border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(111,124,161,0.07)]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-slate-50 text-slate-500">
                  <Rocket size={15} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">生产环境</h3>
                  <p className="mt-2 text-xs text-slate-500">尚未部署到生产环境</p>
                </div>
              </div>
              <StatusBadge tone="orange">待部署</StatusBadge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="rounded-xl border border-[#dfe7f4] bg-white px-7 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_8px_18px_rgba(111,124,161,0.08)]">
          查看全部版本
        </button>
      </div>
    </SoftCard>
  );
}

export function RightPanel() {
  return (
    <aside className="grid min-h-0 overflow-hidden grid-rows-[302px_202px_minmax(0,1fr)] gap-3">
      <PreviewCard />
      <TaskTrackingCard />
      <VersionDeployPanel />
    </aside>
  );
}
