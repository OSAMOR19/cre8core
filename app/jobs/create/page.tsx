"use client";

import React, { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import StatusModal from "@/components/common/StatusModal";

const CreateJobPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([
    "javascript",
    "react",
    "nextjs",
  ]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary_range: "",
    jobType: "Full-Time",
    workType: "Remote",
    description: "",
    requirements: "",
    benefits: "",
    aboutCompany: "",
    companyLogo: "" // Optional: URL or Initials
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success") {
      router.push("/jobs");
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("jobs").insert([
        {
          title: formData.title,
          company: formData.company,
          location: formData.location || "Remote",
          salary_range: formData.salary_range,
          description: formData.description + "\n\nRequirements:\n" + formData.requirements + "\n\nBenefits:\n" + formData.benefits,
          tags: skills,
          equity: "Aggressive", // Defaulting for now
          closes_in: "30 Days",
          color_theme: "bg-blue-100 text-blue-600",
          applicants_count: 0,
          logo_url: formData.companyLogo
        },
      ]);

      if (error) throw error;

      setModalState({
        isOpen: true,
        type: "success",
        title: "Job Posted!",
        message: "Your job listing has been successfully created and is now live.",
      });

    } catch (error: any) {
      console.error("Error creating job:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message: error.message || "Something went wrong while posting the job. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 max-w-[80%] my-16 rounded-2xl mx-auto">
      {/* ... (keep existing JSX content inside the div) */}
      <div>
        <div>
          <h1 className="text-[32px] font-bold">Post a Job</h1>
          <p className="text-[#666666] text-sm font-montserrat">
            Find the best Web3 talent on BASE blockchain
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="title" className=" font-medium">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="e.g  Senior smart contract developer"
                />
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="company" className=" font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 "
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="jobType" className=" font-medium">
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 bg-white"
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="workType" className=" font-medium">
                    Work Type
                  </label>
                  <select
                    id="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 bg-white"
                  >
                    <option>Remote</option>
                    <option>On-Site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label htmlFor="salary_range" className=" font-medium">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salary_range"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 font-montserrat"
                    placeholder="e.g. $100k - $150k"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="location" className=" font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="e.g San Francisco or Global Remote"
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
                <label htmlFor="description" className=" font-medium">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="Describe the role, responsibilty, & what the candidate will be working on..."
                ></textarea>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="requirements" className=" font-medium">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 "
                  placeholder="List the skills, experience, and qualifications required..."
                ></textarea>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="benefits" className=" font-medium">
                  Benefits & Perks
                </label>
                <textarea
                  id="benefits"
                  rows={4}
                  value={formData.benefits}
                  onChange={handleChange}
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
                <label htmlFor="aboutCompany" className=" font-medium">
                  About Your Company
                </label>
                <textarea
                  id="aboutCompany"
                  rows={4}
                  value={formData.aboutCompany}
                  onChange={handleChange}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddSkill(e);
                    }}
                  />

                  <button
                    onClick={(e) => handleAddSkill(e)}
                    type="button"
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
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#E4B95C] w-full text-black py-6 rounded-3xl text-sm hover:bg-[#E4B95C]/50 flex-1 font-semibold text-lg"
                >
                  {loading ? "Posting Job..." : "Post Job Opportunity"}
                </Button>
                <button
                  className="w-full md:w-[300px] border py-4 rounded-3xl border-[#E4B95C] text-sm text-black hover:bg-[#E4B95C]/10 font-medium"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <StatusModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onClose={closeModal}
      />
    </div>
  );
};

export default CreateJobPage;
