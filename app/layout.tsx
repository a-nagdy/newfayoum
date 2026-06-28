import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cairo.variable} h-full bg-white antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
