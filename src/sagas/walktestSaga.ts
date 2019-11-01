import { call, put, select, takeLatest } from 'redux-saga/effects';

import { WalktestActionType } from '../constants/walktestConstants';

import {
  FetchWalktestsAction,
  fetchWalktestsFailure,
  fetchWalktestsSuccess,
} from '../actions/walktestActions';

import { getAuthToken } from '../selectors/loginSelectors';

import { getWalktestsForUser } from '../api/getWalktests';

export function* fetchWalktests(action: FetchWalktestsAction) {
  try {
    const authToken = yield select(getAuthToken);

    const response = yield call(getWalktestsForUser, authToken, action.userID);

    yield put(fetchWalktestsSuccess(action.userID, response));
  } catch (err) {
    yield put(fetchWalktestsFailure(err));
  }
}

export default function* eventsSaga() {
  yield takeLatest(WalktestActionType.FETCH_WALKTESTS, fetchWalktests);
}
