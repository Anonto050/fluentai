"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { MAX_HEARTS } from "@/constants";
import { apiFetch } from "@/lib/apiService";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized.");

  // Fetch current user progress and user subscription from the backend
  const [currentUserProgress, userSubscription] = await Promise.all([
    apiFetch(`/user-progress/${userId}`),
    apiFetch(`/user-subscriptions/${userId}`),
  ]);

  if (!currentUserProgress) throw new Error("User progress not found.");

  // Fetch the challenge details and existing challenge progress from the backend
  const [challenge, existingChallengeProgress] = await Promise.all([
    apiFetch(`/challenges/${challengeId}`),
    apiFetch(`/challenge-progress?userId=${userId}&challengeId=${challengeId}`),
  ]);

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;
  const isPractice = !!existingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  ) {
    return { error: "hearts" };
  }

  if (isPractice) {
    // Update the challenge progress (mark as completed)
    await apiFetch(`/challenge-progress/${existingChallengeProgress.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...existingChallengeProgress,
        completed: true,
      }),
    });

    // Update user progress (increment hearts and points)
    await apiFetch(`/user-progress/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...currentUserProgress,
        hearts: Math.min(currentUserProgress.hearts + 1, MAX_HEARTS),
        points: currentUserProgress.points + 10,
      }),
    });

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  // Insert new challenge progress
  await apiFetch(`/challenge-progress`, {
    method: 'POST',
    body: JSON.stringify({
      challengeId,
      userId,
      completed: true,
    }),
  });

  // Update user progress (increment points only)
  await apiFetch(`/user-progress/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...currentUserProgress,
      points: currentUserProgress.points + 10,
    }),
  });

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
