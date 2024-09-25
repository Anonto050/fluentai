"use client";

import { useState, useEffect } from 'react';
import { ScenarioItem } from "../ScenarioItem";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "../header";
import { apiFetch } from '@/lib/apiService';
import { useAuth } from "@clerk/nextjs";

const ScenarioSelectionPage = async () => {
  const { userId } = useAuth();
  const [language, setLanguage] = useState<string>("");
  const [userProgress, setUserProgress] = useState<any>(null);
  const [isPro, setIsPro] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user progress and subscription using apiFetch
        const userProgressData = await apiFetch(`/user-progress/${userId}`);
        const userSubscriptionData = await apiFetch(`/user-subscriptions/${userId}`);

        setUserProgress(userProgressData);

        const course = userProgressData.activeCourse?.title || "Spanish";
        const language = course.toLowerCase();
        setLanguage(language);

        const isPro = !!userSubscriptionData?.isActive;
        setIsPro(isPro);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 min-h-screen">
      <StickyWrapper>
        {userProgress && (
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        )}
      </StickyWrapper>

      <FeedWrapper>
        <Header title={capitalizeFirstLetter(language)} />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(90vh-48px)] text-center"> 
          <div className="w-full max-w-4xl"> 
            <h1 className="text-3xl font-extrabold tracking-wide text-green-600 mb-6">
              Choose Your Scenario
            </h1>
    
            <div className="space-y-4">
              <ScenarioItem
                label="Chat with a Travel Agent"
                href="/chat/travel-agent"
              />
              <ScenarioItem
                label="Order Food at a Restaurant"
                href="/chat/restaurant"
              />
              <ScenarioItem
                label="Talk to a Doctor"
                href="/chat/doctor"
              />
              <ScenarioItem
                label="Discuss with a Teacher"
                href="/chat/teacher"
              />
              <ScenarioItem
                label="Book a Hotel Room"
                href="/chat/hotel-booking"
              />
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ScenarioSelectionPage;