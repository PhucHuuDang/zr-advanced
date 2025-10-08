import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../types/user.types";
import { SLICE_NAMES } from "../key/slice-names";
import { normalize, schema } from "normalizr";
import { toast } from "sonner";
import { userApi } from "./services/user-api";

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
      const normalizedData = normalize(await userApi.fetchUser(), [userEntity]);

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
      const updated = await userApi.updateUser(values.id, values.user);

      toast.success("User updated successfully");

      return updated;

      // return (await res.json()) as User;
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
      const res = await userApi.addUser(user);

      toast.success("User created successfully");

      return res;
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
      const res = await userApi.deleteUser(id);

      toast.success("User deleted successfully");

      return res;
      // return await res.json();
    } catch (error: any) {
      toast.error("User deleted failed");
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);
