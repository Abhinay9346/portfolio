"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Certificate Automation & Verification System",
    featured: true,
    status: "Completed",
    description:
      "Secure bulk digital certificate generation and verification platform with QR-code based verification and role-based access control.",
    highlights: [
      "PDF generation using templates",
      "QR-code based certificate verification",
      "RESTful APIs and role-based access control",
      "Reduced manual effort by 90%",
      "Supports 1000+ certificates per batch",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
  },
  {
    title: "Online Bus Ticket Booking System",
    featured: false,
    status: "Ongoing",
    description:
      "Full-featured MERN stack bus booking application with real-time search, seat booking, and admin dashboard.",
    highlights: [
      "Real-time bus search and seat booking",
      "JWT-based authentication",
      "Role-based admin and user access",
      "Prevents double booking",
      "Optimized MongoDB schema",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
  },
]

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Projects"
          subtitle="Real-world applications I have built"
        />

        <div
          ref={ref}
          className={cn(
            "grid gap-8 opacity-0 lg:grid-cols-2",
            isVisible && "animate-fade-up"
          )}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
                project.featured && "lg:col-span-2"
              )}
            >
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              )}

              <div className="p-8">
                <div className="mb-4 flex items-center gap-3">
                  {project.status === "Completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.status}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
                  {project.title}
                </h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className={cn(
                  "mb-6 grid gap-2",
                  project.featured ? "md:grid-cols-2" : "grid-cols-1"
                )}>
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
