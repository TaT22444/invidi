/**
 * ダッシュボード画面で使用するデータを取得するサービス
 */
import { clearCache, getCachedData, invalidateCacheByPrefix } from '../utils/cache';
import { getFirebaseAdmin } from '../lib/firebase-admin';
import { getUserResourceUsage, PLAN_LIMITS } from "./planService";

// 以下のUserDataインターフェースを追加
interface UserData {
  uid: string;
  displayName: string;
  projects: any[]; // プロジェクト型に合わせて定義
  plan: 'free' | 'pro';
  email: string;
  createdAt: any; // Timestampなどの適切な型
}

/**
 * ユーザーIDからユーザーデータを取得する
 * @param userId ユーザーID
 */
export async function getUserData(userId: string): Promise<UserData> {
  const cacheKey = `user:${userId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      const db = getFirebaseAdmin().db;
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
        plan: (userData?.plan || 'free') as 'free' | 'pro',
        email: userData?.email || '',
        createdAt: userData?.createdAt || null,
      };
    },
    60 // 1分キャッシュ
  );
}

/**
 * ユーザーのリソース使用状況を取得する関数
 * @param userId ユーザーID
 */
export async function getUserDataUsage(userId: string) {
  try {
    console.log(`getUserDataUsage(${userId}): 開始`);
    
    // リソース使用状況を取得
    const resourceUsage = await getUserResourceUsage(userId);
    
    // ユーザー情報を取得してプランを確認
    const db = getFirebaseAdmin().db;
    const userDoc = await db.collection("users").doc(userId).get();
    const planName = (userDoc.data()?.plan || "free") as 'free' | 'pro';
    
    // プラン情報を取得
    const planLimits = PLAN_LIMITS[planName];
    
    // 安全な除算のためのヘルパー関数
    const safePercent = (current: number, max: number) => {
      if (!max || max <= 0 || !current || current < 0) return 0;
      return Math.min(100, Math.round((current / max) * 100));
    };
    
    const result = {
      ...resourceUsage,
      planName,
      planLimits,
      usagePercentage: {
        storage: safePercent(resourceUsage.storage, planLimits.storage),
        projects: safePercent(resourceUsage.projectsCount, planLimits.projects),
        cmsItems: safePercent(resourceUsage.cmsItems, planLimits.cmsItems),
        pages: safePercent(resourceUsage.pages, planLimits.pages),
        formSubmissions: safePercent(resourceUsage.formSubmissions, planLimits.formSubmissions)
      }
    };
    
    console.log(`getUserDataUsage(${userId}) 結果:`, result);
    
    return result;
  } catch (error) {
    console.error("データ使用量の取得に失敗:", error);
    return {
      storage: 0,
      pages: 0,
      cmsItems: 0,
      formSubmissions: 0,
      projectsCount: 0,
      planName: "free" as const,
      planLimits: PLAN_LIMITS.free,
      usagePercentage: {
        storage: 0,
        projects: 0,
        cmsItems: 0,
        pages: 0,
        formSubmissions: 0
      }
    };
  }
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
  const db = getFirebaseAdmin().db;
  
  try {
    // 制限チェック
    const { checkProjectLimit } = await import('../middleware/planLimits');
    const checkResult = await checkProjectLimit(userId);
    
    if (!checkResult.allowed) {
      return { 
        success: false, 
        error: `プロジェクト数の上限に達しています（${checkResult.current}/${checkResult.limit}）。プランをアップグレードするとより多くのプロジェクトを作成できます。` 
      };
    }
    
    // トランザクションを使用して、ユーザーデータとプロジェクトデータを一貫して更新する
    return await db.runTransaction(async (transaction) => {
      // ユーザードキュメントを取得
      const userRef = db.collection('users').doc(userId);
      const userSnap = await transaction.get(userRef);
      
      if (!userSnap.exists) {
        throw new Error('ユーザーデータが見つかりません');
      }
      
      // 新しいプロジェクトIDを生成
      const projectId = db.collection('projects').doc().id;
      
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
        storageUsage: 0, // ストレージ使用量を0で初期化
      });
      
      // ユーザードキュメントのprojects配列に追加
      const userData = userSnap.data();
      const currentProjects = userData?.projects || [];
      
      // 新しいプロジェクト情報
      const projectInfo = {
        id: projectId,
        name: projectName,
        description: projectDescription,
        createdAt: new Date()
      };
      
      // projects配列を更新
      transaction.update(userRef, {
        projects: [...currentProjects, projectInfo]
      });
      
      // キャッシュを無効化
      invalidateCacheByPrefix(`user:${userId}`);
      
      return {
        success: true,
        projectId
      };
    });
  } catch (error: unknown) {
    console.error('プロジェクト作成エラー:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

/**
 * プロジェクトを削除する
 * @param userId ユーザーID
 * @param projectId プロジェクトID
 */
export async function deleteProject(userId: string, projectId: string) {
  const db = getFirebaseAdmin().db;
  
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
      const updatedProjects = currentProjects.filter((p: any) => p.id !== projectId);
      
      // ユーザードキュメントを更新
      transaction.update(userRef, { projects: updatedProjects });
      
      // プロジェクトドキュメントを削除（オプション）
      // 実際の運用では、論理削除（ステータスフラグなど）を検討することも
      const projectRef = db.collection('projects').doc(projectId);
      transaction.delete(projectRef);
      
      // キャッシュを無効化
      invalidateCacheByPrefix(`user:${userId}`);
      
      return { success: true };
    });
  } catch (error: unknown) {
    console.error('プロジェクト削除エラー:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
} 

// アプリケーション起動時にキャッシュをクリアする
export function clearCacheOnStartup() {
  console.log("アプリケーション起動時のキャッシュクリア実行中...");
  clearCache();
}

// 自動実行
clearCacheOnStartup(); 