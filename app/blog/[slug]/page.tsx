import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog-data"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Not Found" }
  return {
    title: `${post.title} | Nagireddi Abhinay`,
    description: post.description,
  }
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <div key={key++} className="my-6 overflow-hidden rounded-lg border border-border">
          {lang && (
            <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
              {lang}
            </div>
          )}
          <pre className="overflow-x-auto bg-foreground/[0.03] p-4">
            <code className="font-mono text-sm leading-relaxed text-foreground">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      )
      continue
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mb-4 mt-10 text-2xl font-bold tracking-tight text-foreground"
        >
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // Bold text on its own line
    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="mb-3 mt-5 font-semibold text-foreground">
          {line.slice(2, -2)}
        </p>
      )
      i++
      continue
    }

    // List items
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="mb-4 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-muted-foreground leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">$1</code>'),
                }}
              />
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list items
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""))
        i++
      }
      elements.push(
        <ol key={key++} className="mb-4 space-y-2 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {idx + 1}
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">$1</code>'),
                }}
              />
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Paragraphs
    elements.push(
      <p
        key={key++}
        className="mb-4 leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">$1</code>'),
        }}
      />
    )
    i++
  }

  return <>{elements}</>
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Link href="/blog">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Button>
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Article content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <article>
          <MarkdownContent content={post.content} />
        </article>

        {/* Navigation */}
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group">
              <div className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </span>
                <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {prevPost.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group sm:text-right">
              <div className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Next
                  <ArrowRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {nextPost.title}
                </p>
              </div>
            </Link>
          )}
        </nav>
      </main>
    </div>
  )
}
