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

    // Fetch user progress and user subscription data from the backend using apiFetch
    const userProgress = await apiFetch(`/user-progress/${userId}`);
    const userSubscription = await apiFetch(`/user-subscriptions/${userId}`);

    if (!userProgress || !userProgress.activeCourse) {
      redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
          <Quests points={userProgress.points} />
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
              hearts={userProgress.hearts}
              points={userProgress.points}
              hasActiveSubscription={isPro}
            />
          </div>
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch shop data:", error);
    redirect("/courses");
  }
};

export default ShopPage;
