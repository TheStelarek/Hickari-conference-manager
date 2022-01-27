import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB9HrrYmd9j_BEVupxKtNI2HLsAGPIDupY',
  authDomain: 'hickari-7bd3b.firebaseapp.com',
  projectId: 'hickari-7bd3b',
  storageBucket: 'hickari-7bd3b.appspot.com',
  messagingSenderId: '671540570139',
  appId: '1:671540570139:web:3b1d34777229592e8e70be',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = getStorage(app);

export { firebaseConfig, app, auth, db, storage };
