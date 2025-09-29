"use client";

import React from "react";
import { Provider } from "react-redux";
import { useRef } from "react";
import { AppStore, store } from "../r-stores/store";

interface StoreProviderProps {
  children: React.ReactNode;
}
const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = store();

    // storeRef.current.dispatch()
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
