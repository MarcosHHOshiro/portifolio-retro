"use client"

import { personalInfo } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react"

type EntryKind = "command" | "output" | "system" | "help-title" | "help-row" | "error" | "divider"

type TerminalEntry = {
  id: number
  kind: EntryKind
  text: string
}

type Position = {
  x: number
  y: number
}

type Size = {
  width: number
  height: number
}

let terminalEntryId = 0

const WINDOW_MARGIN = 16
const WINDOW_TOP_OFFSET = 88
const TOGGLE_BUTTON_CLEARANCE = 72
const DEFAULT_SIZE: Size = {
  width: 800,
  height: 500,
}
const matrixGlyphs = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`
const routeCommands = {
  projects: "/projects",
  about: "/about",
  contact: "/contact",
} as const
const socialCommands = {
  github: {
    label: "GitHub",
    href: personalInfo.github,
  },
  linkedin: {
    label: "LinkedIn",
    href: personalInfo.linkedin,
  },
  email: {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
  },
} as const

const createEntry = (kind: TerminalEntry["kind"], text: string): TerminalEntry => ({
  id: terminalEntryId++,
  kind,
  text,
})

const renderTerminalText = (text: string) => {
  const parts = text.split(/('[^']*')/g)

  return parts.map((part, index) => {
    if (part.startsWith("'") && part.endsWith("'") && part.length >= 2) {
      return (
        <span key={`${part}-${index}`} className="text-[#ffd84d]">
          {part}
        </span>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

const renderHelpEntry = (text: string) => {
  const [commandLabel, description] = text.split(" - ", 2)

  return (
    <div className="flex gap-4 pl-6">
      <span className="inline-block min-w-[7rem] text-[#f1fa8c]">{commandLabel}</span>
      {description ? <span className="text-[#00ff41]">- {description}</span> : null}
    </div>
  )
}

const renderCommandEntry = (text: string) => (
  <div className="flex flex-wrap gap-2">
    <span className="font-medium text-[#50fa7b]">marcos@portfolio:~$</span>
    <span className="text-[#f1fa8c]">{text}</span>
  </div>
)

const createInitialHistory = () => [
  createEntry("system", "Floating terminal v1.0.4 initialized..."),
  createEntry("output", "Welcome, Marcos. System ready for operation."),
  createEntry("output", ""),
  createEntry("output", "Drag the title bar to move this window."),
  createEntry("output", "Tip: Type 'matrix' to activate the visual effect."),
  createEntry("output", "Type 'close' to close the terminal."),
  createEntry("output", "Type 'help' to list the commands."),
  createEntry("divider", ""),
]

export function FloatingTerminal() {
  const router = useRouter()
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<TerminalEntry[]>(() => createInitialHistory())
  const [isDesktop, setIsDesktop] = useState(false)
  const [matrixEnabled, setMatrixEnabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [size, setSize] = useState<Size>(DEFAULT_SIZE)
  const terminalRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ x: 0, y: 0, width: DEFAULT_SIZE.width, height: DEFAULT_SIZE.height })
  const hasDraggedRef = useRef(false)
  const positionRef = useRef<Position>({ x: 0, y: 0 })
  const sizeRef = useRef<Size>(DEFAULT_SIZE)

  const appendOutput = (...lines: string[]) => {
    setHistory((currentHistory) => [
      ...currentHistory,
      ...lines.map((line) => createEntry("output", line)),
    ])
  }

  const appendError = (line: string) => {
    setHistory((currentHistory) => [...currentHistory, createEntry("error", line)])
  }

  const appendHelp = () => {
    setHistory((currentHistory) => [
      ...currentHistory,
      createEntry("help-title", "Available commands:"),
      createEntry("help-row", "about - View Marcos' bio"),
      createEntry("help-row", "projects - List main projects"),
      createEntry("help-row", "contact - Open the contact page"),
      createEntry("help-row", "matrix - Enable the rain effect"),
      createEntry("help-row", "exit - Stop the matrix effect"),
      createEntry("help-row", "close - Close the terminal"),
      createEntry("help-row", "clear - Clear the terminal"),
      createEntry("help-row", "social - Contact links"),
    ])
  }

  const updatePosition = (nextPosition: Position) => {
    positionRef.current = nextPosition
    setPosition(nextPosition)
  }

  const updateSize = (nextSize: Size) => {
    sizeRef.current = nextSize
    setSize(nextSize)
  }

  const clampSize = (nextWidth: number, nextHeight: number, nextPosition = positionRef.current) => {
    const viewportMaxWidth = Math.max(280, window.innerWidth - WINDOW_MARGIN * 2)
    const viewportMaxHeight = Math.max(240, window.innerHeight - WINDOW_TOP_OFFSET - WINDOW_MARGIN)
    const availableWidth = Math.max(280, window.innerWidth - nextPosition.x - WINDOW_MARGIN)
    const availableHeight = Math.max(240, window.innerHeight - nextPosition.y - WINDOW_MARGIN)
    const maxWidth = Math.min(viewportMaxWidth, availableWidth)
    const maxHeight = Math.min(viewportMaxHeight, availableHeight)
    const minWidth = Math.min(320, maxWidth)
    const minHeight = Math.min(260, maxHeight)

    return {
      width: Math.min(Math.max(Math.round(nextWidth), minWidth), maxWidth),
      height: Math.min(Math.max(Math.round(nextHeight), minHeight), maxHeight),
    }
  }

  const clampPosition = (nextX: number, nextY: number, nextSize = sizeRef.current) => {
    const maxX = Math.max(WINDOW_MARGIN, window.innerWidth - nextSize.width - WINDOW_MARGIN)
    const maxY = Math.max(WINDOW_TOP_OFFSET, window.innerHeight - nextSize.height - WINDOW_MARGIN)

    return {
      x: Math.min(Math.max(WINDOW_MARGIN, Math.round(nextX)), maxX),
      y: Math.min(Math.max(WINDOW_TOP_OFFSET, Math.round(nextY)), maxY),
    }
  }

  const getDockedPosition = (nextSize = sizeRef.current) =>
    clampPosition(
      window.innerWidth - nextSize.width - WINDOW_MARGIN,
      window.innerHeight - nextSize.height - WINDOW_MARGIN - TOGGLE_BUTTON_CLEARANCE,
      nextSize
    )

  const navigateToRoute = (target: keyof typeof routeCommands) => {
    appendOutput(`Opening ${target}...`)

    window.setTimeout(() => {
      router.push(routeCommands[target])
    }, 150)
  }

  const openSocial = (target: keyof typeof socialCommands) => {
    const social = socialCommands[target]
    appendOutput(`Opening ${social.label}...`)

    window.setTimeout(() => {
      if (social.href.startsWith("mailto:")) {
        window.location.href = social.href
        return
      }

      window.open(social.href, "_blank", "noopener,noreferrer")
    }, 150)
  }

  const dockToCorner = () => {
    const nextSize = clampSize(sizeRef.current.width, sizeRef.current.height, {
      x: WINDOW_MARGIN,
      y: WINDOW_TOP_OFFSET,
    })
    updateSize(nextSize)
    updatePosition(
      clampPosition(
        window.innerWidth - nextSize.width - WINDOW_MARGIN,
        window.innerHeight - nextSize.height - WINDOW_MARGIN - TOGGLE_BUTTON_CLEARANCE,
        nextSize
      )
    )
    setIsReady(true)
    hasDraggedRef.current = false
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const updateIsDesktop = () => {
      setIsDesktop(mediaQuery.matches)

      if (!mediaQuery.matches) {
        setIsOpen(false)
      }
    }

    updateIsDesktop()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsDesktop)
      return () => mediaQuery.removeEventListener("change", updateIsDesktop)
    }

    mediaQuery.addListener(updateIsDesktop)
    return () => mediaQuery.removeListener(updateIsDesktop)
  }, [])

  useEffect(() => {
    const syncPosition = () => {
      const nextSize = clampSize(sizeRef.current.width, sizeRef.current.height)
      updateSize(nextSize)

      if (hasDraggedRef.current) {
        updatePosition(clampPosition(positionRef.current.x, positionRef.current.y, nextSize))
        return
      }

      updatePosition(getDockedPosition(nextSize))
      setIsReady(true)
    }

    const frame = window.requestAnimationFrame(syncPosition)
    window.addEventListener("resize", syncPosition)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", syncPosition)
    }
  }, [isReady])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const output = outputRef.current

    if (!output) {
      return
    }

    output.scrollTop = output.scrollHeight
  }, [history])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvasHostRef.current

    if (!canvas || !host) {
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    if (!matrixEnabled) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    let animationFrameId = 0
    let width = 0
    let height = 0
    let fontSize = 16
    let drops: number[] = []

    const resizeCanvas = () => {
      const rect = host.getBoundingClientRect()

      width = rect.width
      height = rect.height
      fontSize = width < 420 ? 12 : 15

      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(width * devicePixelRatio))
      canvas.height = Math.max(1, Math.floor(height * devicePixelRatio))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      context.textBaseline = "top"
      context.font = `${fontSize}px var(--font-mono), monospace`

      const columnCount = Math.ceil(width / fontSize)
      drops = Array.from({ length: columnCount }, () =>
        Math.floor((Math.random() * height) / fontSize)
      )
    }

    const drawFrame = () => {
      context.fillStyle = "rgba(2, 8, 5, 0.14)"
      context.fillRect(0, 0, width, height)
      context.font = `${fontSize}px var(--font-mono), monospace`

      for (let columnIndex = 0; columnIndex < drops.length; columnIndex += 1) {
        const glyph = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)]
        const x = columnIndex * fontSize
        const y = drops[columnIndex] * fontSize

        context.fillStyle = columnIndex % 7 === 0 ? "rgba(220, 255, 231, 0.95)" : "rgba(116, 255, 170, 0.9)"
        context.fillText(glyph, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[columnIndex] = 0
        } else {
          drops[columnIndex] += 1
        }
      }

      animationFrameId = window.requestAnimationFrame(drawFrame)
    }

    resizeCanvas()

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(host)
    window.addEventListener("resize", resizeCanvas)

    animationFrameId = window.requestAnimationFrame(drawFrame)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener("resize", resizeCanvas)
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [matrixEnabled])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const terminal = terminalRef.current

    if (!terminal) {
      return
    }

    const rect = terminal.getBoundingClientRect()
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    hasDraggedRef.current = true
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }

    const nextX = event.clientX - dragOffsetRef.current.x
    const nextY = event.clientY - dragOffsetRef.current.y
    updatePosition(clampPosition(nextX, nextY))
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsDragging(false)
    setIsReady(true)
  }

  const handleResizePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation()
    resizeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      width: sizeRef.current.width,
      height: sizeRef.current.height,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    setIsResizing(true)
  }

  const handleResizePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isResizing) {
      return
    }

    const deltaX = event.clientX - resizeStartRef.current.x
    const deltaY = event.clientY - resizeStartRef.current.y
    const nextSize = clampSize(
      resizeStartRef.current.width + deltaX,
      resizeStartRef.current.height + deltaY
    )

    updateSize(nextSize)
    updatePosition(clampPosition(positionRef.current.x, positionRef.current.y, nextSize))
  }

  const handleResizePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsResizing(false)
    setIsReady(true)
  }

  const handleCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const submittedCommand = command.trim()
    const normalizedCommand = submittedCommand.toLowerCase()

    if (!normalizedCommand) {
      return
    }

    setHistory((currentHistory) => [...currentHistory, createEntry("command", submittedCommand)])
    setCommand("")

    if (normalizedCommand === "help") {
      appendHelp()
      return
    }

    if (normalizedCommand in routeCommands) {
      navigateToRoute(normalizedCommand as keyof typeof routeCommands)
      return
    }

    if (normalizedCommand in socialCommands) {
      openSocial(normalizedCommand as keyof typeof socialCommands)
      return
    }

    if (normalizedCommand === "social") {
      setHistory((currentHistory) => [
        ...currentHistory,
        createEntry("help-title", "Contact links:"),
        createEntry("help-row", `github - ${personalInfo.github}`),
        createEntry("help-row", `linkedin - ${personalInfo.linkedin}`),
        createEntry("help-row", `email - ${personalInfo.email}`),
      ])
      return
    }

    const [action, target] = normalizedCommand.split(/\s+/, 2)

    if ((action === "go" || action === "open") && target && target in routeCommands) {
      navigateToRoute(target as keyof typeof routeCommands)
      return
    }

    if ((action === "social" || action === "open") && target && target in socialCommands) {
      openSocial(target as keyof typeof socialCommands)
      return
    }

    if (normalizedCommand === "matrix") {
      if (matrixEnabled) {
        appendOutput("Matrix effect is already running.")
        return
      }

      setMatrixEnabled(true)
      appendOutput("Matrix protocol enabled.")
      return
    }

    if (normalizedCommand === "exit") {
      if (!matrixEnabled) {
        appendOutput("No Matrix effect is currently active.")
        return
      }

      setMatrixEnabled(false)
      appendOutput("Protocol terminated.")
      return
    }

    if (normalizedCommand === "close") {
      setIsOpen(false)
      return
    }

    if (normalizedCommand === "dock") {
      dockToCorner()
      appendOutput("Terminal moved back to the corner.")
      return
    }

    if (normalizedCommand === "clear") {
      setHistory(createInitialHistory())
      return
    }

    appendError(`Command not recognized: '${normalizedCommand}'. Type 'help' for help.`)
  }

  const renderEntry = (entry: TerminalEntry): ReactNode => {
    if (entry.kind === "divider") {
      return <div className="my-4 border-b border-[#1f1f1f]" />
    }

    if (entry.kind === "command") {
      return renderCommandEntry(entry.text)
    }

    if (entry.kind === "help-title") {
      return <span className="text-[#00ff41]">{entry.text}</span>
    }

    if (entry.kind === "help-row") {
      return renderHelpEntry(entry.text)
    }

    if (entry.kind === "system") {
      return <span className="text-[#8be9fd]">{entry.text}</span>
    }

    return entry.text ? renderTerminalText(entry.text) : "\u00a0"
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {isDesktop ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen((current) => {
              const next = !current

              if (!current) {
                window.requestAnimationFrame(() => {
                  dockToCorner()
                  inputRef.current?.focus()
                })
              }

              return next
            })
          }}
          className="pointer-events-auto fixed right-4 bottom-4 border border-[#333] bg-[#111] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00ff41] shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
        >
          {isOpen ? "Close Terminal" : "Open Terminal"}
        </button>
      ) : null}

      {isDesktop && isOpen ? (
        <div
          ref={terminalRef}
          className="pointer-events-auto fixed overflow-hidden rounded-[8px] border border-[#333] bg-[#0a0a0a] font-mono text-[#00ff41] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            opacity: isReady ? 1 : 0,
            pointerEvents: isReady ? "auto" : "none",
          }}
        >
          <div
            className={`flex items-center justify-between border-b border-[#333] bg-[#1a1a1a] px-[15px] py-2 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-move"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Fechar terminal"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  setIsOpen(false)
                }}
                className="h-3 w-3 rounded-full bg-[#ff5f56]"
              />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>

            <div className="text-xs tracking-[0.2em] text-[#9ca3af]">MARCOS_PORTFOLIO.EXE</div>

            <div className="text-[10px] text-[#6b7280]">v1.0.4</div>
          </div>

          <div ref={canvasHostRef} className="relative h-[calc(100%-37px)] overflow-hidden bg-[#0a0a0a]">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ${
                matrixEnabled ? "opacity-30" : "opacity-0"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%]" />

            <div
              ref={outputRef}
              className="relative z-10 h-full overflow-y-auto px-5 py-5 text-[16px] leading-[1.4] [scrollbar-color:#333_transparent] [scrollbar-width:thin]"
              onClick={() => inputRef.current?.focus()}
            >
              <div
                className="space-y-1"
              >
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className={
                      entry.kind === "command"
                        ? "mb-2 whitespace-pre-wrap"
                        : entry.kind === "system"
                          ? "whitespace-pre-wrap text-[#8be9fd]"
                        : entry.kind === "help-title"
                          ? "mb-1 mt-2 whitespace-pre-wrap text-[#00ff41]"
                        : entry.kind === "help-row"
                          ? "whitespace-pre-wrap"
                        : entry.kind === "error"
                          ? "mb-4 whitespace-pre-wrap text-[#ff5555]"
                        : entry.kind === "divider"
                          ? ""
                          : "whitespace-pre-wrap text-[#00ff41]"
                    }
                  >
                    {renderEntry(entry)}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="mt-2 flex items-center gap-[10px]">
                <span className="font-medium text-[#50fa7b]">marcos@portfolio:~$</span>
                <input
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-[#00ff41] outline-none [text-shadow:0_0_10px_rgba(0,255,65,0.4)]"
                  placeholder=""
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-label="Terminal command input"
                />
              </form>
            </div>

            <div
              className={`absolute right-0 bottom-0 z-30 h-6 w-6 touch-none ${
                isResizing ? "cursor-nwse-resize" : "cursor-nwse-resize"
              }`}
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              onPointerCancel={handleResizePointerUp}
            >
              <div className="absolute right-1.5 bottom-1.5 h-3.5 w-3.5 border-r border-b border-[#4c6f8e]" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
