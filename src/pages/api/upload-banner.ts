// ファイル: src/pages/api/upload-banner.ts
// バナー画像アップロード処理API

import type { APIRoute } from 'astro';
import { updateBannerImage } from '../../services/profileService';
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
    
    // formDataを解析
    const formData = await request.formData();
    const projectId = formData.get('projectId')?.toString();
    const file = formData.get('banner') as File;
    
    if (!projectId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "プロジェクトIDが指定されていません" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "ファイルが指定されていません" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // ファイルのバリデーション
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "画像ファイルを選択してください" 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // バナー画像をアップロード
    const url = await updateBannerImage(projectId, user.uid, file);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        url 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('バナーアップロードエラー:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "サーバーエラーが発生しました" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 