import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// const config = {
//   apiKey: 'AIzaSyDY8GTuNp9acKwYeIFWyEw_xG-ssnoL1pk',
//   authDomain: 'som-rit-phi-mhealth2-qa.firebaseapp.com',
//   projectId: 'som-rit-phi-mhealth2-qa',
//   databaseURL: 'https://som-rit-phi-mhealth2-qa.firebaseio.com',
//   storageBucket: 'som-rit-phi-mhealth2-qa.appspot.com',
//   messagingSenderId: '747429109194',
//   appId: '1:747429109194:web:c31ad046d69aafe8524333',
//   measurementId: 'G-PM8MJ8VJS5',
//   hosting: 'https://careit-qa2.firebaseapp.com',
//   iOSAppBundleId: 'med.stanford.mh-sample',
// };

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MID,
  hosting: process.env.REACT_APP_HOSTING,
  iOSAppBundleId: process.env.IOS_APP_ID
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    /* Helper */

    this.serverValue = app.firestore.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();

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

  doSignOut = () => this.auth.signOut();

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

  user = uid => this.db.collection(`${config.iOSAppBundleId}/study/users`).doc(`${uid}`);

  users = () => this.db.collection(`${config.iOSAppBundleId}/study/users/`);

  // *** Surveys API ***

  surveys = uid => this.db.collection(`${config.iOSAppBundleId}/study/users/${uid}/mhs-surveys/`);
}

export default Firebase;
