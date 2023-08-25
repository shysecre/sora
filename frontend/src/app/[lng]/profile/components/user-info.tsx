"use client"

import { useGetUserMutation } from "@/store/api/user/user-slice-api"
import { selectUser, setUser } from "@/store/store/features/user/user-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import Image from "next/image"
import { useEffect } from "react"

export default function UserInfo() {
  const [getUser] = useGetUserMutation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    async function fetchUser() {
      const payload = await getUser().unwrap()

      if (payload) {
        dispatch(setUser(payload))
      }
    }

    fetchUser()
  }, [getUser, dispatch])

  return (
    <div className="bg-dark-bg flex justify-center items-center flex-col text-sm h-14 absolute top-0 left-0 mt-6 ml-6">
      {user.id && (
        <div className="flex gap-2">
          {user.twitchImage && (
            <Image
              src={user.twitchImage}
              alt="Profile pic"
              width={56}
              height={56}
              className="rounded-lg"
            />
          )}
          <div className="flex flex-col justify-center">
            <div className="flex">
              <Image
                src="/../public/twitch.png"
                alt="Twitch Icon"
                height={20}
                width={20}
                className="h-5 w-5"
              />
              <p className="pl-1">{user.twitchName}</p>
            </div>
            <p className="text-zinc-400 text-xs">{`< ${user.id || ""} />`}</p>
          </div>
        </div>
      )}
    </div>
  )
}
