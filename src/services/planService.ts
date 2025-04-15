import { getFirebaseAdmin } from "../lib/firebase-admin";
import { getCachedData, invalidateCacheByPrefix } from "../utils/cache";
import { debugLog } from "../utils/debug";

// プラン型を追加
type PlanType = 'free' | 'pro';

/**
 * プラン別の制限値定義
 */
export const PLAN_LIMITS = {
  free: {
    name: "Starter plan",
    price: "無料",
    priceMonthly: "0円",
    priceYearly: "0円",
    projects: 3,
    cmsItems: 2,
    pages: 2,
    storage: 40, // MB
    analytics: "過去1週間まで",
    customDomain: false,
    formSubmissions: 10,
    support: "コミュニティサポート"
  },
  pro: {
    name: "Pro plan",
    price: "Premium",
    priceMonthly: "2,480円",
    priceYearly: "24,800円",
    projects: 5,
    cmsItems: 5,
    pages: 10,
    storage: 2048, // MB (2GB)
    analytics: "過去1年まで",
    customDomain: true,
    formSubmissions: 100,
    support: "優先サポート"
  }
};

// ユーザーリソース使用のインターフェース定義
interface UserResourceUsage {
  storage: number;
  pages: number;
  cmsItems: number;
  formSubmissions: number;
  projectsCount: number;
}

// リソースタイプ定義
type ResourceType = 'storage' | 'projects' | 'cmsItems' | 'pages' | 'formSubmissions';

/**
 * ユーザーリソース使用状況を取得する関数
 */
export async function getUserResourceUsage(userId: string): Promise<UserResourceUsage> {
  const cacheKey = `user:${userId}:resourceUsage`;
  
  console.log(`getUserResourceUsage for userId=${userId}`);
  
  return getCachedData(
    cacheKey,
    async () => {
      const { db } = getFirebaseAdmin();
      
      try {
        console.log(`getUserResourceUsage(${userId}): キャッシュミス、データ取得を開始`);
        
        // ユーザー情報を取得
        const userDoc = await db.collection("users").doc(userId).get();
        const userData = userDoc.data();
        
        if (!userData) throw new Error("ユーザーデータが見つかりません");
        
        // ユーザーのプロジェクトを取得
        const projects = userData.projects || [];
        
        // 合計値の初期化
        let totalStorage = 0;
        let totalPages = 0;
        let totalCmsItems = 0;
        let totalFormSubmissions = 0;
        
        // 今月のフォーム送信数カウント用に年月文字列を取得
        const now = new Date();
        const yearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        
        console.log(`getUserResourceUsage(${userId}): プロジェクト数: ${projects.length}`);
        
        // プロジェクトのIDを出力（デバッグ用）
        for (const project of projects) {
          if (project.id) {
            console.log(`- Project ID: ${project.id}, Name: ${project.name || 'unknown'}`);
          }
        }
        
        // 各プロジェクトのデータを集計
        for (const project of projects) {
          if (!project.id) {
            console.log(`プロジェクトIDなし: ${JSON.stringify(project)}`);
            continue;
          }
          
          try {
            // プロジェクト詳細情報を取得
            const projectDoc = await db.collection("projects").doc(project.id).get();
            
            if (!projectDoc.exists) {
              console.warn(`プロジェクト ${project.id} が存在しません`);
              continue;
            }
            
            const projectData = projectDoc.data();
            
            if (projectData) {
              // ストレージ使用量をログ出力（デバッグ用）
              console.log(`プロジェクト ${project.id} (${projectData.name || 'no name'}): storageUsage=${projectData.storageUsage || 0}MB`);
              
              // ストレージ使用量を加算 (既にMB単位で保存されていると仮定)
              const storageValue = Number(projectData.storageUsage || 0);
              totalStorage += isNaN(storageValue) ? 0 : storageValue;
              
              // ページ数を加算
              try {
                const pagesSnapshot = await db.collection("projects").doc(project.id).collection("pages").get();
                totalPages += pagesSnapshot.size;
              } catch (err) {
                console.warn(`ページ取得エラー (${project.id}):`, err);
              }
              
              // CMS項目数を加算
              try {
                const blogSnapshot = await db.collection("projects").doc(project.id).collection("blog").get();
                const noticeSnapshot = await db.collection("projects").doc(project.id).collection("notice").get();
                totalCmsItems += (blogSnapshot.size + noticeSnapshot.size);
              } catch (err) {
                console.warn(`CMS取得エラー (${project.id}):`, err);
              }
              
              // 今月のフォーム送信数を加算
              try {
                const metricsDoc = await db.collection("projects").doc(project.id).collection("metrics").doc(yearMonth).get();
                if (metricsDoc.exists) {
                  totalFormSubmissions += (metricsDoc.data()?.formSubmissions || 0);
                }
              } catch (err) {
                console.warn(`フォーム送信数取得エラー (${project.id}):`, err);
              }
            }
          } catch (error) {
            console.error(`プロジェクト ${project.id} のデータ取得エラー:`, error);
          }
        }
        
        // 最終的なストレージ使用量（MB単位）
        const storageMB = Math.max(0, Math.round(totalStorage));
        
        console.log(`getUserResourceUsage(${userId}) 集計結果:`, {
          storage: storageMB,
          pages: totalPages,
          cmsItems: totalCmsItems,
          formSubmissions: totalFormSubmissions,
          projectsCount: projects.length
        });
        
        return {
          storage: storageMB,
          pages: totalPages,
          cmsItems: totalCmsItems,
          formSubmissions: totalFormSubmissions,
          projectsCount: projects.length
        };
      } catch (error) {
        console.error("ユーザーリソース使用量の取得に失敗:", error);
        
        // エラー時はデフォルト値を返す
        return {
          storage: 0,
          pages: 0,
          cmsItems: 0,
          formSubmissions: 0,
          projectsCount: 0
        };
      }
    },
    10 // 10秒間キャッシュ（デバッグ向けに短く設定）
  );
}

