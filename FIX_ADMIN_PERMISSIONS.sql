-- CRITICAL: Run this entire script to fix Admin actions and visibility

-- 1. Enable RLS (if not already enabled)
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;

-- 2. Allow Public Read Access (so everyone can see the bounties)
DROP POLICY IF EXISTS "Allow Public Read Access on Bounties" ON bounties;
CREATE POLICY "Allow Public Read Access on Bounties"
ON bounties FOR SELECT
USING (true);

-- 3. Allow Authenticated Users to Insert (Post Bounties)
DROP POLICY IF EXISTS "Allow Authenticated Insert" ON bounties;
CREATE POLICY "Allow Authenticated Insert"
ON bounties FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Allow Admins to UPDATE (Approve/Reject)
-- This checks the 'profiles' table to see if the user is an 'admin'
DROP POLICY IF EXISTS "Allow Admin Update" ON bounties;
CREATE POLICY "Allow Admin Update"
ON bounties FOR UPDATE
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- 5. Allow Admins to DELETE
DROP POLICY IF EXISTS "Allow Admin Delete" ON bounties;
CREATE POLICY "Allow Admin Delete"
ON bounties FOR DELETE
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'admin'
  )
);

-- 6. Add your additional admin (Replace email if needed)
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'soyijo1017@arugy.com'
);
