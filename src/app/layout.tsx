import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "湖南人北京生存指南",
  description: "一个岳阳伢子的北漂笔记——从洞庭湖到未名湖，从岳阳楼到博雅塔",
  keywords: ["北京", "湖南", "生存指南", "北漂", "北京大学", "岳阳"],
  openGraph: {
    title: "湖南人北京生存指南",
    description: "一个岳阳伢子的北漂笔记",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;600;700&family=ZCOOL+XiaoWei&family=Ma+Shan+Zheng&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
