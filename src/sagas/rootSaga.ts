import { all } from 'redux-saga/effects';

import eventsSaga from './eventsSaga';
import loginSaga from './loginSaga';
import surveysSaga from './surveySaga';
import usersSaga from './usersSaga';
import walktestsSaga from './walktestSaga';

export default function* rootSaga() {
  yield all([loginSaga(), usersSaga(), eventsSaga(), walktestsSaga(), surveysSaga()]);
}
