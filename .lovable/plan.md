# Footer credit + AI contact modal

Add a discreet "built by Omar" credit at the very bottom of every page, with a punchy CTA that opens a contact modal — small enough that it never competes with the pharmacy content.

## Footer credit line

Sits below the existing copyright line, in small muted text, centred:

> This website was built by Omar — I help small businesses use AI to save time and money. **Currently building free pilots →**

The bold part is the clickable trigger (a subtle link-style button in the gold accent colour, not a big button).

## Contact modal content

Title: **AI that actually saves you time**

Body:
- Short paragraph: Omar works with small businesses to integrate AI and build simple, practical tools — booking forms, admin automation, websites like this one — without the jargon or the enterprise price tag.
- Second line: he's currently taking on a limited number of projects **free of charge** while building up case studies, so the only cost is a conversation.
- Contact block with two clear actions:
  - Email: omarwmohammed@gmail.com (mailto link)
  - Phone / WhatsApp: +44 7392 688684 (tel link)

Closing nudge: "No pitch, no obligation — just tell me what's eating your time."

## Technical details

- New `src/components/site/BuiltByOmar.tsx` — shadcn `Dialog` with the trigger rendered as a text link, using existing design tokens (muted text, `text-accent` for the trigger). No new colours or fonts.
- Rendered once inside `src/components/site/Footer.tsx`, appended after the copyright line, so it appears on every route automatically.
- Email/phone use `mailto:` and `tel:` links; no form, no backend, no new data collection (keeps the privacy notice accurate).
