import type { ComponentType, ReactNode } from "react";
import { cn } from "@/components/agenthub-ui/utils";

interface AvatarStackProps {
  items: string[];
  extra?: string;
  size?: "sm" | "md";
}

const avatarTones = [
  "from-rose-200 to-orange-100 text-rose-900",
  "from-sky-200 to-blue-100 text-sky-900",
  "from-emerald-200 to-teal-100 text-emerald-900",
  "from-violet-200 to-fuchsia-100 text-violet-900",
  "from-amber-200 to-yellow-100 text-amber-900",
];

export function AvatarStack({ items, extra, size = "md" }: AvatarStackProps) {
  const avatarSize = size === "sm" ? "size-6 text-[10px]" : "size-8 text-xs";

  return (
    <div className="flex items-center">
      {items.map((item, index) => (
        <span
          className={cn(
            "-ml-2 grid rounded-full border-2 border-white bg-gradient-to-br font-semibold shadow-[0_2px_7px_rgba(101,111,143,0.12)] first:ml-0",
            avatarSize,
            avatarTones[index % avatarTones.length],
          )}
          key={`${item}-${index}`}
        >
          <span className="m-auto">{item}</span>
        </span>
      ))}
      {extra ? (
        <span
          className={cn(
            "-ml-2 grid place-items-center rounded-full border-2 border-white bg-white text-slate-500 shadow-[0_2px_7px_rgba(101,111,143,0.12)]",
            avatarSize,
          )}
        >
          {extra}
        </span>
      ) : null}
    </div>
  );
}

interface IconTileProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  tone: string;
  size?: "sm" | "md";
}

export function IconTile({ icon: Icon, tone, size = "md" }: IconTileProps) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-xl bg-gradient-to-br text-white shadow-[0_7px_16px_rgba(116,103,239,0.18)]",
        size === "sm" ? "size-7" : "size-9",
        tone,
      )}
    >
      <Icon size={size === "sm" ? 14 : 17} />
    </span>
  );
}

export function SoftCard({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-[#dfe7f4]/80 bg-white/86 shadow-[0_18px_45px_rgba(111,124,161,0.10)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function StatusBadge({
  children,
  tone = "violet",
}: Readonly<{
  children: ReactNode;
  tone?: "violet" | "green" | "orange" | "blue" | "gray";
}>) {
  const tones = {
    violet: "bg-violet-50 text-violet-600 ring-violet-100",
    green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    gray: "bg-slate-50 text-slate-500 ring-slate-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium ring-1",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
