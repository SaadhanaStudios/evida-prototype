import type { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: "Evida — Archive",
  description: "Archived homepage sections, kept for reference.",
}

export default function Page() {
  return <Content />
}
