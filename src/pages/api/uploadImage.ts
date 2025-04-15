export const prerender = false;

import { getUserFromRequest } from "../../services/authService";
import { uploadImageAndTrackUsage } from "../../utils/uploadHelper";

// APIContextインターフェースを追加
interface APIContext {
  request: Request;
}

export async function POST({ request }: APIContext) {
  try {
    // ユーザーを認証
    const { user, error } = await getUserFromRequest(request);
    
    if (error || !user) {
      return new Response(JSON.stringify({ error: "認証エラー" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // FormDataを解析
    const formData = await request.formData();
    const projectId = formData.get("projectId")?.toString();
    const imageFile = formData.get("image") as File;
    
    if (!projectId || !imageFile || !(imageFile instanceof File)) {
      return new Response(JSON.stringify({ error: "必要なパラメータが不足しています" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 共通アップロード関数を使用
    try {
      const url = await uploadImageAndTrackUsage(
        await imageFile.arrayBuffer(),
        imageFile.name,
        imageFile.type,
        `projects/${projectId}/images`,
        projectId,
        user.uid
      );
      
      return new Response(JSON.stringify({ 
        success: true, 
        url 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "ファイルのアップロードに失敗しました";
      return new Response(JSON.stringify({ 
        error: errorMessage 
      }), {
        status: error.statusCode || 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    
    return new Response(JSON.stringify({ error: "ファイルのアップロードに失敗しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 