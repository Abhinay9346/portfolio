"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { PublicationsSection } from "@/components/publications-section"
import { CertificationsSection } from "@/components/certifications-section"
import { BlogSection } from "@/components/blog-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PublicationsSection />
        <CertificationsSection />
        <BlogSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
