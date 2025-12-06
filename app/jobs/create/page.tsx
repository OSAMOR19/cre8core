"use client";

import React, { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { PiSuitcaseSimpleLight } from "react-icons/pi";

const CreateJobPage = () => {
  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([
    "javascript",
    "react",
    "nextjs",
  ]);

  const handleAddSkill = (e: any) => {
    e.preventDefault();
    if (skill.trim() !== "" && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (item: string): void => {
    setSkills(skills.filter((s) => s !== item));
  };
  return (
    <div className="border p-6 max-w-[80%] my-16 rounded-2xl mx-auto">
      <div>
        <div>
          <h1 className="text-[32px] font-bold">Post a Job</h1>
          <p className="text-[#666666] text-sm font-montserrat">
            Find the best Web3 talent on BASE blockchain
          </p>
        </div>
        <form action="">
          <div className="flex flex-col space-y-6 mt-10 ">
            <div className="bg-white p-6 rounded-2xl space-y-6">
              <div>
                <h1 className="text-[24px] flex items-center gap-2 ">
                  <PiSuitcaseSimpleLight size={24} color="#DCBD7A" /> Job
                  Details
                </h1>
                <p className="text-[#666666] text-sm font-montserrat">
                  Basic information about the position
                </p>
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="jobTitle" className=" font-medium">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="e.g  Senior smart contract developer"
                />
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="companyName" className=" font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="jobType" className=" font-medium">
                    Job Type
                  </label>
                  <input
                    type="text"
                    id="jobType"
                    className="border border-gray-300 rounded-md p-2 font-montserrat"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="workType" className=" font-medium">
                    Work Type
                  </label>
                  <input
                    type="text"
                    id="workType"
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="salaryRange" className=" font-medium">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salaryRange"
                    className="border border-gray-300 rounded-md p-2 font-montserrat"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="jobTitle" className=" font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="e.g  Senior smart contract developer"
                />
              </div>
            </div>
            <div>
              <h1 className="text-[24px] flex items-center gap-2 ">
                <LuUsers size={24} color="#DCBD7A" /> Job Description
              </h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Tell candidates about the role
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="bio" className=" font-medium">
                  Description *
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Describe the role, responsibilty, & what the candidate will be working on..."
                ></textarea>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="bio" className=" font-medium">
                  Requirements
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="List the skills, experience, and qualifications required..."
                ></textarea>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="bio" className=" font-medium">
                  Benefits & Perks
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="List the benefits, perks and what make the company great..."
                ></textarea>
              </div>
            </div>
            <div>
              <h1 className="text-[24px] flex items-center gap-2 ">
                <FaRegBuilding size={24} color="#DCBD7A" /> Company Information
              </h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Help candidates learn about your company
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="bio" className=" font-medium">
                  About Your Company
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Tell candidates about your company, mission,  and culture..."
                ></textarea>
              </div>
            </div>

            <div>
              <h1 className="text-[24px] flex items-center gap-2 ">
                <GoPlus size={24} color="#DCBD7A" /> Skills & Tags
              </h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Add relevant skills and technologies (max 8)
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl space-y-6">
              <div className="w-full">
                <label className="block mb-2 font-medium">Skills</label>

                {/* Input Row */}
                <div className="flex flex-col md:flex-row items-center gap-3 border rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="flex-1 outline-none"
                  />

                  <button
                    onClick={(e) => handleAddSkill(e)}
                    className="bg-[#E4B95C] text-black text-sm px-14 py-3 rounded-full hover:opacity-80"
                  >
                    Add
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {skills.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeSkill(item)}
                        className="font-bold text-gray-500 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="bg-[#E4B95C] w-full text-black py-3  rounded-3xl text-sm hover:bg-[#E4B95C]/50 flex-1"
                >
                  Save Changes
                </button>
                <button
                  className="w-full md:w-[300px] border py-3 rounded-3xl border-[#E4B95C] text-sm text-black hover:bg-[#E4B95C]/10 "
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
