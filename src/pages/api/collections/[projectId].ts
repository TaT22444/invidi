import type { APIRoute } from 'astro';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from '../../../lib/firebase-admin';

export const get: APIRoute = async ({ params }) => {
  try {
    const { projectId } = params;
    if (!projectId) {
      return new Response(JSON.stringify({ error: 'Project ID is required' }), {
        status: 400,
      });
    }

    // Firebase Adminを初期化
    await initializeFirebaseAdmin();
    const db = getFirestore();

    // プロジェクトのコレクション一覧を取得
    const projectRef = db.collection('projects').doc(projectId);
    const collections = await projectRef.listCollections();
    
    // コレクション名の配列を作成
    const collectionNames = collections.map(col => col.id);

    return new Response(JSON.stringify({
      collections: collectionNames
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('コレクション情報の取得エラー:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}; 