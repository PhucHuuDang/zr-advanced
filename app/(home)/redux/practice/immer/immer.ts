import { createReducer, createSlice, current } from "@reduxjs/toolkit";

type ActionProps = { payload: any; type: string };

const todoReducer = createReducer([], (builder) => {
  builder.addCase("todosReducer", (state: any, action: any) => {
    state.push(action.payload);
  });
});

const todoSlice = createSlice({
  name: "immer-todos",
  initialState: [],
  reducers: {
    //* this is broken reducer because we are mutating the state directly
    brokenReducer: (state: any, action: ActionProps) =>
      state.push(action.payload as any),

    //* no return
    workingReducer: (state: any, action: ActionProps) =>
      void state.push(action.payload),

    //* no return
    workingReducer2: (state: any, action: ActionProps) => {
      state.push(action.payload);
    },

    //* need to log the state

    needToLog: (state: any, action: ActionProps) => {
      //! logs the Proxy-wrapped data
      console.log(state);

      //** plain JS copy of the data */
      console.log(current(state));
    },

    //* nested update

    nestedUpdate: (state: any, action: ActionProps) => {
      const todo = state.find((data: any) => todo.id === action.payload.id);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
