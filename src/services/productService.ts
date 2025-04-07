import { getFirestoreDb } from '../lib/firebase-admin';
import { getCachedData, invalidateCache } from '../utils/cache';
import { formatDate } from '../utils/formatDate';
import { uploadImageToStorage } from '../utils/uploadImage';

// 商品データの型定義
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  status: 'public' | 'draft';
  tags: string[];
  baseStatus?: string;
  baseId?: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
}

/**
 * プロジェクトの商品一覧を取得する
 */
export async function getProjectProducts(projectId: string) {
  const db = getFirestoreDb();
  
  try {
    const productsSnapshot = await db
      .collection("projects")
      .doc(projectId)
      .collection("products")
      .orderBy("createdAt", "desc")
      .get();
    
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("商品一覧の取得に失敗しました:", error);
    throw error;
  }
}

/**
 * プロジェクトの商品カテゴリを取得する
 */
export async function getProductCategories(projectId: string) {
  const db = getFirestoreDb();
  
  try {
    const projectDoc = await db.collection("projects").doc(projectId).get();
    const projectData = projectDoc.data() || {};
    
    return projectData.productTags || [];
  } catch (error) {
    console.error("商品カテゴリの取得に失敗しました:", error);
    throw error;
  }
}

/**
 * 商品を作成する
 */
export async function createProduct({
  projectId,
  title,
  description,
  price,
  stock,
  status,
  tags,
  imageFile,
  userId
}: {
  projectId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  status: "public" | "draft";
  tags: string[];
  imageFile?: File;
  userId: string;
}) {
  const db = getFirestoreDb();
  
  try {
    // 画像のアップロード処理
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToStorage(imageFile, projectId, userId, "products");
    }
    
    // 商品データの保存
    const productsRef = db.collection("projects").doc(projectId).collection("products");
    await productsRef.add({
      title,
      description,
      price,
      stock,
      status,
      tags,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId
    });
    
    // タグをプロジェクトに保存
    if (tags.length > 0) {
      const projectRef = db.collection("projects").doc(projectId);
      await projectRef.update({
        productTags: tags
      });
    }
    
    return true;
  } catch (error) {
    console.error("商品の作成に失敗しました:", error);
    throw error;
  }
}

/**
 * 商品のステータスを更新する
 */
export async function updateProductStatus(
  productId: string,
  status: "public" | "draft",
  projectId: string
) {
  const db = getFirestoreDb();
  
  try {
    const productRef = db
      .collection("projects")
      .doc(projectId)
      .collection("products")
      .doc(productId);
    
    await productRef.update({
      status,
      updatedAt: new Date()
    });
    
    return true;
  } catch (error) {
    console.error("商品ステータスの更新に失敗しました:", error);
    throw error;
  }
}

/**
 * 商品を削除する
 */
export async function deleteProduct(productId: string, projectId: string) {
  const db = getFirestoreDb();
  
  try {
    await db
      .collection("projects")
      .doc(projectId)
      .collection("products")
      .doc(productId)
      .delete();
    
    return true;
  } catch (error) {
    console.error("商品の削除に失敗しました:", error);
    throw error;
  }
} 