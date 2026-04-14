import Link from "next/link"

const links = [
  { href: "/projects", label: "Projects", description: "See my work" },
  { href: "/about", label: "About", description: "Learn more" },
  { href: "/contact", label: "Contact", description: "Get in touch" },
]

export function QuickLinks() {
  return (
    <section className="px-4 py-10">
      <div className="content-shell">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Quick Access
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid gap-4 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border-2 border-border bg-card p-6 transition-colors hover:bg-secondary"
            >
              <div className="flex min-h-28 items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Shortcut
                  </p>
                  <h3 className="mt-3 font-mono text-xl font-bold uppercase tracking-wide md:text-2xl">
                    {link.label}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">{link.description}</p>
                </div>
                <span className="mt-1 font-mono text-2xl transition-transform group-hover:translate-x-1">
                  {">"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
