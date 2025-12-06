"use client";

import Image from "next/image";
import React, { useState } from "react";
import profileData from "../../../public/icons/profileicon.svg";

const CreateBounty = () => {
  return (
    <div className="max-w-[80%] mx-auto my-10">
      <div className="flex flex-col items-center space-y-1 my-7 text-center">
        <h1 className="text-[48px]">Post a Bounty</h1>
        <p className="text-[#666666] text-sm font-montserrat">
          Create opportunities for talented creators and developers on Base
        </p>
      </div>
      <div className="bg-white px-10 py-8  rounded-2xl ">
        <div>
          <form action="">
            <div className="flex flex-col space-y-1 ">
              <h1 className="text-[32px]">Bounty Details</h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Fill in the information about your bounty or hackathon
              </p>
            </div>
            <div className="flex flex-col space-y-6 mt-10 ">
              <div className="flex flex-col space-y-2">
                <label htmlFor="bountyTitle" className=" font-medium">
                  Bounty Title
                </label>
                <input
                  type="text"
                  id="bountyTitle"
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Enter the title of your bounty"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="description" className=" font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={10}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Describe what you want to build, the requirements, and any specific details..."
                ></textarea>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="bountyType" className=" font-medium">
                    Bounty Type
                  </label>
                  <input
                    type="text"
                    id="bountyType"
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="category" className=" font-medium">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="border border-gray-300 rounded-md p-2 font-montserrat"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="avatarUrl" className=" font-medium">
                    $ Prize Pool (USDC)
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="@alexdev"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="name" className=" font-medium">
                    May 22, 2025
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="location" className=" font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Remote or physical address"
                />
              </div>

              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="bg-[#E4B95C] w-full text-black py-3  rounded-3xl text-sm hover:bg-[#E4B95C]/50 flex-1"
                >
                  Post a Bounty
                </button>
                <button
                  className="w-full md:w-[300px] border py-3 rounded-3xl border-[#E4B95C] text-sm text-black hover:bg-[#E4B95C]/10 "
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBounty;
