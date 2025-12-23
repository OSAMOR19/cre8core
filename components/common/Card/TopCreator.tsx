"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import img from "../../../public/images/placeholder.svg";
import { motion } from "framer-motion";

const creators = [
  {
    name: "Emma Zhang",
    role: "Smart Contract Dev",
    earnings: "$12.5K",
    img: img,
  },
  {
    name: "Carlos Rivera",
    role: "UI/UX Designer",
    earnings: "$22.5K",
    img: img,
  },
  {
    name: "David Kim",
    role: "Full-Stack Dev",
    earnings: "$8.9K",
    img: img,
  },
  {
    name: "Sarah Jen",
    role: "Frontend Dev",
    earnings: "$15.2K",
    img: img,
  },
  {
    name: "Mike Chen",
    role: "Auditor",
    earnings: "$18.5K",
    img: img,
  },
];

const TopCreator = () => {
  return (
    <Card className="p-4 font-montserrat h-[300px] overflow-hidden">
      <CardHeader className="flex p-0 justify-between mb-4">
        <h4 className="text-lg font-semibold">Top Creators</h4>
        <IoCalendarOutline size={20} />
      </CardHeader>
      <CardDescription className="font-montserrat text-sm text-[#030406B8] relative h-[220px] overflow-hidden">
        {/* Mask to fade out top and bottom */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-white via-transparent to-white h-full" />

        <motion.div
          animate={{
            y: [0, -50 * creators.length],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-0"
        >
          {/* Duplicate list for seamless loop */}
          {[...creators, ...creators, ...creators].map((creator, idx) => (
            <div key={idx} className="flex justify-between items-center h-[70px]">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center rounded-full overflow-hidden w-[48px] h-[48px] bg-gray-100">
                  <Image
                    src={creator.img}
                    alt={creator.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">
                    {creator.name}
                  </span>
                  <span className="text-xs">{creator.role}</span>
                </span>
              </div>
              <span className="text-[#FDB00A] font-medium">
                {creator.earnings}
              </span>
            </div>
          ))}
        </motion.div>
      </CardDescription>
    </Card>
  );
};

export default TopCreator;
