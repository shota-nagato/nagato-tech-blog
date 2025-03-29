import type { MicroCMSDate, MicroCMSQueries } from 'microcms-js-sdk'

export type Category = {
  id: string
  name: string
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
