import { ArticlesList } from '@/components/articles/articles-list'
import { ARTICLES_LIMIT } from '@/libs/constants'
import { getArticles } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export async function generateMetadata(props: {
  searchParams: Promise<{ q: string }>
}) {
  const searchParams = await props.searchParams

  return {
    title: `キーワード「${searchParams.q}」の記事一覧`,
  }
}

export default async function Page(props: {
  searchParams: Promise<{ q: string }>
}) {
  const searchParams = await props.searchParams

  const { contents: articles } = await getArticles({
    limit: ARTICLES_LIMIT,
    q: searchParams.q,
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
              <span className="text-text-inactive">キーワード</span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="h2">{`「${searchParams.q}」に関する記事一覧`}</h2>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {articles.length > 0 ? (
          <ArticlesList articles={articles} />
        ) : (
          <div className="text-text-inactive text-center">
            該当する記事は見つかりませんでした
          </div>
        )}
      </div>
    </>
  )
}
