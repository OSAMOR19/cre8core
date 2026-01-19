"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoArrowBack, IoCloudUploadOutline } from "react-icons/io5";
import StatusModal from "@/components/common/StatusModal";
import { motion } from "framer-motion";

const SubmitWorkPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [bountyTitle, setBountyTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    link: "",
  });
  const [file, setFile] = useState<File | null>(null);
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

  useEffect(() => {
    const fetchBounty = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("bounties")
        .select("title")
        .eq("id", id)
        .single();
      if (data) setBountyTitle(data.title);
    };
    fetchBounty();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      let fileUrl = "";

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("submission-files")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Since bucket is private, we store the path or get a signed URL. 
        // For simplicity in this demo, let's assume we store the path or a public URL if we made it public.
        // But the script made it private. Ideally we store the path.
        // Let's store the full path for now.
        fileUrl = fileName; 
      }

      const { error } = await supabase.from("bounty_submissions").insert([
        {
          bounty_id: id,
          user_id: user.id,
          content: formData.content,
          link: formData.link,
          file_url: fileUrl,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setModalState({
        isOpen: true,
        type: "success",
        title: "Submission Received!",
        message: "Your work has been successfully submitted for review.",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success") {
      router.push(`/bounties/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 pl-0 hover:bg-transparent hover:text-[#E4B95C] transition-colors"
        >
          <IoArrowBack className="mr-2" /> Back to Bounty
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-nunito">
              Submit Your Work
            </h1>
            <p className="text-gray-500">
              For: <span className="font-semibold text-[#E4B95C]">{bountyTitle || "Loading..."}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Description / Notes <span className="text-red-500">*</span>
                </label>
                <Textarea
                  required
                  rows={6}
                  placeholder="Describe your submission, methodology, or any notes for the reviewers..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  External Link (Github, Drive, etc.)
                </label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-6 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Upload File (Optional)
                </label>
                <div className="relative group">
                  <div className="relative w-full h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all bg-gray-50 group-hover:border-[#E4B95C] group-hover:bg-[#E4B95C]/5">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-center p-4">
                      {file ? (
                        <div className="flex items-center gap-2 text-[#E4B95C] font-medium">
                          <IoCloudUploadOutline size={24} />
                          {file.name}
                        </div>
                      ) : (
                        <>
                          <div className="mx-auto h-10 w-10 text-gray-400 mb-2 group-hover:text-[#E4B95C] transition-colors">
                            <IoCloudUploadOutline size={32} />
                          </div>
                          <p className="text-sm text-gray-500 font-medium">
                            Click to upload or drag and drop
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E4B95C] text-black py-6 rounded-2xl text-lg font-bold hover:bg-[#E4B95C]/90 shadow-lg shadow-[#E4B95C]/20 transition-all"
            >
              {loading ? "Submitting..." : "Submit Entry"}
            </Button>
          </form>
        </motion.div>
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

export default SubmitWorkPage;
