import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "FluentAI",
  description:
    "Interactive platform for language learning with lessons, quizzes, and progress tracking.",
  keywords: [
    "language learning",
    "FluentAI",
    "learn languages",
    "interactive learning",
    "language courses",
    "language practice",
    "quizzes",
    "progress tracking",
    "reactjs",
    "nextjs",
    "vercel",
    "tailwindcss",
    "typescript",
    "shadcn-ui",
    "radix-ui",
    "postgresql",
    "zustand",
    "clerk",
    "ui/ux",
    "web app",
    "education",
    "online learning",
  ] as Array<string>,
  authors: {
    name: "Riad Ahmed Anonto",
    url: "https://github.com/Anonto050",
  },
} as const;

export const links = {
  sourceCode: "https://github.com/Anonto050/fluentai-frontend",
} as const;
