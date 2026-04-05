import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "AffiDash — 聯盟行銷連結管理儀表板",
  description:
    "管理所有導購連結、追蹤點擊、AI生成比較表。專為台灣聯盟行銷者打造。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://patrol-bot.vercel.app/widget.js"
          data-project="affidash"
          data-color="#f97316"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
