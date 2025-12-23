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
        style={{
          backgroundImage: 'url("/images/landing.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "16 / 7", // or match your image ratio
          width: "100%",
          borderRadius: "24px",
          border: "1px solid #E5E7EB",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <div className=" hidden inset-0 md:flex items-center h-full">
          <div className="max-w-md m-5">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className=" flex flex-col text-white"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-2xl lg:text-5xl text-[#D5DCEB] font-semibold mb-4 font-roboto leading-[1.2]"
              >
                Cre8core Labs Fueling the Creative Layer of
                <span className="text-[#EBB643]"> {""}BASE</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg mb-8 font-montserrat text-gray-200"
              >
                One platform, infinite campaigns, endless creator rewards.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-4">
                <Button className="bg-[#DCBD7A] hover:bg-[#d9a532] text-[#030406] font-medium px-8 py-6 rounded-full font-montserrat transition-transform active:scale-95">
                  Become a creator
                </Button>
                <Button
                  onClick={() => router.push("/bounties/create")}
                  className="bg-transparent border border-[#DCBD7A] text-[#D9D9D9] hover:bg-white/10 font-medium px-8 py-6 rounded-full font-montserrat transition-transform active:scale-95"
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
