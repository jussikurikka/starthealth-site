# Make the contact form actually deliver messages

Today the form on the front page shows "message sent" but the data is thrown away — nobody receives it. Two other findings (dead links to deleted pricing/Tampere/costs pages) are already fixed.

## What to build

1. **Store every submission** in a new `contact_submissions` table in the backend (name, email, company, message, created_at). Public visitors may insert; only signed-in staff can read. This guarantees no lead is ever lost even if email fails.
2. **Send an email notification** to jussikurikka@starthealth.fi for each submission, via a backend function using Resend.
3. **Update the form** (`src/components/ContactForm.tsx`) to call that function, show a real error toast when sending fails, and only show the success message on actual success.

## What is needed from you

Email sending requires an email setup: either a Resend API key you provide, or setting up sending from a verified starthealth.fi domain. Confirm which you prefer — until then the function can be built to store submissions and notify once email is configured.

## Technical notes

- Migration: `create table public.contact_submissions`, GRANT insert to anon/authenticated, GRANT all to service_role, RLS enabled with an insert-only policy for anon and a select policy for authenticated staff.
- Edge function `send-contact` (public, verify_jwt off): validates payload, inserts via service role, sends email through Resend, returns JSON status.
- Client uses `supabase.functions.invoke('send-contact', ...)` with loading and error states.
