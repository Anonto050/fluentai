"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; 

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SaveUserPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const saveUser = async () => {

      console.log('User:', user);

      if (user?.id && user?.emailAddresses?.[0]?.emailAddress) {
        try {
          await fetch(`${backendUrl}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: user.id,
              username: user.username ?? '',
              email: user.emailAddresses[0].emailAddress,
              name: `${user.firstName ?? ''} ${user.lastName ?? ''}`,
              photoUrl: user.imageUrl ?? '',
              nativeLangId: 1, 
            }),
          });
          console.log('User saved successfully');
        } catch (error) {
          console.error('Error saving user:', error);
        }
      }

      // After saving, redirect the user to the desired page
      router.push("/courses");
    };

    saveUser();
  }, [user, router]);

  return <p>Saving your details, please wait...</p>;
}
