import Link from "next/link"
import { Window } from "@/components/window"
import { Footer } from "@/components/footer"
import { personalInfo } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Fullstack Developer Portfolio",
  description: "Get in touch for collaboration opportunities or just to say hello.",
}

const isPlaceholderEmail = personalInfo.email.toLowerCase().endsWith("@example.com")
const githubDisplay = personalInfo.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
const linkedInDisplay = personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

const contactLinks = [
  ...(!isPlaceholderEmail
    ? [
        {
          label: "Email",
          value: personalInfo.email,
          href: `mailto:${personalInfo.email}`,
          icon: "@",
        },
      ]
    : []),
  {
    label: "GitHub",
    value: githubDisplay,
    href: personalInfo.github,
    icon: "</>",
  },
  {
    label: "LinkedIn",
    value: linkedInDisplay,
    href: personalInfo.linkedin,
    icon: "in",
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="px-4 pt-20 pb-8 md:pt-24">
        <div className="content-shell">
          <Window title="contact.sh">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{">"}</span>
                <span className="font-mono text-sm">./send-message.sh</span>
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {"Let's Connect"}
              </h1>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                {"I am always open to discussing fullstack projects, backend/API architecture, freelance opportunities, and collaboration. Feel free to reach out through any of the channels below."}
              </p>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group"
              >
                <Window
                  title={`${link.label.toLowerCase()}.lnk`}
                  className="h-full transition-all group-hover:translate-x-1 group-hover:translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-secondary font-mono text-lg font-bold">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold uppercase tracking-wide">
                        {link.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground break-all">
                        {link.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                      <span>Open</span>
                      <span className="transition-transform group-hover:translate-x-1">
                        {"->"}
                      </span>
                    </div>
                  </div>
                </Window>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <Window title="status.txt">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-foreground opacity-75" />
                  <span className="relative inline-flex h-3 w-3 bg-foreground" />
                </span>
                <span className="font-mono text-sm">
                  {isPlaceholderEmail
                    ? "Currently available for new opportunities (best via LinkedIn)"
                    : "Currently available for new opportunities"}
                </span>
              </div>
              <div className="border-t border-dashed border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  {"Location: "}{personalInfo.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {"Response time: Usually within 24-48 hours"}
                </p>
              </div>
            </div>
          </Window>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="content-shell">
          <div className="border-2 border-dashed border-border p-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              {"// Prefer a quick chat?"}
            </p>
            <p className="mt-2 text-lg">
              {isPlaceholderEmail
                ? "Send me a message on LinkedIn and I will get back to you as soon as possible."
                : "Send me an email and I will get back to you as soon as possible."}
            </p>
            <Link
              href={isPlaceholderEmail ? personalInfo.linkedin : `mailto:${personalInfo.email}`}
              target={isPlaceholderEmail ? "_blank" : undefined}
              rel={isPlaceholderEmail ? "noopener noreferrer" : undefined}
              className="mt-6 inline-block border-2 border-foreground bg-primary px-8 py-3 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              style={{ boxShadow: "4px 4px 0 0 var(--shadow-hard)" }}
            >
              {isPlaceholderEmail ? "Message on LinkedIn" : "Send Email"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
