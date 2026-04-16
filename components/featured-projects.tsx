import Link from "next/link"
import { ProjectCard } from "./project-card"
import { projects } from "@/lib/data"

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section className="px-4 py-14 md:py-18">
      <div className="content-shell">
        <div className="mb-10 flex flex-col gap-6 md:mb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Selected Work
              </span>
              <div className="h-px w-16 bg-border" />
              <div className="hidden h-px flex-1 bg-border/40 md:block" />
            </div>
            <Link
              href="/projects"
              className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] underline-offset-4 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
              Selected projects
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A few projects that represent how I build interfaces, APIs, and fullstack systems.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              titleAs="h3"
              techCount={3}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
