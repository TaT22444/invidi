/**
 * ローディングオーバーレイを制御するクラス
 */
export class LoadingHandler {
  private overlayElement: HTMLElement | null;
  private textElement: HTMLElement | null;
  
  constructor(overlayId: string = "loading-overlay") {
    this.overlayElement = document.getElementById(overlayId);
    this.textElement = this.overlayElement?.querySelector('.loading-text') || null;
  }
  
  /**
   * ローディングオーバーレイを表示する
   */
  show(text?: string): void {
    if (!this.overlayElement) return;
    
    // テキストが指定されていれば設定
    if (text && this.textElement) {
      this.textElement.textContent = text;
    }
    
    this.overlayElement.classList.add('show');
  }
  
  /**
   * ローディングオーバーレイを非表示にする
   */
  hide(): void {
    if (!this.overlayElement) return;
    this.overlayElement.classList.remove('show');
  }
  
  /**
   * フォームにローディングインジケーターを設定する
   */
  setupForm(formElement: HTMLFormElement, loadingText: string): void {
    if (!formElement) return;
    
    formElement.addEventListener('submit', () => {
      // フォームバリデーションがブラウザによって行われた場合、
      // checkValidityがfalseを返すとsubmitイベントが発生しないため、
      // ここではバリデーションチェックは行わない
      this.show(loadingText);
    });
  }
}

// グローバルに登録
window.LoadingHandler = LoadingHandler;

// インスタンスも直接アクセスできるように
window.loadingHandler = new LoadingHandler();

// 型定義
declare global {
  interface Window {
    LoadingHandler: typeof LoadingHandler;
    loadingHandler: LoadingHandler;
  }
}

// ドキュメント読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
  const blogForm = document.getElementById('blog-form') as HTMLFormElement | null;
  const noticeForm = document.getElementById('notice-form') as HTMLFormElement | null;
  
  if (blogForm) {
    window.loadingHandler.setupForm(blogForm, 'ブログを投稿中...');
  }
  
  if (noticeForm) {
    window.loadingHandler.setupForm(noticeForm, 'お知らせを投稿中...');
  }
}); 