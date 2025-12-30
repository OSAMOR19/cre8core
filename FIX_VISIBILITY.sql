-- Enable Read Access for All Users on Bounties Table
-- Run this in your Supabase SQL Editor to ensure bounties are visible to everyone

-- 1. Enable RLS (if not already enabled)
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;

-- 2. Create Policy for Select (Public Read)
-- This allows anyone (even non-logged in users) to see bounties.
CREATE POLICY "Allow Public Read Access on Bounties"
ON bounties
FOR SELECT
USING (true);

-- 3. (Optional) If you want to restrict non-admins to only see 'Open' bounties:
-- DROP POLICY IF EXISTS "Allow Public Read Access on Bounties" ON bounties;
-- CREATE POLICY "Allow Public Read Access on Bounties"
-- ON bounties
-- FOR SELECT
-- USING (status = 'Open');
