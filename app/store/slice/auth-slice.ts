// Import necessary dependencies
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app-store";
import { Session } from "../../model/session";

// Define the initial state interface
interface AuthState {
  session: Session;
  isLoading: boolean;
  editNameModalVisibile: boolean;
  editUserNameModalVisibile: boolean;
  editEmailModalVisibile: boolean;
  editAddressModalVisibile: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  session: null,
  isLoading: false,
  editNameModalVisibile: false,
  editUserNameModalVisibile: false,
  editEmailModalVisibile: false,
  editAddressModalVisibile: false
};

// Create authSlice using createSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
    },
    logOut: (state) => {
      state.session = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEditNameModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editNameModalVisibile = action.payload;
    },
    setEditUserNameModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editUserNameModalVisibile = action.payload;
    },
    setEditEmailModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editEmailModalVisibile = action.payload;
    },
    setEditAddressModalVisible: (state, action: PayloadAction<boolean>) => {
      state.editAddressModalVisibile = action.payload;
    },
  },
});

// Define selector to retrieve data from state
export const selectSession = (state: RootState):Session => state.auth.session;
export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;
export const selectEditNameModalVisibile = (state: RootState):boolean => state.auth.editNameModalVisibile;
export const selectEditUserNameModalVisibile = (state: RootState):boolean => state.auth.editUserNameModalVisibile;
export const selectEditEmailModalVisibile = (state: RootState):boolean => state.auth.editEmailModalVisibile;
export const selectEditAddressModalVisibile = (state: RootState):boolean => state.auth.editAddressModalVisibile;

// Extract action creators and reducer from AuthSlice
export const { 
  setSession, 
  logOut,
  setLoading, 
  setEditNameModalVisible, 
  setEditUserNameModalVisible, 
  setEditEmailModalVisible, 
  setEditAddressModalVisible 
} = authSlice.actions;

export const authReducer = authSlice.reducer;