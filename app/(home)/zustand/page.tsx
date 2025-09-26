import { Metadata } from "next";
import { ZustandClient } from "./_z_components/zustand-client";

export const metadata: Metadata = {
  title: "Zustand",
  description: "Zustand is a state management library for React",
};

const ZustandPage = () => {
  return (
    <>
      <ZustandClient />
    </>
  );
};

export default ZustandPage;
