import { BASE_URL } from './common';
import { request } from './request';

export default function postLogin(username: string, password: string) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  };
  return request(`${BASE_URL}/api/v1/login`, options);
}
