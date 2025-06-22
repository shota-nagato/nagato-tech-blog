import { ArticlesList } from '@/components/articles/articles-list'
import { Pagination } from '@/components/articles/pagination'
import { ARTICLES_LIMIT } from '@/libs/constants'
import { getArticles, getTag } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export async function generateMetadata(props: {
  params: Promise<{ tagId: string; currentPage: string }>
}) {
  const { tagId, currentPage } = await props.params
  const tag = await getTag(tagId)

  return {
    title: `${tag.name}の記事一覧 - ${currentPage}ページ目`,
  }
}

export default async function Page(props: {
  params: Promise<{ tagId: string; currentPage: string }>
}) {
  const { tagId, currentPage } = await props.params
  const tag = await getTag(tagId)
  const tagName = tag.name

  const { contents: articles, totalCount } = await getArticles({
    limit: ARTICLES_LIMIT,
    filters: `tags[contains]${tagId}`,
    offset: (Number(currentPage) - 1) * ARTICLES_LIMIT,
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
                src="/svg/tag-inactive.svg"
                width={15}
              />
              <span className="text-text-inactive">タグ</span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="h2">{`${tagName}に関する記事一覧`}</h2>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ArticlesList articles={articles} />
      </div>
      <div className="mt-20 flex justify-center">
        <Pagination
          totalCount={totalCount}
          currentPage={Number(currentPage)}
          basePath={`/tag/${tagId}`}
        />
      </div>
    </>
  )
}
