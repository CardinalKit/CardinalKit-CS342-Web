import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { LoginActionType } from '../constants/loginConstants';

import { Store } from '../reducers/rootReducer';

import {
  getLoginState,
  getPasswordAuthToken,
  getTwoFactorAuthToken,
} from '../selectors/loginSelectors';

import {
  checkEmail,
  CheckEmailAction,
  checkEmailSuccess,
  CheckEmailSuccessAction,
  checkPassword,
  CheckPasswordAction,
  checkPasswordFailure,
  checkPasswordSuccessTwoFactor,
  checkTwoFactor,
  CheckTwoFactorAction,
  checkTwoFactorFailure,
  LoginUserAction,
  loginUserFailure,
  loginUserSuccess,
} from '../actions/loginActions';

import postEmail from '../api/postEmail';

import postPassword from '../api/postPassword';

import postTwoFactor from '../api/postTwoFactor';

import Firebase from '../components/Firebase';

export function* loginUser(action: LoginUserAction) {
  try {
    const result = yield call(new Firebase().doSignInWithGoogle);
    yield put(loginUserSuccess(result.credential.accessToken));
  } catch (err) {
    yield put(loginUserFailure(err.toString()));
  }
}

export function* checkEmailSaga(action: CheckEmailAction) {
  try {
    const { passwordAuthToken } = yield call(postEmail, action.email);
    yield put(checkEmailSuccess(passwordAuthToken));
  } catch (err) {
    yield put(loginUserFailure(err.toString()));
  }
}

export function* checkEmailSuccessSaga(_: CheckEmailSuccessAction) {
  const password = yield select((state: Store) => getLoginState(state).password);
  yield put(checkPassword(password));
}

export function* checkPasswordSaga(action: CheckPasswordAction) {
  const { password } = action;
  const passwordAuthToken = yield select(getPasswordAuthToken);
  if (passwordAuthToken === null) {
    // TODO: Fix error here
    yield put(checkPasswordFailure('Missing auth token'));
  }
  try {
    const { apiAuthToken, twoFactorAuthToken } = yield call(
      postPassword,
      password,
      passwordAuthToken
    );

    if (apiAuthToken) {
      yield put(loginUserSuccess(apiAuthToken));
    } else {
      yield put(checkPasswordSuccessTwoFactor(twoFactorAuthToken));
    }
  } catch (err) {
    yield put(checkPasswordFailure(err.toString()));
  }
}

export function* checkPasswordSuccessSaga(_: CheckTwoFactorAction) {
  yield put(checkTwoFactor());
}

export function* checkTwoFactorSaga(_: CheckTwoFactorAction) {
  const twoFactorAuthToken = yield select(getTwoFactorAuthToken);
  if (twoFactorAuthToken === null) {
    // TODO: Fix error here
    yield put(checkPasswordFailure('Missing auth token'));
  }

  try {
    const { apiAuthToken } = yield call(postTwoFactor, twoFactorAuthToken);
    yield put(loginUserSuccess(apiAuthToken));
  } catch (err) {
    yield put(checkTwoFactorFailure(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginSaga() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LoginActionType.LOGIN_USER, loginUser),
    takeLatest(LoginActionType.CHECK_EMAIL, checkEmailSaga),
    takeLatest(LoginActionType.CHECK_EMAIL_SUCCESS, checkEmailSuccessSaga),
    takeLatest(LoginActionType.CHECK_PASSWORD, checkPasswordSaga),
    takeLatest(LoginActionType.CHECK_PASSWORD_SUCCESS_TWOFACTOR, checkPasswordSuccessSaga),
    takeLatest(LoginActionType.CHECK_TWO_FACTOR, checkTwoFactorSaga),
  ]);
}
