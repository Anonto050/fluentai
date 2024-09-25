import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
import { apiFetch } from "@/lib/apiService";
import { auth } from "@clerk/nextjs/server";

type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
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

  // Fetch user subscription
  let userSubscription;
  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    userSubscription = null; // Safely handle absence of subscription
  }

  // Fetch lesson data based on the active lesson ID from the user progress
  let lesson;
  try {
    lesson = await apiFetch(`/lessons/${userProgress[0]?.activeLessonId}`);
  } catch (error) {
    console.error("Error fetching lesson data:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load lesson data. Please try again later.</p>
      </div>
    );
  }

  // If no valid lesson or user progress is found, redirect to /learn
  if (!lesson || !userProgress) {
    return redirect("/learn");
  }

  // Calculate the initial progress percentage for the lesson
  const initialPercentage =
    (lesson.challenges.filter((challenge: any) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  // Render the Quiz component with the fetched data
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

export default LessonIdPage;
