import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  WritableDraft,
} from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import { useAppDispatch } from "../hooks/hook";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const url = "https://jsonplaceholder.typicode.com/users";
export interface ThunkState {
  users: User[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ThunkState = {
  users: [],
  status: "pending",
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], string>(
  `${SLICE_NAMES.THUNK}/fetchUsers`,
  async (
    apiUrl: string,
    {
      rejectWithValue,
      abort,
      dispatch,
      extra,
      fulfillWithValue,
      getState,
      requestId,
      signal,
    }
  ) => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch users");
      return (await res.json()) as User[];
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

const thunkSlice = createSlice({
  name: SLICE_NAMES.THUNK,
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        (state.status = "succeeded"), (state.users = action.payload);
      }
    );

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.users = [];
      state.error = action.error.message || "Unknown error";
    });
  },
});

export default thunkSlice.reducer;
