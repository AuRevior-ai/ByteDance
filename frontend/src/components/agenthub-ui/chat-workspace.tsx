import type { ComponentType, ReactNode } from "react";
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
  FileText,
  Rocket,
  SearchCheck,
  Send,
  Smile,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { chatAvatars, codeLines, taskSteps } from "./mock-data";
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
        <h3 className="text-base font-bold text-slate-900">任务拆解完成，共 6 步</h3>
      </div>
      <div className="mt-4 space-y-2">
        {taskSteps.map(([title, agent, tone], index) => (
          <div className="grid grid-cols-[26px_1fr_auto] items-center gap-2" key={title}>
            <span className="grid size-5 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500">
              {index + 1}
            </span>
            <span className="truncate text-xs font-medium text-slate-700">{title}</span>
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

function FileAttachment({ title, size }: { title: string; size: string }) {
  return (
    <div className="mt-3 flex h-12 items-center gap-3 rounded-xl border border-[#dfe7f4] bg-white px-3 shadow-[0_6px_16px_rgba(111,124,161,0.08)]">
      <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-500">
        <File size={17} />
      </span>
      <div>
        <p className="text-xs font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-400">{size}</p>
      </div>
    </div>
  );
}

function CodeArtifactCard() {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-[#111827] shadow-[0_15px_28px_rgba(17,24,39,0.18)]">
      <div className="flex h-8 items-center justify-between border-b border-white/10 bg-[#f8fafc] px-3 text-xs">
        <span className="font-semibold text-slate-700">HeroSection.vue</span>
        <StatusBadge tone="gray">Vue 3</StatusBadge>
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

function DiffCard() {
  return (
    <SoftCard className="col-span-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Code2 size={16} />
          </span>
          <h3 className="text-sm font-bold text-slate-800">差异对比 (index.vue)</h3>
        </div>
        <span className="text-xs text-slate-400">09:43</span>
      </div>
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[#dfe7f4] text-xs">
        <div className="bg-rose-50 p-4 font-mono leading-7 text-rose-500">
          <p>- &lt;a class="btn primary"&gt;开始体验&lt;/a&gt;</p>
          <p>- &lt;p class="subtitle"&gt;让协作更高效&lt;/p&gt;</p>
        </div>
        <div className="bg-emerald-50 p-4 font-mono leading-7 text-emerald-600">
          <p>+ &lt;a class="btn primary"&gt;立即体验&lt;/a&gt;</p>
          <p>+ &lt;p class="subtitle"&gt;让复杂任务像对话一样自然完成&lt;/p&gt;</p>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-[0_6px_18px_rgba(111,124,161,0.12)]">
          查看完整 Diff
        </button>
      </div>
    </SoftCard>
  );
}

function ChatInput() {
  return (
    <div className="mt-3 rounded-2xl border border-[#dfe7f4] bg-white px-4 py-3 shadow-[0_12px_25px_rgba(111,124,161,0.09)]">
      <p className="text-sm text-slate-400">给 AgentHub 发送消息，@Agent 或输入 / 选择技能...</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-5 text-slate-400">
          <Paperclip size={17} />
          <AtSign size={17} />
          <span className="text-lg leading-none">/</span>
          <Gift size={17} />
          <File size={17} />
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-[#dfe7f4] bg-white px-3 py-2 text-xs font-semibold text-slate-500">
            ↵ 换行
          </button>
          <button className="grid size-9 place-items-center rounded-xl bg-[#7b61ff] text-white shadow-[0_9px_18px_rgba(123,97,255,0.28)]">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatWorkspace() {
  return (
    <SoftCard className="flex min-h-0 flex-col overflow-hidden p-4">
      <header className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-[-0.01em] text-slate-900">🎉 为比赛项目生成产品说明页并部署演示站</h1>
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

      <div className="agenthub-scroll mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-auto pr-1">
        <TaskBreakdownCard />

        <MessageCard icon={Bot} name="总控协调 Agent" time="09:30" tone="from-violet-500 to-indigo-400">
          <p>任务已创建并拆解完成，已邀请 7 个 Agent 协作</p>
          <p>预计耗时 35 分钟</p>
        </MessageCard>

        <MessageCard icon={FileText} name="产品经理 Agent" time="09:34" tone="from-orange-400 to-amber-300">
          <p>已完成需求澄清，输出产品说明页结构与文案大纲。</p>
          <FileAttachment title="产品说明页_结构与文案大纲.md" size="32KB" />
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <AvatarStack items={["林"]} size="sm" />
            <span>2 条回复</span>
          </div>
        </MessageCard>

        <MessageCard icon={SearchCheck} name="研究员 Agent" time="09:32" tone="from-emerald-500 to-teal-400">
          <p>已整理竞品要点与用户诉求，形成研究摘要文档。</p>
          <FileAttachment title="竞品研究与用户诉求摘要.md" size="18KB" />
          <div className="mt-3 flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-[#dfe7f4] bg-white px-2 py-1 text-xs text-slate-600">
              <ThumbsUp size={13} />2
            </button>
            <button className="grid size-7 place-items-center rounded-lg border border-[#dfe7f4] bg-white text-slate-500">
              <Smile size={13} />
            </button>
          </div>
        </MessageCard>

        <MessageCard className="col-start-2" icon={Code2} name="前端 Agent" time="09:37" tone="from-indigo-500 to-blue-400">
          <p>已生成首屏布局与配色方案，开始编码实现。</p>
          <CodeArtifactCard />
        </MessageCard>

        <MessageCard icon={Bug} name="测试 Agent" time="09:42" tone="from-orange-400 to-amber-300">
          <p>检测到 2 处文案溢出，建议修复：</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>首屏副标题在移动端会换行溢出</li>
            <li>功能卡片文案在小屏下间距过小</li>
          </ul>
        </MessageCard>

        <DiffCard />

        <MessageCard icon={FileText} name="产品经理 Agent" time="09:44" tone="from-orange-400 to-amber-300">
          <div className="flex items-start justify-between gap-3">
            <p>
              修改建议：
              <br />
              建议将 CTA 按钮文案改为：<b>立即体验</b>，更具行动引导力。
            </p>
            <StatusBadge tone="orange">采纳建议</StatusBadge>
          </div>
          <button className="mt-3 flex items-center gap-1 rounded-lg border border-orange-100 bg-orange-50 px-2 py-1 text-xs text-orange-600">
            <ThumbsUp size={13} />3
          </button>
        </MessageCard>

        <MessageCard icon={Rocket} name="部署 Agent" time="09:48" tone="from-emerald-500 to-teal-400">
          <p>预览环境已发布，邀请团队体验并收集反馈。</p>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
            <span className="text-xs font-semibold text-blue-600">https://preview.agenthub.studio/compete/landing</span>
            <StatusBadge tone="green">已通过</StatusBadge>
          </div>
        </MessageCard>
      </div>

      <ChatInput />
    </SoftCard>
  );
}
