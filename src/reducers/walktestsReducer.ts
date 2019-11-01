import { WalktestActionType } from '../constants/walktestConstants';

import { WalktestAction } from '../actions/walktestActions';

import { Walktest } from '../api/walktest';

export interface WalktestStore
  extends Readonly<{
    loading: boolean;
    walktests: Map<number, Walktest[]>;
    error: Error | null;
  }> {}

export const initialWalktestState: WalktestStore = {
  loading: false,
  walktests: new Map<number, Walktest[]>(),
  error: null,
};

export function walktestsReducer(
  state = initialWalktestState,
  action: WalktestAction
): WalktestStore {
  switch (action.type) {
    case WalktestActionType.FETCH_WALKTESTS:
      return { ...state, loading: true };
    case WalktestActionType.FETCH_WALKTESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        walktests: state.walktests.set(action.userID, action.walktests),
      };
    case WalktestActionType.FETCH_WALKTESTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
