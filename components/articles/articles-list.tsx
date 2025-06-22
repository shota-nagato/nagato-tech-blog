import { type Article } from '@/libs/microcms'
import { formatDate } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  articles: Article[]
}

export function ArticlesList(props: Props) {
  return (
    <ul
      className={`
        grid grid-cols-1 gap-8
        md:grid-cols-2
      `}
    >
      {props.articles.map((article) => (
        <li key={article.id} className="rounded bg-white shadow">
          <Link href="/articles/1">
            {article.eyecatch && (
              <Image
                alt={article.title}
                height={240}
                src={article.eyecatch.url}
                width={320}
                className="w-full rounded-t"
              />
            )}
            <div className="rounded-b bg-white px-4 pt-4 pb-6">
              <h3 className="h3 text-primary-black">{article.title}</h3>
              <div className="flex flex-col gap-4">
                <div
                  className={`
                    text-text-secondary body-sm mt-8 flex items-center gap-2
                  `}
                >
                  <div className="flex items-center gap-1">
                    <Image
                      alt="作成日"
                      height={15}
                      src="/svg/clock.svg"
                      width={15}
                    />
                    <span>{formatDate(article.publishedAt!)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      alt="更新日"
                      height={15}
                      src="/svg/refresh.svg"
                      width={15}
                    />
                    <span>{formatDate(article.updatedAt!)}</span>
                  </div>
                </div>
                <div>
                  <div
                    className={`
                      bg-object-inactive body text-primary-black inline-block
                      rounded px-4 py-2
                    `}
                  >
                    {article.category.name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
