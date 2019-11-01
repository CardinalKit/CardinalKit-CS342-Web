import { Event, NewEvent } from '../api/event';
import { EventsActionType } from '../constants/eventConstants';

export type EventsAction =
  | FetchEventsAction
  | FetchEventsSuccessAction
  | FetchEventsFailureAction
  | CreateEventsAction
  | CreateEventsSuccessAction
  | CreateEventsFailureAction
  | DeleteEventsAction
  | DeleteEventsSuccessAction
  | DeleteEventsFailureAction;

export interface FetchEventsAction {
  type: EventsActionType.FETCH_EVENTS;
  userID: number;
}

export function fetchEvents(userID: number): FetchEventsAction {
  return {
    type: EventsActionType.FETCH_EVENTS,
    userID,
  };
}

export interface FetchEventsSuccessAction {
  type: EventsActionType.FETCH_EVENTS_SUCCESS;
  userID: number;
  events: Event[];
}

export function fetchEventsSuccess(userID: number, events: Event[]): FetchEventsSuccessAction {
  return {
    type: EventsActionType.FETCH_EVENTS_SUCCESS,
    userID,
    events,
  };
}

export interface FetchEventsFailureAction {
  type: EventsActionType.FETCH_EVENTS_FAILURE;
  error: Error;
}

export function fetchEventsFailure(error: Error): FetchEventsFailureAction {
  return {
    type: EventsActionType.FETCH_EVENTS_FAILURE,
    error,
  };
}

export interface CreateEventsAction {
  type: EventsActionType.CREATE_EVENTS;
  userID: number;
  newEvents: NewEvent[];
}

export function createEvents(userID: number, newEvents: NewEvent[]): CreateEventsAction {
  return {
    type: EventsActionType.CREATE_EVENTS,
    userID,
    newEvents,
  };
}

export interface CreateEventsSuccessAction {
  type: EventsActionType.CREATE_EVENTS_SUCCESS;
  userID: number;
  events: Event[];
}

export function createEventsSuccess(userID: number, events: Event[]): CreateEventsSuccessAction {
  return {
    type: EventsActionType.CREATE_EVENTS_SUCCESS,
    userID,
    events,
  };
}

export interface CreateEventsFailureAction {
  type: EventsActionType.CREATE_EVENTS_FAILURE;
  error: Error;
}

export function createEventsFailure(error: Error): CreateEventsFailureAction {
  return {
    type: EventsActionType.CREATE_EVENTS_FAILURE,
    error,
  };
}

export interface DeleteEventsAction {
  type: EventsActionType.DELETE_EVENTS;
  userID: number;
  deletedEventIDs: number[];
}

export function deleteEvents(userID: number, deletedEventIDs: number[]): DeleteEventsAction {
  return {
    type: EventsActionType.DELETE_EVENTS,
    userID,
    deletedEventIDs,
  };
}

export interface DeleteEventsSuccessAction {
  type: EventsActionType.DELETE_EVENTS_SUCCESS;
  userID: number;
  deletedEventIDs: number[];
}

export function deleteEventsSuccess(
  userID: number,
  deletedEventIDs: number[]
): DeleteEventsSuccessAction {
  return {
    type: EventsActionType.DELETE_EVENTS_SUCCESS,
    userID,
    deletedEventIDs,
  };
}

export interface DeleteEventsFailureAction {
  type: EventsActionType.DELETE_EVENTS_FAILURE;
  error: Error;
}

export function deleteEventsFailure(error: Error): DeleteEventsFailureAction {
  return {
    type: EventsActionType.DELETE_EVENTS_FAILURE,
    error,
  };
}
