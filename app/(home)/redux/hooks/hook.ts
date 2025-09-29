import { useDispatch, useSelector, useStore } from "react-redux";

import { type RootState, type AppDispatch, AppStore } from "../r-stores/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppStore = useStore.withTypes<AppStore>();
