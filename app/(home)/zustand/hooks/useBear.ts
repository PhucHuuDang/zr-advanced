import { create } from "zustand";

import { devtools } from "zustand/middleware";

interface BearState {
  bears: number;
}
interface BearActions {
  increasePopulation: () => void;
  removeAllBears: () => void;

  updateBears: (bears: number) => void;
}

export const useBearStore = create<BearState & BearActions>()(
  devtools((set) => {
    return {
      bears: 0,

      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      updateBears: (newBear: number) => set({ bears: newBear }),
    };
  })
);

// below like the splice pattern of redux

interface State {
  count: number;
}

interface Actions {
  inc: (value: number) => void;
  des: (value: number) => void;
}

interface Action {
  type: keyof Actions;

  quantity: number;
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "inc":
      return { count: state.count + action.quantity };
    case "des":
      return { count: state.count - action.quantity };

    default:
      return state;
  }
};

export const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  // dispatch: (action: Action) => set((state) => countReducer(state, action)),
  inc: (value: number) =>
    set((state) => countReducer(state, { type: "inc", quantity: value })),
  des: (value: number) =>
    set((state) => countReducer(state, { type: "des", quantity: value })),
}));
