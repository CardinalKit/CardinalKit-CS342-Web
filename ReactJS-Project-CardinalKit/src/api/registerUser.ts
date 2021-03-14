import app from 'firebase/app';
import Firebase from '../components/Firebase';

export function sendSignInEmail(email: string) {
  const firebase = new Firebase();

  const actionCodeSettings = {
    // include email in link so it can be passed to iOS
    url: 'https://cs342-alpha-9bb64.web.app/?email=' + email,
    handleCodeInApp: true,
    iOS: {
      bundleId: 'https://cs342-alpha-9bb64.web.app',
    },
    dynamicLinkDomain: 'cs342alpha.page.link',
  };

  firebase.auth
  .sendSignInLinkToEmail(email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    console.log('email sent!');
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('email failed!', errorCode, errorMessage);
  });
}

export function registerNewUser(user: any): Promise<app.firestore.QuerySnapshot> {

  const firebase = new Firebase();
  console.log('Registering a new user!');
  const userRef = firebase.db
    .collection(`registered-patients`)
    .doc(user.email)
    .set(user)
    .then((docRef: any) => {
      console.log('Document written to: ', user.email);
      return docRef;
    })
    .catch((error: any) => {
      console.error('Error adding document: ', error);
      return error;
    });

  // send an email to the patient with the sign-in link
  sendSignInEmail(user.email);

  return userRef;
}
