import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import todosReducer from "@/app/(home)/redux/features/todo-slice";
import thunkReducer from "../features/thunk-slice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PURGE,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import logger from "redux-logger";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

const todosPersistConfig = {
  key: "r-todos",
  version: 1,
  storage,
  whitelist: [SLICE_NAMES.TODOS], // point specifically reducer that only the key reducer will be persisted
  stateReconciler: autoMergeLevel2,
};

// offline configuration
const offlineConfiguration = {
  ...offlineConfig,
  retry: (action: any, retries: number) => (retries < 3 ? 2000 : null),
};

const rootReducer: Reducer = combineReducers({
  [SLICE_NAMES.TODOS]: todosReducer,
  [SLICE_NAMES.THUNK]: thunkReducer,
});

const persistedReducer = persistReducer(todosPersistConfig, rootReducer);

export const store = () =>
  configureStore({
    reducer: persistedReducer,

    devTools: process.env.NODE_ENV !== "production",

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [
            FLUSH,
            REHYDRATE,
            PURGE,
            PERSIST,
            PAUSE,
            REGISTER,
          ] as any,
        },
      }).concat(logger);
    },

    duplicateMiddlewareCheck: true,
  });

export const persistor = persistStore(store());

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
// export type RootState = ReturnType<ReturnType<typeof store>["getState"]>;
export type AppDispatch = AppStore["dispatch"];
