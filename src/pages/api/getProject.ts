import type { APIRoute } from 'astro';
import admin from "firebase-admin";

// Firebase Admin SDK の初期化（初回のみ実施）
if (!admin.apps.length) {
  const serviceAccountStr =
    process.env.FIREBASE_SERVICE_ACCOUNT || import.meta.env.FIREBASE_SERVICE_ACCOUNT;
  const serviceAccount = JSON.parse(serviceAccountStr!);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const projectId = url.searchParams.get('projectId');
  
  if (!projectId) {
    return new Response(JSON.stringify({ error: 'プロジェクトIDが指定されていません' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const projectSnap = await db.collection("projects").doc(projectId).get();
    
    if (!projectSnap.exists) {
      return new Response(JSON.stringify({ error: 'プロジェクトが見つかりません' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const projectData = projectSnap.data();
    
    return new Response(JSON.stringify(projectData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('プロジェクト取得エラー:', error);
    return new Response(JSON.stringify({ error: 'プロジェクト情報の取得に失敗しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 