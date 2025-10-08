import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_NAMES } from "../key/slice-names";
import { toast } from "sonner";
import { addUser, deleteUser, fetchUsers, updateUser } from "./thunk-actions";
import { ThunkState, User } from "../types/user.types";

const initialState: ThunkState = {
  users: [],
  status: "pending",
  error: null,
};

const thunkSlice = createSlice({
  name: SLICE_NAMES.THUNK,
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
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

    // matcher
    builder.addMatcher(
      (action) => action.type.endsWith("pending"),
      (state) => {
        state.status = "pending";
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("rejected"),
      (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";

        const message = action.error.message || "Unknown error";

        toast.error(message);
      }
    );
  },
});

export default thunkSlice.reducer;
