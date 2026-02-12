"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

const education = [
  {
    degree: "B.Tech in Information Technology",
    institution: "Vignan's LARA Institute of Technology & Science",
    score: "CGPA: 8.3",
    period: "Current",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "kakinada institute of engineering and technology",
    score: "71%",
    period: "Completed",
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Little Angels High School",
    score: "GPA: 10",
    period: "Completed",
  },
]

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Education"
          subtitle="My academic background"
        />

        <div
          ref={ref}
          className={cn("space-y-0 opacity-0", isVisible && "animate-fade-up")}
        >
          {education.map((edu, index) => (
            <div key={edu.degree} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Timeline line */}
              {index !== education.length - 1 && (
                <div className="absolute top-10 left-5 h-[calc(100%-2.5rem)] w-px bg-border" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {edu.institution}
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-semibold text-primary">
                    {edu.score}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
