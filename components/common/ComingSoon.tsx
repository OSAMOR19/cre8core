"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon!",
  description = "Will host large-scale developer builderthon for projects on Base in various demography",
}) => {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for children
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/images/hackathonbg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="text-center h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden"
      >
        {/* Adds a subtle animated overlay to make the bg feel alive */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-black/30 pointer-events-none"
        />

        <motion.div
          className="w-full relative z-10 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl text-white md:text-8xl font-bold mb-6 tracking-tight font-roboto"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-blue-100 max-w-lg mx-auto font-light mb-8 font-montserrat leading-relaxed"
          >
            {description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white border border-white/20 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl"
          >
            <h2 className="text-xl md:text-2xl font-normal font-montserrat text-[#10295F] mb-6">
              Want to be the first to know when we are ready?
            </h2>

            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="grow px-6 py-4 font-montserrat rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EBB643] transition-all"
                required
              />
              <Button
                type="submit"
                className="bg-[#0F2555] hover:bg-[#1a2f5e] text-white px-8 py-6 h-auto text-base rounded-lg font-normal font-montserrat transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
