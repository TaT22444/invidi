/**
 * ブログエディタ関連のユーティリティ関数
 */

// プレースホルダーを作成する関数
export function createPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'blog-empty-placeholder';
  placeholder.style.padding = '30px 20px';
  placeholder.style.cursor = 'pointer';
  placeholder.style.backgroundColor = '#2b2b32';
  placeholder.style.borderRadius = '8px';
  placeholder.style.textAlign = 'center';
  placeholder.style.color = '#6c757d';
  placeholder.style.border = '2px dashed #3c3c40';
  placeholder.style.margin = '20px 0';
  
  placeholder.innerHTML = `
    <div style="display: flex; justify-content: center; margin-bottom: 16px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </div>
    <h3 style="margin-bottom: 8px; font-size: 12px; color: #808080;">ブログ本文を作成しましょう</h3>
    <p style="font-size: 12px; line-height: 1.5; color: #808080;">上部のボタンから見出し、テキスト、画像などの要素を追加して、魅力的なブログ記事を作成しましょう。</p>
    
    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 24px;">
      <div class="template-card" style="background-color: #3c3c44; padding: 12px; border-radius: 6px; cursor: pointer; min-width: 100px; transition: transform 0.2s;">
        <div style="font-weight: bold; color: #f5f5f5; margin-bottom: 4px;">テンプレートA</div>
        <div style="font-size: 10px; color: #aaa;">基本的な記事構成</div>
      </div>
      <div class="template-card" style="background-color: #3c3c44; padding: 12px; border-radius: 6px; cursor: pointer; min-width: 100px; transition: transform 0.2s;">
        <div style="font-weight: bold; color: #f5f5f5; margin-bottom: 4px;">テンプレートB</div>
        <div style="font-size: 10px; color: #aaa;">画像メイン構成</div>
      </div>
      <div class="template-card" style="background-color: #3c3c44; padding: 12px; border-radius: 6px; cursor: pointer; min-width: 100px; transition: transform 0.2s;">
        <div style="font-weight: bold; color: #f5f5f5; margin-bottom: 4px;">テンプレートC</div>
        <div style="font-size: 10px; color: #aaa;">リスト形式構成</div>
      </div>
    </div>
  `;
  
  return placeholder;
}

