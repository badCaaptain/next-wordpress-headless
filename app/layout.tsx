import "./globals.css";
import { EB_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eb-garamond",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`main-body ${ebGaramond.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}