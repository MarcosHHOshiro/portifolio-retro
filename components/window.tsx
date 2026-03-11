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
        "border-2 border-border bg-card",
        variant === "outlined" && "border-dashed",
        className
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border bg-secondary px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 border border-foreground" />
            <span className="h-2.5 w-2.5 border border-foreground" />
            <span className="h-2.5 w-2.5 border border-foreground" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wide">{title}</span>
        </div>
        <div className="flex gap-1">
          <span className="h-2.5 w-6 border border-foreground" />
          <span className="h-2.5 w-2.5 border border-foreground" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
