import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { EventsActionType } from '../constants/eventConstants';

import {
  CreateEventsAction,
  createEventsFailure,
  createEventsSuccess,
  DeleteEventsAction,
  deleteEventsFailure,
  deleteEventsSuccess,
  FetchEventsAction,
  fetchEventsFailure,
  fetchEventsSuccess,
} from '../actions/eventActions';

import { getAuthToken } from '../selectors/loginSelectors';

import { deleteEvents } from '../api/deleteEvents';
import { getEventsForUser } from '../api/getEvents';
import { postEvents } from '../api/postEvents';

export function* fetchEventsSaga(action: FetchEventsAction) {
  try {
    const authToken = yield select(getAuthToken);

    const response = yield call(getEventsForUser, authToken, action.userID);

    yield put(fetchEventsSuccess(action.userID, response));
  } catch (err) {
    yield put(fetchEventsFailure(err));
  }
}

export function* createEventsSaga(action: CreateEventsAction) {
  try {
    const authToken = yield select(getAuthToken);

    const response = yield call(postEvents, authToken, action.userID, action.newEvents);

    yield put(createEventsSuccess(action.userID, response));
  } catch (err) {
    yield put(createEventsFailure(err));
  }
}

export function* deleteEventsSaga(action: DeleteEventsAction) {
  try {
    const authToken = yield select(getAuthToken);

    yield call(deleteEvents, authToken, action.userID, action.deletedEventIDs);

    yield put(deleteEventsSuccess(action.userID, action.deletedEventIDs));
  } catch (err) {
    yield put(deleteEventsFailure(err));
  }
}

export default function* eventsSaga() {
  yield all([
    takeLatest(EventsActionType.FETCH_EVENTS, fetchEventsSaga),
    takeLatest(EventsActionType.CREATE_EVENTS, createEventsSaga),
    takeLatest(EventsActionType.DELETE_EVENTS, deleteEventsSaga),
  ]);
}
