import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Quiz } from "./quiz";
import { apiFetch } from "@/lib/apiService";

const LessonPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">User not authenticated. Please sign in.</p>
      </div>
    );
  }

  // Fetch user progress
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

  // Redirect if no user progress or active lesson found
  if (!userProgress || !userProgress[0]?.activeLessonId) {
    return redirect("/learn");
  }

  // Fetch active lesson data
  let lesson;
  try {
    lesson = await apiFetch(`/lessons/${userProgress[0].activeLessonId}`);
  } catch (error) {
    console.error("Error fetching lesson data:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load lesson data. Please try again later.</p>
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

  // Calculate the initial progress percentage
  const initialPercentage =
    (lesson.challenges.filter((challenge: any) => challenge.completed).length / lesson.challenges.length) * 100;

  // Return the Quiz component with the fetched data
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress[0].hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
