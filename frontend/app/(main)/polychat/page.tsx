import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ScenarioItem } from "./ScenarioItem";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";
import { apiFetch } from '@/lib/apiService';

const ScenarioSelectionPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">User not authenticated. Please sign in.</p>
      </div>
    );
  }

  // Fetch user progress and subscription data synchronously
  let userProgress;
  let userSubscription;
  try {
    userProgress = await apiFetch(`/user-progress/user/${userId}`);
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load user progress. Please try again later.</p>
      </div>
    );
  }

  // If no user progress or active course is found, redirect to courses
  if (!userProgress || !userProgress[0]?.activeCourseId) {
    return redirect("/courses");
  }

  // Fetch the active course and language
  let activeCourse;
  try {
    activeCourse = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
  } catch (error) {
    console.error("Error fetching active course:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load course data. Please try again later.</p>
      </div>
    );
  }

  const language = activeCourse?.title?.toLowerCase() || "spanish";

  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
    console.error("Error fetching user subscription:", error);
  }

  const isPro = !!userSubscription?.isActive;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 min-h-screen">
      <StickyWrapper>
        {userProgress && (
          <UserProgress
            activeCourse={activeCourse}
            hearts={userProgress[0].hearts}
            points={userProgress[0].points}
            hasActiveSubscription={isPro}
          />
        )}
      </StickyWrapper>

      <FeedWrapper>
        <Header title={capitalizeFirstLetter(language)} />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(90vh-48px)] text-center"> 
          <div className="w-full max-w-4xl"> 
            <h1 className="text-3xl font-extrabold tracking-wide text-green-600 mb-6">
              Choose Your Option
            </h1>
    
            <div className="space-y-4">
              <ScenarioItem
                label="Chat With Scenarios"
                href="/polychat/scenarios"
              />
              <ScenarioItem
                label="Chat With Images"
                href="/polychat/image"
              />
              <ScenarioItem
                label="Chat With PDFs"
                href="/polychat/pdf"
              />
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ScenarioSelectionPage;
