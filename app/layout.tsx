import "./globals.css";
import Nav from "./components/nav";
import VoteButton from "./components/vote-button";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html>
      <body className="flex h-[100svh] flex-col bg-[#282C33] text-[#C8CCD4]">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <div className="relative flex-1 overflow-x-auto pt-8">
            {children}
            <div className="gradient-blur translate-y-3">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <VoteButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "TAIVote",
  description: "Taiwan AI-policy Vote",
};
