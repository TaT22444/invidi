/**
 * オブジェクトを整形してコンソールに出力する関数
 */
export function debugLog(title: string, data: any) {
  console.log(`===== ${title} =====`);
  console.dir(data, { depth: null, colors: true });
  console.log(`===== END ${title} =====`);
}

/**
 * プロジェクトのストレージ使用量を設定する (デバッグ/テスト用)
 */
export async function setProjectStorage(projectId: string, storageValue: number) {
  try {
    const { db } = (await import('../lib/firebase-admin')).getFirebaseAdmin();
    
    // プロジェクト情報を更新
    await db.collection('projects').doc(projectId).update({
      storageUsage: storageValue,
      updatedAt: new Date()
    });
    
    console.log(`プロジェクト ${projectId} のストレージ使用量を ${storageValue}MB に設定しました`);
    return true;
  } catch (error) {
    console.error(`プロジェクト ${projectId} のストレージ使用量設定に失敗:`, error);
    return false;
  }
}

/**
 * Firestoreデータの読み込みを確認するヘルパー関数
 */
export async function checkFirestoreData(userId: string) {
  try {
    const { db } = (await import('../lib/firebase-admin')).getFirebaseAdmin();
    
    // ユーザーデータを取得
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      console.error(`ユーザーID ${userId} のデータが見つかりません`);
      return;
    }
    
    const userData = userDoc.data();
    
    debugLog('ユーザーデータ', {
      id: userId,
      plan: userData?.plan || 'plan not found',
      projectCount: (userData?.projects || []).length,
      email: userData?.email || 'none'
    });
    
    // プロジェクトの確認
    const projects = userData?.projects || [];
    
    for (const project of projects) {
      if (!project.id) continue;
      
      const projectDoc = await db.collection('projects').doc(project.id).get();
      
      if (!projectDoc.exists) {
        console.log(`プロジェクト ${project.id} が存在しません`);
        continue;
      }
      
      const projectData = projectDoc.data();
      
      debugLog(`プロジェクト ${project.id}`, {
        name: projectData?.name || 'name not found',
        storageUsage: projectData?.storageUsage || 0,
        plan: projectData?.plan || 'plan not found',
        // 他の必要なフィールド
      });
    }
  } catch (error) {
    console.error('Firestoreデータ確認エラー:', error);
  }
}

/**
 * 開発環境用のテストストレージ使用量を設定する関数
 */
export async function setTestStorageUsage(userId: string) {
  try {
    const { db } = (await import('../lib/firebase-admin')).getFirebaseAdmin();
    
    // ユーザーのプロジェクト一覧を取得
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.error('ユーザーが見つかりません');
      return false;
    }
    
    const projects = userDoc.data()?.projects || [];
    console.log(`${projects.length}個のプロジェクトにテストストレージ使用量を設定します`);
    
    // 各プロジェクトにサンプルのストレージ使用量を設定
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      if (!project.id) continue;
      
      // プロジェクトごとに異なる値を設定
      const storageValue = (i + 1) * 10; // 10MB, 20MB, 30MB, ...
      
      await db.collection('projects').doc(project.id).update({
        storageUsage: storageValue,
        updatedAt: new Date()
      });
      
      console.log(`プロジェクト ${project.id} (${project.name || 'unknown'}) のストレージ使用量を ${storageValue}MB に設定しました`);
    }
    
    // キャッシュを無効化
    const { invalidateCacheByPrefix } = await import('../utils/cache');
    invalidateCacheByPrefix(`user:${userId}`);
    
    console.log('テストストレージ使用量の設定が完了しました');
    return true;
  } catch (error) {
    console.error('テストストレージ使用量の設定に失敗:', error);
    return false;
  }
}

/**
 * ストレージ使用量をリセットする関数
 */
export async function resetStorageUsage(userId: string) {
  try {
    const { db } = (await import('../lib/firebase-admin')).getFirebaseAdmin();
    
    // ユーザーのプロジェクト一覧を取得
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.error('ユーザーが見つかりません');
      return false;
    }
    
    const projects = userDoc.data()?.projects || [];
    console.log(`${projects.length}個のプロジェクトのストレージ使用量をリセットします`);
    
    // 各プロジェクトのストレージ使用量を0にリセット
    for (const project of projects) {
      if (!project.id) continue;
      
      await db.collection('projects').doc(project.id).update({
        storageUsage: 0,
        updatedAt: new Date()
      });
      
      console.log(`プロジェクト ${project.id} (${project.name || 'unknown'}) のストレージ使用量を0MBにリセットしました`);
    }
    
    // キャッシュを無効化
    const { invalidateCacheByPrefix } = await import('../utils/cache');
    invalidateCacheByPrefix(`user:${userId}`);
    
    console.log('ストレージ使用量のリセットが完了しました');
    return true;
  } catch (error) {
    console.error('ストレージ使用量のリセットに失敗:', error);
    return false;
  }
} 