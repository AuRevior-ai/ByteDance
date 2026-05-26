"use client";

import { Archive, Pin } from "lucide-react";
import type { Conversation } from "@/types/message";

const conversations: Conversation[] = [
  {
    id: "demo-conversation",
    title: "AI 简历作品集网页生成",
    mode: "group",
    agentIds: ["orchestrator", "pm", "designer", "frontend", "reviewer"],
    pinned: true,
    archived: false,
    lastActiveAt: "今天 20:30",
  },
  {
    id: "single-frontend",
    title: "React 组件单聊调试",
    mode: "single",
    agentIds: ["frontend"],
    pinned: false,
    archived: false,
    lastActiveAt: "昨天",
  },
];

export function ConversationList() {
  return (
    <section className="border-b border-line p-3">
      <div className="mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-[0.18em] text-muted">
        <span>Conversations</span>
        <Archive size={14} />
      </div>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className="w-full rounded-md border border-transparent bg-panelSoft px-3 py-3 text-left hover:border-accent/70"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{conversation.title}</p>
              {conversation.pinned ? <Pin size={14} className="text-amber" /> : null}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted">
              <span>{conversation.mode === "group" ? "群聊" : "单聊"}</span>
              <span>{conversation.lastActiveAt}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

