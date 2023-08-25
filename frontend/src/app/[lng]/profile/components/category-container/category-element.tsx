"use client"

import RewardsDropdown from "@/app/[lng]/profile/components/dropdown/rewards-dropdown"
import { CreateLocalCategoryResponse } from "@/store/api/category/category-slice.types"
import Image from "next/image"
import { useState } from "react"

type Props = {
  category: CreateLocalCategoryResponse
}

export default function CategoryElement({ category }: Props) {
  const [isHidden, setIsHidden] = useState(true)

  const onClick = () => {
    setIsHidden(!isHidden)
  }

  return (
    <div>
      <div onClick={onClick} className="cursor-pointer">
        <Image
          alt={category.twitch_name}
          src={category.twitch_box_image.replace("-52x72", "")}
          width={56}
          height={56}
          quality={100}
        />
      </div>
      {!isHidden && <RewardsDropdown category={category} />}
    </div>
  )
}
