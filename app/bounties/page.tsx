"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Bounty } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import TermsModal from "@/components/common/TermsModal";

export default function BountiesPage() {
  const router = useRouter();
  const [tab, setTab] = useState("All");
  const [bountiesList, setBountiesList] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  // Fallback data for demo purposes if DB is empty
  const fallbackBounties: Bounty[] = [
    {
      id: "1",
      created_at: new Date().toISOString(),
      title: "Audit & Optimize Lending Protocol Contracts",
      category: "Development",
      sponsor: "BASE",
      prize_pool: "5000 USDC",
      deadline: "2025-12-15",
      winners_count: 5,
      description: "Security audit and gas optimization for our lending protocol smart contracts. Experience with Defi security required. Must provide audit report...",
      status: "Open"
    },
    {
      id: "2",
      created_at: new Date().toISOString(),
      title: "Create a Promo Video for Base",
      category: "Video",
      sponsor: "BASE",
      prize_pool: "1000 USDC",
      deadline: "2025-01-20",
      winners_count: 3,
      description: "Create a 1 minute high-energy promotional video showcasing Base features.",
      status: "Open"
    },
    {
      id: "3",
      created_at: new Date().toISOString(),
      title: "Design a Meme Collection",
      category: "Meme",
      sponsor: "BASE",
      prize_pool: "500 USDC",
      deadline: "2025-01-10",
      winners_count: 10,
      description: "Create a set of 5 viral memes about the Base ecosystem.",
      status: "Open"
    },
    {
      id: "4",
      created_at: new Date().toISOString(),
      title: "Write a Thread about Base vs Others",
      category: "Threads",
      sponsor: "BASE",
      prize_pool: "200 USDC",
      deadline: "2025-01-05",
      winners_count: 20,
      description: "Write a comprehensive thread comparing Base L2 to other L2 solutions.",
      status: "Open"
    }
  ];

  useEffect(() => {
    let mounted = true;

    const fetchBounties = async () => {
      try {
        const { data, error } = await supabase
          .from("bounties")
          .select("*")
          .eq("status", "Open")
          .order("created_at", { ascending: false });

        if (mounted) {
          if (error) {
            console.error("Error fetching bounties:", error);
            setBountiesList(fallbackBounties);
          } else {
            setBountiesList(data || []);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        if (mounted) {
          setBountiesList(fallbackBounties);
          setLoading(false);
        }
      }
    };

    fetchBounties();

    const channel = supabase
      .channel("bounties-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bounties",
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const newBounty = payload.new as Bounty;
            if (newBounty.status === "Open") {
              setBountiesList((prev) => [newBounty, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const newBounty = payload.new as Bounty;
            // Fetch fresh data to ensure we have all fields (category, etc)
            // in case payload is partial
            if (newBounty.status === "Open") {
              const { data: freshBounty } = await supabase
                .from("bounties")
                .select("*")
                .eq("id", newBounty.id)
                .single();

              if (freshBounty) {
                setBountiesList((prev) => {
                  const exists = prev.find(b => b.id === freshBounty.id);
                  if (exists) {
                    return prev.map(b => b.id === freshBounty.id ? freshBounty : b);
                  } else {
                    // Add to top
                    return [freshBounty, ...prev];
                  }
                });
              }
            } else {
              // If status changed to something else (e.g. closed/rejected), remove it
              setBountiesList((prev) => prev.filter(b => b.id !== newBounty.id));
            }
          } else if (payload.eventType === "DELETE") {
            setBountiesList((prev) => prev.filter(b => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

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

  const BountyCard = ({ bounty }: { bounty: Bounty }) => {
    return (
      <motion.div variants={fadeInUp}>
        <Card className="p-0 rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
          <CardHeader className="flex items-center justify-center border-b pb-4 p-0 overflow-hidden rounded-t-lg h-48 relative bg-gray-50">
            {bounty.image_url ? (
              <img
                src={bounty.image_url}
                alt={bounty.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/images/bountyCircle.svg"
                alt="Bounty Image"
                width={150}
                height={100}
                className="object-contain"
              />
            )}
          </CardHeader>
          <CardDescription className="mt-4 mb-6 px-4 flex-grow flex flex-col">
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-[#DCBD7A] text-xs uppercase tracking-wider font-bold">Sponsor</span>
              <p className="text-black text-xl font-bold font-nunito">{bounty.sponsor || "BASE"}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-[#DCBD7A] text-[#9B6A00] px-5 py-1 rounded-full text-sm">
                {bounty.category}
              </span>
            </div>
            <h4 className="font-nunito text-xl text-black my-3 font-semibold line-clamp-2 min-h-[56px]">
              {bounty.title}
            </h4>

            <p className="font-montserrat text-[#030406B8] line-clamp-3 min-h-[72px]">
              {bounty.description}
            </p>

            <div className="bg-[#DCBD7A36] p-5 rounded-2xl my-5">
              <h5 className="text-[#9B6A00] text-lg font-nunito my-1">
                $ Prize Pool: {bounty.prize_pool}
              </h5>
              <span className="flex items-center gap-2 font-montserrat">
                <CiUser color="#9B6A00" size={24} /> Winners: {bounty.winners_count}
              </span>

              <div className="mt-3 space-y-2 font-montserrat hidden md:block">
                <span className="text-sm text-[#9B6A00] opacity-80 italic">
                  View details for distribution
                </span>
              </div>
            </div>

            <div className="font-montserrat my-3 mt-auto">
              <p className="flex gap-1 items-center">
                <IoTimeOutline color="#9B6A00" size={24} /> Deadline: {bounty.deadline}
              </p>

              <div className="flex gap-2 mt-2">
                <span className="bg-[#DCBD7A4A] text-[#9B6A00] px-3 text-sm py-2 rounded-full">
                  {bounty.category}
                </span>
                <span className="bg-[#DCBD7A4A] text-[#9B6A00] px-3 text-sm py-2 rounded-full">
                  {bounty.status}
                </span>
              </div>

              <Button
                onClick={() => router.push(`/bounties/${bounty.id}`)}
                className="w-full bg-[#E4B95C] hover:bg-[#E4B95C]/50 text-[#030406] py-5 rounded-full mt-5 transition-transform active:scale-95"
              >
                View Details
              </Button>
            </div>
          </CardDescription>
        </Card>
      </motion.div>
    );
  };

  const renderBounties = () => {
    let filteredBounties = bountiesList;

    if (tab !== "All") {
      filteredBounties = bountiesList.filter(
        (b) => b.category.toLowerCase() === tab.toLowerCase() ||
          (tab === "Sprints" && b.category === "Development")
      );
    }

    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-lg border shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-center border-b py-6">
                <Skeleton className="h-[100px] w-[150px] rounded-md" />
              </div>
              <div className="p-4 flex flex-col gap-4 flex-grow">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-16 w-full" />

                <div className="p-5 border rounded-2xl my-2 space-y-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-32" />
                </div>

                <div className="mt-auto space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-12 w-full rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (filteredBounties.length === 0) {
      return <div className="mt-4 text-center py-10 font-montserrat text-gray-500">No bounties found for this category.</div>;
    }

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
      >
        {filteredBounties.map((bounty, index) => (
          <BountyCard key={bounty.id || index} bounty={bounty} />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="max-w-[90%] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Bounties on BASE
        </h1>
        <p className="font-montserrat text-sm text-[#666666]">
          Complete bounties to earn rewards while contributing to the Base
          ecosystem. Find tasks that match your skills and interests.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-between mt-8 mb-4"
      >
        <h2 className="text-2xl font-medium">All Bounties</h2>
        <Button
          onClick={() => setShowTerms(true)}
          className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 px-8 py-5 rounded-full font-light text-black transition-transform active:scale-95"
        >
          Post Bounty
        </Button>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-montserrat"
      >
        Browse all available bounties across different categories.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 items-center border rounded-md px-4 my-5 "
      >
        <PiMagnifyingGlassLight />
        <input
          className="px-2 py-4 flex-1 focus:outline-none"
          type="search"
          name=""
          id=""
          placeholder="Search bounties.."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 flex-wrap pb-4 md:overflow-visible"
      >
        {["All", "Video", "Meme", "Threads", "Sprints"].map((category) => (
          <button
            key={category}
            onClick={() => setTab(category)}
            className={`px-6 py-2 md:px-10 md:py-2.5 whitespace-nowrap border border-[#E4B95C] text-black rounded-full font-medium transition-all duration-300 ${tab === category
              ? "bg-[#E4B95C] text-slate-900 transform scale-105 shadow-md"
              : "hover:bg-[#E4B95C]/10 bg-white"
              }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
      <div className="my-6">{renderBounties()}</div>

      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onProceed={() => router.push("/bounties/create")}
      />
    </div>
  );
}
