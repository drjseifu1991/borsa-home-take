import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../app-store";
import { LoginRequest } from "../../model/login-request";
import { Session } from "../../model/session";

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



export const { 
  setSession, 
  logOut,
  setLoading, 
  setEditNameModalVisible, 
  setEditUserNameModalVisible, 
  setEditEmailModalVisible, 
  setEditAddressModalVisible 
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState):Session => state.auth.session;
export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;
export const selectEditNameModalVisibile = (state: RootState):boolean => state.auth.editNameModalVisibile;
export const selectEditUserNameModalVisibile = (state: RootState):boolean => state.auth.editUserNameModalVisibile;
export const selectEditEmailModalVisibile = (state: RootState):boolean => state.auth.editEmailModalVisibile;
export const selectEditAddressModalVisibile = (state: RootState):boolean => state.auth.editAddressModalVisibile;

export const authReducer = authSlice.reducer;
