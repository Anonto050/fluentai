"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { MAX_HEARTS } from "@/constants";
import { apiFetch } from "@/lib/apiService";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized.");

  // Step 1: Fetch current user progress
  let currentUserProgress;
  try {
    currentUserProgress = await apiFetch(`/user-progress/user/${userId}`);
    if (!currentUserProgress) throw new Error("User progress not found.");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching user progress: " + error.message);
    } else {
      throw new Error("Error fetching user progress: " + String(error));
    }
  }

  // Step 2: Fetch user subscription
  let userSubscription;
  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
    // Handle subscription fetch failure separately, it is non-critical
    console.error("Error fetching user subscription:", error);
    userSubscription = null;
  }

  // Step 3: Fetch challenge details
  let challenge;
  try {
    challenge = await apiFetch(`/challenges/${challengeId}`);
    if (!challenge) throw new Error("Challenge not found.");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching challenge details: " + error.message);
    } else {
      throw new Error("Error fetching challenge details: " + String(error));
    }
  }

  // Step 4: Fetch existing challenge progress
  let existingChallengeProgress;
  try {
    existingChallengeProgress = await apiFetch(`/challenge-progress?userId=${userId}&challengeId=${challengeId}`);
  } catch (error) {
    console.error("Error fetching existing challenge progress:", error);
    existingChallengeProgress = null; // Safely handle absence of progress
  }

  const lessonId = challenge.lessonId;
  const isPractice = !!existingChallengeProgress;

  // Step 5: Check hearts and subscription status
  if (currentUserProgress[0].hearts === 0 && !isPractice && !userSubscription?.isActive) {
    return { error: "hearts" };
  }

  if (isPractice) {
    // Step 6a: Update existing challenge progress (mark as completed)
    try {
      await apiFetch(`/challenge-progress/${existingChallengeProgress.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...existingChallengeProgress,
          completed: true,
        }),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error updating challenge progress: " + error.message);
      } else {
        throw new Error("Error updating challenge progress: " + String(error));
      }
    }

    // Step 7a: Update user progress (increment hearts and points)
    try {
      await apiFetch(`/user-progress/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...currentUserProgress[0],
          acctiveLessonId: lessonId,
          hearts: Math.min(currentUserProgress[0].hearts + 1, MAX_HEARTS),
          points: currentUserProgress[0].points + 10,
        }),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error updating user progress: " + error.message);
      } else {
        throw new Error("Error updating user progress: " + String(error));
      }
    }

    // Revalidate necessary paths
    revalidatePaths(lessonId);
    return;
  }

  // Step 6b: Insert new challenge progress
  try {
    await apiFetch(`/challenge-progress`, {
      method: 'POST',
      body: JSON.stringify({
        challengeId,
        userId,
        completed: true,
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating new challenge progress: " + error.message);
    } else {
      throw new Error("Error creating new challenge progress: " + String(error));
    }
  }

  // Step 7b: Update user progress (increment points only)
  try {
    await apiFetch(`/user-progress/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...currentUserProgress[0],
        acctiveLessonId: lessonId,
        points: currentUserProgress[0].points + 10,
      }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating user progress: " + error.message);
    } else {
      throw new Error("Error updating user progress: " + String(error));
    }
  }

  // Revalidate necessary paths
  revalidatePaths(lessonId);
};

// Helper function to revalidate paths
const revalidatePaths = (lessonId: number) => {
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
