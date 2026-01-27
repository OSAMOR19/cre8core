"use client";

import React from "react";
import { CiUser } from "react-icons/ci";
import { RiCheckboxBlankFill, RiCodeSFill } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { motion } from "framer-motion";
import { Bounty } from "@/lib/types";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface MainBountyProps {
  bounty: Bounty | null;
}

const MainBounty: React.FC<MainBountyProps> = ({ bounty }) => {
  const [isWinner, setIsWinner] = React.useState(false);
  const [hasClaimed, setHasClaimed] = React.useState(false);

  React.useEffect(() => {
    const checkWinnerStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && bounty) {
        const { data } = await supabase
          .from("bounty_submissions")
          .select("status")
          .eq("bounty_id", bounty.id)
          .eq("user_id", user.id)
          .eq("status", "approved") // User is approved (Winner)
          .single();

        if (data) setIsWinner(true);
      }
    };
    checkWinnerStatus();
  }, [bounty]);

  const handleClaim = () => {
    // In a real automated system, this would trigger a smart contract transaction.
    // Here, we simulate a claim request or instruct the user.
    alert("Claim request received! Admins have been notified to process your payout.");
    setHasClaimed(true);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (!bounty) return <div>Loading details...</div>;

  return (
    <motion.div initial="initial" animate="animate" className="space-y-8">
      <motion.div
        variants={fadeInUp}
        className="p-8 bg-white rounded-lg shadow-md"
      >
        <div className="bg-[#EBEDF3] flex gap-3 items-center p-3 rounded-lg mb-6">
          <RiCheckboxBlankFill color="#0000FF" size={24} />
          <span>
            <h2 className="text-lg font-semibold">
              Sponsored by {bounty.sponsor}
            </h2>
            <p className="font-montserrat text-[#030406B8]">
              Building The Future Of Decentralized Infrastructure
            </p>
          </span>
        </div>

        {isWinner && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              🎉
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
            <p className="text-green-700 mb-6">
              You have been selected as a winner for this bounty!
            </p>
            <Button
              onClick={handleClaim}
              disabled={hasClaimed}
              className={`px-8 py-6 text-lg font-bold rounded-full transition-all
                        ${hasClaimed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#EBB643] text-black hover:bg-[#d9a532] shadow-lg hover:shadow-xl hover:-translate-y-1"
                }`}
            >
              {hasClaimed ? "Claim Requested" : "Claim Reward"}
            </Button>
          </motion.div>
        )}

        <div className="flex flex-col gap-3 md:flex-row justify-between my-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="bg-[#D5DCEB61] p-3 rounded-full flex justify-center items-center">
              <RiCodeSFill size={24} />
            </span>
            <span className="flex flex-col gap-4">
              <span className="flex flex-col md:flex-row gap-4">
                <span className="bg-[#E4B95C] px-6 py-2 text-white rounded-full">
                  {bounty.category}
                </span>
                <span className="bg-[#3E800729] px-6 py-2  rounded-full">
                  {bounty.status || "Open"}
                </span>
              </span>
              <span className="font-nunito text-2xl font-semibold">
                {bounty.title}
              </span>
              <span className="font-montserrat text-sm">
                Deadline : {bounty.deadline ? new Date(bounty.deadline).toLocaleDateString() : "TBA"}
              </span>
            </span>
          </div>
          <div className="flex flex-col md:text-right max-w-[50%]">
            <span className="flex items-center justify-end gap-2 font-light text-3xl md:text-4xl text-right">
              <TbMoneybag className="shrink-0" />
              <span className="break-words w-full">{bounty.prize_pool}</span>
            </span>
            <span className="font-montserrat ">Total Reward</span>
          </div>
        </div>


        <div className="bg-[#DCBD7A36] p-5 rounded-2xl my-5">
          <h5 className="text-[#9B6A00] text-lg font-nunito my-1">
            $ Prize Pool: {bounty.prize_pool}
          </h5>
          <span className="flex items-center gap-2 font-montserrat">
            <CiUser color="#9B6A00" size={24} /> Winners: {bounty.winners_count || 1}
          </span>

          <div className="mt-3 space-y-2 font-montserrat">
            <p className="text-sm italic text-gray-600">
              Prize distribution details will be announced by the sponsor.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
          <p className="font-montserrat text-[#030406B8] whitespace-pre-line">
            {bounty.description || "No description provided."}
          </p>

          <div className="bg-[#EBEDF3] my-3 p-3">
            <h6 className="font-semibold">Key Objectives</h6>
            <ul className="list-disc ml-4 font-montserrat text-[#030406B8] mt-2">
              <li>Deliver high quality implementation of the required features.</li>
              <li>Ensure code is well-documented and tested.</li>
              <li>Follow security best practices.</li>
              <li>Submit before the deadline.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Static Sections representing standard bounty structure */}
      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
        className="p-8 bg-white rounded-lg shadow-md mt-8"
      >
        <h2 className="text-2xl font-semibold mb-6">
          Project Timeline & Milestones
        </h2>
        <ul className=" w-full ml-6 space-y-6 font-montserrat text-[#030406B8]">
          <li className="flex gap-3">
            <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">1</span>
            <span className="flex flex-col space-y-2 flex-1">
              <strong>Submission</strong>
              <span>Submit your project before the deadline.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">2</span>
            <span className="flex flex-col space-y-2 flex-1">
              <strong>Review</strong>
              <span>Judges review all eligible submissions.</span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">3</span>
            <span className="flex flex-col space-y-2 flex-1">
              <strong>Winners Announced</strong>
              <span>Winners will be contacted and announced publicly.</span>
            </span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
        className="p-8 bg-white rounded-lg shadow-md mt-8"
      >
        <h2 className="text-2xl font-semibold mb-6">Evaluation Criteria</h2>
        <ul className=" w-full space-y-6 font-montserrat text-[#030406B8]">
          <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
            <span className="flex flex-col space-y-2 flex-1">
              <strong>Functionality</strong>
              <span>Does it work as intended?</span>
            </span>
            <span className="text-[#9B6A00]">40%</span>
          </li>
          <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
            <span className="flex flex-col space-y-2 flex-1">
              <strong>Code Quality</strong>
              <span>Clean, readable, and efficient code?</span>
            </span>
            <span className="text-[#9B6A00]">30%</span>
          </li>
          <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
            <span className="flex flex-col space-y-2 flex-1">
              <strong>UX/UI (if applicable)</strong>
              <span>Is it easy to use?</span>
            </span>
            <span className="text-[#9B6A00]">30%</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default MainBounty;
