import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { apiFetch } from "@/lib/apiService";

const LeaderboardPage = async () => {
  try {
    const { userId } = auth();

    // Check if the user is authenticated
    if (!userId) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-red-500">Please sign in to view this page.</p>
        </div>
      );
    }

    let activeCourse = null;
    let userProgress = null;
    let userSubscription = null;
    let leaderboard = [];

    // Fetch user progress
    try {
      userProgress = await apiFetch(`/user-progress/user/${userId}`);
    } catch (error) {
      console.error("Failed to fetch user progress:", error);
      return (
        <div className="flex flex-col items-center">
          <p className="text-red-500">Failed to load user progress. Please try again later.</p>
        </div>
      );
    }

    // Check if user progress exists
    if (!userProgress || !userProgress[0]?.activeCourseId) {
      return (
        <div className="flex flex-col items-center">
          <p className="text-red-500">No active course found. Please enroll in a course to continue.</p>
        </div>
      );
    }

    // Fetch active course details
    try {
      activeCourse = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
    } catch (error) {
      console.error("Failed to fetch active course data:", error);
    }

    // Fetch user subscription
    try {
      userSubscription = await apiFetch(`/user-subscriptions/user/${userId}`);
    } catch (error) {
      console.error("Failed to fetch user subscription:", error);
    }

    // Fetch leaderboard data
    try {
      leaderboard = await apiFetch('/user-progress/top-users?limit=10'); // Adjust limit as needed
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
    }

    const isPro = !!userSubscription?.isActive;

    // Fetch user details for each user in the leaderboard using the userId from Clerk
    const leaderboardWithUserDetails = await Promise.all(
      leaderboard.map(async (user: any) => {
        try {
          const userDetails = await apiFetch(`/users/${user.userId}`);
          return {
            ...user,
            userId: userDetails.id,
            name: userDetails.name,
            imageUrl: userDetails.photoUrl
          };
        } catch (error) {
          console.error(`Failed to fetch user details for ${user.userId}`, error);
          return {
            ...user,
            firstName: "Unknown",
            lastName: "User",
            imageUrl: "/default-avatar.png", // Use a default avatar if fetching fails
          };
        }
      })
    );

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
          <Quests points={userProgress.points} />
        </StickyWrapper>

        <FeedWrapper>
          <div className="flex w-full flex-col items-center">
            <Image
              src="/leaderboard.svg"
              alt="Leaderboard"
              height={90}
              width={90}
            />

            <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
              Leaderboard
            </h1>
            <p className="mb-6 text-center text-lg text-muted-foreground">
              See where you stand among other learners in the community.
            </p>

            <Separator className="mb-4 h-0.5 rounded-full" />

            {/* Check if leaderboard is empty */}
            {leaderboardWithUserDetails.length > 0 ? (
              leaderboardWithUserDetails.map((user: any, i: number) => (
                <div
                  key={user.userId}
                  className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
                >
                  <p className="mr-4 font-bold text-lime-700">{i + 1}</p>

                  <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                    <AvatarImage
                      src={user.imageUrl || "/default-avatar.png"} // Use default if no image
                      className="object-cover"
                    />
                  </Avatar>

                  <p className="flex-1 font-bold text-neutral-800">
                    {user.name || "Unknown User"}
                  </p>
                  <p className="text-muted-foreground">{user.points} XP</p>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-muted-foreground">
                No leaderboard data available.
              </p>
            )}
          </div>
        </FeedWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error loading leaderboard page:", error);
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">Failed to load leaderboard data. Please try again later.</p>
      </div>
    );
  }
};

export default LeaderboardPage;
