export type ArtifactType = "code" | "html" | "diff" | "document" | "deployment" | "file";

export interface Artifact {
  id: string;
  title: string;
  type: ArtifactType;
  language?: string;
  content: string;
  currentVersion: number;
  previewUrl?: string;
}

