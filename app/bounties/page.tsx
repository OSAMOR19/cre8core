"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function BountiesPage() {
  const router = useRouter();
  const [tab, setTab] = useState("All");

  const BountyCard = () => {
    return (
      <Card className="p-0 rounded-lg hover:shadow-lg transition-shadow">
        <CardHeader className="flex items-center justify-center border-b pb-4">
          <Image
            src="/images/bountyCircle.svg"
            alt="Bounty Image"
            width={150}
            height={100}
            className=""
          />
        </CardHeader>
        <CardDescription className="mt-4 mb-6 px-4">
          <div className="flex justify-between items-center">
            <p className="text-[#DCBD7A] text-lg font-nunito">BASE</p>
            <span className="bg-[#DCBD7A] text-[#9B6A00] px-5 py-1 rounded-full">
              Video
            </span>
          </div>
          <h4 className="font-nunito text-xl text-black my-3 font-semibold">
            Audit & Optimize Lending Protocol Contracts
          </h4>

          <p className="font-montserrat text-[#030406B8]">
            Security audit and gas optimization for our lending protocol smart
            contracts. Experience with Defi security required. Must provide
            audit report...
          </p>

          <div className="bg-[#DCBD7A36] p-5 rounded-2xl my-5">
            <h5 className="text-[#9B6A00] text-lg font-nunito my-1">
              $ Prize Pool: 5000 USDC
            </h5>
            <span className="flex items-center gap-2 font-montserrat">
              <CiUser color="#9B6A00" size={24} /> Winners: 5
            </span>

            <div className="mt-3 space-y-2 font-montserrat">
              <span className="flex justify-between items-center">
                <span>1st Place</span>
                <span>2000 USDC</span>
              </span>
              <span className="flex justify-between items-center">
                <span>2nd Place</span>
                <span>1500 USDC</span>
              </span>
              <span className="flex justify-between items-center">
                <span>3rd Place</span>
                <span>1000 USDC</span>
              </span>
              <span className="flex justify-between items-center">
                <span>4th Place</span>
                <span>500 USDC</span>
              </span>
              <span className="flex justify-between items-center">
                <span>5th Place</span>
                <span>5000 USDC</span>
              </span>
            </div>
          </div>

          <div className="font-montserrat my-3">
            <p className="flex gap-1 items-center">
              <IoTimeOutline color="#9B6A00" size={24} /> Deadline: Dec 15, 2025
            </p>

            <div className="flex gap-2 mt-2">
              <span className="bg-[#DCBD7A4A] text-[#9B6A00] px-3 text-sm py-2 rounded-full">
                Video
              </span>
              <span className="bg-[#DCBD7A4A] text-[#9B6A00] px-3 text-sm py-2 rounded-full">
                Developers tool
              </span>
            </div>

            <Button
              onClick={() => router.push("/bounties/1")}
              className="w-full bg-[#E4B95C] hover:bg-[#E4B95C]/50 text-[#030406] py-5 rounded-full mt-5"
            >
              View Details
            </Button>
          </div>
        </CardDescription>
      </Card>
    );
  };

  const renderBounties = () => {
    switch (tab) {
      case "All":
        const bounties = [
          { title: "Create a Promo Video", category: "Video" },
          { title: "Design a Meme", category: "Meme" },
          { title: "Write a Thread", category: "Threads" },
          { title: "Participate in a Sprint", category: "Sprints" },
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {bounties.map((bounty, index) => (
              <BountyCard key={index} {...bounty} />
            ))}
          </div>
        );
      case "Video":
        return <div className="mt-4">Video Bounties Content</div>;
      case "Meme":
        return <div className="mt-4">Meme Bounties Content</div>;
      case "Threads":
        return <div className="mt-4">Threads Bounties Content</div>;
      case "Sprints":
        return <div className="mt-4">Sprints Bounties Content</div>;
      default:
        return <div className="mt-4">No bounties available.</div>;
    }
  };

  return (
    <div className="max-w-[90%] mx-auto">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Bounties on BASE
        </h1>
        <p className="font-montserrat text-sm text-[#666666]">
          Complete bounties to earn rewards while contributing to the Base
          ecosystem. Find tasks that match your skills and interests.
        </p>
      </div>
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-2xl font-medium">All Bounties</h2>
        <Button
          onClick={() => router.push("/bounties/create")}
          className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 px-8 py-5 rounded-full font-light text-black"
        >
          Post bounty
        </Button>
      </div>
      <p className="font-montserrat">
        Browse all available bounties across different categories.
      </p>
      <div className="flex gap-2 items-center border rounded-md px-4 my-5 ">
        <PiMagnifyingGlassLight />
        <input
          className="px-2 py-4 flex-1 focus:outline-none"
          type="search"
          name=""
          id=""
          placeholder="Search bounties.."
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setTab("All")}
          className={`px-10 py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "All" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTab("Video")}
          className={`px-10 py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Video" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setTab("Meme")}
          className={`px-10 py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Meme" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Meme
        </button>
        <button
          onClick={() => setTab("Threads")}
          className={`px-5 py-3 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Threads" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Threads
        </button>
        <button
          onClick={() => setTab("Sprints")}
          className={`px-10 py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Sprints" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Sprints
        </button>
      </div>
      <div className="my-6">{renderBounties()}</div>
    </div>
  );
}
