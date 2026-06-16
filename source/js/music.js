// 1. 全局核心播放器初始化（常驻后台，保证切换页面时弦音不断）
if (!window.aplayerInstance) {
  const aplayerContainer = document.createElement('div');
  aplayerContainer.id = 'aplayer';
  document.body.appendChild(aplayerContainer);

  window.aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,      // 吸底常驻
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
      // 如果有多首歌曲，在这里继续用逗号隔开追加大括号即可
    ]
  });

  // 全局核心事件监听：将状态和歌词实时同步传导给桌面的遥控组件
  window.aplayerInstance.on('timeupdate', function () {
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    const lyricTextEl = document.getElementById('lyric-text');
    if (currentLyric && lyricTextEl && lyricTextEl.innerText !== currentLyric.innerText) {
      lyricTextEl.innerText = currentLyric.innerText;
    }
  });

  window.aplayerInstance.on('play', function () {
    const toggleBtn = document.getElementById('custom-btn-toggle');
    const coverImg = document.getElementById('custom-player-cover');
    if (toggleBtn) { toggleBtn.classList.remove('fa-play'); toggleBtn.classList.add('fa-pause'); }
    if (coverImg) coverImg.classList.add('spinning');
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl && lyricTextEl.innerText === '📜 弦音暂歇') lyricTextEl.innerText = '✨ 乐音渐起... ✨';
  });

  window.aplayerInstance.on('pause', function () {
    const toggleBtn = document.getElementById('custom-btn-toggle');
    const coverImg = document.getElementById('custom-player-cover');
    if (toggleBtn) { toggleBtn.classList.remove('fa-pause'); toggleBtn.classList.add('fa-play'); }
    if (coverImg) coverImg.classList.remove('spinning');
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl) lyricTextEl.innerText = '📜 弦音暂歇';
  });

  window.aplayerInstance.on('listswitch', function (data) {
    const titleEl = document.getElementById('custom-player-title');
    const coverImg = document.getElementById('custom-player-cover');
    if (titleEl) titleEl.innerText = data.audio.name;
    if (coverImg) coverImg.src = data.audio.cover || '';
  });
}

// 2. 桌面并排视觉组件生成逻辑（支持 PJAX 页面跳转重载）
function injectCustomMusicUI() {
  const recentPosts = document.getElementById('recent-posts');
  // 如果不在首页（找不到文章流），或者页面上已经存在该组件，则不重复创建
  if (!recentPosts || document.getElementById('custom-music-wrapper')) return;

  const currentTrack = window.aplayerInstance.list.audios[window.aplayerInstance.list.index];
  const isPaused = window.aplayerInstance.audio.paused;

  // 创建并排大外壳
  const wrapper = document.createElement('div');
  wrapper.id = 'custom-music-wrapper';
  wrapper.innerHTML = `
    <!-- 【左侧】：典雅迷你播放遥控器 -->
    <div id="custom-mini-player">
      <div class="cover-box">
        <img id="custom-player-cover" src="${currentTrack.cover || ''}" class="${isPaused ? '' : 'spinning'}">
      </div>
      <div class="player-meta">
        <div id="custom-player-title">${currentTrack.name}</div>
        <div class="player-btns">
          <i id="custom-btn-prev" class="fas fa-step-backward" title="上一首"></i>
          <i id="custom-btn-toggle" class="fas ${isPaused ? 'fa-play' : 'fa-pause'}" title="播放/暂停"></i>
          <i id="custom-btn-next" class="fas fa-step-forward" title="下一首"></i>
        </div>
      </div>
    </div>
    
    <!-- 【右侧】：古朴大字号字幕栏 -->
    <div id="custom-lyric-bar">
      <div class="lyric-dots">✦ ✦ ✦</div>
      <div id="lyric-text">✨ 乐音悠扬... ✨</div>
      <div class="lyric-icon"><i class="fas fa-fan"></i></div>
    </div>
  `;

  // 塞入右侧文章流的最顶端
  recentPosts.insertBefore(wrapper, recentPosts.firstChild);

  // 为遥控按钮绑定真正的核心播放器动作
  document.getElementById('custom-btn-toggle').addEventListener('click', () => window.aplayerInstance.toggle());
  document.getElementById('custom-btn-prev').addEventListener('click', () => window.aplayerInstance.skipBack());
  document.getElementById('custom-btn-next').addEventListener('click', () => window.aplayerInstance.skipForward());
}

// 首次进入网页时加载
injectCustomMusicUI();

// 核心解药：监听 Butterfly 博客切换页面的完成事件，回首页时自动重新绑定，音乐绝不断流
document.addEventListener('pjax:complete', injectCustomMusicUI);