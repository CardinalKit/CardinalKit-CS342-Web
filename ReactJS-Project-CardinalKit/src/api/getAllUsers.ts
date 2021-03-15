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

export function updateUserList(userList: any): Promise<any[]> {
  const out = userList.map((user: any) => {
    return getHeartbeatInfo(user.email).then(heartbeatInfo => {
      const heartbeatInfoData = heartbeatInfo.data();
      if (heartbeatInfoData) {
        const lastActive = heartbeatInfoData.lastActive;
        user.lastActive = lastActive;
        return user;
      }
      return user;
    });
  });

  // we need to make this function return a promise (not an array of promises)
  // so, we construct a Promise.all around it
  return Promise.all(out);
}

export function getFirebaseUser(email: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(email)
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getHeartbeatInfo(uid: String): Promise<app.firestore.DocumentSnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(uid)
    .collection('studies')
    .doc('heartbeat')
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getUserFromUID(uid: string): Promise<app.firestore.QueryDocumentSnapshot> {
  const firebase = new Firebase();
  return firebase.db
    .collection('registered-patients')
    .where('userID', '==', uid)
    .get()
    .then(querySnapshot => {
      // return the first since it should be unique
      return querySnapshot.docs[0];
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

// export function getMedicationsFromUID(uid: String): Promise<app.firestore.QuerySnapshot>{
//   const firebase = new Firebase();
//   return getUserFromUID(uid).then((userDoc) => {
//     return userDoc.ref.collection('medications').get().then((querySnapshot) => {
//       console.log(querySnapshot);
//       return querySnapshot;
//     })
//   });
// }

export function saveNewMedications(userEmail: string, newMedications: any) {
  const firebase = new Firebase();
  firebase.db
    .collection('registered-patients')
    .doc(userEmail)
    .update({
      medications: newMedications,
    })
    .then(() => {
      alert('Medications saved.');
    })
    .catch(error => {
      // The document probably doesn't exist.
      alert('ERROR: Medications were not saved. ' + error);
    });
}

export function deleteFirebaseUser(userID: string) {
  getUserFromUID(userID).then(docSnapshot => {
    docSnapshot.ref
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error: any) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getSurveys(email: String, uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .surveys(email, uid)
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
