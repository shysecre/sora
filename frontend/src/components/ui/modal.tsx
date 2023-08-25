import { Dispatch, ReactNode, SetStateAction } from "react"

type Props = {
  children: ReactNode
  showModal: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ children, showModal }: Props) {
  return (
    <div
      className="absolute top-0 left-0 z-10 m-0 p-0 h-full w-full flex justify-center items-center"
      onClick={() => showModal(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
