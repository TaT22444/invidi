import { getFirebaseAdmin } from '../lib/firebase-admin';
import { getCachedData } from '../utils/cache';

// インターフェース定義
export interface NoticeItem {
  id: string;
  title: string;
  tag: string;
  createdAt: Date;
  content: string;
  status?: string;
}

export interface BlogItem {
  id: string;
  title: string;
  tag: string;
  createdAt: Date;
  imageUrl: string;
  content: string;
  thumbnailUrl?: string;
  body?: string;
  status?: string;
}

/**
 * Firestoreからプロジェクトの追加データを取得
 */
export async function getProjectData(projectId: string, userId: string) {
  try {
    const { db } = getFirebaseAdmin();
    
    // ユーザーのプロジェクト一覧を取得
    const userSnap = await db.collection("users").doc(userId).get();
    if (!userSnap.exists) {
      return { error: "ユーザーデータが存在しません" };
    }
    
    const userData = userSnap.data();
    const userProjects = userData?.projects || [];
    
    // 指定されたプロジェクトがユーザーのものか確認
    const currentProject = userProjects.find((p: { id: string }) => p.id === projectId);
    if (!currentProject) {
      return { error: "プロジェクトへのアクセス権限がありません" };
    }
    
    // キャッシュキー
    const cacheKey = `project:${projectId}`;
    
    // プロジェクトデータをキャッシュから取得するか、Firestoreから取得
    const projectFullData = await getCachedData(
      cacheKey,
      async () => {
        const projectDoc = await db.collection("projects").doc(projectId).get();
        if (!projectDoc.exists) {
          return currentProject;
        }
        
        const firestoreProject = projectDoc.data();
        if (!firestoreProject) {
          return currentProject;
        }
        
        // nameフィールドは上書きせず、Firestoreからの他のデータを統合
        const { name: _, ...firestoreDataWithoutName } = firestoreProject;
        
        return {
          ...currentProject,
          ...firestoreDataWithoutName,
          siteName: currentProject.siteName || firestoreProject.siteName || currentProject.name
        };
      },
      300 // 5分キャッシュ
    );
    
    return { project: projectFullData, error: null };
  } catch (error) {
    console.error("プロジェクトデータ取得エラー:", error);
    return { error: "プロジェクトデータの取得に失敗しました" };
  }
}

/**
 * プロジェクトのブログとお知らせを含む全データを取得
 */
export async function getProjectWithData(projectId: string, userId: string) {
  try {
    const { project, error } = await getProjectData(projectId, userId);
    
    if (error || !project) {
      return { error };
    }
    
    // プロジェクトからタグ情報を確実に取得
    const { db } = getFirebaseAdmin();
    const projectDoc = await db.collection("projects").doc(projectId).get();
    const projectData = projectDoc.data() || {};
    
    // プロジェクトにタグ情報を追加
    project.blogTags = projectData.blogTags || [];
    project.newsTags = projectData.newsTags || [];
    
    // ブログとお知らせを並列で取得
    const [noticeData, blogData] = await Promise.all([
      getNotices(projectId),
      getBlogs(projectId)
    ]);
    
    return {
      project,
      notices: noticeData.notices,
      hasMoreNotices: noticeData.hasMore,
      blogs: blogData.blogs,
      hasMoreBlogs: blogData.hasMore,
      error: null
    };
  } catch (error) {
    console.error("プロジェクト全データ取得エラー:", error);
    return { error: "データの取得に失敗しました" };
  }
}

/**
 * プロジェクトのお知らせを取得
 */
export async function getNotices(projectId: string, limit = 6) {
  const { db } = getFirebaseAdmin();
  
  try {
    // キャッシュキー
    const cacheKey = `notices:${projectId}:${limit}`;
    
    return await getCachedData(
      cacheKey,
      async () => {
        const noticeSnapshot = await db.collection("projects").doc(projectId)
          .collection("notice")
          .orderBy("createdAt", "desc")
          .limit(limit + 1) // 1件多く取得して次があるかを確認
          .get();
        
        if (noticeSnapshot.empty) {
          return { notices: [], hasMore: false };
        }
        
        // すべてのお知らせを取得し、公開状態のみフィルタリング
        const allNoticeItems = noticeSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "タイトル未設定",
            tag: data.tag || "お知らせ",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                      (data.createdAt instanceof Date ? data.createdAt : new Date()),
            content: data.content || data.body || "",
            status: data.status || "public"
          };
        });
        
        // 公開状態のもののみフィルタリング
        const publicNoticeItems = allNoticeItems.filter(item => 
          item.status === "public" || item.status === "published"
        );
        
        // limit+1件取得できれば、まだ表示すべきデータがある
        const hasMore = publicNoticeItems.length > limit;
        
        // 表示用データはlimit件までに制限
        const notices = hasMore ? publicNoticeItems.slice(0, limit) : publicNoticeItems;
        
        return { notices, hasMore };
      },
      60 // 1分キャッシュ
    );
  } catch (error) {
    console.error("お知らせデータ取得エラー:", error);
    return { notices: [], hasMore: false };
  }
}

/**
 * プロジェクトのブログを取得
 */
export async function getBlogs(projectId: string, limit = 6) {
  const { db } = getFirebaseAdmin();
  
  try {
    // キャッシュキー
    const cacheKey = `blogs:${projectId}:${limit}`;
    
    return await getCachedData(
      cacheKey,
      async () => {
        const blogSnapshot = await db.collection("projects").doc(projectId)
          .collection("blog")
          .orderBy("createdAt", "desc")
          .limit(limit + 1) // 1件多く取得
          .get();
        
        if (blogSnapshot.empty) {
          return { blogs: [], hasMore: false };
        }
        
        // まずすべてのデータを取得
        const allBlogItems = blogSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "タイトル未設定",
            tag: data.tags?.[0] || "ブログ",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            imageUrl: data.thumbnailUrl || "https://placehold.jp/1000x600.png",
            content: data.body || "",
            status: data.status || "public"
          };
        });
        
        // statusが"public"のもののみフィルタリング
        const publicBlogItems = allBlogItems.filter(item => 
          item.status === "public" || item.status === "published"
        );
        
        // 公開アイテムが表示件数より多い場合、さらに表示が必要
        let hasMore = publicBlogItems.length > limit;
        
        // 表示用データはlimit件までに制限
        const blogs = publicBlogItems.length > limit ? 
          publicBlogItems.slice(0, limit) : publicBlogItems;
        
        // 次のデータが存在するかどうかをチェック（追加対策）
        if (!hasMore && publicBlogItems.length === limit) {
          // 現在表示分と同じ数のデータがある場合、次のデータセットがあるか確認
          const nextBlogSnapshot = await db.collection("projects").doc(projectId)
            .collection("blog")
            .orderBy("createdAt", "desc")
            .startAfter(blogSnapshot.docs[blogSnapshot.docs.length - 1])
            .limit(1)
            .get();

          // 次のデータが存在し、それが公開状態なら「さらに表示」が必要
          if (!nextBlogSnapshot.empty) {
            const nextItem = nextBlogSnapshot.docs[0].data();
            if (nextItem.status === "public" || nextItem.status === "published") {
              hasMore = true;
            }
          }
        }
        
        return { blogs, hasMore };
      },
      60 // 1分キャッシュ
    );
  } catch (error) {
    console.error("ブログデータ取得エラー:", error);
    return { blogs: [], hasMore: false };
  }
} 