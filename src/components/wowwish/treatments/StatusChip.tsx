import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type StatusChipProps = {
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
};

/** Treatment C (Status chip): decorative, non-interactive status copy. */
export function StatusChip({ children, className, icon: Icon, iconPosition = "start" }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex cursor-default select-none items-center gap-1.5 rounded-full border-0 bg-black/[0.05] px-3 py-1.5 text-xs font-semibold shadow-none",
        className,
      )}
    >
      {Icon && iconPosition === "start" ? (
        <Icon aria-hidden className="h-3 w-3 shrink-0 opacity-70" strokeWidth={2.25} />
      ) : null}
      {children}
      {Icon && iconPosition === "end" ? (
        <Icon aria-hidden className="h-3 w-3 shrink-0 opacity-70" strokeWidth={2.25} />
      ) : null}
    </span>
  );
}
