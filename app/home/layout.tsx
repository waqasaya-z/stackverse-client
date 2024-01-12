import type { Metadata } from "next";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

export const metadata: Metadata = {
  title: "Home | StackVerse",
  description: "The Way forward"
};

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return ( 
    <main className="flex border h-screen border-black">
      <aside className="bg-black p-4 w-2/12">
        {" "}
        <LeftSideBar />
      </aside>
      <section className="w-8/12 p-4">
        {" "}
        <div>{children}</div>{" "}
      </section>
      <aside className="bg-black p-4 w-2/12">
        {" "}
        <RightSideBar />
      </aside>
    </main>
  );
}
