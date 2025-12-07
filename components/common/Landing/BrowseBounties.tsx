"use client";

import React, { useState } from "react";
import { BsFunnel } from "react-icons/bs";
import BountyCard from "../Card/BountyCard";

const bountyDTO = [
  {
    img: "/images/bounty.svg",
    category: "Bounty",
    date: "Nov 1, 2025",
    amount: "1000 USDC",
    location: "New york city, USA",
    title: "Create Base Explainer Video",
    description:
      "Create a 60-second explainer video showcasing Base blockchain's benefits  for developers. Should be engaging, informative, and suitable for social media sharing across multiple platforms.",
    bounty: "Video",
  },
  {
    img: "/images/bounty.svg",
    category: "Bounty",
    date: "Dec 5, 2025",
    amount: "500 USDC",
    location: "Remote",
    title: "Design Meme for Crypto Campaign",
    description:
      "Design a humorous and engaging meme to promote our upcoming crypto campaign. The meme should resonate with the crypto community and encourage sharing on social media platforms.",
    bounty: "Meme",
  },
];

const BrowseBounties = () => {
  const [tab, setTab] = useState("All");
  const renderBounties = () => {
    switch (tab) {
      case "All":
        return (
          <div className="flex flex-col gap-5">
            {bountyDTO.map((bounty, index) => (
              <BountyCard key={index} {...bounty} />
            ))}
          </div>
        );
      case "Video":
        return <div>Video Bounties Content</div>;
      case "Meme":
        return <div>Meme Bounties Content</div>;
      case "Threads":
        return <div>Threads Bounties Content</div>;
      case "Sprints":
        return <div>Sprints Bounties Content</div>;
      default:
        return <div>No bounties available.</div>;
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-bold">Browse Bounties</p>
        <span className="flex items-center gap-5">
          Filters
          <BsFunnel />
        </span>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-4">
        <button
          onClick={() => setTab("All")}
          className={`px-5 py-1 md:px-10 md:py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "All" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTab("Video")}
          className={`px-5 py-1 md:px-10 md:py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Video" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setTab("Meme")}
          className={`px-5 py-1 md:px-10 md:py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Meme" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Meme
        </button>
        <button
          onClick={() => setTab("Threads")}
          className={`px-5 py-1 md:px-10 md:py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Threads" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Threads
        </button>
        <button
          onClick={() => setTab("Sprints")}
          className={`px-5 py-1 md:px-10 md:py-2.5 border border-[#E4B95C] text-black rounded-4xl ${
            tab === "Sprints" ? "bg-[#E4B95C] text-white" : ""
          }`}
        >
          Sprints
        </button>
      </div>
      <div className="mt-6">{renderBounties()}</div>
    </div>
  );
};

export default BrowseBounties;
