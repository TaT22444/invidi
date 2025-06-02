import { getFirebaseAdmin } from "../lib/firebase-admin";
import { updateStorageUsage } from "../services/planService";
import { checkStorageLimit } from "../middleware/planLimits";
import { invalidateCacheByPrefix } from "../utils/cache";

/**
 * 画像をアップロードし、ストレージ使用量を更新する共通関数（サーバーサイド用）
 * 
 * @param file アップロードするファイルのバッファまたはArrayBuffer
 * @param fileName ファイル名
 * @param contentType ファイルのMIMEタイプ
 * @param path 保存先のパス（例: projects/ABC123/banner）
 * @param projectId プロジェクトID
 * @param userId ユーザーID
 * @returns アップロードされた画像のURL
 */
export async function uploadImageAndTrackUsage(
  file: Buffer | ArrayBuffer,
  fileName: string,
  contentType: string,
  path: string,
  projectId: string,
  userId: string
): Promise<string> {
  try {
    // ファイルサイズをMBに変換
    const fileSize = file instanceof Buffer ? file.length : file.byteLength;
    const fileSizeMB = Math.ceil(fileSize / (1024 * 1024));
    
    console.log(`uploadImageAndTrackUsage: ファイル=${fileName}, サイズ=${fileSizeMB}MB, path=${path}`);
    
    // ストレージ制限をチェック
    await checkStorageLimit(userId, fileSize);
    
    // Firebase Storageへのアップロード
    const { storage } = getFirebaseAdmin();
    
    // バケットがない場合の代替処理（一時的な対応）
    let bucketName = "";
    try {
      // バケット名を取得しようとしてみる
      const bucket = storage.bucket();
      bucketName = bucket.name;
      
      // 安全なファイル名に変換
      const safeFileName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const filePath = `${path}/${safeFileName}`;
      
      // ファイルをアップロード
      const fileBuffer = file instanceof Buffer 
        ? file 
        : Buffer.from(new Uint8Array(file));
      const fileRef = bucket.file(filePath);
      
      await fileRef.save(fileBuffer, {
        metadata: {
          contentType: contentType
        }
      });
      
      // ファイルを公開
      await fileRef.makePublic();
      
      // 公開URLを取得
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      
      // ストレージ使用量を更新
      await updateStorageUsage(projectId, userId, fileSizeMB);
      
      console.log(`uploadImageAndTrackUsage: 成功 URL=${publicUrl}, ストレージ使用量+${fileSizeMB}MB`);
      
      // キャッシュ無効化
      invalidateCacheByPrefix(`user:${userId}:resourceUsage`);
      
      return publicUrl;
    } catch (error) {
      // バケットが設定されていない場合は、ダミーのURLを返す（開発・テスト環境用）
      if (error.code === 'storage/invalid-argument' || !bucketName) {
        console.warn("Firebase Storageバケットが設定されていません。ダミーURLを使用します。");
        
        // ダミーURLを返すが、ストレージ使用量は更新する
        const dummyUrl = `https://placeholder.dev/images/${path}/${fileName}?size=${fileSizeMB}`;
        
        // ストレージ使用量を更新
        await updateStorageUsage(projectId, userId, fileSizeMB);
        
        // キャッシュ無効化
        invalidateCacheByPrefix(`user:${userId}:resourceUsage`);
        
        return dummyUrl;
      }
      
      // その他のエラーは再スロー
      throw error;
    }
  } catch (error) {
    console.error(`uploadImageAndTrackUsage: 失敗:`, error);
    throw error;
  }
} 