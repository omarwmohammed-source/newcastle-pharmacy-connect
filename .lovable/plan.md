# Regain admin access

## The situation

Three accounts can sign in to `/admin`, all with admin rights:

- habib@pharmacy-clinic.com (created 2 Aug)
- habib.jiwa2@nhs.net (created 8 Aug)
- omarwmohammed@gmail.com (created 8 Aug)

Passwords cannot be shown. They are stored as one-way hashes, so the original
text does not exist anywhere in the system and cannot be recovered by anyone,
including me. This is deliberate: it is what stops a leak from exposing access
to patient enquiry data.

The fix is to set new passwords, not to look up old ones.

## Option A — Set new passwords now (fastest)

You tell me a new password for each account you want to keep, and I set it
directly. You can sign in immediately afterwards and change it later.

- Applies to any or all three accounts
- No email required, works even if the inbox is unreachable
- Send the password through the secure secret form, not plain chat

## Option B — Add "Forgot password" to the staff sign-in page

A self-service reset you can use any time in future.

- Add a "Forgot password?" link on `/admin` that sends a reset email
- Add a `/reset-password` page where the new password is entered
- Uses the existing branded email setup on your domain
- Requires the account's inbox to be working (nhs.net and gmail are fine;
  habib@pharmacy-clinic.com depends on that mailbox being live)

## Recommendation

Do both: Option A to get you back in tonight, Option B so you never need to
ask me again.

## Technical notes

- Option A uses the privileged auth admin API to update the password hash for
  the named user; no schema change.
- Option B adds a public `/reset-password` route (outside the staff gate),
  calls `resetPasswordForEmail` with a redirect to that route, and completes
  with `updateUser({ password })` after the recovery link is followed.
- Sign-ups stay disabled; only the three existing accounts remain.
