import Link from "next/link"
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react"
import { Window } from "./window"

export function Hero() {
  const folderTree = [
    { depth: 0, label: "portfolio/", type: "root" as const, expanded: true },
    { depth: 1, label: "projects/", type: "folder" as const, href: "/projects", active: true, expanded: true },
    { depth: 2, label: "food-ordering-app/", type: "folder" as const, href: "/projects/food-ordering-app" },
    { depth: 2, label: "gym-pass-style-app-node/", type: "folder" as const, href: "/projects/gym-pass-style-app-node" },
    { depth: 2, label: "biolinks/", type: "folder" as const, href: "/projects/biolinks" },
    { depth: 2, label: "auth-service/", type: "folder" as const, href: "/projects/auth-service" },
    { depth: 1, label: "about/", type: "folder" as const, href: "/about", expanded: false },
    { depth: 1, label: "contact/", type: "folder" as const, href: "/contact", expanded: false },
    { depth: 1, label: "resume.pdf", type: "file" as const },
  ]

  return (
    <section className="px-4 pt-24 pb-10 md:pt-28 md:pb-14">
      <div className="content-shell">
        <Window title="welcome.txt" className="shadow-none">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.9fr)_355px] xl:gap-0">
            <div className="space-y-8 px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-6 xl:pr-12">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-sm text-[#a4adba]">{"// Hello, World!"}</p>
                  {/* <span className="border border-[#d8d8d2] bg-[#fbfbf9] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#69707d]">
                    Portfolio OS
                  </span> */}
                </div>

                <h1 className="max-w-[8.5ch] text-[4.2rem] leading-[0.88] font-bold tracking-[-0.08em] text-[#1d1d1f] md:text-[5.6rem] xl:text-[6.35rem]">
                  <span className="block">Hello. I&apos;m</span>
                  <span className="inline-block border-b-4 border-[#1d1d1f] pb-1">Marcos!</span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-sm uppercase tracking-[0.08em]">
                <span className="border-2 border-[#1f1f1f] bg-[#fbfbf9] px-3 py-2 font-bold text-[#313131]">
                  Fullstack Developer
                </span>
                <span className="text-[#c1c7d0]">/</span>
                <span className="border-2 border-[#1f1f1f] bg-[#fbfbf9] px-3 py-2 font-bold text-[#313131]">
                  Software Engineer
                </span>
              </div>

              <p className="max-w-[45ch] text-xl leading-[1.45] text-[#5f6b7e] md:text-[2rem] md:leading-[1.45] xl:text-[1.02rem]">
                Building robust and scalable fullstack systems from frontend to backend. Specialized in React/Next.js,
                RESTful APIs, clean architecture, and database optimization. Software Engineering graduate currently
                applying NestJS in backend services.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/projects"
                  className="border-2 border-[#1f1f1f] bg-[#111111] px-10 py-4 font-mono text-lg font-bold uppercase tracking-[0.12em] text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-base"
                  style={{ boxShadow: "6px 6px 0 0 rgba(0, 0, 0, 0.12)" }}
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-[#1f1f1f] bg-[#fbfbf9] px-10 py-4 font-mono text-lg font-bold uppercase tracking-[0.12em] text-[#242424] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:text-base"
                  style={{ boxShadow: "6px 6px 0 0 rgba(0, 0, 0, 0.12)" }}
                >
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="hidden border-t-2 border-[#1f1f1f] px-4 py-6 md:px-6 xl:block xl:border-t-0 xl:border-l-2 xl:px-6">
              <div className="space-y-6 text-[#202020]">
                <div className="flex items-start justify-between gap-4">
                  <p className="pt-1 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-[#a1a9b5]">
                    Folder Structure
                  </p>
                  <span className="border border-[#d8d8d2] bg-[#fbfbf9] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#4c4c4c]">
                    ~/Portfolio
                  </span>
                </div>

                <h2 className="max-w-[11ch] text-[2.7rem] leading-[1.12] font-bold tracking-[-0.06em] text-[#232323]">
                  A cleaner map of the portfolio.
                </h2>

                <div className="border-[3px] border-[#1f1f1f] bg-[#fbfbf9]">
                  <div className="flex items-center justify-between border-b-[3px] border-[#1f1f1f] px-3 py-[0.72rem] font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-[#9aa3b0]">
                    <span>Directory Tree</span>
                    <span>/Projects</span>
                  </div>

                  <div className="space-y-1 px-3 py-4 font-mono text-[12px] font-medium leading-none text-[#9ea8b5]">
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
                              className="absolute top-[4px] bottom-[4px] left-[0px] w-[3px] bg-[#1f1f1f]"
                            />
                          ) : null}

                          <span
                            className={`flex min-h-[26px] items-center gap-2 px-2 ${
                              item.active ? "bg-[#f3f5f8] text-[#303030]" : "text-[#97a1af]"
                            }`}
                          >
                            {item.type === "file" ? (
                              <>
                                <FileText className="h-[13px] w-[13px] shrink-0 text-[#aeb7c3]" strokeWidth={1.8} />
                                <span>{item.label}</span>
                              </>
                            ) : isProjectChild ? (
                              <span className="pl-[1.55rem] text-[#6f7b89]">{item.label}</span>
                            ) : (
                              <>
                                {item.expanded ? (
                                  <ChevronDown
                                    className="h-[13px] w-[13px] shrink-0 text-[#aeb7c3]"
                                    strokeWidth={1.8}
                                  />
                                ) : (
                                  <ChevronRight
                                    className="h-[13px] w-[13px] shrink-0 text-[#aeb7c3]"
                                    strokeWidth={1.8}
                                  />
                                )}
                                <Folder className="h-[13px] w-[13px] shrink-0 text-[#aeb7c3]" strokeWidth={1.8} />
                                <span className={item.active ? "font-semibold text-[#303030]" : undefined}>
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

                <div className="grid grid-cols-2 gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#b2b8c0]">
                  <div className="border-[3px] border-dashed border-[#1f1f1f] bg-transparent px-3 py-3 text-center">
                    Explorer View
                  </div>
                  <div className="border-[3px] border-dashed border-[#1f1f1f] bg-transparent px-3 py-3 text-center">
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
