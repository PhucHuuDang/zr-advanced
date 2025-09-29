import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import todosReducer from "@/app/(home)/redux/r-slices/todo-slice";
export const store = configureStore({
  reducer: {
    ...todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
