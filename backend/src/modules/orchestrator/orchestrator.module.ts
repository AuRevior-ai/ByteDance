import { Module } from "@nestjs/common";
import { AgentsModule } from "../agents/agents.module";
import { AiAdaptersModule } from "../ai-adapters/ai-adapters.module";
import { OrchestratorController } from "./orchestrator.controller";
import { OrchestratorService } from "./orchestrator.service";

@Module({
  imports: [AgentsModule, AiAdaptersModule],
  controllers: [OrchestratorController],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}

