import ChatPage from "./chatPage";
import { auth } from "@clerk/nextjs/server";
import { apiFetch } from "@/lib/apiService";

export async function generateStaticParams() {
  return [
    { scenario: "travel-agent" },
    { scenario: "restaurant" },
    { scenario: "doctor" },
    { scenario: "teacher" },
    { scenario: "business" },
  ];
}

export default async function Home({ params }: { params: { scenario: string } }) {
  const { scenario } = params;

  const { userId } = auth();

  let language = '';

  if (userId) {
    try {
      // Fetch the user progress
      const userProgress = await apiFetch(`/user-progress/user/${userId}`);
      
      if (userProgress && userProgress[0]?.activeCourseId) {
        // Fetch the course data based on activeCourseId
        const course = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
        language = course.title.toLowerCase();

      } else {
        console.log('No active course found.');
      }
    } catch (error) {
      console.error('Error fetching language:', error);
    }
  }

  return (
    <main>
      <ChatPage scenario={scenario} userId={userId ?? ""} language={language} />
    </main>
  );
}
