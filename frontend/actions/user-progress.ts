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
  const existingUserProgress = await apiFetch(`/user-progress/user/${userId}`);

  const firstLessonId = course.units[0].lessons[0].id; 

  if (existingUserProgress) {
    // Update user progress
    await apiFetch(`/user-progress/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...existingUserProgress[0],
        activeCourseId: courseId,
        activeLessonId: existingUserProgress[0].activeLessonId || firstLessonId, // Keep existing or set the first lesson
        completedChallenges: existingUserProgress[0].completedChallenges || 0,
        hearts: existingUserProgress[0].hearts || MAX_HEARTS,
        points: existingUserProgress[0].points || 0,
      }),
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
    return;
  }

  // Insert new user progress with the provided schema
  await apiFetch(`/user-progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      activeCourseId: courseId,
      activeLessonId: firstLessonId, // Starting with the first lesson of the first unit
      completedChallenges: 0, // New user progress starts with 0 challenges completed
      hearts: MAX_HEARTS, // Default to the max number of hearts
      points: 0, // Default to 0 points
    }),
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};


export const reduceHearts = async (challengeId: number) => {
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

  // Step 2: Fetch user subscription status
  let userSubscription;
  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
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

  const lessonId = challenge.lessonId;

  // Step 4: Check if the challenge is already practiced
  let existingChallengeProgress;
  try {
    existingChallengeProgress = await apiFetch(
      `/challenge-progress?userId=${userId}&challengeId=${challengeId}`
    );
  } catch (error) {
    console.error("Error fetching challenge progress:", error);
    existingChallengeProgress = null; // Handle absence of challenge progress safely
  }

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  // Step 5: Handle errors related to hearts and subscription status
  if (userSubscription?.isActive) return { error: "subscription" };
  if (currentUserProgress[0].hearts === 0) return { error: "hearts" };



  // Step 6: Update user progress to reduce hearts
  try {

    await apiFetch(`/user-progress/user/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...currentUserProgress[0],
        hearts: Math.max(currentUserProgress[0].hearts - 1, 0),
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
  const currentUserProgress = await apiFetch(`/user-progress/user/${userId}`);

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress[0].hearts === MAX_HEARTS)
    throw new Error("Hearts are already full.");
  if (currentUserProgress[0].points < POINTS_TO_REFILL)
    throw new Error("Not enough points.");

  // Update user progress to refill hearts
  await apiFetch(`/user-progress/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...currentUserProgress[0],
      hearts: MAX_HEARTS,
      points: currentUserProgress[0].points - POINTS_TO_REFILL,
    }),
  });

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
