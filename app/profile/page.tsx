"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Link as LinkIcon,
  Trophy,
  DollarSign,
  Award,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Profile, Bounty, BountySubmission } from "@/lib/types";
import profileIcon from "../../public/icons/profileicon.svg";

type BountyWithSubmission = Bounty & { submission: BountySubmission };

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"completed" | "active">(
    "completed"
  );
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Dynamic Lists and Stats
  const [completedList, setCompletedList] = useState<BountyWithSubmission[]>([]);
  const [activeList, setActiveList] = useState<BountyWithSubmission[]>([]);
  const [stats, setStats] = useState({
    bountiesCompleted: 0,
    totalEarned: 0,
    rank: 0,
    rating: 0,
  });

  useEffect(() => {
    let profileSubscription: any;

    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // 1. Fetch Profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        } else {
          setProfile({
            id: user.id,
            full_name: user.user_metadata.full_name || "User",
            username: user.user_metadata.username || "@user",
            bio: "No bio yet",
            location: "Unknown",
            website: "",
            skills: [],
            avatar_url: ""
          });
        }

        // 2. Fetch User Submissions
        const { data: submissionsData, error: submissionsError } = await supabase
          .from("bounty_submissions")
          .select("*")
          .eq("user_id", user.id);

        if (!submissionsError && submissionsData) {
          // 3. Fetch related bounties
          const bountyIds = submissionsData.map((s: BountySubmission) => s.bounty_id);
          const { data: bountiesData } = await supabase
            .from("bounties")
            .select("*")
            .in("id", bountyIds);

          // Merge Data
          const mergedApps: BountyWithSubmission[] = submissionsData.map((submission: BountySubmission) => {
            const bounty = bountiesData?.find((b: Bounty) => b.id === submission.bounty_id);
            if (!bounty) return null;
            return {
              ...bounty,
              submission: submission
            } as BountyWithSubmission;
          }).filter((item: BountyWithSubmission | null) => item !== null);

          // Categorize
          const completed = mergedApps.filter(app => app.submission.status === 'approved');
          const active = mergedApps.filter(app => ['pending', 'in_progress', 'submitted'].includes(app.submission.status));

          setCompletedList(completed);
          setActiveList(active);

          // Calculate Stats
          const totalEarned = completed.reduce((sum, item) => sum + (item.submission.earnings || 0), 0);
          const ratingSum = completed.reduce((sum, item) => sum + (item.submission.rating || 0), 0);
          const avgRating = completed.length > 0 ? ratingSum / completed.length : 0;

          setStats({
            bountiesCompleted: completed.length,
            totalEarned: totalEarned,
            rank: 0,
            rating: Number(avgRating.toFixed(1))
          });
        }

        // Subscribe to realtime profile changes
        profileSubscription = supabase
          .channel('public:profiles')
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` }, (payload) => {
            setProfile(payload.new as Profile);
          })
          .subscribe();

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (profileSubscription) {
        supabase.removeChannel(profileSubscription);
      }
    };
  }, [router]);

  const getRankDisplay = () => {
    if (stats.bountiesCompleted === 0) return "N/A";
    if (stats.totalEarned > 10000) return "Top 1%";
    if (stats.totalEarned > 5000) return "Top 5%";
    if (stats.totalEarned > 1000) return "Top 10%";
    return "Top 50%";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br font-roboto from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = profileIcon.src;
                    }}
                  />
                ) : (
                  <Image
                    src={profileIcon}
                    alt={profile.full_name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left w-full">
                <h1 className="text-2xl md:text-4xl font-semibold text-slate-900 mb-1 font-roboto">
                  {profile.full_name}
                </h1>
                <p className="text-dark mb-4 font-montserrat">
                  {profile.username}
                </p>
                <p className="text-[#666666] font-normal mb-4 max-w-2xl font-montserrat mx-auto md:mx-0">
                  {profile.bio}
                </p>

                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-slate-600 mb-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="font-montserrat">
                      {profile.location || "Location not set"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    <span className="font-montserrat">
                      {profile.website || "No website"}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profile.skills && profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 bg-white text-dark rounded-full text-sm font-roboto border border-[#DCBD7A]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => router.push("/profile/edit")}
              className="bg-[#E4B95C] hover:bg-[#d9a532] text-slate-900 font-normal font-montserrat rounded-full px-6 w-full md:w-auto cursor-pointer"
            >
              Edit profile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-[#666666] text-lg md:text-xl mb-2 font-montserrat">
              Bounties Completed
            </p>
            <div className="flex items-center gap-2">
              <Trophy size={24} className="text-[#9B6A00]" />
              <span className="text-2xl md:text-3xl font-semibold text-[#9B6A00] font-montserrat">
                {stats.bountiesCompleted}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-[#666666] text-lg md:text-xl mb-2 font-montserrat">
              Total Earned
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-semibold text-[#9B6A00] font-montserrat">
                {stats.totalEarned.toLocaleString()} USDC
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-[#666666] text-lg md:text-xl mb-2 font-montserrat">Rank</p>
            <div className="flex items-center gap-2">
              <Award size={24} className="text-[#9B6A00]" />
              <span className="text-2xl md:text-3xl font-semibold text-[#9B6A00] font-montserrat">
                {getRankDisplay()}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-[#666666] text-lg md:text-xl mb-2 font-montserrat">
              Rating
            </p>
            <div className="flex items-center gap-2">
              <Star size={24} className="text-[#9B6A00] fill-[#9B6A00]" />
              <span className="text-2xl md:text-3xl font-semibold text-[#9B6A00] font-montserrat">
                {stats.rating || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-hidden mb-6">
          <div className="bg-gray-100 p-1 md:p-2 rounded-full flex flex-row w-full md:w-auto md:inline-flex gap-1 justify-between">
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 md:flex-none py-2 px-4 md:px-20 text-sm md:text-base font-montserrat font-normal transition-all rounded-full whitespace-nowrap ${activeTab === "completed"
                ? "bg-[#E4B95C] text-slate-900"
                : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 md:flex-none py-2 px-4 md:px-20 text-sm md:text-base font-montserrat font-normal transition-all rounded-full whitespace-nowrap ${activeTab === "active"
                ? "bg-[#E4B95C] text-slate-900"
                : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
            >
              Active
            </button>
          </div>
        </div>

        {/* Bounties List */}
        <div className="px-6 pb-6 space-y-4">
          {activeTab === "completed" ? (
            completedList.length > 0 ? (
              completedList.map((bounty) => (
                <div
                  key={bounty.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all gap-4"
                >
                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 font-montserrat">
                      {bounty.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <p className="text-sm text-[#666666] font-montserrat">
                        Sponsor: {bounty.sponsor}
                      </p>
                      <div className="flex items-center gap-1">
                        {[...Array(bounty.submission.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-[#E4B95C] fill-[#E4B95C]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <p className="text-2xl font-semibold text-[#E4B95C] font-montserrat">
                      {bounty.submission.earnings || 200} USDC
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Completed:{" "}
                      {new Date(
                        bounty.submission.submitted_at || Date.now()
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 font-montserrat">
                No completed bounties yet.
              </div>
            )
          ) : activeList.length > 0 ? (
            activeList.map((bounty) => (
              <div
                key={bounty.id}
                className="flex flex-col md:flex-row items-start justify-between p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all gap-4"
              >
                <div className="flex-1 w-full pr-0 md:pr-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 font-montserrat">
                    {bounty.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#666666] font-montserrat">
                        Status:{" "}
                        <span className="capitalize font-medium text-black">
                          {bounty.submission.status.replace("_", " ")}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#666666] pt-2">
                      <span className="font-montserrat">
                        Deadline: {bounty.deadline}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <p className="text-2xl font-semibold text-[#E4B95C] font-montserrat">
                    {bounty.prize_pool}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 font-montserrat">
              No active bounties found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
