-- FIX ADMIN PERMISSIONS & RLS POLICIES
-- Run this entire script in the Supabase SQL Editor

-- 1. Ensure RLS is enabled
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow Public Read Access on Bounties" ON bounties;
DROP POLICY IF EXISTS "Allow Authenticated Insert" ON bounties;
DROP POLICY IF EXISTS "Allow Admin Update" ON bounties;
DROP POLICY IF EXISTS "Allow Admin Delete" ON bounties;

-- 3. Create permissive policies

-- READ: Everyone can see bounties (filtered by status in frontend)
CREATE POLICY "Allow Public Read Access on Bounties"
ON bounties FOR SELECT
USING (true);

-- INSERT: Authenticated users can post bounties
CREATE POLICY "Allow Authenticated Insert"
ON bounties FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE: Admins can update ANY bounty
CREATE POLICY "Allow Admin Update"
ON bounties FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- DELETE: Admins can delete ANY bounty
CREATE POLICY "Allow Admin Delete"
ON bounties FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 4. Ensure Profile Policies allow Admins to read roles
-- (Sometimes admin check fails because user can't read their own profile role)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

-- 5. Force Update your User to Admin (Just in case)
-- Replace with your actual User ID if known, or email
UPDATE profiles
SET role = 'admin'
WHERE id = auth.uid(); 
-- Note: The line above only works if you run it as the user in SQL editor, 
-- but usually you need to target a specific email.
-- Let's try to target the most likely admin user if they are logged in context, 
-- or you can manually run: UPDATE profiles SET role = 'admin' WHERE email = 'YOUR_EMAIL';

