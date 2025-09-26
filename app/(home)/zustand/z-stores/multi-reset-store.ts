import type { StateCreator, StoreApi, UseBoundStore } from "zustand";

import { create } from "zustand";

type StoreName = string;

const storeResetFns = new Map<string, () => void>();

const resetStore = () => {
  return storeResetFns.forEach((resetFn) => resetFn());
};

export const reliablyResetStore = (<T>(storeName: string) => {
  return (stateCreator: StateCreator<T>) => {
    const store = create(stateCreator);

    storeResetFns.set(storeName, () => {
      store.setState(store.getInitialState(), true);
    });

    return store as UseBoundStore<StoreApi<T>>;
  };
}) as typeof create;
``;
export const chooseStoreToReset = <T>(storeName: T) => {
  const fnChoose = storeResetFns.get(storeName as string);

  if (fnChoose) {
    fnChoose();
  } else {
    console.warn(`No reset function found for store: ${storeName as string}`);
  }
};
