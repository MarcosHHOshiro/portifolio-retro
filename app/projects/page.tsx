import Link from "next/link"
import { Window } from "@/components/window"
import { ProjectCard } from "@/components/project-card"
import { Footer } from "@/components/footer"
import { projects } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Fullstack Developer Portfolio",
  description: "Explore my fullstack projects, APIs, and system architecture case studies.",
}

export default function ProjectsPage() {
  return (
    <>
      <section className="px-4 pt-24 pb-8 md:pt-28">
        <div className="w-full">
          <Window title="projects.dir">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{">"}</span>
                <span className="font-mono text-sm">ls -la ./projects/</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                All Projects
              </h1>
              <p className="max-w-3xl text-muted-foreground">
                A collection of fullstack applications, APIs, and infrastructure projects.
              </p>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="w-full">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} titleAs="h2" techCount={4} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
