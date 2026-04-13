import Image from "next/image"
import Link from "next/link"
import { projectTypeLabel, type Project } from "@/lib/data"

const projectTypeClasses = {
  fullstack: "bg-blue-100 text-foreground",
  backend: "bg-green-100 text-foreground",
  frontend: "bg-secondary text-foreground",
} as const

const projectSizes: Record<string, string> = {
  "food-ordering-app": "9.4 MB",
  "gym-pass-style-app-node": "1.2 MB",
  biolinks: "3.8 MB",
  "auth-service": "2.1 MB",
}

type ProjectCardProps = {
  project: Project
  titleAs?: "h2" | "h3"
  techCount?: number
}

export function ProjectCard({
  project,
  titleAs = "h3",
  techCount = 4,
}: ProjectCardProps) {
  const TitleTag = titleAs

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
    >
      <article className="flex h-full flex-col border-2 border-border bg-card transition-all duration-200 group-hover:bg-background">
        <div className="flex items-center justify-between border-b-2 border-border bg-card px-3 py-2 font-mono text-[11px]">
          <span className="truncate">{`${project.slug}.exe`}</span>
          <span className="shrink-0">{projectSizes[project.slug] ?? "4.0 MB"}</span>
        </div>

        <div className="relative aspect-video overflow-hidden border-b-2 border-border bg-secondary">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              width={800}
              height={450}
              className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <span className="font-mono text-xs uppercase text-muted-foreground">
                [{project.category}]
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span
            className={`mb-4 inline-flex w-fit border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${projectTypeClasses[project.type]}`}
          >
            {projectTypeLabel[project.type]}
          </span>

          <TitleTag className="text-2xl font-bold tracking-tight text-balance">{project.title}</TitleTag>

          <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.status === "under-construction" ? (
            <p className="mt-4 inline-flex w-fit border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              Under Construction
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, techCount).map((tech) => (
              <span
                key={tech}
                className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-8 inline-block w-fit border-b-2 border-foreground text-base font-bold transition-all group-hover:pr-2">
            View details {"->"}
          </span>
        </div>
      </article>
    </Link>
  )
}
