"use client";
import React from "react";
import { supabase } from "@/lib/supabase";
import Logo from "../../public/images/logo.svg";
import Image from "next/image";
import ImageLanding from "../../public/images/landingIcon.svg";
import meta from "../../public/images/logos_metamask-icon.svg";
import leon from "../../public/images/token-branded_coinbase.svg";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { CiLock, CiMail } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FaSquareFull } from "react-icons/fa";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // Check if user is already logged in (e.g. after clicking email confirmation)
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      router.push("/"); // Redirect to home/dashboard
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Invalid login credentials");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-xl">
          <DialogHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-[#0C1F47]">
              Login Failed
            </DialogTitle>
            <DialogDescription className="text-center text-base text-gray-600 pt-2">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-[#EAAA21] hover:bg-[#d4991f] text-black font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Left Column - Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="col-span-12 md:col-span-6 p-8 md:p-12 flex flex-col justify-between"
      >
        <motion.div variants={itemVariants}>
          <Image src={Logo} width={244} alt="Cre8core Logo" priority />
        </motion.div>

        <div className="px-6 flex flex-col space-y-6 mt-10 md:mt-20">
          <motion.p variants={itemVariants} className="italic text-[18px] font-light">Build. Earn. Ship</motion.p>

          <motion.h1 variants={itemVariants} className="text-[40px] md:text-[48px] font-medium leading-[1.2]">
            Your gateway to blockchain opportunities. Create, build, and earn on
            <span className="text-[#EAAA21]"> BASE.</span>
          </motion.h1>
          <motion.ul variants={itemVariants} className="w-full space-x-2 flex flex-wrap text-[18px] md:text-[24px] text-[#666666] gap-y-2">
            <li className="flex items-center space-x-2">
              {" "}
              <RiCheckboxCircleFill color="#0C1F47" />{" "}
              <span>10,000+ Active Users</span>
            </li>
            <li className="flex items-center space-x-2">
              <RiCheckboxCircleFill color="#0C1F47" />{" "}
              <span>2M+ In Bounties</span>
            </li>
            <li className="flex items-center space-x-2">
              <RiCheckboxCircleFill color="#0C1F47" />{" "}
              <span>500+ Projects Launched</span>
            </li>
          </motion.ul>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center w-full max-w-[600px] mx-auto items-center mt-8 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={ImageLanding} className="w-full h-auto" alt="Landing Image" priority />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center text-[#030406] mt-8 md:mt-0">
          <span className="flex items-center gap-5">
            Powered on
            <span>
              <FaSquareFull color="#1500fe" />
            </span>
            BASE
          </span>
        </motion.div>
      </motion.div>

      {/* Right Column - Form */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="col-span-12 md:col-span-6 bg-linear-to-r from-[#0C1F47] from-30% to-[#1D4CAD] text-white overflow-y-auto"
      >
        <div className="w-[90%] mx-auto flex flex-col gap-8 md:gap-12 py-16 justify-center min-h-full">
          <div className="flex flex-col items-center">
            <h3 className="text-[24px] font-semibold">Welcome Back!</h3>
            <p className="font-light text-[#D9D8D8]">
              Sign in to your account by connecting your wallet
            </p>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="w-full flex flex-col gap-5">
              <button className="w-full flex gap-2 items-center justify-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4 hover:bg-white/10 transition-colors">
                <span>
                  <Image
                    width={24}
                    height={24}
                    src={meta}
                    alt="MetaMask Logo"
                  />
                </span>{" "}
                MetaMask
              </button>
              <button className="w-full flex gap-2 items-center justify-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4 hover:bg-white/10 transition-colors">
                <span>
                  <Image
                    width={24}
                    height={24}
                    src={leon}
                    alt="Coinbase Logo"
                  />
                </span>{" "}
                Coinbase
              </button>
            </div>
            <div className="flex items-center w-full space-x-4 text-white my-12">
              <hr className="w-full border-white/25" />
              <span>Or</span>
              <hr className="w-full border-white/25" />
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex items-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <CiMail size={20} />
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <CiLock size={20} />
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <span className="w-full items-center flex justify-between text-[12px] mt-4 px-1 font-light">
              <span className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className="bg-violet-100 cursor-pointer"
                />
                <label htmlFor="checkbox" className="cursor-pointer">Remember me</label>
              </span>
              <span className="cursor-pointer hover:underline">Forgot password?</span>
            </span>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-linear-to-r to-[#EFEFEF] hover:bg-linear-to-l hover:to-[#EFEFEF] hover:from-[#3B5488] from-[#3B5488] to-20% text-black py-4 px-6 rounded-4xl my-6 font-montserrat disabled:opacity-50 transition-all font-semibold"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <span className="text-[14px] text-[#EFEFEFE8]">
              Don’t have an account yet?{" "}
              <span
                className="text-[#EBB643] cursor-pointer hover:underline"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
