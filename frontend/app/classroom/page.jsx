import { Experience } from "./Experience";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();  

  return (
    <main className="h-screen min-h-screen">
      <Experience userId={userId} />  
    </main>
  );
}
