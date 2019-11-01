import { initialWalktestState, walktestsReducer } from './walktestsReducer';

import {
  fetchWalktests,
  fetchWalktestsFailure,
  fetchWalktestsSuccess,
  WalktestAction,
} from '../actions/walktestActions';

import { Walktest } from '../api/walktest';

const exampleWalktests: Walktest[] = [
  {
    ID: 1803,
    createdAt: new Date('2018-07-12T16:43:26.7009003Z'),
    updatedAt: new Date('2018-07-12T16:43:26.7009003Z'),
    syncID: 'AWV2223tC0a',
    mobileUserID: 932,
    date: new Date('2018-07-11T17:53:58.817Z'),
    endDate: new Date('2018-07-11T17:59:58.93Z'),
    distance: 335.6842956542969,
    stairs: 0,
    stepsWithoutStopping: 452,
    stoppingReason: 6,
    walkingAidID: 4,
    painScale: 0,
    fileName: '',
    phoneLocationID: 16,
    postSOBScale: 0,
    preSOBScale: 0,
    inClinic: false,
    openWalk: false,
    chestStrapUsage: false,
    watchUsage: true,
    injuries: false,
    anyPain: false,
    phoneLocation: '',
  },
  {
    ID: 1724,
    createdAt: new Date('2018-06-22T01:09:52.4959887Z'),
    updatedAt: new Date('2018-06-22T01:09:52.4959887Z'),
    syncID: 'ZWV22214Wp9',
    mobileUserID: 932,
    date: new Date('2018-06-22T00:48:47.071Z'),
    endDate: new Date('2018-06-22T00:54:47.108Z'),
    distance: 118.15885925292969,
    stairs: 0,
    stepsWithoutStopping: 183,
    stoppingReason: 6,
    walkingAidID: 4,
    painScale: 0,
    fileName: '',
    phoneLocationID: 16,
    postSOBScale: 0,
    preSOBScale: 0,
    inClinic: true,
    openWalk: false,
    chestStrapUsage: true,
    watchUsage: true,
    injuries: false,
    anyPain: false,
    phoneLocation: '',
  },
  {
    ID: 1722,
    createdAt: new Date('2018-06-22T00:42:20.4951966Z'),
    updatedAt: new Date('2018-06-22T00:42:20.4951966Z'),
    syncID: 'ZWV22213hk3',
    mobileUserID: 932,
    date: new Date('2018-06-22T00:35:13.639Z'),
    endDate: new Date('2018-06-22T00:38:28.45Z'),
    distance: 39.794429779052734,
    stairs: 0,
    stepsWithoutStopping: 57,
    stoppingReason: 2,
    walkingAidID: 4,
    painScale: 0,
    fileName: '',
    phoneLocationID: 16,
    postSOBScale: 0,
    preSOBScale: 0,
    inClinic: true,
    openWalk: false,
    chestStrapUsage: true,
    watchUsage: true,
    injuries: false,
    anyPain: false,
    phoneLocation: '',
  },
  {
    ID: 1720,
    createdAt: new Date('2018-06-21T18:22:58.5331752Z'),
    updatedAt: new Date('2018-06-21T18:22:58.5331752Z'),
    syncID: 'ZWV2221H9N0',
    mobileUserID: 932,
    date: new Date('2018-06-21T18:13:28.019Z'),
    endDate: new Date('2018-06-21T18:19:28.118Z'),
    distance: 528.7344360351562,
    stairs: 0,
    stepsWithoutStopping: 643,
    stoppingReason: 6,
    walkingAidID: 4,
    painScale: 0,
    fileName: '',
    phoneLocationID: 16,
    postSOBScale: 0,
    preSOBScale: 0,
    inClinic: true,
    openWalk: false,
    chestStrapUsage: true,
    watchUsage: true,
    injuries: false,
    anyPain: false,
    phoneLocation: '',
  },
];

describe('walktests reducer', () => {
  it('should return the initial state', () => {
    expect(walktestsReducer(undefined, {} as WalktestAction)).toEqual(initialWalktestState);
  });
  describe('walktests reducer: FETCH_WALKTESTS', () => {
    it('should start a fetch', () => {
      expect(
        walktestsReducer(
          {
            ...initialWalktestState,
            loading: false,
          },
          fetchWalktests(932)
        )
      ).toEqual({
        ...initialWalktestState,
        loading: true,
      });
    });
  });
  describe('walktests reducer: FETCH_WALKTESTS_FAILURE', () => {
    it('should fail and save error', () => {
      expect(
        walktestsReducer(
          {
            ...initialWalktestState,
            loading: true,
            error: null,
          },
          fetchWalktestsFailure(new Error('Failed to load'))
        )
      ).toEqual({
        ...initialWalktestState,
        loading: false,
        error: new Error('Failed to load'),
      });
    });
  });
  describe('walktests reducer: FETCH_WALKTESTS_SUCCESS', () => {
    it('should load walktests for user', () => {
      expect(
        walktestsReducer(
          {
            ...initialWalktestState,
            loading: true,
          },
          fetchWalktestsSuccess(932, exampleWalktests)
        )
      ).toEqual({
        ...initialWalktestState,
        loading: false,
        walktests: new Map<number, Walktest[]>([[932, exampleWalktests]]),
      });
    });
    it('overwrite walktests', () => {
      expect(
        walktestsReducer(
          {
            ...initialWalktestState,
            loading: true,
            walktests: new Map<number, Walktest[]>([
              [932, [exampleWalktests[0], exampleWalktests[2]]],
            ]),
          },
          fetchWalktestsSuccess(932, [exampleWalktests[1], exampleWalktests[3]])
        )
      ).toEqual({
        ...initialWalktestState,
        loading: false,
        walktests: new Map<number, Walktest[]>([[932, [exampleWalktests[1], exampleWalktests[3]]]]),
      });
    });
  });
});
