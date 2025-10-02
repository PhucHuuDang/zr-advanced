import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import todosReducer, {
  InitialStateProps,
} from "@/app/(home)/redux/features/todo-slice";
import { serializableMiddleware } from "../middlewares/serializable";
import { localStorageMiddleware } from "../middlewares/persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkReducer from "../features/thunk-slice";

const todosPersistConfig = {
  key: "r-todos",
  storage,
  // whitelist: ["todos"],
  version: 1,
};

const rootReducer: ReducersMapObject = {
  [SLICE_NAMES.TODOS]: todosReducer,
  [SLICE_NAMES.THUNK]: thunkReducer,
};

export const store = () =>
  configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== "production",

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat();
    },
  });

export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<ReturnType<typeof store>["getState"]>;

export type AppDispatch = AppStore["dispatch"];
