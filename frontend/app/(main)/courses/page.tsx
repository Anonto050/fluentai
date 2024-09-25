"use client";

import { useState, useEffect } from "react";
import { List } from "./list";
import { apiFetch } from "@/lib/apiService";
import { courses, userProgress } from "@/types/schema";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { Card } from "./card";

const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<courses[]>([]);
  const [userProgress, setUserProgress] = useState<userProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Define the Sign Language course
  const signCourse = {
    id: 10,
    title: "Sign Language",
    imageSrc: "/sign.png",
  };

  // Define the Vision Pal course
  const visionCourse = {
    id: 11, // Unique id for Vision Pal
    title: "Vision Pal",
    imageSrc: "/vision.svg", // Path to the Vision Pal image
  };

  // Handle Sign Language course click
  const onSignCourseClick = () => {
    router.push(`/sign`); // Navigate to the sign course page
  };

  // Handle Vision Pal course click
  const onVisionCourseClick = () => {
    router.push(`/vision`); // Navigate to the vision course page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCourses, fetchedUserProgress] = await Promise.all([
          apiFetch("/courses"),
          apiFetch("/user-progress"),
        ]);
        setCourses(fetchedCourses);
        setUserProgress(fetchedUserProgress);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />

      <h1 className="text-2xl font-bold text-neutral-700 my-4">Special Courses</h1>
      <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
        {/* Card for the Sign Language course */}
        <Card
          title={signCourse.title}
          id={signCourse.id}
          imageSrc={signCourse.imageSrc}
          onClick={onSignCourseClick}
          disabled={false}
          isActive={false}
        />
        
        {/* Card for the Vision Pal course */}
        <Card
          title={visionCourse.title}
          id={visionCourse.id}
          imageSrc={visionCourse.imageSrc}
          onClick={onVisionCourseClick}
          disabled={false}
          isActive={false}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
