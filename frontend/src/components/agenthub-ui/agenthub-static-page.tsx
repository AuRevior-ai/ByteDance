import { ChatWorkspace } from "./chat-workspace";
import { RightPanel } from "./right-panel";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AgentHubStaticPage() {
  return (
    <main className="h-screen min-w-[1440px] overflow-hidden bg-[#f4f7fb] p-3 text-slate-900">
      <div className="flex h-full w-full flex-col">
        <TopBar />
        <section className="mt-3 grid min-h-0 flex-1 grid-cols-[312px_minmax(760px,1fr)_444px] gap-3">
          <Sidebar />
          <ChatWorkspace />
          <RightPanel />
        </section>
      </div>
    </main>
  );
}
