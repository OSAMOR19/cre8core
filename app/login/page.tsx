"use client";
import React from "react";
import Logo from "../../public/images/logo.svg";
import Image from "next/image";
import ImageLanding from "../../public/images/landingIcon.svg";
import meta from "../../public/images/logos_metamask-icon.svg";
import leon from "../../public/images/token-branded_coinbase.svg";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { CiLock, CiMail } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FaSquareFull } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-6">
        <Image src={Logo} width={244} alt="Cre8core Logo" />
        <div className="px-6  -mt-11 flex flex-col space-y-6">
          <p className="italic text-[18px] font-light">Build. Earn. Ship</p>

          <h1 className="text-[48px] font-medium leading-[1.2]">
            Your gateway to blockchain opportunities. Create, build, and earn on
            <span className="text-[#EAAA21]"> BASE.</span>
          </h1>
          <ul className="w-full space-x-2 flex flex-wrap text-[24px] text-[#666666]">
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
          </ul>
        </div>
        <div className="flex justify-center w-[600px] mx-auto items-center">
          <Image src={ImageLanding} className="w-full" alt="Landing Image" />
        </div>
        <div className="flex justify-center text-[#030406]">
          <span className="flex items-center gap-5">
            Powered on
            <span>
              <FaSquareFull color="#1500fe" />
            </span>
            BASE
          </span>
        </div>
      </div>
      <div className="col-span-6 bg-linear-to-r from-[#0C1F47] from-30% to-[#1D4CAD] text-white">
        <div className="w-[90%] mx-auto flex flex-col gap-12 py-16 justify-center h-full">
          <div className="flex flex-col items-center">
            <h3 className="text-[24px] font-semibold">Welcome Back!</h3>
            <p className="font-light text-[#D9D8D8]">
              Sign in to your account by connecting your wallet
            </p>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="w-full flex flex-col gap-5">
              <button className="w-full flex gap-2 items-center justify-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4">
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
              <button className="w-full flex gap-2 items-center justify-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4">
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
              <div className="flex items-center bg-linear-to-r border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full">
                <CiMail size={20} />
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  id=""
                />
              </div>
              <div className="flex bg-linear-to-r items-center border from-[#8E8E8E]/30 to-[#FFFFFF]/30 text-white py-4 px-6 rounded-xl space-x-4  w-full">
                <CiLock size={20} />
                <input
                  className="flex-1 bg-transparent focus:outline-none active:bg-transparent p-1 focus:bg-transparent autofill:bg-transparent"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id=""
                />
              </div>
            </div>
            <span className="w-full items-center flex justify-between text-[12px] mt-4 px-1 font-light">
              <span className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className="bg-violet-100"
                />
                <label htmlFor="checkbox">Remember me</label>
              </span>
              <span>Forgot password?</span>
            </span>
            <button className="w-full bg-linear-to-r to-[#EFEFEF] hover:bg-linear-to-l hover:to-[#EFEFEF] hover:from-[#3B5488] from-[#3B5488] to-20% text-black py-4 px-6 rounded-4xl my-6 font-montserrat">
              Sign In
            </button>
            <span className="text-[14px] text-[#EFEFEFE8]">
              Don’t have an account yet?{" "}
              <span
                className="text-[#EBB643] cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
