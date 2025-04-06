// ファイル: src/pages/api/remove-sns.ts
// SNSリンク削除処理API

import type { APIRoute } from 'astro';
import { removeSnsLink } from '../../services/profileService';
import { getUserFromRequest } from '../../services/authService';

export const POST: APIRoute = async ({ request }) => {
  try {
    // ユーザー認証
    const { user, error } = await getUserFromRequest(request);
    
    if (error || !user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "認証に失敗しました" 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // リクエストボディを解析
    const body = await request.json();
    const { projectId, snsIndex } = body;
    
    if (!projectId || snsIndex === undefined) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "必須パラメータが不足しています" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // SNSリンクを削除
    const success = await removeSnsLink(projectId, parseInt(snsIndex));
    
    if (success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "SNSリンクを削除しました" 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "SNSリンクの削除に失敗しました" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('SNSリンク削除エラー:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "サーバーエラーが発生しました" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 