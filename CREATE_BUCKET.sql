-- Create the 'project-logos' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-logos', 'project-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on objects (Usually already enabled, skipping to avoid permission errors)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public access to view logos (SELECT)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'project-logos' );

-- Allow authenticated users to upload logos (INSERT)
CREATE POLICY "Authenticated Users Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'project-logos' );

-- Allow users to update their own logos (UPDATE) - Optional, simpler to just allow all auth for now or restrict by owner matching user ID in filename
-- For simplicity in this demo, we'll allow authenticated users to update files in this bucket
CREATE POLICY "Authenticated Users Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'project-logos' );
