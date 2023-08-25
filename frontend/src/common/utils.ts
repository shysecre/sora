import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatTitle = (title: string) =>
  title.trim().length
    ? title !== "⠀"
      ? title.length > 10
        ? title.slice(0, 7) + "..."
        : title
      : "unknown"
    : "unknown"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
