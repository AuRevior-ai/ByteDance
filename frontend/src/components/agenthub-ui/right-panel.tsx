import type { ComponentType } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Laptop,
  Monitor,
  MoreHorizontal,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type {
  AgentHubPanelTab,
  AgentHubRunStatus,
  ArtifactItem,
  InteractiveTrackingStep,
  InteractiveVersion,
  PreviewMode,
} from "./interaction-model";
import { SoftCard, StatusBadge } from "./ui-primitives";
import { cn } from "./utils";

function PreviewCard({
  activeArtifact,
  activeArtifactId,
  artifacts,
  headline,
  mode,
  onModeChange,
  onPreviewAction,
  onSelectArtifact,
}: {
  activeArtifact?: ArtifactItem;
  activeArtifactId: string;
  artifacts: ArtifactItem[];
  headline: string;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  onPreviewAction: (message: string) => void;
  onSelectArtifact: (artifactId: string) => void;
}) {
  const modeButtons: Array<
    [PreviewMode, ComponentType<{ size?: number; className?: string }>]
  > = [
    ["desktop", Laptop],
    ["window", Monitor],
    ["external", ExternalLink],
  ];

  return (
    <SoftCard className="p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <MoreHorizontal size={17} className="text-slate-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900">预览</h2>
            {activeArtifact ? (
              <p className="text-[11px] text-slate-400">
                {activeArtifact.title}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {modeButtons.map(([buttonMode, Icon]) => (
            <button
              className={cn(
                "grid size-8 place-items-center rounded-lg border border-[#dfe7f4] bg-white text-slate-500",
                mode === buttonMode && "bg-indigo-50 text-indigo-500",
              )}
              key={buttonMode}
              onClick={() => {
                onModeChange(buttonMode);
                if (buttonMode === "external") {
                  onPreviewAction("已切换到外部预览模式");
                }
              }}
              type="button"
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex gap-2 overflow-hidden">
        {artifacts.slice(0, 3).map((artifact) => (
          <button
            className={cn(
              "truncate rounded-lg border px-2 py-1 text-[11px] font-semibold",
              activeArtifactId === artifact.id
                ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                : "border-[#dfe7f4] bg-white text-slate-500",
            )}
            key={artifact.id}
            onClick={() => onSelectArtifact(artifact.id)}
            type="button"
          >
            {artifact.title}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-[18px] border border-[#dfe7f4] bg-gradient-to-br from-[#eef3ff] via-[#eff0ff] to-[#dfe7ff] p-5 transition-all",
          mode === "window" && "mx-5",
          mode === "external" && "ring-2 ring-indigo-100",
        )}
      >
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-lg bg-white text-violet-500">
              ✦
            </span>
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
          <h3 className="relative text-[28px] font-black tracking-[-0.04em] text-slate-950">
            {headline}
          </h3>
          <p className="relative mt-3 text-sm text-slate-600">
            让复杂任务像对话一样自然完成
          </p>
          <div className="relative mt-5 flex justify-center gap-3">
            <button
              className="rounded-xl bg-[#7b61ff] px-5 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(123,97,255,0.28)]"
              onClick={() => onPreviewAction("已触发预览站 CTA")}
              type="button"
            >
              立即体验
            </button>
            <button
              className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-[0_8px_18px_rgba(111,124,161,0.12)]"
              onClick={() => onPreviewAction("预览演示已在右侧卡片中播放")}
              type="button"
            >
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
                  <span
                    className="grid size-6 place-items-center rounded-full border-2 border-white bg-indigo-100 text-[9px] text-indigo-700"
                    key={name}
                  >
                    {name}
                  </span>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-indigo-50 p-2 text-left text-[9px] text-slate-500">
                Agent 正在协作生成页面...
              </div>
            </div>
          </div>
        </div>
      </div>
    </SoftCard>
  );
}

function TaskTrackingCard({
  progress,
  steps,
}: {
  progress: number;
  steps: InteractiveTrackingStep[];
}) {
  return (
    <SoftCard className="p-5">
      <h2 className="text-base font-bold text-slate-900">任务追踪</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">总体进度</span>
        <span className="text-sm font-bold text-slate-900">{progress}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7b61ff] to-[#9b8cff] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-5 space-y-3">
        {steps.map((step) => (
          <div
            className="flex items-center justify-between gap-3"
            key={step.title}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full",
                  step.kind === "done"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-blue-50 text-blue-500",
                )}
              >
                {step.kind === "done" ? (
                  <Check size={13} />
                ) : (
                  <span className="size-2 rounded-full bg-blue-400" />
                )}
              </span>
              <span className="truncate text-xs font-medium text-slate-700">
                {step.title}
              </span>
            </div>
            <StatusBadge tone={step.kind === "done" ? "green" : "blue"}>
              {step.status}
            </StatusBadge>
          </div>
        ))}
      </div>
    </SoftCard>
  );
}

function VersionDeployPanel({
  activeTab,
  activeVersion,
  onTabChange,
  onCopyText,
  onExportReport,
  onSelectVersion,
  runStatus,
  versions,
}: {
  activeTab: AgentHubPanelTab;
  activeVersion: string;
  onTabChange: (tab: AgentHubPanelTab) => void;
  onCopyText: (text: string, label: string) => void;
  onExportReport: () => void;
  onSelectVersion: (version: string) => void;
  runStatus: AgentHubRunStatus;
  versions: InteractiveVersion[];
}) {
  const tabs: AgentHubPanelTab[] = ["版本历史", "部署状态", "评论建议"];
  const footerLabel =
    activeTab === "评论建议"
      ? "导出协作报告"
      : activeTab === "部署状态"
        ? "复制预览链接"
        : "查看全部版本";

  function handleFooterAction() {
    if (activeTab === "评论建议") {
      onExportReport();
      return;
    }

    if (activeTab === "部署状态") {
      onCopyText("https://preview.agenthub.studio", "预览链接");
    }
  }

  return (
    <SoftCard className="flex min-h-0 flex-col overflow-hidden p-4">
      <div className="grid grid-cols-3 border-b border-[#dfe7f4] text-center text-sm font-semibold text-slate-500">
        {tabs.map((tab) => (
          <button
            className={cn(
              "relative pb-3",
              activeTab === tab &&
                "text-[#6f5cf6] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-0.5 after:rounded-full after:bg-[#7b61ff]",
            )}
            key={tab}
            onClick={() => onTabChange(tab)}
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
                "rounded-xl border p-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50/50",
                activeVersion === item.version
                  ? "border-indigo-200 bg-indigo-50/70"
                  : "border-transparent bg-transparent",
              )}
              key={item.version}
              onClick={() => onSelectVersion(item.version)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectVersion(item.version);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {item.version}
                </span>
                {item.tag ? (
                  <StatusBadge tone="violet">{item.tag}</StatusBadge>
                ) : null}
              </div>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-700">
                {item.title}
              </p>
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
                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    preview.agenthub.studio
                  </p>
                  <p className="mt-1 text-xs text-slate-400">2 分钟前</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="grid size-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-indigo-500"
                  onClick={() =>
                    onCopyText("https://preview.agenthub.studio", "预览链接")
                  }
                  type="button"
                >
                  <Copy size={13} />
                </button>
                <StatusBadge tone={runStatus === "running" ? "blue" : "green"}>
                  {runStatus === "running" ? "发布中" : "已通过"}
                </StatusBadge>
              </div>
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
                  <p className="mt-2 text-xs text-slate-500">
                    尚未部署到生产环境
                  </p>
                </div>
              </div>
              <StatusBadge tone={runStatus === "done" ? "green" : "orange"}>
                {runStatus === "done" ? "已同步" : "待部署"}
              </StatusBadge>
            </div>
          </div>
          {activeTab === "评论建议" ? (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-xs leading-6 text-orange-700">
              建议优先检查首屏文案长度、CTA 动词和预览站访问链路，确保 Demo
              视频录制时路径稳定。
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="rounded-xl border border-[#dfe7f4] bg-white px-7 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_8px_18px_rgba(111,124,161,0.08)]"
          onClick={handleFooterAction}
          type="button"
        >
          {footerLabel}
        </button>
      </div>
    </SoftCard>
  );
}

export function RightPanel({
  activeTab,
  activeArtifactId,
  activeVersion,
  artifacts,
  onPreviewModeChange,
  onCopyText,
  onExportReport,
  onPreviewAction,
  onSelectArtifact,
  onSelectVersion,
  onTabChange,
  previewHeadline,
  previewMode,
  progress,
  runStatus,
  trackingSteps,
  versions,
}: {
  activeTab: AgentHubPanelTab;
  activeArtifactId: string;
  activeVersion: string;
  artifacts: ArtifactItem[];
  onPreviewModeChange: (mode: PreviewMode) => void;
  onCopyText: (text: string, label: string) => void;
  onExportReport: () => void;
  onPreviewAction: (message: string) => void;
  onSelectArtifact: (artifactId: string) => void;
  onSelectVersion: (version: string) => void;
  onTabChange: (tab: AgentHubPanelTab) => void;
  previewHeadline: string;
  previewMode: PreviewMode;
  progress: number;
  runStatus: AgentHubRunStatus;
  trackingSteps: InteractiveTrackingStep[];
  versions: InteractiveVersion[];
}) {
  const activeArtifact = artifacts.find(
    (artifact) => artifact.id === activeArtifactId,
  );

  return (
    <aside className="grid min-h-0 overflow-hidden grid-rows-[302px_202px_minmax(0,1fr)] gap-3">
      <PreviewCard
        activeArtifact={activeArtifact}
        activeArtifactId={activeArtifactId}
        artifacts={artifacts}
        headline={previewHeadline}
        mode={previewMode}
        onModeChange={onPreviewModeChange}
        onPreviewAction={onPreviewAction}
        onSelectArtifact={onSelectArtifact}
      />
      <TaskTrackingCard progress={progress} steps={trackingSteps} />
      <VersionDeployPanel
        activeTab={activeTab}
        activeVersion={activeVersion}
        onCopyText={onCopyText}
        onExportReport={onExportReport}
        onSelectVersion={onSelectVersion}
        onTabChange={onTabChange}
        runStatus={runStatus}
        versions={versions}
      />
    </aside>
  );
}
