import Image from 'next/image'
import Link from 'next/link'

export function Profile() {
  return (
    <div className="rounded bg-white px-6 py-8">
      <div className="flex items-center gap-6">
        <Image
          alt="アバター"
          className="rounded-full shadow"
          height={80}
          src="/image/profile.webp"
          width={80}
        />
        <div className="flex flex-col gap-1">
          <h3 className="h3 text-primary-black">Shota Nagato</h3>
          <p className="body-sm text-text-secondary-black">Webエンジニア</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="body-sm text-primary-black">
          <Link href="https://hab-co.jp/" target="_blank">
            株式会社HAB&Co.
          </Link>
          ｜RailsとかNext.jsとか
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link href="https://github.com/shota-nagato" target="_blank">
          <Image alt="GitHub" height={30} src="/svg/github.svg" width={30} />
        </Link>
        <Link href="#" target="_blank">
          <Image alt="rss" height={30} src="/svg/rss.svg" width={30} />
        </Link>
      </div>
    </div>
  )
}
