import { p as projectsDB } from '../../chunks/firebase-admin_CZ8IQ3yZ.mjs';
export { renderers } from '../../renderers.mjs';

const DELETE = async ({ request }) => {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
