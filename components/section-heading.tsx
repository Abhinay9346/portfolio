"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 text-center opacity-0",
        isVisible && "animate-fade-up"
      )}
    >
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
    </div>
  )
}
