// ファイル: src/services/analyticsService.ts
// アナリティクスデータ取得のサービスレイヤー

import { getFirebaseAdmin } from '../lib/firebase-admin';
import { getCachedData } from '../utils/cache';

// アナリティクスデータの型定義
export interface AnalyticsData {
  periodLabel: string;
  totalStats: {
    displayCount: number;
    clickCount: number;
    ctr: number;
  };
  chartData: {
    labels: string[];
    displayData: number[];
    clickData: number[];
    ctrData: number[];
  };
}

// 期間に応じたサンプルデータ生成
function generateSampleData(period: string): AnalyticsData {
  let labels: string[] = [];
  let displayData: number[] = [];
  let clickData: number[] = [];
  let periodLabel = '過去1週間';
  
  switch(period) {
    case '24h':
      labels = ['00時', '03時', '06時', '09時', '12時', '15時', '18時', '21時'];
      displayData = [45, 62, 80, 95, 120, 105, 90, 75];
      clickData = [12, 15, 25, 30, 40, 32, 28, 20];
      periodLabel = '過去24時間';
      break;
    case '1w':
      labels = generateDateLabels(7);
      displayData = [150, 250, 200, 300, 180, 320, 240];
      clickData = [20, 50, 30, 60, 40, 80, 60];
      periodLabel = '過去1週間';
      break;
    case '1m':
      labels = generateDateLabels(30);
      displayData = generateRandomData(31, 50, 200);
      clickData = displayData.map(d => Math.floor(d * Math.random() * 0.4));
      periodLabel = '過去1ヶ月';
      break;
    case '3m':
      labels = generateDateLabels(90);
      displayData = generateRandomData(91, 40, 180);
      clickData = displayData.map(d => Math.floor(d * Math.random() * 0.35));
      periodLabel = '過去3ヶ月';
      break;
    case '6m':
      labels = generateDateLabels(180);
      displayData = generateRandomData(181, 30, 200);
      clickData = displayData.map(d => Math.floor(d * Math.random() * 0.3));
      periodLabel = '過去6ヶ月';
      break;
    case '1y':
      labels = generateDateLabels(365);
      displayData = generateRandomData(366, 20, 220);
      clickData = displayData.map(d => Math.floor(d * Math.random() * 0.25));
      periodLabel = '過去12ヶ月';
      break;
    default:
      // デフォルトは1週間
      labels = generateDateLabels(7);
      displayData = [150, 250, 200, 300, 180, 320, 240];
      clickData = [20, 50, 30, 60, 40, 80, 60];
      periodLabel = '過去1週間';
  }
  
  // CTRデータを計算
  const ctrData = displayData.map((display, index) => 
    display > 0 ? Math.round((clickData[index] / display) * 100) : 0
  );
  
  // 合計値を計算
  const totalDisplayCount = displayData.reduce((sum, val) => sum + val, 0);
  const totalClickCount = clickData.reduce((sum, val) => sum + val, 0);
  const totalCtr = totalDisplayCount > 0 
    ? Math.round((totalClickCount / totalDisplayCount) * 100 * 10) / 10 
    : 0;
  
  return {
    periodLabel,
    totalStats: {
      displayCount: totalDisplayCount,
      clickCount: totalClickCount,
      ctr: totalCtr
    },
    chartData: {
      labels,
      displayData,
      clickData,
      ctrData
    }
  };
}

// 日付ラベル生成ユーティリティ
function generateDateLabels(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    dates.push(formattedDate);
  }
  
  return dates;
}

// ランダムデータ生成ユーティリティ
function generateRandomData(length: number, min: number, max: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * プロジェクトの統計データを取得
 * 現状はサンプルデータを返すが、将来的にはFirestoreから取得
 */
export async function getProjectStatistics(projectId: string, period: string = '1w'): Promise<AnalyticsData> {
  const { db } = getFirebaseAdmin();
  
  // キャッシュキーを設定
  const cacheKey = `analytics:${projectId}:${period}`;
  
  // キャッシュを利用してデータを取得（10分キャッシュ）
  return getCachedData(
    cacheKey,
    async () => {
      try {
        // Firestoreから統計データを取得（実装例）
        const totalStatsSnapshot = await db.collection("projects")
          .doc(projectId)
          .collection("statistics")
          .doc("total")
          .get();
        
        // データがあれば使用、なければサンプルデータを生成
        if (totalStatsSnapshot.exists) {
          // ここに実際のデータ取得ロジックを実装
          // 今回はサンプルデータで対応
          console.log("統計データはまだFirestoreから取得できないため、サンプルデータを使用します");
        }
        
        // 現状はサンプルデータを返す
        return generateSampleData(period);
      } catch (error) {
        console.error("統計データの取得に失敗:", error);
        // エラー時もサンプルデータで対応
        return generateSampleData(period);
      }
    },
    600 // 10分キャッシュ
  );
}

/**
 * プロジェクトの統計サマリーを取得
 */
export async function getProjectStatisticsSummary(projectId: string): Promise<{
  displayCount: number;
  clickCount: number;
  ctr: number;
}> {
  const { db } = getFirebaseAdmin();
  
  // キャッシュキーを設定
  const cacheKey = `analytics-summary:${projectId}`;
  
  // キャッシュを利用してデータを取得（30分キャッシュ）
  return getCachedData(
    cacheKey,
    async () => {
      try {
        // サマリーデータを取得
        const summarySnapshot = await db.collection("projects")
          .doc(projectId)
          .collection("statistics")
          .doc("total")
          .get();
        
        if (summarySnapshot.exists) {
          const data = summarySnapshot.data();
          if (data) {
            return {
              displayCount: data.displayCount || 0,
              clickCount: data.clickCount || 0,
              ctr: typeof data.ctr === 'function' ? data.ctr() : (data.ctr || 0)
            };
          }
        }
        
        // データがなければサンプルデータを返す
        return {
          displayCount: 15000,
          clickCount: 3000,
          ctr: 20.0
        };
      } catch (error) {
        console.error("統計サマリーの取得に失敗:", error);
        // エラー時はサンプルデータを返す
        return {
          displayCount: 15000,
          clickCount: 3000,
          ctr: 20.0
        };
      }
    },
    1800 // 30分キャッシュ
  );
} 