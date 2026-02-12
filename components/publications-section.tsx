"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

export function PublicationsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="publications" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Publications"
          subtitle="Academic research and published work"
        />

        <div
          ref={ref}
          className={cn("opacity-0", isVisible && "animate-fade-up")}
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
            <div className="p-8 pl-10 md:p-10 md:pl-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Research Paper
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Published on Zenodo &middot; Submitted to IEEE
                  </p>
                </div>
              </div>

              <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">
                Digital Certificate Automation System with Secure Multi-Level
                Approval Workflow
              </h3>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                This paper presents a comprehensive system for automating
                digital certificate generation and management using a secure
                multi-level approval workflow. The system leverages modern web
                technologies and cryptographic methods to ensure the integrity
                and authenticity of issued certificates.
              </p>

              <Button className="gap-2" asChild>
                <a href="https://zenodo.org/records/18612998" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Publication / DOI
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
