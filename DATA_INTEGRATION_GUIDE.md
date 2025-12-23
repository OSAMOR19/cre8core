# Database Schema Setup for Real-Time Data

To enable real-time data fetching for **Jobs** and **Bounties**, please run the following SQL query in your Supabase Dashboard **SQL Editor**.

## 1. Create Tables

```sql
-- Create Jobs Table
CREATE TABLE public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    logo_url TEXT, -- URL or initial like 'CB'
    salary_range TEXT NOT NULL, -- e.g. '$180K - $250K'
    equity TEXT, -- e.g. '+ Equity & Benefits'
    location TEXT DEFAULT 'Remote',
    description TEXT,
    tags TEXT[], -- Array of strings e.g. ['Solidity', 'DeFi']
    applicants_count INTEGER DEFAULT 0,
    closes_in TEXT, -- e.g. '3 days' or maybe use a specific date
    color_theme TEXT, -- e.g. 'bg-blue-100 text-blue-600'
    featured BOOLEAN DEFAULT false
);

-- Create Bounties Table
CREATE TABLE public.bounties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. 'Video', 'Meme', 'Development'
    sponsor TEXT DEFAULT 'BASE',
    prize_pool TEXT NOT NULL, -- e.g. '5000 USDC'
    deadline DATE,
    winners_count INTEGER DEFAULT 1,
    description TEXT,
    status TEXT DEFAULT 'Open' -- 'Open', 'Closed', 'In Progress'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read Access)
CREATE POLICY "Allow public read access" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.bounties FOR SELECT USING (true);
```

## 2. Seed Sample Data (Optional)

Run this to populate initial mock data similar to what you had.

```sql
-- Insert Jobs
INSERT INTO public.jobs (title, company, logo_url, salary_range, equity, location, description, tags, applicants_count, closes_in, color_theme)
VALUES
('Senior Smart Contract Developer', 'Coinbase', 'CB', '$180K - $250K', '+ Equity & Benefits', 'Remote', 'Responsible for designing and implementing secure, scalable smart contracts.', ARRAY['Solidity', 'Hardhat', 'DeFi', 'Security Audits'], 24, '3 days', 'bg-blue-100 text-blue-600'),
('Senior Product Designer', 'Uniswap Labs', 'UL', '$120K - $160K', '+ Equity', 'New York, NY', 'Create intuitive, beautiful interfaces for DeFi applications.', ARRAY['Figma', 'UI/UX', 'Design Systems', 'Web3 UX'], 18, '8 days', 'bg-pink-100 text-pink-600'),
('Growth Marketing Manager', 'Aave', 'Aa', '$90K - $130K', '+ Token Allocation', 'Remote', 'Drive user acquisition and engagement for our DeFi protocol.', ARRAY['Growth Hacking', 'Analytics', 'Community', 'Content Marketing'], 42, '5 days', 'bg-purple-100 text-purple-600');

-- Insert Bounties
INSERT INTO public.bounties (title, category, sponsor, prize_pool, description, deadline)
VALUES
('Audit & Optimize Lending Protocol Contracts', 'Development', 'BASE', '5000 USDC', 'Security audit and gas optimization for our lending protocol smart contracts.', '2025-12-15'),
('Create a Promo Video', 'Video', 'BASE', '1000 USDC', 'Create a 1 minute promotional video.', '2025-01-20'),
('Design a Meme', 'Meme', 'BASE', '500 USDC', 'Funny meme about Base.', '2025-01-10');
```
