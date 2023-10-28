import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNY5uT9dV9pIm_QfLdowNBulb4W2Rz3s0",
  authDomain: "taugor-b4715.firebaseapp.com",
  projectId: "taugor-b4715",
  storageBucket: "taugor-b4715.appspot.com",
  messagingSenderId: "511253472734",
  appId: "1:511253472734:web:d4c6d6108d9d44cb93694f",
  measurementId: "G-ZYQ2HYNFEJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
