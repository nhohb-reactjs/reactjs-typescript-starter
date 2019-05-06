import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = require(`src/config/firebase/firebase.config.${process.env.ENVIRONMENT}`).default;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseAuth: firebase.auth.Auth = firebase.auth();

async function handleRenewToken(): Promise<string | undefined> {
  if (!firebaseAuth.currentUser) {
    return undefined;
  }

  return await firebaseAuth.currentUser.getIdToken(true);
}

export default {
  firebase,
  firebaseConfig,
  auth: firebaseAuth,
  renewToken: handleRenewToken,
}