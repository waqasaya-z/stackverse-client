import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/context/QueryClient";

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
          <Navbar />
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
