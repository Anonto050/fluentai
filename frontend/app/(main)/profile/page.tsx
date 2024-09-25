"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useUser, useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/apiService";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { UserProgress } from "@/components/user-progress";
import { Quests } from "@/components/quests";
import { Promo } from "@/components/promo";

const ProfilePage = () => {
  const { user } = useUser();
  const { userId } = useAuth();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    imageUrl: "/boy.svg", // Default image URL
    username: user?.username || "",
    nativeLanguage: "", // Stores the selected language name
  });

  const [languages, setLanguages] = useState<any[]>([]); // List of languages fetched from API
  const [userProgress, setUserProgress] = useState<any>(null);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [isPro, setIsPro] = useState<boolean>(false);

  // Fetch languages from API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await apiFetch("/languages"); // Assuming the API endpoint is `/languages`
        setLanguages(languagesData); // Populate languages with API response
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  // Fetch user progress and subscription individually
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const progress = await apiFetch(`/user-progress/user/${userId}`);
        setUserProgress(progress);

        if (progress && progress[0]?.activeCourseId) {
          const course = await apiFetch(`/courses/${progress[0].activeCourseId}`);
          setActiveCourse(course);
        } else {
          redirect("/courses");
        }
      } catch (error) {
        console.error("Error fetching user progress or course:", error);
        redirect("/courses");
      }

      try {
        const subscription = await apiFetch(`/user-subscriptions/user/${userId}`);
        setUserSubscription(subscription);
        setIsPro(!!subscription?.isActive);
      } catch (error) {
        if (error instanceof Error && error.message.includes("400")) {
          console.log("No active subscription found, continuing without Pro features.");
        } else {
          console.error("Error fetching user subscription:", error);
        }
      }
    };

    fetchData();
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Save with language handling
  const handleSave = async () => {
    try {
      // Find the selected language's ID
      const selectedLanguage = languages.find(lang => lang.name === formData.nativeLanguage);

      const payload = {
        username: formData.username,
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,  // Combine first and last name
        photoUrl: formData.imageUrl,  // Assuming imageUrl contains the correct URL for the photo
        nativeLangId: selectedLanguage ? selectedLanguage.id : 1,  // Default to English (id: 1) if not found
      };

      await apiFetch(`/users/${user?.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!userProgress || !activeCourse) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={activeCourse}
          hearts={userProgress[0].hearts}
          points={userProgress[0].points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress[0].points} />
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

          <ul className="w-full max-w-lg">
            {/* Name fields */}
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
                    {formData.firstName} {formData.lastName}
                  </p>
                )}
              </div>
            </li>

            {/* Email field */}
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
                  <p className="text-base text-neutral-700 lg:text-xl">{formData.email}</p>
                )}
              </div>
            </li>

            {/* Username field */}
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
                  <p className="text-base text-neutral-700 lg:text-xl">{formData.username}</p>
                )}
              </div>
            </li>

            {/* Native Language Dropdown */}
            <li className="flex w-full items-center gap-x-4 border-t-2 p-4">
              <div className="flex-1 justify-between">
                <p className="text-base font-bold text-green-500 lg:text-xl">NATIVE LANGUAGE</p>
                {editing ? (
                  <select
                    name="nativeLanguage"
                    value={formData.nativeLanguage}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 p-2"
                  >
                    <option value="">Select a language</option>
                    {languages.map((language) => (
                      <option key={language.id} value={language.name}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-base text-neutral-700 lg:text-xl">
                    {formData.nativeLanguage || "Not specified"}
                  </p>
                )}
              </div>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
            {editing && (
              <Button variant="secondary" className="w-full" size="lg" onClick={handleSave}>
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
