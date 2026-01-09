"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusModal from "@/components/common/StatusModal";

const WaitlistPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        email: "",
        skill: "",
        bio: "",
        x_account: "",
        role: "",
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        type: "success" as "success" | "error",
        title: "",
        message: "",
    });

    const handleModalClose = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        if (modalState.type === "success") {
            router.push("/");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            role: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from("waitlist").insert([formData]);

            if (error) throw error;

            // Trigger email notification (fire and forget / independent of modal)
            try {
                await fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: formData.name, email: formData.email }),
                });
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Do not stop the successful flow
            }

            setModalState({
                isOpen: true,
                type: "success",
                title: "Welcome Aboard!",
                message: "You have successfully joined the waitlist. We'll be in touch soon.",
            });
        } catch (error) {
            console.error("Error submitting to waitlist:", error);
            setModalState({
                isOpen: true,
                type: "error",
                title: "Something went wrong",
                message: "Failed to join waitlist. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F8F8] font-montserrat pb-20 pt-10 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Join the Revolution
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                        Be the first to experience the future of decentralized collaboration. Secure your spot on the waitlist today.
                    </p>
                </div>

                <div className="bg-white px-8 py-10 md:px-12 md:py-12 rounded-3xl shadow-sm border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Personal Info Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Location & Social */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="United States"
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">X (Twitter) Handle</label>
                                <input
                                    type="text"
                                    name="x_account"
                                    value={formData.x_account}
                                    onChange={handleChange}
                                    placeholder="@username"
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Professional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Role</label>
                                <Select onValueChange={handleRoleChange} required>
                                    <SelectTrigger className="w-full px-5 py-8 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all text-gray-700">
                                        <SelectValue placeholder="Select your primary role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Video Creator">Video Creator</SelectItem>
                                        <SelectItem value="Content Writer">Content Writer</SelectItem>
                                        <SelectItem value="Project Manager">Project Manager</SelectItem>
                                        <SelectItem value="Designer">Designer</SelectItem>
                                        <SelectItem value="KOL">KOL</SelectItem>
                                        <SelectItem value="MOD">MOD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Primary Skill</label>
                                <input
                                    type="text"
                                    name="skill"
                                    required
                                    value={formData.skill}
                                    onChange={handleChange}
                                    placeholder="e.g. React, Video Editing, Copywriting"
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Short Bio</label>
                            <textarea
                                name="bio"
                                required
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us a bit about yourself and what you're building..."
                                rows={4}
                                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#E4B95C]/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#E4B95C] text-black py-7 rounded-full text-lg font-bold hover:bg-[#E4B95C]/90 shadow-lg shadow-[#E4B95C]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {loading ? "Joining..." : "Join the Waitlist"}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

            <StatusModal
                isOpen={modalState.isOpen}
                onClose={handleModalClose}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
            />
        </div>
    );
};

export default WaitlistPage;
