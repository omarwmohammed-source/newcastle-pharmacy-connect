CREATE TABLE public.custom_email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  preview TEXT NOT NULL DEFAULT '',
  heading TEXT NOT NULL DEFAULT '',
  subheading TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  closing TEXT NOT NULL DEFAULT '',
  button_text TEXT NOT NULL DEFAULT '',
  button_url TEXT NOT NULL DEFAULT '',
  footer TEXT NOT NULL DEFAULT '',
  design JSONB NOT NULL DEFAULT '{}'::jsonb,
  placeholders JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_email_templates TO authenticated;
GRANT ALL ON public.custom_email_templates TO service_role;

ALTER TABLE public.custom_email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage custom email templates"
ON public.custom_email_templates
FOR ALL
TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));

CREATE TRIGGER custom_email_templates_set_updated_at
BEFORE UPDATE ON public.custom_email_templates
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();