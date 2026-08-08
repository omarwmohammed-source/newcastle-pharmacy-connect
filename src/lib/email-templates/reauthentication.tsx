import * as React from 'react'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { defaultEmailSettings, fillTemplate, type AuthEmailSection } from '../email-settings-schema'

interface ReauthenticationEmailProps {
  token: string
  siteName?: string
  content?: Partial<Omit<AuthEmailSection, 'buttonText'>>
}

export const ReauthenticationEmail = ({
  token,
  siteName = 'Kenton Pharmacy Clinic',
  content,
}: ReauthenticationEmailProps) => {
  const c = { ...defaultEmailSettings.reauthentication, ...content }
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{fillTemplate(c.preview, { siteName })}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>{fillTemplate(c.intro, { siteName })}</Text>
          <Text style={codeStyle}>{token}</Text>
          <Text style={footer}>{c.footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "Georgia, 'EB Garamond', serif" }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#0f2340',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#3f4b5b',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#0f2340',
  margin: '0 0 30px',
}
const footer = { fontSize: '12px', color: '#7b8794', margin: '30px 0 0' }
