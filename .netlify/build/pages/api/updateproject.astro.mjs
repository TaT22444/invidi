import admin from 'firebase-admin';
export { renderers } from '../../renderers.mjs';

const prerender = false;
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();
async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, description, projectId, allTags } = body;
    if (projectId && allTags) {
      const projectRef = db.collection("projects").doc(projectId);
      const projectSnap = await projectRef.get();
      if (!projectSnap.exists) {
        return new Response(JSON.stringify({ error: "プロジェクトが見つかりません。" }), {
          status: 404
        });
      }
      await projectRef.update({ allTags });
      return new Response(JSON.stringify({
        message: "プロジェクトタグの更新に成功しました！",
        updatedTags: allTags
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (name) {
      const userId = "exampleUserId";
      const userRef = db.collection("users").doc(userId);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        return new Response(JSON.stringify({ error: "ユーザーが見つかりません。" }), {
          status: 404
        });
      }
      const userData = userSnap.data();
      const currentProjects = userData.projects || [];
      const updatedProjects = currentProjects.map((proj) => {
        if (proj.name === name) {
          return { ...proj, description };
        }
        return proj;
      });
      await userRef.update({ projects: updatedProjects });
      return new Response(JSON.stringify({ message: "プロジェクトの更新に成功しました！" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "必要なパラメータが不足しています。" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("updateProjectエンドポイントでエラー:", error);
    return new Response(JSON.stringify({ error: "更新に失敗しました。" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
