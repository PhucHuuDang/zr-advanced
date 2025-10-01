import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import todosReducer, {
  InitialStateProps,
} from "@/app/(home)/redux/features/todo-slice";
import { serializableMiddleware } from "../middlewares/serializable";
import { localStorageMiddleware } from "../middlewares/persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const todosPersistConfig = {
  key: "r-todos",
  storage,
  // whitelist: ["todos"],
  version: 1,
};

const rootReducer = persistReducer<InitialStateProps>(
  todosPersistConfig,
  todosReducer
);

export const store = () =>
  configureStore({
    reducer: {
      [SLICE_NAMES.TODOS]: rootReducer,
    },

    devTools: process.env.NODE_ENV !== "production",

    // preloadedState:
    //   typeof window !== "undefined" ? reHydratesStore() : undefined,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        // serializableCheck: {
        //   ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // },
      }).concat(serializableMiddleware, localStorageMiddleware);
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
