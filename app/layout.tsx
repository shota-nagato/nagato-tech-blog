import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'NagatoTech blog',
  description: 'webエンジニアの技術ブログです',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`
          bg-primary-foreground flex min-h-screen flex-col antialiased
        `}
      >
        <Image
          alt="ファーストビュー画像"
          className="absolute h-[300px] w-full object-cover"
          height={300}
          src="/image/fv.png"
          width={1280}
        />
        <Header />
        <main
          className={`
            mx-auto flex w-full max-w-screen-xl grow px-4
            lg:px-25
          `}
        >
          <div
            className={`
              relative w-full
              lg:grid lg:grid-cols-6 lg:gap-8
            `}
          >
            <div
              className={`
                border
                lg:col-span-4
              `}
            >
              {children}
            </div>
            <div
              className={`
                mt-30 border
                lg:col-span-2 lg:mt-0
              `}
            >
              sidebar
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
