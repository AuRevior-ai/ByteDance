import type { Artifact } from "./artifact";

export interface Conversation {
  id: string;
  title: string;
  mode: "single" | "group";
  agentIds: string[];
  pinned: boolean;
  archived: boolean;
  lastActiveAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system" | "agent";
  agentId?: string;
  content: string;
  type: "text" | "code" | "artifact" | "trace";
  artifacts?: Artifact[];
  createdAt: string;
}

