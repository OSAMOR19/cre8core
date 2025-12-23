"use client";

import React from "react";
import HowBountyWork from "../Card/HowBountyWork";
import CommunityStats from "../Card/CommunityStats";
import TrendingNow from "../Card/TrendingNow";
import UpcomingEvent from "../Card/UpcomingEvent";
import TopCreator from "../Card/TopCreator";
import { motion } from "framer-motion";

const SideContent = () => {
  const fadeInUp = {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div {...fadeInUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}>
        <HowBountyWork />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}>
        <CommunityStats />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}>
        <TrendingNow />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}>
        <UpcomingEvent />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}>
        <TopCreator />
      </motion.div>
    </div>
  );
};

export default SideContent;
