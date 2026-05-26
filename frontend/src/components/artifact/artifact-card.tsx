import type { Artifact } from "@/types/artifact";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <article className="rounded-md border border-line bg-panel p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{artifact.title}</h3>
        <span className="rounded border border-line px-2 py-1 text-xs text-muted">{artifact.type}</span>
      </div>
      <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{artifact.content}</p>
    </article>
  );
}

