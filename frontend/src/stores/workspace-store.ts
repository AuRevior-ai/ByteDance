import { create } from "zustand";

interface WorkspaceState {
  activeConversationId: string;
  activePanel: "preview" | "trace";
  setActiveConversationId: (conversationId: string) => void;
  setActivePanel: (panel: "preview" | "trace") => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeConversationId: "demo-conversation",
  activePanel: "preview",
  setActiveConversationId: (activeConversationId) => set({ activeConversationId }),
  setActivePanel: (activePanel) => set({ activePanel }),
}));

