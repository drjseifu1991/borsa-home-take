import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice";
import { GlobalErrorReducer } from "./slice/error-slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    globalError: GlobalErrorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;