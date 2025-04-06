// ファイル: src/pages/api/update-project-info.ts
// プロジェクト情報更新API

import type { APIRoute } from 'astro';
import { updateProjectInfo } from '../../services/profileService';
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
    const { projectId, siteName, description } = body;
    
    if (!projectId || !siteName) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "必須パラメータが不足しています" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // プロジェクト情報を更新
    const success = await updateProjectInfo(projectId, user.uid, siteName, description);
    
    if (success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "プロジェクト情報を更新しました" 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "プロジェクト情報の更新に失敗しました" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('プロジェクト情報更新エラー:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "サーバーエラーが発生しました" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 