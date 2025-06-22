import { ArticlesList } from '@/components/articles/articles-list'
import { Pagination } from '@/components/articles/pagination'
import { ARTICLES_LIMIT } from '@/libs/constants'
import { getArticles } from '@/libs/microcms'

export const revalidate = 0

export async function generateMetadata(props: {
  params: Promise<{ currentPage: string }>
}) {
  const { currentPage } = await props.params

  return {
    title: `${currentPage}ページ目`,
  }
}

export default async function Page(props: {
  params: Promise<{ currentPage: string }>
}) {
  const { currentPage } = await props.params

  const { contents: articles, totalCount } = await getArticles({
    limit: ARTICLES_LIMIT,
    offset: (Number(currentPage) - 1) * ARTICLES_LIMIT,
  })

  return (
    <>
      <ArticlesList articles={articles} />
      <div className="mt-20 flex justify-center">
        <Pagination totalCount={totalCount} currentPage={Number(currentPage)} />
      </div>
    </>
  )
}
