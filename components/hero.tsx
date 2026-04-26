"use client"

import Link from "next/link"
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react"
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
      }, 72)
    }, 180)

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
    { depth: 0, label: "portfolio/", type: "root" as const, expanded: true },
    { depth: 1, label: "projects/", type: "folder" as const, href: "/projects", active: true, expanded: true },
    { depth: 2, label: "pulse-crm/", type: "folder" as const, href: "/projects/pulse-crm" },
    { depth: 2, label: "food-ordering-app/", type: "folder" as const, href: "/projects/food-ordering-app" },
    { depth: 2, label: "gym-pass-style-app-node/", type: "folder" as const, href: "/projects/gym-pass-style-app-node" },
    { depth: 2, label: "biolinks/", type: "folder" as const, href: "/projects/biolinks" },
    { depth: 2, label: "auth-service/", type: "folder" as const, href: "/projects/auth-service" },
    { depth: 1, label: "about/", type: "folder" as const, href: "/about", expanded: false },
    { depth: 1, label: "contact/", type: "folder" as const, href: "/contact", expanded: false },
    { depth: 1, label: "resume.pdf", type: "file" as const, highlighted: true },
  ]

  return (
    <section className="px-4 pt-24 pb-10 md:pt-28 md:pb-14">
      <div className="content-shell">
        <Window title="welcome.txt" className="shadow-[12px_12px_0_0_var(--shadow-hard)]">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.78fr)_minmax(340px,0.92fr)] xl:gap-0">
            <div className="px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-6 xl:pr-7">
              <div className="max-w-[54rem] space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-sm font-bold text-[var(--retro-blue)]">{"// Hello, World!"}</p>
                    {/* <span className="border border-[#d8d8d2] bg-[#fbfbf9] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#69707d]">
                      Portfolio OS
                    </span> */}
                  </div>

                  <h1
                    aria-label={introText}
                    className="max-w-[8.5ch] font-sans text-[4.2rem] leading-[0.88] font-bold tracking-normal text-foreground md:text-[5.6rem] xl:text-[6.35rem]"
                  >
                    <span className="block" aria-hidden="true">
                      {typedIntro || "\u00a0"}
                      {!typedName ? <span className="hero-caret" aria-hidden="true" /> : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-block min-h-[0.9em] border-b-4 pb-1 dark:border-[#dbe3ec] ${
                        typedName ? "border-[var(--retro-pink)]" : "border-transparent"
                      }`}
                    >
                      {typedName || "\u00a0"}
                      {typedName ? <span className="hero-caret" aria-hidden="true" /> : null}
                    </span>
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-sm uppercase tracking-[0.08em]">
                  <span className="border-2 border-border bg-[var(--retro-gold)] px-3 py-2 font-bold text-[var(--accent-foreground)] shadow-[3px_3px_0_0_var(--shadow-hard)]">
                    Fullstack Developer
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="border-2 border-border bg-[var(--retro-blue-soft)] px-3 py-2 font-bold text-[var(--retro-blue)] shadow-[3px_3px_0_0_var(--shadow-hard)]">
                    Software Engineer
                  </span>
                </div>

                <div className="h-1 w-20 bg-[var(--retro-pink)]" />

                <p className="max-w-[50ch] text-xl leading-[1.5] text-muted-foreground md:max-w-[42ch] md:text-[2rem] md:leading-[1.48] xl:max-w-[52ch] xl:text-[1.06rem]">
                  Building robust and scalable fullstack systems from frontend to backend. Specialized in React/Next.js,
                  RESTful APIs, clean architecture, and database optimization. Software Engineering graduate currently
                  applying NestJS in backend services.
                </p>

                <div className="flex flex-wrap gap-4 pt-0.5">
                  <span className="group relative inline-flex">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[var(--shadow-hard)]"
                    />
                    <Link
                      href="/projects"
                      className="relative z-10 inline-flex items-center justify-center border-2 border-border bg-primary px-10 py-4 font-mono text-lg font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform group-hover:translate-x-[6px] group-hover:translate-y-[6px] md:text-base"
                    >
                      View Projects
                    </Link>
                  </span>
                  <span className="group relative inline-flex">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[var(--shadow-hard)]"
                    />
                    <Link
                      href="/contact"
                      className="relative z-10 inline-flex items-center justify-center border-2 border-border bg-[var(--retro-pink)] px-10 py-4 font-mono text-lg font-bold uppercase tracking-[0.12em] text-white transition-transform group-hover:translate-x-[6px] group-hover:translate-y-[6px] md:text-base"
                    >
                      Contact Me
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden self-start border-t-2 border-border px-4 py-6 md:px-6 xl:block xl:border-t-0 xl:border-l-2 xl:px-5 xl:pt-4">
              <div className="space-y-4 text-foreground">
                <div className="flex items-start justify-between gap-4">
                  <p className="pt-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--retro-blue)]">
                    Folder Structure
                  </p>
                  <span className="border-2 border-border bg-[var(--retro-gold)] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent-foreground)] shadow-[3px_3px_0_0_var(--shadow-hard)]">
                    ~/Portfolio
                  </span>
                </div>

                <h2 className="max-w-[11ch] text-[2.7rem] leading-[1.08] font-bold tracking-normal text-foreground">
                  A cleaner map of the portfolio.
                </h2>

                <div className="border-[3px] border-border bg-card shadow-[6px_6px_0_0_var(--shadow-hard)]">
                  <div className="flex items-center justify-between border-b-[3px] border-border bg-secondary px-3 py-[0.72rem] font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-muted-foreground">
                    <span>Directory Tree</span>
                    <span>/Projects</span>
                  </div>

                  <div className="space-y-1 px-3 py-4 font-mono text-[12px] font-medium leading-none text-muted-foreground">
                    {folderTree.map((item) => {
                      const isProjectChild = item.depth === 2
                      const leftPadding = item.depth === 0 ? "0px" : item.depth === 1 ? "18px" : "44px"
                      const row = (
                        <span
                          className="relative block"
                          style={{
                            paddingLeft: leftPadding,
                          }}
                        >
                          {item.active ? (
                            <span
                              aria-hidden="true"
                              className="absolute top-[4px] bottom-[4px] left-[0px] w-[3px] bg-[var(--retro-blue)]"
                            />
                          ) : null}

                          <span
                            className={`flex min-h-[26px] items-center gap-2 px-2 ${
                              item.active
                                ? "bg-[var(--retro-blue-soft)] text-[var(--retro-blue)]"
                                : item.highlighted
                                  ? "bg-[var(--retro-pink-soft)] text-[var(--retro-pink)]"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {item.type === "file" ? (
                              <>
                                <FileText
                                  className={`h-[13px] w-[13px] shrink-0 ${
                                    item.highlighted ? "text-[var(--retro-pink)]" : "text-muted-foreground"
                                  }`}
                                  strokeWidth={1.8}
                                />
                                <span className={item.highlighted ? "font-bold text-[var(--retro-pink)]" : undefined}>
                                  {item.label}
                                </span>
                              </>
                            ) : isProjectChild ? (
                              <span className="pl-[1.55rem] text-muted-foreground">{item.label}</span>
                            ) : (
                              <>
                                {item.expanded ? (
                                  <ChevronDown
                                    className="h-[13px] w-[13px] shrink-0 text-muted-foreground"
                                    strokeWidth={1.8}
                                  />
                                ) : (
                                  <ChevronRight
                                    className="h-[13px] w-[13px] shrink-0 text-muted-foreground"
                                    strokeWidth={1.8}
                                  />
                                )}
                                <Folder className="h-[13px] w-[13px] shrink-0 text-[var(--retro-gold-dark)]" strokeWidth={1.8} />
                                <span className={item.active ? "font-semibold text-[var(--retro-blue)]" : undefined}>
                                  {item.label}
                                </span>
                              </>
                            )}
                          </span>
                        </span>
                      )

                      if (!item.href) {
                        return <div key={`${item.depth}-${item.label}`}>{row}</div>
                      }

                      return (
                        <Link
                          key={`${item.depth}-${item.label}`}
                          href={item.href}
                          className="block transition-opacity hover:opacity-80"
                        >
                          {row}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <div className="border-[3px] border-dashed border-border bg-transparent px-3 py-3 text-center">
                    Explorer View
                  </div>
                  <div className="border-[3px] border-dashed border-border bg-transparent px-3 py-3 text-center">
                    Folder Map
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Window>
      </div>
    </section>
  )
}
