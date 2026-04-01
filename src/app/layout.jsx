import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/component/Navbar";
import Providers from "./providers";

import { ToastProvider } from "@/context/ToastContext";
import { NotificationProvider } from "@/context/NotificationContext";
import ToastContainer from "@/component/Toast/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Explorer",
  description:
    "A simple platform to search, explore, and discover anime from a growing collection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-black
          text-anime-soft
          min-h-screen
          w-full
          overflow-x-hidden
        `}
      >
        <Providers>
          <NotificationProvider>
            <ToastProvider>
              {/* NAVBAR */}
              <Navbar />

              {/* MAIN CONTENT */}
              <main className="relative min-h-screen w-full overflow-x-hidden">
                {children}
              </main>

              {/* GLOBAL TOAST */}
              <ToastContainer />
            </ToastProvider>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
