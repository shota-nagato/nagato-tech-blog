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
      <body className="bg-primary-foreground antialiased flex flex-col min-h-screen">
        <Image
          alt="ファーストビュー画像"
          className="absolute h-[300px] w-full object-cover"
          height={300}
          src="/image/fv.png"
          width={1280}
        />
        <Header />
        <main className="flex grow px-4 lg:px-25 max-w-screen-xl mx-auto w-full">
          <div className="relative lg:grid lg:grid-cols-6 lg:gap-8 w-full">
            <div className="border lg:col-span-4">{children}</div>
            <div className="border lg:col-span-2 lg:mt-0 mt-30">sidebar</div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
