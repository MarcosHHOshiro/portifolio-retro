import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"
import { projectTypeLabel, type Project } from "@/lib/data"

const projectTypeClasses = {
  fullstack: "bg-[#f4efc9] text-foreground dark:bg-[#3d3822] dark:text-[#ebe2bc]",
  backend: "bg-[#dcebc9] text-foreground dark:bg-[#233325] dark:text-[#cfe0c6]",
  frontend: "bg-secondary text-foreground dark:bg-[#202c3b] dark:text-[#d7e3f2]",
} as const

const projectSizes: Record<string, string> = {
  "food-ordering-app": "2.4 MB",
  "gym-pass-style-app-node": "1.2 MB",
  biolinks: "3.8 MB",
  "auth-service": "2.1 MB",
}

type ProjectCardProps = {
  project: Project
  titleAs?: "h2" | "h3"
  techCount?: number
  variant?: "default" | "featured"
}

export function ProjectCard({
  project,
  titleAs = "h3",
  techCount = 4,
  variant = "default",
}: ProjectCardProps) {
  const TitleTag = titleAs
  const isFeatured = variant === "featured"
  const projectHref = `/projects/${project.slug}`
  const hasProjectLinks = Boolean(project.github || project.demo)

  return (
    <article
      className={
        isFeatured
          ? "group flex h-full flex-col border-2 border-border bg-card shadow-[8px_8px_0_0_var(--shadow-hard)] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          : "group flex h-full flex-col border-2 border-border bg-card transition-all duration-200 hover:bg-background"
      }
    >
      <Link
        href={projectHref}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="flex items-center justify-between border-b-2 border-border bg-card px-3 py-2 font-mono text-[10px] font-bold">
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
      </Link>

      <div className={isFeatured ? "flex flex-1 flex-col p-5" : "flex flex-1 flex-col p-6"}>
        <span
          className={`mb-4 inline-flex w-fit border-2 border-border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${projectTypeClasses[project.type]}`}
        >
          {projectTypeLabel[project.type]}
        </span>

        <TitleTag
          className={
            isFeatured
              ? "text-[2rem] leading-tight font-bold tracking-[-0.03em] text-balance"
              : "text-2xl font-bold tracking-tight text-balance"
          }
        >
          <Link
            href={projectHref}
            className="transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {project.title}
          </Link>
        </TitleTag>

        <p
          className={
            isFeatured
              ? "mt-4 flex-1 text-base leading-8 text-muted-foreground line-clamp-3"
              : "mt-4 flex-1 text-base leading-relaxed text-muted-foreground"
          }
        >
          {project.description}
        </p>

        {project.status === "under-construction" ? (
          <p className="mt-4 inline-flex w-fit border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            Under Construction
          </p>
        ) : null}

        {isFeatured ? null : (
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
        )}

        {hasProjectLinks ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github ? (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-border bg-primary px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Github className="h-3.5 w-3.5" />
                View Code
              </Link>
            ) : null}
            {project.demo ? (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-border bg-card px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Live Demo
              </Link>
            ) : null}
          </div>
        ) : null}

        <Link
          href={projectHref}
          className="mt-8 inline-block w-fit border-b-2 border-foreground text-base font-bold transition-all hover:pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View details {"->"}
        </Link>
      </div>
    </article>
  )
}
