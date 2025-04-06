// ファイル: src/pages/api/add-sns.ts
// SNSリンク追加処理API

import type { APIRoute } from 'astro';
import { addSnsLink } from '../../services/profileService';
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
    const { projectId, snsType, snsName, snsDescription } = body;
    
    if (!projectId || !snsType || !snsName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "必須パラメータが不足しています" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // SNSリンクを追加
    const success = await addSnsLink(projectId, snsType, snsName, snsDescription);
    
    if (success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "SNSリンクを追加しました" 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "SNSリンクの追加に失敗しました" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('SNSリンク追加エラー:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "サーバーエラーが発生しました" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 