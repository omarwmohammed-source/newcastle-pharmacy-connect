import type { ComponentType } from 'react'
import type { EmailSettings } from '../email-settings-schema'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>, settings?: EmailSettings) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as newEnquiryTemplate } from './new-enquiry'
import { template as enquiryConfirmationTemplate } from './enquiry-confirmation'

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'new-enquiry': newEnquiryTemplate,
  'enquiry-confirmation': enquiryConfirmationTemplate,
}
