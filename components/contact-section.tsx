"use client"

import { SectionHeading } from "@/components/section-heading"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Reach out!"
        />

        <div
          ref={ref}
          className={cn(
            "grid gap-8 opacity-0 md:grid-cols-5",
            isVisible && "animate-fade-up"
          )}
        >
          {/* Info */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-foreground">
                Contact Info
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:abhinay891984@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  abhinay891984@gmail.com
                </a>
                <a
                  href="https://github.com/Abhinay9346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4 shrink-0" />
                  github.com/Abhinay9346
                </a>
                <a
                  href="https://linkedin.com/in/nagireddi8919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 shrink-0" />
                  linkedin.com/in/nagireddi8919
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>

                <Button className="w-full gap-2" size="lg">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
