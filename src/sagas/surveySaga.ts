import { call, put, select, takeLatest } from 'redux-saga/effects';

import { SurveyActionType } from '../constants/surveyConstants';

import {
  FetchSurveysAction,
  fetchSurveysFailure,
  fetchSurveysSuccess,
} from '../actions/surveyActions';

import { getAuthToken } from '../selectors/loginSelectors';

import { getSurveysForUser } from '../api/getSurveys';

export function* fetchSurveys(action: FetchSurveysAction) {
  try {
    const authToken = yield select(getAuthToken);

    const response = yield call(getSurveysForUser, authToken, action.userID);

    yield put(fetchSurveysSuccess(action.userID, response));
  } catch (err) {
    yield put(fetchSurveysFailure(err));
  }
}

export default function* surveysSaga() {
  yield takeLatest(SurveyActionType.FETCH_SURVEYS, fetchSurveys);
}
