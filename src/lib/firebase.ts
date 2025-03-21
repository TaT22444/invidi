// src/library/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Firebase 設定（環境変数から取得）
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/** ユーザーログイン */
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/** 新規登録（displayName を Firestore に保存） */
export const registerWithEmail = async (email: string, password: string, displayName: string, bio: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    displayName,
    email,
    bio,
    createdAt: new Date(),
  });
  return user;
};

/** ログアウト */
export const logout = async () => {
  await signOut(auth);
};

/** 認証状態の監視 */
export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
