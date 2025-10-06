import { createAction, nanoid } from "@reduxjs/toolkit";

// the second parameter is the prepare function
const addTodo = createAction("addTodo", (text: string) => {
  return {
    payload: text,
    id: nanoid(),
    createdAt: new Date().toISOString(),
  };
});
