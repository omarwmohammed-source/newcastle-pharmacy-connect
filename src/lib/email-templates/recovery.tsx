import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { defaultEmailSettings, fillTemplate, type AuthEmailSection } from '../email-settings-schema'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
  content?: Partial<AuthEmailSection>
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
  content,
}: RecoveryEmailProps) => {
  const c = { ...defaultEmailSettings.recovery, ...content }
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{fillTemplate(c.preview, { siteName })}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{c.heading}</Heading>
          <Text style={text}>{fillTemplate(c.intro, { siteName })}</Text>
          <Button style={button} href={confirmationUrl}>
            {c.buttonText}
          </Button>
          <Text style={footer}>{c.footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default RecoveryEmail

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
