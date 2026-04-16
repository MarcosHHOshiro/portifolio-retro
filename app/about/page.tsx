import Link from "next/link"
import { Window } from "@/components/window"
import { Footer } from "@/components/footer"
import { personalInfo } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Fullstack Developer Portfolio",
  description: "Learn about my background in software engineering and fullstack development.",
}

const experience = [
  {
    period: "Feb 2025 - Present",
    role: "Mid-Level Developer",
    company: "Aproms",
    employmentType: "Full-time",
    workModel: "On-site",
    location: "Dourados, Mato Grosso do Sul, Brazil",
    description:
      "Developing and evolving fullstack web systems, with focus on PostgreSQL, GitHub workflows, frontend/backend integration, and continuous quality improvements.",
  },
  {
    period: "Aug 2023 - Feb 2025",
    role: "Web Developer",
    company: "Aproms",
    employmentType: "Full-time",
    workModel: "On-site",
    location: "Dourados, Mato Grosso do Sul, Brazil",
    description:
      "Developed and maintained web systems using PHP and PostgreSQL, collaborating with the IT team to ensure efficient integration and stable operation.",
  },
  {
    period: "Dec 2022 - Aug 2023",
    role: "Intern",
    company: "Aproms",
    employmentType: "Internship",
    workModel: "On-site",
    location: "Dourados, Mato Grosso do Sul, Brazil",
    description:
      "Contributed to REST API development, supported fullstack implementation, and helped maintain internal system features.",
  },
]

const interests = [
  {
    title: "System Design",
    description: "Designing scalable architectures for fullstack systems and services.",
  },
  {
    title: "Fullstack Engineering",
    description: "Building complete products with modern frontends and robust APIs.",
  },
  {
    title: "Automations",
    description: "Building automation workflows with Docker, CI/CD, and infrastructure tooling.",
  },
  {
    title: "Performance",
    description: "Optimizing queries, services, and system performance.",
  },
  {
    title: "Clean Code",
    description: "Writing maintainable and well-structured code.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="px-4 pt-20 pb-8 md:pt-24">
        <div className="content-shell">
          <Window title="about.me">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{">"}</span>
                <span className="font-mono text-sm">cat ./about.txt</span>
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                About Me
              </h1>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                {personalInfo.bio}
              </p>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell space-y-6">
          <Window title="education.txt">
            <div className="space-y-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Education
              </h2>
              <div className="border-l-2 border-border pl-4">
                <p className="font-bold">{personalInfo.education}</p>
                <p className="text-sm text-muted-foreground">
                  Focused on software architecture, fullstack development, algorithms, and distributed systems.
                </p>
              </div>
            </div>
          </Window>

          <Window title="experience.log">
            <div className="space-y-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-border pl-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-1 font-bold">{exp.role}</p>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {[exp.employmentType, exp.workModel, exp.location].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Window>

          <Window title="interests.json">
            <div className="space-y-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Interests
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {interests.map((interest) => (
                  <div key={interest.title} className="border border-dashed border-border p-3">
                    <span className="font-mono text-sm font-bold">{interest.title}</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <div className="border-2 border-border bg-secondary p-6 text-center">
            <p className="font-mono text-lg">
              {"Interested in working together?"}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block border-2 border-foreground bg-primary px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              style={{ boxShadow: "4px 4px 0 0 var(--shadow-hard)" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
