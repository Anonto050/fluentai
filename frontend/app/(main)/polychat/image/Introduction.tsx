import React from "react";
import Image from "next/image";

function Introduction() {
  return (
    <div className="flex flex-col h-full space-y-4 p-4 overflow-auto">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-yellow-500">
        Chat with Images
      </h1>
      {/* <p className="text-gray-700">
        Welcome to this tutorial where you`ll embark on the journey to build a
        full-stack website leveraging ChatGPT-4 Vision. This tutorial is crafted
        to guide you through using Next.js 13, TypeScript, and TailwindCSS to
        create an interactive, modern web application.
      </p> */}
      <h2 className="text-xl font-semibold text-gray-900">
        How to Use This App
      </h2>
      <p className="text-gray-600">
        Step into the realm of AI-powered image analysis. our this feature will
        analyze your uploaded images, providing insights and enhancing your
        conversations. Upload 1 to 5 images with each chat message to get
        started.
      </p>
      <h3 className="text-lg font-semibold text-gray-900">Explore Use Cases</h3>
      <ul className="list-disc list-inside text-gray-600 flex-grow">
        <li>Let it assess the effectiveness of your thumbnails.</li>
        <li>Delve into educational image analysis.</li>
        <li>Stimulate your creativity with AI-driven writing prompts.</li>
        <li>
          Engage in interactive quizzes by identifying objects and scenes.
        </li>
      </ul>
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[324px] lg:w-[324px]">
        <Image src="/hero.svg" alt="Hero" fill />
      </div>
      {/* <div className="mt-auto">
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-sm">
            Made with <span className="text-red-500">&hearts;</span> by Brandon
            Hancock (@bhancock_ai)
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Introduction;
