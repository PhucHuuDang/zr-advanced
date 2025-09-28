import { Metadata } from "next";
import React from "react";
import ReduxClient from "./_components/redux-client";

export const metadata: Metadata = {
  title: "Redux",
  description: "Redux is a state management library for React",
};

const ReduxPage = () => {
  return (
    <div className="pt-10">
      <ReduxClient />
    </div>
  );
};

export default ReduxPage;
