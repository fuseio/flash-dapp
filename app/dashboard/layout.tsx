import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Flash',
  description: 'Get details about your Flash saving account',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
