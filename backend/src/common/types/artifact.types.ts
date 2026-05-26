export type ArtifactType = "code" | "html" | "diff" | "document" | "deployment" | "file";

export interface ArtifactRecord {
  id: string;
  conversationId: string;
  messageId: string;
  type: ArtifactType;
  title: string;
  content: string;
  language?: string;
  previewUrl?: string;
  currentVersion: number;
}

