import { call, put, takeLatest } from 'redux-saga/effects';

import { getAllFirebaseUsers, getFirebaseUser, getSurveys, getUserFromUID, getHeartbeatInfo } from '../api/getAllUsers';

import {
  FetchUserDetailsAction,
  fetchUserDetailsFailure,
  fetchUserDetailsSuccess,
  FetchUsersAction,
  fetchUsersFailure,
  fetchUsersSuccess,
} from '../actions/usersActions';
import { UsersActionType } from '../constants/usersConstants';

import app from 'firebase/app';

export function* fetchUserSummaries(action: FetchUsersAction) {
  try {
    const users = yield call(getAllFirebaseUsers);
    const userList = users.docs.map((i: app.firestore.QueryDocumentSnapshot) => i.data());

    yield put(fetchUsersSuccess(userList));
  } catch (err) {
    yield put(fetchUsersFailure(err));
  }
}

export function* fetchUserDetails(action: FetchUserDetailsAction) {
  try {

    var userInfo = yield call(getUserFromUID, action.userID);
    userInfo = userInfo.data();
    const userEmail = userInfo["email"];

    const user = yield call(getFirebaseUser, userEmail);
    var heartbeatInfo = yield call(getHeartbeatInfo, userEmail);
    heartbeatInfo = heartbeatInfo.data();
    var lastActive = heartbeatInfo["lastActive"];

    var userData = user.data();
    userData["lastActive"] = lastActive; // over-ride with updated last active

    const surveys = yield call(getSurveys, userEmail, heartbeatInfo["userID"]);

    const surveyList = surveys.docs.map((i: app.firestore.QueryDocumentSnapshot) => i.data());

    yield put(fetchUserDetailsSuccess(userData, surveyList));
  } catch (err) {
    console.log("error fetching users", err);
    yield put(fetchUserDetailsFailure(err));
  }
}

export function* fetchUsers(action: FetchUserDetailsAction | FetchUsersAction) {
  switch (action.type) {
    case UsersActionType.FETCH_USERS:
      yield fetchUserSummaries(action);
      break;
    case UsersActionType.FETCH_USER_DETAILS:
      yield fetchUserDetails(action);
      break;
  }
}

// Individual exports for testing
export default function* userListSaga() {
  yield takeLatest([UsersActionType.FETCH_USERS, UsersActionType.FETCH_USER_DETAILS], fetchUsers);
}
