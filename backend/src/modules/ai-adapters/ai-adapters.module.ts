import { Module } from "@nestjs/common";
import { MockAgentAdapter } from "./mock-agent.adapter";

@Module({
  providers: [MockAgentAdapter],
  exports: [MockAgentAdapter],
})
export class AiAdaptersModule {}

