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
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/95 shadow-[0_4px_0_0_var(--shadow-hard)] backdrop-blur-md">
      <div className=" flex min-h-15 items-center justify-between gap-4 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex gap-1">
            <span className="h-3 w-3 border-2 border-foreground bg-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
          </div>
          <Link href="/" className="truncate font-mono text-sm font-bold uppercase tracking-[0.18em]">
            ~/dev/portfolio
          </Link>
        </div>
        <nav className="flex items-center border-2 border-border bg-card shadow-[4px_4px_0_0_var(--shadow-hard)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-l-2 border-border px-4 py-2 font-mono text-sm font-bold uppercase tracking-wide transition-colors hover:bg-[var(--retro-gold)]",
                pathname === link.href && "bg-primary text-primary-foreground hover:bg-primary",
                link.href === "/" && "border-l-0"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
