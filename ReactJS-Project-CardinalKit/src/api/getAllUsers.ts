import app from 'firebase/app';
import Firebase from '../components/Firebase';

export function getAllFirebaseUsers(): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .users()
    .get()
    .then(doc => doc)
    .catch(error => error);
}

export function getFirebaseUser(uid: string): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(uid)
    .get()
    .then(doc => doc)
    .catch(error => error);
}
export function getSurveys(uid: string): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .surveys(uid)
    .get()
    .then(doc => doc)
    .catch(error => error);
}

export function getVideo(uid: string, surveyId: string, videoId: string) {
  const firebase = new Firebase();
  return firebase
    .video(uid, surveyId, videoId)
    .getDownloadURL()
    .then(file => file)
    .catch(error => error);
}

export function getAllFirebaseProviders(): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .providers()
    .get()
    .then(doc => doc)
    .catch(error => error);
}

export function getFirebaseProvider(uid: string): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .provider(uid)
    .get()
    .then(doc => doc)
    .catch(error => {
      console.log('Error getting document:', error);
      return error;
    });
}

/*
import { UserDetails } from './user';

interface APIUserSummary {
  ID: number;
  eID: string;
  lastActive: string;
  lastWalktest: string;
}

export function getAllUsers(authToken: string): Promise<UserDetails[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
  };
  return request(`${BASE_URL}/api/v1/user/list`, options).then((users: APIUserSummary[]) =>
    users.map(user => {
      return {
        ID: user.ID,
        eID: user.eID,
        lastActive: new Date(user.lastActive),
        lastWalktest: new Date(user.lastWalktest),
      };
    })
  );
} */
