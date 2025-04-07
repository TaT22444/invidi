import admin from 'firebase-admin';
import { getFirebaseAdmin } from '../lib/firebase-admin';

/**
 * 画像をFirebase Storageにアップロードする
 * @param file アップロードするファイル
 * @param projectId プロジェクトID
 * @param userId ユーザーID
 * @param folder 保存するフォルダ名 (例: 'blog', 'products')
 * @returns アップロードされた画像のURL
 */
export async function uploadImageToStorage(
  file: File | FormDataEntryValue,
  projectId: string,
  userId: string,
  folder: string
): Promise<string> {
  try {
    if (!file || !(file instanceof File)) {
      throw new Error('ファイルが選択されていないか、無効なファイル形式です');
    }

    // Firebase Admin SDKの初期化
    getFirebaseAdmin();
    const bucket = admin.storage().bucket();

    // ファイル名の作成 (現在時刻をミリ秒で使用してユニークにする)
    const timestamp = Date.now();
    const fileName = `${folder}/${projectId}/${userId}_${timestamp}_${file.name}`;

    // ファイルをBufferに変換
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ファイルをStorageにアップロード
    const fileRef = bucket.file(fileName);
    
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // 公開URLを取得
    await fileRef.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    throw error;
  }
} 