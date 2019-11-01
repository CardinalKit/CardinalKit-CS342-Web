import { BASE_URL } from './common';
import { request } from './request';

interface PostTwoFactorInputRep {
  duoPush?: boolean;
  duoAuthCode?: string;
}

interface PostTwoFactorResponseRep {
  apiAuthToken: string;
}

export default function postTwoFactor(
  twoFactorAuthToken: string,
  duoAuthCode?: string
): Promise<PostTwoFactorResponseRep> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: twoFactorAuthToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify(
      (duoAuthCode as PostTwoFactorInputRep)
        ? {
            duoAuthCode,
          }
        : {
            duoPush: true,
          }
    ),
  };
  return request(`${BASE_URL}/api/auth/twofactor`, options);
}
