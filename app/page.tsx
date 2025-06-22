import { ArticlesList } from '@/components/articles/articles-list'
import { Pagination } from '@/components/articles/pagination'
import { ARTICLES_LIMIT } from '@/libs/constants'
import { getArticles } from '@/libs/microcms'

export const revalidate = 0

export default async function Home() {
  const { contents: articles, totalCount } = await getArticles({
    limit: ARTICLES_LIMIT,
    offset: 0,
  })

  return (
    <div>
      <ArticlesList articles={articles} />
      <div className="mt-20 flex justify-center">
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  )
}
