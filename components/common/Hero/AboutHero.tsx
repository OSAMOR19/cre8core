"use client";

import React from "react";
import img from "../../../public/images/about.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <div className="bg-[#0C1F47] text-white px-4 md:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl flex flex-col space-y-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[47px] md:leading-[1.2]"
        >
          The Creative Engine Powering Web3 Innovation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-montserrat text-[#D6D6D6] text-sm"
        >
          At Cre8core Labs, we're building the infrastructure that connects
          visionary builders with transformative opportunities across the
          onchain ecosystem.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col md:flex-row text-sm font-light gap-3"
        >
          <Button className="bg-[#E4B95C] hover:bg-[#d9a532] px-12 py-5 rounded-3xl transition-colors">
            Join our mission
          </Button>
          <Button className="bg-transparent hover:bg-white/10 transition-colors">15,000+ creators</Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image src={img} alt="About" width={582} height={456} priority />
      </motion.div>
    </div>
  );
};

export default AboutHero;
