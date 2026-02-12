"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm animate-fade-in">
          Full Stack Developer (MERN Stack)
        </div>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground animate-fade-up md:text-6xl lg:text-7xl">
          Nagireddi{" "}
          <span className="text-primary">Abhinay</span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Building scalable, secure web applications using the MERN stack.
          Passionate about clean code, RESTful architecture, and delivering
          real-world solutions.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button size="lg" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild>
  <a
    href="/Resume.pdf"
    download
    target="_blank"
    rel="noopener noreferrer"
  >
    <FileText className="mr-2 h-4 w-4" />
    View Resume
  </a>
</Button>


          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full"
            asChild
          >
            <a
              href="https://github.com/Abhinay9346"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full"
            asChild
          >
            <a
              href="https://linkedin.com/in/nagireddi8919"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
