import { call, put, takeLatest } from 'redux-saga/effects';

import { getAllFirebaseUsers, getFirebaseUser, getSurveys } from '../api/getAllUsers';

import {
  FetchUsersAction,
  FetchUserDetailsAction,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure
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
    const user = yield call(getFirebaseUser, action.userID);

    const surveys = yield call(getSurveys, action.userID);
    const surveyList = surveys.docs.map((i: app.firestore.QueryDocumentSnapshot) => i.data());

    yield put(fetchUserDetailsSuccess(user.data(), surveyList));
  } catch (err) {
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
