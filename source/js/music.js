// 确保播放器只初始化一次，防止 PJAX 刷新导致重复创建
if (!window.aplayerInstance) {
  // 1. 创建隐藏的原生播放器容器
  const aplayerContainer = document.createElement('div');
  aplayerContainer.id = 'aplayer';
  document.body.appendChild(aplayerContainer);

  // 2. 动态创建长条全局字幕栏（复古装饰）
  const lyricBar = document.createElement('div');
  lyricBar.id = 'custom-lyric-bar';
  lyricBar.innerHTML = `
    <div class="lyric-dots">✦ ✦ ✦</div>
    <div id="lyric-text">✨ 正在载入背景音乐... ✨</div>
    <div class="lyric-icon"><i class="fas fa-fan"></i></div>
  `;

  // 3. 精准布局注入器：直接塞进右侧文章列表（#recent-posts）的最顶部，完美实现图示对齐
  const recentPosts = document.getElementById('recent-posts');
  if (recentPosts) {
    recentPosts.insertBefore(lyricBar, recentPosts.firstChild);
  } else {
    // 兜底方案：如果不在首页，则塞入主互动区
    const contentInner = document.getElementById('content-inner');
    if (contentInner) contentInner.parentNode.insertBefore(lyricBar, contentInner);
  }

  // 4. 初始化 APlayer
  window.aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,      
    autoplay: true,   
    volume: 0.6,      
    lrcType: 3,       
    order: 'list',    
    audio: [
      {
        name: '一枕秋山',
        artist: '松茶',
        url: '/music/一枕秋山.mp3',
        cover: '/music/4d5a70b253581fa22d8c8187c6f6cd3c.jpg',
        lrc: '/music/一枕秋山.lrc'
      }
    ]
  });

  // 5. 实时监听播放进度
  window.aplayerInstance.on('timeupdate', function () {
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    const lyricTextEl = document.getElementById('lyric-text');
    if (currentLyric && lyricTextEl) {
      if (lyricTextEl.innerText !== currentLyric.innerText) {
        lyricTextEl.innerText = currentLyric.innerText;
      }
    }
  });
  
  window.aplayerInstance.on('pause', function () {
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl) lyricTextEl.innerText = '📜 弦音暂歇';
  });
}