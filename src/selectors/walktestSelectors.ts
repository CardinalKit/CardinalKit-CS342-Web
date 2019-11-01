import { createSelector } from 'reselect';

import { Store } from '../reducers/rootReducer';

import { Walktest } from '../api/walktest';

const selectWalktestsDomain = (state: Store) => state.walktests;

export const selectWalktests = (state: Store, props: { userID: number }): Walktest[] => {
  const walktests = selectWalktestsDomain(state).walktests.get(props.userID);
  return walktests ? walktests : [];
};

export const selectSortedWalktests = createSelector(
  [selectWalktests],
  (walktests: Walktest[]) =>
    [...walktests]
      .sort(
        (walktest1: Walktest, walktest2: Walktest): number =>
          walktest1.date.getTime() - walktest2.date.getTime()
      )
      .reverse()
);
