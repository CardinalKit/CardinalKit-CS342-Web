import { initialUsersState, usersReducer } from './usersReducer';

import { UsersSortField, UsersSortOrder } from '../constants/usersConstants';

import {
  changeUsersSort,
  fetchUserDetailsSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  toggleHideEIDType,
  UsersAction,
} from '../actions/usersActions';

import { UserDetails } from '../api/user';

const date1 = new Date('2018-10-14T20:27:34.145Z');
const date2 = new Date('2018-10-14T20:58:59.214Z');

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {} as UsersAction)).toEqual(initialUsersState);
  });
  describe('users reducer: FETCH_USERS', () => {
    it('should start a fetch', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            loading: false,
          },
          fetchUsers()
        )
      ).toEqual({
        ...initialUsersState,
        loading: true,
      });
    });
  });
  describe('users reducer: FETCH_USERS_SUCCESS', () => {
    it('should complete a fetch sucessfully', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            loading: true,
            users: new Map<number, UserDetails>(),
            error: '',
          },
          fetchUsersSuccess([
            {
              ID: 930,
              eID: '0008414',
              lastActive: date1,
              lastWalktest: date2,
            },
          ])
        )
      ).toEqual({
        ...initialUsersState,
        loading: false,
        users: new Map<number, UserDetails>([
          [
            930,
            {
              ID: 930,
              eID: '0008414',
              lastActive: date1,
              lastWalktest: date2,
            },
          ],
        ]),
        error: '',
      });
    });
    it('should merge sucessfully', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            loading: true,
            users: new Map<number, UserDetails>([
              [
                930,
                {
                  ID: 930,
                  eID: '0008414',
                  internalUser: false,
                  lastWalktest: date2,
                  createdAt: new Date('2018-04-20T07:40:50.46Z'),
                  lastActive: new Date('2018-10-14T20:27:34.145251Z'),
                  last6mwt: new Date('2018-07-03T21:05:36.0394381Z'),
                  lastOpenw: new Date('2018-10-14T13:59:47.811307Z'),
                  lastMedSurvey: new Date('2018-10-14T20:27:34.240856Z'),
                  lastSurgSurvey: new Date('2018-05-29T02:59:01.609Z'),
                  lastWalkSurvey: new Date('2018-05-31T18:17:14.761709Z'),
                },
              ],
            ]),
            error: '',
          },
          fetchUsersSuccess([
            {
              ID: 930,
              eID: '0008414',
              lastActive: date1,
              lastWalktest: date2,
            },
          ])
        )
      ).toEqual({
        ...initialUsersState,
        loading: false,
        users: new Map<number, UserDetails>([
          [
            930,
            {
              ID: 930,
              eID: '0008414',
              internalUser: false,
              lastWalktest: date2,
              createdAt: new Date('2018-04-20T07:40:50.46Z'),
              lastActive: date1,
              last6mwt: new Date('2018-07-03T21:05:36.0394381Z'),
              lastOpenw: new Date('2018-10-14T13:59:47.811307Z'),
              lastMedSurvey: new Date('2018-10-14T20:27:34.240856Z'),
              lastSurgSurvey: new Date('2018-05-29T02:59:01.609Z'),
              lastWalkSurvey: new Date('2018-05-31T18:17:14.761709Z'),
            },
          ],
        ]),
        error: '',
      });
    });
  });
  describe('users reducer: FETCH_USERS_FAILURE', () => {
    it('should complete a fetch with a failure', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            loading: true,
            error: '',
          },
          fetchUsersFailure('Internal error')
        )
      ).toEqual({
        ...initialUsersState,
        loading: false,
        error: 'Internal error',
      });
    });
  });
  describe('users reducer: FETCH_USER_DETAILS_SUCCESS', () => {
    it('should complete a fetch sucessfully', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            loading: true,
            users: new Map<number, UserDetails>([
              [
                930,
                {
                  ID: 930,
                  eID: '0008414',
                  lastActive: date1,
                  lastWalktest: date2,
                },
              ],
            ]),
            error: '',
          },
          fetchUserDetailsSuccess({
            ID: 930,
            eID: '0008414',
            internalUser: false,
            createdAt: new Date('2018-04-20T07:40:50.46Z'),
            lastActive: new Date('2018-10-14T20:27:34.145251Z'),
            last6mwt: new Date('2018-07-03T21:05:36.0394381Z'),
            lastOpenw: new Date('2018-10-14T13:59:47.811307Z'),
            lastMedSurvey: new Date('2018-10-14T20:27:34.240856Z'),
            lastSurgSurvey: new Date('2018-05-29T02:59:01.609Z'),
            lastWalkSurvey: new Date('2018-05-31T18:17:14.761709Z'),
          })
        )
      ).toEqual({
        ...initialUsersState,
        loading: false,
        users: new Map<number, UserDetails>([
          [
            930,
            {
              ID: 930,
              eID: '0008414',
              internalUser: false,
              lastWalktest: date2,
              createdAt: new Date('2018-04-20T07:40:50.46Z'),
              lastActive: new Date('2018-10-14T20:27:34.145251Z'),
              last6mwt: new Date('2018-07-03T21:05:36.0394381Z'),
              lastOpenw: new Date('2018-10-14T13:59:47.811307Z'),
              lastMedSurvey: new Date('2018-10-14T20:27:34.240856Z'),
              lastSurgSurvey: new Date('2018-05-29T02:59:01.609Z'),
              lastWalkSurvey: new Date('2018-05-31T18:17:14.761709Z'),
            },
          ],
        ]),
        error: '',
      });
    });
  });
  describe('users reducer: USERS_CHANGE_SORT', () => {
    it('do nothing for undefined', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastActive,
          },
          changeUsersSort(undefined, undefined)
        )
      ).toEqual({
        ...initialUsersState,
        sortOrder: UsersSortOrder.Descending,
        sortField: UsersSortField.LastActive,
      });
    });
    it('assign only sortOrder', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastActive,
          },
          changeUsersSort(undefined, UsersSortOrder.Ascending)
        )
      ).toEqual({
        ...initialUsersState,
        sortOrder: UsersSortOrder.Ascending,
        sortField: UsersSortField.LastActive,
      });
    });
    it('assign only sortField', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastActive,
          },
          changeUsersSort(UsersSortField.LastWalktest, undefined)
        )
      ).toEqual({
        ...initialUsersState,
        sortOrder: UsersSortOrder.Descending,
        sortField: UsersSortField.LastWalktest,
      });
    });
    it('assign both sortField and sortField', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            sortOrder: UsersSortOrder.Descending,
            sortField: UsersSortField.LastActive,
          },
          changeUsersSort(UsersSortField.LastWalktest, UsersSortOrder.Ascending)
        )
      ).toEqual({
        ...initialUsersState,
        sortOrder: UsersSortOrder.Ascending,
        sortField: UsersSortField.LastWalktest,
      });
    });
  });
  describe('users reducer: USERS_TOGGLE_HIDE_EID_TYPE', () => {
    it('adds to existing list', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            hiddenEIDTypes: ['111'],
          },
          toggleHideEIDType('000')
        )
      ).toEqual({
        ...initialUsersState,
        hiddenEIDTypes: ['111', '000'],
      });
    });
    it('removes from existing list', () => {
      expect(
        usersReducer(
          {
            ...initialUsersState,
            hiddenEIDTypes: ['111', '000'],
          },
          toggleHideEIDType('000')
        )
      ).toEqual({
        ...initialUsersState,
        hiddenEIDTypes: ['111'],
      });
    });
  });
});
