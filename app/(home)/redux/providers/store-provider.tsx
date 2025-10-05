"use client";

import React from "react";
import { Provider } from "react-redux";
import { useRef } from "react";
import { AppStore, store } from "../r-stores/store";
import { PersistGate } from "redux-persist/integration/react";

import { persistStore } from "redux-persist";

interface StoreProviderProps {
  children: React.ReactNode;
}
const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>(undefined);

  const persistor = useRef<ReturnType<typeof persistStore>>(undefined);

  if (!storeRef.current || !persistor.current) {
    storeRef.current = store();
    persistor.current = persistStore(storeRef.current);

    // storeRef.current.dispatch()
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor.current}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
