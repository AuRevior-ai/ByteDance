import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AgentsModule } from "./modules/agents/agents.module";
import { AiAdaptersModule } from "./modules/ai-adapters/ai-adapters.module";
import { ArtifactsModule } from "./modules/artifacts/artifacts.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConversationsModule } from "./modules/conversations/conversations.module";
import { DeploymentsModule } from "./modules/deployments/deployments.module";
import { MessagesModule } from "./modules/messages/messages.module";
import { OrchestratorModule } from "./modules/orchestrator/orchestrator.module";
import { TracesModule } from "./modules/traces/traces.module";
import { UsersModule } from "./modules/users/users.module";
import { VersionsModule } from "./modules/versions/versions.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../.env", ".env"],
    }),
    AuthModule,
    UsersModule,
    ConversationsModule,
    MessagesModule,
    AgentsModule,
    AiAdaptersModule,
    OrchestratorModule,
    ArtifactsModule,
    VersionsModule,
    DeploymentsModule,
    TracesModule,
  ],
})
export class AppModule {}

