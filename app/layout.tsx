import "./globals.css";
import type { Viewport, Metadata } from "next";
import Nav from "./components/nav";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AutoSetLang from "./components/auto-set-lang";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+TC:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex h-[100svh] flex-col bg-[#282C33] font-sans text-[#C8CCD4]">
        <NextIntlClientProvider messages={messages}>
          <AutoSetLang>
            <Nav />
            {children}
          </AutoSetLang>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: "TAIVote",
  description: "Taiwan AI-policy Vote",
  openGraph: {
    title: "TAIVote",
    description: "Taiwan AI-policy Vote",
    url: "https://taivote.juchunko.com/",
    images: [
      {
        url: "https://taivote.juchunko.com/images/og.jpeg",
        width: 3840,
        height: 2160,
        alt: "TAIVote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAIVote",
    description: "Taiwan AI-policy Vote",
    images: [
      {
        url: "https://taivote.juchunko.com/images/og.jpeg",
        width: 3840,
        height: 2160,
        alt: "TAIVote",
      },
    ],
  },
};
export const viewport: Viewport = {
  themeColor: "#252930",
};
