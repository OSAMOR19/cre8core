import React from "react";
import { CiUser } from "react-icons/ci";
import { RiCheckboxBlankFill, RiCodeSFill } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";

const MainBounty = () => {
  return (
    <div>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-3 md:flex-row justify-between my-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="bg-[#D5DCEB61] p-3 rounded-full flex justify-center items-center">
              <RiCodeSFill size={24} />
            </span>
            <span className="flex flex-col gap-4">
              <span className="flex flex-col md:flex-row gap-4">
                <span className="bg-[#E4B95C] px-6 py-2 text-white rounded-full">
                  Development
                </span>
                <span className="bg-[#3E800729] px-6 py-2  rounded-full">
                  Open
                </span>
              </span>
              <span className="font-nunito text-2xl font-semibold">
                Build DEX Aggregator
              </span>
              <span className="font-montserrat text-sm">
                Deadline : April 23, 2025
              </span>
            </span>
          </div>
          <div className="flex flex-col md:text-right">
            <span className="flex items-center gap-2 font-light text-4xl">
              <TbMoneybag />
              <span>{"1000 USDC"}</span>
            </span>
            <span className="font-montserrat ">Total Reward</span>
          </div>
        </div>

        <div className="bg-[#EBEDF3] flex gap-3 items-center p-3 rounded-lg">
          <RiCheckboxBlankFill color="#0000FF" size={24} />
          <span>
            <h2 className="text-lg font-semibold">
              Sponsored by Base Protocol
            </h2>
            <p className="font-montserrat text-[#030406B8]">
              Building The Future Of Decentralized Exchange Infrastructure
            </p>
          </span>
        </div>
        <div className="bg-[#DCBD7A36] p-5 rounded-2xl my-5">
          <h5 className="text-[#9B6A00] text-lg font-nunito my-1">
            $ Prize Pool: 5000 USDC
          </h5>
          <span className="flex items-center gap-2 font-montserrat">
            <CiUser color="#9B6A00" size={24} /> Winners: 5
          </span>

          <div className="mt-3 space-y-2 font-montserrat">
            <span className="flex justify-between items-center">
              <span>1st Place</span>
              <span>2000 USDC</span>
            </span>
            <span className="flex justify-between items-center">
              <span>2nd Place</span>
              <span>1500 USDC</span>
            </span>
            <span className="flex justify-between items-center">
              <span>3rd Place</span>
              <span>1000 USDC</span>
            </span>
            <span className="flex justify-between items-center">
              <span>4th Place</span>
              <span>500 USDC</span>
            </span>
            <span className="flex justify-between items-center">
              <span>5th Place</span>
              <span>5000 USDC</span>
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
          <p className="font-montserrat text-[#030406B8]">
            We're looking for talented developers to build a comprehensive DEX
            aggregator that provides users with optimal trading routes across
            multiple decentralized exchanges on the BASE network. This project
            aims to enhance liquidity access and reduce slippage for traders
            while maintaining the highest security standards.
          </p>
          <div className="bg-[#EBEDF3] my-3 p-3">
            <h6 className="font-semibold">Key Objectives</h6>
            <ul className="list-disc ml-4 font-montserrat text-[#030406B8] mt-2">
              <li>
                Aggregate liquidity from major BASE DEXs including Uniswap V3,
                SushiSwap, and Curve.
              </li>
              <li>
                Implement smart routing algorithms to find optimal trading paths
              </li>
              <li>
                Provide real-time price comparison and slippage estimation
              </li>
              <li>Ensure MEV protection and optimal execution for users</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="p-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Project Timeline & Milestones
          </h2>
          <ul className=" w-full ml-6 space-y-6 font-montserrat text-[#030406B8]">
            <li className="flex gap-3">
              <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">
                1
              </span>
              <span className="flex flex-col space-y-2 flex-1">
                <span className="flex justify-between">
                  <strong>Research Architecture Design</strong>
                  <span>Week 1-2</span>
                </span>
                <span>
                  Protocol research, system architecture, smart contract design,
                  and technical specifications.
                </span>
                <span className="text-[#9B6A00]">Reward: 300 USDC</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">
                2
              </span>
              <span className="flex flex-col space-y-2 flex-1">
                <span className="flex justify-between">
                  <strong>Core Development</strong>
                  <span>Week 3-5</span>
                </span>
                <span>
                  Smart contract development, routing algorithms, frontend
                  interface, and basic integrations.
                </span>
                <span className="text-[#9B6A00]">Reward: 600 USDC</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">
                3
              </span>
              <span className="flex flex-col space-y-2 flex-1">
                <span className="flex justify-between">
                  <strong>Testing & Optimization</strong>
                  <span>Week 6-7</span>
                </span>
                <span>
                  Comprehensive testing, security audits, performance
                  optimization, and bug fixes.
                </span>
                <span className="text-[#9B6A00]">Reward: 300 USDC</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-12 h-12 bg-[#122E69] text-white flex justify-center items-center rounded-2xl">
                4
              </span>
              <span className="flex flex-col space-y-2 flex-1">
                <span className="flex justify-between">
                  <strong>Deployment & Documentation</strong>
                  <span>Week 8-9</span>
                </span>
                <span>
                  Mainnet deployment, comprehensive documentation, and user
                  guides.
                </span>
                <span className="text-[#9B6A00]">Reward: 300 USDC</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="p-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-6">Evaluation Criteria</h2>
          <ul className=" w-full space-y-6 font-montserrat text-[#030406B8]">
            <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
              <span className="flex flex-col space-y-2 flex-1">
                <strong>Research Architecture Design</strong>
                <span>
                  Protocol research, system architecture, smart contract design,
                  and technical specifications.
                </span>
              </span>
              <span className="text-[#9B6A00]">40%</span>
            </li>
            <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
              <span className="flex flex-col space-y-2 flex-1">
                <strong>User Experience</strong>
                <span>Interface design, usability, and performance</span>
              </span>
              <span className="text-[#9B6A00]">25%</span>
            </li>
            <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
              <span className="flex flex-col space-y-2 flex-1">
                <strong>Innovation & Features</strong>
                <span>Unique features and creative solutions</span>
              </span>
              <span className="text-[#9B6A00]">20%</span>
            </li>
            <li className="flex justify-between items-center rounded-2xl bg-[#F7F8FB] p-4 gap-3">
              <span className="flex flex-col space-y-2 flex-1">
                <strong>Documentation & Testing</strong>
                <span>Code documentation and test coverage</span>
              </span>
              <span className="text-[#9B6A00]">15%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainBounty;
