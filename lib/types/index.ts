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
}
