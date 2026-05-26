import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";

export interface ConversationDto {
  id: string;
  title: string;
  mode: "single" | "group";
  agentIds: string[];
  pinned: boolean;
  archived: boolean;
  lastActiveAt: string;
}

@Injectable()
export class ConversationsService {
  private readonly conversations: ConversationDto[] = [
    {
      id: "demo-conversation",
      title: "AI 简历作品集网页生成",
      mode: "group",
      agentIds: ["orchestrator", "pm", "designer", "frontend", "reviewer"],
      pinned: true,
      archived: false,
      lastActiveAt: new Date().toISOString(),
    },
  ];

  findAll() {
    return this.conversations;
  }

  findOne(id: string) {
    const conversation = this.conversations.find((item) => item.id === id);
    if (!conversation) {
      throw new NotFoundException(`Conversation ${id} not found`);
    }

    return conversation;
  }

  create(input: { title?: string; mode?: "single" | "group"; agentIds?: string[] }) {
    const conversation: ConversationDto = {
      id: randomUUID(),
      title: input.title ?? "新的 Agent 会话",
      mode: input.mode ?? "group",
      agentIds: input.agentIds ?? ["orchestrator"],
      pinned: false,
      archived: false,
      lastActiveAt: new Date().toISOString(),
    };

    this.conversations.unshift(conversation);
    return conversation;
  }

  update(id: string, input: { pinned?: boolean; archived?: boolean; title?: string }) {
    const conversation = this.findOne(id);
    Object.assign(conversation, input, { lastActiveAt: new Date().toISOString() });
    return conversation;
  }
}
