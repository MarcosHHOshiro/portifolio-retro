import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface WindowProps {
  title: string
  children: ReactNode
  className?: string
  variant?: "default" | "outlined"
}

export function Window({ title, children, className, variant = "default" }: WindowProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-2 border-border bg-card shadow-[6px_6px_0_0_var(--color-border)] transition-transform duration-200",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.02)_100%)] before:content-['']",
        variant === "outlined" && "border-dashed",
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b-2 border-border bg-secondary px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 border border-foreground bg-foreground" />
            <span className="h-2.5 w-2.5 border border-foreground bg-background" />
            <span className="h-2.5 w-2.5 border border-foreground bg-background" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{title}</span>
        </div>
        <div className="flex gap-1">
          <span className="h-2.5 w-6 border border-foreground" />
          <span className="h-2.5 w-2.5 border border-foreground" />
        </div>
      </div>
      <div className="relative z-10 p-5 md:p-6">{children}</div>
    </div>
  )
}
