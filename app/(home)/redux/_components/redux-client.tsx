"use client";

import React from "react";
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

  console.log({ todos });

  const actions = {
    todosStore: todos,
    addTodoStore: (todo: TodoTypes) => dispatch(addTodo(todo)),
    updateTodoStore: (todo: Partial<TodoTypes>) => dispatch(updateTodo(todo)),
    removeTodoStore: (id: string) => dispatch(removeTodos({ id })),
    toggleTodoStore: (id: string) => dispatch(toggleTodo({ id })),
    clearTodosStore: () => dispatch(clearTodos()),
    clearCompletedStore: () => dispatch(clearCompleted()),
  };

  return <TodoContainer {...actions} />;
};

export default ReduxClient;
