"use server";

import { auth, currentUser } from "@clerk/nextjs/server"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { apiFetch } from "@/lib/apiService";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  // Fetch the course details from the backend
  const course = await apiFetch(`/courses/${courseId}`);

  if (!course) throw new Error("Course not found.");

  if (!course.units.length || !course.units[0].lessons.length)
    throw new Error("Course is empty.");

  // Fetch existing user progress
  const existingUserProgress = await apiFetch(`/user-progress/${userId}`);

  if (existingUserProgress) {
    // Update user progress
    await apiFetch(`/user-progress/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...existingUserProgress,
        activeCourseId: courseId,
      }),
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
    return;
  }

  // Insert new user progress
  await apiFetch(`/user-progress`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      activeCourseId: courseId,
      hearts: MAX_HEARTS,
      points: 0,
    }),
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized.");

  // Fetch current user progress
  const currentUserProgress = await apiFetch(`/user-progress/${userId}`);

  // Fetch user subscription status
  const userSubscription = await apiFetch(`/user-subscriptions/${userId}`);

  // Fetch challenge details
  const challenge = await apiFetch(`/challenges/${challengeId}`);

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;

  // Check if the challenge is already practiced
  const existingChallengeProgress = await apiFetch(
    `/challenge-progress?userId=${userId}&challengeId=${challengeId}`
  );

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (userSubscription?.isActive) return { error: "subscription" };
  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  // Update user progress to reduce hearts
  await apiFetch(`/user-progress/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...currentUserProgress,
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }),
  });

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized.");

  // Fetch current user progress
  const currentUserProgress = await apiFetch(`/user-progress/${userId}`);

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress.hearts === MAX_HEARTS)
    throw new Error("Hearts are already full.");
  if (currentUserProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points.");

  // Update user progress to refill hearts
  await apiFetch(`/user-progress/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...currentUserProgress,
      hearts: MAX_HEARTS,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    }),
  });

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
