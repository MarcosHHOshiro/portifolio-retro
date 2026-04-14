"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Window } from "./window"

const introText = "Hello. I'm Marcos!"
const nameStartIndex = "Hello. I'm ".length

export function Hero() {
  const [displayedText, setDisplayedText] = useState("")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference)
      return () => mediaQuery.removeEventListener("change", updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(introText)
      return
    }

    setDisplayedText("")

    let currentIndex = 0
    let typingInterval: number | undefined
    const typingDelay = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
        currentIndex += 1
        setDisplayedText(introText.slice(0, currentIndex))

        if (currentIndex >= introText.length) {
          window.clearInterval(typingInterval)
        }
      }, 75)
    }, 250)

    return () => {
      window.clearTimeout(typingDelay)
      if (typingInterval) {
        window.clearInterval(typingInterval)
      }
    }
  }, [prefersReducedMotion])

  const typedIntro = displayedText.slice(0, nameStartIndex)
  const typedName = displayedText.slice(nameStartIndex)
  const folderTree = [
    { depth: 0, label: "portfolio/", type: "root" as const },
    { depth: 1, label: "projects/", type: "folder" as const, href: "/projects", active: true },
    { depth: 2, label: "food-ordering-app/", type: "folder" as const, href: "/projects/food-ordering-app" },
    { depth: 2, label: "gym-pass-style-app-node/", type: "folder" as const, href: "/projects/gym-pass-style-app-node" },
    { depth: 2, label: "biolinks/", type: "folder" as const, href: "/projects/biolinks" },
    { depth: 2, label: "auth-service/", type: "folder" as const, href: "/projects/auth-service" },
    { depth: 1, label: "about/", type: "folder" as const, href: "/about" },
    { depth: 1, label: "contact/", type: "folder" as const, href: "/contact" },
    { depth: 1, label: "resume.pdf", type: "file" as const },
  ]

  return (
    <section className="px-4 pt-24 pb-10 md:pt-28 md:pb-14">
      <div className="w-full">
        <Window title="welcome.txt">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,460px)] xl:items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-sm text-muted-foreground">{"// Hello, World!"}</p>
                  <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Portfolio OS
                  </span>
                </div>
                <h1
                  aria-label={introText}
                  className="max-w-[14ch] text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl lg:text-8xl"
                >
                  <span aria-hidden="true">{typedIntro}</span>
                  {typedName ? (
                    <span aria-hidden="true" className="border-b-4 border-foreground">
                      {typedName}
                    </span>
                  ) : null}
                  <span aria-hidden="true" className="hero-caret" />
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-sm uppercase tracking-wider">
                <span className="border-2 border-border bg-card px-2 py-1">Fullstack Developer</span>
                <span className="text-muted-foreground">/</span>
                <span className="border-2 border-border bg-card px-2 py-1">Software Engineer</span>
              </div>

              <p className="max-w-[70ch] text-lg leading-relaxed text-muted-foreground md:text-[1.15rem]">
                Building robust and scalable fullstack systems from frontend to backend.
                Specialized in React/Next.js, RESTful APIs, clean architecture, and database optimization.
                Software Engineering graduate currently applying NestJS in backend services.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="/projects"
                  className="border-2 border-foreground bg-primary px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-foreground bg-card px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  style={{ boxShadow: "4px 4px 0 0 var(--foreground)" }}
                >
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="hidden xl:block">
              <div className="hero-info-panel shadow-[8px_8px_0_0_var(--color-border)]">
                <div className="space-y-3 border-b border-dashed border-border pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Folder Structure
                    </p>
                    <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      ~/portfolio
                    </span>
                  </div>
                  <p className="text-2xl font-bold tracking-tight">A cleaner map of the portfolio.</p>
                </div>

                <div className="mt-5 border-2 border-border bg-card">
                  <div className="flex items-center justify-between border-b-2 border-border bg-secondary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Directory Tree</span>
                    <span>/projects</span>
                  </div>

                  <div className="px-4 py-4 font-mono text-[12px] leading-6">
                    {folderTree.map((item) => {
                      const content = (
                        <span
                          className={`block border px-2 py-1 transition-colors ${
                            item.active
                              ? "border-border bg-secondary text-foreground"
                              : "border-transparent text-muted-foreground"
                          }`}
                          style={{ paddingLeft: `${item.depth * 18 + 8}px` }}
                        >
                          <span className="mr-2 text-foreground/70">{item.type === "file" ? "·" : "▸"}</span>
                          <span className={item.active ? "text-foreground" : undefined}>{item.label}</span>
                        </span>
                      )

                      if (!item.href) {
                        return <div key={`${item.depth}-${item.label}`}>{content}</div>
                      }

                      return (
                        <Link key={`${item.depth}-${item.label}`} href={item.href} className="block hover:bg-secondary/40">
                          {content}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-2 border-border bg-secondary p-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:grid-cols-2">
                <div className="border border-dashed border-border bg-card px-3 py-2">
                  Explorer View
                </div>
                <div className="border border-dashed border-border bg-card px-3 py-2 sm:text-right">
                  Folder Map
                </div>
              </div>
            </div>
          </div>
        </Window>
      </div>
    </section>
  )
}
