'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'

interface ArticleContentProps {
  content: string
}

interface CodeBlock {
  type: 'code'
  language: string
  code: string
  filename?: string
}

type ContentPart = string | CodeBlock

// コピーボタンコンポーネント
function CopyButton({
  code,
  hasFilename,
}: {
  code: string
  hasFilename: boolean
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        ${hasFilename ? '' : 'absolute top-2 right-2'}
        rounded bg-gray-700 px-2 py-1 text-xs text-white transition-colors
        hover:bg-gray-600
      `}
      title="コードをコピー"
    >
      {copied ? 'コピー済み!' : 'コピー'}
    </button>
  )
}

// HTMLからコードブロックを抽出してReactコンポーネントに変換
function processCodeBlocks(html: string): ContentPart[] {
  const codeBlockRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/g
  const parts: ContentPart[] = []
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(html)) !== null) {
    // マッチ前のHTMLを追加
    if (match.index > lastIndex) {
      parts.push(html.slice(lastIndex, match.index))
    }

    const preContent = match[1]
    const fullPreTag = match[0]

    // ファイル名を取得する様々なパターン
    let filename: string | undefined

    // MicroCMSで使用される主要なパターン
    const filenamePatterns = [
      // 1. data-filename属性（最優先）
      /data-filename="([^"]+)"/,
      // 2. spanエレメントのcode-block-filenameクラス
      /<span[^>]*class="[^"]*code-block-filename[^"]*"[^>]*>([^<]+)<\/span>/,
      // 3. spanエレメント内のファイル名（クラス指定なし）
      /<span[^>]*>([^<]*\.[a-zA-Z0-9]+[^<]*)<\/span>/,
      // 4. preタグ内の最初のspanエレメント
      /<pre[^>]*><span[^>]*>([^<]+)<\/span>/,
    ]

    for (const pattern of filenamePatterns) {
      const filenameMatch =
        fullPreTag.match(pattern) || preContent.match(pattern)
      if (filenameMatch && filenameMatch[1]) {
        const potentialFilename = filenameMatch[1].trim()
        // ファイル名として妥当かチェック
        if (
          potentialFilename &&
          potentialFilename.length > 0 &&
          potentialFilename.length < 100 &&
          !potentialFilename.includes('<') &&
          !potentialFilename.includes('>') &&
          (potentialFilename.includes('.') ||
            potentialFilename.match(/^[a-zA-Z0-9_-]+$/))
        ) {
          filename = potentialFilename
          break
        }
      }
    }

    // codeタグの内容と言語を取得
    const codeMatch = preContent.match(
      /<code(?:\s+class="language-(\w+)")?[^>]*>([\s\S]*?)<\/code>/,
    )

    if (codeMatch) {
      const language = codeMatch[1] || 'text'
      let code = codeMatch[2]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")

      // spanエレメントのファイル名表示部分を削除（重複を避けるため）
      if (filename) {
        // spanタグで囲まれたファイル名を削除
        code = code.replace(
          new RegExp(
            `<span[^>]*class="[^"]*code-block-filename[^"]*"[^>]*>${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>`,
            'g',
          ),
          '',
        )
        // 単純なspanタグも削除
        code = code.replace(
          new RegExp(
            `<span[^>]*>${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>`,
            'g',
          ),
          '',
        )
      }

      parts.push({
        type: 'code',
        language,
        code: code.trim(),
        filename,
      })
    } else {
      // codeタグが見つからない場合は、preタグの内容をそのまま使用
      parts.push(fullPreTag)
    }

    lastIndex = match.index + match[0].length
  }

  // 残りのHTMLを追加
  if (lastIndex < html.length) {
    parts.push(html.slice(lastIndex))
  }

  return parts
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const [parts, setParts] = useState<ContentPart[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // data-filename属性を持つ要素にspanエレメントを追加する処理
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    const codeElements = tempDiv.querySelectorAll('[data-filename]')
    codeElements.forEach((codeElement) => {
      const filename = codeElement.getAttribute('data-filename')
      if (filename) {
        const spanElement = document.createElement('span')
        spanElement.textContent = filename
        spanElement.className = 'code-block-filename'
        codeElement.prepend(spanElement)
      }
    })

    const processedParts = processCodeBlocks(tempDiv.innerHTML)
    setParts(processedParts)
  }, [content])

  // サーバーサイドレンダリング時は元のHTMLをそのまま表示
  if (!isClient) {
    return (
      <div
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div
      className={`
        prose mt-8 max-w-none
        prose-code:max-w-full prose-code:break-words
        prose-code:whitespace-pre-wrap
      `}
    >
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
        } else {
          return (
            <div key={index} className="relative">
              {/* ファイル名がある場合のみヘッダーを表示 */}
              {part.filename && (
                <div
                  className={`
                    mb-0 flex items-center justify-between rounded-t-lg
                    bg-gray-800 px-4 py-2 text-sm text-white
                  `}
                  style={{ marginBottom: 0 }}
                >
                  <span className="font-medium">{part.filename}</span>
                  <CopyButton code={part.code} hasFilename={true} />
                </div>
              )}
              <div
                className={part.filename ? 'mt-0' : ''}
                style={{ marginTop: 0 }}
              >
                <SyntaxHighlighter
                  language={part.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    borderRadius: part.filename
                      ? '0 0 0.5rem 0.5rem'
                      : '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    padding: '1rem',
                  }}
                  showLineNumbers={false}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {part.code}
                </SyntaxHighlighter>
              </div>
              {/* ファイル名がない場合はコピーボタンを右上に表示 */}
              {!part.filename && (
                <CopyButton code={part.code} hasFilename={false} />
              )}
            </div>
          )
        }
      })}
    </div>
  )
}
