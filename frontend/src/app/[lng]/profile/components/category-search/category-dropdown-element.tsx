"use client"

import { TwitchCategory } from "@/store/api/category/category-slice.types"
import { onCategorySelect } from "@/store/store/features/category/category-slice"
import { useAppDispatch } from "@/store/store/hooks/store-hooks"
import Image from "next/image"

type Props = {
  category: TwitchCategory
}

export default function CategoryDropdownElement({
  category: { box_art_url, id, name },
}: Props) {
  const dispatch = useAppDispatch()

  const onClickCategory = (category: TwitchCategory) => {
    dispatch(onCategorySelect(category))
  }

  return (
    <div
      className="cursor-pointer flex border-2 bg-gray-600 rounded-lg bg-opacity-20 border-dark-bg hover:border-white hover:border-opacity-50 hover:border-2 hover:rounded-lg"
      onClick={() => onClickCategory({ id, box_art_url, name })}
    >
      <div className="self-center">
        <Image
          quality={100}
          src={box_art_url}
          alt="Category Pic"
          style={{ objectFit: "contain" }}
          className="rounded-l-lg h-full w-full"
          width={56}
          height={56}
        />
      </div>
      <div className="flex flex-col justify-center pl-2 w-52">
        <p className="text-xs ">{name}</p>
        <p className="text-xs opacity-50">ID: {id}</p>
      </div>
    </div>
  )
}
