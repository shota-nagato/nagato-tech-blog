import { getArticles, getTags } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export async function getArticlesCount(tagId: string) {
  const { contents } = await getArticles({
    filters: `tags[contains]${tagId}`,
  })
  return contents.length
}

export async function Tags() {
  const { contents: tags } = await getTags({
    orders: 'publishedAt',
  })

  return (
    <div>
      <div className="bg-primary flex items-center gap-4 rounded-t px-6 py-3">
        <Image alt="タグ" height={18} src="/svg/tags.svg" width={18} />
        <h3 className="h3 text-white">タグ</h3>
      </div>
      <div className="flex flex-wrap gap-2 bg-white px-6 pt-6 pb-8">
        {tags.map((tag, index) => (
          <div
            key={tag.id}
            className={`
              ${
                index < tags.length - 1
                  ? 'border-text-inactive mr-3 border-r pr-3'
                  : ''
              }
            `}
          >
            <div className="flex items-center gap-1">
              <Image alt={tag.name} height={12} src="/svg/tag.svg" width={12} />
              <Link
                href={`/tag/${tag.id}`}
                className="text-body text-text-secondary-black"
              >
                {tag.name}
              </Link>
              <span className="text-text-secondary-black">
                ({getArticlesCount(tag.id)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
