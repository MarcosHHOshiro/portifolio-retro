"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b-2 border-border bg-background/95 shadow-[0_4px_0_0_var(--shadow-hard)] backdrop-blur-md">
      <div className="flex min-h-15 items-center justify-between px-2 py-2 sm:gap-4 sm:px-4">
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <div className="flex gap-1">
            <span className="h-3 w-3 border-2 border-foreground bg-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
          </div>
          <Link href="/" className="truncate font-mono text-sm font-bold uppercase tracking-[0.18em]">
            ~/dev/portfolio
          </Link>
        </div>
        <nav className="flex min-w-0 flex-1 items-center border-2 border-border bg-card shadow-[4px_4px_0_0_var(--shadow-hard)] sm:flex-none">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "min-w-0 flex-1 border-l-2 border-border px-1.5 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-normal transition-colors hover:bg-[var(--retro-gold)] min-[380px]:text-[11px] sm:flex-none sm:px-4 sm:text-sm sm:tracking-wide",
                pathname === link.href && "bg-primary text-primary-foreground hover:bg-primary",
                link.href === "/" && "border-l-0"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle className="hidden sm:inline-flex" />
        </nav>
      </div>
    </header>
  )
}
