import { create } from "zustand";

interface BearState {
  bears: number;
}
interface BearActions {
  increasePopulation: () => void;
  removeAllBears: () => void;

  updateBears: (bears: number) => void;
}

export const useBearStore = create<BearState & BearActions>((set) => {
  return {
    bears: 0,

    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBear: number) => set({ bears: newBear }),
  };
});
