import { Controller, Get, Param } from "@nestjs/common";

@Controller("traces")
export class TracesController {
  @Get(":id")
  findOne(@Param("id") id: string) {
    return {
      id,
      status: "running",
      taskPlan: {
        mode: "sequential",
        agents: ["pm", "designer", "frontend", "reviewer"],
      },
      agentCalls: [],
    };
  }
}

