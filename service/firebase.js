import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
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
const provider = new GoogleAuthProvider();

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

const readTextFromPdfFire = async (pdf) => {
  try{
    const readTextFromPdf = httpsCallable(functions, "readTextFromPdf");
    const result = await readTextFromPdf({imgContent: pdf});
    const data = result.data;
    console.log(result)
    return data.data;
  } catch(err){
      throw err;
  }
}
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
      throw err;
  }
};
const createWithEmailAndPassword = async (email, password, name) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name
    })
  } catch (err) {
    throw err;
  }
};
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

const changePassword = async (oldPassword, newPassword) => {
  try{
    const user = auth.currentUser;
    var credentials = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
      await reauthenticateWithCredential(user, credentials)
      await updatePassword(user, newPassword);
  } catch(err){
      throw err;
  }
  }

  const sendResetPasswordEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
        throw err;
    }
  };

  const loginWithGoogle = async (id_token) => {
    try{
      const credential = GoogleAuthProvider.credential(id_token);
      const result = signInWithCredential(auth, credential);
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

    } catch(err){
        throw err;
    }
  }
const getWord = async () => {
  try {
    const counterRef = doc(db, "punjabi_words", "counter");
    const counterSnap = await getDoc(counterRef);
    let counter = '0';
    if(counterSnap.exists){
      let data = counterSnap.data();
      counter = data["counter"].toString();
    }

    const wordsRef = doc(db, "punjabi_words", counter);
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
const uploadData = async () => {
  try{
    const wordsRef = collection(db, "punjabi_words");
    await setDoc(doc(wordsRef, "26"), {
      "word": "ਜਿਵਾਉਣਾ jiwáuṉá",
      "meaning": "To revive to give life to feed to cause to eat"
 });
 await setDoc(doc(wordsRef, "27"), {
  "word": "ਹਾਜਣਾ hájṉá",
  "meaning": "To eat without being satisfied to be always hungry"
});
await setDoc(doc(wordsRef, "28"), {
  "word": "ਬੁਲੰਦੀ bulaṇdí",
  "meaning": "Height"
});
await setDoc(doc(wordsRef, "29"), {
  "word": "ਸਨਦੂਕਡ਼ੀ sandúkṛí",
  "meaning": "A small box or chest"
});
await setDoc(doc(wordsRef, "30"), {
  "word": "ਸਿਜਲ sijal",
  "meaning": "a Good refined correct polished"
});
await setDoc(doc(wordsRef, "31"), {
  "word": "ਊਧਮ údham",
  "meaning": "The noise of music dancing and rejoicing disturbance rebellion"
});
await setDoc(doc(wordsRef, "32"), {
  "word": "ਵਹਿਜਤ wahijat",
  "meaning": "A habit, a practice"
});
await setDoc(doc(wordsRef, "33"), {
  "word": "ਯਰਾਨਾ yaráná",
  "meaning": "Friendship affection attachment"
});
await setDoc(doc(wordsRef, "34"), {
  "word": "ਵਿਟਰਾਉਣਾ wiṭráuṉá",
  "meaning": "To spoil to damage to enrage to make furious"
});
await setDoc(doc(wordsRef, "35"), {
  "word": "ਖਰਾਇਤਣ kharáitaṉ",
  "meaning": "A beggar one who lives on charity"
});
await setDoc(doc(wordsRef, "36"), {
  "word": "ਖੰਭਡ਼ਾ khaṇbhṛá",
  "meaning": "The fin of a fish"
});
await setDoc(doc(wordsRef, "37"), {
  "word": "ਮਾਸੇਹੋਰਾ másehorá ",
  "meaning": "The husband of a mother-in-laws sister"
});
await setDoc(doc(wordsRef, "38"), {
  "word": "ਪਘਰਾਉਣਾ paghráuṉá",
  "meaning": "To melt by applying heat to fuse"
});
await setDoc(doc(wordsRef, "39"), {
  "word": "ਫੱਦਡ਼ phaddaṛ",
  "meaning": "Very fat and ugly worthless destitute of energy"
});
  } catch(err){
      console.log(err)
  }
}
exports.readText = readText;
exports.signOutUser = signOutUser;
exports.logInWithEmailAndPassword = logInWithEmailAndPassword;
exports.getWord = getWord;
exports.uploadData = uploadData;
exports.createWithEmailAndPassword = createWithEmailAndPassword;
exports.auth = auth;
exports.changePassword = changePassword;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.readTextFromPdfFire = readTextFromPdfFire;
exports.loginWithGoogle = loginWithGoogle;