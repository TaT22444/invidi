export const prerender = false;

import { changeUserPlan } from "../../services/planService";
import { validateCSRFToken } from "../../utils/csrf";
import { getFirebaseAdmin } from "../../lib/firebase-admin";

// APIContextインターフェースを追加
interface APIContext {
  request: Request;
}

export async function POST({ request }: APIContext) {
  try {
    // FormDataを取得
    const formData = await request.formData();
    const csrfToken = formData.get("csrf_token")?.toString() || null;
    
    // Cookieからトークンを取得
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").filter(Boolean).map((c: string) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    
    // CSRFトークンの検証
    if (!validateCSRFToken(csrfToken, cookies.csrf_token)) {
      return new Response(null, {
        status: 303,
        headers: { Location: `/?csrf_error=true` }
      });
    }
    
    // 認証トークンからユーザーを取得
    const token = cookies["token"] || "";
    const { auth } = getFirebaseAdmin();
    let authUser = null;

    try {
      if (token) {
        authUser = await auth.verifyIdToken(token);
      }
    } catch (err) {
      console.error("IDトークンの検証に失敗しました", err);
    }

    if (!authUser?.uid) {
      return new Response(JSON.stringify({ error: "認証エラー" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // プラン変更の処理
    const newPlan = formData.get("plan")?.toString();
    
    if (!newPlan || (newPlan !== "free" && newPlan !== "pro")) {
      return new Response(JSON.stringify({ error: "無効なプラン種別です" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // プランの変更を実行
    await changeUserPlan(authUser.uid, newPlan as 'free' | 'pro');
    
    // 成功時はリダイレクト
    return new Response(null, {
      status: 303,
      headers: { Location: `/${authUser.uid}/plan?success=true` }
    });
  } catch (error: unknown) {
    console.error("プラン変更エラー:", error);
    
    return new Response(JSON.stringify({ error: "プラン変更に失敗しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 