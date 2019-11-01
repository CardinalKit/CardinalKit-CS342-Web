import { Walktest } from '../api/walktest';
import { WalktestActionType } from '../constants/walktestConstants';

export type WalktestAction =
  | FetchWalktestsAction
  | FetchWalktestsSuccessAction
  | FetchWalktestsFailureAction;

export interface FetchWalktestsAction {
  type: WalktestActionType.FETCH_WALKTESTS;
  userID: number;
}

export function fetchWalktests(userID: number): FetchWalktestsAction {
  return {
    type: WalktestActionType.FETCH_WALKTESTS,
    userID,
  };
}

export interface FetchWalktestsSuccessAction {
  type: WalktestActionType.FETCH_WALKTESTS_SUCCESS;
  userID: number;
  walktests: Walktest[];
}

export function fetchWalktestsSuccess(
  userID: number,
  walktests: Walktest[]
): FetchWalktestsSuccessAction {
  return {
    type: WalktestActionType.FETCH_WALKTESTS_SUCCESS,
    userID,
    walktests,
  };
}

export interface FetchWalktestsFailureAction {
  type: WalktestActionType.FETCH_WALKTESTS_FAILURE;
  error: Error;
}

export function fetchWalktestsFailure(error: Error): FetchWalktestsFailureAction {
  return {
    type: WalktestActionType.FETCH_WALKTESTS_FAILURE,
    error,
  };
}
