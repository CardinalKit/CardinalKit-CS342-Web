import { APIEvent, apiEventToEvent, Event } from './event';

import { BASE_URL } from './common';
import { request } from './request';

export function getEventsForUser(authToken: string, userID: number): Promise<Event[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
  };
  return request(`${BASE_URL}/api/v1/events/${userID}`, options).then((apiEvents: APIEvent[]) =>
    apiEvents.map(apiEventToEvent)
  );
}
