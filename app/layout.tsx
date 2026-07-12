import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cairo } from "next/font/google";
import { getGoogleSiteVerification } from "@/lib/tracking/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const googleVerification = getGoogleSiteVerification();

export const metadata: Metadata = {
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

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
