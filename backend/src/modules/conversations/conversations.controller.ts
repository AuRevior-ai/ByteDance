import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";

@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.conversationsService.findOne(id);
  }

  @Post()
  create(@Body() body: { title?: string; mode?: "single" | "group"; agentIds?: string[] }) {
    return this.conversationsService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: { pinned?: boolean; archived?: boolean; title?: string }) {
    return this.conversationsService.update(id, body);
  }
}

