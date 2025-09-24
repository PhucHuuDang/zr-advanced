import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Zustand",
  description: "Zustand is a state management library for React",
};

const ZustandPage = () => {
  return (
    <div className="w-full h-full container mx-auto">
      <div className="pt-10">
        <h1>Zustand</h1>
        <p>
          Zustand is a state management library for React. It is a lightweight
          and easy to use state management library.
        </p>
      </div>
    </div>
  );
};

export default ZustandPage;
