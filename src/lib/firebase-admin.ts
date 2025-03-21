import admin from "firebase-admin";

/**
 * Firebase Admin SDK のシングルトンインスタンスを取得する
 */
export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    // 環境変数から取得（Astroの環境変数とNode.jsの環境変数両方対応）
    const serviceAccountStr =
      process.env.FIREBASE_SERVICE_ACCOUNT || import.meta.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (!serviceAccountStr) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT が設定されていません");
    }
    
    const serviceAccount = JSON.parse(serviceAccountStr);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  
  return admin;
}

/**
 * Firestore インスタンスを取得する
 */
export function getFirestore() {
  const admin = getFirebaseAdmin();
  return admin.firestore();
}

/**
 * Firebase Auth インスタンスを取得する
 */
export function getAuth() {
  const admin = getFirebaseAdmin();
  return admin.auth();
}

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