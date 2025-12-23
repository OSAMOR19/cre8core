"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import StatusModal from "@/components/common/StatusModal";

const CreateBounty = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Development",
    type: "Traditional",
    prize_pool: "",
    deadline: "",
    location: "Remote",
    sponsor: "BASE", // Default or user's company
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
      router.push("/bounties");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("bounties").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          // type: formData.type, 
          prize_pool: `${formData.prize_pool} USDC`,
          deadline: formData.deadline,
          sponsor: formData.sponsor,
          status: "Open",
          winners_count: 5
        },
      ]);

      if (error) throw error;

      setModalState({
        isOpen: true,
        type: "success",
        title: "Bounty Posted!",
        message: "Your bounty has been successfully created and is now live on the platform.",
      });

    } catch (error: any) {
      console.error("Error creating bounty:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message: error.message || "Something went wrong while posting your bounty. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[80%] mx-auto my-10">
      <div className="flex flex-col items-center space-y-1 my-7 text-center">
        <h1 className="text-[48px] font-bold">Post a Bounty</h1>
        <p className="text-[#666666] text-sm font-montserrat">
          Create opportunities for talented creators and developers on Base
        </p>
      </div>
      <div className="bg-white px-10 py-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1 ">
              <h1 className="text-[32px] font-semibold">Bounty Details</h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Fill in the information about your bounty or hackathon
              </p>
            </div>
            <div className="flex flex-col space-y-6 mt-10 ">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="font-medium">
                  Bounty Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                  placeholder="e.g., Build a DEX Aggregator"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={8}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                  placeholder="Describe requirements, deliverables, and judging criteria..."
                ></textarea>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="category" className="font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                  >
                    <option value="Development">Development</option>
                    <option value="Video">Video</option>
                    <option value="Meme">Meme</option>
                    <option value="Threads">Threads</option>
                    <option value="Sprints">Sprints</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="type" className="font-medium">
                    Bounty Type
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Contest">Contest</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="prize_pool" className="font-medium">
                    Prize Pool (USDC) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="prize_pool"
                    required
                    value={formData.prize_pool}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="deadline" className="font-medium">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="location" className="font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                    placeholder="e.g., Remote, San Francisco"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="sponsor" className="font-medium">
                    Sponsor Name
                  </label>
                  <input
                    type="text"
                    id="sponsor"
                    value={formData.sponsor}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                    placeholder="e.g., BASE"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row items-center gap-4 mt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#E4B95C] w-full text-black py-6 rounded-3xl text-sm hover:bg-[#E4B95C]/80 flex-1 font-semibold text-lg"
                >
                  {loading ? "Posting..." : "Post Bounty"}
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
          </form>
        </div>
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
export default CreateBounty;
