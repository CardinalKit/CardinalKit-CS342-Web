import { EventType } from './event';
import { Survey } from './survey';

import { BASE_URL } from './common';
import { request } from './request';

interface APISurvey {
  id: number;
  createdAt: string;
  updatedAt: string;
  syncID: string;
  eventID: number;
  mobileUserID: number;
}

function apiSurveyToSurvey(apiSurvey: APISurvey): Survey {
  return {
    ID: apiSurvey.id,
    createdAt: new Date(apiSurvey.createdAt),
    syncID: apiSurvey.syncID,
    eventType: apiSurvey.eventID as EventType,
  };
}

export function getSurveysForUser(authToken: string, userID: number): Promise<Survey[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
  };
  return request(`${BASE_URL}/api/v1/surveys/${userID}`, options).then(
    (apiWalktests: APISurvey[]) => apiWalktests.map(apiSurveyToSurvey)
  );
}
