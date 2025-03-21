import { db, auth } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';

/**
 * ブログ関連の操作を行うサービスクラス
 */
export class BlogService {
  /**
   * ブログ記事を保存する
   */
  static async saveBlog(projectId: string, blogData: any, isDraft: boolean = false) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('ログインが必要です');
      }
      
      const blogRef = blogData.id 
        ? doc(db, 'projects', projectId, 'blog', blogData.id)
        : doc(collection(db, 'projects', projectId, 'blog'));
        
      const blogContent = {
        ...blogData,
        updatedAt: serverTimestamp(),
        status: isDraft ? 'draft' : 'published',
        updatedBy: user.uid
      };
      
      // 新規作成の場合
      if (!blogData.id) {
        blogContent.createdAt = serverTimestamp();
        blogContent.createdBy = user.uid;
        await setDoc(blogRef, blogContent);
        return { ...blogContent, id: blogRef.id };
      } 
      // 更新の場合
      else {
        await updateDoc(blogRef, blogContent);
        return { ...blogContent, id: blogRef.id };
      }
    } catch (error) {
      console.error('ブログ保存エラー:', error);
      throw error;
    }
  }
  
  /**
   * ブログ記事を取得する
   */
  static async getBlog(projectId: string, blogId: string) {
    try {
      const blogRef = doc(db, 'projects', projectId, 'blog', blogId);
      const blogSnap = await getDoc(blogRef);
      
      if (!blogSnap.exists()) {
        return null;
      }
      
      return {
        id: blogSnap.id,
        ...blogSnap.data()
      };
    } catch (error) {
      console.error('ブログ取得エラー:', error);
      throw error;
    }
  }
  
  /**
   * プロジェクトのブログ記事一覧を取得する
   */
  static async getBlogList(projectId: string, options = { status: 'all' }) {
    try {
      let blogQuery;
      
      if (options.status === 'published') {
        blogQuery = query(
          collection(db, 'projects', projectId, 'blog'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );
      } else if (options.status === 'draft') {
        blogQuery = query(
          collection(db, 'projects', projectId, 'blog'),
          where('status', '==', 'draft'),
          orderBy('createdAt', 'desc')
        );
      } else {
        blogQuery = query(
          collection(db, 'projects', projectId, 'blog'),
          orderBy('createdAt', 'desc')
        );
      }
      
      const blogSnap = await getDocs(blogQuery);
      return blogSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('ブログリスト取得エラー:', error);
      throw error;
    }
  }
} 