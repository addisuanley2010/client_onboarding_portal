
import { all } from "redux-saga/effects";
import { watcUserSaga } from "./userSaga";
export default function* rootSaga() {
  yield all([
     watcUserSaga(),
  ]);
}
