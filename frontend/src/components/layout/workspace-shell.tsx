"use client";

import { Activity, Code2, MessageSquarePlus, Rocket, Search } from "lucide-react";
import { AgentRoster } from "@/components/agent/agent-roster";
import { ArtifactPreview } from "@/components/preview/artifact-preview";
import { ChatThread } from "@/components/chat/chat-thread";
import { ConversationList } from "@/components/chat/conversation-list";
import { TracePanel } from "@/components/trace/trace-panel";
import { useWorkspaceStore } from "@/stores/workspace-store";

export function WorkspaceShell() {
  const { activePanel, setActivePanel } = useWorkspaceStore();

  return (
    <main className="min-h-screen p-4 text-ink">
      <section className="mx-auto grid h-[calc(100vh-2rem)] max-w-[1600px] grid-cols-[280px_minmax(460px,1fr)_420px] overflow-hidden rounded-lg border border-line bg-canvas/95 shadow-workstation">
        <aside className="flex min-h-0 flex-col border-r border-line bg-panel">
          <div className="border-b border-line p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-mint">AgentHub</p>
                <h1 className="mt-1 text-xl font-semibold">Studio</h1>
              </div>
              <button className="rounded-md border border-line bg-panelSoft p-2 text-muted hover:text-ink">
                <MessageSquarePlus size={18} />
              </button>
            </div>
            <label className="mt-4 flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-sm text-muted">
              <Search size={16} />
              <input className="w-full bg-transparent outline-none" placeholder="搜索会话或 Agent" />
            </label>
          </div>
          <ConversationList />
          <AgentRoster />
        </aside>

        <section className="flex min-h-0 flex-col bg-[#0F131A]">
          <header className="flex h-16 items-center justify-between border-b border-line px-5">
            <div>
              <p className="text-sm text-muted">群聊工作台</p>
              <h2 className="text-base font-semibold">AI 简历作品集网页生成</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex items-center gap-1 rounded-md border border-line px-2 py-1">
                <Activity size={14} className="text-mint" />
                Mock 模式
              </span>
              <span className="flex items-center gap-1 rounded-md border border-line px-2 py-1">
                <Rocket size={14} className="text-amber" />
                P0 Demo
              </span>
            </div>
          </header>
          <ChatThread />
        </section>

        <aside className="flex min-h-0 flex-col border-l border-line bg-panel">
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <div>
              <p className="text-sm text-muted">Artifact Workspace</p>
              <h2 className="text-base font-semibold">预览与追踪</h2>
            </div>
            <div className="grid grid-cols-2 rounded-md border border-line bg-canvas p-1">
              <button
                className={`rounded px-3 py-1.5 text-sm ${activePanel === "preview" ? "bg-accent text-white" : "text-muted"}`}
                onClick={() => setActivePanel("preview")}
              >
                <Code2 size={16} />
              </button>
              <button
                className={`rounded px-3 py-1.5 text-sm ${activePanel === "trace" ? "bg-accent text-white" : "text-muted"}`}
                onClick={() => setActivePanel("trace")}
              >
                <Activity size={16} />
              </button>
            </div>
          </div>
          {activePanel === "preview" ? <ArtifactPreview /> : <TracePanel />}
        </aside>
      </section>
    </main>
  );
}

