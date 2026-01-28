-- 1) Create admin table (if not exists)
CREATE TABLE IF NOT EXISTS public.bounties_admins (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- CRITICAL: Enable Row Level Security
ALTER TABLE public.bounties_admins ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own entry (prevents leaking admin emails)
-- This allows the frontend check: .eq("email", user.email) to work.
CREATE POLICY "Users can check their own admin status"
ON public.bounties_admins
FOR SELECT
TO authenticated
USING (email = (auth.jwt() ->> 'email'));

-- 2) Insert admin emails (edit as needed)
INSERT INTO public.bounties_admins (email) VALUES
  ('soyijo1017@arugy.com'),
  ('godstimechukwuluna@gmail.com'),
  ('isaacchukwuka67@gmail.com'),
  ('admin4@example.com')
ON CONFLICT (email) DO NOTHING;

-- 3) Drop existing policies on bounties to avoid conflicts
DROP POLICY IF EXISTS "Allow Public Read Access on Bounties" ON public.bounties;
DROP POLICY IF EXISTS "Allow admins full access to bounties" ON public.bounties;
DROP POLICY IF EXISTS "Authenticated users can read bounties" ON public.bounties;

-- 4) Create admin policy (full access)
CREATE POLICY "Allow admins full access to bounties"
ON public.bounties
FOR ALL
TO authenticated
USING (
  -- Allow if user is in bounties_admins
  EXISTS (
    SELECT 1
    FROM public.bounties_admins a
    WHERE a.email = (auth.jwt() ->> 'email')
  )
  -- OR if user has admin role in profiles (optional, for backward compatibility)
  OR EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.bounties_admins a
    WHERE a.email = (auth.jwt() ->> 'email')
  )
  OR EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- 5) Optional: allow authenticated users to read bounties
CREATE POLICY "Authenticated users can read bounties"
ON public.bounties
FOR SELECT
TO authenticated
USING (true);
