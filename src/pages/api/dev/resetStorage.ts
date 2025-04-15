// このファイルは開発環境でのみ使用すること
// 本番環境ではアクセスできないようにすること
export const prerender = false;

import { resetStorageUsage } from '../../../utils/debug';

export async function GET({ request }) {
  // 開発環境かどうかをチェック
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return new Response(JSON.stringify({ error: '開発環境でのみ使用可能です' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'userIdパラメータが必要です' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    await resetStorageUsage(userId);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'ストレージ使用量をリセットしました' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'ストレージ使用量のリセットに失敗しました',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 