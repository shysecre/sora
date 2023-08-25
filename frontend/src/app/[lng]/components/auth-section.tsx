"use client";

import Button from "@/components/ui/button";
import useClientTranslation from "@/hooks/useClientTranslation";
import { useGetAuthLinkMutation } from "@/store/api/auth/auth-slice.api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  lng: string;
};

export default function AuthSection({ lng }: Props) {
  const router = useRouter();
  const [getAuthLink] = useGetAuthLinkMutation();
  const [link, setLink] = useState<string>();
  const [state, setState] = useState<string>();

  const [t] = useClientTranslation();

  const getAuthUrl = async () => {
    const data = await getAuthLink({ lng }).unwrap();

    setLink(data.link);
    setState(data.state);
  };

  useEffect(() => {
    if (!link || !state) return;

    localStorage.setItem("authState", state);

    router.replace(link);
  }, [link, state, router]);

  return (
    <Button
      onClick={getAuthUrl}
      className=" border-b-white border-opacity-50 border-b-2 bg-less-dark rounded-lg pl-6 pr-6 h-[40px]"
      icon={{
        src: "/../public/twitch.png",
        height: 20,
        width: 20,
      }}
    >
      {t("root.auth_button_text")}
    </Button>
  );
}
