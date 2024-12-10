'use client'
import Image from 'next/image';
// import Image from 'next/image'
import Script from 'next/script';

export enum ItemType {
  Equipment = "item",
  Card = "cards"
}

type Props = {
  id?: number;
  type: ItemType;
}

export default function ItemIcon({
  id, type
}: Props) {
  const url = `https://www.divine-pride.net/images/items/${type}/${id || 0}.png`

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
   e.preventDefault();
  }

  return (
    <>
      <Script
        src="https://www.divine-pride.net/scripts/tooltip.js"
        strategy="lazyOnload"
      />
      {id ?
        <a href={`https://www.divine-pride.net/database/item/${id || 0}`} onClick={handleLinkClick}>
          <Image
            src={url}
            alt={""}
            width={type === ItemType.Card ? 20 : 24}
            height={type === ItemType.Card ? 30 : 24}
          />
        </a>
        :
        type === ItemType.Card ?
        <div className="border bg-gray-50 min-w-4 min-h-6"></div>
        : <div className="border bg-gray-50 min-w-8 min-h-8"></div>
    }
    </>
  )
}
