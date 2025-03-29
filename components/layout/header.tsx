import { getCategories } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export async function Header() {
  const { contents: categories } = await getCategories({
    orders: 'publishedAt',
  })

  return (
    <header className="relative bg-primary mb-30">
      <div className="flex items-center h-15 justify-between px-4 lg:px-25 max-w-screen-xl mx-auto">
        <Link href="/">
          <Image src="/image/logo.png" alt="logo" width={209} height={24} />
        </Link>
        <ul className="lg:flex gap-10 hidden">
          {categories.map((category) => (
            <li key={category.id} className="body text-white">
              <Link href="#">{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
