"use client"

import classNames from "classnames"
import Image, { StaticImageData } from "next/image"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: {
    height: number
    width: number
    src: string | StaticImageData
  }
}

export default function Button({ icon, children, className, ...props }: Readonly<Props>) {
  return (
    <button
      className={classNames(
        "flex gap-2 items-center justify-center",
        "border-b-[#31313E] border-l-[#31313E] border-b-4 border-l-4 bg-less-dark rounded-[20px] p-4 ",
        className
      )}
      {...props}
    >
      {icon && <Image {...icon} alt="Button Icon" />}
      {children}
    </button>
  )
}
