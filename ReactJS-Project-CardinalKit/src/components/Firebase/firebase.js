import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// santi app

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY || "AIzaSyCVzML6v4C16HNjUZN_xnEX5RWJmDq3YUU",
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN || "cs342-master-sample.firebaseapp.com",
//   databaseURL: process.env.REACT_APP_DATABASE_URL || "https://cs342-master-sample.firebaseio.com",
//   projectId: process.env.REACT_APP_PROJECT_ID || "cs342-master-sample",
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "cs342-master-sample.appspot.com",
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "267563013930",
//   appId: process.env.REACT_APP_ID || "1:267563013930:web:99eeeff653b0f07accb053",
//   iOSAppBundleId: process.env.IOS_APP_ID || "edu.stanford.cs342.sample-study",
// };

// phi_qa_

const config = {
  apiKey: process.env.REACT_APP_API_KEY || "AIzaSyCaDXXx-fsIdQJhLXOk_Us_jFKYaTOKJr4",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "som-rit-phi-mhealth-qa.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL || "https://som-rit-phi-mhealth-qa.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "som-rit-phi-mhealth-qa",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "som-rit-phi-mhealth-qa.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "583340836755",
  appId: process.env.REACT_APP_ID || "1:583340836755:web:53deba7a2025900d634a66",
  iOSAppBundleId: process.env.IOS_APP_ID || "edu.stanford.cs342.sample-study",
};

// scci-dev

// const firebaseConfig = {
//   apiKey: "AIzaSyCQADNFcXilnqtVHwNs6KgbMVhAaDrbXEs",
//   authDomain: "som-irt-scci-dev.firebaseapp.com",
//   databaseURL: "https://som-irt-scci-dev.firebaseio.com",
//   projectId: "som-irt-scci-dev",
//   storageBucket: "som-irt-scci-dev.appspot.com",
//   messagingSenderId: "950118420313",
//   appId: "1:950118420313:web:ea7d4873974c9ac4d98648"
// };

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY || "AIzaSyCQADNFcXilnqtVHwNs6KgbMVhAaDrbXEs",
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN || "som-irt-scci-dev.firebaseapp.com",
//   databaseURL: process.env.REACT_APP_DATABASE_URL || "https://som-irt-scci-dev.firebaseio.com",
//   projectId: process.env.REACT_APP_PROJECT_ID || "som-irt-scci-dev",
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "som-irt-scci-dev.appspot.com",
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "950118420313",
//   appId: process.env.REACT_APP_ID || "1:950118420313:web:ea7d4873974c9ac4d98648",
//   iOSAppBundleId: process.env.IOS_APP_ID || "edu.stanford.cs342.sample-study",
// };

// const config = {
//   apiKey: "AIzaSyCaDXXx-fsIdQJhLXOk_Us_jFKYaTOKJr4",
//   authDomain: "som-rit-phi-mhealth-qa.firebaseapp.com",
//   databaseURL: "https://som-rit-phi-mhealth-qa.firebaseio.com",
//   projectId: "som-rit-phi-mhealth-qa",
//   storageBucket: "som-rit-phi-mhealth-qa.appspot.com",
//   messagingSenderId: "583340836755",
//   appId: "1:583340836755:web:53deba7a2025900d634a66",
//   measurementId: "G-J3GVVZWLMR"
// };
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

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

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

export default Firebase;
