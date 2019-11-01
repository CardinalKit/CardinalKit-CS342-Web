import { BASE_URL } from './common';
import { request } from './request';

interface PostEmailInputRep {
  email: string;
}

interface PostEmailResponseRep {
  passwordAuthToken: string;
}

export default function postEmail(email: string): Promise<PostEmailResponseRep> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
    body: JSON.stringify({
      email,
    } as PostEmailInputRep),
  };
  return request(`${BASE_URL}/api/auth/email`, options);
}
