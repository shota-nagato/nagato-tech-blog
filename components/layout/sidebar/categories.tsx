import { getArticles, getCategories } from '@/libs/microcms'
import Image from 'next/image'
import Link from 'next/link'

export async function getArticlesCount(categoryId: string) {
  const { contents } = await getArticles({
    filters: `category[equals]${categoryId}`,
  })
  return contents.length
}

export async function Categories() {
  const { contents: categories } = await getCategories({
    orders: 'publishedAt',
  })

  return (
    <div>
      <div className="bg-primary flex items-center gap-4 rounded-t px-6 py-3">
        <Image
          alt="カテゴリ"
          height={18}
          src="/svg/categories.svg"
          width={18}
        />
        <h3 className="h3 text-white">カテゴリ</h3>
      </div>
      <div className="bg-white px-6 pt-6 pb-8">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`
              flex items-center gap-2
              ${
                index < categories.length - 1
                  ? `border-text-inactive mb-3 border-b pb-3`
                  : ''
              }
            `}
          >
            <Link href={`/category/${category.id}`} className="text-body">
              {category.name}
            </Link>
            <span className="text-text-secondary-black">
              ({getArticlesCount(category.id)})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
