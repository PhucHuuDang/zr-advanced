"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import TodoContainer from "@/components/todos/todo-container";
import { TodoTypes } from "@/types/todo";
import {
  addTodo,
  clearCompleted,
  clearTodos,
  removeTodos,
  updateTodo,
} from "../features/todo-slice";
import { fetchUsers } from "../features/thunk-slice";
import { SLICE_NAMES } from "../key/slice-names";
import { RootState } from "../r-stores/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const url = "https://jsonplaceholder.typicode.com/users";

const ReduxClient = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(
    (state: RootState) => state[SLICE_NAMES.TODOS] ?? []
  );

  // console.log("todosStore =", todos);

  const { users } = useAppSelector(
    (state: RootState) => state[SLICE_NAMES.THUNK]
  );

  useEffect(() => {
    dispatch(fetchUsers(url));
  }, [dispatch]);

  // console.log({ users });
  // console.log({ status });
  // console.log({ error });

  const actions = {
    todosStore: todos ?? [],
    addTodoStore: (todo: TodoTypes) =>
      dispatch(addTodo({ ...todo, createdAt: new Date().toISOString() })),
    updateTodoStore: (todo: Partial<TodoTypes>, id: string) => {
      console.log({ todo });
      const serialized = {
        ...todo,
        completedAt: todo.completed ? new Date().toISOString() : undefined,
        timeCompleted: todo.completed ? new Date().toISOString() : undefined,
        updatedAt: new Date().toISOString(),
      };

      dispatch(
        updateTodo({
          ...serialized,
          id,
        })
      );
    },
    removeTodoStore: (id: string) => dispatch(removeTodos({ id })),

    clearTodosStore: () => dispatch(clearTodos()),
    clearCompletedStore: () => dispatch(clearCompleted()),
  };

  return (
    <>
      <TodoContainer {...actions} />

      <Link href="/redux/users" className="p-4 bg-slate-200 rounded-lg">
        Manage Users
      </Link>
    </>
  );
};

export default ReduxClient;
