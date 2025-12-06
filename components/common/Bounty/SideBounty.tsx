import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import React from "react";
import { GoRocket } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import { LiaChartBarSolid } from "react-icons/lia";
import { MdLightbulbOutline } from "react-icons/md";
import { RxClock } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";

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

const SideBounty = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-6 flex flex-col items-center  space-y-3 bg-white rounded-lg shadow-md">
        <span className="flex items-center gap-2 font-semibold text-xl text-[#E4B95C]">
          <TbMoneybag />
          <span>{"1000 USDC"}</span>
        </span>
        <p className="font-montserrat font-light">Total Bounties Reward</p>
        <span className="flex gap-4 font-montserrat font-light">
          <span className="flex gap-3 items-center">
            <RxClock /> 8 Weeks
          </span>
          <span className="flex gap-3 items-center">
            <HiOutlineUser /> 12 applicants
          </span>
        </span>
        <Button className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 text-white py-5 rounded-full w-full">
          Submit Your Work{" "}
        </Button>
        <Button className="border-[#E4B95C] border bg-transparent hover:bg-[#E4B95C]/50 text-black py-5 rounded-full w-full">
          Join Bounty{" "}
        </Button>
      </div>

      <div>
        <div className="p-8 bg-white rounded-lg shadow-md ">
          <div className="flex gap-3">
            <img src="/icons/blue.svg" alt="" />
            <span className="flex flex-col justify-between">
              <span>BASE Protocol</span>
              <span className="font-montserrat text-sm">Sponsor</span>
            </span>
          </div>
          <p className="my-6 font-montserrat text-[#030406B8]">
            BASE is a secure, low-cost, builder-friendly Ethereum L2 built to
            bring the next billion users onchain. Built on Optimism's OP Stack
            and incubated by Coinbase.
          </p>
          <div className="flex flex-col space-y-2 font-montserrat">
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Founded</span>
              <span className="font-semibold">2023</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Total bounties</span>
              <span className="font-semibold">47</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Success Rate</span>
              <span className="font-semibold">94%</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-4 font-montserrat">
        <CardHeader className="flex p-0 justify-between">
          <h4 className="text-lg font-semibold">Project Stats</h4>
          <LiaChartBarSolid size={20} />
        </CardHeader>
        <CardDescription>
          <div className="flex flex-col gap-4 text-black py-4 ">
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Applications</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Views</span>
              <span className="font-semibold">320</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Bookmarks</span>
              <span className="font-semibold">853</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-[#4E4E4E]">Time Left</span>
              <span className="font-semibold">15 days</span>
            </div>
          </div>
        </CardDescription>
      </Card>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
      </div>

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
                <strong>Sample Code</strong>
                <span>DEX Integration Example</span>
              </span>
            </div>
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

      <div>
        <div className="p-8 bg-[#122E69] text-white rounded-lg shadow-md ">
          <div className="flex items-center gap-3">
            <span className="bg-[#D5DCEB61] flex p-3 rounded-full justify-center items-center">
              <MdLightbulbOutline color="#EFEFEF99" size={24} />
            </span>
            <span className="font-montserrat font-semibold text-sm">
              Pro Tips
            </span>
          </div>
          <p className="my-6 font-montserrat ">
            Include a detailed technical proposal with your application.
            Projects with clear architecture plans have 3x higher acceptance
            rates!
          </p>
          <span className="bg-[#EFEFEF99] px-5 py-2 text-black rounded-full text-sm">
            Application Tips
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBounty;
