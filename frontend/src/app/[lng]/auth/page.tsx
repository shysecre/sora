import AuthCompletion from "@/app/[lng]/auth/components/auth-completion";
import { serverTranslation } from "@/i18n/server";

type Props = {
  searchParams: {
    state: string;
    code: string;
  };
  params: {
    lng: string;
  };
};

export default async function Auth({ searchParams, params }: Props) {
  const { t } = await serverTranslation(params.lng)

  return (
    <div className="bg-dark-bg h-screen w-screen flex justify-center items-center">
      <p className="text-6xl">{t("auth.processing")}</p>
      <AuthCompletion {...searchParams} />
    </div>
  );
}
