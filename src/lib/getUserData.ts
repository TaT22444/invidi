// src/lib/getUserData.ts
import { getAuth, getFirestore } from "./firebase-admin";

/**
 * クッキー文字列から指定のキーの値を取得するユーティリティ
 */
function getCookie(cookieHeader: string, key: string): string {
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").filter(Boolean).map(c => {
      const [k, ...v] = c.split("=");
      return [k, v.join("=")];
    })
  );
  return cookies[key] || "";
}

/**
 * ログイン中のユーザー情報とプロジェクトリストを取得する関数
 * @param cookieHeader サーバーリクエストの cookie ヘッダー文字列
 */
export async function getUserData(cookieHeader: string) {
  const token = getCookie(cookieHeader, "token");
  if (!token) {
    return { accountName: "ログイン", projects: [] };
  }

  const adminAuth = getAuth();
  let authUser = null;
  try {
    authUser = await adminAuth.verifyIdToken(token);
  } catch (err) {
    console.error("IDトークンの検証に失敗しました", err);
    return { accountName: "ログイン", projects: [] };
  }

  let userData = null;
  try {
    const db = getFirestore();
    const userSnap = await db.collection("users").doc(authUser.uid).get();
    if (userSnap.exists) {
      userData = userSnap.data();
    } else {
      console.error("ユーザーデータが存在しません", authUser.uid);
    }
  } catch (err) {
    console.error("ユーザーデータの取得エラー", err);
  }

  return {
    accountName:
      userData && userData.displayName ? userData.displayName : "ログイン",
    projects: userData && userData.projects ? userData.projects : [],
  };
}
