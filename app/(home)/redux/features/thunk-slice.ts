import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import { schema, normalize } from "normalizr";
import { toast } from "sonner";

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

const url = "https://jsonplaceholder.typicode.com/users";

const userEntity = new schema.Entity("users");

export const fetchUsers = createAsyncThunk<User[], string>(
  `${SLICE_NAMES.THUNK}/fetchUsers`,
  async (
    apiUrl: string,
    {
      rejectWithValue,
      // abort,
      // dispatch,
      // extra,
      // fulfillWithValue,
      // getState,
      // requestId,
      // signal,
    }
  ) => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch users");
      // return (await res.json()) as User[];
      const normalizedData = normalize(await res.json(), [userEntity]);

      return Object.values(normalizedData.entities.users || {}) as User[];
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    values: {
      id: number;
      user: Partial<User>;
    },
    { rejectWithValue }
  ) => {
    if (!values.id || !values.user) return rejectWithValue("Invalid values");

    try {
      const res = await fetch(`${url}/${values.id}`, {
        method: "PUT",
        body: JSON.stringify(values.user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to update user");

      toast.success("User updated successfully");

      return (await res.json()) as User;
    } catch (error: any) {
      toast.error("User updated failed");
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const addUser = createAsyncThunk(
  "user/created",
  async (user: User & { id: number }, { rejectWithValue }) => {
    if (!user) return rejectWithValue("The values is empty");

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to create user");
      toast.success("User created successfully");

      return await res.json();
    } catch (error: any) {
      toast.error("User created failed");
      return rejectWithValue(error.message || "Cannot create user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully");

      return await res.json();
    } catch (error: any) {
      toast.error("User deleted failed");
      return rejectWithValue(error.message || "Unknown error");
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

    builder.addCase(updateUser.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error";

      toast.error("User updated failed");
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index >= 0) state.users[index] = action.payload;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.status = "succeeded";

      const exists = state.users.some((u) => u.id === action.payload.id);
      const newUser = {
        ...action.payload,
        id: exists ? Date.now() : action.payload.id,
      };

      state.users.push(newUser);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.filter((u) => u.id !== Number(action.meta.arg));
    });

    builder.addMatcher(
      (action) => action.type.endsWith("rejected"),
      (state, action: any) => {
        state.error = action.error.message || "Unknown error";

        toast.error("User updated failed");
      }
    );
  },
});

export default thunkSlice.reducer;
