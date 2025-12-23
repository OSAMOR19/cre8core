"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ITestCard {
  img: string;
  name: string;
  title: string;
  description: string;
  text: string;
}

function TestCards({ img, name, title, description, text }: ITestCard) {
  return (
    <div className="bg-[#EFEFEF] min-h-[300px] min-w-[350px] p-8 rounded-2xl flex flex-col justify-around ">
      <div className="flex gap-5 items-center">
        <img src={img} alt="" />
        <span className="flex flex-col justify-between">
          <p className="font-semibold text-2xl">{name}</p>
          <p>{title}</p>
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-montserrat">"{description}"</p>
        <img src="/images/star.svg" alt="" width={100} />
      </div>
      <p>{text}</p>
    </div>
  );
}

const data = [
  {
    img: "/images/sarah.svg",
    name: "Sarah Chen",
    title: "Solidity developer @BaseDex",
    description:
      "Found my dream job at a leading DeFi protocol through cre8core lab. The platform's focus on BASE ecosystem opportunities made all the difference in my career transition.",
    text: "Landed $180K position at DeFi Labs",
  },
  {
    img: "/images/marcus.svg",
    name: "Marcus Rodriguez",
    title: "Startup Founder",
    description:
      "Received a $50K grant that enabled us to build our NFT marketplace on BASE. The mentorship and resources provided were invaluable for our success",
    text: "Raised $2M Series A funding",
  },
  {
    img: "/images/alex.svg",
    name: "Alex Kim",
    title: "Full-Stack Developer",
    description:
      "Won first place at the BASE Builder Hackathon and turned my project into a thriving dApp with over 10K users. The community support was incredible.",
    text: "Built ChainVault with 10K+ users",
  },
  {
    img: "/images/sarah.svg", // Reusing image for demo
    name: "Jessica Lee",
    title: "Community Manager",
    description:
      "Cre8core helped me find the perfect community manager role for a DAO. The bounty system is also a great way to earn extra tokens on the side.",
    text: "Earned 5000+ USDC in Bounties",
  },
];

const Testimonial = () => {
  // Duplicate data enough times to ensure seamless scroll on large screens
  const extendedData = [...data, ...data, ...data];

  return (
    <div className="py-12 overflow-hidden bg-white">
      <div className="max-w-xl mx-auto text-center mb-10 px-4">
        <h2 className="text-[32px] font-bold mb-3">
          Success Stories From Our Community
        </h2>
        <p className="font-montserrat text-[#666666]">
          Hear from builders who've transformed their careers and projects
          through cre8core lab
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-4"
          animate={{
            x: ["0%", "-50%"], // Move half way because we doubled the content
          }}
          transition={{
            duration: 40, // Adjust speed (higher = slower)
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "fit-content" }}
        >
          {/* Render the list twice to create the infinite loop effect */}
          {[...extendedData, ...extendedData].map((item, index) => (
            <TestCards
              key={index} // Index is safe here as list is static
              img={item.img}
              name={item.name}
              title={item.title}
              description={item.description}
              text={item.text}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
