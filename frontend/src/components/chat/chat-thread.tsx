import { Copy, RotateCcw, Send } from "lucide-react";
import type { Message } from "@/types/message";

const messages: Message[] = [
  {
    id: "m1",
    conversationId: "demo-conversation",
    role: "user",
    content:
      "帮我生成一个 AI 简历作品集网页，要求深色高级风格，包含个人介绍、项目展示、技能标签和联系方式。请让产品经理先规划结构，UI 设计师给出视觉方案，前端工程师生成代码，代码审查员检查并优化。",
    type: "text",
    createdAt: "20:30",
  },
  {
    id: "m2",
    conversationId: "demo-conversation",
    role: "agent",
    agentId: "orchestrator",
    content: "我会按 PM -> UI Designer -> Frontend Engineer -> Code Reviewer 的顺序执行，并记录 Trace。",
    type: "trace",
    createdAt: "20:31",
  },
  {
    id: "m3",
    conversationId: "demo-conversation",
    role: "agent",
    agentId: "pm",
    content: "页面结构建议为 Hero、项目精选、技能矩阵、联系 CTA 四段，优先保证 3 分钟 Demo 中能快速看清成果。",
    type: "text",
    createdAt: "20:32",
  },
];

export function ChatThread() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-5">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`max-w-[82%] rounded-lg border px-4 py-3 ${
              message.role === "user"
                ? "ml-auto border-accent/50 bg-accent/15"
                : "border-line bg-panel"
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted">
              <span>{message.role === "user" ? "你" : message.agentId}</span>
              <span>{message.createdAt}</span>
            </div>
            <p className="text-sm leading-7">{message.content}</p>
            <div className="mt-3 flex gap-2 text-muted">
              <button className="rounded border border-line p-1.5 hover:text-ink">
                <Copy size={14} />
              </button>
              <button className="rounded border border-line p-1.5 hover:text-ink">
                <RotateCcw size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="border-t border-line p-4">
        <div className="rounded-lg border border-line bg-canvas p-3">
          <textarea
            className="h-20 w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted"
            placeholder="@Orchestrator 描述你想生成或修改的产物..."
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-muted">@ 选择 Agent，/ 插入常用指令</div>
            <button className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white">
              <Send size={16} />
              发送
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

