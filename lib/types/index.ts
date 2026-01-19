export interface Job {
    id: string; // UUID
    created_at: string;
    title: string;
    company: string;
    logo_url: string;
    salary_range: string;
    equity: string;
    location: string;
    description: string;
    tags: string[];
    applicants_count: number;
    closes_in: string;
    color_theme: string;
    featured?: boolean;
}

export interface Bounty {
    id: string;
    created_at: string;
    title: string;
    category: string;
    sponsor: string;
    prize_pool: string;
    deadline: string;
    winners_count: number;
    description: string;
    status: string;
    image_url?: string;
}

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    avatar_url?: string;
    website?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    role?: 'user' | 'admin' | 'project';
    email?: string;
}

export interface BountySubmission {
    id: string;
    created_at: string;
    bounty_id: string;
    user_id: string;
    content?: string;
    link?: string;
    file_url?: string;
    status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'rejected';
    submitted_at?: string;
    earnings?: number; // Amount earned if approved
    rating?: number; // 1-5 rating if approved

    // Joined fields (optional, populated after fetch)
    bounty?: Bounty;
}
