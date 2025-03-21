import type { APIRoute } from 'astro';
import { projectsDB } from '../../lib/firebase-admin';

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { projectId, blogId } = await request.json();
    if (!projectId || !blogId) {
      return new Response(JSON.stringify({ success: false, message: "projectIdとblogIdが必要です" }), { status: 400 });
    }

    await projectsDB.deleteBlog(projectId, blogId);

    return new Response(JSON.stringify({ success: true, message: "ブログ記事を削除しました" }));
  } catch (error) {
    console.error("ブログ削除エラー:", error);
    return new Response(JSON.stringify({ success: false, message: "削除に失敗しました" }), { status: 500 });
  }
}; 