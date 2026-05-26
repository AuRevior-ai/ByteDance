import { Plus, UsersRound } from "lucide-react";
import type { ConversationItem } from "./interaction-model";
import { agents, navItems, teamSpaces } from "./mock-data";
import { AvatarStack, IconTile, SoftCard, StatusBadge } from "./ui-primitives";
import { cn } from "./utils";

interface SidebarProps {
  activeConversationId: string;
  activeNav: string;
  conversations: ConversationItem[];
  searchQuery: string;
  selectedAgentName: string;
  selectedAgentNames: string[];
  onCreateConversation: () => void;
  onInviteMember: () => void;
  onNavChange: (nav: string) => void;
  onSelectAgent: (agentName: string) => void;
  onSwitchConversation: (conversationId: string) => void;
}

export function Sidebar({
  activeConversationId,
  activeNav,
  conversations,
  searchQuery,
  selectedAgentName,
  selectedAgentNames,
  onCreateConversation,
  onInviteMember,
  onNavChange,
  onSelectAgent,
  onSwitchConversation,
}: SidebarProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleAgents = normalizedQuery
    ? agents.filter((agent) =>
        agent.name.toLowerCase().includes(normalizedQuery),
      )
    : agents;
  const visibleConversations = normalizedQuery
    ? conversations.filter((conversation) =>
        `${conversation.title} ${conversation.description}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : conversations;

  return (
    <aside className="grid min-h-0 grid-rows-[minmax(0,1fr)_326px] gap-3">
      <SoftCard className="agenthub-scroll min-h-0 overflow-auto p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-xl px-3 text-sm font-semibold transition",
                  activeNav === item.label
                    ? "bg-[#eef3ff] text-[#5b6df6] shadow-inner shadow-white/70"
                    : "text-slate-700 hover:bg-slate-50",
                )}
                key={item.label}
                onClick={() => onNavChange(item.label)}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-lg border",
                      activeNav === item.label
                        ? "border-indigo-100 bg-white text-indigo-500"
                        : "border-slate-200 bg-white text-slate-500",
                    )}
                  >
                    <Icon size={14} />
                  </span>
                  {item.label}
                </span>
                {item.action ? (
                  <span
                    className="grid size-7 place-items-center rounded-lg bg-indigo-50 text-indigo-500"
                    onClick={(event) => {
                      event.stopPropagation();
                      onCreateConversation();
                    }}
                  >
                    <Plus size={17} />
                  </span>
                ) : null}
                {item.count ? (
                  <span className="text-xs text-slate-600">{item.count}</span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {activeNav === "最近会话" ? (
          <div className="mt-4 space-y-2 rounded-2xl bg-white/50 p-2 ring-1 ring-[#e6edf7]">
            {visibleConversations.map((conversation) => (
              <button
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-left transition hover:bg-white",
                  activeConversationId === conversation.id &&
                    "bg-white shadow-[0_8px_18px_rgba(111,124,161,0.08)]",
                )}
                key={conversation.id}
                onClick={() => onSwitchConversation(conversation.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-xs font-bold text-slate-800">
                    {conversation.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {conversation.lastActive}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] text-slate-400">
                    {conversation.description}
                  </span>
                  {conversation.unread ? (
                    <span className="grid size-4 place-items-center rounded-full bg-indigo-50 text-[10px] font-semibold text-indigo-500">
                      {conversation.unread}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
            {!visibleConversations.length ? (
              <p className="rounded-xl bg-white px-3 py-4 text-center text-xs text-slate-400">
                没有匹配的会话
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-7 flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-slate-700">我的 Agent</h2>
          <Plus size={17} className="text-slate-500" />
        </div>

        <div className="mt-4 space-y-3">
          {visibleAgents.map((agent) => (
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-1.5 py-1 text-left transition hover:bg-slate-50",
                selectedAgentNames.includes(agent.name) &&
                  "bg-indigo-50/80 ring-1 ring-indigo-100",
              )}
              key={agent.name}
              onClick={() => onSelectAgent(agent.name)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <IconTile icon={agent.icon} size="sm" tone={agent.tone} />
                <span className="text-sm font-semibold text-slate-800">
                  {agent.name}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-500">
                <span className={cn("size-1.5 rounded-full", agent.dot)} />
                {selectedAgentName === agent.name ? "已选中" : agent.status}
              </div>
            </button>
          ))}
          {!visibleAgents.length ? (
            <p className="rounded-xl bg-slate-50 px-3 py-4 text-center text-xs text-slate-400">
              没有匹配的 Agent
            </p>
          ) : null}
        </div>
      </SoftCard>

      <SoftCard className="p-4">
        <h2 className="text-sm font-semibold text-slate-800">团队空间</h2>
        <div className="mt-5 space-y-4">
          {teamSpaces.map((space) => (
            <div
              className="flex items-center justify-between"
              key={space.label}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100">
                  <UsersRound size={15} />
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {space.label}
                </span>
              </div>
              {space.active ? (
                <div className="flex items-center gap-2">
                  <StatusBadge tone="violet">协作中</StatusBadge>
                  <UsersRound size={14} className="text-slate-500" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-9 rounded-2xl border border-[#dfe7f4] bg-white/80 p-4 shadow-[0_10px_30px_rgba(111,124,161,0.08)]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">邀请成员</h3>
            <button
              className="grid size-8 place-items-center rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-500"
              onClick={onInviteMember}
              type="button"
            >
              <Plus size={17} />
            </button>
          </div>
          <div className="mt-4">
            <AvatarStack items={["林", "陈", "周", "许"]} extra="+3" />
          </div>
        </div>
      </SoftCard>
    </aside>
  );
}
