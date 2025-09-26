// import { create } from "zustand";
import { createWithEqualityFn as create } from "zustand/traditional";

import { TodoTypes } from "@/types/todo";
import { createSelectors } from "./auto-generatin-slectors";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

import { immer } from "zustand/middleware/immer";

import { shallow } from "zustand/vanilla/shallow";

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
  devtools(
    persist(
      immer((set) => ({
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
      })),
      {
        name: "z-todos",

        //* the default is localstorage, but we can change it to sessionstorage
        storage: createJSONStorage(() => localStorage),
        // partialize: (state) => state.todos,

        onRehydrateStorage: (state) => {
          const countTime = new Date().getTime();
          const countTimeEnd = new Date().getTime();

          console.log("hydration starts", countTimeEnd - countTime);

          // optional
          return (state, error) => {
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              console.log("hydration finished");
              console.log("hydration time", countTimeEnd - countTime);
            }
          };
        },
      }
    ),
    shallow
  )
);

// useTodoStore.devtools.cleanup();

export const selectorTodo = createSelectors(useTodoStore);
