"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

export default function ProjectRegistrationPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        projectName: "",
        website: "",
        description: "",
        twitter: "",
        telegram: "",
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);

        try {
            let logoUrl = null;

            if (logoFile) {
                const fileExt = logoFile.name.split(".").pop();
                const fileName = `${user.id}-${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("project-logos")
                    .upload(fileName, logoFile);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from("project-logos")
                    .getPublicUrl(fileName);

                logoUrl = publicUrl;
            }

            // Update profile with project details and change role to 'project'
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: formData.projectName,
                    website: formData.website,
                    bio: formData.description,
                    avatar_url: logoUrl,
                    role: "project",
                    twitter_handle: formData.twitter,
                    telegram_handle: formData.telegram 
                } as any)
                .eq("id", user.id);

            if (error) throw error;

            // Redirect to bounties creation or list
            router.push("/bounties/create");
        } catch (error: any) {
            console.error("Error registering project:", error);
            alert(`Failed to register project: ${error.message || "Unknown error"}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
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
                    <IoArrowBack className="mr-2" /> Back
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3 font-nunito">
                            Join the Ecosystem
                        </h1>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            Register your project to start posting bounties and engaging with the community.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-y-8 gap-x-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="projectName"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Project Name <span className="text-[#E4B95C]">*</span>
                                        </label>
                                        <Input
                                            id="projectName"
                                            name="projectName"
                                            required
                                            placeholder="e.g. Base Protocol"
                                            value={formData.projectName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-6 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="website"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Website URL <span className="text-[#E4B95C]">*</span>
                                        </label>
                                        <Input
                                            id="website"
                                            name="website"
                                            type="url"
                                            required
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full px-4 py-6 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="twitter"
                                                className="block text-sm font-semibold text-gray-900"
                                            >
                                                Twitter Handle
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">@</span>
                                                <Input
                                                    id="twitter"
                                                    name="twitter"
                                                    placeholder="cre8core"
                                                    value={formData.twitter}
                                                    onChange={handleChange}
                                                    className="w-full pl-8 pr-4 py-6 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20 transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label
                                                htmlFor="telegram"
                                                className="block text-sm font-semibold text-gray-900"
                                            >
                                                Telegram Handle
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">@</span>
                                                <Input
                                                    id="telegram"
                                                    name="telegram"
                                                    placeholder="cre8core_support"
                                                    value={formData.telegram}
                                                    onChange={handleChange}
                                                    className="w-full pl-8 pr-4 py-6 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="logo"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Project Logo
                                        </label>
                                        <div className="relative group">
                                            <div className={`
                                                relative w-full h-32 rounded-xl border-2 border-dashed border-gray-300 
                                                flex flex-col items-center justify-center transition-all bg-gray-50
                                                group-hover:border-[#E4B95C] group-hover:bg-[#E4B95C]/5
                                                ${previewUrl ? 'border-[#E4B95C]' : ''}
                                            `}>
                                                <input
                                                    id="logo"
                                                    name="logo"
                                                    type="file"
                                                    accept="image/png, image/jpeg"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                {previewUrl ? (
                                                    <div className="relative h-24 w-24">
                                                        <img
                                                            src={previewUrl}
                                                            alt="Logo Preview"
                                                            className="h-full w-full object-contain"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                            <p className="text-white text-xs font-medium">Change</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center p-4">
                                                        <div className="mx-auto h-10 w-10 text-gray-400 mb-2 group-hover:text-[#E4B95C] transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm text-gray-500 font-medium">Click to upload logo</p>
                                                        <p className="text-xs text-gray-400 mt-1">PNG or JPEG (Max 5MB)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-semibold text-gray-900"
                                    >
                                        Project Description <span className="text-[#E4B95C]">*</span>
                                    </label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        required
                                        placeholder="Tell us about your project..."
                                        rows={6}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-xl border-gray-200 focus:border-[#E4B95C] focus:ring-[#E4B95C]/20 transition-all font-medium resize-none shadow-sm"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#E4B95C] hover:bg-[#E4B95C]/90 text-black font-bold py-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </span>
                                ) : (
                                    "Register Project"
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
