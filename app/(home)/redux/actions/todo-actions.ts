import { PayloadAction, WritableDraft } from "@reduxjs/toolkit";
import { TodoTypes } from "@/types/todo";

type StateProps = WritableDraft<TodoTypes[]>;

// State ==> proxy is mutable by immer so we don't need to return the state

export const addTodoAction = (
  state: StateProps,
  action: PayloadAction<TodoTypes>
) => {
  console.log({ action });

  console.log({ state });

  state.push({
    ...action.payload,
    createdAt: new Date().toISOString(),
  });
};

export const updateTodo = (
  state: StateProps,
  action: PayloadAction<Partial<TodoTypes> & { id: string }>
) => {
  // return state.map((todo) =>
  //   todo.id === action.payload.id
  //     ? {
  //         ...todo,
  //         ...action.payload,
  //       }
  //     : todo
  // );
  const index = state.findIndex((todo) => todo.id === action.payload.id);
  if (index !== -1) {
    state[index] = { ...state[index], ...action.payload };
  }
};

export const clearTodos = (state: StateProps) => {
  state.length = 0;
};

export const removeTodo = (
  state: StateProps,
  action: PayloadAction<{ id: string }>
) => {
  return state.filter((todo) => todo.id !== action.payload.id);
};

export const toggleTodo = (
  state: StateProps,
  action: PayloadAction<{ id: string }>
) => {
  const todo = state.find((t) => t.id === action.payload.id);
  if (todo) {
    todo.completed = !todo.completed;
    todo.timeCompleted = todo.completed ? new Date().toISOString() : undefined;
  }
};

export const clearCompleted = (state: StateProps) => {
  return state.filter((todo) => !todo.completed);
};
