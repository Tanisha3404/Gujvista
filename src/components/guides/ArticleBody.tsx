import { parseArticleContent } from '../../lib/articleContent'

export default function ArticleBody({ content }: { content: string }) {
  const blocks = parseArticleContent(content)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2 key={index} className="pt-6 text-2xl font-bold">
              {block.text}
            </h2>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed text-white/80">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className="text-lg leading-relaxed text-white/80">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}