import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Dashboard - Flash',
  description: 'Get details about your Flash saving account',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
