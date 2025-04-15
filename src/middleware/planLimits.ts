import { checkResourceLimit } from "../services/planService";
import { getFirebaseAdmin } from "../lib/firebase-admin";

/**
 * ファイルアップロード前にストレージ制限をチェックする
 */
export async function checkStorageLimit(userId: string, fileSize: number) {
  // バイトをMBに変換
  const fileSizeMB = fileSize / (1024 * 1024);
  
  // リソース制限をチェック
  const checkResult = await checkResourceLimit(userId, 'storage', fileSizeMB);
  
  if (!checkResult.allowed) {
    throw new Error(`ストレージ容量の上限に達しています。プランをアップグレードすると、より多くのストレージを利用できます。（現在: ${checkResult.current}MB / 上限: ${checkResult.limit}MB）`);
  }
  
  return checkResult;
}

/**
 * プロジェクト作成前に制限をチェックする
 */
export async function checkProjectLimit(userId: string) {
  const checkResult = await checkResourceLimit(userId, 'projects');
  
  if (!checkResult.allowed) {
    throw new Error(`プロジェクト数の上限に達しています。プランをアップグレードすると、より多くのプロジェクトを作成できます。（現在: ${checkResult.current} / 上限: ${checkResult.limit}）`);
  }
  
  return checkResult;
}

/**
 * CMS項目追加前に制限をチェックする
 */
export async function checkCmsItemLimit(userId: string) {
  const checkResult = await checkResourceLimit(userId, 'cmsItems');
  
  if (!checkResult.allowed) {
    throw new Error(`CMS項目数の上限に達しています。プランをアップグレードすると、より多くのCMS項目を追加できます。（現在: ${checkResult.current} / 上限: ${checkResult.limit}）`);
  }
  
  return checkResult;
}

/**
 * ページ追加前に制限をチェックする
 */
export async function checkPageLimit(userId: string) {
  const checkResult = await checkResourceLimit(userId, 'pages');
  
  if (!checkResult.allowed) {
    throw new Error(`ページ数の上限に達しています。プランをアップグレードすると、より多くのページを作成できます。（現在: ${checkResult.current} / 上限: ${checkResult.limit}）`);
  }
  
  return checkResult;
}

/**
 * カスタムドメイン設定前にプランをチェックする
 */
export async function checkCustomDomainAllowed(userId: string) {
  const { db } = getFirebaseAdmin();
  
  // ユーザープランの取得
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) throw new Error('ユーザーが見つかりません');
  
  const planName = userDoc.data()?.plan || 'free';
  
  if (planName === 'free') {
    throw new Error('カスタムドメインの設定にはProプランへのアップグレードが必要です');
  }
  
  return true;
} 