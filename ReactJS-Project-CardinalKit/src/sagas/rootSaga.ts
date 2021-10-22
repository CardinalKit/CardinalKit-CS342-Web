import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import usersSaga from './usersSaga';
import providersSaga from './providersSaga';

export default function* rootSaga() {
  // yield all([loginSaga(), providersSaga()]);
  yield all([loginSaga(), providersSaga(), usersSaga()]);
}
