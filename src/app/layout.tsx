import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetJetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rostislav Melkumyan - Growth engineer based in Oslo Norway",
  description: "Hey! I’m Rosti. I write code and make software go beep boop.",
  openGraph: {
    type: "website",
    url: "https://rosti.no",
    title: "Rostislav Melkumyan - Growth engineer based in Oslo Norway",
    description: "Hey! I’m Rosti. I write code and make software go beep boop.",
    images: [
      {
        url: "/seo-image.jpg",
        alt: "Rostislav Melkumyan - Growth engineer based in Oslo Norway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rostimelk",
    creator: "@rostimelk",
    title: "Rostislav Melkumyan - Growth engineer based in Oslo Norway",
    description: "Hey! I’m Rosti. I write code and make software go beep boop.",
    images: [
      {
        url: "/seo-image.jpg",
        alt: "Rostislav Melkumyan - Growth engineer based in Oslo Norway",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "152x152",
      },
    ],
    shortcut: [
      {
        url: "/favicons/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetJetBrains_Mono.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
