"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RxRocket } from "react-icons/rx";
import FutureOfWeb3 from "@/components/common/Section/FutureOfWeb3";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Job } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

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
  { name: "CoinBase", positions: 12, logo: "/images/token-branded_coinbase.svg" },
  { name: "Uniswap Lab", positions: 8, logo: "/images/uni.svg" },
  { name: "Aave", positions: 5, logo: "/images/01.svg" },
  { name: "Chainlink", positions: 7, logo: "/icons/chainlinkicon.svg" },
];

const trendingSkills = [
  "Solidity",
  "React",
  "TypeScript",
  "Web3.js",
  "DeFi",
  "NFTs",
  "Rust",
  "Go",
];

const opportunities = [
  {
    JobTitle: "Lead Blockchain Engineer",
    title: "BaseFi Protocol",
    range: "$200k-$280k",
    description: "Remote Senior Level",
    color: "bg-[#1C47A2]",
    logo: "/images/token-branded_coinbase.svg"
  },
  {
    JobTitle: "Head of Design",
    title: "BASE Labs",
    range: "$160K - $220K",
    description: "San Francisco • Lead Level",
    color: "bg-[#8A38F5]",
    logo: "/images/uni.svg" // Using Uniswap as an example or placeholder
  },
  {
    JobTitle: "Community Manager",
    title: "BASE Ecosystem",
    range: "$70K - $100K",
    description: "Remote Mid Level",
    color: "bg-[#9B6A00]",
    logo: "/images/01.svg" // Placeholder
  },
];

const companyLogos = [
  "/images/01.svg",
  "/images/02.svg",
  "/images/03.svg",
  "/images/04.svg",
  "/images/05.svg",
  "/images/06.svg",
];

