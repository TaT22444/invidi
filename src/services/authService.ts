import { getFirebaseAdmin } from '../lib/firebase-admin';
import { getCachedData } from '../utils/cache';

/**
 * リクエストからユーザー情報を取得する
 */
export async function getUserFromRequest(request: Request, providedFormData?: FormData | null) {
  try {
    const { auth, db } = getFirebaseAdmin();
    
    // Cookieからトークンを取得
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").filter(Boolean).map(c => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    const token = cookies["token"] || "";
    
    if (!token) {
      // POSTリクエストの場合は、フォームデータからCSRFトークンを確認
      if (request.method === 'POST' && providedFormData) {
        // フォームデータからのCSRF検証ロジック
      }
      return { user: null, error: new Error('No authentication token found') };
    }
    
    try {
      // トークン検証
      const authUser = await auth.verifyIdToken(token, false);
      const uid = authUser.uid;
      
      // トークンの有効期限チェック
      const tokenIssuedAt = authUser.iat * 1000;
      const currentTime = Date.now();
      const tokenAge = currentTime - tokenIssuedAt;
      
      if (tokenAge > 60 * 60 * 1000) {
        console.warn("トークンが1時間以上前に発行されましたが、有効として処理します");
      }
      
      // キャッシュを利用してユーザーデータを取得
      const cacheKey = `user:${uid}`;
      const userData = await getCachedData(
        cacheKey,
        async () => {
          const userSnap = await db.collection("users").doc(uid).get();
          if (!userSnap.exists) {
            throw new Error("ユーザーデータが存在しません");
          }
          return userSnap.data();
        },
        300 // 5分キャッシュ
      );
      
      return { 
        user: {
          uid,
          ...userData
        }, 
        error: null 
      };
    } catch (err) {
      console.error("認証エラー:", err);
      return { user: null, error: "認証に失敗しました" };
    }
  } catch (error) {
    console.error("ユーザー認証処理エラー:", error);
    return { user: null, error: "サーバーエラーが発生しました" };
  }
} 