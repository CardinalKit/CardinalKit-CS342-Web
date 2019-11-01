import { eventsReducer, initialEventsState } from './eventsReducer';

import {
  createEvents,
  createEventsFailure,
  createEventsSuccess,
  deleteEvents,
  deleteEventsFailure,
  deleteEventsSuccess,
  EventsAction,
  fetchEvents,
  fetchEventsFailure,
  fetchEventsSuccess,
} from '../actions/eventActions';

import { Event, NewEvent } from '../api/event';

const exampleNewEvents: NewEvent[] = [
  {
    tempID: 0,
    eventType: 0,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
  },
  {
    tempID: 1,
    eventType: 1,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
  },
  {
    tempID: 2,
    eventType: 0,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
  },
  {
    tempID: 3,
    eventType: 1,
    scheduled: new Date('2018-04-25T00:00:00Z'),
  },
];

const exampleEvents: Event[] = [
  {
    ID: 873,
    createdAt: new Date('2018-11-24T20:04:16.570638Z'),
    updatedAt: new Date('2018-11-24T20:04:16.570638Z'),
    eventType: 0,
    mobileUserID: 930,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
    userNotified: false,
    remindersSent: 0,
  },
  {
    ID: 875,
    createdAt: new Date('2018-11-24T20:44:56.772047Z'),
    updatedAt: new Date('2018-11-24T20:44:56.772047Z'),
    eventType: 1,
    mobileUserID: 930,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
    userNotified: false,
    remindersSent: 0,
  },
  {
    ID: 876,
    createdAt: new Date('2018-11-24T21:19:06.419202Z'),
    updatedAt: new Date('2018-11-24T21:19:06.419203Z'),
    eventType: 0,
    mobileUserID: 930,
    scheduled: new Date('2018-04-20T07:40:50.46Z'),
    userNotified: false,
    remindersSent: 0,
  },
  {
    ID: 411,
    createdAt: new Date('2018-04-26T16:22:47.1381108Z'),
    updatedAt: new Date('2018-06-30T00:55:56.7562994Z'),
    eventType: 1,
    mobileUserID: 930,
    scheduled: new Date('2018-04-25T00:00:00Z'),
    userNotified: true,
    remindersSent: 0,
  },
];

describe('events reducer', () => {
  it('should return the initial state', () => {
    expect(eventsReducer(undefined, {} as EventsAction)).toEqual(initialEventsState);
  });
  describe('events reducer: FETCH_EVENTS', () => {
    it('should start a fetch', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: false,
          },
          fetchEvents(930)
        )
      ).toEqual({
        ...initialEventsState,
        loading: true,
      });
    });
  });
  describe('events reducer: FETCH_EVENTS_FAILURE', () => {
    it('should fail and save error', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
          },
          fetchEventsFailure(new Error('Failed to load'))
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        error: new Error('Failed to load'),
      });
    });
  });
  describe('events reducer: FETCH_EVENTS_SUCCESS', () => {
    it('should load events for user', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            events: new Map<number, Event[]>([]),
            loading: true,
          },
          fetchEventsSuccess(930, exampleEvents)
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>([[930, [...exampleEvents]]]),
      });
    });
    it('should overwrite events', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
            events: new Map<number, Event[]>([[930, [exampleEvents[0], exampleEvents[2]]]]),
          },
          fetchEventsSuccess(930, [exampleEvents[1], exampleEvents[3]])
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>([[930, [exampleEvents[1], exampleEvents[3]]]]),
      });
    });
  });
  describe('events reducer: CREATE_EVENTS', () => {
    it('should start a fetch', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: false,
          },
          createEvents(930, [exampleNewEvents[0], exampleNewEvents[2]])
        )
      ).toEqual({
        ...initialEventsState,
        loading: true,
      });
    });
  });
  describe('events reducer: CREATE_EVENTS_FAILURE', () => {
    it('should fail and save error', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
          },
          createEventsFailure(new Error('Failed to load'))
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        error: new Error('Failed to load'),
      });
    });
  });
  describe('events reducer: CREATE_EVENTS_SUCCESS', () => {
    it('should load new events for user', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            events: new Map<number, Event[]>([]),
            loading: true,
          },
          createEventsSuccess(930, exampleEvents)
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>([[930, [...exampleEvents]]]),
      });
    });
    it('should merge events', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
            events: new Map<number, Event[]>([[930, [exampleEvents[0], exampleEvents[2]]]]),
          },
          createEventsSuccess(930, [exampleEvents[1], exampleEvents[3]])
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>([
          [930, [exampleEvents[0], exampleEvents[2], exampleEvents[1], exampleEvents[3]]],
        ]),
      });
    });
  });
  describe('events reducer: DELETE_EVENTS', () => {
    it('should start a fetch', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: false,
          },
          deleteEvents(930, [721, 212])
        )
      ).toEqual({
        ...initialEventsState,
        loading: true,
      });
    });
  });
  describe('events reducer: DELETE_EVENTS_FAILURE', () => {
    it('should fail and save error', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
          },
          deleteEventsFailure(new Error('Failed to load'))
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        error: new Error('Failed to load'),
      });
    });
  });
  describe('events reducer: DELETE_EVENTS_SUCCESS', () => {
    it('should return empty', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            events: new Map<number, Event[]>([]),
            loading: true,
          },
          deleteEventsSuccess(930, [12, 321])
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>(),
      });
    });
    it('should delete events', () => {
      expect(
        eventsReducer(
          {
            ...initialEventsState,
            loading: true,
            events: new Map<number, Event[]>([[930, [...exampleEvents]]]),
          },
          deleteEventsSuccess(930, [exampleEvents[1].ID, exampleEvents[3].ID])
        )
      ).toEqual({
        ...initialEventsState,
        loading: false,
        events: new Map<number, Event[]>([[930, [exampleEvents[0], exampleEvents[2]]]]),
      });
    });
  });
});
