import "./globals.css";
import { EB_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMenuByLocation } from "@/lib/wordpress";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eb-garamond",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuByLocation("main-menu");

  return (
    <html lang="en">
      <body className={`main-body ${ebGaramond.variable}`}>
        <Header menuItems={menuItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}