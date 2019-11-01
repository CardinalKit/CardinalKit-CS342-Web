import { EventsActionType } from '../constants/eventConstants';

import { EventsAction } from '../actions/eventActions';

import { Event } from '../api/event';

export interface EventsStore
  extends Readonly<{
    loading: boolean;
    events: Map<number, Event[]>;
    error: Error | null;
  }> {}

export const initialEventsState: EventsStore = {
  loading: false,
  events: new Map<number, Event[]>(),
  error: null,
};

const mergeEventsForUser = (state: EventsStore, userID: number, events: Event[]): EventsStore => {
  const existingEvents = state.events.get(userID);
  const newEventList = existingEvents ? [...existingEvents, ...events] : events;
  return {
    ...state,
    loading: false,
    events: state.events.set(userID, newEventList),
  };
};

const deleteEventsForUser = (
  state: EventsStore,
  userID: number,
  deletedEventIDs: number[]
): EventsStore => {
  const existingEvents = state.events.get(userID);
  if (existingEvents) {
    return {
      ...state,
      loading: false,
      events: state.events.set(
        userID,
        existingEvents.filter((evt: Event) => !deletedEventIDs.includes(evt.ID))
      ),
    };
  } else {
    return {
      ...state,
      loading: false,
    };
  }
};

export function eventsReducer(state = initialEventsState, action: EventsAction): EventsStore {
  switch (action.type) {
    case EventsActionType.FETCH_EVENTS:
    case EventsActionType.CREATE_EVENTS:
    case EventsActionType.DELETE_EVENTS:
      return { ...state, loading: true };

    case EventsActionType.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.set(action.userID, action.events),
      };

    case EventsActionType.CREATE_EVENTS_SUCCESS:
      return mergeEventsForUser(state, action.userID, action.events);

    case EventsActionType.DELETE_EVENTS_SUCCESS:
      return deleteEventsForUser(state, action.userID, action.deletedEventIDs);

    case EventsActionType.FETCH_EVENTS_FAILURE:
    case EventsActionType.CREATE_EVENTS_FAILURE:
    case EventsActionType.DELETE_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
