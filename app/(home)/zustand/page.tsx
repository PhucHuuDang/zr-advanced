import TodoContainer from "@/components/todos/todo-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zustand",
  description: "Zustand is a state management library for React",
};

const ZustandPage = () => {
  return (
    <>
      <TodoContainer />
    </>
  );
};

export default ZustandPage;
