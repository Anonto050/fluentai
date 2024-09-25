import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Quiz } from "./quiz";
import { apiFetch } from "@/lib/apiService";

const LessonPage = async () => {

  const { userId } = auth();
  const lessonData = apiFetch(`/lessons/`);
  const userProgressData = apiFetch(`/user-progress/${userId}`);
  const userSubscriptionData = apiFetch(`/user-subscriptions/${userId}`);


  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge: any) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;