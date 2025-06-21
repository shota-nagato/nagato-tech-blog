import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from 'microcms-js-sdk'

export type Category = {
  id: string
  name: string
} & MicroCMSDate

export type Tag = {
  id: string
  name: string
} & MicroCMSDate

export type Article = {
  id: string
  title: string
  content: string
  eyecatch?: MicroCMSImage
  category: Category
  tags: Tag[]
} & MicroCMSDate

import { createClient } from 'microcms-js-sdk'

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('サービスドメインが必要です')
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('APIキーが必要です')
}

export const microCMSClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

export async function getCategories(queries?: MicroCMSQueries) {
  const categories = await microCMSClient.getList<Category>({
    endpoint: 'categories',
    queries,
  })
  return categories
}

export async function getTags(queries?: MicroCMSQueries) {
  const tags = await microCMSClient.getList<Tag>({
    endpoint: 'tags',
    queries,
  })
  return tags
}

export async function getArticles(queries?: MicroCMSQueries) {
  const articles = await microCMSClient.getList<Article>({
    endpoint: 'articles',
    queries,
  })
  return articles
}
