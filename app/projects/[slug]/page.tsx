import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { projectTypeLabel, projects } from "@/lib/data"
import type { Metadata } from "next"
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  ShieldAlert,
  Sparkles,
  TerminalSquare,
  Workflow,
} from "lucide-react"

const projectTypeClasses = {
  fullstack: "bg-primary text-primary-foreground border-primary",
  backend: "bg-card text-foreground border-border",
  frontend: "bg-secondary text-foreground border-border",
} as const

const detailCardClass =
  "border-2 border-border bg-card p-5 shadow-[6px_6px_0_0_var(--color-border)] md:p-6"

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
        <div className="content-shell">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
            <div className="space-y-6 xl:sticky xl:top-24">
              <div className="flex flex-wrap items-center gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
                <span
                  className={`border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide ${projectTypeClasses[project.type]}`}
                >
                  {projectTypeLabel[project.type]}
                </span>
                {isUnderConstruction && (
                  <span className="border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Under Construction
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  {project.category} case study
                </p>
                <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-[1.45rem] md:leading-[1.6]">
                  {project.longDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                {isUnderConstruction ? (
                  <span className="border-2 border-border bg-secondary px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    This project is under construction
                  </span>
                ) : (
                  <>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border-2 border-foreground bg-primary px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
                      >
                        <Code2 className="h-4 w-4" />
                        View Code
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border-2 border-foreground bg-card px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Live Demo
                      </Link>
                    )}
                  </>
                )}
              </div>

              <div className={`${detailCardClass} max-w-2xl`}>
                <div className="flex items-center gap-3 border-b border-border/70 pb-3 font-mono text-xs uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7bd88f]" />
                  </div>
                  <span className="text-muted-foreground">
                    $ {project.validationCommand ?? "status check"}
                  </span>
                  <span
                    className={`ml-auto font-bold ${
                      isUnderConstruction ? "text-amber-600" : "text-emerald-600"
                    }`}
                  >
                    {isUnderConstruction ? "WIP" : "PASS"}
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 font-mono text-sm">
                  {validationChecks.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isUnderConstruction ? "text-amber-600" : "text-emerald-600"
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <article className={detailCardClass}>
                <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#ef4444]">
                  <ShieldAlert className="h-4 w-4" />
                  The Problem
                </div>
                <blockquote className="mt-5 border-l-4 border-[#fecaca] pl-5 text-lg leading-relaxed text-muted-foreground italic md:text-[1.45rem] md:leading-[1.7]">
                  "{project.problem}"
                </blockquote>
              </article>

              <article className={detailCardClass}>
                <div className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                  <Sparkles className="h-4 w-4" />
                  The Solution
                </div>
                <p className="mt-5 text-lg leading-relaxed text-foreground/90 md:text-[1.2rem] md:leading-[1.75]">
                  {project.solution}
                </p>

                <div className="mt-6 border-2 border-dashed border-border bg-secondary/35 p-4 md:p-5">
                  <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    <Workflow className="h-4 w-4" />
                    Technical Architecture
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.architecture}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {solutionHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex min-h-16 items-start gap-3 border border-border bg-background px-4 py-3 font-mono text-sm"
                    >
                      <span className="text-muted-foreground">{">"}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    <TerminalSquare className="h-4 w-4" />
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border bg-background px-3 py-1 font-mono text-xs uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <div className="border-t-2 border-dashed border-border pt-8">
            <div className="flex items-center justify-between">
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
