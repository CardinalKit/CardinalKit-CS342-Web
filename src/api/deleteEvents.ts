import { BASE_URL } from './common';
import { request } from './request';

export function deleteEvents(
  authToken: string,
  userID: number,
  deletedEventIDs: number[]
): Promise<void> {
  const body: { eventIDs: number[] } = {
    eventIDs: deletedEventIDs,
  };
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify(body),
  };
  return request(`${BASE_URL}/api/v1/events`, options);
}
