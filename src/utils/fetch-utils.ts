/**
 * CSRFトークン付きでフェッチするユーティリティ関数
 */
export function initFetchWithCsrf() {
  window.fetchWithCsrf = async function(url: string, options: RequestInit = {}): Promise<Response> {
    // 現在のURLを使用（空文字の場合）
    const targetUrl = url || window.location.href;
    
    // CSRFトークンを取得
    const csrfTokenElement = document.querySelector('input[name="csrf_token"]');
    const csrfToken = csrfTokenElement instanceof HTMLInputElement ? csrfTokenElement.value : '';
    
    // オプションをコピー
    const newOptions = { ...options };
    
    // FormDataオブジェクトにCSRFトークンを追加
    if (newOptions.body instanceof FormData) {
      newOptions.body.append('csrf_token', csrfToken);
    } else if (typeof newOptions.body === 'string') {
      // URLエンコードされたボディの場合
      newOptions.body = newOptions.body + (newOptions.body ? '&' : '') + `csrf_token=${csrfToken}`;
    } else {
      // JSONの場合は新しいFormDataを作成
      const formData = new FormData();
      formData.append('csrf_token', csrfToken);
      
      // 既存のデータがあれば追加
      if (newOptions.body) {
        const data = typeof newOptions.body === 'string' ? JSON.parse(newOptions.body) : newOptions.body;
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
      }
      
      newOptions.body = formData;
    }
    
    return fetch(targetUrl, newOptions);
  };
}

// グローバル型定義
declare global {
  interface Window {
    fetchWithCsrf: (url: string, options?: RequestInit) => Promise<Response>;
  }
} 