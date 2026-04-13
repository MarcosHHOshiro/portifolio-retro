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
  const sideNotes = [
    { label: "Focus", value: "Fullstack systems and interfaces" },
    { label: "Stack", value: "React, Next.js, Node.js, APIs" },
    { label: "Approach", value: "Clean architecture, performance, UX" },
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

            <div className="hero-visual-shell">
              <div className="hero-info-panel">
                <div className="space-y-2 border-b border-dashed border-border pb-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Current Mode
                  </p>
                  <p className="text-2xl font-bold tracking-tight">Building thoughtful digital products.</p>
                </div>

                <div className="grid gap-3 pt-5">
                  {sideNotes.map((note) => (
                    <div key={note.label} className="border border-dashed border-border bg-card px-4 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {note.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-2 border-border bg-secondary p-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:grid-cols-2">
                <div className="border border-dashed border-border bg-card px-3 py-2">
                  Hero Panel
                </div>
                <div className="border border-dashed border-border bg-card px-3 py-2 sm:text-right">
                  Static Layout
                </div>
              </div>
            </div>
          </div>
        </Window>
      </div>
    </section>
  )
}
