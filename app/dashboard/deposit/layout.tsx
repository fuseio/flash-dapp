import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deposit - Flash Dashboard',
  description: 'Deposit your tokens to your Flash saving account',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
