'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type TocEntry = {
  text: string | null
  name: string | undefined
  id: string
}

type Props = {
  toc: TocEntry[]
}

export default function StickyTableOfContents({ toc }: Props) {
  const [isSticky, setIsSticky] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      // 目次がスティッキーになる基準位置
      const stickyThreshold = 1200
      setIsSticky(window.scrollY > stickyThreshold)

      // 現在表示されている見出しを検出
      const headingElements = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean)
      const scrollPosition = window.scrollY + 150 // ヘッダー分のオフセット

      let currentActiveId = ''

      for (const element of headingElements) {
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = element.id
        } else {
          break
        }
      }

      setActiveId(currentActiveId)
    }

    handleScroll() // 初回実行
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  // 目次がない場合またはstickyじゃない場合は表示しない
  if (toc.length === 0 || !isSticky) return null

  return (
    <div
      className={`
        fixed top-4 z-50 hidden w-[335px]
        lg:block
      `}
      style={{
        right: `max(1rem, calc((100vw - 1280px + 175px) / 2 + 1rem))`,
      }}
    >
      <div
        className={`
          border-object-inactive max-h-[calc(100vh-50px)] overflow-y-auto
          rounded-[2px] border bg-white p-[24px]
        `}
      >
        <h3
          className={`text-text-secondary-black mb-[16px] text-[16px] font-bold`}
        >
          目次
        </h3>
        <div className="relative">
          {/* 縦線 */}
          <div
            className={`absolute top-0 bottom-0 left-[7px] w-[2px] bg-gray-300`}
          ></div>

          <ul className="space-y-0">
            {toc.map((content, index) => (
              <li
                className={`
                  ${content.name === 'h3' ? 'pl-[38px]' : 'pl-[28px]'}
                  relative pb-[8px] text-[14px]
                  ${index !== toc.length - 1 ? 'mb-[8px]' : ''}
                `}
                key={`${content.id}-${index}`}
              >
                {/* 点（ドット） */}
                <div
                  className={`
                    absolute rounded-full border-2
                    ${
                      content.name === 'h3'
                        ? 'top-[5px] left-[5px] h-[6px] w-[6px]'
                        : 'top-[4px] left-[3px] h-[10px] w-[10px]'
                    }
                    ${
                      activeId === content.id
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 bg-white'
                    }
                  `}
                ></div>

                <Link
                  href={`#${content.id}`}
                  className={`
                    block leading-[16px] transition-colors duration-200
                    ${
                      activeId === content.id
                        ? 'text-primary font-medium'
                        : `
                          hover:text-primary
                          text-gray-600
                        `
                    }
                  `}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(content.id)
                    if (element) {
                      const offsetTop = element.offsetTop - 100
                      window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',
                      })
                    }
                  }}
                >
                  {content.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
