import Link from "next/link"
import { Window } from "./window"

export function Hero() {
  return (
    <section className="px-4 pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-5xl">
        <Window title="welcome.txt">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">{"// Hello, World!"}</p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {"Hello. I'm "}
                <span className="border-b-4 border-foreground">Marcos</span>
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm uppercase tracking-wider">
              <span className="border-2 border-border px-2 py-1">Fullstack Developer</span>
              <span className="text-muted-foreground">/</span>
              <span className="border-2 border-border px-2 py-1">Software Engineer</span>
            </div>
            
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Building robust and scalable fullstack systems from frontend to backend.
              Specialized in React/Next.js, RESTful APIs, clean architecture, and database optimization.
              Software Engineering graduate currently applying NestJS in backend services.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/projects"
                className="border-2 border-foreground bg-primary px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="border-2 border-foreground bg-card px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </Window>
      </div>
    </section>
  )
}
