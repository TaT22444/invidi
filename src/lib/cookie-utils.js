/**
 * リクエストからクッキーを安全に取得する関数
 */

const isProduction = process.env.NODE_ENV === 'production';

export function getCookies(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    if (!cookieHeader) return {};
    
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").filter(Boolean).map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    
    return cookies;
  } catch (error) {
    console.error("Cookie parsing error:", error);
    return {};
  }
}

// 一般的なセッション期間の定数
export const SESSION_DURATIONS = {
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
  THREE_MONTHS: 60 * 60 * 24 * 90,
  SIX_MONTHS: 60 * 60 * 24 * 180,
  ONE_YEAR: 60 * 60 * 24 * 365,
};

/**
 * クッキーを設定するレスポンスヘッダーを生成
 */
export function setCookieHeader(name, value, options = {}) {
  const { maxAge = SESSION_DURATIONS.ONE_WEEK, path = "/" } = options;

  return {
    "Set-Cookie": `${name}=${value}; Path=${path}; Max-Age=${maxAge}; SameSite=Lax;${isProduction ? ' Secure;' : ''}`
  };
}

/**
 * 認証用クッキーを設定するヘルパー関数
 */
export function setAuthCookieHeader(name, value, options = {}) {
  const { 
    maxAge = SESSION_DURATIONS.THREE_MONTHS,
    path = "/",
    httpOnly = true
  } = options;

  return {
    "Set-Cookie": `${name}=${value}; Path=${path}; Max-Age=${maxAge}; SameSite=Lax;${isProduction ? ' Secure;' : ''} ${httpOnly ? 'HttpOnly;' : ''}`
  };
}
