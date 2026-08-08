import * as React from 'react'
import { createAuthEmailHandler } from '@lovable.dev/email-js'
import { createFileRoute } from '@tanstack/react-router'
import { SignupEmail } from '@/lib/email-templates/signup'
import { InviteEmail } from '@/lib/email-templates/invite'
import { MagicLinkEmail } from '@/lib/email-templates/magic-link'
import { RecoveryEmail } from '@/lib/email-templates/recovery'
import { EmailChangeEmail } from '@/lib/email-templates/email-change'
import { ReauthenticationEmail } from '@/lib/email-templates/reauthentication'
import { getEmailSettingsForSending } from '@/lib/email-settings-loader'

// Configuration
const SITE_NAME = "Kenton Pharmacy Clinic"
const SENDER_DOMAIN = "notify.pharmacy-clinic.com"
const ROOT_DOMAIN = "pharmacy-clinic.com"
const FROM_DOMAIN = "notify.pharmacy-clinic.com"
const SITE_URL = `https://${ROOT_DOMAIN}`

// The SDK handler owns verification, dispatch, and retry semantics; this file
// owns only the email decisions: subjects, templates, and per-type props.
const handler = createAuthEmailHandler({
  apiKey: process.env['LOVABLE_API_KEY']!,
  from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
  senderDomain: SENDER_DOMAIN,
  sendUrl: process.env['LOVABLE_SEND_URL'],
  emails: {
    signup: {
      subject: async () => (await getEmailSettingsForSending()).signup.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(SignupEmail, {
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
          recipient: data.email,
          confirmationUrl: data.url,
          content: settings.signup,
        })
      },
    },
    invite: {
      subject: async () => (await getEmailSettingsForSending()).invite.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(InviteEmail, {
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
          confirmationUrl: data.url,
          content: settings.invite,
        })
      },
    },
    magiclink: {
      subject: async () => (await getEmailSettingsForSending()).magiclink.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(MagicLinkEmail, {
          siteName: SITE_NAME,
          confirmationUrl: data.url,
          content: settings.magiclink,
        })
      },
    },
    recovery: {
      subject: async () => (await getEmailSettingsForSending()).recovery.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(RecoveryEmail, {
          siteName: SITE_NAME,
          confirmationUrl: data.url,
          content: settings.recovery,
        })
      },
    },
    email_change: {
      subject: async () => (await getEmailSettingsForSending()).emailChange.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(EmailChangeEmail, {
          siteName: SITE_NAME,
          oldEmail: data.old_email ?? '',
          email: data.email,
          newEmail: data.new_email ?? '',
          confirmationUrl: data.url,
          content: settings.emailChange,
        })
      },
    },
    reauthentication: {
      subject: async () => (await getEmailSettingsForSending()).reauthentication.subject,
      render: async (data) => {
        const settings = await getEmailSettingsForSending()
        return React.createElement(ReauthenticationEmail, {
          token: data.token ?? '',
          siteName: SITE_NAME,
          content: settings.reauthentication,
        })
      },
    },
  },
})

export const Route = createFileRoute("/lovable/email/auth/webhook")({
  server: {
    handlers: {
      POST: ({ request }) => handler(request),
    },
  },
})
