import Link from "next/link"
import Image from "next/image"
import { Window } from "./window"
import { projects } from "@/lib/data"

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Selected Work
            </span>
            <div className="h-px w-24 bg-border" />
          </div>
          <Link
            href="/projects"
            className="font-mono text-sm uppercase tracking-wide underline-offset-4 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
              <Window title={`${project.slug}.exe`} className="h-full transition-all group-hover:translate-x-1 group-hover:translate-y-1">
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
                      <span className="font-mono text-xs uppercase text-muted-foreground">
                        [{project.category}]
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl tracking-tight">{project.title}</h3>
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
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="border border-border px-2 py-0.5 font-mono text-xs uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Window>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
