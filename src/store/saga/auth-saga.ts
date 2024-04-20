import { call, takeEvery, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { LoginRequest, UserInfo } from "../../model";
import {  setLoading, setSession } from "../slice";
import { sagaActions } from "./saga-actions";

type axiosProps = {
    url: string,
    method: string,
    data: any
}

let axiosRequest = async ({url, method, data}: axiosProps) => {
  return await Axios({
    url,
    method,
    data
  });
};

export function* loginUser(loginRequest: PayloadAction<LoginRequest>): Generator<any, void, any> {
  try {
    yield put(setLoading(true))

    let result = yield call(() => axiosRequest({ url: "http://143.198.168.244:3000/api/users/login", method: 'post', data: loginRequest }));

    yield put(setSession(result.data));

  } catch (e) {
    yield put({ type: sagaActions.LOGIN_FAILURE });
  }
  finally {
    yield put(setLoading(false))
  }
}

export function* registerUser(userInfo: PayloadAction<UserInfo>): Generator<any, void, any> {
  try {
    yield put(setLoading(true))

    let result = yield call(() => axiosRequest({ url: "http://143.198.168.244:3000/api/users/register/v2", method: 'post', data: userInfo.payload }));

    yield put(setSession(result.data));
  } catch (e) {

  }
  finally {
    yield put(setLoading(true))
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.LOGIN_SUCCESS, loginUser);
  yield takeEvery(sagaActions.REGISTER_SUCCESS, registerUser);
}