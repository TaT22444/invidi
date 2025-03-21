import type { APIRoute } from 'astro';
import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';

// Firebase 初期化（環境変数の設定）
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.firestore();
const bucket = getStorage().bucket();

export const POST: APIRoute = async ({ request }) => {
  try {
    // FormDataの解析
    const formData = await request.formData();
    
    // アクション種別の取得
    const action = formData.get('action') as string;
    
    // 画像アップロード処理
    if (action === 'upload_image') {
      const projectId = formData.get('projectId') as string;
      const blogImage = formData.get('blogImage') as File;
      
      if (!projectId) {
        return new Response(
          JSON.stringify({ success: false, message: 'プロジェクトIDが指定されていません' }),
          { status: 400 }
        );
      }
      
      if (!blogImage || blogImage.size === 0) {
        return new Response(
          JSON.stringify({ success: false, message: '画像ファイルが指定されていません' }),
          { status: 400 }
        );
      }
      
      // 一時ファイルとして保存
      const buffer = Buffer.from(await blogImage.arrayBuffer());
      const tempFilePath = `/tmp/${blogImage.name}`;
      fs.writeFileSync(tempFilePath, buffer);
      
      // Firebaseストレージにアップロード
      const destination = `projects/${projectId}/blog/images/${Date.now()}_${blogImage.name}`;
      await bucket.upload(tempFilePath, {
        destination,
        metadata: {
          contentType: blogImage.type,
        },
      });
      
      // 公開URLを取得
      const [file] = await bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '01-01-2100',
      });
      
      // 一時ファイルを削除
      fs.unlinkSync(tempFilePath);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: '画像がアップロードされました',
          imageUrl: file,
        }),
        { status: 200 }
      );
    }
    
    // ブログデータの保存処理（既存のコード）
    // ブログデータの取得
    const title = formData.get('blogTitle') as string;
    const body = formData.get('blogBody') as string;
    const submitType = formData.get('submitType') as string;
    const isPublished = submitType === 'publish';
    
    // タグの処理
    const tags = formData.getAll('blogTags') as string[];
    
    // サムネイル画像の処理
    let thumbnailUrl = '';
    const thumbnailFile = formData.get('blogThumbnail') as File;
    
    if (thumbnailFile && thumbnailFile.size > 0) {
      // 一時ファイルとして保存
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const tempFilePath = `/tmp/${thumbnailFile.name}`;
      fs.writeFileSync(tempFilePath, buffer);
      
      // Firebaseストレージにアップロード
      const destination = `blog-thumbnails/${Date.now()}_${thumbnailFile.name}`;
      await bucket.upload(tempFilePath, {
        destination,
        metadata: {
          contentType: thumbnailFile.type,
        },
      });
      
      // 公開URLを取得
      const [file] = await bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '01-01-2100',
      });
      
      thumbnailUrl = file;
      
      // 一時ファイルを削除
      fs.unlinkSync(tempFilePath);
    }
    
    // Firestoreにブログデータを保存
    const blogData = {
      title,
      body,
      tags,
      thumbnailUrl,
      isPublished,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    const blogRef = await db.collection('blogs').add(blogData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'ブログが保存されました',
        id: blogRef.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('ブログ保存エラー:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'ブログの保存に失敗しました',
        error: error.message,
      }),
      { status: 500 }
    );
  }
}; 