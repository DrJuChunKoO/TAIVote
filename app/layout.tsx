import "./globals.css";
import Nav from "./components/nav";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import SessionProvider from "./components/session-provider";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html>
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className="flex h-[100svh] flex-col bg-[#282C33] text-[#C8CCD4]">
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <Nav />
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "TAIVote",
  description: "Taiwan AI-policy Vote",
};
