import { Body, Controller, Post } from "@nestjs/common";
import { OrchestratorService } from "./orchestrator.service";

@Controller("orchestrator")
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @Post("plan")
  createPlan(@Body() body: { task: string; conversationId: string; agentIds?: string[] }) {
    return this.orchestratorService.createPlan(body);
  }

  @Post("run")
  run(@Body() body: { task: string; conversationId: string; agentIds?: string[] }) {
    return this.orchestratorService.run(body);
  }
}

