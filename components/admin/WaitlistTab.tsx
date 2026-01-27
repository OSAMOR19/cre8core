"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { IoCopyOutline, IoLogoTwitter } from "react-icons/io5";

type WaitlistEntry = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    country: string;
    role: string;
    skill: string;
    bio: string;
    x_account: string;
};

const WaitlistTab = () => {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWaitlist = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("waitlist")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setEntries(data || []);
            } catch (error) {
                console.error("Error fetching waitlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWaitlist();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: Add toast notification here
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No waitlist signups yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                <h2 className="font-bold text-lg">Total Signups</h2>
                <span className="bg-[#EBB643]/20 text-yellow-800 px-4 py-1 rounded-full font-bold">
                    {entries.length}
                </span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Name & Email</th>
                                <th className="px-6 py-4">Role & Skill</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Social</th>
                                <th className="px-6 py-4">Bio</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entries.map((entry) => (
                                <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{entry.name}</div>
                                        <div className="text-gray-500 flex items-center gap-1 cursor-pointer hover:text-[#EBB643]" onClick={() => copyToClipboard(entry.email)}>
                                            {entry.email} <IoCopyOutline size={12} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block text-xs font-semibold mb-1">
                                            {entry.role}
                                        </div>
                                        <div className="text-gray-600 font-medium">{entry.skill}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {entry.country}
                                    </td>
                                    <td className="px-6 py-4">
                                        {entry.x_account && (
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <IoLogoTwitter className="text-blue-400" />
                                                <span>{entry.x_account}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <p className="text-gray-500 truncate" title={entry.bio}>
                                            {entry.bio}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {new Date(entry.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WaitlistTab;
