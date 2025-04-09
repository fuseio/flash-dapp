import type { Metadata } from "next";
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";
import { Providers } from '@/components/providers'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "@/lib/config";
import Navbar from "@/components/Navbar";

const monaSans = localFont({
  src: './MonaSans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

export const metadata: Metadata = {
  title: "Flash",
  description: "Your crypto savings app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.className} antialiased dark`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
      <GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
