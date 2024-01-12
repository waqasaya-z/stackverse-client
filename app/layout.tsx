import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/context/QueryClient";
import UserAuthProvider from "@/context/UserAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackVerse | Future",
  description: "The way forward"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <UserAuthProvider>
            <Navbar />
            {children}
            <Toaster />
          </UserAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
