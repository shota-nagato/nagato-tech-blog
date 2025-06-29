import TableOfContents from '@/components/articles/table-of-contents'
import ArticleContent from '@/components/articles/article-content'
import { getArticle, getArticles } from '@/libs/microcms'
import { formatDate, renderToc } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ articleId: string }>
  searchParams: Promise<{ dk?: string }>
}) {
  const { articleId } = await props.params
  const { dk } = await props.searchParams
  const article = await getArticle(articleId, { draftKey: dk })

  if (!article) {
    notFound()
  }

  return {
    title: `${article.title}`,
    description: article.content.slice(0, 150),
    openGraph: {
      images: [
        {
          url: article.eyecatch?.url,
        },
      ],
    },
    ...(dk && {
      robots: {
        index: false,
        googleBot: {
          index: false,
        },
      },
    }),
  }
}

export default async function Page(props: {
  params: Promise<{ articleId: string }>
  searchParams: Promise<{ dk?: string }>
}) {
  const { articleId } = await props.params
  const { dk } = await props.searchParams
  const article = await getArticle(articleId, { draftKey: dk })
  const { contents: otherArticles } = await getArticles({
    filters: `category[equals]${article.category.id}[and]id[not_equals]${article.id}`,
    limit: 6,
  })

  // 前の記事と次の記事を取得
  const { contents: prevArticles } = await getArticles({
    filters: `publishedAt[less_than]${article.publishedAt}`,
    orders: '-publishedAt',
    limit: 1,
  })

  const { contents: nextArticles } = await getArticles({
    filters: `publishedAt[greater_than]${article.publishedAt}`,
    orders: 'publishedAt',
    limit: 1,
  })

  const prevArticle = prevArticles.length > 0 ? prevArticles[0] : null
  const nextArticle = nextArticles.length > 0 ? nextArticles[0] : null

  const toc = renderToc(article.content)
  const shareText = article.title + ' - NagatTech blog'

  return (
    <div>
      <div className="rounded bg-white p-8">
        {/* パンくず */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image alt="home" height={20} src="/svg/home.svg" width={20} />
          </Link>
          <Image alt="next" height={15} src="/svg/arrow-next.svg" width={15} />
          <Link
            href={`/category/${article.category.id}`}
            className={`body-sm text-primary shrink-0`}
          >
            {article.category.name}
          </Link>
          <Image alt="next" height={15} src="/svg/arrow-next.svg" width={15} />
          <div className="text-primary-black body-sm line-clamp-1">
            {article.title}
          </div>
        </div>

        {/* カテゴリ */}
        <div className="mt-20">
          <div
            className={`
              bg-object-inactive body text-primary-black inline-block rounded
              px-4 py-2
            `}
          >
            {article.category.name}
          </div>
          {/* タイトル */}
          <h1 className="h1 mt-4">{article.title}</h1>
          {/* 日付 */}
          <div
            className={`
              text-text-secondary body-sm mt-8 flex items-center gap-2
            `}
          >
            <div className="flex items-center gap-1">
              <Image alt="作成日" height={15} src="/svg/clock.svg" width={15} />
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
          {/* サムネ */}
          {article.eyecatch && (
            <Image
              alt={article.title}
              height={240}
              src={article.eyecatch.url}
              width={320}
              className="mt-8 w-full rounded"
            />
          )}
          {/* タグ */}
          <div className="flex flex-wrap gap-2 bg-white pt-6 pb-8">
            {article.tags.map((tag, index) => (
              <div
                key={tag.id}
                className={`
                  ${
                    index < article.tags.length - 1
                      ? 'border-text-inactive mr-3 border-r pr-3'
                      : ''
                  }
                `}
              >
                <div className="flex items-center gap-1">
                  <Image
                    alt={tag.name}
                    height={12}
                    src="/svg/tag.svg"
                    width={12}
                  />
                  <Link
                    href={`/tag/${tag.id}`}
                    className="text-body text-text-secondary-black"
                  >
                    {tag.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 目次 */}
          <div className="mt-[40px]">
            <TableOfContents toc={toc} />
          </div>

          {/* 記事本文 */}
          <ArticleContent content={article.content} />

          {/* シェア */}
          <div className="mt-[120px]">
            <div className="text-center text-[#B2B7B7]">share on</div>
            <div
              className={`mt-[24px] flex items-center justify-center gap-[40px]`}
            >
              <Link
                href={`https://twitter.com/share?url=https://nagato-tech.com/article/${article.id}&text=${shareText}%0a`}
                rel="nofollow noopener"
                target="_blank"
              >
                <Image
                  alt="xアイコン"
                  height={30}
                  src="/svg/x.svg"
                  width={30}
                />
              </Link>
              <Link
                href={`https://www.facebook.com/share.php?u=https://nagato-tech.com/article/${article.id}`}
                rel="nofollow noopener"
                target="_blank"
              >
                <Image
                  alt="facebookアイコン"
                  height={30}
                  src="/svg/facebook.svg"
                  width={30}
                />
              </Link>
              <Link
                href={`https://line.me/R/msg/text/?https://nagato-tech.com/article/${article.id}%0a${shareText}`}
              >
                <Image
                  alt="lineアイコン"
                  height={30}
                  src="/svg/line.svg"
                  width={30}
                />
              </Link>
              {/* <CopyButton url={`https://nagato-tech.com/article/${article.id}`} /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between">
        {prevArticle ? (
          <Link
            href={`/article/${prevArticle.id}`}
            className={`flex items-center gap-2`}
          >
            <Image
              alt="前の記事"
              height={15}
              src="/svg/arrow-prev.svg"
              width={15}
            />
            <div className="text-primary-black body">前の記事</div>
          </Link>
        ) : (
          <div className="flex items-center gap-2 opacity-50">
            <Image
              alt="前の記事"
              height={15}
              src="/svg/arrow-prev.svg"
              width={15}
            />
            <div className="text-primary-black body">前の記事</div>
          </div>
        )}

        <Link href="/" className="flex items-center gap-2">
          <Image alt="ホーム" height={15} src="/svg/home.svg" width={15} />
          <div className="text-primary-black body">ホーム</div>
        </Link>

        {nextArticle ? (
          <Link
            href={`/article/${nextArticle.id}`}
            className={`flex items-center gap-2`}
          >
            <div className="text-primary-black body">次の記事</div>
            <Image
              alt="次の記事"
              height={15}
              src="/svg/arrow-next.svg"
              width={15}
            />
          </Link>
        ) : (
          <div className="flex items-center gap-2 opacity-50">
            <div className="text-primary-black body">次の記事</div>
            <Image
              alt="次の記事"
              height={15}
              src="/svg/arrow-next.svg"
              width={15}
            />
          </div>
        )}
      </div>

      {/* 同じカテゴリの記事 */}
      <div className="mt-40">
        <div className="h1 text-primary-black">同じカテゴリの記事</div>

        <div className="mt-10">
          <ul className="grid grid-cols-3 gap-5">
            {otherArticles.map((article) => (
              <li key={article.id}>
                <Link href={`/article/${article.id}`}>
                  {article.eyecatch && (
                    <Image
                      alt={article.title}
                      height={120}
                      src={article.eyecatch.url}
                      width={120}
                      className="w-full rounded shadow"
                    />
                  )}
                  <div className="text-primary-black body mt-2">
                    {article.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
