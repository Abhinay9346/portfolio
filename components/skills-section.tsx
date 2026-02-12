"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import {
  Monitor,
  Server,
  Database,
  Code,
  Cloud,
  Lightbulb,
} from "lucide-react"

const skillGroups = [
  {
    title: "Frontend",
    icon: Monitor,
    skills: ["HTML5", "CSS3", "React.js", "Bootstrap"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB"],
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["JavaScript", "Java", "Python"],
  },
  {
    title: "Tools & Cloud",
    icon: Cloud,
    skills: ["Git", "GitHub", "Postman", "AWS (EC2, S3, API Gateway)"],
  },
  {
    title: "Concepts",
    icon: Lightbulb,
    skills: ["SDLC", "MVC Architecture", "OOP", "DSA"],
  },
]

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div
          ref={ref}
          className={cn(
            "grid gap-6 opacity-0 sm:grid-cols-2 lg:grid-cols-3",
            isVisible && "animate-fade-up"
          )}
        >
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <group.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
