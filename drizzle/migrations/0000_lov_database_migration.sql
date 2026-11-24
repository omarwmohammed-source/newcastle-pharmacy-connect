ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS branch text NOT NULL DEFAULT 'kenton';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'enquiries_branch_check'
  ) THEN
    ALTER TABLE public.enquiries
      ADD CONSTRAINT enquiries_branch_check CHECK (branch IN ('kenton', 'chillingham-road'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS enquiries_branch_idx ON public.enquiries (branch);