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
import icon1 from "../../public/icons/box.svg";
import icon2 from "../../public/icons/money.svg";
import icon3 from "../../public/icons/badge.svg";
import icon4 from "../../public/icons/globe.svg";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    username: "",
    nationality: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            username: formData.username,
            nationality: formData.nationality,
            role: formData.role,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.message || "An error occurred during signup");
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
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Mail className="h-8 w-8 text-[#0C1F47]" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-[#0C1F47]">
              Check your inbox
            </DialogTitle>
            <DialogDescription className="text-center text-base text-gray-600 pt-2">
              We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>.
              <br />
              Please click the link to confirm your account and access the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-[#EAAA21] hover:bg-[#d4991f] text-black font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Back to Login
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Left Column Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="col-span-12 md:col-span-6 p-8 md:p-12 flex flex-col justify-between"
      >
        <motion.div variants={itemVariants}>
          <Image src={Logo} width={244} alt="Cre8core Logo" priority />
        </motion.div>

        <div className="px-6 flex flex-col space-y-6 mt-10 md:mt-10">
          <motion.p variants={itemVariants} className="italic text-[18px] font-light">
            Join the builders on BASE
          </motion.p>

          <motion.h1 variants={itemVariants} className="text-[40px] md:text-[48px] font-medium leading-[1.2]">
            Start earning from your skills today. Access exclusive jobs,
            bounties, and hackathons in the Web3 ecosystem.
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

          <motion.div variants={itemVariants} className="mt-5">
            <h4 className="text-[24px] font-semibold mb-4">What You Get</h4>
            <ul className="space-y-4 text-[#666666]">
              <li className="flex items-start gap-3">
                <Image src={icon1} alt="icon" className="shrink-0 mt-1" />
                <span>Access premium jobs connect with top Web3 companies hiring on Base</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src={icon2} alt="icon" className="shrink-0 mt-1" />
                <span>Earn from bounties complete tasks and get paid instantly onchain</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src={icon3} alt="icon" className="shrink-0 mt-1" />
                <span>Compete in hackathons build innovative projects and in prizes</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src={icon4} alt="icon" className="shrink-0 mt-1" />
                <span>Join 10,000+ builders network with the best in the Base ecosystem</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center w-full max-w-[500px] mx-auto items-center mt-8 md:mt-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
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

      {/* Right Column Form */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="col-span-12 md:col-span-6 bg-linear-to-r from-[#0C1F47] from-30% to-[#1D4CAD] text-white overflow-y-auto"
      >
        <div className="w-[90%] mx-auto flex flex-col gap-12 py-16 justify-center min-h-full">
          <div className="flex flex-col space-y-2 items-center">
            <h3 className="text-[24px] font-semibold">Create Your Account!</h3>
            <p className="font-light text-[#D9D8D8]">
              Start building on BASE today
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

            <motion.div
              className="w-full flex flex-col gap-5"
            >
              <div className="flex items-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white placeholder-gray-300"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white placeholder-gray-300"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white placeholder-gray-300"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white placeholder-gray-300"
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white placeholder-gray-300"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full ring-offset-[#0C1F47] focus-within:ring-2 focus-within:ring-[#EAAA21]">
                <span className="text-gray-300">I am a:</span>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger className="flex-1 w-full border-none bg-transparent  focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent text-white">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectGroup>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="uiux_designer">
                        UI/UX designer
                      </SelectItem>
                      <SelectItem value="graphic_designer">
                        Graphic designer
                      </SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="video_creator">
                        Video creator
                      </SelectItem>
                      <SelectItem value="content_writer">
                        Content writer
                      </SelectItem>
                      <SelectItem value="video_animator">
                        Video animator
                      </SelectItem>
                      <SelectItem value="product_manager">
                        Product manager
                      </SelectItem>
                      <SelectItem value="kol">KOL</SelectItem>
                      <SelectItem value="community_manager">
                        Community manager
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <span className="w-full items-center flex justify-center text-[12px] mt-6 px-1 font-light">
              <span className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className="bg-violet-100 cursor-pointer"
                />
                <label htmlFor="checkbox" className="cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </span>
            </span>
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-linear-to-r to-[#EFEFEF] hover:bg-linear-to-l hover:to-[#EFEFEF] hover:from-[#3B5488] from-[#3B5488] to-20% text-black py-4 px-6 rounded-4xl my-6 font-montserrat disabled:opacity-50 transition-all font-semibold">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <span className="text-[14px] text-[#EFEFEFE8]">
              Already have an account yet?
              <span
                className="text-[#EBB643] cursor-pointer hover:underline pl-1"
                onClick={() => router.push("/login")}
              >
                Sign in
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Signup;