// テンプレート通知バナーを作成する関数
export function createTemplateNotification(templateName, templateDesc) {
  const notification = document.createElement('div');
  notification.className = 'template-notification';
  notification.style.backgroundColor = '#373740';
  notification.style.borderRadius = '6px';
  notification.style.padding = '10px 16px';
  notification.style.marginBottom = '16px';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.justifyContent = 'space-between';
  
  // 通知内容
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64B5F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <div>
        <div style="font-size: 13px; color: #e0e0e0; font-weight: 500;">${templateName}を適用しました</div>
        <div style="font-size: 11px; color: #a0a0a0;">${templateDesc}</div>
      </div>
    </div>
    <button class="template-cancel-btn" style="background: transparent; border: 1px solid #505057; border-radius: 4px; padding: 5px 10px; color: #c0c0c0; cursor: pointer; font-size: 12px; transition: all 0.2s;">
      キャンセル
    </button>
  `;
  
  // キャンセルボタンのイベント処理
  const cancelBtn = notification.querySelector('.template-cancel-btn');
  cancelBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#ff5252';
    this.style.borderColor = '#ff5252';
    this.style.color = 'white';
  });
  
  cancelBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'transparent';
    this.style.borderColor = '#505057';
    this.style.color = '#c0c0c0';
  });
  
  return notification;
}

// テンプレートの内容を追加する関数
export function addTemplateContent(types, container) {
  types.forEach(type => {
    const snippet = getSnippetHTML(type);
    if (!snippet) return;
    
    // DOMノードとして追加
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = snippet.trim();
    const newBlock = tempDiv.firstElementChild;
    
    if (newBlock) {
      container.appendChild(newBlock);
      
      // 要素の初期化
      const editable = newBlock.querySelector('[contenteditable="true"]');
      if (editable) {
        initializeEditableElement(editable, newBlock);
      }
      
      const deleteBtn = newBlock.querySelector('.blog_action-btn');
      if (deleteBtn) {
        initializeDeleteButton(deleteBtn, newBlock);
      }
    }
  });
}

// 編集可能要素を初期化する関数
export function initializeEditableElement(editable: Element, block: Element) {
  editable.addEventListener('blur', () => {
    if (editable.textContent.trim() === '') {
      block.remove();
    }
  });
}

// 削除ボタンを初期化する関数
export function initializeDeleteButton(btn: Element, block: Element) {
  btn.addEventListener('click', () => {
    // ブロックを削除
    block.remove();
    
    // ブログコンテナを取得
    const blogContainer = document.querySelector('.blog');
    if (blogContainer) {
      // ブログコンテナ内の要素をカウント（通知バナーを除く）
      const contentElements = blogContainer.querySelectorAll('[data-type]');
      
      // コンテナが空になったらプレースホルダーを表示
      if (contentElements.length === 0) {
        console.log('ブログが空になりました - プレースホルダーを表示します');
        // プレースホルダーを作成して追加
        const newPlaceholder = createPlaceholder();
        blogContainer.appendChild(newPlaceholder);
        // プレースホルダーの初期化
        setupPlaceholderEvents(newPlaceholder);
      }
    }
  });
}

// プレースホルダーのイベントを設定する関数
export function setupPlaceholderEvents(placeholder) {
  const templateCards = placeholder.querySelectorAll('.template-card');
  const blogContainer = document.querySelector('.blog');
  
  // 各テンプレートカードのマウスイベントを設定
  templateCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // テンプレートAのクリックイベント
  templateCards[0]?.addEventListener('click', function() {
    if (blogContainer && placeholder) {
      blogContainer.removeChild(placeholder);
      
      // まず通知バナーを追加
      const notification = createTemplateNotification('テンプレートA', '基本的な記事構成');
      blogContainer.appendChild(notification);
      
      // 通知のキャンセルボタンにイベントを追加
      setupNotificationCancelButton(notification.querySelector('.template-cancel-btn'), blogContainer);
      
      // HTMLを取得し追加
      addTemplateContent(['heading1', 'text', 'heading2', 'text'], blogContainer);
    }
  });
  
  // テンプレートBのクリックイベント
  templateCards[1]?.addEventListener('click', function() {
    if (blogContainer && placeholder) {
      blogContainer.removeChild(placeholder);
      
      // まず通知バナーを追加
      const notification = createTemplateNotification('テンプレートB', '画像メイン構成');
      blogContainer.appendChild(notification);
      
      // 通知のキャンセルボタンにイベントを追加
      setupNotificationCancelButton(notification.querySelector('.template-cancel-btn'), blogContainer);
      
      // HTMLを取得し追加
      addTemplateContent(['heading1', 'text', 'image', 'heading2', 'text'], blogContainer);
    }
  });
  
  // テンプレートCのクリックイベント
  templateCards[2]?.addEventListener('click', function() {
    if (blogContainer && placeholder) {
      blogContainer.removeChild(placeholder);
      
      // まず通知バナーを追加
      const notification = createTemplateNotification('テンプレートC', 'リスト形式構成');
      blogContainer.appendChild(notification);
      
      // 通知のキャンセルボタンにイベントを追加
      setupNotificationCancelButton(notification.querySelector('.template-cancel-btn'), blogContainer);
      
      // HTMLを取得し追加
      addTemplateContent(['heading1', 'text', 'heading3', 'text', 'heading3', 'text'], blogContainer);
    }
  });
}

// 通知のキャンセルボタンにイベントを設定する関数
export function setupNotificationCancelButton(cancelBtn, blogContainer) {
  if (!cancelBtn) return;
  
  cancelBtn.addEventListener('click', function() {
    // blogContainerの内容をすべて削除
    while (blogContainer.firstChild) {
      blogContainer.removeChild(blogContainer.firstChild);
    }
    
    // プレースホルダーを再作成して追加
    const newPlaceholder = createPlaceholder();
    blogContainer.appendChild(newPlaceholder);
    
    // プレースホルダーの初期化
    setupPlaceholderEvents(newPlaceholder);
  });
}

// スニペットのHTMLを取得する関数
export function getSnippetHTML(type: any) {
  // この関数はcms.astroに定義されている可能性が高いため、
  // グローバルスコープから参照するか、必要に応じて引数として渡す必要があります
  // ここでは外部で定義されている前提として実装しています
  if (typeof window.getSnippetHTML === 'function') {
    return window.getSnippetHTML(type);
  }
  return null;
}