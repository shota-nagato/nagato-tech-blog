import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="relative bg-primary mb-30">
      <div className="flex items-center h-15 justify-between px-4 lg:px-25 max-w-screen-xl mx-auto">
        <Link href="/">
          <Image src="/image/logo.png" alt="logo" width={209} height={24} />
        </Link>
        <ul className="flex">
          <li>li</li>
          <li>li</li>
          <li>li</li>
          <li>li</li>
        </ul>
      </div>
    </header>
  )
}
