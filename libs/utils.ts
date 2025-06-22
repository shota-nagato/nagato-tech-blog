import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone' // 追加
import utc from 'dayjs/plugin/utc' // 追加

dayjs.extend(utc)
dayjs.extend(timezone)

export function formatDate(date: string) {
  const formattedDate = dayjs.utc(date).tz('Asia/Tokyo').format('YYYY/MM/DD')
  return formattedDate
}
