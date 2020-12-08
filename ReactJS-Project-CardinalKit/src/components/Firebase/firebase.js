import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const admin = require('firebase-admin');

const config = {
  apiKey: process.env.REACT_APP_API_KEY || 'AIzaSyCVzML6v4C16HNjUZN_xnEX5RWJmDq3YUU',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'cs342-master-sample.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL || 'https://cs342-master-sample.firebaseio.com',
  projectId: process.env.REACT_APP_PROJECT_ID || 'cs342-master-sample',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'cs342-master-sample.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || '267563013930',
  appId: process.env.REACT_APP_ID || '1:267563013930:web:99eeeff653b0f07accb053',
  // iOSAppBundleId: process.env.IOS_APP_ID || 'edu.stanford.cs342.sample-study', // as setup on your iOS project
  iOSAppBundleId: process.env.IOS_APP_ID || 'com.siva.cardinalkit-example', // as setup on your iOS project
};
const firebaseApp = app.initializeApp(config);
const db = firebaseApp.firestore();

class Firebase {
  constructor() {
    if (!app.apps.length) {
      admin.initializeApp(config);
    }

    /* Helper */

    this.serverValue = app.firestore.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    // this.functions = app.functions();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.collection(`studies/${config.iOSAppBundleId}/users`).doc(`${uid}`);

  users = () => this.db.collection(`studies/${config.iOSAppBundleId}/users/`);

  // *** Surveys API ***

  surveys = uid => this.db.collection(`studies/${config.iOSAppBundleId}/users/${uid}/surveys/`);
}

export { db };
export default Firebase;
