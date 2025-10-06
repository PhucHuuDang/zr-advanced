import {
  Action,
  createAction,
  createAsyncThunk,
  createReducer,
  WritableDraft,
} from "@reduxjs/toolkit";
import { User } from "../../features/thunk-slice";

interface StateProps {
  value: number;
}

// matcher
const matcherReducer = createReducer(0, (builder) => {
  builder.addCase("inc", (state: number, action: Action<"inc">) => {
    return state + 1;
  });

  builder.addMatcher(
    (action) => action.type.startsWith("i"),
    (state: number) => state + 5
  );

  builder.addMatcher(
    (action) => action.type.endsWith("c"),
    (state) => state + 20
  );
});

// actions create

const inc = createAction<number>("inc");

const dec = createAction<number>("dec");

const initialState: StateProps = {
  value: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(inc, (state, action) => {
    state.value += action.payload;
  });

  builder.addCase(dec, (state, action) => {
    state.value -= action.payload;
  });
});

//

const fetchUserById = createAsyncThunk("user/byId", async (id: number) => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const res = await fetch(`${url}/${id}`);
  return (await res.json()).data;
});

const thunkReducer = createReducer(
  {
    data: {} as User,
    loading: "pending",
    error: null,
  } as { data: User; loading: string; error: any | null },
  (builder) => {
    builder.addAsyncThunk(fetchUserById, {
      pending: (state: WritableDraft<{ data: User; loading: string }>) => {
        state.loading = "pending";
      },

      fulfilled: (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      },

      rejected: (state, action) => {
        state.loading = "rejected";
        state.data = {} as User;
        state.error = action.error;
      },

      settled: (state, action) => {
        state.loading = action.meta.requestStatus;
      },
    });
  }
);
