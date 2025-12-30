# Admin Portal Guide

## Overview
The Admin Portal allows designated administrators to review, approve, or reject user-submitted bounties before they appear live on the Cre8Core platform.

## How to Access
1. **Log In**: Sign in to your Cre8Core account.
2. **Open Menu**: Click your **Profile Avatar** in the top right corner of the website.
3. **Select Admin Portal**: If you have admin privileges, you will see a gold-colored **"Admin Portal"** link in the dropdown menu. Click it.

## Managing Bounties
In the Admin Portal, you will see a list of all "Pending" bounties.
- **Review**: Check the details, image, and description.
- **Approve**: Click the green **Approve** button to make the bounty live immediately on the Bounties page.
- **Reject**: Click the red **Reject** button to remove the bounty if it violates guidelines (this will set the status to 'rejected').

## How to Grant Admin Access
To make a user an Admin, you must update their record in the database.

1. Go to your **Supabase Dashboard**.
2. Open the **SQL Editor**.
3. Run the following command (replace the email with the admin's email):

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'cre8corelabs@gmail.com'
);
```

**Note:** Only users with the `role` set to `'admin'` can see or access the portal. attempting to visit the URL directly will redirect non-admins to the home page.
