/**
 * 日付を指定のフォーマットに変換するユーティリティ
 * 例: 2023-01-01 → 2023年01月01日
 */
export function formatDate(date: Date | string | number | any): string {
  // Firestore Timestamp の場合 → date.toDate() で JS Date に変換
  // すでに JS Date または文字列・数値の場合はそのまま使う
  const dateObj = typeof date === 'object' && date && 'toDate' in date 
    ? date.toDate() 
    : new Date(date);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

/**
 * 日付を YYYY-MM-DD 形式に変換する
 */
export function formatDateISO(date: Date | string | number | any): string {
  const dateObj = typeof date === 'object' && date && 'toDate' in date 
    ? date.toDate() 
    : new Date(date);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
} 