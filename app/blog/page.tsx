import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Blog | Nagireddi Abhinay",
  description:
    "Technical articles on MERN stack development, authentication, APIs, and software architecture.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-6">
          <Link href="/#blog">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to portfolio</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Blog
            </h1>
            <p className="text-sm text-muted-foreground">
              Thoughts, tutorials, and technical deep-dives
            </p>
          </div>
        </div>
      </header>

      {/* Blog grid */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
