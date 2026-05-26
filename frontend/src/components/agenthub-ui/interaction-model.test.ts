import { describe, expect, it } from "vitest";
import {
  applyDiff,
  buildWorkspaceReport,
  completeMockRun,
  createConversation,
  createInitialInteractionState,
  restoreInteractionState,
  serializeInteractionState,
  selectArtifact,
  selectVersion,
  startMockRun,
  switchConversation,
  toggleAgentSelection,
} from "./interaction-model";

describe("agenthub interaction model", () => {
  it("starts a mock agent run from a user prompt", () => {
    const state = startMockRun(
      createInitialInteractionState(),
      "请把 CTA 文案改得更有行动力",
    );

    expect(state.runStatus).toBe("running");
    expect(state.progress).toBe(68);
    expect(state.chatEvents).toHaveLength(2);
    expect(state.chatEvents[0]).toMatchObject({
      type: "user",
      content: "请把 CTA 文案改得更有行动力",
    });
    expect(
      state.trackingSteps
        .filter((step) => step.kind === "running")
        .map((step) => step.title),
    ).toEqual(["前端页面开发与实现", "测试与优化"]);
  });

  it("completes a mock agent run with new version and deployment state", () => {
    const running = startMockRun(
      createInitialInteractionState(),
      "请把 CTA 文案改得更有行动力",
    );
    const completed = completeMockRun(running);

    expect(completed.runStatus).toBe("done");
    expect(completed.progress).toBe(100);
    expect(completed.activeTab).toBe("部署状态");
    expect(completed.previewHeadline).toBe("多 Agent 协作，边聊边做");
    expect(completed.versions[0]).toMatchObject({
      version: "v1.4",
      tag: "当前版本",
      title: "采纳 CTA 文案与测试修复",
    });
    expect(completed.chatEvents.at(-1)).toMatchObject({
      type: "agent",
      agentName: "部署 Agent",
    });
  });

  it("creates and switches local conversations without backend data", () => {
    const initial = createInitialInteractionState();
    const created = createConversation(initial);

    expect(created.conversations).toHaveLength(
      initial.conversations.length + 1,
    );
    expect(created.activeConversationId).toBe(created.conversations[0].id);
    expect(created.chatEvents).toEqual([]);
    expect(created.toast?.message).toContain("已新建会话");

    const switched = switchConversation(created, "conv-main");
    expect(switched.activeConversationId).toBe("conv-main");
    expect(switched.previewHeadline).toBe("多 Agent 协作，边聊边做");
  });

  it("selects agents, artifacts, versions, and applies diff locally", () => {
    const initial = createInitialInteractionState();
    const withoutFrontend = toggleAgentSelection(initial, "前端 Agent");
    const withFrontend = toggleAgentSelection(withoutFrontend, "前端 Agent");

    expect(withoutFrontend.selectedAgentNames).not.toContain("前端 Agent");
    expect(withFrontend.selectedAgentNames).toContain("前端 Agent");

    const artifactState = selectArtifact(initial, "preview-html");
    expect(artifactState.activeArtifactId).toBe("preview-html");
    expect(artifactState.activeTab).toBe("部署状态");

    const versionState = selectVersion(initial, "v1.2");
    expect(versionState.activeVersion).toBe("v1.2");
    expect(versionState.previewHeadline).toBe("首屏布局与配色方案");

    const diffState = applyDiff(initial);
    expect(diffState.versions[0]).toMatchObject({
      version: "v1.4",
      tag: "当前版本",
    });
    expect(diffState.diffExpanded).toBe(true);
    expect(diffState.toast?.message).toContain("Diff 已应用");
  });

  it("serializes and restores local demo state without restoring transient running status", () => {
    const running = startMockRun(
      createInitialInteractionState(),
      "请重新部署预览站",
    );
    const serialized = serializeInteractionState(running);
    const restored = restoreInteractionState(serialized);

    expect(restored.chatEvents).toHaveLength(2);
    expect(restored.runStatus).toBe("idle");
    expect(restored.toast).toBeUndefined();
    expect(restored.activeConversationId).toBe("conv-main");
  });

  it("builds a markdown collaboration report from frontend state", () => {
    const completed = completeMockRun(
      startMockRun(createInitialInteractionState(), "修复 CTA 文案"),
    );
    const report = buildWorkspaceReport(completed);

    expect(report).toContain("# AgentHub Studio 协作报告");
    expect(report).toContain("总体进度：100%");
    expect(report).toContain("当前版本：v1.4");
    expect(report).toContain("前端 Agent");
    expect(report).toContain("预览环境");
  });
});
