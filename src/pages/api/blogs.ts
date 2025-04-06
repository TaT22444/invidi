import type { APIRoute } from 'astro';
import admin from 'firebase-admin';

// Firebase 初期化（環境変数の設定）
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // ストレージバケットはページネーション処理では使用しないため、初期化しない
  });
}

const db = admin.firestore();
// ストレージの初期化は必要な時だけ行う

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    // JSONリクエストの場合（ページネーション用）
    if (contentType.includes('application/json')) {
      const payload = await request.json();
      
      // ページネーション用リクエストの処理
      if (payload.offset !== undefined && payload.projectId) {
        const projectId = payload.projectId;
        const offset = parseInt(payload.offset.toString());
        const limit = parseInt(payload.limit?.toString() || '6');
        
        // 最後に取得したドキュメントを取得するためのクエリ
        let query = db.collection("projects").doc(projectId)
          .collection("blog")
          .orderBy("createdAt", "desc");
        
        console.log(`ブログ取得リクエスト: projectId=${projectId}, offset=${offset}, limit=${limit}`);
        
        // オフセット処理を改善
        if (offset > 0) {
          // offset件までのドキュメントを取得して、最後のドキュメントを起点にする
          const lastDocSnapshot = await query.limit(offset).get();
          console.log(`オフセット取得結果: ${lastDocSnapshot.docs.length}件 (要求オフセット: ${offset})`);
          
          if (!lastDocSnapshot.empty) {
            // 最後のドキュメントを取得
            const lastVisibleDoc = lastDocSnapshot.docs[lastDocSnapshot.docs.length - 1];
            // 最後のドキュメントの次から取得するようにクエリを更新
            query = query.startAfter(lastVisibleDoc);
            console.log(`オフセット ${offset} で最後のドキュメント ID=${lastVisibleDoc.id}, タイトル="${lastVisibleDoc.data().title}" の後から取得`);
          } else {
            console.log(`オフセット ${offset} の取得結果が空でした`);
          }
        }
        
        // 実際のデータ取得
        const blogSnapshot = await query.limit(limit + 1).get(); // 1件多く取得してさらにデータがあるか確認
        
        console.log(`取得ブログ件数: ${blogSnapshot.docs.length}, IDs: ${blogSnapshot.docs.map(d => d.id).join(', ')}`);
        
        if (!blogSnapshot.empty) {
          // 全アイテムをマッピング
          const allItems = blogSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "タイトル未設定",
              tag: data.tags?.[0] || "ブログ", 
              createdAt: data.createdAt?.toDate() || new Date(),
              imageUrl: data.thumbnailUrl || "https://placehold.jp/1000x600.png",
              content: data.body || "",
              status: data.status || "public"
            };
          });
          
          // 公開状態のもののみフィルタリング
          const publicItems = allItems.filter(item => item.status === "public" || item.status === "published");
          
          // 返却データの準備（limitまで）
          const hasMore = publicItems.length > limit;
          const items = hasMore ? publicItems.slice(0, limit) : publicItems;
          
          return new Response(
            JSON.stringify({ 
              items, 
              hasMore,
              totalCount: publicItems.length
            }),
            { 
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        } else {
          return new Response(
            JSON.stringify({ 
              items: [], 
              hasMore: false
            }),
            { 
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }
      }
    }
    
    // FormDataの場合（アップロード処理など）
    if (contentType.includes('multipart/form-data')) {
      // ここでgetStorage()を必要に応じて初期化
      const { getStorage } = await import('firebase-admin/storage');
      // ストレージバケット名がある場合のみバケットを取得
      let bucket;
      if (process.env.FIREBASE_STORAGE_BUCKET) {
        bucket = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
      } else {
        throw new Error('ストレージバケット名が設定されていません');
      }
      
      const formData = await request.formData();
      
      // アクション種別の取得
      const action = formData.get('action') as string;
      
      // 画像アップロード処理
      if (action === 'upload_image') {
        const projectId = formData.get('projectId') as string;
        const blogImage = formData.get('blogImage') as File;
        
        if (!projectId) {
          return new Response(
            JSON.stringify({ success: false, message: 'プロジェクトIDが指定されていません' }),
            { status: 400 }
          );
        }
        
        if (!blogImage || blogImage.size === 0) {
          return new Response(
            JSON.stringify({ success: false, message: '画像ファイルが指定されていません' }),
            { status: 400 }
          );
        }
        
        // 一時ファイルとして保存
        const buffer = Buffer.from(await blogImage.arrayBuffer());
        const tempFilePath = `/tmp/${blogImage.name}`;
        fs.writeFileSync(tempFilePath, buffer);
        
        // Firebaseストレージにアップロード
        const destination = `projects/${projectId}/blog/images/${Date.now()}_${blogImage.name}`;
        await bucket.upload(tempFilePath, {
          destination,
          metadata: {
            contentType: blogImage.type,
          },
        });
        
        // 公開URLを取得
        const [file] = await bucket.file(destination).getSignedUrl({
          action: 'read',
          expires: '01-01-2100',
        });
        
        // 一時ファイルを削除
        fs.unlinkSync(tempFilePath);
        
        return new Response(
          JSON.stringify({
            success: true,
            message: '画像がアップロードされました',
            imageUrl: file,
          }),
          { status: 200 }
        );
      }
      
      // ブログデータの保存処理（既存のコード）
      // ブログデータの取得
      const title = formData.get('blogTitle') as string;
      const body = formData.get('blogBody') as string;
      const submitType = formData.get('submitType') as string;
      const isPublished = submitType === 'publish';
      
      // タグの処理
      const tags = formData.getAll('blogTags') as string[];
      
      // サムネイル画像の処理
      let thumbnailUrl = '';
      const thumbnailFile = formData.get('blogThumbnail') as File;
      
      if (thumbnailFile && thumbnailFile.size > 0) {
        // 一時ファイルとして保存
        const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
        const tempFilePath = `/tmp/${thumbnailFile.name}`;
        fs.writeFileSync(tempFilePath, buffer);
        
        // Firebaseストレージにアップロード
        const destination = `blog-thumbnails/${Date.now()}_${thumbnailFile.name}`;
        await bucket.upload(tempFilePath, {
          destination,
          metadata: {
            contentType: thumbnailFile.type,
          },
        });
        
        // 公開URLを取得
        const [file] = await bucket.file(destination).getSignedUrl({
          action: 'read',
          expires: '01-01-2100',
        });
        
        thumbnailUrl = file;
        
        // 一時ファイルを削除
        fs.unlinkSync(tempFilePath);
      }
      
      // Firestoreにブログデータを保存
      const blogData = {
        title,
        body,
        tags,
        thumbnailUrl,
        isPublished,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      const blogRef = await db.collection('blogs').add(blogData);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'ブログが保存されました',
          id: blogRef.id,
        }),
        { status: 201 }
      );
    }
    
    // どちらにも当てはまらない場合はエラー
    return new Response(
      JSON.stringify({
        success: false,
        message: '無効なリクエスト形式です',
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('ブログ操作エラー:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    return new Response(
      JSON.stringify({
        success: false,
        message: 'エラーが発生しました',
        error: errorMessage,
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// GET メソッドも同様に修正
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '6');
    
    if (!projectId) {
      return new Response(
        JSON.stringify({ error: 'projectId is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 最後に取得したドキュメントを取得するためのクエリ
    let query = db.collection("projects").doc(projectId)
      .collection("blog")
      .orderBy("createdAt", "desc");
    
    // オフセット処理を改善
    if (offset > 0) {
      // offset件までのドキュメントを取得して、最後のドキュメントを起点にする
      const lastDocSnapshot = await query.limit(offset).get();
      if (!lastDocSnapshot.empty) {
        // 最後のドキュメントを取得
        const lastVisibleDoc = lastDocSnapshot.docs[lastDocSnapshot.docs.length - 1];
        // 最後のドキュメントの次から取得するようにクエリを更新
        query = query.startAfter(lastVisibleDoc);
        console.log(`オフセット ${offset} で最後のドキュメント ID=${lastVisibleDoc.id} の後から取得`);
      }
    }
    
    // 実際のデータ取得
    const blogSnapshot = await query.limit(limit + 1).get(); // 1件多く取得してさらにデータがあるか確認
    
    if (!blogSnapshot.empty) {
      // 全アイテムをマッピング
      const allItems = blogSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "タイトル未設定",
          tag: data.tags?.[0] || "ブログ", 
          createdAt: data.createdAt?.toDate() || new Date(),
          imageUrl: data.thumbnailUrl || "https://placehold.jp/1000x600.png",
          content: data.body || "",
          status: data.status || "public"
        };
      });
      
      // 公開状態のもののみフィルタリング
      const publicItems = allItems.filter(item => item.status === "public" || item.status === "published");
      
      // 返却データの準備（limitまで）
      const hasMore = publicItems.length > limit;
      const items = hasMore ? publicItems.slice(0, limit) : publicItems;
      
      return new Response(
        JSON.stringify({ 
          items, 
          hasMore,
          totalCount: publicItems.length
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          items: [], 
          hasMore: false 
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('ブログの取得エラー:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}; 