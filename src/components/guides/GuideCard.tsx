import { CalendarDays, Clock } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { formatPublishedDate, readingTimeMinutes } from '../../lib/articleContent'
import type { BlogPost } from '../../types/blogPost'

export default function GuideCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper text-ink transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-4 text-xs text-ink/60">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} aria-hidden="true" />
            {formatPublishedDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} aria-hidden="true" />
            {readingTimeMinutes(post.content)} min read
          </span>
        </p>

        <h3 className="mt-3 text-xl font-semibold leading-snug">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>

        <div className="mt-auto pt-5">
          {/* The stretched link makes the whole card clickable. */}
          <ButtonLink
            to={`/guides/${post.slug}`}
            variant="outlineDark"
            className="after:absolute after:inset-0"
          >
            Read guide
            <span className="sr-only">: {post.title}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}