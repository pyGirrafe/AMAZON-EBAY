import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon | Ebay Seller",
  description: "Auto-Order System in Amazon and Ebay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
