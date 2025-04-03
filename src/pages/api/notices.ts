import type { APIRoute } from 'astro';
import { getFirebaseAdmin } from '../../lib/firebase-admin';

// 日付を安全にパースする関数
function safeParseDate(dateField: any): string {
  if (!dateField) return new Date().toISOString();
  if (dateField.toDate && typeof dateField.toDate === 'function') return dateField.toDate().toISOString();
  if (dateField instanceof Date) return dateField.toISOString();
  if (typeof dateField === 'string') {
    try {
      return new Date(dateField).toISOString();
    } catch (e) {
      console.error("日付の解析に失敗:", e);
      return new Date().toISOString();
    }
  }
  return new Date().toISOString();
}

// インターフェース定義
interface NoticeItem {
  id: string;
  title: string;
  tag: string;
  createdAt: string;
  content: string;
  status: string;
}

interface ApiResponse {
  items: NoticeItem[];
  hasMore: boolean;
  totalCount: number;
}

// POST メソッドハンドラ
export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    
    if (!payload.projectId) {
      return new Response(
        JSON.stringify({ error: 'projectId is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const projectId = payload.projectId;
    const offset = parseInt(payload.offset || '0');
    const limit = parseInt(payload.limit || '6');
    
    console.log(`お知らせ取得リクエスト: projectId=${projectId}, offset=${offset}, limit=${limit}`);
    
    const { db } = getFirebaseAdmin();
    
    // 最後に取得したドキュメントを取得するためのクエリ
    let query = db.collection("projects").doc(projectId)
      .collection("notice")
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
    
    // limitで指定された件数+1を取得（hasMoreの判定用）
    const noticeSnapshot = await query.limit(limit + 1).get();
    
    if (!noticeSnapshot.empty) {
      // 全アイテムをマッピング
      const allItems: NoticeItem[] = noticeSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "タイトル未設定",
          tag: data.tag || "お知らせ",
          createdAt: safeParseDate(data.createdAt),
          content: data.content || "",
          status: data.status || "public"
        };
      });
      
      // 公開状態のもののみフィルタリング
      const publicItems = allItems.filter(item => 
        item.status === "public" || item.status === "published"
      );
      
      console.log(`お知らせフィルタリング: 取得総数=${allItems.length}, 公開済み=${publicItems.length}`);
      
      // hasMoreの判定（limit+1件取得できた場合）
      const hasMore = publicItems.length > limit;
      // 実際に返すのはlimit件まで
      const items = hasMore ? publicItems.slice(0, limit) : publicItems;
      
      console.log(`お知らせ取得成功: ${items.length}件取得, さらに表示=${hasMore}`);
      
      const response: ApiResponse = {
        items, 
        hasMore,
        totalCount: allItems.length
      };
      
      return new Response(
        JSON.stringify(response),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      console.log('お知らせデータが見つかりませんでした');
      const emptyResponse: ApiResponse = {
        items: [], 
        hasMore: false,
        totalCount: 0
      };
      
      return new Response(
        JSON.stringify(emptyResponse),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('お知らせの取得エラー:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// GET メソッドハンドラ
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const projectId = url.searchParams.get('projectId');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '6');
  
  if (!projectId) {
    return new Response(
      JSON.stringify({ error: 'projectId is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    const { db } = getFirebaseAdmin();
    
    // 最後に取得したドキュメントを取得するためのクエリ
    let query = db.collection("projects").doc(projectId)
      .collection("notice")
      .orderBy("createdAt", "desc");
    
    if (offset > 0) {
      // offset件スキップするために、まずoffset件取得して最後のドキュメントを参照点にする
      const lastDocQuery = await query.limit(offset).get();
      if (!lastDocQuery.empty) {
        const lastDoc = lastDocQuery.docs[lastDocQuery.docs.length - 1];
        query = query.startAfter(lastDoc);
      }
    }
    
    // 実際のデータ取得
    const noticeSnapshot = await query.limit(limit + 1).get(); // 1件多く取得してさらにデータがあるか確認
    
    // 結果の処理
    const allItems: NoticeItem[] = noticeSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "タイトル未設定",
        tag: data.tag || "お知らせ",
        createdAt: safeParseDate(data.createdAt),
        content: data.content || "",
        status: data.status || "public"
      };
    });
    
    // 公開状態のもののみフィルタリング
    const publicItems = allItems.filter(item => 
      item.status === "public" || item.status === "published"
    );
    
    console.log(`お知らせフィルタリング: 取得総数=${allItems.length}, 公開済み=${publicItems.length}`);
    
    // 返却データの準備（limitまで）
    const hasMore = publicItems.length > limit;
    const items = hasMore ? publicItems.slice(0, limit) : publicItems;
    
    const response: ApiResponse = {
      items,
      hasMore,
      totalCount: allItems.length
    };
    
    return new Response(
      JSON.stringify(response),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('お知らせの取得エラー:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 