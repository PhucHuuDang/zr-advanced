import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import { schema, normalize } from "normalizr";

export interface User {
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

const userEntity = new schema.Entity("users");

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
      // return (await res.json()) as User[];
      const normalizedData = normalize(await res.json(), [userEntity]);

      return normalizedData.entities.users as User[];
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
