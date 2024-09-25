"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { Loading } from "react-admin";
import Loading from "./loading";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CheckUserPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      try {
        // Fetch all users from the backend
        const response = await fetch(`${backendUrl}/users`);
        const users = await response.json();

        // Check if the user exists in the database
        const userExists = users.some((existingUser: any) => existingUser.id === user.id);

        if (!userExists) {
          // If the user doesn't exist, redirect to the SaveUserPage
          router.push("/save-user");
        } else {
          // If the user exists, redirect to the courses page
          router.push("/courses");
        }
      } catch (error) {
        console.error('Error checking user:', error);
        // Handle error, possibly show an error page or a message
      }
    };

    checkUser();
  }, [user, router]);

  return <p>Checking your account, please wait...</p>;
  // return <Loading />;
}
