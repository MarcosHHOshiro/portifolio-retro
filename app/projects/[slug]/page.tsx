import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { projectTypeLabel, projects } from "@/lib/data"
import type { Metadata } from "next"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
} from "lucide-react"

const projectTypeClasses = {
  fullstack: "bg-primary text-primary-foreground border-primary",
  backend: "bg-card text-foreground border-border",
  frontend: "bg-secondary text-foreground border-border",
} as const

const detailCardClass =
  "min-w-0 border-2 border-border bg-card p-4 shadow-[4px_4px_0_0_var(--shadow-hard)] transition-all hover:shadow-[8px_8px_0_0_var(--shadow-hard)] sm:p-6"

const actionButtonClass =
  "inline-flex min-w-0 w-full items-center justify-center gap-2 border-2 border-foreground px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-transform duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/15 active:translate-x-[5px] active:translate-y-[5px] sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.16em]"

const editorialCardClass =
  "min-w-0 border-2 border-border bg-card p-5 shadow-[5px_5px_0_0_var(--shadow-hard)] sm:p-6"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const isUnderConstruction = project.status === "under-construction"
  const solutionHighlights = project.solutionHighlights ?? project.stack.slice(0, 4)
  const validationChecks =
    project.validationChecks ??
    project.stack.slice(0, 3).map((tech) => `${tech} integrated into the delivery`)

  return (
    <>
      <section className="px-4 pt-20 pb-8 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 space-y-6 sm:space-y-8 lg:col-span-5">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/20 bg-card px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${projectTypeClasses[project.type]}`}
                  >
                    {projectTypeLabel[project.type]}
                  </span>
                  {isUnderConstruction && (
                    <span className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      Under Construction
                    </span>
                  )}
                </div>

                <h1 className="break-words text-4xl font-black tracking-tighter leading-none sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
                <p className="max-w-xl break-words font-sans text-base leading-relaxed text-black/70 dark:text-[#a2adba] sm:text-lg">
                  {project.longDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {isUnderConstruction ? (
                  <span className="col-span-2 inline-flex w-full items-center justify-center gap-2 border-2 border-border bg-secondary px-5 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.16em]">
                    This project is under construction
                  </span>
                ) : (
                  <>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionButtonClass} bg-primary text-primary-foreground`}
                        style={{
                          boxShadow: "5px 5px 0 0 var(--shadow-hard)",
                        }}
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionButtonClass} bg-card text-foreground`}
                        style={{
                          boxShadow: "5px 5px 0 0 var(--shadow-hard)",
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    )}
                  </>
                )}
              </div>

              <div className="hidden min-w-0 border-2 border-border bg-card p-4 shadow-[8px_8px_0_0_var(--shadow-hard)] lg:block">
                <div className="mb-3 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="space-y-1.5 font-mono text-[11px] leading-tight text-muted-foreground">
                  <div className="mb-1 flex items-center justify-between border-b border-black/10 pb-1 dark:border-white/10">
                    <span>$ {project.validationCommand ?? "status check"}</span>
                    <span className={isUnderConstruction ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}>
                      {isUnderConstruction ? "WIP" : "PASS"}
                    </span>
                  </div>
                  {validationChecks.map((item) => (
                    <div key={item} className="break-words">
                      {"\u2713"} {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0 space-y-6 lg:col-span-7">
              <section className={editorialCardClass}>
                <div className="mb-4 flex items-center gap-2 font-mono text-sm font-black uppercase tracking-[0.2em] text-red-500 dark:text-[#d78382]">
                  <ShieldCheck className="h-5 w-5" />
                  The Problem
                </div>
                <p className="break-words border-l-4 border-[#ffd8d8] pl-4 font-sans text-lg leading-relaxed text-black/75 italic dark:border-[#5d373a] dark:text-[#bcc4cf] sm:text-[1.1rem] sm:leading-[1.85]">
                  "{project.problem}"
                </p>
              </section>

              <section className={`${editorialCardClass} lg:mt-7`}>
                <div className="mb-5 flex items-center gap-2 font-mono text-sm font-black uppercase tracking-[0.2em] text-blue-500 dark:text-[#86a9d2]">
                  <Zap className="h-5 w-5" />
                  The Solution
                </div>
                <p className="mb-6 break-words font-sans text-lg leading-relaxed text-black/80 dark:text-[#c3ccd7] sm:text-[1.05rem] sm:leading-[1.8]">
                  {project.solution}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {solutionHighlights.map((item) => (
                    <div
                      key={item}
                      className="group min-w-0 rounded-[2px] border border-black/8 bg-black/[0.03] px-4 py-3 transition-colors hover:bg-black hover:text-white dark:border-white/8 dark:bg-white/[0.03] dark:hover:bg-[#273142] dark:hover:text-[#edf2f7]"
                    >
                      <div className="flex items-start gap-2">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
                        <span className="break-words font-mono text-xs font-bold leading-tight sm:text-[0.8rem]">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex flex-wrap items-center gap-3 py-2">
                <Layers className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs font-black uppercase text-gray-400">
                  Stack:
                </span>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="max-w-full break-words bg-black px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white dark:bg-[#232c39] dark:text-[#e5ebf3]"
                  >
                    {tech}
                  </span>
                ))}
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <div className="border-t-2 border-dashed border-border pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-sm text-muted-foreground">
                {"// End of file"}
              </span>
              <Link
                href="/projects"
                className="font-mono text-sm uppercase tracking-wide hover:underline"
              >
                View All Projects {"->"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
