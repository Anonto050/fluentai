import ChatPage from "./chatPage";
import { auth } from "@clerk/nextjs/server";

export async function generateStaticParams() {
  return [
    { scenario: "travel-agent" },
    { scenario: "restaurant" },
    { scenario: "doctor" },
    { scenario: "teacher" },
    { scenario: "business" },
  ];
}

export default function Home({ params }: { params: { scenario: string } }) {
  const { scenario } = params;

  const { userId } = auth();

  return (
      <main>
        <ChatPage scenario={scenario} userId={userId ?? ""}/>
      </main>
    );
}