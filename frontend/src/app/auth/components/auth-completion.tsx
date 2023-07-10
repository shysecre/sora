"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  state: string;
  code: string;
};

export default function AuthCompletion({ code, state }: Props) {
  const router = useRouter();

  const processAuth = async (code: string) => {
    try {
      const response = await fetch(
        `http://localhost:443/api/auth/success?code=${code}`,
        { cache: "no-store" }
      );

      const data = await response.json();

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
  });

  return <></>;
}
