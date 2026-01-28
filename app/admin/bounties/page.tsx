"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bounty } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import SubmissionsList from "@/components/admin/SubmissionsList";
import WaitlistTab from "@/components/admin/WaitlistTab";

const AdminBounties = () => {
    const router = useRouter();
    const [bounties, setBounties] = useState<Bounty[]>([]);
    const [loading, setLoading] = useState(true);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState<"pending" | "live" | "submissions" | "waitlist">("pending");

    // Confirmation Modal State
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        type: "reject" | "unpublish" | "delete" | null;
        bountyId: string | null;
    }>({
        isOpen: false,
        type: null,
        bountyId: null,
    });
    const [actionLoading, setActionLoading] = useState(false);

    const fetchBounties = async (status: "pending" | "live" | "submissions" | "waitlist") => {
        if (status === "submissions" || status === "waitlist") {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            let query = supabase
                .from("bounties")
                .select("*")
                .order("created_at", { ascending: false });

            if (status === "pending") {
                query = query.in("status", ["pending", "pending_payment"]);
            } else {
                // "live" means "Open" (or essentially not pending/rejected, but user asked for "live")
                query = query.eq("status", "Open");
            }

            const { data, error } = await query;

            if (error) throw error;
            setBounties(data || []);
        } catch (error) {
            console.error("Error fetching bounties:", error);
            // Don't redirect here, just show empty
        } finally {
            setLoading(false);
        }
    };

    const checkAdminAndFetch = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            // check if user is admin in profiles
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            // check if user is in bounties_admins table
            const { data: adminEntry } = await supabase
                .from("bounties_admins")
                .select("email")
                .eq("email", user.email)
                .single();

            const isProfileAdmin = profile?.role === "admin";
            const isBountyAdmin = !!adminEntry;

            if (!isProfileAdmin && !isBountyAdmin) {
                router.push("/"); // Not authorized
                return;
            }

            // Is Admin -> Fetch init tab
            fetchBounties(activeTab);

        } catch (error) {
            console.error("Error accessing admin panel:", error);
            router.push("/");
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAdminAndFetch();
    }, [activeTab]); // added activeTab dependency

    const handleApprove = async (id: string, email: string) => {
        try {
            const { error } = await supabase
                .from("bounties")
                .update({ status: "Open" })
                .eq("id", id);

            if (error) throw error;

            setBounties((prev) => prev.filter((b) => b.id !== id));
            setSuccessMessage("Bounty has been successfully approved and is now live on the platform.");
            setSuccessModalOpen(true);

        } catch (error) {
            console.error("Error approving bounty:", error);
            alert("Failed to approve bounty.");
        }
    };

    const openConfirmModal = (type: "reject" | "unpublish" | "delete", id: string) => {
        setConfirmState({
            isOpen: true,
            type,
            bountyId: id,
        });
    };

    const handleConfirmAction = async () => {
        const { type, bountyId } = confirmState;
        if (!type || !bountyId) return;

        setActionLoading(true);

        try {
            if (type === "reject" || type === "unpublish") {
                const { error } = await supabase
                    .from("bounties")
                    .update({ status: "rejected" })
                    .eq("id", bountyId);

                if (error) throw error;

                setBounties((prev) => prev.filter((b) => b.id !== bountyId));
                // Show success via the status modal if desired, or just close
                // For rejection, usually no success modal is needed, but we can add one if requested.
                // User asked for "message is in a central modal", likely meaning the confirmation itself.
            } else if (type === "delete") {
                const { error } = await supabase.from("bounties").delete().eq("id", bountyId);
                if (error) throw error;

                setBounties((prev) => prev.filter((b) => b.id !== bountyId));
            }

            setConfirmState({ isOpen: false, type: null, bountyId: null });
        } catch (error) {
            console.error(`Error performing ${type}:`, error);
            alert(`Failed to ${type} bounty.`);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === "pending"
                        ? "bg-[#EBB643] text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Pending Reviews
                </button>
                <button
                    onClick={() => setActiveTab("live")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === "live"
                        ? "bg-[#EBB643] text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Live Bounties
                </button>
                <button
                    onClick={() => setActiveTab("submissions")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === "submissions"
                        ? "bg-[#EBB643] text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Submissions
                </button>
                <button
                    onClick={() => setActiveTab("waitlist")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === "waitlist"
                        ? "bg-[#EBB643] text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    Waitlist
                </button>
            </div>

            <p className="text-gray-600 mb-8">
                {activeTab === "pending"
                    ? "Review user-submitted bounties. Approved bounties will go live."
                    : activeTab === "live"
                        ? "Manage currently live bounties on the platform."
                        : activeTab === "waitlist"
                            ? "View all users currently on the waitlist."
                            : "Review and manage user submissions for all bounties."}
            </p>

            {activeTab === "submissions" ? (
                <SubmissionsList />
            ) : activeTab === "waitlist" ? (
                <WaitlistTab />
            ) : loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : bounties.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No {activeTab} bounties found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {bounties.map((bounty) => (
                        <div
                            key={bounty.id}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
                        >
                            {/* Image */}
                            <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {bounty.image_url ? (
                                    <img
                                        src={bounty.image_url}
                                        alt={bounty.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">{bounty.title}</h2>
                                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1 mr-2">
                                            {bounty.category}
                                        </span>
                                        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${bounty.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {bounty.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#EBB643]">{bounty.prize_pool}</p>
                                        <p className="text-xs text-gray-500">By {bounty.sponsor}</p>
                                    </div>
                                </div>

                                {bounty.description && bounty.description.includes("Tx Hash:") && (
                                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg my-2">
                                        <p className="text-xs text-blue-800 font-semibold mb-1">💰 Payment Verification</p>
                                        <p className="text-xs text-blue-600 font-mono break-all">
                                            {bounty.description.split("Tx Hash:")[1].trim()}
                                        </p>
                                        <a
                                            href={`https://basescan.org/tx/${bounty.description.split("Tx Hash:")[1].trim()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-blue-500 underline hover:text-blue-700 mt-1 inline-block"
                                        >
                                            View on Basescan ↗
                                        </a>
                                    </div>
                                )}

                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {bounty.description?.split("**Payment Verification**")[0]}
                                </p>
                                <div className="text-xs text-gray-400 pt-2">
                                    Submitted: {new Date(bounty.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                                {activeTab === "pending" && (
                                    <Button
                                        onClick={() => handleApprove(bounty.id, "")}
                                        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 w-full"
                                    >
                                        Approve
                                    </Button>
                                )}

                                <Button
                                    onClick={() => openConfirmModal(activeTab === "pending" ? "reject" : "unpublish", bounty.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 w-full"
                                >
                                    {activeTab === "pending" ? "Reject" : "Unpublish"}
                                </Button>

                                <Button
                                    onClick={() => openConfirmModal("delete", bounty.id)}
                                    variant="destructive"
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 w-full"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmationModal
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ ...confirmState, isOpen: false })}
                onConfirm={handleConfirmAction}
                isLoading={actionLoading}
                title={
                    confirmState.type === "delete" ? "Delete Bounty?" :
                        confirmState.type === "reject" ? "Reject Bounty?" :
                            "Unpublish Bounty?"
                }
                message={
                    confirmState.type === "delete" ? "Are you sure you want to permanently delete this bounty? This action cannot be undone." :
                        confirmState.type === "reject" ? "Are you sure you want to reject this submission? It will be removed from the review queue." :
                            "Are you sure you want to unpublish this bounty? It will no longer be visible to users."
                }
                confirmText={
                    confirmState.type === "delete" ? "Yes, Delete" :
                        confirmState.type === "reject" ? "Reject Submission" :
                            "Unpublish"
                }
                confirmVariant={confirmState.type === "delete" ? "danger" : "warning"}
            />

            <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
                <DialogContent className="sm:max-w-md text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">Success!</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            {successMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-4">
                        <Button
                            className="bg-[#EBB643] hover:bg-[#d9a532] text-slate-900 rounded-full px-8"
                            onClick={() => setSuccessModalOpen(false)}
                        >
                            Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminBounties;