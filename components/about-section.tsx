"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Code2, Server, Database } from "lucide-react"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my journey"
        />

        <div
          ref={ref}
          className={cn("opacity-0", isVisible && "animate-fade-up")}
        >
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm md:p-10">
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Full Stack Developer and IT undergraduate with hands-on experience
              in building secure, scalable MERN stack applications. Strong in
              RESTful APIs, JWT authentication, database design, and SDLC.
              Experienced in real-world projects and published research work.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Frontend</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    React.js, responsive UI, modern CSS
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Backend</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Node.js, Express, REST APIs, JWT
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Database</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    MongoDB, schema design, optimization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
