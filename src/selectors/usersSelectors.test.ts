import { selectEIDTypes, selectFilteredUserList, selectUsers } from './usersSelectors';

import { initialState } from '../reducers/rootReducer';
import { initialUsersState } from '../reducers/usersReducer';

import { UsersSortField, UsersSortOrder } from '../constants/usersConstants';

import { UserDetails } from '../api/user';

// Dates in ascending order, I.E. date4 is more recent than date1
const date1 = new Date('2018-10-11T20:27:34.145Z');
const date2 = new Date('2018-10-12T20:58:59.214Z');
const date3 = new Date('2018-10-13T20:58:59.214Z');
const date4 = new Date('2018-10-14T20:58:59.214Z');

const exampleUsers: Map<number, UserDetails> = new Map([
  [
    0,
    {
      ID: 0,
      eID: '1110000',
      lastActive: date1,
      lastWalktest: date4,
    },
  ],
  [
    1,
    {
      ID: 1,
      eID: '1110001',
      lastActive: date3,
      lastWalktest: date3,
    },
  ],
  [
    2,
    {
      ID: 2,
      eID: '0000012',
      lastActive: date2,
      lastWalktest: date2,
    },
  ],
  [
    3,
    {
      ID: 3,
      eID: '0000013',
      lastActive: date4,
      lastWalktest: date1,
    },
  ],
]);

describe('users selector', () => {
  describe('respects descending sort order', () => {
    it('sorts by UserID', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.UserID,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(3),
        exampleUsers.get(2),
        exampleUsers.get(1),
        exampleUsers.get(0),
      ]);
    });
    it('sorts by UserEID', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.UserEID,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(1),
        exampleUsers.get(0),
        exampleUsers.get(3),
        exampleUsers.get(2),
      ]);
    });

    it('sorts by lastActive', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastActive,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(3),
        exampleUsers.get(1),
        exampleUsers.get(2),
        exampleUsers.get(0),
      ]);
    });
    it('sorts by lastWalktest', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastWalktest,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(0),
        exampleUsers.get(1),
        exampleUsers.get(2),
        exampleUsers.get(3),
      ]);
    });
  });
  describe('respects ascending sort order', () => {
    it('sorts by UserID', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Ascending,
            sortField: UsersSortField.UserID,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(0),
        exampleUsers.get(1),
        exampleUsers.get(2),
        exampleUsers.get(3),
      ]);
    });
    it('sorts by lastActive', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Ascending,
            sortField: UsersSortField.LastActive,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(0),
        exampleUsers.get(2),
        exampleUsers.get(1),
        exampleUsers.get(3),
      ]);
    });
    it('sorts by lastWalktest', () => {
      expect(
        selectUsers({
          ...initialState,
          users: {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Ascending,
            sortField: UsersSortField.LastWalktest,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual([
        exampleUsers.get(3),
        exampleUsers.get(2),
        exampleUsers.get(1),
        exampleUsers.get(0),
      ]);
    });
  });
  describe('eid types selector', () => {
    it('sorts by UserID', () => {
      expect(
        selectEIDTypes({
          ...initialState,
          users: {
            ...initialUsersState,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: [],
          },
        })
      ).toEqual(['111', '000'].sort());
    });
  });

  describe('selectFilteredUserList', () => {
    it('filters out EIDs', () => {
      expect(
        selectFilteredUserList({
          ...initialState,
          users: {
            ...initialUsersState,
            users: new Map(exampleUsers.entries()),
            hiddenEIDTypes: ['000'],
          },
        })
      ).toEqual([exampleUsers.get(0), exampleUsers.get(1)]);
    });
  });
});
