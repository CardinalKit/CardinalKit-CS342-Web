import app from 'firebase/app';
import Firebase from '../components/Firebase';


export function registerNewUser(user: any): Promise<app.firestore.QuerySnapshot> {

  var actionCodeSettings = {
    // include email in link so it can be passed to iOS 
    url: 'https://cs342-alpha-9bb64.web.app/?email=' + user.email,
    handleCodeInApp: true,
    iOS: {
      bundleId: 'https://cs342-alpha-9bb64.web.app'
    },
    dynamicLinkDomain: 'cs342alpha.page.link',
  };

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
      console.log('email sent new!');
      window.localStorage.setItem('emailForSignIn', user.email);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('email failed!', errorCode, errorMessage);
    });

  return userRef;
}
