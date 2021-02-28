import app from 'firebase/app';
import Firebase from '../components/Firebase';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  // url: 'https://www.example.com/finishSignUp?cartId=1234',
  url: 'https://cs342-alpha-9bb64.web.app',
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  dynamicLinkDomain: 'cs342alpha.page.link',
};

export function registerNewUser(user: any): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  console.log('Registering a new user!');
  const userRef = firebase.db
    .collection(`registered-patients`)
    .add(user)
    .then((docRef: any) => {
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    })
    .catch((error: any) => {
      console.error('Error adding document: ', error);
      return error;
    });

  firebase.auth
    .sendSignInLinkToEmail(user.email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log('email sent!');
      window.localStorage.setItem('emailForSignIn', user.email);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('email failed!', errorCode, errorMessage);
      // ...
    });

  return userRef;
}
