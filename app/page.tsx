"use client";
import { useState } from "react";
import HomePage from "./Home";
import ModalComponent from "./Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center mt-40">
      <h1 className="text-8xl p-20 cursor-default"> StackVerse </h1>
      <HomePage setIsOpen={setIsOpen} />
      <ModalComponent open={isOpen} onClose={onClose} />
    </div>
  );
}
