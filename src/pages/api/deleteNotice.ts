import type { APIRoute } from 'astro';
import { projectsDB } from '../../lib/firebase-admin';

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { projectId, noticeId } = await request.json();
    if (!projectId || !noticeId) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "projectIdとnoticeIdが必要です" 
      }), { status: 400 });
    }

    await projectsDB.deleteNotice(projectId, noticeId);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "お知らせを削除しました" 
    }));
  } catch (error) {
    console.error("お知らせ削除エラー:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: "削除に失敗しました" 
    }), { status: 500 });
  }
}; 