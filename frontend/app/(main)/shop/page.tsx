import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Items } from "./items";
import { apiFetch } from "@/lib/apiService";

const ShopPage = async () => {
  try {
    const { userId } = await auth();

    // Fetch user progress data
    let userProgress;
    try {
      userProgress = await apiFetch(`/user-progress/user/${userId}`);
      if (!userProgress || !userProgress[0].activeCourseId) {
        return redirect("/courses");
      }
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return redirect("/courses");
    }

    // Fetch user subscription data
    let userSubscription;
    try {
      userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      userSubscription = null; // Handle cases where fetching the subscription fails
    }

    // Fetch active course data
    let activeCourse;
    try {
      activeCourse = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
    } catch (error) {
      console.error("Error fetching active course:", error);
      return redirect("/courses");
    }

    // Determine if the user has an active subscription
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
          <Quests points={userProgress[0].points} />
        </StickyWrapper>

        <FeedWrapper>
          <div className="flex w-full flex-col items-center">
            <Image src="/shop.svg" alt="Shop" height={90} width={90} />
            <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
              Shop
            </h1>
            <p className="mb-6 text-center text-lg text-muted-foreground">
              Spend your points on cool stuff.
            </p>
            <Items
              hearts={userProgress[0].hearts}
              points={userProgress[0].points}
              hasActiveSubscription={isPro}
            />
          </div>
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Failed to load shop page data:", error);
    return redirect("/courses");
  }
};

export default ShopPage;
