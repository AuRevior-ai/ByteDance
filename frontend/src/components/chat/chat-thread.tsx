"use client";

import { useEffect, useRef, useState } from "react";
import { AtSign, Check, Copy, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { ArtifactCard } from "@/components/artifact/artifact-card";
import { useWorkspaceStore } from "@/stores/workspace-store";

const demoPrompt =
  "帮我生成一个 AI 简历作品集网页，要求深色高级风格，包含个人介绍、项目展示、技能标签和联系方式。请让产品经理先规划结构，UI 设计师给出视觉方案，前端工程师生成代码，代码审查员检查并优化。";

const agentOptions = [
  { id: "pm", name: "Product Manager", hint: "需求结构" },
  { id: "designer", name: "UI Designer", hint: "视觉方案" },
  { id: "frontend", name: "Frontend Engineer", hint: "HTML Artifact" },
  { id: "reviewer", name: "Code Reviewer", hint: "审查优化" },
];

export function ChatThread() {
  const [draft, setDraft] = useState("");
  const [showAgentPicker, setShowAgentPicker] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    selectedAgentIds,
    isRunning,
    submitTask,
    toggleSelectedAgent,
    setActiveArtifact,
  } = useWorkspaceStore();

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isRunning]);

  async function handleSubmit() {
    if (!draft.trim() || isRunning) {
      return;
    }

    const nextTask = draft;
    setDraft("");
    setShowAgentPicker(false);
    await submitTask(nextTask);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={listRef} className="min-h-0 flex-1 space-y-4 overflow-auto p-5">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`max-w-[86%] rounded-lg border px-4 py-3 ${
              message.role === "user"
                ? "ml-auto border-accent/50 bg-accent/15"
                : message.role === "system"
                  ? "border-danger/40 bg-danger/10"
                  : "border-line bg-panel"
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted">
              <span>{message.role === "user" ? "你" : message.agentId ?? "system"}</span>
              <span>{message.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
            {message.artifacts?.length ? (
              <div className="mt-3 space-y-2">
                {message.artifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onOpen={() => setActiveArtifact(artifact)}
                  />
                ))}
              </div>
            ) : null}
            <div className="mt-3 flex gap-2 text-muted">
              <button className="rounded border border-line p-1.5 hover:text-ink" type="button">
                <Copy size={14} />
              </button>
              <button className="rounded border border-line p-1.5 hover:text-ink" type="button">
                <RotateCcw size={14} />
              </button>
            </div>
          </article>
        ))}

        {isRunning ? (
          <article className="max-w-[86%] rounded-lg border border-line bg-panel px-4 py-3">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted">
              <Loader2 size={14} className="animate-spin text-mint" />
              <span>Orchestrator 正在协调 Agent</span>
            </div>
            <p className="text-sm leading-7 text-muted">
              正在生成 Task Plan，并把任务分派给已选择的 Agent。
            </p>
          </article>
        ) : null}
      </div>

      <footer className="border-t border-line p-4">
        <form
          className="rounded-lg border border-line bg-canvas p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-md border border-mint/40 bg-mint/10 px-2 py-1 text-xs text-mint">
              <Sparkles size={13} />
              @Orchestrator
            </span>
            {agentOptions.map((agent) => (
              <button
                key={agent.id}
                className={`rounded-md border px-2 py-1 text-xs transition ${
                  selectedAgentIds.includes(agent.id)
                    ? "border-accent/60 bg-accent/15 text-ink"
                    : "border-line text-muted hover:text-ink"
                }`}
                onClick={() => toggleSelectedAgent(agent.id)}
                type="button"
              >
                {agent.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              className="h-24 w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-muted"
              onChange={(event) => {
                setDraft(event.target.value);
                setShowAgentPicker(event.target.value.endsWith("@"));
              }}
              onFocus={() => setShowAgentPicker(draft.endsWith("@"))}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void handleSubmit();
                }
              }}
              placeholder="@Orchestrator 描述你想生成或修改的产物..."
              value={draft}
            />
            {showAgentPicker ? (
              <div className="absolute bottom-full left-0 mb-2 w-80 overflow-hidden rounded-md border border-line bg-panel shadow-workstation">
                {agentOptions.map((agent) => {
                  const selected = selectedAgentIds.includes(agent.id);
                  return (
                    <button
                      key={agent.id}
                      className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-panelSoft"
                      onClick={() => {
                        toggleSelectedAgent(agent.id);
                        setShowAgentPicker(false);
                      }}
                      type="button"
                    >
                      <span>
                        <span className="block text-sm">{agent.name}</span>
                        <span className="text-xs text-muted">{agent.hint}</span>
                      </span>
                      {selected ? <Check size={16} className="text-mint" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <AtSign size={14} />
              <span>@ 选择 Agent，Enter 发送，Shift + Enter 换行</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-ink"
                onClick={() => setDraft(demoPrompt)}
                type="button"
              >
                填入 Demo Prompt
              </button>
              <button
                className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!draft.trim() || isRunning}
                type="submit"
              >
                {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                发送
              </button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
}
