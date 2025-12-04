"use client";

import React from "react";
import Image from "next/image";
import { Search, MapPin, Clock, Users, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const categories = [
    { name: "Smart Contract Developer", count: 23 },
    { name: "UI/UX Designer", count: 8 },
    { name: "Marketing Manager", count: 17 },
    { name: "Product Manager", count: 3 },
    { name: "Business Development", count: 13 },
    { name: "DevOps Engineer", count: 20 },
];

const featuredCompanies = [
    { name: "CoinBase", positions: 12, logo: "CB" }, // Using text placeholder for logo if image not available
    { name: "Uniswap Lab", positions: 8, logo: "UL" },
    { name: "Aave", positions: 5, logo: "Aa" },
    { name: "Chainlink", positions: 7, logo: "CL" },
];

const trendingSkills = [
    "Solidity", "React", "TypeScript", "Web3.js", "DeFi", "NFTs", "Rust", "Go"
];

const jobs = [
    {
        id: 1,
        title: "Senior Smart Contract Developer",
        company: "Coinbase",
        logo: "CB", // Placeholder
        salary: "$180K - $250K",
        equity: "+ Equity & Benefits",
        location: "Remote",
        posted: "2 days ago",
        description: "We're looking for an experienced Smart Contract Developer to join our BASE ecosystem team. You'll be responsible for designing and implementing secure, scalable smart contracts that power next-generation DeFi applications.",
        tags: ["Solidity", "Hardhat", "DeFi", "Security Audits"],
        applicants: 24,
        closesIn: "3 days",
        color: "bg-blue-100 text-blue-600" // For logo placeholder
    },
    {
        id: 2,
        title: "Senior Product Designer",
        company: "Uniswap Labs",
        logo: "UL",
        salary: "$120K - $160K",
        equity: "+ Equity",
        location: "New York, NY",
        posted: "1 day ago",
        description: "Join our design team to create intuitive, beautiful interfaces for DeFi applications on BASE. You'll work closely with engineers and product managers to deliver exceptional user experiences.",
        tags: ["Figma", "UI/UX", "Design Systems", "Web3 UX"],
        applicants: 18,
        closesIn: "8 days",
        color: "bg-pink-100 text-pink-600"
    },
    {
        id: 3,
        title: "Growth Marketing Manager",
        company: "Aave",
        logo: "Aa",
        salary: "$90K - $130K",
        equity: "+ Token Allocation",
        location: "Remote",
        posted: "3 days ago",
        description: "Drive user acquisition and engagement for our DeFi protocol on BASE. You'll develop and execute marketing strategies to grow our user base and increase protocol adoption.",
        tags: ["Growth Hacking", "Analytics", "Community", "Content Marketing"],
        applicants: 42,
        closesIn: "5 days",
        color: "bg-purple-100 text-purple-600"
    }
];

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full">
                <Image
                    src="/images/jobsherobg.svg"
                    alt="Jobs Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl text-white">
                            <h1 className="text-5xl font-semibold mb-4 font-roboto leading-tight">
                                Find Your Next Web3 Career <br /> on <span className="text-[#EBB643]">BASE</span>
                            </h1>
                            <p className="text-lg mb-8 font-montserrat text-gray-200">
                                Discover exciting opportunities with leading Web3 companies building the future on BASE blockchain. From startups to established protocols, find your perfect match.
                            </p>
                            <div className="flex gap-4">
                                <Button className="bg-[#EBB643] hover:bg-[#d9a532] text-white font-medium px-8 py-6 rounded-full font-montserrat">
                                    Browse All Jobs
                                </Button>
                                <Button className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full font-montserrat">
                                    Post a Job
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search jobs, companies or keywords..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBB643] font-roboto"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {["Position Type", "Experience Level", "Salary Range", "Company Type", "Sort by Date"].map((filter) => (
                            <button key={filter} className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#EBB643] whitespace-nowrap font-roboto">
                                {filter} <ChevronDown size={14} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Job Categories */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">Job Categories</h3>
                            <ul className="space-y-3">
                                {categories.map((cat) => (
                                    <li key={cat.name} className="flex justify-between items-center text-sm group cursor-pointer">
                                        <span className="text-gray-600 group-hover:text-[#EBB643] transition-colors font-roboto">{cat.name}</span>
                                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium group-hover:bg-[#EBB643]/10 group-hover:text-[#EBB643] transition-colors">{cat.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Featured Companies */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">Featured Companies</h3>
                            <ul className="space-y-4">
                                {featuredCompanies.map((company) => (
                                    <li key={company.name} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {company.logo}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#EBB643] transition-colors font-montserrat">{company.name}</h4>
                                            <p className="text-xs text-gray-500 font-roboto">{company.positions} open positions</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Trending Skills */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">Trending Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {trendingSkills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-[#FFF9E6] text-[#B8860B] rounded-full text-xs font-medium border border-[#EBB643]/20 cursor-pointer hover:bg-[#EBB643] hover:text-white transition-colors font-roboto">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Job Feed */}
                    <div className="lg:col-span-3 space-y-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${job.color}`}>
                                            {job.logo}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 font-montserrat">{job.title}</h2>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 font-roboto">
                                                <span className="font-medium text-slate-700">{job.company}</span>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>Posted {job.posted}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-slate-900 font-montserrat">{job.salary}</div>
                                        <div className="text-xs text-gray-500 font-roboto">{job.equity}</div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 font-roboto leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium font-roboto">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-4">
                                    <div className="flex items-center gap-6 text-sm text-gray-500 font-roboto">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>{job.applicants} applicants</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>Closes in {job.closesIn}</span>
                                        </div>
                                    </div>
                                    <Button className="w-full md:w-auto bg-[#EBB643] hover:bg-[#d9a532] text-slate-900 font-medium px-8 rounded-full font-montserrat">
                                        Apply now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
