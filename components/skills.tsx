import { Window } from "./window"

const skillCategories = [
  {
    title: "Backend & APIs",
    skills: ["Node.js", "NestJS", "Python", "PHP", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "AWS", "CI/CD", "Linux", "Nginx"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
]

export function Skills() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Tech Stack
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <Window key={category.title} title={`${category.title.toLowerCase()}/`} variant="outlined">
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-muted-foreground">{">"}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </Window>
          ))}
        </div>
      </div>
    </section>
  )
}