function JobCard({
  JobTitle,
  title,
  range,
  description,
  color,
  logo
}: {
  JobTitle: string;
  title: string;
  range: string;
  description: string;
  color: string;
  logo?: string;
}) {
  return (
    <div className="min-h-[239px] bg-[#F7F8FB] justify-around flex flex-col p-4 rounded-lg">
      <div className="flex gap-3 items-center">
        <span
          className={`${color || 'bg-blue-500'} p-3 flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shrink-0 ${logo ? 'bg-white border border-gray-100 p-0' : ''}`}
        >
          {logo ? (
            <img src={logo} alt={title} className="w-full h-full object-contain p-2" />
          ) : (
            <RxRocket color="white" size={24} />
          )}
        </span>{" "}
        <span>
          <p className="font-semibold font-nunito">{JobTitle}</p>
          <p className="font-montserrat text-sm">{title}</p>
        </span>
      </div>
      <div>
        <p className="font-nunito font-semibold mb-1">{range}</p>
        <p className="font-montserrat text-sm text-[#030406B8]">
          {description}
        </p>
      </div>
      <Button className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 py-5 text-white rounded-2xl">
        View Details
      </Button>
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function JobsPage() {
  const router = useRouter();
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data in case DB is empty or not connected yet, to avoid broken UI in demo
  const fallbackJobs: Job[] = [
    {
      id: "1",
      created_at: new Date().toISOString(),
      title: "Senior Smart Contract Developer",
      company: "Coinbase",
      logo_url: "/images/token-branded_coinbase.svg",
      salary_range: "$180K - $250K",
      equity: "+ Equity & Benefits",
      location: "Remote",
      description: "We're looking for an experienced Smart Contract Developer...",
      tags: ["Solidity", "Hardhat", "DeFi", "Security Audits"],
      applicants_count: 24,
      closes_in: "3 days",
      color_theme: "bg-blue-100 text-blue-600"
    },
    {
      id: "2",
      created_at: new Date().toISOString(),
      title: "Senior Product Designer",
      company: "Uniswap Labs",
      logo_url: "/images/uni.svg",
      salary_range: "$120K - $160K",
      equity: "+ Equity",
      location: "New York, NY",
      description: "Join our design team to create intuitive, beautiful interfaces...",
      tags: ["Figma", "UI/UX", "Design Systems", "Web3 UX"],
      applicants_count: 18,
      closes_in: "8 days",
      color_theme: "bg-pink-100 text-pink-600"
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching jobs:", error);
          // If error (e.g. table doesn't exist yet), use fallback
          setJobsList(fallbackJobs);
        } else {
          // Use DB data if success, even if empty
          setJobsList(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setJobsList(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // specific subscription for jobs table
    const channel = supabase
      .channel("jobs-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "jobs",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setJobsList((prev) => [payload.new as Job, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setJobsList((prev) => prev.map(j => j.id === payload.new.id ? payload.new as Job : j));
          } else if (payload.eventType === "DELETE") {
            setJobsList((prev) => prev.filter(j => j.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getTimeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <div className="container mx-auto rounded-2xl border overflow-hidden mt-10 relative min-h-[450px] w-full">
        <Image
          src="/images/jobsherobg.svg"
          alt="Jobs Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-5xl text-white"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl font-semibold mb-4 font-roboto leading-tight"
              >
                Find Your Next Web3 Career <br /> on{" "}
                <span className="text-[#EBB643]">BASE</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg mb-8 font-montserrat text-gray-200"
              >
                Discover exciting opportunities with leading Web3 companies
                building the future on BASE blockchain. From startups to
                established protocols, find your perfect match.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-4">
                <Button className="bg-[#EBB643] hover:bg-[#d9a532] text-white font-medium px-8 py-6 rounded-full font-montserrat">
                  Browse All Jobs
                </Button>
                <Button
                  onClick={() => router.push("/jobs/create")}
                  className="bg-transparent border border-white text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full font-montserrat"
                >
                  Post a Job
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 mb-10 relative z-10">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative grow">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs, companies or keywords..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBB643] font-roboto"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              "Position Type",
              "Experience Level",
              "Salary Range",
              "Company Type",
              "Sort by Date",
            ].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#EBB643] whitespace-nowrap font-roboto"
              >
                {filter} <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Job Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">
                Job Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <motion.li
                    whileHover={{ x: 5 }}
                    key={cat.name}
                    className="flex justify-between items-center text-sm group cursor-pointer"
                  >
                    <span className="text-gray-600 group-hover:text-[#EBB643] transition-colors font-roboto">
                      {cat.name}
                    </span>
                    <span className="bg-gray-100 w-8 h-8 flex items-center justify-center text-gray-500 rounded-full text-xs font-medium group-hover:bg-[#EBB643]/10 group-hover:text-[#EBB643] transition-colors">
                      {cat.count}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Featured Companies */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">
                Featured Companies
              </h3>
              <ul className="space-y-4">
                {featuredCompanies.map((company) => (
                  <motion.li
                    whileHover={{ x: 5 }}
                    key={company.name}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center text-blue-600 font-bold text-xs overflow-hidden">
                      {company.logo.startsWith("/") || company.logo.startsWith("http") ? (
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        company.logo
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#EBB643] transition-colors font-montserrat">
                        {company.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-roboto">
                        {company.positions} open positions
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Trending Skills */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">
                Trending Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSkills.map((skill) => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={skill}
                    className="px-3 py-1 bg-[#FFF9E6] text-[#B8860B] rounded-full text-xs font-medium border border-[#EBB643]/20 cursor-pointer hover:bg-[#EBB643] hover:text-white transition-colors font-roboto"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Job Feed */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="lg:col-span-3 space-y-4"
          >
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div className="flex items-center gap-4 w-full">
                        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                        <div className="space-y-2 w-full max-w-[200px]">
                          <Skeleton className="h-6 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                      <div className="text-right w-full md:w-auto flex flex-col items-end gap-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="flex gap-2 mb-6">
                      <Skeleton className="h-8 w-20 rounded-lg" />
                      <Skeleton className="h-8 w-20 rounded-lg" />
                      <Skeleton className="h-8 w-20 rounded-lg" />
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : jobsList.map((job) => (
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden ${(job.logo_url && (job.logo_url.startsWith('http') || job.logo_url.startsWith('/'))) ||
                        (job.company && ["Coinbase", "Uniswap Labs", "Aave", "Chainlink", "BaseFi Protocol"].some(c => job.company.includes(c)))
                        ? ""
                        : (job.color_theme || "bg-blue-100 text-blue-600")
                        }`}
                    >
                      {(() => {
                        const logoMap: Record<string, string> = {
                          "Coinbase": "/images/token-branded_coinbase.svg",
                          "Uniswap Labs": "/images/uni.svg",
                          "Aave": "/images/01.svg",
                          "Chainlink": "/icons/chainlinkicon.svg",
                          "BaseFi Protocol": "/images/token-branded_coinbase.svg", // Placeholder or same if related
                          "BASE Labs": "/images/token-branded_coinbase.svg"
                        };

                        // normalize company name to match keys
                        const companyKey = Object.keys(logoMap).find(key => job.company.includes(key));
                        const mappedLogo = companyKey ? logoMap[companyKey] : null;

                        if (job.logo_url && (job.logo_url.startsWith('http') || job.logo_url.startsWith('/'))) {
                          return <img src={job.logo_url} alt={job.company} className="w-full h-full object-contain p-2" />;
                        } else if (mappedLogo) {
                          return <img src={mappedLogo} alt={job.company} className="w-full h-full object-contain p-2" />;
                        } else {
                          return job.logo_url || job.company.substring(0, 2).toUpperCase();
                        }
                      })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-nunito">
                        {job.title}
                      </h2>
                      <div className="flex flex-col font-montserrat gap-2 text-sm text-gray-500 mt-1 ">
                        <span className="font-medium  text-slate-700">
                          {job.company}
                        </span>
                        <div className="flex gap-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Posted {getTimeAgo(job.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900 font-montserrat">
                      {job.salary_range}
                    </div>
                    <div className="text-xs text-gray-500 font-roboto">
                      {job.equity}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 font-montserrat leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags && job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#E4B95C52] text-[#9B6A00] text-sm rounded-lg font-medium font-roboto"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-4">
                  <div className="flex items-center gap-6 text-sm text-gray-500 font-roboto">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{job.applicants_count || 0} applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Closes in {job.closes_in || "N/A"}</span>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto bg-[#EBB643] hover:bg-[#d9a532] text-white font-medium px-8 rounded-full font-montserrat">
                    Apply now
                  </Button>
                </div>
              </motion.div>
            ))}

            <div className="flex flex-col items-center justify-center gap-2 font-montserrat mt-5">
              <Button className=" bg-[#EFEFEF] hover:bg-[#EFEFEF]/50 text-[#030406] font-medium px-8 rounded-full ">
                Load More Jobs
              </Button>
              <p>Showing {jobsList.length} total jobs</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-[#ffffff] p-12">
        <div className="max-w-xl mx-auto text-center">
          <h4 className="text-2xl font-semibold mb-3">
            Featured Job Opportunities
          </h4>
          <p className="font-montserrat text-[#666666]">
            Hand-picked positions from top companies in the BASE ecosystem
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-[90%] mx-auto"
        >
          {opportunities.map((opportunity, i) => (
            <motion.div
              key={opportunity.JobTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <JobCard
                JobTitle={opportunity.JobTitle}
                title={opportunity.title}
                color={opportunity.color}
                range={opportunity.range}
                description={opportunity.description}
                logo={opportunity.logo}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-[#EFEFEF] p-12 overflow-hidden">
        <div className="max-w-xl mx-auto text-center">
          <h4 className="text-2xl font-semibold mb-3">
            Companies Hiring on BASE
          </h4>
          <p className="font-montserrat text-[#666666]">
            Join innovative teams building the future of Web3
          </p>
        </div>

        {/* Infinite Scroll Logo Marquee */}
        <div className="relative mt-10 w-full overflow-hidden">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center flex-nowrap pr-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity
              }}
              style={{ width: "fit-content" }}
            >
              {[...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Company ${i}`}
                  className="h-12 w-auto object-contain shrink-0 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <FutureOfWeb3
        heading="Ready to Launch Your Web3 Career?"
        description="Join thousands of professionals who've found their dream jobs in the BASE ecosystem. Your next opportunity is just one click away."
        text="Create your profile"
        textOutline="Browse all jobs"
        show={false}
      />
    </div>
  );
}
