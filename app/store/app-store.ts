import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice";
import { GlobalErrorReducer } from "./slice/error-slice";
import rootSaga from "./saga/auth-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalError: GlobalErrorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;