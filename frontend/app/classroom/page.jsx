import { Experience } from "./Experience";
import { auth } from "@clerk/nextjs/server";
import { apiFetch } from "@/lib/apiService";

export default async function Home() {
  const { userId } = auth();  

  let courseName = '';

  if (userId) {
    try {
      // Fetch the user progress
      const userProgress = await apiFetch(`/user-progress/user/${userId}`);
      
      if (userProgress && userProgress[0]?.activeCourseId) {
        // Fetch the course data based on activeCourseId
        const course = await apiFetch(`/courses/${userProgress[0].activeCourseId}`);
        courseName = course.title;

      } else {
        console.log('No active course found.');
      }
    } catch (error) {
      console.error('Error fetching course name:', error);
    }
  }

  return (
    <main className="h-screen min-h-screen">
      <Experience userId={userId} courseName={courseName} />
    </main>
  );
}

