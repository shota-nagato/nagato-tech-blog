import RSS from 'rss'

import { getArticles } from '@/libs/microcms'

export async function GET() {
  const { contents } = await getArticles()

  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

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
    const itemOptions: {
      title: string
      description: string
      url: string
      guid: string
      date: string
      enclosure?: { url: string }
    } = {
      title: article.title,
      description:
        article.content.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 120) +
        '...',
      url: `${siteUrl}/article/${article.id}`,
      guid: article.id,
      date: article.publishedAt ?? article.createdAt,
    }
    if (article.eyecatch) {
      itemOptions['enclosure'] = {
        url: article.eyecatch.url,
      }
    }

    feed.item(itemOptions)
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
