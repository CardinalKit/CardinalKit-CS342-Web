import Firebase from '../components/Firebase';
import app from 'firebase/app';

export function getAllFirebaseUsers(): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase.users().get().then(function (doc) {
    return doc;
  }).catch(function (error) {
    console.log("Error getting document:", error);
    return error;
  });
}

export function getFirebaseUser(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase.user(uid).get().then(function (doc) {
    return doc;
  }).catch(function (error) {
    console.log("Error getting document:", error);
    return error;
  });
}

export function getSurveys(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase.surveys(uid).get().then(function (doc) {
    return doc;
  }).catch(function (error) {
    console.log("Error getting document:", error);
    return error;
  });
}

export function getSurvey(uid: String, surveyId: string): Promise<app.firestore.DocumentData> {
  const firebase = new Firebase();
  return firebase.surveys(uid).doc(surveyId).get().then(function (doc) {
    return doc.data();
  }).catch(function (error) {
    console.log("Error getting document:", error);
    return error;
  });
}