/**
 * プラン変更を処理する関数
 */
export async function changeUserPlan(userId: string, newPlan: PlanType) {
  if (newPlan !== 'free' && newPlan !== 'pro') {
    throw new Error('無効なプラン種別です');
  }
  
  const { db } = getFirebaseAdmin();
  
  try {
    // トランザクションで処理
    return await db.runTransaction(async (transaction) => {
      // すべての読み取りを先に行う
      
      // ユーザードキュメントを取得
      const userRef = db.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists) {
        throw new Error('ユーザーデータが見つかりません');
      }
      
      const userData = userDoc.data();
      
      // ユーザーのプロジェクトを取得
      const projects = userData?.projects || [];
      
      // すべてのプロジェクトドキュメントを先に読み取る
      const projectDocs = [];
      for (const project of projects) {
        if (!project.id) continue;
        
        const projectRef = db.collection('projects').doc(project.id);
        const projectDoc = await transaction.get(projectRef);
        if (projectDoc.exists) {
          projectDocs.push({
            ref: projectRef,
            doc: projectDoc
          });
        }
      }
      
      // 読み取りが完了したら、ここから書き込みを開始
      
      // ユーザーのプラン情報を更新
      transaction.update(userRef, {
        plan: newPlan,
        planUpdatedAt: new Date()
      });
      
      // 各プロジェクトのプラン情報も更新
      for (const { ref } of projectDocs) {
        transaction.update(ref, {
          plan: newPlan,
          planUpdatedAt: new Date(),
          maxFollowers: newPlan === 'free' ? 100 : 1000,
          maxPages: newPlan === 'free' ? 3 : 10
        });
      }
      
      return {
        success: true,
        plan: newPlan
      };
    });
  } catch (error) {
    console.error('プラン変更に失敗:', error);
    throw error;
  } finally {
    // トランザクションの結果に関わらず、関連するキャッシュを無効化
    invalidateCacheByPrefix(`user:${userId}`);
  }
}

/**
 * リソース制限をチェックする関数
 */
