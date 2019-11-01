import { UserDetails } from './user';

import { BASE_URL } from './common';
import { request } from './request';

interface APIUserDetails {
  ID: number;
  eID: string;
  createdAt: string;
  internalUser: boolean;
  lastActive: string;
  last6mwt: string;
  lastOpenw: string;
  lastMedSurvey: string;
  lastSurgSurvey: string;
  lastWalkSurvey: string;
  lastSf12Survey: string;
}

export function getUserDetails(authToken: string, userID: number): Promise<UserDetails> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
  };
  return request(`${BASE_URL}/api/v1/user/details/${userID}`, options).then(
    (apiUserDetails: APIUserDetails) => {
      const last6mwt = new Date(apiUserDetails.last6mwt);
      const lastOpenw = new Date(apiUserDetails.lastOpenw);
      return {
        ID: apiUserDetails.ID,
        eID: apiUserDetails.eID,
        lastActive: new Date(apiUserDetails.lastActive),
        lastWalktest: last6mwt > lastOpenw ? last6mwt : lastOpenw,
        createdAt: new Date(apiUserDetails.createdAt),
        internalUser: apiUserDetails.internalUser,
        last6mwt,
        lastOpenw,
        lastMedSurvey: new Date(apiUserDetails.lastMedSurvey),
        lastSurgSurvey: new Date(apiUserDetails.lastSurgSurvey),
        lastWalkSurvey: new Date(apiUserDetails.lastWalkSurvey),
        lastSf12Survey: new Date(apiUserDetails.lastSf12Survey),
      };
    }
  );
}
