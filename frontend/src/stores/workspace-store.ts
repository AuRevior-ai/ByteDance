import { create } from "zustand";
import { runOrchestrator } from "@/services/orchestrator-api";
import { mapOrchestratorRunToWorkspaceUpdates } from "@/services/orchestrator-response";
import type { Artifact } from "@/types/artifact";
import type { Message } from "@/types/message";
import type { Trace } from "@/types/trace";

const demoMessages: Message[] = [
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

const demoTrace: Trace = {
  id: "trace-demo",
  conversationId: "demo-conversation",
  task: "生成 AI 简历作品集网页",
  status: "running",
  steps: [
    {
      id: "s1",
      agentName: "Orchestrator",
      title: "任务拆解",
      status: "success",
      durationMs: 820,
      summary: "识别为网页生成任务，拆成产品结构、视觉方案、前端代码、审查优化四步。",
    },
    {
      id: "s2",
      agentName: "Product Manager",
      title: "页面信息架构",
      status: "success",
      durationMs: 1120,
      summary: "产出 Hero、项目、技能、联系 CTA 的单页结构。",
    },
    {
      id: "s3",
      agentName: "Frontend Engineer",
      title: "HTML Artifact",
      status: "running",
      summary: "等待生成可预览页面代码。",
    },
  ],
};

const defaultAgentIds = ["pm", "designer", "frontend", "reviewer"];

function formatClock(date = new Date()) {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

interface WorkspaceState {
  activeConversationId: string;
  activePanel: "preview" | "trace";
  selectedAgentIds: string[];
  messages: Message[];
  activeArtifact?: Artifact;
  trace?: Trace;
  isRunning: boolean;
  error?: string;
  setActiveConversationId: (conversationId: string) => void;
  setActivePanel: (panel: "preview" | "trace") => void;
  toggleSelectedAgent: (agentId: string) => void;
  setActiveArtifact: (artifact: Artifact) => void;
  submitTask: (task: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  activeConversationId: "demo-conversation",
  activePanel: "preview",
  selectedAgentIds: defaultAgentIds,
  messages: demoMessages,
  trace: demoTrace,
  isRunning: false,
  setActiveConversationId: (activeConversationId) => set({ activeConversationId }),
  setActivePanel: (activePanel) => set({ activePanel }),
  toggleSelectedAgent: (agentId) =>
    set((state) => {
      const selectedAgentIds = state.selectedAgentIds.includes(agentId)
        ? state.selectedAgentIds.filter((id) => id !== agentId)
        : [...state.selectedAgentIds, agentId];

      return {
        selectedAgentIds: selectedAgentIds.length ? selectedAgentIds : defaultAgentIds,
      };
    }),
  setActiveArtifact: (activeArtifact) => set({ activeArtifact, activePanel: "preview" }),
  submitTask: async (task) => {
    const trimmedTask = task.trim();
    if (!trimmedTask || get().isRunning) {
      return;
    }

    const { activeConversationId, selectedAgentIds } = get();
    const timestamp = formatClock();
    const userMessage: Message = {
      id: `${activeConversationId}-user-${Date.now()}`,
      conversationId: activeConversationId,
      role: "user",
      content: trimmedTask,
      type: "text",
      createdAt: timestamp,
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      error: undefined,
      isRunning: true,
      activePanel: "trace",
      trace: {
        id: `${activeConversationId}-trace-running-${Date.now()}`,
        conversationId: activeConversationId,
        task: trimmedTask,
        status: "running",
        steps: [
          {
            id: `${activeConversationId}-trace-planning`,
            agentName: "Orchestrator",
            title: "任务拆解与分派",
            status: "running",
            summary: "正在读取会话上下文并生成多 Agent 调度计划。",
          },
        ],
      },
    }));

    try {
      const response = await runOrchestrator({
        task: trimmedTask,
        conversationId: activeConversationId,
        agentIds: selectedAgentIds,
      });
      const updates = mapOrchestratorRunToWorkspaceUpdates(response, {
        conversationId: activeConversationId,
        timestamp: formatClock(),
      });

      set((state) => ({
        messages: [...state.messages, ...updates.messages],
        activeArtifact: updates.activeArtifact ?? state.activeArtifact,
        trace: updates.trace,
        activePanel: updates.activeArtifact ? "preview" : "trace",
        isRunning: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Orchestrator 调用失败";
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: `${activeConversationId}-error-${Date.now()}`,
            conversationId: activeConversationId,
            role: "system",
            content: `调用后端失败：${message}`,
            type: "text",
            createdAt: formatClock(),
          },
        ],
        error: message,
        isRunning: false,
        activePanel: "trace",
        trace: state.trace
          ? {
              ...state.trace,
              status: "failed",
              steps: state.trace.steps.map((step) =>
                step.status === "running" ? { ...step, status: "failed", summary: message } : step,
              ),
            }
          : state.trace,
      }));
    }
  },
}));
