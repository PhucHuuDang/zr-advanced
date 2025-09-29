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

export interface InitialStateProps {
  todos: TodoTypes[];
}

const initialState: InitialStateProps = {
  todos: [],
};

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

export default todosSlice.reducer;
