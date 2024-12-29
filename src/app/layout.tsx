import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/tooltip.css";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GameHub",
  description: "Your ultimate gaming destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-background text-text antialiased`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(110, 231, 183, 0.1), transparent 25%),
            radial-gradient(circle at 0% 50%, rgba(129, 140, 248, 0.1), transparent 25%),
            radial-gradient(circle at 100% 50%, rgba(244, 114, 182, 0.1), transparent 25%)
          `,
        }}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="ml-64 p-4 w-full">
            <div className="container mx-auto">
              <SearchBar />
            </div>
            <main className=" overflow-x-hidden">
              <div className="container mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
