"use client";

import { TwitchCategory } from "@/store/api/category/category-slice-api";
import { onCategorySelect } from "@/store/store/features/category/category-slice";
import { useAppDispatch } from "@/store/store/hooks/store-hooks";
import Image from "next/image";

type Props = {
  category: TwitchCategory;
};

export default function CategoryDropdownElement({
  category: { box_art_url, id, name },
}: Props) {
  const dispatch = useAppDispatch();

  const onClickCategory = (category: TwitchCategory) => {
    dispatch(onCategorySelect(category));
  };

  return (
    <div
      className="flex border-2 bg-gray-600 rounded-lg bg-opacity-20 border-dark-bg hover:border-white hover:border-opacity-50 hover:border-2 hover:rounded-lg"
      onClick={() => onClickCategory({ id, box_art_url, name })}
    >
      <div className="h-14 w-12 self-center">
        <Image
          quality={100}
          height={56}
          width={56}
          src={box_art_url}
          alt="Category Pic"
          style={{ objectFit: "contain" }}
          className="h-14 w-12 rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center pl-2 w-52">
        <p className="text-xs ">{name}</p>
        <p className="text-xs opacity-50">ID: {id}</p>
      </div>
    </div>
  );
}
