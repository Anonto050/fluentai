"use client";

import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { apiFetch } from "@/lib/apiService";
import { useAuth } from "@clerk/nextjs";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { UserProgress } from "@/components/user-progress";
import { Quests } from "@/components/quests";
import { Promo } from "@/components/promo";

const ProfilePage = async () => {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    imageUrl: "/boy.svg", // Default image URL
    username: user?.username || "",
    nativeLanguage: "",
  });

  const { userId } = useAuth();
  const userProgressData = apiFetch(`/user-progress/${userId}`);
  const userSubscriptionData = apiFetch(`/user-subscriptions/${userId}`);

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await apiFetch(`/api/users/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src={formData.imageUrl}
            alt="Profile"
            width={150}
            height={150}
            className="h-[150px] w-[150px] rounded-full border border-gray-300 mt-8 mb-2"
          />
          {editing && (
            <div>
            <div className="relative inline-block">
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  // Uncomment the line below if you handle the file upload and preview logic
                  // imageUrl: URL.createObjectURL(e.target.files[0]),
                }))
              }
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            
            <Button
                variant="secondary"
                className="w-full"
                size="sm"
              >
                Choose File
            </Button>
            <p className="mt-2 mb-4 text-sm text-gray-500">
              {formData.imageUrl ? formData.imageUrl : "No file chosen"}
            </p>  

          </div>
          
          </div>
                    
          )}

          <ul className="w-full max-w-lg">
            <li className="flex w-full items-center gap-x-4 border-t-2 p-4">
              <div className="flex-1 justify-between">
                <p className="text-base font-bold text-green-500 lg:text-xl">NAME</p>
                {editing ? (
                  <div className="flex gap-4 mt-2">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2"
                    />
                  </div>
                ) : (
                  <p className="text-base text-neutral-700 lg:text-xl">
                    {formData.firstName || ''} {formData.lastName || ''}
                  </p>
                )}
              </div>
            </li>

            <li className="flex w-full items-center gap-x-4 border-t-2 p-4">
              <div className="flex-1 justify-between">
                <p className="text-base font-bold text-green-500 lg:text-xl">EMAIL</p>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 p-2"
                  />
                ) : (
                  <p className="text-base text-neutral-700 lg:text-xl">
                    {formData.email || ''}
                  </p>
                )}
              </div>
            </li>

            <li className="flex w-full items-center gap-x-4 border-t-2 p-4">
              <div className="flex-1 justify-between">
                <p className="text-base font-bold text-green-500 lg:text-xl">USERNAME</p>
                {editing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 p-2"
                  />
                ) : (
                  <p className="text-base text-neutral-700 lg:text-xl">
                    {formData.username || ''}
                  </p>
                )}
              </div>
            </li>

            <li className="flex w-full items-center gap-x-4 border-t-2 p-4">
              <div className="flex-1 justify-between">
                <p className="text-base font-bold text-green-500 lg:text-xl">NATIVE LANGUAGE</p>
                {editing ? (
                  <input
                    type="text"
                    name="nativeLanguage"
                    value={formData.nativeLanguage}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 p-2"
                  />
                ) : (
                  <p className="text-base text-neutral-700 lg:text-xl">
                    {formData.nativeLanguage || ''}
                  </p>
                )}
              </div>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <Button
              variant={ "primary"}
              className="w-full"
              size="lg"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
            {editing && (
              <Button
                variant="secondary"
                className="w-full"
                size="lg"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
