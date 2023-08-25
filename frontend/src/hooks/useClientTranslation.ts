import { clientTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";

export default function useClientTranslation() {
  const params = useParams();

  return clientTranslation(params.lng);
}
