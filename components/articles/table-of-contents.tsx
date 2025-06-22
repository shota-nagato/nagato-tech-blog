import Link from 'next/link'

type TocEntry = {
  text: string | null
  name: string | undefined
  id: string
}

type Props = {
  toc: TocEntry[]
}

export default function tableOfContents(props: Props) {
  return (
    <div
      className={`
        bg-primary-foreground border-object-inactive rounded-[2px] p-[24px]
      `}
    >
      <h3 className="text-text-secondary-black mb-[16px] text-[16px] font-bold">
        目次
      </h3>
      <ul>
        {props.toc.map((content, index) => (
          <li
            className={`
              ${content.name == 'h3' ? 'pl-[24px]' : ''}
              border-object-inactive mb-[10px] border-b pb-[10px] text-[14px]
            `}
            key={`${content.id}-${index}`}
          >
            <Link href={`#${content.id}`}>{content.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
