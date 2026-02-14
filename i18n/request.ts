import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

const messageLoaders = {
  bn: () => import("../messages/bn.json"),
  en: () => import("../messages/en.json")
};

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await messageLoaders[locale as "bn" | "en"]()).default
  };
});
