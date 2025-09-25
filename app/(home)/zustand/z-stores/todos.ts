import { create } from "zustand";
import { TodoTypes } from "@/types/todo";
import { createSelectors } from "./auto-generatin-slectors";
import { persist } from "zustand/middleware";

interface TodoState {
  todos: TodoTypes[];
}

interface TodoActions {
  addTodo: (todo: TodoTypes) => void;
  removeTodo: (id: string) => void;

  updateTodo: (todo: Partial<TodoTypes>, id: string) => void;

  clearTodos: () => void;

  clearCompleted: () => void;
}

const useTodoStore = create<TodoState & TodoActions>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),

      removeTodo: (id: string) =>
        set((state) => {
          const newTodos = [...state.todos].filter((todo) => todo.id !== id);

          return {
            todos: newTodos,
          };
        }),

      updateTodo: (todo, id) =>
        set((state) => {
          const newTodos = [...state.todos].map((data) => {
            if (data.id === id) {
              return {
                ...data,
                ...todo,
                updatedAt: new Date(),
              };
            }

            return data;
          });

          return {
            todos: newTodos,
          };
        }),

      clearTodos: () =>
        set(() => {
          return {
            todos: [],
          };
        }),

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },
    }),
    {
      name: "z-todos",
    }
  )
);

export const selectorTodo = createSelectors(useTodoStore);
