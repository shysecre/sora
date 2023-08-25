export const fallbackLng = "en";
export const languages = [fallbackLng, "ru"];

export function getOptions(lng: string = fallbackLng) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
  };
}
