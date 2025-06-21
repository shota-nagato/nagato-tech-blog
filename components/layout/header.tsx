import { getCategories } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export async function Header() {
  const { contents: categories } = await getCategories({
    orders: 'publishedAt',
  })

  return (
    <header className="bg-primary relative mb-30">
      <div
        className={`
          mx-auto flex h-15 max-w-screen-xl items-center justify-between px-4
          lg:px-25
        `}
      >
        <Link href="/">
          <Image src="/image/logo.png" alt="logo" width={209} height={24} />
        </Link>
        <div className="flex items-center gap-10">
          <ul
            className={`
              hidden gap-10
              lg:flex
            `}
          >
            {categories.map((category) => (
              <li key={category.id} className="body text-white">
                <Link href="#">{category.name}</Link>
              </li>
            ))}
          </ul>
          <Link
            href="https://github.com/shota-nagato"
            target="_blank"
            className="flex items-center gap-2"
          >
            <Image
              src="/svg/github-white.svg"
              alt="github"
              width={20}
              height={20}
            />
            <span
              className={`
                hidden text-white
                lg:block
              `}
            >
              GitHub
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