export async function checkResourceLimit(
  userId: string, 
  resource: ResourceType, 
  additionalAmount: number = 1
) {
  const { db } = getFirebaseAdmin();
  
  try {
    // ユーザー情報を取得
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (!userData) throw new Error('ユーザーデータが見つかりません');
    
    const planName = (userData.plan || 'free') as PlanType;
    const planLimits = PLAN_LIMITS[planName];
    
    // 現在の使用状況を取得
    const usage = await getUserResourceUsage(userId);
    
    // 追加後の使用量を計算
    let currentAmount = 0;
    if (resource === 'projects') {
      currentAmount = usage.projectsCount;
    } else if (resource === 'storage') {
      // ストレージの場合はMB単位で計算
      currentAmount = usage.storage;
    } else {
      currentAmount = usage[resource];
    }
    
    const newAmount = currentAmount + additionalAmount;
    
    // 制限を超えるかチェック
    if (newAmount > planLimits[resource]) {
      return {
        allowed: false,
        current: currentAmount,
        limit: planLimits[resource],
        needUpgrade: true
      };
    }
    
    return {
      allowed: true,
      current: currentAmount,
      limit: planLimits[resource],
      needUpgrade: false
    };
  } catch (error) {
    console.error('リソース制限チェックに失敗:', error);
    throw error;
  }
}

/**
 * ストレージ使用量を更新する関数
 */
export async function updateStorageUsage(projectId: string, userId: string, sizeInMB: number) {
  const { db } = getFirebaseAdmin();
  
  try {
    console.log(`updateStorageUsage: projectId=${projectId}, userId=${userId}, size=${sizeInMB}MB`);
    
    const projectRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectRef.get();
    
    if (!projectDoc.exists) {
      throw new Error('プロジェクトが見つかりません');
    }
    
    const currentUsage = Number(projectDoc.data()?.storageUsage || 0);
    const newUsage = currentUsage + sizeInMB;
    
    console.log(`ストレージ使用量: ${currentUsage}MB → ${newUsage}MB (+${sizeInMB}MB)`);
    
    // プロジェクトのストレージ使用量を更新
    await projectRef.update({
      storageUsage: newUsage,
      updatedAt: new Date()
    });
    
    // 関連するキャッシュを無効化
    invalidateCacheByPrefix(`project:${projectId}`);
    invalidateCacheByPrefix(`user:${userId}:resourceUsage`);
    
    return {
      success: true,
      updatedUsage: newUsage
    };
  } catch (error) {
    console.error('ストレージ使用量の更新に失敗:', error);
    throw error;
  }
}

/**
 * フォーム送信をカウントする関数
 */
export async function recordFormSubmission(projectId: string, userId: string) {
  const { db } = getFirebaseAdmin();
  
  try {
    // ユーザープランの取得
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) throw new Error('ユーザーが見つかりません');
    
    const planName = (userDoc.data()?.plan || 'free') as PlanType;
    const planLimits = PLAN_LIMITS[planName];
    
    // 現在の年月を取得（カウンター用）
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // 現在の月のカウンターリファレンス
    const counterRef = db.collection('projects').doc(projectId).collection('metrics').doc(yearMonth);
    
    // トランザクションで安全に更新
    return await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      const currentCount = counterDoc.exists ? counterDoc.data()?.formSubmissions || 0 : 0;
      
      if (currentCount >= planLimits.formSubmissions) {
        throw new Error('今月のフォーム送信数の上限に達しました');
      }
      
      // カウンターを更新または作成
      if (counterDoc.exists) {
        transaction.update(counterRef, { 
          formSubmissions: currentCount + 1,
          lastSubmittedAt: new Date()
        });
      } else {
        transaction.set(counterRef, { 
          formSubmissions: 1,
          createdAt: new Date(),
          lastSubmittedAt: new Date()
        });
      }
      
      // 関連するキャッシュを無効化
      invalidateCacheByPrefix(`user:${userId}:resourceUsage`);
      
      return {
        success: true,
        newCount: currentCount + 1,
        limit: planLimits.formSubmissions
      };
    });
  } catch (error) {
    console.error('フォーム送信のカウントに失敗:', error);
    throw error;
  }
} 