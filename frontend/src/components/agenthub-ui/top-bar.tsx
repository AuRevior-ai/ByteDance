"use client";

import { Bell, ChevronDown, CircleHelp, Command, Search, Sparkles, WandSparkles } from "lucide-react";
import { AvatarStack } from "./ui-primitives";

export function TopBar() {
  return (
    <header className="flex h-[64px] items-center justify-between rounded-[20px] border border-white/80 bg-white/88 px-5 shadow-[0_14px_35px_rgba(100,116,139,0.10)] backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[14px] bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600 ring-1 ring-violet-100">
            <WandSparkles size={21} />
          </div>
          <span className="text-xl font-bold tracking-[-0.02em] text-slate-950">AgentHub Studio</span>
        </div>

        <button className="flex h-10 items-center gap-2 rounded-[13px] border border-[#e0e7f3] bg-white/70 px-4 text-sm font-medium text-slate-700 shadow-[0_4px_12px_rgba(116,103,239,0.07)]">
          <Sparkles size={15} className="text-violet-500" />
          比赛项目工作区
          <ChevronDown size={15} className="text-slate-400" />
        </button>
      </div>

      <label className="flex h-10 w-[400px] items-center gap-3 rounded-full border border-[#e0e7f3] bg-white/76 px-4 text-sm text-slate-400 shadow-inner shadow-slate-100/70">
        <Search size={18} />
        <input
          className="w-full bg-transparent text-slate-600 outline-none placeholder:text-slate-400"
          placeholder="搜索会话、Agent 或任务..."
        />
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Command size={13} />K
        </span>
      </label>

      <div className="flex items-center gap-5 text-slate-500">
        <button className="grid size-9 place-items-center rounded-full hover:bg-slate-100" type="button">
          <Sparkles size={18} />
        </button>
        <button className="grid size-9 place-items-center rounded-full hover:bg-slate-100" type="button">
          <CircleHelp size={19} />
        </button>
        <button className="relative grid size-9 place-items-center rounded-full hover:bg-slate-100" type="button">
          <Bell size={19} />
          <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            3
          </span>
        </button>
        <div className="flex items-center gap-3">
          <AvatarStack items={["林"]} size="md" />
          <span className="text-sm font-semibold text-slate-800">林晓宇</span>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

