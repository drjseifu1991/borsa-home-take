import { call, takeEvery, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { LoginRequest, UserEditModel, UserInfo, UserRegistrationModel } from "../../model";
import {  setLoading, setSession, selectSession, setEditNameModalVisible, setEditUserNameModalVisible, setEditEmailModalVisible, setEditAddressModalVisible, setError } from "../slice";
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

  } catch (e: any) {
    yield put(setError(e.response.data.message ?? e.message))
  }
  finally {
    yield put(setLoading(false))
  }
}

export function* registerUser(userInfo: PayloadAction<UserRegistrationModel>): Generator<any, void, any> {
  try {
    yield put(setLoading(true))
    console.log(userInfo)
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
  } catch (e: any) {
    yield put(setError(e.response.data.message ?? e.message))
  }
  finally {
    yield put(setLoading(false))
  }
}

export function* editUser(userInfo: PayloadAction<UserEditModel>): Generator<any, void, any> {
  try{
    yield put(setLoading(true))
  
    let editedInfo: Omit<UserEditModel, '_id'> = { ...userInfo.payload };
    let result = yield call(() => axiosRequest({url: `http://143.198.168.244:3000/api/users/profile?id=${userInfo.payload._id}`, method: "put", data: editedInfo}))
    const currentSession: any = yield select(selectSession);
    const currentUserInfo: UserInfo = currentSession.userInfo;
    yield put(setSession({accessToken: result.data.token, userInfo: {
      _id: result.data._id ?? currentUserInfo._id,
      firstName: result.data.firstName ?? currentUserInfo.firstName,
      lastName: result.data.lastName ?? currentUserInfo.lastName,
      userName: result.data.userName ?? currentUserInfo.userName,
      email: result.data.email ?? currentUserInfo.email,
      profilePic: result.data.profilePic ?? currentUserInfo.profilePic,
      isBuyer: result.data.isBuyer !== null || result.data.isBuyer !== undefined ? result.data.isBuyer : currentUserInfo.isBuyer,
      address: result.data.address ?? currentUserInfo.address 
    }}));
  } catch (e: any) {
    yield put(setError(e.response.data.message ?? e.message))
  }
  finally {
    yield put(setLoading(false))
    yield put(setEditNameModalVisible(false))
    yield put(setEditUserNameModalVisible(false))
    yield put(setEditEmailModalVisible(false))
    yield put(setEditAddressModalVisible(false))
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.LOGIN_REQUEST, loginUser);
  yield takeEvery(sagaActions.REGISTER_USER, registerUser);
  yield takeEvery(sagaActions.EDIT_PROFILE, editUser);
}