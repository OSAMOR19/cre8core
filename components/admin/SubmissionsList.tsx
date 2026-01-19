"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoOpenOutline } from "react-icons/io5";
import { Bounty, BountySubmission } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import StatusModal from "@/components/common/StatusModal";

type ExtendedSubmission = BountySubmission & {
  bounties: {
    title: string;
    sponsor: string;
  };
  profiles: {
    full_name: string;
    username: string;
    email: string;
    avatar_url: string;
  };
};

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState<ExtendedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
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
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const { data: submissionsData, error } = await supabase
          .from("bounty_submissions")
          .select(`
            *,
            bounties:bounty_id (
              title,
              sponsor
            ),
            profiles:user_id (
              full_name,
              username,
              avatar_url,
              email
            )
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSubmissions(submissionsData as any || []);

      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const updateStatus = async (submissionId: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("bounty_submissions")
        .update({ status })
        .eq("id", submissionId);

      if (error) throw error;

      setSubmissions(prev => 
        prev.map(sub => sub.id === submissionId ? { ...sub, status } : sub)
      );

      setModalState({
        isOpen: true,
        type: "success",
        title: status === "approved" ? "Submission Approved" : "Submission Rejected",
        message: `The submission has been successfully ${status}.`,
      });

    } catch (error: any) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No submissions received yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {submissions.map((submission) => (
        <div 
          key={submission.id} 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  {submission.profiles?.avatar_url ? (
                    <img src={submission.profiles.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">?</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{submission.profiles?.full_name || "Unknown User"}</h3>
                  <p className="text-xs text-gray-500">@{submission.profiles?.username} • {new Date(submission.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                ${submission.status === 'approved' ? 'bg-green-100 text-green-700' : 
                  submission.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                  'bg-yellow-100 text-yellow-700'}`
              }>
                {submission.status}
              </span>
            </div>

            <div className="border-l-4 border-[#E4B95C] pl-4 py-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">Submitted for Bounty:</p>
              <p className="font-bold text-gray-900">{submission.bounties?.title}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap">
              {submission.content}
            </div>

            <div className="flex flex-wrap gap-3">
              {submission.link && (
                <a 
                  href={submission.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-[#E4B95C] hover:text-[#E4B95C] transition-colors"
                >
                  <IoOpenOutline /> View External Link
                </a>
              )}
              {submission.file_url && (
                <a 
                  href={`https://svmheciilwfoddglvugc.supabase.co/storage/v1/object/public/submission-files/${submission.file_url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-[#E4B95C] hover:text-[#E4B95C] transition-colors"
                >
                  <IoOpenOutline /> View Uploaded File
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-3 justify-center md:border-l md:pl-6 border-gray-100 pt-4 md:pt-0 min-w-[140px]">
            <Button
              onClick={() => updateStatus(submission.id, "approved")}
              disabled={submission.status === 'approved'}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 w-full"
            >
              <IoCheckmarkCircleOutline size={20} /> Approve
            </Button>
            <Button
              onClick={() => updateStatus(submission.id, "rejected")}
              disabled={submission.status === 'rejected'}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 w-full"
            >
              <IoCloseCircleOutline size={20} /> Reject
            </Button>
          </div>
        </div>
      ))}

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

export default SubmissionsList;
