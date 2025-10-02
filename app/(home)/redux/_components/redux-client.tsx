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
  toggleTodo,
  updateTodo,
} from "../features/todo-slice";
import { SLICE_NAMES } from "../key/slice-names";

const ReduxClient = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.todos);

  // const { users, status, error } = useAppSelector(
  //   (state) => state[SLICE_NAMES.THUNK]
  // );

  useEffect(() => {}, []);

  const actions = {
    todosStore: todos,
    addTodoStore: (todo: TodoTypes) =>
      dispatch(addTodo({ ...todo, createdAt: new Date().toISOString() })),
    updateTodoStore: (todo: Partial<TodoTypes>, id: string) => {
      console.log({ todo });

      const timeStamp = {
        completedAt: todo.completedAt ? new Date().toISOString() : undefined,
        timeCompleted: todo.timeCompleted
          ? new Date().toISOString()
          : undefined,
        dueDate: todo.dueDate ? new Date().toISOString() : undefined,
        updatedAt: todo.updatedAt ? new Date().toISOString() : undefined,
      };

      dispatch(
        updateTodo({
          ...todo,
          id,
          ...timeStamp,
        })
      );
    },
    removeTodoStore: (id: string) => dispatch(removeTodos({ id })),

    clearTodosStore: () => dispatch(clearTodos()),
    clearCompletedStore: () => dispatch(clearCompleted()),
  };

  return <TodoContainer {...actions} />;
};

export default ReduxClient;
