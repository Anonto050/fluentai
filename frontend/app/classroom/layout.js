import { Roboto } from "next/font/google";
import "./classroom.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});


export const metadata = {
  title: "FluentAI | Classroom",
  description: "Learn language with AI Sensei",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
