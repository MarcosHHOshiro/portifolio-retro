import Link from "next/link"
import Image from "next/image"
import { Window } from "@/components/window"
import { Footer } from "@/components/footer"
import { projectTypeLabel, projects } from "@/lib/data"
import type { Metadata } from "next"

const projectTypeClasses = {
  fullstack: "bg-primary text-primary-foreground border-primary",
  backend: "bg-card text-foreground border-border",
  frontend: "bg-secondary text-foreground border-border",
} as const

export const metadata: Metadata = {
  title: "Projects | Fullstack Developer Portfolio",
  description: "Explore my fullstack projects, APIs, and system architecture case studies.",
}

export default function ProjectsPage() {
  return (
    <>
      <section className="px-4 pt-20 pb-12 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <Window title="projects.dir">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{">"}</span>
                <span className="font-mono text-sm">ls -la ./projects/</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                All Projects
              </h1>
              <p className="text-muted-foreground">
                A collection of fullstack applications, APIs, and infrastructure projects.
              </p>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                <Window
                  title={`${project.slug}.exe`}
                  className="h-full transition-all group-hover:translate-x-1 group-hover:translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="aspect-video border-2 border-dashed border-border bg-secondary flex items-center justify-center">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <span className="font-mono text-xs uppercase text-muted-foreground block">
                            [{project.category}]
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${projectTypeClasses[project.type]}`}
                        >
                          {projectTypeLabel[project.type]}
                        </span>
                      </div>
                      <h2 className="font-bold text-xl tracking-tight">{project.title}</h2>
                      {project.status === "under-construction" && (
                        <p className="mt-2 inline-block border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                          Under Construction
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="border border-border px-2 py-0.5 font-mono text-xs uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-border">
                      <span className="font-mono text-xs text-muted-foreground">
                        Click to view details
                      </span>
                      <span className="font-mono text-lg transition-transform group-hover:translate-x-1">
                        {"->"}
                      </span>
                    </div>
                  </div>
                </Window>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
