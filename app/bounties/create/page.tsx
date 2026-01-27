"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import StatusModal from "@/components/common/StatusModal";
import PaymentModal from "@/components/common/PaymentModal";

const CreateBounty = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Video", // Default to first valid option
    type: "Contest",   // Default to first valid option
    deadline: "",
    sponsor: "BASE",
    imageUrl: "",
  });

  // State for segmented prize pool
  const [prizes, setPrizes] = useState([{ position: "1st Place", amount: "" }]);

  const addPrizeRow = () => {
    const nextPos = prizes.length + 1;
    let positionLabel = `${nextPos}th Place`;
    if (nextPos === 2) positionLabel = "2nd Place";
    if (nextPos === 3) positionLabel = "3rd Place";
    setPrizes([...prizes, { position: positionLabel, amount: "" }]);
  };

  const removePrizeRow = (index: number) => {
    if (prizes.length > 1) {
      const newPrizes = prizes.filter((_, i) => i !== index);
      setPrizes(newPrizes);
    }
  };

  const updatePrize = (index: number, field: "position" | "amount", value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index] = { ...newPrizes[index], [field]: value };
    setPrizes(newPrizes);
  };

  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bounty_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('bounty_images').getPublicUrl(filePath);

      setFormData({ ...formData, imageUrl: data.publicUrl });

    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

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
    if (modalState.title === "Access Denied" || modalState.title === "Authentication Required") {
      router.push("/");
    }
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    const total = prizes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    if (total <= 0) {
      alert("Please ensure the total prize pool is greater than 0.");
      return;
    }
    setCurrentTotalAmount(total);
    setIsPaymentModalOpen(true);
  };

  const submitToSupabase = async (txHash: string) => {
    setIsPaymentModalOpen(false);
    setLoading(true);

    try {
      // Calculate total prize pool
      const totalAmount = prizes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      // Format full prize string
      // e.g. "5000 USDC (1st: 2500, 2nd: 1500, 3rd: 1000)"
      const breakdown = prizes.map(p => `${p.position}: ${p.amount}`).join(", ");
      const formattedPrizePool = `${totalAmount} USDC (${breakdown})`;

      // Verify Transaction
      const verificationResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txHash }),
      });

      const verificationResult = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(verificationResult.error || 'Payment verification failed');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to post a bounty");

      const { data, error } = await supabase.from("bounties").insert([
        {
          title: formData.title,
          description: `${formData.description}\n\n**Payment Verification**\nTx Hash: ${txHash}\nVerified: Yes`,
          category: formData.category,
          // type: formData.type, // Assuming type column might not exist or isn't used yet in DB based on previous code comment
          prize_pool: formattedPrizePool,
          deadline: formData.deadline,
          sponsor: formData.sponsor,
          status: "pending", // Keep as pending for now so it shows up in admin tab which filters for 'pending'
          winners_count: prizes.length,
          image_url: formData.imageUrl,
          user_id: user.id
        },
      ]);

      if (error) throw error;

      setModalState({
        isOpen: true,
        type: "success",
        title: "Bounty Submitted!",
        message: "Your bounty has been submitted for review. It will be live once approved by our team.",
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
    <div className="w-full max-w-5xl px-4 md:px-0 mx-auto my-10">
      <div className="flex flex-col items-center space-y-1 my-7 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Post a Bounty</h1>
        <p className="text-[#666666] text-sm font-montserrat">
          Create opportunities for talented creators and developers on Base
        </p>
      </div>
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <form onSubmit={handleReview}>
            <div className="flex flex-col space-y-1 ">
              <h1 className="text-2xl md:text-[32px] font-semibold">Bounty Details</h1>
              <p className="text-[#666666] text-sm font-montserrat">
                Fill in the information about your bounty or sprint
              </p>
            </div>

            <div className="flex flex-col space-y-6 mt-10">
              {/* Sponsor & Logo Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Project Logo</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Project" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs">No Logo</span>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        disabled={uploading}
                        className="block w-full text-sm text-slate-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-[#EBB643]/10 file:text-[#EBB643]
                                  hover:file:bg-[#EBB643]/20
                                "
                      />
                      {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                    </div>
                  </div>
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
                    <option value="Contest">Contest</option>
                    <option value="Sprint">Sprint</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Prize Pool Section */}
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-medium">
                    Prize Pool Breakdown <span className="text-red-500">*</span>
                  </label>
                  <button type="button" onClick={addPrizeRow} className="text-sm text-[#E4B95C] font-semibold hover:underline">
                    + Add Position
                  </button>
                </div>

                {prizes.map((prize, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={prize.position}
                      onChange={(e) => updatePrize(index, "position", e.target.value)}
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#E4B95C] w-1/3"
                      placeholder="Position (e.g. 1st)"
                    />
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={prize.amount}
                        onChange={(e) => updatePrize(index, "amount", e.target.value)}
                        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#E4B95C]"
                        placeholder="Amount (USDC)"
                      />
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">USDC</span>
                    </div>
                    {prizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePrizeRow(index)}
                        className="text-red-500 font-bold px-2 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <div className="text-right text-sm font-medium text-gray-600">
                  Total Pool: {prizes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)} USDC
                </div>
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

              <div className="w-full flex flex-col md:flex-row items-center gap-4 mt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#E4B95C] w-full text-black py-4 rounded-3xl text-lg hover:bg-[#E4B95C]/80 font-semibold flex-1"
                >
                  {loading ? "Posting..." : "Post Bounty"}
                </Button>
                <button
                  className="w-full border py-4 rounded-3xl border-[#E4B95C] text-lg text-black hover:bg-[#E4B95C]/10 font-semibold flex-1"
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

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={submitToSupabase}
        bountyAmount={currentTotalAmount}
        serviceFeePercent={20}
      />

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
