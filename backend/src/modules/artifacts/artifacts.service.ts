import { Injectable, NotFoundException } from "@nestjs/common";
import type { ArtifactRecord } from "../../common/types/artifact.types";

@Injectable()
export class ArtifactsService {
  private readonly artifacts: ArtifactRecord[] = [
    {
      id: "artifact-demo",
      conversationId: "demo-conversation",
      messageId: "m-frontend",
      type: "html",
      title: "portfolio.html",
      content: "<main><h1>AI Portfolio</h1></main>",
      language: "html",
      currentVersion: 1,
    },
  ];

  findOne(id: string) {
    const artifact = this.artifacts.find((item) => item.id === id);
    if (!artifact) {
      throw new NotFoundException(`Artifact ${id} not found`);
    }

    return artifact;
  }
}

