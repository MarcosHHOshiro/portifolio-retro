import Link from "next/link"
import { ProjectCard } from "./project-card"
import { projects } from "@/lib/data"

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section className="px-4 py-10">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Selected Work
              </span>
              <div className="h-px w-24 bg-border" />
            </div>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Selected projects
              </h2>
              <p className="mt-2 text-muted-foreground">
                A few projects that represent how I build interfaces, APIs, and fullstack systems.
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="font-mono text-sm uppercase tracking-wide underline-offset-4 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} titleAs="h3" techCount={3} />
          ))}
        </div>
      </div>
    </section>
  )
}
