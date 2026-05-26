"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { AvatarStack } from "./ui-primitives";

interface TopBarProps {
  searchQuery: string;
  notificationCount: number;
  onExportReport: () => void;
  onSearchChange: (value: string) => void;
  onMagicClick: () => void;
  onNotificationClick: () => void;
  onResetWorkspace: () => void;
}

export function TopBar({
  searchQuery,
  notificationCount,
  onExportReport,
  onSearchChange,
  onMagicClick,
  onNotificationClick,
  onResetWorkspace,
}: TopBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState<"help" | "profile" | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setOpenMenu(null);
        if (document.activeElement === searchInputRef.current) {
          onSearchChange("");
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchChange]);

  return (
    <header className="relative flex h-[64px] items-center justify-between rounded-[20px] border border-white/80 bg-white/88 px-5 shadow-[0_14px_35px_rgba(100,116,139,0.10)] backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-[14px] bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600 ring-1 ring-violet-100">
            <WandSparkles size={21} />
          </div>
          <span className="text-xl font-bold tracking-[-0.02em] text-slate-950">
            AgentHub Studio
          </span>
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
          ref={searchInputRef}
          className="w-full bg-transparent text-slate-600 outline-none placeholder:text-slate-400"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜索会话、Agent 或任务..."
          value={searchQuery}
        />
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Command size={13} />K
        </span>
      </label>

      <div className="flex items-center gap-5 text-slate-500">
        <button
          className="grid size-9 place-items-center rounded-full hover:bg-slate-100"
          onClick={onMagicClick}
          title="模拟一次 Agent 协作"
          type="button"
        >
          <Sparkles size={18} />
        </button>
        <button
          className="grid size-9 place-items-center rounded-full hover:bg-slate-100"
          onClick={() => setOpenMenu(openMenu === "help" ? null : "help")}
          type="button"
        >
          <CircleHelp size={19} />
        </button>
        <button
          className="relative grid size-9 place-items-center rounded-full hover:bg-slate-100"
          onClick={onNotificationClick}
          type="button"
        >
          <Bell size={19} />
          {notificationCount ? (
            <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          ) : null}
        </button>
        <button
          className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 hover:bg-slate-100"
          onClick={() => setOpenMenu(openMenu === "profile" ? null : "profile")}
          type="button"
        >
          <AvatarStack items={["林"]} size="md" />
          <span className="text-sm font-semibold text-slate-800">林晓宇</span>
          <ChevronDown size={15} />
        </button>
      </div>
      {openMenu === "help" ? (
        <div className="absolute right-28 top-[58px] z-30 w-72 rounded-2xl border border-[#dfe7f4] bg-white/95 p-4 text-sm shadow-[0_18px_45px_rgba(111,124,161,0.18)] backdrop-blur-xl">
          <h3 className="font-bold text-slate-900">演示快捷操作</h3>
          <div className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
            <p>⌘/Ctrl + K 聚焦搜索，会同步筛选会话与 Agent。</p>
            <p>@ 选择参与 Agent，/ 选择前端模拟技能。</p>
            <p>右侧预览、任务追踪、版本和部署状态都由前端本地状态驱动。</p>
          </div>
        </div>
      ) : null}
      {openMenu === "profile" ? (
        <div className="absolute right-4 top-[58px] z-30 w-56 overflow-hidden rounded-2xl border border-[#dfe7f4] bg-white/95 p-2 shadow-[0_18px_45px_rgba(111,124,161,0.18)] backdrop-blur-xl">
          <button
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-indigo-50"
            onClick={() => {
              setOpenMenu(null);
              onExportReport();
            }}
            type="button"
          >
            导出协作报告
          </button>
          <button
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-indigo-50"
            onClick={() => {
              setOpenMenu(null);
              onResetWorkspace();
            }}
            type="button"
          >
            重置演示状态
          </button>
        </div>
      ) : null}
    </header>
  );
}
