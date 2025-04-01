// src/library/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
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

// クライアントサイドでのみブラウザ永続性を設定
if (typeof window !== 'undefined') {
  // セッション持続性を設定（ブラウザを閉じても認証状態を維持 - 最大14日間）
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Firebase認証の永続性設定に成功しました");
    })
    .catch((error) => {
      console.error("Firebase認証の永続性設定に失敗:", error);
    });
}

// トークン自動更新の設定
// トークンの更新間隔（45分 = 2700000ミリ秒）- Firebaseトークンのデフォルト有効期限は1時間
const TOKEN_REFRESH_INTERVAL = 45 * 60 * 1000;
let refreshTimerId: number | null = null;

/**
 * トークンの自動更新をセットアップする関数
 */
export const setupTokenRefresh = async (user: any) => {
  // すでにタイマーが設定されている場合はクリア
  if (refreshTimerId !== null) {
    clearInterval(refreshTimerId);
    refreshTimerId = null;
  }
  
  if (!user) return;
  
  // トークンを更新してクッキーに保存する関数
  const refreshToken = async () => {
    try {
      if (!auth.currentUser) return;
      
      // 強制的にトークンを更新
      const newToken = await auth.currentUser.getIdToken(true);
      
      // クッキーにトークンを保存（7日間有効）
      document.cookie = `token=${newToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`;
      
      console.log("Firebaseトークンを自動更新しました");
      
      // 最終更新時刻を記録
      localStorage.setItem('lastTokenRefresh', Date.now().toString());
    } catch (error) {
      console.error("トークン更新エラー:", error);
    }
  };
  
  // 初回実行
  await refreshToken();
  
  // 定期的に実行
  refreshTimerId = window.setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
  
  return () => {
    if (refreshTimerId !== null) {
      clearInterval(refreshTimerId);
      refreshTimerId = null;
    }
  };
};

/** ユーザーログイン */
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // IDトークンを取得して自動更新を設定
    const token = await user.getIdToken();
    
    // クッキーにトークンを保存（7日間有効）
    if (typeof document !== 'undefined') {
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`;
    }
    
    // トークン自動更新を設定
    await setupTokenRefresh(user);
    
    return user;
  } catch (error) {
    console.error("ログインエラー:", error);
    throw error;
  }
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
  
  // 新規登録後もトークンを取得し、自動更新を設定
  if (typeof document !== 'undefined') {
    const token = await user.getIdToken();
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`;
    await setupTokenRefresh(user);
  }
  
  return user;
};

/** ログアウト */
export const logout = async () => {
  // トークン更新タイマーをクリア
  if (refreshTimerId !== null) {
    clearInterval(refreshTimerId);
    refreshTimerId = null;
  }
  
  // クッキーを削除
  if (typeof document !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  
  await signOut(auth);
};

/** 認証状態の監視 */
export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // ユーザーがログインしている場合は自動更新をセットアップ
      await setupTokenRefresh(user);
    } else {
      // ログアウト時に自動更新をクリア
      if (refreshTimerId !== null) {
        clearInterval(refreshTimerId);
        refreshTimerId = null;
      }
    }
    
    // 元のコールバックを実行
    if (callback) callback(user);
  });
};
