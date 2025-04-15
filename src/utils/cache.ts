// シンプルなメモリキャッシュの実装

// キャッシュアイテムの型定義
interface CacheItem<T> {
  data: T;
  expiry: number;
}

// シンプルなメモリキャッシュ
const cache = new Map<string, CacheItem<any>>();

// 自動キャッシュクリア用タイマー
let autoClearInterval: NodeJS.Timeout | null = null;

/**
 * キャッシュを用いてデータを取得する関数
 * @param key キャッシュキー
 * @param fetcher データを取得する関数
 * @param ttl キャッシュの有効期間（秒）
 */
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 60
): Promise<T> {
  const now = Date.now();
  const cachedItem = cache.get(key);

  // キャッシュが有効な場合はキャッシュを返す
  if (cachedItem && cachedItem.expiry > now) {
    console.log(`Cache hit: ${key}`);
    return cachedItem.data as T;
  }

  // キャッシュがない場合や期限切れの場合は新しく取得
  console.log(`Cache miss: ${key}`);
  const data = await fetcher();

  // 取得したデータをキャッシュに保存
  cache.set(key, {
    data,
    expiry: now + (ttl * 1000)
  });

  return data;
}

/**
 * 特定のキーのキャッシュを削除する
 * @param key キャッシュキー
 */
export function invalidateCache(key: string): boolean {
  return cache.delete(key);
}

/**
 * 指定したプレフィックスを持つすべてのキャッシュを削除する
 * @param prefix キャッシュキーのプレフィックス
 */
export function invalidateCacheByPrefix(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
      console.log(`Cache invalidated: ${key}`);
    }
  }
}

/**
 * すべてのキャッシュをクリアする
 */
export function clearCache(): void {
  cache.clear();
  console.log("Cache cleared");
}

/**
 * 一定間隔でキャッシュを全クリアする
 * @param intervalMs クリアする間隔（ミリ秒）
 */
export function startAutoClearCache(intervalMs: number = 1000 * 60 * 10): void {
  if (autoClearInterval) {
    clearInterval(autoClearInterval);
  }
  autoClearInterval = setInterval(() => {
    console.log("Auto-clearing cache...");
    clearCache();
  }, intervalMs);
}

/**
 * 自動キャッシュクリアを停止する
 */
export function stopAutoClearCache(): void {
  if (autoClearInterval) {
    clearInterval(autoClearInterval);
    autoClearInterval = null;
  }
}

// アプリケーション起動時にキャッシュをクリアする
export function clearCacheOnStartup() {
  console.log("アプリケーション起動時のキャッシュクリア実行中...");
  clearCache();
}

// 自動実行
clearCacheOnStartup();
