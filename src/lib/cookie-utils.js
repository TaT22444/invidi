/**
 * リクエストからクッキーを安全に取得する関数
 */
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

/**
 * クッキーを設定するレスポンスヘッダーを生成
 */
export function setCookieHeader(name, value, options = {}) {
  const { maxAge = 60 * 60 * 24 * 7, path = "/" } = options;
  
  return {
    "Set-Cookie": `${name}=${value}; Path=${path}; Max-Age=${maxAge}; SameSite=Lax; Secure;`
  };
} 