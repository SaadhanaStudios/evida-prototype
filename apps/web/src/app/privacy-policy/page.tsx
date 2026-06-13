import type { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: "Privacy Policy | Evida",
  description: "Evida brings together your data, technology, and clinical expertise in a GP-led health check so that you can take action for a healthier you.",
}

export default function Page() {
  return <Content />
}
