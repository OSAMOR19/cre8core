import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbMoneybag } from "react-icons/tb";

interface BountyCardProps {
  img?: string;
  category?: string;
  date?: string;
  amount?: string;
  location?: string;
  title?: string;
  bounty?: string;
  description?: string;
}

const BountyCard = ({
  img,
  category,
  date,
  amount,
  location,
  title,
  description,
  bounty,
}: BountyCardProps) => {
  return (
    <div className="border border-[#66666624] rounded-2xl p-6 bg-white space-y-4 shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img src={img || "/images/bounty.svg"} alt="Bounty" />
          <span className="md:ml-4 flex flex-col justify-between">
            <span className="flex justify-between md:justify-start gap-4 text-sm text-gray-500 items-center">
              <span className="px-4 py-2 rounded-4xl border border-[#E4B95C]">
                {category || "Bounty"}
              </span>
              <span>{date || "Nov 1, 2025"}</span>
            </span>
            <span className="text-2xl font-bold font-nunito">
              {title || "Create Base Explainer Video"}
            </span>
          </span>
        </div>
        <div className="hidden md:flex flex-col gap-2 md:text-right text-sm ">
          <span className="flex text-[#9B6A00] md:items-center gap-2 font-light text-2xl">
            <TbMoneybag />
            <span>{amount || "1000 USDC"}</span>
          </span>
          <span className="text-[#9B6A00] bg-[#DCBD7A63] inline-flex self-end w-24 justify-center items-center px-4 py-2 rounded-4xl">
            {bounty || "Video"}
          </span>
        </div>
      </div>
      <div className="font-montserrat text-[#030406B8]">
        {description ||
          "Create a 60-second explainer video showcasing Base blockchain's benefits  for developers. Should be engaging, informative, and suitable for social media sharing across multiple platforms."}
      </div>
      <div className="flex items-center gap-2 font-montserrat text-[#030406B8]">
        <CiLocationOn />
        <span className="text-sm">{location || "New york city, USA"}</span>
      </div>
    </div>
  );
};

export default BountyCard;
