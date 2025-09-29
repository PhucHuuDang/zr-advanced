import { PayloadAction, WritableDraft } from "@reduxjs/toolkit";
import { InitialStateProps } from "../r-slices/todo-slice";
import { TodoTypes } from "@/types/todo";
export const addTodoAction = (
  state: WritableDraft<InitialStateProps>,
  action: PayloadAction<Omit<TodoTypes, "createdAt">>
) => {
  state.todos.push({
    ...action.payload,
    createdAt: new Date(),
    id: crypto.randomUUID(),
    completed: false,
  });
};

export const updateTodo = (
  state: WritableDraft<InitialStateProps>,
  action: PayloadAction<Partial<TodoTypes>>
) => {
  state.todos = state.todos.map((todo) =>
    todo.id === action.payload.id
      ? {
          ...todo,
          ...{
            ...action.payload,
            updatedAt: new Date(),
          },
        }
      : todo
  );
};

export const clearTodos = (state: WritableDraft<InitialStateProps>) => {
  state.todos = [];
};

export const removeTodo = (
  state: WritableDraft<InitialStateProps>,
  action: PayloadAction<{ id: string }>
) => {
  state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
};

export const toggleTodo = (
  state: WritableDraft<InitialStateProps>,
  action: PayloadAction<{ id: string }>
) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === action.payload.id) {
      return {
        ...todo,
        completed: !todo.completed,
        timeCompleted: !todo.completed ? new Date() : undefined,
      };
    }
    return todo;
  });
};

export const clearCompleted = (
  state: WritableDraft<InitialStateProps>,
  action: PayloadAction<void>
) => {
  state.todos = state.todos.filter((todo) => !todo.completed);
};
