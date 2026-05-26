import { Download, ExternalLink, GitBranch } from "lucide-react";

export function ArtifactPreview() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-sm font-medium">portfolio.html</p>
          <p className="text-xs text-muted">HTML Artifact · v2</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink">
            <GitBranch size={16} />
          </button>
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink">
            <Download size={16} />
          </button>
          <button className="rounded-md border border-line p-2 text-muted hover:text-ink">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-rows-[1fr_180px]">
        <div className="m-4 overflow-hidden rounded-md border border-line bg-[#10141B]">
          <div className="flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-mint">AI Portfolio</p>
              <h3 className="mt-4 text-4xl font-semibold leading-tight">把多 Agent 协作变成可交付作品</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
                这里是 iframe 预览占位区，后续接入真实 HTML Artifact 后直接渲染生成页面。
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
        </div>
        <pre className="m-4 mt-0 overflow-auto rounded-md border border-line bg-canvas p-4 text-xs leading-6 text-muted">
{`<section class="hero">
  <p>AI Portfolio</p>
  <h1>把多 Agent 协作变成可交付作品</h1>
</section>`}
        </pre>
      </div>
    </div>
  );
}

