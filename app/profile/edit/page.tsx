"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import profileData from "../../../public/icons/profileicon.svg";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import StatusModal from "@/components/common/StatusModal";

const Edit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null); // Supabase user

  // Form State
  const [formData, setFormData] = useState({
    avatarUrl: "",
    name: "",
    username: "",
    location: "",
    bio: "",
    website: "",
  });

  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login"); // Redirect if not logged in
          return;
        }

        setUser(user);

        // Try to fetch profile from 'profiles' table
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setFormData({
            avatarUrl: profile.avatar_url || "",
            name: profile.full_name || "",
            username: profile.username || "",
            location: profile.location || "",
            bio: profile.bio || "",
            website: profile.website || "",
          });
          setSkills(profile.skills || []);
        } else {
          // Fallback to auth metadata if profile doesn't exist yet
          setFormData({
            avatarUrl: user.user_metadata?.avatar_url || "",
            name: user.user_metadata?.full_name || "",
            username: user.user_metadata?.username || "",
            location: user.user_metadata?.location || "",
            bio: "",
            website: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddSkill = (e: any) => {
    e.preventDefault();
    if (skill.trim() !== "" && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (item: string): void => {
    setSkills(skills.filter((s) => s !== item));
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

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success") {
      router.push("/profile");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: formData.name,
          username: formData.username,
          avatar_url: formData.avatarUrl,
          website: formData.website,
          location: formData.location,
          bio: formData.bio,
          skills: skills,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setModalState({
        isOpen: true,
        type: "success",
        title: "Profile Updated!",
        message: "Your profile information has been successfully updated.",
      });

    } catch (error: any) {
      console.error("Error updating profile:", error);
      setModalState({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: error.message || "Something went wrong while updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      if (!user) {
        throw new Error('User not authenticated.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      setFormData({ ...formData, avatarUrl: data.publicUrl });

    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white px-4 md:px-10 py-8 max-w-[95%] md:max-w-[70%] mt-20 md:mt-10 rounded-2xl mx-auto mb-10 shadow-sm border border-gray-100">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div>
          <h1 className="text-3xl md:text-[48px] font-semibold text-slate-900">Edit Profile</h1>
          <p className="text-[#666666] text-sm font-montserrat mt-2">
            Update your profile information and showcase your skills
          </p>
        </div>

        <div className="relative group cursor-pointer">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-linear-to-br font-roboto from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden relative">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = profileData.src;
                }}
              />
            ) : (
              <Image
                src={profileData}
                alt="Default Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            )}

            {/* Loading Overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-0">
              <span className="text-white text-sm font-medium">Change Photo</span>
            </div>
          </div>

          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={uploadAvatar}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            disabled={uploading}
          />
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6 mt-10">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="avatarUrl" className="font-medium text-slate-700">
                  Avatar URL
                </label>
                <input
                  type="text"
                  id="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#E4B95C]"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="name" className="font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 font-montserrat focus:outline-none focus:border-[#E4B95C]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="username" className="font-medium text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#E4B95C]"
                  placeholder="@alexdev"
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="location" className="font-medium text-slate-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#E4B95C]"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-medium text-slate-700">
                Bio
              </label>
              <textarea
                id="bio"
                rows={6}
                value={formData.bio}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#E4B95C]"
                placeholder="Full-stack developer passionate about Web3 and DeFi. Building the future on Base blockchain."
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="website" className="font-medium text-slate-700">
                Website
              </label>
              <input
                type="text"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#E4B95C]"
                placeholder="https://alexdev.XYZ"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 font-medium text-slate-700">Skills</label>

              {/* Input Row */}
              <div className="flex items-center gap-3 border border-gray-300 rounded-xl p-2 transition-colors focus-within:border-[#E4B95C]">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="flex-1 outline-none px-2"
                />

                <button
                  onClick={(e) => handleAddSkill(e)}
                  type="button"
                  className="bg-[#E4B95C] text-slate-900 font-medium text-sm px-6 py-2 md:px-10 md:py-2 rounded-full hover:bg-[#d9a532] transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeSkill(item)}
                      className="font-bold text-gray-500 hover:text-red-500 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E4B95C] text-slate-900 font-medium py-3.5 rounded-full text-sm hover:bg-[#d9a532] transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                className="w-full md:w-[200px] border border-gray-300 py-3.5 rounded-full text-sm text-slate-700 font-medium hover:bg-gray-50 transition-colors"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
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

export default Edit;
