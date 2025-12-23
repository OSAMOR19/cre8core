"use client";

import { Button } from "@/components/ui/button";
import { IoCheckmark } from "react-icons/io5";
import { motion } from "framer-motion";

const FutureOfWeb3 = ({
  text,
  textOutline,
  heading,
  description,
  show = true,
}: {
  text?: string;
  textOutline?: string;
  heading?: string;
  description?: string;
  show?: boolean;
}) => {
  return (
    <div className="bg-[#0D214C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[600px] text-center py-20 px-4 space-y-5 mx-auto"
      >
        <h3 className="text-4xl">
          {heading || "Ready to Shape the Future of Web3 Work?"}
        </h3>
        <p className="font-montserrat text-[#EFEFEF]">
          {description ||
            "Whether you're a creator looking for opportunities or a project seeking talent, join our community and be part of the onchain revolution."}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
          <Button className="bg-[#E4B95C] hover:bg-[#E4B95C]/50 w-[300px] rounded-3xl py-6 transition-transform active:scale-95">
            {text || " Get Started"}
          </Button>
          <Button className="border-[#E4B95C] hover:border-[#E4B95C]/50 hover:bg-transparent border bg-transparent w-[300px] rounded-3xl py-6 transition-transform active:scale-95">
            {" "}
            {textOutline || " Contact Us"}
          </Button>
        </div>
        {show && (
          <div>
            <ul className="flex flex-col md:flex-row justify-center items-center gap-5 text-sm md:text-base">
              <li className="flex gap-2 items-center">
                <IoCheckmark className="text-[#E4B95C]" />
                <span>Free to join</span>
              </li>
              <li className="flex gap-2 items-center">
                <IoCheckmark className="text-[#E4B95C]" />
                <span> No platform fees</span>
              </li>
              <li className="flex gap-2 items-center">
                <IoCheckmark className="text-[#E4B95C]" />
                <span> Instant access</span>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FutureOfWeb3;
