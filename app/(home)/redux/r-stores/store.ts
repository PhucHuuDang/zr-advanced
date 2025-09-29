import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import todosReducer from "@/app/(home)/redux/features/todo-slice";
export const store = () =>
  configureStore({
    reducer: {
      [SLICE_NAMES.TODOS]: todosReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
