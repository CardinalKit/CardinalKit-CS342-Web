import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import usersSaga from './usersSaga';

export default function* rootSaga() {
  yield all([loginSaga(), usersSaga()]);
}
