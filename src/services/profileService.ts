// ファイル: src/services/profileService.ts
// プロフィール関連の処理を集約したサービスレイヤー

import { getFirebaseAdmin } from '../lib/firebase-admin';
import { invalidateCache, invalidateCacheByPrefix } from '../utils/cache';
import { getStorage } from 'firebase-admin/storage';
import type { UserRecord } from 'firebase-admin/auth';

/**
 * SNSリンクのインターフェース
 */
export interface SnsLink {
  type: string;
  name: string;
  description?: string;
}

/**
 * バナー画像をアップロードし、プロジェクト情報を更新する
 */
export async function updateBannerImage(projectId: string, userId: string, file: File): Promise<string> {
  const { db } = getFirebaseAdmin();
  
  try {
    // Fileオブジェクトからバッファを取得
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Storage参照を取得
    const bucket = getStorage().bucket();
    const filePath = `projects/${projectId}/banner_${Date.now()}_${file.name}`;
    const fileRef = bucket.file(filePath);
    
    // ファイルをアップロード
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });
    
    // 公開URLを取得
    await fileRef.makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    
    // Firestoreのプロジェクトデータを更新
    await db.collection("projects").doc(projectId).update({
      bannerUrl: url,
      updatedAt: new Date(),
    });
    
    // ユーザーのプロジェクト一覧も更新
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData && userData.projects) {
        const updatedProjects = userData.projects.map((p: any) => {
          if (p.id === projectId) {
            return { ...p, bannerUrl: url };
          }
          return p;
        });
        
        await db.collection("users").doc(userId).update({
          projects: updatedProjects
        });
      }
    }
    
    // 関連するキャッシュを削除
    invalidateCacheByPrefix(`project:${projectId}`);
    
    return url;
  } catch (error) {
    console.error("バナー画像アップロードエラー:", error);
    throw new Error("バナー画像のアップロードに失敗しました");
  }
}

/**
 * プロフィール画像をアップロードし、プロジェクト情報を更新する
 */
export async function updateProfileImage(projectId: string, userId: string, file: File): Promise<string> {
  const { db } = getFirebaseAdmin();
  
  try {
    // Fileオブジェクトからバッファを取得
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Storage参照を取得
    const bucket = getStorage().bucket();
    const filePath = `projects/${projectId}/profile_${Date.now()}_${file.name}`;
    const fileRef = bucket.file(filePath);
    
    // ファイルをアップロード
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });
    
    // 公開URLを取得
    await fileRef.makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    
    // Firestoreのプロジェクトデータを更新
    await db.collection("projects").doc(projectId).update({
      profileImageUrl: url,
      updatedAt: new Date(),
    });
    
    // ユーザーのプロジェクト一覧も更新
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData && userData.projects) {
        const updatedProjects = userData.projects.map((p: any) => {
          if (p.id === projectId) {
            return { ...p, profileImageUrl: url };
          }
          return p;
        });
        
        await db.collection("users").doc(userId).update({
          projects: updatedProjects
        });
      }
    }
    
    // 関連するキャッシュを削除
    invalidateCacheByPrefix(`project:${projectId}`);
    
    return url;
  } catch (error) {
    console.error("プロフィール画像アップロードエラー:", error);
    throw new Error("プロフィール画像のアップロードに失敗しました");
  }
}

/**
 * SNSリンクを追加する
 */
export async function addSnsLink(
  projectId: string,
  snsType: string,
  snsName: string,
  snsDescription?: string
): Promise<boolean> {
  const { db } = getFirebaseAdmin();
  
  try {
    const projectRef = db.collection("projects").doc(projectId);
    const projectSnap = await projectRef.get();
    
    if (!projectSnap.exists) {
      return false;
    }
    
    const projectData = projectSnap.data();
    if (!projectData) {
      return false;
    }
    
    const snsLinks = projectData.snsLinks || [];
    
    // 重複チェック
    const isDuplicate = snsLinks.some((link: any) => 
      link.type === snsType && link.name === snsName
    );
    
    if (isDuplicate) {
      throw new Error('同じタイプと名前のSNSリンクが既に存在します');
    }
    
    // 新しいSNSリンクを追加
    const newSnsLink = {
      type: snsType,
      name: snsName,
      description: snsDescription || '',
      addedAt: new Date()
    };
    
    snsLinks.push(newSnsLink);
    
    await projectRef.update({
      snsLinks: snsLinks,
      updatedAt: new Date()
    });
    
    // 関連するキャッシュを削除
    invalidateCacheByPrefix(`project:${projectId}`);
    
    return true;
  } catch (error) {
    console.error("SNSリンク追加エラー:", error);
    throw error;
  }
}

/**
 * SNSリンクを削除する
 */
export async function removeSnsLink(projectId: string, snsIndex: number): Promise<boolean> {
  const { db } = getFirebaseAdmin();
  
  try {
    const projectRef = db.collection("projects").doc(projectId);
    const projectSnap = await projectRef.get();
    
    if (!projectSnap.exists) {
      return false;
    }
    
    const projectData = projectSnap.data();
    if (!projectData) {
      return false;
    }
    
    const snsLinks = projectData.snsLinks || [];
    
    // 指定されたインデックスが範囲内かチェック
    if (snsIndex < 0 || snsIndex >= snsLinks.length) {
      return false;
    }
    
    // 指定されたインデックスのSNSリンクを削除
    snsLinks.splice(snsIndex, 1);
    
    await projectRef.update({
      snsLinks: snsLinks,
      updatedAt: new Date()
    });
    
    // 関連するキャッシュを削除
    invalidateCacheByPrefix(`project:${projectId}`);
    
    return true;
  } catch (error) {
    console.error("SNSリンク削除エラー:", error);
    throw error;
  }
}

/**
 * プロジェクト情報を更新する
 */
export async function updateProjectInfo(
  projectId: string,
  userId: string,
  siteName: string,
  description: string
): Promise<boolean> {
  const { db } = getFirebaseAdmin();
  
  try {
    const projectRef = db.collection("projects").doc(projectId);
    
    // Firestoreのプロジェクトデータを更新
    await projectRef.update({
      siteName: siteName,
      description: description,
      updatedAt: new Date()
    });
    
    // ユーザーのプロジェクト一覧も更新
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData && userData.projects) {
        const updatedProjects = userData.projects.map((p: any) => {
          if (p.id === projectId) {
            return { 
              ...p, 
              siteName: siteName,
              description: description
            };
          }
          return p;
        });
        
        await db.collection("users").doc(userId).update({
          projects: updatedProjects
        });
      }
    }
    
    // 関連するキャッシュを削除
    invalidateCacheByPrefix(`project:${projectId}`);
    
    return true;
  } catch (error) {
    console.error("プロジェクト情報更新エラー:", error);
    throw error;
  }
} 