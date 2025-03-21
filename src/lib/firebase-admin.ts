import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

/**
 * Firebase Admin SDK のシングルトンインスタンスを取得する
 */
export function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return { db: getFirestore(), auth: getAuth() };
  }

  try {
    // 環境変数から設定を取得
    const serviceAccountStr = 
      process.env.FIREBASE_SERVICE_ACCOUNT || 
      (typeof import.meta !== 'undefined' ? import.meta.env.FIREBASE_SERVICE_ACCOUNT : undefined);
    
    if (!serviceAccountStr) {
      throw new Error("Firebase service account is missing in environment variables");
    }
    
    const serviceAccount = JSON.parse(serviceAccountStr);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log("Firebase Admin initialized successfully");
    return { db: getFirestore(), auth: getAuth() };
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    throw error;
  }
}

/**
 * 便利なエクスポート
 */
export const getFirebaseAdmin = () => {
  return initializeFirebaseAdmin();
};

export const getFirestoreDb = () => {
  return initializeFirebaseAdmin().db;
};

export const getFirebaseAuth = () => {
  return initializeFirebaseAdmin().auth;
};

/**
 * プロジェクト関連のFirestore操作
 */
export const projectsDB = {
  /**
   * プロジェクト情報を取得する
   */
  async getProject(projectId: string) {
    const db = getFirestore();
    const projectDoc = await db.collection("projects").doc(projectId).get();
    return projectDoc.exists ? projectDoc.data() : null;
  },
  
  /**
   * プロジェクトのお知らせ一覧を取得する
   */
  async getNotices(projectId: string) {
    const db = getFirestore();
    const noticesSnapshot = await db
      .collection("projects")
      .doc(projectId)
      .collection("notice")
      .orderBy("createdAt", "desc")
      .get();
    
    return noticesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  /**
   * お知らせを削除する
   */
  async deleteNotice(projectId: string, noticeId: string) {
    const db = getFirestore();
    await db
      .collection("projects")
      .doc(projectId)
      .collection("notice")
      .doc(noticeId)
      .delete();
    return true;
  },

  /**
   * ブログ記事を削除する
   */
  async deleteBlog(projectId: string, blogId: string) {
    const db = getFirestore();
    await db
      .collection("projects")
      .doc(projectId)
      .collection("blog")
      .doc(blogId)
      .delete();
    return true;
  }
};

/**
 * ユーザー関連のFirestore操作
 */
export const usersDB = {
  /**
   * ユーザー情報を取得する
   */
  async getUserData(uid: string) {
    const db = getFirestore();
    const userDoc = await db.collection("users").doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
  }
}; 