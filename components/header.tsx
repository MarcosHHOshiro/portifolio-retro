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
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-3 w-3 border-2 border-foreground bg-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
            <span className="h-3 w-3 border-2 border-foreground" />
          </div>
          <Link href="/" className="font-mono text-sm font-bold uppercase tracking-wider">
            ~/dev/portfolio
          </Link>
        </div>
        <nav className="flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-l-2 border-border px-4 py-1 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-secondary",
                pathname === link.href && "bg-primary text-primary-foreground hover:bg-primary"
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
