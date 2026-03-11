import Link from "next/link"
import { personalInfo } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t-2 border-border px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-muted-foreground">
              {new Date().getFullYear()} {personalInfo.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase hover:underline"
            >
              GitHub
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase hover:underline"
            >
              LinkedIn
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-sm uppercase hover:underline"
            >
              Email
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            {"<"} Built with Next.js and lots of coffee {"/>"}
          </p>
        </div>
      </div>
    </footer>
  )
}
