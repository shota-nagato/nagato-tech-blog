import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone' // 追加
import utc from 'dayjs/plugin/utc' // 追加
import * as cheerio from 'cheerio'

type TocEntry = {
  text: string | null
  name: string | undefined
  id: string
}

dayjs.extend(utc)
dayjs.extend(timezone)

export function formatDate(date: string) {
  const formattedDate = dayjs.utc(date).tz('Asia/Tokyo').format('YYYY/MM/DD')
  return formattedDate
}

export const renderToc = (body: string): TocEntry[] => {
  const $ = cheerio.load(body)
  const headings = $('h1, h2, h3').toArray()
  const toc: TocEntry[] = headings.map((data) => ({
    /* eslint-disable */
    // @ts-ignore
    text: data.children[0]?.data ?? null,
    // @ts-ignore
    name: data.name,
    // @ts-ignore
    id: data.attribs.id,
    /* eslint-enable */
  }))

  return toc
}
