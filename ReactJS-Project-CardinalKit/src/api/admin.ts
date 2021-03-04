import app from 'firebase/app';
import Firebase from '../components/Firebase';

// checks 
export function isAdmin(userEmail: string): Promise<boolean> {
  const firebase = new Firebase();
  var adminBool = firebase.db.collection('providers').get()
    .then(function (querySnapshot) {
      var result = false;
      querySnapshot.forEach(function(doc) {
        if (doc.id == userEmail && doc.data()["admin"]) {
          result = true;
        }
      })
      return result;
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
      return false;
    });
  return adminBool;
}