import app from 'firebase/app';
import Firebase from '../components/Firebase';

export function getAllFirebaseUsers(): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .users()
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getFirebaseUser(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(uid)
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getLastActive(email: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(email)
    .collection("studies")
    .get()
    .then(function(doc) {
      console.log("AQUI", email, doc);
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getSurveys(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .surveys(uid)
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
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
}*/
