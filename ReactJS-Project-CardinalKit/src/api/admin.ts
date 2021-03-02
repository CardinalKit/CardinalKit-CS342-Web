import app from 'firebase/app';
import Firebase from '../components/Firebase';

export function isAdmin(userEmail: string): Promise<boolean> {
  const firebase = new Firebase();
  var adminBool = firebase.db.collection('providers').doc('providers').get()
  .then(function(doc) {
    var data = doc.data();
    return (data && data["providers"].includes(userEmail));
  })
  .catch(function(error) {
    console.log('Error getting document:', error);
    return false;
  });
  return adminBool;
}