document.addEventListener('DOMContentLoaded', function() {
  console.log('Preview script initializing...');
  
  // ---- お知らせ関連の変数初期化 ----
  let noticeList = document.querySelector('.notice_list');
  let noticeDisplayed = noticeList?.querySelectorAll('.notice_item').length || 0;
  let noticeOffset = noticeDisplayed;
  let previousNoticeItems = []; // 以前の状態を保存
  
  // ---- ブログ関連の変数初期化 ----
  let blogList = document.querySelector('.blog_list');
  let blogDisplayed = blogList?.querySelectorAll('.blog_item').length || 0;
  let blogOffset = blogDisplayed;
  let previousBlogItems = []; // 以前の状態を保存
  
  // ボタン要素の取得
  const noticeMoreButton = document.getElementById('load-more-notices');
  const noticeLessButton = document.getElementById('show-less-notices');
  const blogMoreButton = document.getElementById('load-more-blogs');
  const blogLessButton = document.getElementById('show-less-blogs');
  
  // 「さらに表示」ボタンの初期表示設定
  const blogHasMore = blogList?.dataset.hasMore === 'true';
  if (blogMoreButton && blogHasMore) {
    const viewMoreContainer = blogMoreButton.closest('.view-more');
    if (viewMoreContainer) {
      viewMoreContainer.style.display = 'block';
    }
  }
  
  // 日付フォーマット関数
  function formatDate(date) {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/\//g, '/');
  }
  
  // ---- お知らせ関連の機能 ----
  
  // お知らせボタン表示/非表示更新
  function updateNoticeButtonsVisibility() {
    if (noticeLessButton) {
      const viewLessContainer = noticeLessButton.closest('.view-less');
      if (viewLessContainer) {
        viewLessContainer.style.display = previousNoticeItems.length > 0 ? 'block' : 'none';
      }
    }
  }
  
  // お知らせボタンイベント設定
  if (noticeMoreButton) {
    noticeMoreButton.addEventListener('click', function() {
      this.disabled = true;
      this.style.opacity = '0.5';
      
      const projectId = this.dataset.projectId || window.location.pathname.split('/')[2];
      const limit = parseInt(this.dataset.limit || 3);
      
      fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectId,
          offset: noticeOffset,
          limit: limit
        })
      })
      .then(response => response.json())
      .then(data => {
        this.disabled = false;
        this.style.opacity = '1';
        
        if (data.items && data.items.length > 0) {
          // 現在の表示状態を保存
          const currentItems = Array.from(noticeList.querySelectorAll('.notice_item')).map(
            item => item.cloneNode(true)
          );
          previousNoticeItems.push(currentItems);
          
          // 新しいアイテムを追加
          data.items.forEach(notice => {
            const li = document.createElement('li');
            li.className = 'notice_item';
            li.setAttribute('data-notice-id', notice.id);
            li.innerHTML = `
              <div class="notice_item_info">
                <p>
                  <span>${notice.tag}</span>
                  <span class="slash"></span>
                  <span>${formatDate(new Date(notice.createdAt))}</span>
                </p>
                <h4 class="notice_item_title">
                  ${notice.title}
                </h4>
              </div>
              <div class="notice_item_btns">
                <button class="notice_item_open" data-notice-id="${notice.id}">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_623_115)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_623_115">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            `;
            noticeList.appendChild(li);
            
            // 新しいアイテムのイベント設定
            setupNoticeItemEvents(li.querySelector('.notice_item_open'));
          });
          
          // オフセットと表示件数を更新
          noticeOffset += data.items.length;
          noticeDisplayed += data.items.length;
          
          // 「表示を減らす」ボタンの表示状態を更新
          updateNoticeButtonsVisibility();
          
          // これ以上アイテムがない場合、「さらに表示」ボタンを非表示に
          if (!data.hasMore) {
            this.closest('.view-more').style.display = 'none';
          }
        } else {
          // 新しいアイテムがない場合
          this.closest('.view-more').style.display = 'none';
        }
      })
      .catch(error => {
        this.disabled = false;
        this.style.opacity = '1';
        console.error('お知らせの追加取得エラー:', error);
      });
    });
  }
  
  if (noticeLessButton) {
    noticeLessButton.addEventListener('click', function() {
      this.disabled = true;
      this.style.opacity = '0.5';
      
      if (previousNoticeItems.length > 0) {
        // リストを空にする
        while (noticeList.firstChild) {
          noticeList.removeChild(noticeList.firstChild);
        }
        
        // 前回の状態を復元
        const previousItems = previousNoticeItems.pop();
        previousItems.forEach(item => {
          noticeList.appendChild(item);
        });
        
        // オフセットと表示件数を更新
        noticeDisplayed = noticeList.querySelectorAll('.notice_item').length;
        noticeOffset = noticeDisplayed;
        
        // 「さらに表示」ボタンを表示
        if (noticeMoreButton) {
          noticeMoreButton.closest('.view-more').style.display = 'block';
        }
        
        // 「表示を減らす」ボタンの表示状態を更新
        updateNoticeButtonsVisibility();
      }
      
      this.disabled = false;
      this.style.opacity = '1';
    });
  }
  
  // ---- ブログ関連の機能 ----
  
  // ブログアイテムのクリックイベント設定
  function setupBlogItemEvents() {
    document.querySelectorAll('.blog_item').forEach(item => {
      item.addEventListener('click', function() {
        const blogId = this.getAttribute('data-blog-id');
        if (blogId) {
          alert('ブログ記事の詳細ページは準備中です。\nブログID: ' + blogId);
        }
      });
    });
  }
  
  // 既存のブログアイテムにイベント設定
  setupBlogItemEvents();
  
  // ブログボタン表示/非表示更新
  function updateBlogButtonsVisibility() {
    if (blogLessButton) {
      const viewLessContainer = blogLessButton.closest('.view-less');
      if (viewLessContainer) {
        viewLessContainer.style.display = previousBlogItems.length > 0 ? 'block' : 'none';
      }
    }
  }
  
  // ブログボタンイベント設定
  if (blogMoreButton) {
    blogMoreButton.addEventListener('click', function() {
      this.disabled = true;
      this.style.opacity = '0.5';
      
      const projectId = this.dataset.projectId || window.location.pathname.split('/')[2];
      const limit = parseInt(this.dataset.limit || 3);
      
      fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectId,
          offset: blogOffset,
          limit: limit
        })
      })
      .then(response => response.json())
      .then(data => {
        this.disabled = false;
        this.style.opacity = '1';
        
        if (data.items && data.items.length > 0) {
          // 現在の表示状態を保存
          const currentItems = Array.from(blogList.querySelectorAll('.blog_item')).map(
            item => item.cloneNode(true)
          );
          previousBlogItems.push(currentItems);
          
          // 新しいブログアイテムを追加
          data.items.forEach(blog => {
            const li = document.createElement('li');
            li.className = 'blog_item';
            li.setAttribute('data-blog-id', blog.id);
            li.innerHTML = `
              <img src="${blog.imageUrl}" alt="${blog.title}" />
              <p>
                <span>${blog.tag}</span>
                <span class="slash"></span>
                <span>${formatDate(new Date(blog.createdAt))}</span>
              </p>
              <h4>${blog.title}</h4>
            `;
            blogList.appendChild(li);
          });
          
          // 新しいアイテムにイベントリスナーを設定
          setupBlogItemEvents();
          
          // オフセットと表示件数を更新
          blogOffset += data.items.length;
          blogDisplayed += data.items.length;
          
          // 「表示を減らす」ボタンの表示状態を更新
          updateBlogButtonsVisibility();
          
          // これ以上アイテムがない場合、「さらに表示」ボタンを非表示に
          if (!data.hasMore) {
            this.closest('.view-more').style.display = 'none';
          }
        } else {
          // 新しいアイテムがない場合、「さらに表示」ボタンを非表示に
          this.closest('.view-more').style.display = 'none';
        }
      })
      .catch(error => {
        this.disabled = false;
        this.style.opacity = '1';
        console.error('ブログの追加取得エラー:', error);
      });
    });
  }
  
  // 「表示を減らす」ボタンのイベント設定
  if (blogLessButton) {
    blogLessButton.addEventListener('click', function() {
      this.disabled = true;
      this.style.opacity = '0.5';
      
      if (previousBlogItems.length > 0) {
        // リストを空にする
        while (blogList.firstChild) {
          blogList.removeChild(blogList.firstChild);
        }
        
        // 前回の状態を復元
        const previousItems = previousBlogItems.pop();
        previousItems.forEach(item => {
          blogList.appendChild(item);
        });
        
        // オフセットと表示件数を更新
        blogDisplayed = blogList.querySelectorAll('.blog_item').length;
        blogOffset = blogDisplayed;
        
        // 「さらに表示」ボタンを表示
        if (blogMoreButton) {
          blogMoreButton.closest('.view-more').style.display = 'block';
        }
        
        // 「表示を減らす」ボタンの表示状態を更新
        updateBlogButtonsVisibility();
      }
      
      this.disabled = false;
      this.style.opacity = '1';
    });
  }
  
  // お知らせアイテムのクリックイベント設定
  function setupNoticeItemEvents(button) {
    if (!button) return;
    
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const noticeId = this.getAttribute('data-notice-id');
      if (noticeId) {
        alert('お知らせの詳細表示は準備中です。\nお知らせID: ' + noticeId);
      }
    });
  }
  
  // 既存のお知らせアイテムにイベント設定
  document.querySelectorAll('.notice_item_open').forEach(setupNoticeItemEvents);
  
  // ページ初期表示時の処理
  // ボタンの初期表示状態を設定
  updateNoticeButtonsVisibility();
  updateBlogButtonsVisibility();
}); 