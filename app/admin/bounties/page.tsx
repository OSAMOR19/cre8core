"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bounty } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const AdminBounties = () => {
    const router = useRouter();
    const [bounties, setBounties] = useState<Bounty[]>([]);
    const [loading, setLoading] = useState(true);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const checkAdminAndFetch = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profile?.role !== "admin") {
                router.push("/"); // Not authorized
                return;
            }

            // Is Admin -> Fetch Bounties
            const { data, error } = await supabase
                .from("bounties")
                .select("*")
                .eq("status", "pending")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setBounties(data || []);

        } catch (error) {
            console.error("Error accessing admin panel:", error);
            router.push("/");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAdminAndFetch();
    }, []);

    const handleApprove = async (id: string, email: string) => {
        try {
            // 1. Update status to 'Open'
            const { error } = await supabase
                .from("bounties")
                .update({ status: "Open" })
                .eq("id", id);

            if (error) throw error;

            // 2. Refresh list
            setBounties((prev) => prev.filter((b) => b.id !== id));
            setSuccessMessage("Bounty has been successfully approved and is now live on the platform.");
            setSuccessModalOpen(true);

        } catch (error) {
            console.error("Error approving bounty:", error);
            alert("Failed to approve bounty.");
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm("Are you sure you want to reject this bounty? It will not be published.")) return;

        try {
            const { error } = await supabase
                .from("bounties")
                .update({ status: "rejected" })
                .eq("id", id);

            if (error) throw error;

            setBounties((prev) => prev.filter((b) => b.id !== id));
            alert("Bounty Rejected.");
        } catch (error) {
            console.error("Error rejecting bounty:", error);
            alert("Failed to reject bounty.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to PERMANENTLY DELETE this bounty? This cannot be undone.")) return;

        try {
            const { error } = await supabase.from("bounties").delete().eq("id", id);
            if (error) throw error;

            setBounties((prev) => prev.filter((b) => b.id !== id));
            alert("Bounty Permanently Deleted.");
        } catch (error) {
            console.error("Error deleting bounty:", error);
            alert("Failed to delete bounty.");
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-6">Admin Portal: Pending Bounties</h1>
            <p className="text-gray-600 mb-8">
                Review user-submitted bounties. Approved bounties will go live on the platform.
                <br />
                <span className="text-sm">Official Email: cre8corelabs@gmail.com</span>
            </p>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : bounties.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No pending bounties to review.</p>
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
                                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                                            {bounty.category}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#EBB643]">{bounty.prize_pool}</p>
                                        <p className="text-xs text-gray-500">By {bounty.sponsor}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {bounty.description}
                                </p>
                                <div className="text-xs text-gray-400 pt-2">
                                    Submitted: {new Date(bounty.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                <Button
                                    onClick={() => handleApprove(bounty.id, "")}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 w-full"
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => handleReject(bounty.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 w-full"
                                >
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => handleDelete(bounty.id)}
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
