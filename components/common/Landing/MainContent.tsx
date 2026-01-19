"use client";

import { Button } from "@/components/ui/button";
import BrowseBounties from "./BrowseBounties";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MainContent = () => {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <div
        className="relative w-full rounded-3xl overflow-hidden border border-gray-200 mb-8 bg-cover bg-center bg-no-repeat min-h-[500px] md:min-h-0 md:aspect-[16/7]"
        style={{
          backgroundImage: 'url("/images/landing.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 md:bg-transparent" /> {/* Optional overlay for mobile readability */}

        <div className="relative z-10 flex items-center h-full p-6 md:p-12">
          <div className="max-w-md md:max-w-xl text-center md:text-left mx-auto md:mx-0">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex flex-col text-white"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl text-[#D5DCEB] font-semibold mb-6 font-roboto leading-[1.2]"
              >
                Fueling the Creative Layer of
                <span className="text-[#EBB643]"> {""}BASE</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl mb-8 font-montserrat text-gray-200"
              >
                One platform, infinite campaigns, endless creator rewards.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => router.push("/bounties")}
                  className="bg-[#DCBD7A] hover:bg-[#d9a532] text-[#030406] font-medium px-8 py-6 rounded-full font-montserrat text-lg transition-transform active:scale-95"
                >
                  Become a creator
                </Button>
                <Button
                  onClick={() => router.push("/bounties/create")}
                  className="bg-transparent border border-[#DCBD7A] text-[#D9D9D9] hover:bg-white/10 font-medium px-8 py-6 rounded-full font-montserrat text-lg transition-transform active:scale-95"
                >
                  Post a bounty
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <BrowseBounties />
    </div>
  );
};

export default MainContent;
