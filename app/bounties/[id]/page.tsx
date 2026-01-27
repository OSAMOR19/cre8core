"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Bounty } from "@/lib/types";
import MainBounty from "@/components/common/Bounty/MainBounty";
import SideBounty from "@/components/common/Bounty/SideBounty";
import { CiBookmark, CiShare1 } from "react-icons/ci";
import { motion } from "framer-motion";

const BountyDetails = () => {
  const { id } = useParams();
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("bounties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching bounty:", error);
        } else {
          setBounty(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBounty();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!bounty) {
    return <div className="min-h-screen flex items-center justify-center">Bounty not found.</div>;
  }

  return (
    <div className="max-w-[90%] mx-auto grid grid-cols-12 gap-4 my-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className=" col-span-full md:col-span-8"
      >
        <span className="flex gap-3 text-[#1E1E1E] justify-end mb-4 text-2xl">
          <CiBookmark className="cursor-pointer hover:text-[#DCBD7A] transition-colors" />
          <CiShare1 className="cursor-pointer hover:text-[#DCBD7A] transition-colors" />
        </span>
        <MainBounty bounty={bounty} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="col-span-full md:col-span-4 mt-10"
      >
        <SideBounty bounty={bounty} />
      </motion.div>
    </div>
  );
};

export default BountyDetails;
