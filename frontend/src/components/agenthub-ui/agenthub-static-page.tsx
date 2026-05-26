"use client";

import { useEffect, useState } from "react";
import { ChatWorkspace } from "./chat-workspace";
import {
  applyDiff,
  buildWorkspaceReport,
  completeMockRun,
  createConversation,
  createInitialInteractionState,
  restoreInteractionState,
  selectArtifact,
  selectVersion,
  serializeInteractionState,
  startMockRun,
  switchConversation,
  toggleAgentSelection,
  type AgentHubPanelTab,
  type PreviewMode,
} from "./interaction-model";
import { RightPanel } from "./right-panel";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

const STORAGE_KEY = "agenthub-studio-local-demo-state-v1";

export function AgentHubStaticPage() {
  const [state, setState] = useState(createInitialInteractionState);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setState(restoreInteractionState(window.localStorage.getItem(STORAGE_KEY)));
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, serializeInteractionState(state));
  }, [hasHydrated, state]);

  useEffect(() => {
    if (state.runStatus !== "running") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setState((current) =>
        current.runStatus === "running" ? completeMockRun(current) : current,
      );
    }, 900);

    return () => window.clearTimeout(timer);
  }, [state.runStatus, state.chatEvents.length]);

  function handleSubmit(prompt: string) {
    setState((current) =>
      current.runStatus === "running" ? current : startMockRun(current, prompt),
    );
  }

  function handleToast(
    message: string,
    tone: "violet" | "green" | "orange" | "blue" = "violet",
  ) {
    setState((current) => ({
      ...current,
      toast: {
        message,
        tone,
      },
    }));
  }

  async function handleCopyText(text: string, label: string) {
    try {
      await window.navigator.clipboard.writeText(text);
      handleToast(`已复制${label}`, "green");
    } catch {
      handleToast(`复制${label}失败，请手动复制`, "orange");
    }
  }

  function handleExportReport() {
    const report = buildWorkspaceReport(state);
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "agenthub-collaboration-report.md";
    anchor.click();
    window.URL.revokeObjectURL(url);
    handleToast("已导出 AI 协作报告", "green");
  }

  function handleResetWorkspace() {
    window.localStorage.removeItem(STORAGE_KEY);
    setState({
      ...createInitialInteractionState(),
      toast: {
        message: "已重置前端演示数据",
        tone: "violet",
      },
    });
  }

  function handleToastDismiss() {
    setState((current) => ({ ...current, toast: undefined }));
  }

  return (
    <main className="h-screen min-w-[1440px] overflow-hidden bg-[#f4f7fb] p-3 text-slate-900">
      <div className="flex h-full w-full flex-col">
        <TopBar
          onMagicClick={() =>
            handleSubmit(
              "请继续优化首屏 CTA 文案，并让部署 Agent 更新预览环境。",
            )
          }
          onExportReport={handleExportReport}
          onNotificationClick={() =>
            setState((current) => ({
              ...current,
              activeTab: "评论建议",
              notificationCount: 0,
              toast: {
                message: "通知已标记为已读",
                tone: "blue",
              },
            }))
          }
          onResetWorkspace={handleResetWorkspace}
          onSearchChange={(searchQuery) =>
            setState((current) => ({ ...current, searchQuery }))
          }
          notificationCount={state.notificationCount}
          searchQuery={state.searchQuery}
        />
        <section className="mt-3 grid min-h-0 flex-1 grid-cols-[312px_minmax(760px,1fr)_444px] gap-3">
          <Sidebar
            activeConversationId={state.activeConversationId}
            activeNav={state.activeNav}
            conversations={state.conversations}
            onCreateConversation={() => setState(createConversation)}
            onInviteMember={() =>
              handleToast("邀请成员面板已准备好，等待团队权限接口接入", "blue")
            }
            onNavChange={(activeNav) =>
              setState((current) => ({ ...current, activeNav }))
            }
            onSelectAgent={(selectedAgentName) =>
              setState((current) =>
                toggleAgentSelection(current, selectedAgentName),
              )
            }
            onSwitchConversation={(conversationId) =>
              setState((current) => switchConversation(current, conversationId))
            }
            searchQuery={state.searchQuery}
            selectedAgentName={state.selectedAgentName}
            selectedAgentNames={state.selectedAgentNames}
          />
          <ChatWorkspace
            activeArtifactId={state.activeArtifactId}
            artifacts={state.artifacts}
            chatEvents={state.chatEvents}
            diffExpanded={state.diffExpanded}
            onApplyDiff={() => setState(applyDiff)}
            onCopyText={handleCopyText}
            onExportReport={handleExportReport}
            onSelectArtifact={(artifactId) =>
              setState((current) => selectArtifact(current, artifactId))
            }
            onSubmit={handleSubmit}
            onToggleAgent={(agentName) =>
              setState((current) => toggleAgentSelection(current, agentName))
            }
            onToggleDiff={() =>
              setState((current) => ({
                ...current,
                diffExpanded: !current.diffExpanded,
              }))
            }
            runStatus={state.runStatus}
            selectedAgentName={state.selectedAgentName}
            selectedAgentNames={state.selectedAgentNames}
            onUtilityAction={handleToast}
          />
          <RightPanel
            activeArtifactId={state.activeArtifactId}
            activeTab={state.activeTab}
            activeVersion={state.activeVersion}
            artifacts={state.artifacts}
            onPreviewModeChange={(previewMode: PreviewMode) =>
              setState((current) => ({ ...current, previewMode }))
            }
            onCopyText={handleCopyText}
            onExportReport={handleExportReport}
            onPreviewAction={(message) => handleToast(message, "violet")}
            onSelectArtifact={(artifactId) =>
              setState((current) => selectArtifact(current, artifactId))
            }
            onSelectVersion={(version) =>
              setState((current) => selectVersion(current, version))
            }
            onTabChange={(activeTab: AgentHubPanelTab) =>
              setState((current) => ({ ...current, activeTab }))
            }
            previewHeadline={state.previewHeadline}
            previewMode={state.previewMode}
            progress={state.progress}
            runStatus={state.runStatus}
            trackingSteps={state.trackingSteps}
            versions={state.versions}
          />
        </section>
      </div>
      {state.toast ? (
        <button
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-white/80 bg-white/95 px-5 py-3 text-sm font-semibold text-slate-700 shadow-[0_18px_45px_rgba(111,124,161,0.22)] backdrop-blur-xl"
          onClick={handleToastDismiss}
          type="button"
        >
          <span className="mr-2 inline-flex size-2 rounded-full bg-[#7b61ff]" />
          {state.toast.message}
        </button>
      ) : null}
    </main>
  );
}
