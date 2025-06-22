import { ARTICLES_LIMIT } from '@/libs/constants'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  totalCount: number
  currentPage?: number
  basePath?: string
}

export function Pagination(props: Props) {
  const pageCount = Math.ceil(props.totalCount / ARTICLES_LIMIT)
  const currentPage = props.currentPage ?? 1
  const basePath = props.basePath ?? ''

  return (
    <div className="flex items-center gap-4">
      {currentPage > 1 ? (
        <Link href={`${basePath}/page/${currentPage - 1}`}>
          <div
            className={`
              bg-object-inactive flex h-6 w-6 items-center justify-center
              rounded-full
            `}
          >
            <Image
              src="/svg/arrow-prev.svg"
              alt="前へ"
              width={16}
              height={16}
            />
          </div>
        </Link>
      ) : (
        <div
          className={`
            bg-object-inactive flex h-6 w-6 items-center justify-center
            rounded-full
          `}
        >
          <Image src="/svg/arrow-prev.svg" alt="前へ" width={16} height={16} />
        </div>
      )}
      <div className="flex gap-3">
        {Array.from({ length: pageCount }).map((_, i) => (
          <Link
            key={i}
            href={`${basePath}/page/${i + 1}`}
            className={`
              text-primary-black body flex h-8 w-8 items-center justify-center
              ${
                currentPage === i + 1
                  ? 'bg-primary rounded-full text-white'
                  : ''
              }
            `}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      {currentPage < pageCount ? (
        <Link href={`${basePath}/page/${currentPage + 1}`}>
          <div
            className={`
              bg-object-inactive flex h-6 w-6 items-center justify-center
              rounded-full
            `}
          >
            <Image
              src="/svg/arrow-next.svg"
              alt="次へ"
              width={16}
              height={16}
            />
          </div>
        </Link>
      ) : (
        <div
          className={`
            bg-object-inactive flex h-6 w-6 items-center justify-center
            rounded-full
          `}
        >
          <Image src="/svg/arrow-next.svg" alt="次へ" width={16} height={16} />
        </div>
      )}
    </div>
  )
}
