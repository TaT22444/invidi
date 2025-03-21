/** ここがサーバーサイドのAPIエンドポイント。 **/
export const prerender = false; // ★ これで静的ではなくサーバーサイドで動作

import admin from "firebase-admin";

// Admin SDK の初期化（重複を避けるため、すでに初期化済みでなければ行う）
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/**
 * Astro のエンドポイント用関数
 * @param {Request} request - Astroリクエスト
 */
export async function POST({ request }: { request: Request }) {
  try {
    // JSON 本文を読み取る
    const body = await request.json();
    const { name, description, projectId, allTags } = body;

    // projectIdが提供されている場合は直接プロジェクトドキュメントを更新
    if (projectId && allTags) {
      // プロジェクトドキュメントの参照を取得
      const projectRef = db.collection("projects").doc(projectId);
      const projectSnap = await projectRef.get();

      if (!projectSnap.exists) {
        return new Response(JSON.stringify({ error: "プロジェクトが見つかりません。" }), {
          status: 404,
        });
      }

      // allTagsフィールドのみを更新
      await projectRef.update({ allTags });

      return new Response(JSON.stringify({ 
        message: "プロジェクトタグの更新に成功しました！",
        updatedTags: allTags 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // 従来の名前と説明による更新（既存の機能を維持）
    if (name) {
      // 実際には、Cookie などからログイン済みユーザーIDを取得するイメージ
      // ここでは例として "exampleUserId" としておく
      const userId = "exampleUserId"; 
      
      const userRef = db.collection("users").doc(userId);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        return new Response(JSON.stringify({ error: "ユーザーが見つかりません。" }), {
          status: 404,
        });
      }

      // usersコレクション内のprojects配列を更新する例
      const userData = userSnap.data();
      const currentProjects = userData.projects || [];

      // 「name」が一致するプロジェクトを探して description を更新する、といったイメージ
      const updatedProjects = currentProjects.map((proj: any) => {
        if (proj.name === name) {
          return { ...proj, description };
        }
        return proj;
      });

      // 更新を反映
      await userRef.update({ projects: updatedProjects });

      // 成功レスポンス
      return new Response(JSON.stringify({ message: "プロジェクトの更新に成功しました！" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "必要なパラメータが不足しています。" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("updateProjectエンドポイントでエラー:", error);
    return new Response(JSON.stringify({ error: "更新に失敗しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
