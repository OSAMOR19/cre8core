"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { GoRocket } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import { LiaChartBarSolid } from "react-icons/lia";
import { MdLightbulbOutline } from "react-icons/md";
import { RxClock } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";
import { motion } from "framer-motion";
import { Bounty } from "@/lib/types";

interface SideBountyProps {
  bounty: Bounty | null;
}

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

const SideBounty: React.FC<SideBountyProps> = ({ bounty }) => {
  const router = useRouter();
  const fadeInUp = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (!bounty) return <div></div>;

  const timeLeft = bounty.deadline ? Math.ceil((new Date(bounty.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="flex flex-col gap-5"
    >
      <motion.div variants={fadeInUp} className="p-6 flex flex-col items-center  space-y-3 bg-white rounded-lg shadow-md">
        <span className="flex items-center gap-2 font-semibold text-xl text-[#E4B95C]">
          <TbMoneybag />
          <span>{bounty.prize_pool}</span>
        </span>
        <p className="font-montserrat font-light">Total Bounties Reward</p>
        <span className="flex gap-4 font-montserrat font-light">
          <span className="flex gap-3 items-center">
            <RxClock /> {timeLeft > 0 ? `${timeLeft} Days Left` : "Ended"}
          </span>
          <span className="flex gap-3 items-center">
            <HiOutlineUser /> {bounty.winners_count} Winners
          </span>
        </span>
        <Button
          onClick={() => router.push(`/bounties/${bounty.id}/submit`)}
          className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 text-white py-5 rounded-full w-full transition-transform active:scale-95"
        >
          Submit Your Work{" "}
        </Button>
        <Button className="border-[#E4B95C] border bg-transparent hover:bg-[#E4B95C]/50 text-black py-5 rounded-full w-full transition-transform active:scale-95">
          Join Bounty{" "}
        </Button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <div className="p-8 bg-white rounded-lg shadow-md ">
          <div className="flex gap-3">
            <img src="/icons/blue.svg" alt="" />
            <span className="flex flex-col justify-between">
              <span>{bounty.sponsor || "BASE Protocol"}</span>
              <span className="font-montserrat text-sm">Sponsor</span>
            </span>
          </div>
          <p className="my-6 font-montserrat text-[#030406B8]">
            {bounty.sponsor === "BASE" ? "BASE is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain." : `${bounty.sponsor} is looking for talented builders to create innovative solutions.`}
          </p>
          <div className="flex flex-col space-y-2 font-montserrat">
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Status</span>
              <span className="font-semibold text-green-600">{bounty.status || "Open"}</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Category</span>
              <span className="font-semibold">{bounty.category}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="p-4 font-montserrat">
          <CardHeader className="flex p-0 justify-between">
            <h4 className="text-lg font-semibold">Project Stats</h4>
            <LiaChartBarSolid size={20} />
          </CardHeader>
          <CardDescription>
            <div className="flex flex-col gap-4 text-black py-4 ">
              <div className="flex justify-between">
                <span className=" text-[#4E4E4E]">Time Left</span>
                <span className="font-semibold">{timeLeft > 0 ? `${timeLeft} days` : "Closed"}</span>
              </div>
            </div>
          </CardDescription>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 font-montserrat">
          Trending Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-[#FFF9E6] text-[#B8860B] rounded-full text-xs font-medium border border-[#EBB643]/20 cursor-pointer hover:bg-[#EBB643] hover:text-white transition-colors font-roboto"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Keeping Resources section as generic useful links */}
      <motion.div variants={fadeInUp}>
        <Card className="p-4 font-montserrat">
          <CardHeader className="flex p-0 justify-between">
            <h4 className="text-lg font-semibold">Resources</h4>
            <LiaChartBarSolid size={20} />
          </CardHeader>
          <CardDescription>
            <div className="flex flex-col gap-4 text-black  ">
              <div className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
                <span className="bg-[#D5DCEB61] p-3 rounded-full flex justify-center items-center">
                  <GoRocket size={24} />
                </span>
                <span className="flex flex-col space-y-2 flex-1">
                  <strong>BASE Documentation</strong>
                  <span>Developers Guide & APIs</span>
                </span>
              </div>
              <div className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
                <span className="bg-[#D5DCEB61] p-3 rounded-full flex justify-center items-center">
                  <GoRocket size={24} />
                </span>
                <span className="flex flex-col space-y-2 flex-1">
                  <strong>Developer Discord</strong>
                  <span>Community Support</span>
                </span>
              </div>
            </div>
          </CardDescription>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SideBounty;
