import type { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Messaging Review — Evida Internal',
  description: 'Internal copy review page. Not indexed.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Content />
}
