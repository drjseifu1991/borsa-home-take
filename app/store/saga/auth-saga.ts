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
    
    let result = yield call(() => axiosRequest({ url: "http://143.198.168.244:3000/api/users/login", method: 'post', data: loginRequest.payload}));

    yield put(setSession({accessToken: result.data.token, userInfo: {
      _id: result.data._id,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      userName: result.data.userName,
      email: result.data.email,
      profilePic: result.data.profilePic,
      isBuyer: result.data.isBuyer,
      address: result.data.address
    }}));

  } catch (e) {

  }
  finally {
    yield put(setLoading(false))
  }
}

export function* registerUser(userInfo: PayloadAction<UserInfo>): Generator<any, void, any> {
  try {
    yield put(setLoading(true))

    let result = yield call(() => axiosRequest({ url: "http://143.198.168.244:3000/api/users/register/v2", method: 'post', data: userInfo.payload }));
    yield put(setSession({accessToken: result.data.token, userInfo: {
      _id: result.data._id,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      userName: result.data.userName,
      email: result.data.email,
      profilePic: result.data.profilePic,
      isBuyer: result.data.isBuyer,
      address: result.data.address
    }}));
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