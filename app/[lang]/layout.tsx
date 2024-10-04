import { i18n, type Locale } from "../../i18n-config";
import "./globals.css";
import Nav from "./components/nav";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className="bg-[#282C33] text-[#C8CCD4]">
        <Nav lang={params.lang} />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "TAIVote",
  description: "Taiwan AI-policy Vote",
};
