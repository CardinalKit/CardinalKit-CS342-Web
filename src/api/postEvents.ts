import {
  APIEvent,
  apiEventToEvent,
  APINewEvent,
  Event,
  NewEvent,
  newEventToAPIEvent,
} from './event';

import { BASE_URL } from './common';
import { request } from './request';

export function postEvents(
  authToken: string,
  userID: number,
  newEvents: NewEvent[]
): Promise<Event[]> {
  const body: { events: APINewEvent[] } = {
    events: newEvents.map(newEventToAPIEvent),
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify(body),
  };
  return request(`${BASE_URL}/api/v1/events/${userID}`, options).then((apiEvents: APIEvent[]) =>
    apiEvents.map(apiEventToEvent)
  );
}
