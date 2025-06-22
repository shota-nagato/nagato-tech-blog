import { ArticlesList } from '@/components/articles/articles-list'
import { Pagination } from '@/components/articles/pagination'
import { ARTICLES_LIMIT } from '@/libs/constants'
import { getArticles, getCategory } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export async function generateMetadata(props: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = await props.params
  const category = await getCategory(categoryId)

  return {
    title: `${category.name}の記事一覧`,
  }
}

export default async function Page(props: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = await props.params
  const category = await getCategory(categoryId)
  const categoryName = category.name

  const { contents: articles, totalCount } = await getArticles({
    limit: ARTICLES_LIMIT,
    filters: `category[equals]${categoryId}`,
    offset: 0,
  })

  return (
    <>
      <div>
        <div className="bg-primary h-1 rounded-t"></div>
        <div className="bg-white px-8 pt-6 pb-7">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image alt="home" height={20} src="/svg/home.svg" width={20} />
            </Link>
            <Image
              alt="next"
              height={20}
              src="/svg/arrow-next.svg"
              width={20}
            />
            <div className="flex items-center gap-1">
              <Image
                alt="category"
                height={15}
                src="/svg/category-inactive.svg"
                width={15}
              />
              <span className="text-text-inactive">カテゴリ</span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="h2">{`${categoryName}に関する記事一覧`}</h2>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ArticlesList articles={articles} />
      </div>
      <div className="mt-20 flex justify-center">
        <Pagination
          totalCount={totalCount}
          basePath={`/category/${categoryId}`}
        />
      </div>
    </>
  )
}
