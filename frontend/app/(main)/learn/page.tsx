import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";
import { Unit } from "./unit";
import { apiFetch } from "@/lib/apiService";

const LearnPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">User not authenticated. Please sign in.</p>
      </div>
    );
  }

  // Fetch user progress data
  let userProgress;
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

  // Redirect if no active course or progress found
  if (!userProgress || !userProgress[0]?.activeCourseId) {
    return redirect("/courses");
  }

  // Fetch active course data
  let activeCourse;
  try {
    activeCourse = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
  } catch (error) {
    console.error("Error fetching active course:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load active course. Please try again later.</p>
      </div>
    );
  }

  // Fetch active lesson data
  let activeLesson;
  try {
    activeLesson = await apiFetch(`/lessons/${userProgress[0].activeLessonId}`);
  } catch (error) {
    console.error("Error fetching active lesson:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load active lesson. Please try again later.</p>
      </div>
    );
  }

  // Fetch lesson progress percentage
  let lessonPercentage;
  try {
    lessonPercentage = await apiFetch(`/user-progress/${userProgress[0].activeLessonId}/progress`);
  } catch (error) {
    console.error("Error fetching lesson percentage:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load lesson progress. Please try again later.</p>
      </div>
    );
  }

  // Fetch user subscription data
  let userSubscription;
  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    userSubscription = null;
  }

  const isPro = !!userSubscription?.isActive;

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
        <Header title={activeCourse.title} />

        {activeCourse.units.map((unit: any) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
