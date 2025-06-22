import RSS from 'rss'

import { getArticles } from '@/libs/microcms'

export async function GET() {
  const { contents } = await getArticles()

  const siteUrl = 'https://nagato-tech.com'

  const feedOptions = {
    title: 'NagatoTech blog',
    description: 'webエンジニアの技術ブログです',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    image_url: `${siteUrl}/bg.jpg`,
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved - ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)

  contents.map((article) => {
    feed.item({
      title: article.title,
      description: article.title,
      url: `${siteUrl}/article/${article.id}`,
      guid: article.id,
      date: article.publishedAt!,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
