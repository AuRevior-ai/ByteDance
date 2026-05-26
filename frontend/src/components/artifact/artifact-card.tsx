import type { Artifact } from "@/types/artifact";

interface ArtifactCardProps {
  artifact: Artifact;
  onOpen?: () => void;
}

export function ArtifactCard({ artifact, onOpen }: ArtifactCardProps) {
  return (
    <button
      className="w-full rounded-md border border-line bg-panel p-3 text-left transition hover:border-accent/70 hover:bg-panelSoft"
      onClick={onOpen}
      type="button"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{artifact.title}</h3>
        <span className="rounded border border-line px-2 py-1 text-xs text-muted">{artifact.type}</span>
      </div>
      <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{artifact.content}</p>
    </button>
  );
}
