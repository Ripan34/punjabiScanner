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
  updateProfile
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
      "word": "ਅਛਿੰਦਾ",
      "meaning": "a Dear darling beloved impertinent"
 });
 await setDoc(doc(wordsRef, "27"), {
  "word": "ਗੁਲੋਚਣ",
  "meaning": "The name of a substance sometimes found in the gall bladder of the cow which is used medicinally"
});
await setDoc(doc(wordsRef, "28"), {
  "word": "ਹੱਚਨਾ",
  "meaning": "To be beaten or tired of doing a thing"
});
await setDoc(doc(wordsRef, "29"), {
  "word": "ਜਟੱਲੀ",
  "meaning": "A liar one who talks nonsense"
});
await setDoc(doc(wordsRef, "30"), {
  "word": "ਜਿਆਣ",
  "meaning": "Loss damage hurt harm injury"
});
await setDoc(doc(wordsRef, "31"), {
  "word": " ਕੁਰੂਪ kurúp",
  "meaning": "a Ill-formed ill-shaped ugly"
});
await setDoc(doc(wordsRef, "32"), {
  "word": "ਮਡ਼ਕਣਾ maṛkṉá",
  "meaning": "a Creaking shoes brittle breaking when folded paper"
});
await setDoc(doc(wordsRef, "33"), {
  "word": "ਨਛਿੱਕਾ nachhikká",
  "meaning": "a Ashamed"
});
await setDoc(doc(wordsRef, "34"), {
  "word": "ਫੁਲਫੁਲਾਟ phulphuláṭ",
  "meaning": "Pomp show a white spot on the forehead of animals"
});
await setDoc(doc(wordsRef, "35"), {
  "word": "ਪਿਰਤਬਿੰਬ pirtbimb",
  "meaning": "An image or picture the reflection of an image or figure in a mirror or water"
});
await setDoc(doc(wordsRef, "36"), {
  "word": "ਰਖਵੈਯ਼ਾ rakhwaiyá",
  "meaning": "One who keeps preserves or takes care of an employer"
});
await setDoc(doc(wordsRef, "37"), {
  "word": "ਸਦੱਕਡ਼ੇ sadakkaṛe",
  "meaning": "To be sacrificed for the welfare of another"
});
await setDoc(doc(wordsRef, "38"), {
  "word": "ਸਰਹਾਉਂਦੀ sarháuṇdí",
  "meaning": "The head of a bedstead or of a tomb"
});
await setDoc(doc(wordsRef, "39"), {
  "word": "ਤਡ਼ਾਖਾ tarákhá",
  "meaning": "The sound of breaking wood breaking cracking"
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