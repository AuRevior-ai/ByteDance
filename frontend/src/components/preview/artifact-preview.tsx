"use client";

import { Download, ExternalLink, FileCode2, GitBranch } from "lucide-react";
import { useWorkspaceStore } from "@/stores/workspace-store";

const placeholderHtml = `<section class="hero">
  <p>AI Portfolio</p>
  <h1>把多 Agent 协作变成可交付作品</h1>
</section>`;

export function ArtifactPreview() {
  const activeArtifact = useWorkspaceStore((state) => state.activeArtifact);
  const title = activeArtifact?.title ?? "等待生成 Artifact";
  const typeLabel = activeArtifact ? `${activeArtifact.type.toUpperCase()} Artifact` : "Preview";
  const content = activeArtifact?.content ?? placeholderHtml;
  const canRenderHtml = activeArtifact?.type === "html";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted">
            {typeLabel} · v{activeArtifact?.currentVersion ?? 0}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink" type="button">
            <GitBranch size={16} />
          </button>
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink" type="button">
            <Download size={16} />
          </button>
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink" type="button">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-rows-[1fr_180px]">
        <div className="m-4 overflow-hidden rounded-md border border-line bg-[#10141B]">
          {canRenderHtml ? (
            <iframe
              className="h-full w-full bg-white"
              sandbox="allow-scripts"
              srcDoc={content}
              title={activeArtifact.title}
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-6">
              <div>
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-mint">
                  <FileCode2 size={14} />
                  Artifact Preview
                </p>
                <h3 className="mt-4 text-4xl font-semibold leading-tight">等待聊天流生成可预览产物</h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
                  发送 Demo Prompt 后，Frontend Engineer 返回的 HTML Artifact 会自动渲染到这里。
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["需求拆解", "视觉方案", "代码审查"].map((item) => (
                  <div key={item} className="rounded-md border border-line bg-panel/80 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <pre className="m-4 mt-0 overflow-auto rounded-md border border-line bg-canvas p-4 text-xs leading-6 text-muted">
          {content}
        </pre>
      </div>
    </div>
  );
}
