import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { NotyfProvider } from "../components/NotyfProvider";
import PWAHandler from "./PWAHandler";

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PWAHandler />
      <NotyfProvider>{children}</NotyfProvider>
    </NextIntlClientProvider>
  );
}
