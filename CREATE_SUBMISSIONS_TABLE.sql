-- Create the 'bounty_submissions' table
CREATE TABLE IF NOT EXISTS public.bounty_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    bounty_id UUID NOT NULL REFERENCES public.bounties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT, -- Description, notes, etc.
    link TEXT, -- External link (Github, etc.)
    file_url TEXT, -- Uploaded file URL
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    earnings NUMERIC DEFAULT 0,
    rating NUMERIC DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.bounty_submissions ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Allow authenticated users to insert (Submit work)
CREATE POLICY "Allow Authenticated Insert Submissions"
ON public.bounty_submissions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Allow users to view their own submissions
CREATE POLICY "Allow Users View Own Submissions"
ON public.bounty_submissions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Allow Admins to view ALL submissions
CREATE POLICY "Allow Admins View All Submissions"
ON public.bounty_submissions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 4. Allow Admins to update submissions (Approve/Reject)
CREATE POLICY "Allow Admins Update Submissions"
ON public.bounty_submissions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- 5. Create storage bucket for submissions if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-files', 'submission-files', false) -- Private bucket, only accessible via signed URLs or RLS
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'submission-files'

-- Allow auth users to upload
CREATE POLICY "Allow Authenticated Upload Submission Files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'submission-files' AND auth.uid()::text = (storage.foldername(name))[1] );
-- Note: Folder structure convention: user_id/filename

-- Allow auth users to read their own files
CREATE POLICY "Allow Users Read Own Submission Files"
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'submission-files' AND auth.uid()::text = (storage.foldername(name))[1] );

-- Allow Admins to read all files
CREATE POLICY "Allow Admins Read All Submission Files"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'submission-files' 
    AND EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);
