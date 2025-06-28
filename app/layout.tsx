import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'
import { Profile } from '@/components/layout/sidebar/profile'
import { Categories } from '@/components/layout/sidebar/categories'
import { Tags } from '@/components/layout/sidebar/tags'
import { Noto_Sans_JP } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { Search } from '@/components/layout/sidebar/search'

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'NagatoTech blog',
    template: 'NagatoTech blog | %s',
  },
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
          ${noto.className}
        `}
      >
        <GoogleTagManager gtmId={process.env.GTM_ID ?? ''} />
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
            <div className={`lg:col-span-4`}>{children}</div>
            <div
              className={`
                mt-30
                lg:col-span-2 lg:mt-0
              `}
            >
              <div className="flex flex-col gap-8">
                <Search />
                <Profile />
                <Categories />
                <Tags />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
