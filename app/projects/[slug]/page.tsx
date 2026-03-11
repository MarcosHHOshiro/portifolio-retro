import Link from "next/link"
import { notFound } from "next/navigation"
import { Window } from "@/components/window"
import { Footer } from "@/components/footer"
import { projects } from "@/lib/data"
import type { Metadata } from "next"

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

  return (
    <>
      <section className="px-4 pt-20 pb-8 md:pt-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide hover:underline"
          >
            {"<-"} Back to Projects
          </Link>

          <Window title={`${project.slug}.readme`}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border px-2 py-0.5 font-mono text-xs uppercase">
                  {project.category}
                </span>
                {isUnderConstruction && (
                  <span className="border border-border px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground">
                    Under Construction
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {project.title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {isUnderConstruction ? (
                  <span className="border-2 border-border bg-secondary px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    This project is under construction
                  </span>
                ) : (
                  <>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-foreground bg-primary px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        style={{ boxShadow: "3px 3px 0 0 var(--foreground)" }}
                      >
                        View Code
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-foreground bg-card px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                        style={{ boxShadow: "3px 3px 0 0 var(--foreground)" }}
                      >
                        Live Demo
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Window title="problem.txt">
            <div className="space-y-3">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                The Problem
              </h2>
              <p className="leading-relaxed">{project.problem}</p>
            </div>
          </Window>

          <Window title="solution.txt">
            <div className="space-y-3">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                The Solution
              </h2>
              <p className="leading-relaxed">{project.solution}</p>
            </div>
          </Window>

          <Window title="architecture.md">
            <div className="space-y-3">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Technical Architecture
              </h2>
              <p className="leading-relaxed">{project.architecture}</p>
            </div>
          </Window>

          <Window title="stack.json">
            <div className="space-y-3">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-2 border-border bg-secondary px-3 py-1 font-mono text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
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
