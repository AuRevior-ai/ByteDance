import type { ComponentType, ReactNode } from "react";
import { useRef, useState } from "react";
import {
  AtSign,
  ChevronDown,
  File,
  Gift,
  MessageCircle,
  Paperclip,
  Bot,
  Bug,
  Code2,
  Copy,
  FileText,
  Rocket,
  SearchCheck,
  Send,
  Smile,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import type {
  AgentHubRunStatus,
  ArtifactItem,
  ChatEvent,
} from "./interaction-model";
import { agents, chatAvatars, codeLines, taskSteps } from "./mock-data";
import { AvatarStack, IconTile, SoftCard, StatusBadge } from "./ui-primitives";
import { cn } from "./utils";

const tagTone: Record<string, "violet" | "green" | "orange" | "blue"> = {
  violet: "violet",
  green: "green",
  orange: "orange",
  indigo: "violet",
};

function TaskBreakdownCard() {
  return (
    <SoftCard className="h-[216px] p-4">
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-violet-100 text-violet-600">
          <Sparkles size={14} />
        </span>
        <h3 className="text-base font-bold text-slate-900">
          任务拆解完成，共 6 步
        </h3>
      </div>
      <div className="mt-4 space-y-2">
        {taskSteps.map(([title, agent, tone], index) => (
          <div
            className="grid grid-cols-[26px_1fr_auto] items-center gap-2"
            key={title}
          >
            <span className="grid size-5 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500">
              {index + 1}
            </span>
            <span className="truncate text-xs font-medium text-slate-700">
              {title}
            </span>
            <StatusBadge tone={tagTone[tone]}>{agent}</StatusBadge>
          </div>
        ))}
      </div>
    </SoftCard>
  );
}

function MessageCard({
  icon,
  tone,
  name,
  time,
  children,
  className,
}: Readonly<{
  icon: ComponentType<{ size?: number; className?: string }>;
  tone: string;
  name: string;
  time: string;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <SoftCard className={cn("p-4", className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconTile icon={icon} size="sm" tone={tone} />
          <span className="text-sm font-semibold text-slate-700">{name}</span>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <div className="pl-10 text-sm leading-6 text-slate-800">{children}</div>
    </SoftCard>
  );
}

function FileAttachment({
  title,
  size,
  onCopy,
}: {
  title: string;
  size: string;
  onCopy?: () => void;
}) {
  return (
    <div className="mt-3 flex h-12 items-center gap-3 rounded-xl border border-[#dfe7f4] bg-white px-3 shadow-[0_6px_16px_rgba(111,124,161,0.08)]">
      <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-500">
        <File size={17} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-400">{size}</p>
      </div>
      {onCopy ? (
        <button
          className="grid size-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-indigo-500"
          onClick={onCopy}
          type="button"
        >
          <Copy size={13} />
        </button>
      ) : null}
    </div>
  );
}

function CodeArtifactCard({ onCopy }: { onCopy: () => void }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-[#111827] shadow-[0_15px_28px_rgba(17,24,39,0.18)]">
      <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#f8fafc] px-3 text-xs">
        <span className="font-semibold text-slate-700">HeroSection.vue</span>
        <div className="flex items-center gap-2">
          <StatusBadge tone="gray">Vue 3</StatusBadge>
          <button
            className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-white hover:text-indigo-500"
            onClick={onCopy}
            type="button"
          >
            <Copy size={12} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[34px_1fr] px-3 py-3 font-mono text-[11px] leading-[18px]">
        <div className="select-none text-right text-slate-500">
          {codeLines.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <div className="pl-4 text-slate-200">
          {codeLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiffCard({
  onApply,
  expanded,
  onToggle,
}: {
  onApply: () => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <SoftCard className="col-span-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Code2 size={16} />
          </span>
          <h3 className="text-sm font-bold text-slate-800">
            差异对比 (index.vue)
          </h3>
        </div>
        <span className="text-xs text-slate-400">09:43</span>
      </div>
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[#dfe7f4] text-xs">
        <div className="bg-rose-50 p-4 font-mono leading-7 text-rose-500">
          <p>- &lt;a class="btn primary"&gt;开始体验&lt;/a&gt;</p>
          <p>- &lt;p class="subtitle"&gt;让协作更高效&lt;/p&gt;</p>
          {expanded ? (
            <p>- &lt;div class="feature-card compact"&gt;...</p>
          ) : null}
        </div>
        <div className="bg-emerald-50 p-4 font-mono leading-7 text-emerald-600">
          <p>+ &lt;a class="btn primary"&gt;立即体验&lt;/a&gt;</p>
          <p>
            + &lt;p class="subtitle"&gt;让复杂任务像对话一样自然完成&lt;/p&gt;
          </p>
          {expanded ? (
            <p>+ &lt;div class="feature-card responsive"&gt;...</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-[0_6px_18px_rgba(111,124,161,0.12)]"
          onClick={onToggle}
          type="button"
        >
          {expanded ? "收起 Diff" : "查看完整 Diff"}
        </button>
        <button
          className="rounded-xl bg-[#7b61ff] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(123,97,255,0.22)]"
          onClick={onApply}
          type="button"
        >
          应用 Diff
        </button>
      </div>
    </SoftCard>
  );
}

function ChatInput({
  disabled,
  onSubmit,
  onToggleAgent,
  onExportReport,
  onUtilityAction,
  selectedAgentName,
  selectedAgentNames,
}: {
  disabled: boolean;
  onSubmit: (prompt: string) => void;
  onToggleAgent: (agentName: string) => void;
  onExportReport: () => void;
  onUtilityAction: (
    message: string,
    tone?: "violet" | "green" | "orange" | "blue",
  ) => void;
  selectedAgentName: string;
  selectedAgentNames: string[];
}) {
  const [draft, setDraft] = useState("");
  const [menu, setMenu] = useState<"agent" | "skill" | null>(null);

  const skills = [
    "生成产品说明页",
    "应用 Diff 并生成版本",
    "重新部署预览环境",
    "导出 AI 协作报告",
  ];

  function submit() {
    if (!draft.trim() || disabled) {
      return;
    }

    onSubmit(draft);
    setDraft("");
  }

  return (
    <form
      className="relative mt-3 rounded-2xl border border-[#dfe7f4] bg-white px-4 py-3 shadow-[0_12px_25px_rgba(111,124,161,0.09)]"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <textarea
        className="agenthub-scroll max-h-20 min-h-[22px] w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        onChange={(event) => setDraft(event.target.value)}
        onFocus={() => setMenu(null)}
        onKeyDown={(event) => {
          if (!draft && event.key === "@") {
            event.preventDefault();
            setMenu("agent");
          }

          if (!draft && event.key === "/") {
            event.preventDefault();
            setMenu("skill");
          }

          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            submit();
          }
        }}
        placeholder={`给 AgentHub 发送消息，@${selectedAgentName} 或输入 / 选择技能...`}
        rows={1}
        value={draft}
      />
      {menu ? (
        <div className="absolute bottom-[76px] left-4 z-20 w-72 overflow-hidden rounded-2xl border border-[#dfe7f4] bg-white/95 p-2 shadow-[0_18px_45px_rgba(111,124,161,0.16)] backdrop-blur-xl">
          {menu === "agent"
            ? agents.map((agent) => (
                <button
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-indigo-50"
                  key={agent.name}
                  onClick={() => {
                    onToggleAgent(agent.name);
                    setMenu(null);
                  }}
                  type="button"
                >
                  <span>{agent.name}</span>
                  {selectedAgentNames.includes(agent.name) ? (
                    <span className="text-xs font-semibold text-indigo-500">
                      已选择
                    </span>
                  ) : null}
                </button>
              ))
            : skills.map((skill) => (
                <button
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50"
                  key={skill}
                  onClick={() => {
                    if (skill === "导出 AI 协作报告") {
                      onExportReport();
                      setMenu(null);
                      return;
                    }

                    setDraft(skill);
                    setMenu(null);
                  }}
                  type="button"
                >
                  / {skill}
                </button>
              ))}
        </div>
      ) : null}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-5 text-slate-400">
          <button
            className="hover:text-indigo-500"
            onClick={() =>
              onUtilityAction("附件上传已进入前端占位状态", "blue")
            }
            type="button"
          >
            <Paperclip size={17} />
          </button>
          <button
            className="hover:text-indigo-500"
            onClick={() => setMenu(menu === "agent" ? null : "agent")}
            type="button"
          >
            <AtSign size={17} />
          </button>
          <button
            className="text-lg leading-none hover:text-indigo-500"
            onClick={() => setMenu(menu === "skill" ? null : "skill")}
            type="button"
          >
            /
          </button>
          <button
            className="hover:text-indigo-500"
            onClick={() => onUtilityAction("已插入演示工具指令占位", "violet")}
            type="button"
          >
            <Gift size={17} />
          </button>
          <button
            className="hover:text-indigo-500"
            onClick={() =>
              onUtilityAction("文档选择器已就绪，等待后端文件服务接入", "blue")
            }
            type="button"
          >
            <File size={17} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border border-[#dfe7f4] bg-white px-3 py-2 text-xs font-semibold text-slate-500"
            onClick={() => setDraft((current) => `${current}\n`)}
            type="button"
          >
            ↵ 换行
          </button>
          <button
            className="grid size-9 place-items-center rounded-xl bg-[#7b61ff] text-white shadow-[0_9px_18px_rgba(123,97,255,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!draft.trim() || disabled}
            type="submit"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}

function RuntimeEventCard({ event }: { event: ChatEvent }) {
  if (event.type === "user") {
    return (
      <div className="col-span-2 flex justify-end">
        <div className="max-w-[70%] rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm leading-6 text-slate-800 shadow-[0_10px_24px_rgba(123,97,255,0.08)]">
          <div className="mb-1 text-xs font-semibold text-indigo-500">
            林晓宇 · {event.time}
          </div>
          {event.content}
        </div>
      </div>
    );
  }

  const iconMap = {
    "总控协调 Agent": Bot,
    "前端 Agent": Code2,
    "部署 Agent": Rocket,
  };
  const icon = iconMap[event.agentName as keyof typeof iconMap] ?? Bot;
  const toneMap = {
    violet: "from-violet-500 to-indigo-400",
    green: "from-emerald-500 to-teal-400",
    orange: "from-orange-400 to-amber-300",
    blue: "from-indigo-500 to-blue-400",
  };

  return (
    <MessageCard
      className="col-span-2"
      icon={icon}
      name={event.agentName ?? "Agent"}
      time={event.time}
      tone={toneMap[event.tone ?? "violet"]}
    >
      <p>{event.content}</p>
    </MessageCard>
  );
}

function ArtifactStrip({
  activeArtifactId,
  artifacts,
  onSelectArtifact,
}: {
  activeArtifactId: string;
  artifacts: ArtifactItem[];
  onSelectArtifact: (artifactId: string) => void;
}) {
  return (
    <div className="col-span-2 grid grid-cols-4 gap-2">
      {artifacts.map((artifact) => (
        <button
          className={cn(
            "rounded-2xl border bg-white/82 p-3 text-left shadow-[0_8px_18px_rgba(111,124,161,0.08)] transition hover:-translate-y-0.5 hover:border-indigo-200",
            activeArtifactId === artifact.id &&
              "border-indigo-200 bg-indigo-50/70",
          )}
          key={artifact.id}
          onClick={() => onSelectArtifact(artifact.id)}
          type="button"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-bold text-slate-800">
              {artifact.title}
            </span>
            <StatusBadge
              tone={
                artifact.type === "diff"
                  ? "orange"
                  : artifact.type === "deployment"
                    ? "green"
                    : "blue"
              }
            >
              {artifact.status}
            </StatusBadge>
          </div>
          <p className="mt-2 truncate text-[11px] text-slate-400">
            {artifact.description}
          </p>
        </button>
      ))}
    </div>
  );
}

export function ChatWorkspace({
  activeArtifactId,
  artifacts,
  chatEvents,
  diffExpanded,
  onApplyDiff,
  onCopyText,
  onExportReport,
  onSelectArtifact,
  onSubmit,
  onToggleAgent,
  onToggleDiff,
  onUtilityAction,
  runStatus,
  selectedAgentName,
  selectedAgentNames,
}: {
  activeArtifactId: string;
  artifacts: ArtifactItem[];
  chatEvents: ChatEvent[];
  diffExpanded: boolean;
  onApplyDiff: () => void;
  onCopyText: (text: string, label: string) => void;
  onExportReport: () => void;
  onSelectArtifact: (artifactId: string) => void;
  onSubmit: (prompt: string) => void;
  onToggleAgent: (agentName: string) => void;
  onToggleDiff: () => void;
  onUtilityAction: (
    message: string,
    tone?: "violet" | "green" | "orange" | "blue",
  ) => void;
  runStatus: AgentHubRunStatus;
  selectedAgentName: string;
  selectedAgentNames: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [likedCards, setLikedCards] = useState<string[]>([]);

  function likeCount(cardId: string, baseCount: number) {
    return baseCount + (likedCards.includes(cardId) ? 1 : 0);
  }

  function handleLike(cardId: string) {
    setLikedCards((current) =>
      current.includes(cardId)
        ? current.filter((id) => id !== cardId)
        : [...current, cardId],
    );
  }

  function handleSubmit(prompt: string) {
    onSubmit(prompt);
    window.setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 40);
  }

  return (
    <SoftCard className="flex min-h-0 flex-col overflow-hidden p-4">
      <header className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-[-0.01em] text-slate-900">
            🎉 为比赛项目生成产品说明页并部署演示站
          </h1>
          <ChevronDown size={18} className="text-slate-500" />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-8 items-center gap-2 rounded-xl bg-slate-100 px-3 text-xs font-semibold text-slate-600">
            <MessageCircle size={14} />
            添加成员
          </button>
          <AvatarStack items={chatAvatars} extra="+2" size="sm" />
        </div>
      </header>

      <div
        ref={scrollRef}
        className="agenthub-scroll mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-auto pr-1"
      >
        <ArtifactStrip
          activeArtifactId={activeArtifactId}
          artifacts={artifacts}
          onSelectArtifact={onSelectArtifact}
        />

        <TaskBreakdownCard />

        <MessageCard
          icon={Bot}
          name="总控协调 Agent"
          time="09:30"
          tone="from-violet-500 to-indigo-400"
        >
          <p>任务已创建并拆解完成，已邀请 7 个 Agent 协作</p>
          <p>预计耗时 35 分钟</p>
        </MessageCard>

        <MessageCard
          icon={FileText}
          name="产品经理 Agent"
          time="09:34"
          tone="from-orange-400 to-amber-300"
        >
          <p>已完成需求澄清，输出产品说明页结构与文案大纲。</p>
          <FileAttachment
            onCopy={() =>
              onCopyText("产品说明页_结构与文案大纲.md", "附件名称")
            }
            title="产品说明页_结构与文案大纲.md"
            size="32KB"
          />
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <AvatarStack items={["林"]} size="sm" />
            <span>2 条回复</span>
          </div>
        </MessageCard>

        <MessageCard
          icon={SearchCheck}
          name="研究员 Agent"
          time="09:32"
          tone="from-emerald-500 to-teal-400"
        >
          <p>已整理竞品要点与用户诉求，形成研究摘要文档。</p>
          <FileAttachment
            onCopy={() => onCopyText("竞品研究与用户诉求摘要.md", "附件名称")}
            title="竞品研究与用户诉求摘要.md"
            size="18KB"
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              className={cn(
                "flex items-center gap-1 rounded-lg border border-[#dfe7f4] bg-white px-2 py-1 text-xs text-slate-600",
                likedCards.includes("research") &&
                  "border-indigo-100 bg-indigo-50 text-indigo-600",
              )}
              onClick={() => handleLike("research")}
              type="button"
            >
              <ThumbsUp size={13} />
              {likeCount("research", 2)}
            </button>
            <button
              className="grid size-7 place-items-center rounded-lg border border-[#dfe7f4] bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-500"
              onClick={() => onUtilityAction("已添加一个表情回应", "violet")}
              type="button"
            >
              <Smile size={13} />
            </button>
          </div>
        </MessageCard>

        <MessageCard
          className="col-start-2"
          icon={Code2}
          name="前端 Agent"
          time="09:37"
          tone="from-indigo-500 to-blue-400"
        >
          <p>已生成首屏布局与配色方案，开始编码实现。</p>
          <CodeArtifactCard
            onCopy={() => onCopyText(codeLines.join("\n"), "代码片段")}
          />
        </MessageCard>

        <MessageCard
          icon={Bug}
          name="测试 Agent"
          time="09:42"
          tone="from-orange-400 to-amber-300"
        >
          <p>检测到 2 处文案溢出，建议修复：</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>首屏副标题在移动端会换行溢出</li>
            <li>功能卡片文案在小屏下间距过小</li>
          </ul>
        </MessageCard>

        <DiffCard
          expanded={diffExpanded}
          onApply={onApplyDiff}
          onToggle={onToggleDiff}
        />

        <MessageCard
          icon={FileText}
          name="产品经理 Agent"
          time="09:44"
          tone="from-orange-400 to-amber-300"
        >
          <div className="flex items-start justify-between gap-3">
            <p>
              修改建议：
              <br />
              建议将 CTA 按钮文案改为：<b>立即体验</b>，更具行动引导力。
            </p>
            <StatusBadge tone="orange">采纳建议</StatusBadge>
          </div>
          <button
            className={cn(
              "mt-3 flex items-center gap-1 rounded-lg border border-orange-100 bg-orange-50 px-2 py-1 text-xs text-orange-600",
              likedCards.includes("pm-suggestion") &&
                "border-orange-200 bg-orange-100",
            )}
            onClick={() => handleLike("pm-suggestion")}
            type="button"
          >
            <ThumbsUp size={13} />
            {likeCount("pm-suggestion", 3)}
          </button>
        </MessageCard>

        <MessageCard
          icon={Rocket}
          name="部署 Agent"
          time="09:48"
          tone="from-emerald-500 to-teal-400"
        >
          <p>预览环境已发布，邀请团队体验并收集反馈。</p>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
            <span className="text-xs font-semibold text-blue-600">
              https://preview.agenthub.studio/compete/landing
            </span>
            <button
              className="grid size-7 place-items-center rounded-lg text-emerald-600 hover:bg-white"
              onClick={() =>
                onCopyText(
                  "https://preview.agenthub.studio/compete/landing",
                  "预览链接",
                )
              }
              type="button"
            >
              <Copy size={13} />
            </button>
            <StatusBadge tone="green">已通过</StatusBadge>
          </div>
        </MessageCard>

        {chatEvents.map((event) => (
          <RuntimeEventCard event={event} key={event.id} />
        ))}

        {runStatus === "running" ? (
          <SoftCard className="col-span-2 p-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="size-2 animate-pulse rounded-full bg-[#7b61ff]" />
              多 Agent 正在协同更新页面、测试与部署状态...
            </div>
          </SoftCard>
        ) : null}
      </div>

      <ChatInput
        disabled={runStatus === "running"}
        onExportReport={onExportReport}
        onSubmit={handleSubmit}
        onToggleAgent={onToggleAgent}
        onUtilityAction={onUtilityAction}
        selectedAgentName={selectedAgentName}
        selectedAgentNames={selectedAgentNames}
      />
    </SoftCard>
  );
}
