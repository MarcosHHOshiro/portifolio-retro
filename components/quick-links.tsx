import Link from "next/link"

const links = [
  { href: "/projects", label: "Projects", description: "See my work" },
  { href: "/about", label: "About", description: "Learn more" },
  { href: "/contact", label: "Contact", description: "Get in touch" },
]

export function QuickLinks() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Quick Access
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border-2 border-border bg-card p-6 transition-all hover:border-foreground hover:bg-secondary"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-mono text-lg font-bold uppercase tracking-wide">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                </div>
                <span className="font-mono text-2xl transition-transform group-hover:translate-x-1">
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
