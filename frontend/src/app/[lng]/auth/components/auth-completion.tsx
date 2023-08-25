"use client";

import { useAuthUserWithCodeMutation } from "@/store/api/auth/auth-slice.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  state: string;
  code: string;
};

export default function AuthCompletion({ code, state }: Props) {
  const router = useRouter();
  const [authUserWithCode] = useAuthUserWithCodeMutation();

  const processAuth = async (code: string) => {
    try {
      const data = await authUserWithCode({ code }).unwrap();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      localStorage.removeItem("authState");

      router.replace("/profile");
    } catch (err) {
      router.replace("/");
    }
  };

  useEffect(() => {
    const localState = localStorage.getItem("authState");

    if (localState !== state) {
      localStorage.removeItem("authState");

      router.replace("/");
    } else {
      processAuth(code);
    }
  }, []);

  return <></>;
}
