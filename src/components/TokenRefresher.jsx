import { useEffect } from 'react';

export default function TokenRefresher() {
  useEffect(() => {
    let cleanupFunction = null;
    
    const setupTokenRefresh = async () => {
      try {
        console.log("TokenRefresher: トークン更新機能の初期化を開始");
        
        // Firebase SDKを使用できるか試行（失敗してもエラーを表示するだけ）
        if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
          console.log("TokenRefresher: Firebaseコンパットライブラリでユーザーを検出");
          const user = firebase.auth().currentUser;
          
          // クッキーからトークンを取得
          const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          
          // トークンを更新する関数
          const refreshTokenPeriodically = async () => {
            if (!firebase.auth().currentUser) {
              console.warn("TokenRefresher: ユーザーがログアウトしたため更新を停止");
              return;
            }
            
            try {
              // 強制的にトークンを更新
              const newToken = await firebase.auth().currentUser.getIdToken(true);
              // クッキーにトークンを保存（30日間有効）
              document.cookie = `token=${newToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax; Secure`;
              console.log("TokenRefresher: トークンを更新しました");
            } catch (error) {
              console.error("TokenRefresher: トークン更新エラー", error);
            }
          };
          
          // 初回実行
          await refreshTokenPeriodically();
          
          // 定期的な更新（45分ごと）
          const intervalId = setInterval(refreshTokenPeriodically, 45 * 60 * 1000);
          
          // クリーンアップ関数を設定
          cleanupFunction = () => {
            clearInterval(intervalId);
            console.log("TokenRefresher: インターバルをクリア");
          };
          
          return;
        }
        
        // 従来のコード - firebase.tsのインポート
        const firebaseModule = await import('../lib/firebase.ts');
        const { auth, setupTokenRefresh } = firebaseModule;
        
        // 現在のユーザーを取得
        const currentUser = auth.currentUser;
        console.log("TokenRefresher: 現在のユーザー状態", currentUser ? "ログイン中" : "未ログイン");
        
        if (currentUser) {
          // ユーザーがログインしている場合、トークン更新をセットアップ
          console.log("TokenRefresher: トークン自動更新をセットアップします");
          const cleanup = await setupTokenRefresh(currentUser);
          if (typeof cleanup === 'function') {
            cleanupFunction = cleanup;
          }
        } else {
          // 認証状態の変更を監視
          console.log("TokenRefresher: 認証状態の変更を監視します");
          const { onAuthChange } = firebaseModule;
          const unsubscribe = onAuthChange(async (user) => {
            if (user) {
              console.log("TokenRefresher: ユーザーを検出、トークン自動更新をセットアップします");
              const cleanup = await setupTokenRefresh(user);
              if (typeof cleanup === 'function') {
                cleanupFunction = cleanup;
              }
            }
          });
          
          // 監視解除関数をクリーンアップに設定
          cleanupFunction = unsubscribe;
        }
      } catch (error) {
        console.error("TokenRefresher: トークン更新設定エラー", error);
      }
    };
    
    // コンポーネントマウント時に実行
    if (typeof window !== 'undefined') {
      setupTokenRefresh();
    }
    
    // クリーンアップ関数を返す
    return () => {
      if (typeof cleanupFunction === 'function') {
        cleanupFunction();
      }
    };
  }, []);
  
  // 何も表示しない
  return null;
} 