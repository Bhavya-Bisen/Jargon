import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalFooter } from "./ConditionalFooter";
import { DynamicBannerProvider } from "./DynamicBannerProvider"; 

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Indian Post",
  description: "Prototype for SIH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
        <DynamicBannerProvider>
        {children}
        </DynamicBannerProvider>
        <ConditionalFooter />
        </>
      </body>
    </html>
  );
}
