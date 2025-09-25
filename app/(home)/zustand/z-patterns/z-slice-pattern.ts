import { create, StateCreator } from "zustand";

interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

interface FishSlice {
  fishes: number;
  addFish: () => void;
}

interface SharedSlice {
  addBoth: () => void;
  getBoth: () => number;
}

const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => {
  return {
    bears: 0,
    addBear: () => set((state) => ({ bears: state.bears + 1 })),
    eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
  };
};

const createFishSlice: StateCreator<
  FishSlice & BearSlice,
  [],
  [],
  FishSlice
> = (set) => {
  return {
    fishes: 0,
    addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
  };
};

const sharedSlice: StateCreator<BearSlice & FishSlice, [], [], SharedSlice> = (
  set,
  get
) => {
  return {
    addBoth: () => {
      get().addBear(), get().addFish();
    },
    getBoth: () => {
      return get().bears + get().fishes;
    },
  };
};

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => {
  return {
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...sharedSlice(...a),
  };
});
