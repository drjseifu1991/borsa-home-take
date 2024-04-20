import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../app-store";
import { LoginRequest } from "../../model/login-request";
import { Session } from "../../model/session";

interface AuthState {
  session: Session;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  session: null,
  isLoading: false,

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
  },
});

export function logIn(request: LoginRequest) {
  return async function logInThunk(dispatch: any, getState: any) {
    try {
      dispatch(setLoading(true)); // Start loading

      const response = await axios.post("appEndpoint.postAccessToken", request);
      const userInfo = await axios.get("appEndpoint.getQuery", {
        params: {
          access_token: response.data,
          query: "authQueries.getUser(request.userName)",
        },
      });
     
      dispatch(setSession({ accessToken: response.data, userInfo: userInfo.data }));
 
    } catch (error: any) {
      
    }
    finally {
      dispatch(setLoading(false)); 
    }
  };
}

export const { setSession, logOut,setLoading } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState):Session => state.auth.session;
export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;

export const authReducer = authSlice.reducer;
