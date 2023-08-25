"use client"

import classNames from "classnames"
import Image from "next/image"
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: {
    height: number
    width: number
    src: string
  }
}

export default function Button({ icon, children, className, ...props }: Props) {
  return (
    <button
      className={classNames(
        "flex gap-2 items-center justify-center",
        className
      )}
      {...props}
    >
      {icon && <Image {...icon} alt="Button Icon" />}
      {children}
    </button>
  )
}
