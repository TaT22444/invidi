// プロジェクト概要ページのデータ取得を担当するサービス
import { getFirebaseAdmin } from '../lib/firebase-admin';
import { getCachedData } from '../utils/cache';

export interface ProjectStats {
  totalVisits: number;
  visitsData: {
    labels: string[];
    data: number[];
  };
  totalSales: number;
  salesData: {
    labels: string[];
    data: number[];
  };
}

/**
 * プロジェクトの統計情報を取得する
 */
export async function getProjectStats(projectId: string): Promise<ProjectStats> {
  const cacheKey = `projectStats:${projectId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      // ここで実際のFirestoreデータ取得ロジックを実装できます
      // サンプルデータを返します
      
      // 訪問数データ - 過去7日間
      const today = new Date();
      const pvLabels = Array(7).fill(0).map((_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });
      
      // ランダムな訪問数データを生成（10〜50）
      const pvDatas = Array(7).fill(0).map(() => Math.floor(Math.random() * 40 + 10));
      const totalVisits = pvDatas.reduce((acc, val) => acc + val, 0);
      
      // 売上データ - 同じ日付ラベルを使用
      const ecLabels = [...pvLabels]; 
      
      // ランダムな売上データを生成（1,000〜5,000）
      const ecSalesData = Array(7).fill(0).map(() => Math.floor(Math.random() * 4000 + 1000));
      const totalSales = ecSalesData.reduce((acc, val) => acc + val, 0);
      
      console.log("サンプルデータ生成:", { 
        pvLabels, pvDatas, totalVisits,
        ecLabels, ecSalesData, totalSales
      });
      
      return {
        totalVisits,
        visitsData: {
          labels: pvLabels,
          data: pvDatas,
        },
        totalSales,
        salesData: {
          labels: ecLabels,
          data: ecSalesData,
        }
      };
    },
    300 // 5分間キャッシュ
  );
}

/**
 * プロジェクトのプラン情報を取得する
 */
export async function getProjectPlan(projectId: string) {
  const cacheKey = `projectPlan:${projectId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      // サンプルのプランデータを返します
      return {
        price: "無料",
        dataUsage: {
          current: 12,
          max: 40
        },
        cms: {
          current: 1,
          max: 1
        },
        analytics: "過去1週間まで"
      };
    },
    600 // 10分間キャッシュ
  );
}

/**
 * プロジェクトのフォロワー数を取得する
 */
export async function getProjectFollowers(projectId: string): Promise<number> {
  const cacheKey = `projectFollowers:${projectId}`;
  
  return await getCachedData(
    cacheKey,
    async () => {
      // ランダムなフォロワー数を生成（100〜500）
      return Math.floor(Math.random() * 400 + 100);
    },
    300 // 5分間キャッシュ
  );
} 