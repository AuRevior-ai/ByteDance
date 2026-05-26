import { trackingSteps, versions } from "./mock-data";

export type AgentHubRunStatus = "idle" | "running" | "done";
export type AgentHubPanelTab = "版本历史" | "部署状态" | "评论建议";
export type PreviewMode = "desktop" | "window" | "external";

export interface InteractiveTrackingStep {
  title: string;
  status: string;
  kind: "done" | "running" | "pending";
}

export interface InteractiveVersion {
  version: string;
  tag?: string;
  title: string;
  time: string;
}

export interface ConversationItem {
  id: string;
  title: string;
  description: string;
  unread: number;
  lastActive: string;
}

export interface ArtifactItem {
  id: string;
  title: string;
  type: "html" | "code" | "diff" | "deployment";
  description: string;
  status: string;
}

export interface ToastMessage {
  message: string;
  tone: "violet" | "green" | "orange" | "blue";
}

export interface ChatEvent {
  id: string;
  type: "user" | "agent";
  agentName?: string;
  content: string;
  time: string;
  tone?: "violet" | "green" | "orange" | "blue";
}

export interface AgentHubInteractionState {
  activeConversationId: string;
  activeNav: string;
  selectedAgentName: string;
  selectedAgentNames: string[];
  searchQuery: string;
  notificationCount: number;
  activeTab: AgentHubPanelTab;
  previewMode: PreviewMode;
  runStatus: AgentHubRunStatus;
  progress: number;
  previewHeadline: string;
  activeArtifactId: string;
  activeVersion: string;
  conversations: ConversationItem[];
  artifacts: ArtifactItem[];
  trackingSteps: InteractiveTrackingStep[];
  versions: InteractiveVersion[];
  chatEvents: ChatEvent[];
  diffExpanded: boolean;
  toast?: ToastMessage;
}

