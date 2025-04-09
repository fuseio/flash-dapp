import type { Metadata } from "next";
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { cookieToInitialState } from 'wagmi'

import "./globals.css";
import { getConfig } from '@/lib/wagmi'
import { Providers } from '@/components/providers'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "@/lib/config";

const monaSans = localFont({
  src: './MonaSans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

export const metadata: Metadata = {
  title: "Flash",
  description: "Your crypto savings app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )

  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} antialiased dark`}
      >
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
      <GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
