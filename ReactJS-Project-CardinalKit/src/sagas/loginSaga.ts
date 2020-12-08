import { all, call, put, takeLatest } from 'redux-saga/effects';

import { LoginActionType } from '../constants/loginConstants';

import { LoginUserAction, loginUserFailure, loginUserSuccess } from '../actions/loginActions';

import Firebase from '../components/Firebase';

export function* loginUser(action: LoginUserAction) {
  try {
    const result = yield call(new Firebase().doSignInWithGoogle);

    if (result && result.user && result.user.email) {
      yield put(loginUserSuccess(result.credential.accessToken));
    } else {
      yield put(loginUserFailure('Invalid Email Address'));
    }
  } catch (err) {
    yield put(loginUserFailure(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([takeLatest(LoginActionType.LOGIN_USER, loginUser)]);
}
