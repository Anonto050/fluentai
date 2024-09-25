import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { QUESTS } from "@/constants";
import { apiFetch } from "@/lib/apiService";

const QuestsPage = async () => {
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

  // If no user progress or active course is found, redirect to courses
  if (!userProgress || !userProgress[0].activeCourseId) {
    return redirect("/courses");
  }

  const activeCourse = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);

  // Fetch user subscription
  let userSubscription;
  try {
    userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
  } catch (error) {
    console.error("Error fetching user subscription:", error);
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
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/quests.svg" alt="Quests" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Quests
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Complete quests by earning points.
          </p>

          <ul className="w-full">
            {QUESTS.map((quest) => {
              const progress = (userProgress[0].points / quest.value) * 100;

              return (
                <div
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                  key={quest.title}
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />

                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
