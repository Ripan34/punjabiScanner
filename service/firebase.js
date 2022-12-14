import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIzPm1W_bHsgwN9qU9PX-IZPouT9t5R_Q",
  authDomain: "punjabi-scanner.firebaseapp.com",
  projectId: "punjabi-scanner",
  storageBucket: "punjabi-scanner.appspot.com",
  messagingSenderId: "937363023681",
  appId: "1:937363023681:web:35284c383976072b3c63c0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const functions = getFunctions(app);
const db = getFirestore(app);

const readText = async (img) => {
  try {
    const recognizeText = httpsCallable(functions, "recognizeText");
    const result = await recognizeText({ imgContent: img });
    const data = result.data;
    return data.data;
  } catch (err) {
    throw err;
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth)
      .then(() => {})
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

const getWord = async () => {
  try {
    const wordsRef = doc(db, "punjabi_words", "0");
    const docSnap = await getDoc(wordsRef);

    if (!docSnap.exists) {
      throw new Error("no document found");
    } else {
      const word = docSnap.data();
      return word;
    }
  } catch (err) {
    throw err;
  }
};
exports.readText = readText;
exports.signOutUser = signOutUser;
exports.logInWithEmailAndPassword = logInWithEmailAndPassword;
exports.getWord = getWord;
