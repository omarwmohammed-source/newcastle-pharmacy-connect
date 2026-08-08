import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import { defaultEmailSettings, fillTemplate, type AuthEmailSection } from '../email-settings-schema'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
  content?: Partial<AuthEmailSection>
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
  content,
}: InviteEmailProps) => {
  const c = { ...defaultEmailSettings.invite, ...content }
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{fillTemplate(c.preview, { siteName })}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>
            {fillTemplate(c.intro, { siteName, siteUrl })}
          </Text>
          <Button style={button} href={confirmationUrl}>
            {c.buttonText}
          </Button>
          <Text style={footer}>{c.footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InviteEmail

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
const link = { color: 'inherit', textDecoration: 'underline' }
const button = {
  backgroundColor: '#0f2340',
  color: '#ffffff',
  fontWeight: 'bold' as const,
  fontSize: '14px',
  borderRadius: '6px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#7b8794', margin: '30px 0 0' }
