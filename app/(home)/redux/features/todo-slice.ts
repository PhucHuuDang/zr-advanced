import { createSlice, PayloadAction, WritableDraft } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import { TodoTypes } from "@/types/todo";
import {
  addTodoAction,
  clearTodos as clearTodosAction,
  removeTodo as removeTodoAction,
  updateTodo as updateTodoAction,
  toggleTodo as toggleTodoAction,
  clearCompleted as clearCompletedAction,
} from "../actions/todo-actions";

const initialState: TodoTypes[] = [];

const todosSlice = createSlice({
  name: SLICE_NAMES.TODOS,
  initialState,
  reducers: {
    addTodo: addTodoAction,
    updateTodo: updateTodoAction,
    clearTodos: clearTodosAction,
    removeTodos: removeTodoAction,
    clearCompleted: clearCompletedAction,
    toggleTodo: toggleTodoAction,
  },
});

export const {
  addTodo,
  updateTodo,
  clearTodos,
  removeTodos,
  clearCompleted,
  toggleTodo,
} = todosSlice.actions;

const addTodoOffline = (state: TodoTypes) => {
  const tempId = crypto.randomUUID();

  return {
    type: addTodo.type,
    payload: { ...state, id: tempId },
    meta: {
      offline: {
        effect: {
          url: "/api/todos",
          method: "POST",
          body: JSON.stringify({ ...state, id: tempId }),
          headers: {
            "Content-Type": "application/json",
          },
        },

        commit: {
          type: "todosSuccess",
          me: {
            ...state,
            id: tempId,
          },
        },

        rollback: {
          type: "todosFailed",
          meta: {
            id: tempId,
            error: "Failed to add",
          },
        },
      },
    },
  };
};

export default todosSlice.reducer;
