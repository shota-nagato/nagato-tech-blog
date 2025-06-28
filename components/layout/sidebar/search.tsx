'use client'

import Image from 'next/image'
import { FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = (q: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', q)
    return params.toString()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/search?' + createQueryString(e.currentTarget.q.value))
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-l bg-white px-6 py-3"
        placeholder="キーワードで探す"
        type="text"
        id="q"
        name="q"
        defaultValue={searchParams.get('q')?.toString()}
      />
      <button className="bg-primary rounded-r-[3px] px-[20px]" type="submit">
        <Image alt="検索" height={15} src="/svg/search.svg" width={15} />
      </button>
    </form>
  )
}
