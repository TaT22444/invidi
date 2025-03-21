import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs';
export { renderers } from '../../renderers.mjs';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}
const db = admin.firestore();
const bucket = getStorage().bucket();
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const action = formData.get("action");
    if (action === "upload_image") {
      const projectId = formData.get("projectId");
      const blogImage = formData.get("blogImage");
      if (!projectId) {
        return new Response(
          JSON.stringify({ success: false, message: "プロジェクトIDが指定されていません" }),
          { status: 400 }
        );
      }
      if (!blogImage || blogImage.size === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "画像ファイルが指定されていません" }),
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await blogImage.arrayBuffer());
      const tempFilePath = `/tmp/${blogImage.name}`;
      fs.writeFileSync(tempFilePath, buffer);
      const destination = `projects/${projectId}/blog/images/${Date.now()}_${blogImage.name}`;
      await bucket.upload(tempFilePath, {
        destination,
        metadata: {
          contentType: blogImage.type
        }
      });
      const [file] = await bucket.file(destination).getSignedUrl({
        action: "read",
        expires: "01-01-2100"
      });
      fs.unlinkSync(tempFilePath);
      return new Response(
        JSON.stringify({
          success: true,
          message: "画像がアップロードされました",
          imageUrl: file
        }),
        { status: 200 }
      );
    }
    const title = formData.get("blogTitle");
    const body = formData.get("blogBody");
    const submitType = formData.get("submitType");
    const isPublished = submitType === "publish";
    const tags = formData.getAll("blogTags");
    let thumbnailUrl = "";
    const thumbnailFile = formData.get("blogThumbnail");
    if (thumbnailFile && thumbnailFile.size > 0) {
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const tempFilePath = `/tmp/${thumbnailFile.name}`;
      fs.writeFileSync(tempFilePath, buffer);
      const destination = `blog-thumbnails/${Date.now()}_${thumbnailFile.name}`;
      await bucket.upload(tempFilePath, {
        destination,
        metadata: {
          contentType: thumbnailFile.type
        }
      });
      const [file] = await bucket.file(destination).getSignedUrl({
        action: "read",
        expires: "01-01-2100"
      });
      thumbnailUrl = file;
      fs.unlinkSync(tempFilePath);
    }
    const blogData = {
      title,
      body,
      tags,
      thumbnailUrl,
      isPublished,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const blogRef = await db.collection("blogs").add(blogData);
    return new Response(
      JSON.stringify({
        success: true,
        message: "ブログが保存されました",
        id: blogRef.id
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("ブログ保存エラー:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ブログの保存に失敗しました",
        error: error.message
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
