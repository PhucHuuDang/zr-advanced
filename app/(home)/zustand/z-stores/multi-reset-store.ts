import type { StateCreator, StoreApi, UseBoundStore } from "zustand";

import { create } from "zustand";

type StoreName = string;

const storeResetFns = new Map<StoreName, () => void>();

const resetStore = () => {
  return storeResetFns.forEach((resetFn) => resetFn());
};

export const reliablyResetStore = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = create(stateCreator);

    storeResetFns.set(store.name, () => {
      store.setState(store.getInitialState(), true);
    });

    return store as UseBoundStore<StoreApi<T>>;
  };
}) as typeof create;

export const chooseStoreToReset = <T extends string>(
  storeName: T & (T extends keyof typeof storeResetFns ? T : never)
) => {
  const fnChoose = storeResetFns.get(storeName as string);

  if (fnChoose) {
    fnChoose();
  } else {
    console.warn(`No reset function found for store: ${storeName as string}`);
  }
};
