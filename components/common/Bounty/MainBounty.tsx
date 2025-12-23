"use client";

import React from "react";
import { CiUser } from "react-icons/ci";
import { RiCheckboxBlankFill, RiCodeSFill } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { motion } from "framer-motion";
import { Bounty } from "@/lib/types";

interface MainBountyProps {
  bounty: Bounty | null;
}

const MainBounty: React.FC<MainBountyProps> = ({ bounty }) => {
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
          <div className="flex flex-col md:text-right">
            <span className="flex items-center gap-2 font-light text-4xl">
              <TbMoneybag />
              <span>{bounty.prize_pool}</span>
            </span>
            <span className="font-montserrat ">Total Reward</span>
          </div>
        </div>

        <div className="bg-[#EBEDF3] flex gap-3 items-center p-3 rounded-lg">
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
