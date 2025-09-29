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
      <h1 className="text-2xl font-bold text-center mb-10">
        Core Redux → 2. Redux Toolkit → 3. Async logic → 4. Performance → 5.
        Scale codebase → 6. Saga/RTK Query → 7. Testing.
      </h1>
      <ReduxClient />
    </div>
  );
};

export default ReduxPage;
