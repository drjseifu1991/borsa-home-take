// Import necessary dependencies
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app-store";

// Define the initial state interface
interface GlobalErrorState {
  error: any;
}

// Define the initial state using the GlobalErrorState interface
const initialState: GlobalErrorState = { error: null };

// Create GlobalErrorSlice using createSlice
const GlobalErrorSlice = createSlice({
  name: "globalError",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

// Define selector to retrieve error from state
export const selectError = (state: RootState) => state.globalError.error;

// Extract action creators and reducer from GlobalErrorSlice
export const { setError } = GlobalErrorSlice.actions;
export const GlobalErrorReducer = GlobalErrorSlice.reducer;
