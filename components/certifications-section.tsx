"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Skill Builder",
  },
  {
    name: "Amazon API Gateway for Serverless Applications",
    issuer: "Amazon Web Services",
  },
  {
    name: "Google Analytics Certification",
    issuer: "Google",
  },
  {
    name: "Google Ads Certification",
    issuer: "Coursera",
  },
  {
    name: "Python Essentials",
    issuer: "Cisco",
  },
  {
    name: "Full Stack Development",
    issuer: "Udemy",
  },
]

export function CertificationsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and credentials"
        />

        <div
          ref={ref}
          className={cn(
            "grid gap-5 opacity-0 sm:grid-cols-2 lg:grid-cols-3",
            isVisible && "animate-fade-up"
          )}
        >
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground leading-snug">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>

              <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Verify
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
