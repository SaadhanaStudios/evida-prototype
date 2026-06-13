import type { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: "Membership — Evida",
  description: "The Evida Membership: £320/year. Comprehensive baseline blood panel, a 45-minute GP consultation, a personalised prevention plan, and a full year of support.",
}

export default function Page() {
  return <Content />
}