function nowLabel() {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function createInitialInteractionState(): AgentHubInteractionState {
  return {
    activeConversationId: "conv-main",
    activeNav: "最近会话",
    selectedAgentName: "总控协调 Agent",
    selectedAgentNames: [
      "总控协调 Agent",
      "产品经理 Agent",
      "前端 Agent",
      "测试 Agent",
      "部署 Agent",
    ],
    searchQuery: "",
    notificationCount: 3,
    activeTab: "版本历史",
    previewMode: "desktop",
    runStatus: "idle",
    progress: 83,
    previewHeadline: "多 Agent 协作，边聊边做",
    activeArtifactId: "preview-html",
    activeVersion: "v1.3",
    conversations: [
      {
        id: "conv-main",
        title: "产品说明页并部署演示站",
        description: "7 个 Agent 协作中",
        unread: 8,
        lastActive: "09:48",
      },
      {
        id: "conv-research",
        title: "竞品研究摘要整理",
        description: "研究员 Agent 已完成",
        unread: 2,
        lastActive: "昨天",
      },
      {
        id: "conv-test",
        title: "移动端文案溢出检查",
        description: "测试 Agent 待确认",
        unread: 1,
        lastActive: "周一",
      },
    ],
    artifacts: [
      {
        id: "preview-html",
        title: "landing-preview.html",
        type: "html",
        description: "产品说明页预览",
        status: "已通过",
      },
      {
        id: "hero-code",
        title: "HeroSection.vue",
        type: "code",
        description: "首屏组件代码",
        status: "Vue 3",
      },
      {
        id: "index-diff",
        title: "index.vue Diff",
        type: "diff",
        description: "CTA 与副标题修改",
        status: "待应用",
      },
      {
        id: "preview-deploy",
        title: "预览环境",
        type: "deployment",
        description: "preview.agenthub.studio",
        status: "已通过",
      },
    ],
    trackingSteps: trackingSteps.map(([title, status, kind]) => ({
      title,
      status,
      kind,
    })),
    versions,
    chatEvents: [],
    diffExpanded: false,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validRunStatus(value: unknown): AgentHubRunStatus {
  return value === "done" || value === "idle" ? value : "idle";
}

function validPanelTab(value: unknown): AgentHubPanelTab {
  return value === "部署状态" || value === "评论建议" || value === "版本历史"
    ? value
    : "版本历史";
}

function validPreviewMode(value: unknown): PreviewMode {
  return value === "window" || value === "external" || value === "desktop"
    ? value
    : "desktop";
}

export function serializeInteractionState(
  state: AgentHubInteractionState,
): string {
  return JSON.stringify({
    ...state,
    runStatus: state.runStatus === "running" ? "idle" : state.runStatus,
    toast: undefined,
  });
}

export function restoreInteractionState(
  serialized: string | null,
): AgentHubInteractionState {
  const base = createInitialInteractionState();

  if (!serialized) {
    return base;
  }

  try {
    const parsed: unknown = JSON.parse(serialized);

    if (!isPlainObject(parsed)) {
      return base;
    }

    return {
      ...base,
      ...parsed,
      activeConversationId:
        typeof parsed.activeConversationId === "string"
          ? parsed.activeConversationId
          : base.activeConversationId,
      activeNav:
        typeof parsed.activeNav === "string"
          ? parsed.activeNav
          : base.activeNav,
      selectedAgentName:
        typeof parsed.selectedAgentName === "string"
          ? parsed.selectedAgentName
          : base.selectedAgentName,
      selectedAgentNames: Array.isArray(parsed.selectedAgentNames)
        ? parsed.selectedAgentNames.filter(
            (name): name is string => typeof name === "string",
          )
        : base.selectedAgentNames,
      searchQuery:
        typeof parsed.searchQuery === "string" ? parsed.searchQuery : "",
      notificationCount:
        typeof parsed.notificationCount === "number"
          ? clamp(parsed.notificationCount, 0, 99)
          : base.notificationCount,
      activeTab: validPanelTab(parsed.activeTab),
      previewMode: validPreviewMode(parsed.previewMode),
      runStatus: validRunStatus(parsed.runStatus),
      progress:
        typeof parsed.progress === "number"
          ? clamp(parsed.progress, 0, 100)
          : base.progress,
      previewHeadline:
        typeof parsed.previewHeadline === "string"
          ? parsed.previewHeadline
          : base.previewHeadline,
      activeArtifactId:
        typeof parsed.activeArtifactId === "string"
          ? parsed.activeArtifactId
          : base.activeArtifactId,
      activeVersion:
        typeof parsed.activeVersion === "string"
          ? parsed.activeVersion
          : base.activeVersion,
      conversations: Array.isArray(parsed.conversations)
        ? (parsed.conversations as ConversationItem[])
        : base.conversations,
      artifacts: Array.isArray(parsed.artifacts)
        ? (parsed.artifacts as ArtifactItem[])
        : base.artifacts,
      trackingSteps: Array.isArray(parsed.trackingSteps)
        ? (parsed.trackingSteps as InteractiveTrackingStep[])
        : base.trackingSteps,
      versions: Array.isArray(parsed.versions)
        ? (parsed.versions as InteractiveVersion[])
        : base.versions,
      chatEvents: Array.isArray(parsed.chatEvents)
        ? (parsed.chatEvents as ChatEvent[])
        : base.chatEvents,
      diffExpanded:
        typeof parsed.diffExpanded === "boolean"
          ? parsed.diffExpanded
          : base.diffExpanded,
      toast: undefined,
    };
  } catch {
    return base;
  }
}

export function buildWorkspaceReport(state: AgentHubInteractionState): string {
  const currentVersion =
    state.versions.find((version) => version.tag === "当前版本") ??
    state.versions[0];
  const activeArtifact = state.artifacts.find(
    (artifact) => artifact.id === state.activeArtifactId,
  );
  const selectedAgents = state.selectedAgentNames.join("、");
  const taskLines = state.trackingSteps
    .map((step) => `- ${step.title}：${step.status}`)
    .join("\n");
  const artifactLines = state.artifacts
    .map(
      (artifact) =>
        `- ${artifact.title}（${artifact.description}）：${artifact.status}`,
    )
    .join("\n");
  const eventLines = state.chatEvents.length
    ? state.chatEvents
        .slice(-6)
        .map(
          (event) =>
            `- ${event.time} ${event.type === "user" ? "林晓宇" : event.agentName}：${event.content}`,
        )
        .join("\n")
    : "- 暂无新增运行记录";

  return [
    "# AgentHub Studio 协作报告",
    "",
    `导出时间：${nowLabel()}`,
    `当前会话：${state.conversations.find((item) => item.id === state.activeConversationId)?.title ?? "比赛项目协作"}`,
    `总体进度：${state.progress}%`,
    `当前版本：${currentVersion?.version ?? state.activeVersion}`,
    `当前预览：${state.previewHeadline}`,
    `当前产物：${activeArtifact?.title ?? "landing-preview.html"}`,
    `参与 Agent：${selectedAgents}`,
    "",
    "## 任务追踪",
    taskLines,
    "",
    "## 产物清单",
    artifactLines,
    "",
    "## 最近协作记录",
    eventLines,
    "",
    "## 部署",
    "- 预览环境：preview.agenthub.studio",
    "- 生产环境：尚未部署到生产环境",
    "",
  ].join("\n");
}

export function startMockRun(
  state: AgentHubInteractionState,
  prompt: string,
): AgentHubInteractionState {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) {
    return state;
  }

  const time = nowLabel();

  return {
    ...state,
    runStatus: "running",
    progress: 68,
    notificationCount: clamp(state.notificationCount + 1, 0, 99),
    activeTab: "评论建议",
    activeArtifactId: "index-diff",
    toast: {
      message: "已创建前端模拟协作任务",
      tone: "violet",
    },
    trackingSteps: state.trackingSteps.map((step) =>
      step.title === "前端页面开发与实现" || step.title === "测试与优化"
        ? { ...step, status: "进行中", kind: "running" }
        : step,
    ),
    chatEvents: [
      ...state.chatEvents,
      {
        id: `user-${Date.now()}`,
        type: "user",
        content: cleanPrompt,
        time,
      },
      {
        id: `orchestrator-${Date.now()}`,
        type: "agent",
        agentName: "总控协调 Agent",
        content:
          "已收到新的修改请求，正在分派前端、测试和部署 Agent 进行协作。",
        time,
        tone: "violet",
      },
    ],
  };
}

export function completeMockRun(
  state: AgentHubInteractionState,
): AgentHubInteractionState {
  const time = nowLabel();
  const nextVersions = state.versions.map((item) =>
    item.tag ? { ...item, tag: undefined } : item,
  );

  return {
    ...state,
    runStatus: "done",
    progress: 100,
    notificationCount: clamp(state.notificationCount + 1, 0, 99),
    activeTab: "部署状态",
    activeArtifactId: "preview-deploy",
    activeVersion: "v1.4",
    previewHeadline: "多 Agent 协作，边聊边做",
    diffExpanded: true,
    toast: {
      message: "预览环境已发布，版本 v1.4 已生成",
      tone: "green",
    },
    artifacts: state.artifacts.map((artifact) =>
      artifact.id === "index-diff"
        ? { ...artifact, status: "已应用" }
        : artifact,
    ),
    trackingSteps: state.trackingSteps.map((step) => ({
      ...step,
      status: "已完成",
      kind: "done",
    })),
    versions: [
      {
        version: "v1.4",
        tag: "当前版本",
        title: "采纳 CTA 文案与测试修复",
        time: "刚刚",
      },
      ...nextVersions,
    ],
    chatEvents: [
      ...state.chatEvents,
      {
        id: `frontend-${Date.now()}`,
        type: "agent",
        agentName: "前端 Agent",
        content:
          "已根据建议更新 CTA 文案，并同步修复移动端副标题换行与卡片间距。",
        time,
        tone: "blue",
      },
      {
        id: `deploy-${Date.now()}`,
        type: "agent",
        agentName: "部署 Agent",
        content: "预览环境已重新发布，当前版本 v1.4 已通过检查。",
        time,
        tone: "green",
      },
    ],
  };
}

export function createConversation(
  state: AgentHubInteractionState,
): AgentHubInteractionState {
  const nextConversation: ConversationItem = {
    id: `conv-${Date.now()}`,
    title: "新的 Agent 协作任务",
    description: "等待输入任务目标",
    unread: 0,
    lastActive: "刚刚",
  };

  return {
    ...state,
    activeConversationId: nextConversation.id,
    activeNav: "最近会话",
    conversations: [nextConversation, ...state.conversations],
    chatEvents: [],
    progress: 0,
    runStatus: "idle",
    activeTab: "版本历史",
    activeArtifactId: "preview-html",
    activeVersion: "v1.3",
    toast: {
      message: "已新建会话，可以输入任务开始协作",
      tone: "violet",
    },
  };
}

export function switchConversation(
  state: AgentHubInteractionState,
  conversationId: string,
): AgentHubInteractionState {
  const conversation = state.conversations.find(
    (item) => item.id === conversationId,
  );
  if (!conversation) {
    return state;
  }

  return {
    ...state,
    activeConversationId: conversation.id,
    activeNav: "最近会话",
    searchQuery: "",
    previewHeadline:
      conversation.id === "conv-research"
        ? "竞品研究与用户诉求摘要"
        : "多 Agent 协作，边聊边做",
    activeArtifactId:
      conversation.id === "conv-research" ? "hero-code" : "preview-html",
    toast: {
      message: `已切换到：${conversation.title}`,
      tone: "blue",
    },
  };
}

export function toggleAgentSelection(
  state: AgentHubInteractionState,
  agentName: string,
): AgentHubInteractionState {
  const selectedAgentNames = state.selectedAgentNames.includes(agentName)
    ? state.selectedAgentNames.filter((name) => name !== agentName)
    : [...state.selectedAgentNames, agentName];

  return {
    ...state,
    selectedAgentName: agentName,
    selectedAgentNames: selectedAgentNames.length
      ? selectedAgentNames
      : [agentName],
    toast: {
      message: selectedAgentNames.includes(agentName)
        ? `已选择 ${agentName}`
        : `已取消 ${agentName}`,
      tone: "violet",
    },
  };
}

export function selectArtifact(
  state: AgentHubInteractionState,
  artifactId: string,
): AgentHubInteractionState {
  const artifact = state.artifacts.find((item) => item.id === artifactId);
  if (!artifact) {
    return state;
  }

  const activeTab: AgentHubPanelTab =
    artifact.type === "deployment" || artifact.type === "html"
      ? "部署状态"
      : "版本历史";

  return {
    ...state,
    activeArtifactId: artifact.id,
    activeTab,
    diffExpanded: artifact.type === "diff" ? true : state.diffExpanded,
    toast: {
      message: `已打开 ${artifact.title}`,
      tone: artifact.type === "diff" ? "orange" : "blue",
    },
  };
}

export function selectVersion(
  state: AgentHubInteractionState,
  version: string,
): AgentHubInteractionState {
  const versionItem = state.versions.find((item) => item.version === version);
  if (!versionItem) {
    return state;
  }

  const headlines: Record<string, string> = {
    "v1.4": "多 Agent 协作，边聊边做",
    "v1.3": "多 Agent 协作，边聊边做",
    "v1.2": "首屏布局与配色方案",
    "v1.1": "功能模块内容完善版",
  };

  return {
    ...state,
    activeVersion: versionItem.version,
    previewHeadline: headlines[versionItem.version] ?? state.previewHeadline,
    toast: {
      message: `正在查看 ${versionItem.version}`,
      tone: "blue",
    },
  };
}

export function applyDiff(
  state: AgentHubInteractionState,
): AgentHubInteractionState {
  const withoutCurrent = state.versions.map((item) =>
    item.tag ? { ...item, tag: undefined } : item,
  );
  const hasV14 = withoutCurrent.some((item) => item.version === "v1.4");

  return {
    ...state,
    diffExpanded: true,
    activeArtifactId: "preview-html",
    activeVersion: "v1.4",
    activeTab: "版本历史",
    progress: Math.max(state.progress, 92),
    notificationCount: clamp(state.notificationCount + 1, 0, 99),
    previewHeadline: "多 Agent 协作，边聊边做",
    versions: hasV14
      ? withoutCurrent.map((item) =>
          item.version === "v1.4"
            ? { ...item, tag: "当前版本", time: "刚刚" }
            : item,
        )
      : [
          {
            version: "v1.4",
            tag: "当前版本",
            title: "应用 Diff 并优化 CTA",
            time: "刚刚",
          },
          ...withoutCurrent,
        ],
    artifacts: state.artifacts.map((artifact) =>
      artifact.id === "index-diff"
        ? { ...artifact, status: "已应用" }
        : artifact,
    ),
    toast: {
      message: "Diff 已应用，已生成新版本",
      tone: "green",
    },
  };
}
