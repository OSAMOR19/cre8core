"use client";

import Image from "next/image";
import React from "react";
import { ImTrophy } from "react-icons/im";
import { IoIosCode } from "react-icons/io";
import { RxRocket } from "react-icons/rx";
import { TbArrowGuide } from "react-icons/tb";
import img1 from "../../../public/images/coin.svg";
import img2 from "../../../public/images/Eth.svg";
import img3 from "../../../public/images/uni.svg";
import img4 from "../../../public/images/chain.svg";
import img5 from "../../../public/images/Polygon.svg";
import img6 from "../../../public/images/opti.svg";
import { motion } from "framer-motion";

const hubs = [
  {
    icon: <RxRocket color="#183D8B" size={24} />,
    type: "Jobs",
    description:
      "Find Your Next Web3 Career - Connect with leading projects seeking talented developers, designers, and innovators.",
    reward: "500+ Active Positions.",
  },
  {
    icon: <ImTrophy color="#183D8B" size={24} />,
    type: "Bounties",
    description:
      "Solve Challenges, Earn Rewards - Tackle real-world problems and get compensated for your innovative solutions.",
    reward: "$500K+ Total Rewards",
  },
  {
    icon: <IoIosCode color="#183D8B" size={24} />,
    type: "Hackathons",
    description:
      "Build the Future Together - Join collaborative events where breakthrough ideas become reality in just days.",
    reward: "Co25+ Events Annually",
  },
  {
    icon: <TbArrowGuide color="#183D8B" size={24} />,
    type: "Grants",
    description:
      "Fund Your Innovation - Access capital to transform your groundbreaking ideas into impactful Web3 solutions.",
    reward: "$2M+ Distributed",
  },
];

const HubCards = ({
  icon,
  type,
  description,
  reward,
}: {
  icon: React.ReactNode;
  type: string;
  description: string;
  reward: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-[#EFEFEF] min-h-[310px] rounded-md p-6 flex flex-col justify-around my-6 transition-colors"
    >
      <span className="p-3 flex items-center justify-center w-12 h-12 bg-[#D5DCEB61] rounded-full">
        {icon}
      </span>
      <div className="text-[24px] font-semibold">{type}</div>
      <div className="font-montserrat text-[#666666]">{description}</div>
      <div className=" text-[#666666] text-sm">{reward}</div>
    </motion.div>
  );
};

const InnovationHub = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      <div className="p-12 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-xl mx-auto text-center mb-4"
        >
          <h2 className="text-[32px] mb-3">
            Your Complete Web3 Innovation Hub
          </h2>
          <p className="font-montserrat text-[#666666]">
            From finding your dream job to launching groundbreaking projects,
            cre8core lab connects you with every opportunity in the BASE
            ecosystem.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10"
        >
          {hubs.map((hub, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <HubCards
                icon={hub.icon}
                type={hub.type}
                description={hub.description}
                reward={hub.reward}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="bg-[#EFEFEF] p-16 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-xl mx-auto text-center mb-4"
        >
          <h2 className="text-[32px] mb-3">
            Trusted by Leading Web3 Organizations
          </h2>
          <p className="font-montserrat text-[#666666]">
            Join the ecosystem that's shaping the future of decentralized
            innovation
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="flex flex-wrap gap-10 items-center justify-between max-w-5xl mx-auto mt-10"
        >
          {[img1, img2, img3, img4, img5, img6].map((img, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Image src={img} alt={`Partner ${i}`} width={134} height={30} className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InnovationHub;
