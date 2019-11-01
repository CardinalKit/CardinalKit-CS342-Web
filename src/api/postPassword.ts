import { BASE_URL } from './common';
import { request } from './request';

interface PostPasswordInputRep {
  password: string;
}

interface PostPasswordResponseRep {
  twoFactorAuthToken: string;
  apiAuthToken: string;
}

export default function postPassword(
  password: string,
  passwordAuthToken: string
): Promise<PostPasswordResponseRep> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: passwordAuthToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify({
      password,
    } as PostPasswordInputRep),
  };
  return request(`${BASE_URL}/api/auth/password`, options);
}
