/**
 * ダッシュボード画面で使用するデータを取得するサービス
 */
import { getCachedData } from '../utils/cache';
import { getFirestoreDb } from '../lib/firebase-admin';

/**
 * ユーザーIDからユーザーデータを取得する
 * @param userId ユーザーID
 */
export async function getUserData(userId: string) {
  const cacheKey = `user:${userId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      const db = getFirestoreDb();
      const userSnap = await db.collection('users').doc(userId).get();
      
      if (!userSnap.exists) {
        throw new Error('ユーザーデータが見つかりません');
      }
      
      const userData = userSnap.data();
      
      // 必要なデータを抽出して返す
      return {
        uid: userId,
        displayName: userData?.displayName || 'ログイン',
        projects: userData?.projects || [],
        plan: userData?.plan || 'free',
        email: userData?.email || '',
        createdAt: userData?.createdAt || null,
      };
    },
    60 // 1分キャッシュ
  );
}

/**
 * ユーザーのデータ使用量を取得する（サンプル実装）
 * @param userId ユーザーID
 */
export async function getUserDataUsage(userId: string) {
  const cacheKey = `dataUsage:${userId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      // 実際には計算ロジックを実装する（例：Storageデータサイズ + Firestoreドキュメント数など）
      // 今回はサンプルデータを返す
      return {
        current: 24, // GB
        max: 124, // GB
      };
    },
    300 // 5分キャッシュ
  );
}

/**
 * プロジェクトを作成する
 * @param userId ユーザーID
 * @param projectName プロジェクト名
 * @param projectDescription プロジェクトの説明
 * @param planName プラン名
 */
export async function createProject(
  userId: string, 
  projectName: string, 
  projectDescription: string,
  planName: string
) {
  const db = getFirestoreDb();
  
  try {
    // トランザクションを使用して、ユーザーデータとプロジェクトデータを一貫して更新する
    return await db.runTransaction(async (transaction) => {
      // ユーザードキュメントを取得
      const userRef = db.collection('users').doc(userId);
      const userSnap = await transaction.get(userRef);
      
      if (!userSnap.exists) {
        throw new Error('ユーザーデータが見つかりません');
      }
      
      const userData = userSnap.data();
      const currentProjects = userData?.projects || [];
      
      // プラン制限をチェック
      if (planName === 'free' && currentProjects.length >= 1) {
        throw new Error('フリープランでは1つまでしかプロジェクトを作成できません');
      }
      
      // 新規プロジェクトIDを生成（UUIDが必要な場合は別途インポート）
      const projectId = Date.now().toString();
      
      // 新規プロジェクトデータ
      const newProject = {
        id: projectId,
        name: projectName,
        description: projectDescription,
        followers: 0,
        currentPages: 0,
        maxPages: planName === 'free' ? 3 : 10,
        createdAt: new Date(),
        ownerId: userId,
        allTags: [],
      };
      
      // ユーザードキュメントのprojects配列を更新
      currentProjects.push(newProject);
      transaction.update(userRef, { projects: currentProjects });
      
      // プロジェクトコレクションに新規ドキュメントを作成
      const projectRef = db.collection('projects').doc(projectId);
      transaction.set(projectRef, {
        userId,
        plan: planName,
        name: projectName,
        description: projectDescription,
        createdAt: new Date(),
        allTags: [],
        followers: 0,
        maxFollowers: planName === 'free' ? 100 : 1000,
        currentPages: 0,
        maxPages: planName === 'free' ? 3 : 10,
        ownerId: userId,
      });
      
      // 必要に応じてサブコレクションを初期化
      const initBlogs = projectRef.collection('blog').doc('init');
      transaction.set(initBlogs, {
        title: 'サンプルブログ',
        content: 'これは初期作成されたサンプル投稿です',
        createdAt: new Date(),
      });
      
      const initNotices = projectRef.collection('notice').doc('init');
      transaction.set(initNotices, {
        title: 'サンプルお知らせ',
        content: 'これは初期作成されたサンプルお知らせです',
        createdAt: new Date(),
      });
      
      // キャッシュを無効化
      import('../utils/cache').then(cache => {
        cache.invalidateCache(`user:${userId}`);
      });
      
      return { success: true, projectId };
    });
  } catch (error) {
    console.error('プロジェクト作成エラー:', error);
    return { success: false, error: error.message };
  }
}

/**
 * プロジェクトを削除する
 * @param userId ユーザーID
 * @param projectId プロジェクトID
 */
export async function deleteProject(userId: string, projectId: string) {
  const db = getFirestoreDb();
  
  try {
    // トランザクションを使用して、ユーザーデータとプロジェクトデータを一貫して更新する
    return await db.runTransaction(async (transaction) => {
      // ユーザードキュメントを取得
      const userRef = db.collection('users').doc(userId);
      const userSnap = await transaction.get(userRef);
      
      if (!userSnap.exists) {
        throw new Error('ユーザーデータが見つかりません');
      }
      
      const userData = userSnap.data();
      const currentProjects = userData?.projects || [];
      
      // 指定されたプロジェクトを除外
      const updatedProjects = currentProjects.filter(p => p.id !== projectId);
      
      // ユーザードキュメントを更新
      transaction.update(userRef, { projects: updatedProjects });
      
      // プロジェクトドキュメントを削除（オプション）
      // 実際の運用では、論理削除（ステータスフラグなど）を検討することも
      const projectRef = db.collection('projects').doc(projectId);
      transaction.delete(projectRef);
      
      // キャッシュを無効化
      import('../utils/cache').then(cache => {
        cache.invalidateCache(`user:${userId}`);
      });
      
      return { success: true };
    });
  } catch (error) {
    console.error('プロジェクト削除エラー:', error);
    return { success: false, error: error.message };
  }
} 