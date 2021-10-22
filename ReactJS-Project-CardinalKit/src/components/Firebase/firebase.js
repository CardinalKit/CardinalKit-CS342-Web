import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  hosting: process.env.REACT_APP_HOSTING,
  iOSAppBundleId: process.env.REACT_APP_IOS_APP_ID,
  usersCollection: process.env.REACT_APP_USERS_COLLECTION,
  providersCollection: process.env.REACT_APP_PROVIDERS_COLLECTION,
  surveysCollection: process.env.REACT_APP_SURVEYS_COLLECTION,
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

  user = uid =>
    this.db.collection(`${config.iOSAppBundleId}/study/${config.usersCollection}`).doc(`${uid}`);

  // users = () => this.db.collection(`${config.iOSAppBundleId}/study/${config.providersCollection}/`);
  users = () => this.db.collection(`${config.iOSAppBundleId}/study/${config.usersCollection}/`);

  // *** Surveys API ***

  surveys = uid =>
    this.db.collection(
      `${config.iOSAppBundleId}/study/${config.usersCollection}/${uid}/${config.surveysCollection}/`
    );

  survey = (uid, surveyId) =>
    this.db.collection(
      `${config.iOSAppBundleId}/study/${config.usersCollection}/${uid}/${config.surveysCollection}/${surveyId}`
    );
  // *** Providers API ***

  provider = uid =>
    this.db
      .collection(`${config.iOSAppBundleId}/study/${config.providersCollection}/`)
      .doc(`${uid}`);

  providers = () =>
    this.db.collection(`${config.iOSAppBundleId}/study/${config.providersCollection}/`);

  video = (uid, surveyId, videoId) =>
    // const filePath = `${config.iOSAppBundleId}/study/careit-users/${uid}/careit-videos/${surveyId}/${videoId}`;
    // console.log(`Auth token for logged in user: ${window.localStorage.rootAuthToken}`);
    // const requestOptions = {
    //   method: 'GET',
    //   'Access-Control-Allow-Origin': '*',
    //   headers: { authorization: `Bearer ${window.localStorage.rootAuthToken}` },
    // };
    // fetch(
    //   `https://device-qa.stanford.edu/mhc-KnRJe654r9xkA5tX/api/v1/firebase/download?objectName=${filePath}`,
    //   requestOptions
    // )
    //   .then(response => response.text())
    //   .then(data => alert(`Got response from video API${data}`));

    this.storage
      .ref()
      .child(
        `${config.iOSAppBundleId}/study/careit-users/${uid}/careit-videos/${surveyId}/${videoId}`
      );
}

export default Firebase;
