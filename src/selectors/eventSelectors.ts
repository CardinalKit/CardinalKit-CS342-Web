import { createSelector } from 'reselect';

import { Store } from '../reducers/rootReducer';

import { Event } from '../api/event';

const selectEventsDomain = (state: Store) => state.events;

export const selectEvents = (state: Store, props: { userID: number }): Event[] => {
  const events = selectEventsDomain(state).events.get(props.userID);
  return events ? events : [];
};

export const selectSortedEvents = createSelector(
  [selectEvents],
  (events: Event[]) =>
    [...events]
      .sort(
        (event1: Event, event2: Event): number =>
          event1.scheduled.getTime() - event2.scheduled.getTime()
      )
      .reverse()
);
