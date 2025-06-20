import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../utils/api";
import axios from "axios";
import { addUserToStore, loading } from "../feature/userSlice";
import { addUsersToStore,loading as load  } from "../feature/userlistSlice";
import MyToast from "../utils/MyToast";
import { addDataToStore } from "../feature/dashboardSlice";

function* handleLogin(action) {
  yield put(loading(true));
  console.log('melaku addisu')
  console.log(action.formData)

  try {
    const response = yield call(
      axios.post,
      `${api}/api/users/login`,
      action.formData
    );
    const { token } = yield response.data;
    if (token) {
      localStorage.setItem("token", token);
    }
    yield put(addUserToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
      action.callback(response.data.message)
    
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}
export function* handleRegister(action) {
  console.log('melaku')
  console.log(action.values)
  yield put(loading(true));

  try {
    const response = yield call(
      axios.post,
      `${api}/api/users`,
      action.values
    );
    yield put(addUserToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}


export function* checkUser() {
  yield put(loading(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};

    const response = yield call(axios.get, `${api}/api/users/check/auth`, {
      headers: headers,
    });
    const { token, success } = yield response.data;
    console.log(response?.data)
    if (!success) {
      MyToast(response?.data.message, response.data.success ? "success" : "error");
    }

    if (token) {
      localStorage.setItem("token", token);
    }
    yield put(addUserToStore(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(loading(false));
  }
}


export function* userList() {
  yield put(load(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(axios.get, `${api}/api/users`, {
      headers: headers,
    });
    console.log(response.data)
    yield put(addUsersToStore(response.data));
    MyToast(response.data.message, response.data.success ? "success" : "error");
  
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}


export function* deleteUser(action) {
  // yield put(load(true));
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(
      axios.delete,
      `${api}/api/users/${action.payload.email}`,
      { headers: headers }
    );
    action.payload.callBack(action.payload.email);
    // yield put(load(false));

    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(load(false));
    MyToast(error.message, "error");
  }

}


export function* updateStatus(action) {
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    
    const response = yield call(
      axios.put,
      `${api}/api/users/update/status`,
      { status: action.payload.status, email: action.payload.email },
      { headers: headers }
    );
    action.payload.callBack2(action.payload.email, action.payload.status);

    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(load(false));
    MyToast(error.message, "error");
  }
}
export function* dashboard(action) {
  try {
    const tokenn = localStorage.getItem("token");
    const headers = tokenn ? { Authorization: `Bearer ${tokenn}` } : {};
    const response = yield call(
      axios.get,
      `${api}/api/users/dashboard`,
      { headers: headers }
    );
    console.log(response.data)
    yield put(addDataToStore(response.data.data));

    MyToast(response.data.message, response.data.success ? "success" : "error");
  } catch (error) {
    yield put(loading(false));
    MyToast(error.message, "error");
  }
}

export function* watcUserSaga() {
  yield takeEvery("user/login", handleLogin);
  yield takeEvery("user/register", handleRegister);
  yield takeEvery("user/check-auth", checkUser);
  yield takeEvery("usersList/user-list", userList);
  yield takeEvery("usersList/delete-user", deleteUser);
  yield takeEvery("usersList/update-status", updateStatus);
  yield takeEvery("usersList/dashboard", dashboard);
  


}
