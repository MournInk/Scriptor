import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scriptor - AI 协作平台",
  description: "一站式 AI 协作平台，集成 Markdown 编辑器与 AI 聊天功能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
