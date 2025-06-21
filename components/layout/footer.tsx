import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary-black mt-[180px]">
      <div className="flex flex-col items-center gap-6 py-8 text-white">
        <div className="flex items-center gap-10">
          <Link href="/">お問い合わせ</Link>
          <Link href="/">プライバシーポリシー</Link>
          <Link href="/">サイトマップ</Link>
        </div>
        <small>&copy; 2025 NagatoTech All rights reserved.</small>
      </div>
    </footer>
  )
}
