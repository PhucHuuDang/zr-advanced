"use client";

import TodoContainer from "@/components/todos/todo-container";
import React from "react";
import { selectorTodo } from "../z-stores/todos";

import { useShallow } from "zustand/react/shallow";

export const ZustandClient = () => {
  // const todosStore = useShallow(selectorTodo.use.todos);
  // const todosStore = selectorTodo.use.todos()

  // const addTodoStore = selectorTodo.use.addTodo();
  // const updateTodoStore = selectorTodo.use.updateTodo();
  // const removeTodoStore = selectorTodo.use.removeTodo();
  // const clearTodosStore = selectorTodo.use.clearTodos();
  // const clearCompletedStore = selectorTodo.use.clearCompleted();

  const {
    todos: todosStore,
    addTodo: addTodoStore,
    updateTodo: updateTodoStore,
    removeTodo: removeTodoStore,
    clearTodos: clearTodosStore,
    clearCompleted: clearCompletedStore,
  } = selectorTodo(
    useShallow((state) => ({
      todos: state.todos,
      addTodo: state.addTodo,
      updateTodo: state.updateTodo,
      removeTodo: state.removeTodo,
      clearTodos: state.clearTodos,
      clearCompleted: state.clearCompleted,
    }))
  );

  const actions = {
    todosStore,
    addTodoStore,
    updateTodoStore,
    removeTodoStore,
    clearTodosStore,
    clearCompletedStore,
  };

  return (
    <>
      <TodoContainer {...actions} />
    </>
  );
};
