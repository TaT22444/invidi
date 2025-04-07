import { nanoid } from 'nanoid';
import { SESSION_DURATIONS } from '../lib/cookie-utils';
import { timingSafeEqual } from 'crypto';

// CSRFトークンの生成
export function generateCSRFToken(): string {
  return nanoid(32); // 32文字のランダムなトークンを生成
}

// CSRFトークンの有効期限付きのセッションクッキーヘッダーを生成
export function getCSRFCookieHeader(token: string) {
  return {
    "Set-Cookie": `csrf_token=${token}; Path=/; Max-Age=${SESSION_DURATIONS.ONE_DAY}; SameSite=Lax; Secure; HttpOnly;`
  };
}

// CSRFトークンの検証
export function validateCSRFToken(requestToken: string | null, cookieToken: string | null): boolean {
  if (!requestToken || !cookieToken) {
    return false;
  }

  const a = Buffer.from(requestToken);
  const b = Buffer.from(cookieToken);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

/**
 * CSRFエラーをハンドリングするクライアント側ヘルパー関数
 * @param response フェッチレスポンス
 * @returns エラー処理した結果（リダイレクトの場合はtrue）
 */
export function handleCsrfError(response: Response): boolean {
  // リダイレクトレスポンスがCSRFエラーかどうかを確認
  if (response.redirected && response.url.includes('csrf_error=true')) {
    // エラー通知を表示
    const errorMessage = document.createElement('div');
    errorMessage.className = 'notification error';
    errorMessage.innerHTML = `
      <p>セキュリティトークンの検証に失敗しました。新しいトークンが自動的に取得されました。</p>
      <button class="retry-btn">送信を再試行</button>
    `;
    
    const notificationArea = document.getElementById('notification-area') || document.body;
    notificationArea.appendChild(errorMessage);
    
    // 再試行ボタンのイベントリスナーを設定
    const retryBtn = errorMessage.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
    
    return true;
  }
  
  return false;
}