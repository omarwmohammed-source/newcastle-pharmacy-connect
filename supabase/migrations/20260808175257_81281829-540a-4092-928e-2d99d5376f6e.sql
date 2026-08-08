CREATE TABLE public.email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  settings_key text NOT NULL UNIQUE DEFAULT 'default',
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.email_settings TO authenticated;
GRANT ALL ON public.email_settings TO service_role;

ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read email settings"
ON public.email_settings
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update email settings"
ON public.email_settings
FOR UPDATE
TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can insert email settings"
ON public.email_settings
FOR INSERT
TO authenticated
WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER email_settings_set_updated_at
BEFORE UPDATE ON public.email_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();