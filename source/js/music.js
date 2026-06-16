// 1. 全局核心播放器初始化（常驻后台，保证切换页面时弦音不断）
if (!window.aplayerInstance) {
  const aplayerContainer = document.createElement('div');
  aplayerContainer.id = 'aplayer';
  document.body.appendChild(aplayerContainer);

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

  // 核心事件监听：实时同步歌词到右侧字幕栏
  window.aplayerInstance.on('timeupdate', function () {
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    const lyricTextEl = document.getElementById('lyric-text');
    if (currentLyric && lyricTextEl && lyricTextEl.innerText !== currentLyric.innerText) {
      lyricTextEl.innerText = currentLyric.innerText;
    }
  });

  // 监听播放状态更新按钮图标
  window.aplayerInstance.on('play', function () {
    const toggleBtn = document.getElementById('custom-btn-toggle');
    if (toggleBtn) { toggleBtn.classList.remove('fa-play'); toggleBtn.classList.add('fa-pause'); }
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl && lyricTextEl.innerText === '📜 弦音暂歇') lyricTextEl.innerText = '✨ 乐音渐起... ✨';
  });

  window.aplayerInstance.on('pause', function () {
    const toggleBtn = document.getElementById('custom-btn-toggle');
    if (toggleBtn) { toggleBtn.classList.remove('fa-pause'); toggleBtn.classList.add('fa-play'); }
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl) lyricTextEl.innerText = '📜 弦音暂歇';
  });

  // 切歌时同步更新控制器的文本与封面
  window.aplayerInstance.on('listswitch', function (data) {
    const titleEl = document.getElementById('custom-player-title');
    const artistEl = document.getElementById('custom-player-artist');
    const coverImg = document.getElementById('custom-player-cover');
    if (titleEl) titleEl.innerText = data.audio.name;
    if (artistEl) artistEl.innerText = data.audio.artist || '';
    if (coverImg) coverImg.src = data.audio.cover || '';
  });
}

// 2. 桌面精细并排组件生成逻辑
function injectCustomMusicUI() {
  const recentPosts = document.getElementById('recent-posts');
  if (!recentPosts || document.getElementById('custom-music-wrapper')) return;

  const currentTrack = window.aplayerInstance.list.audios[window.aplayerInstance.list.index];
  const isPaused = window.aplayerInstance.audio.paused;

  const wrapper = document.createElement('div');
  wrapper.id = 'custom-music-wrapper';
  wrapper.innerHTML = `
    <div id="custom-mini-player">
      <img id="custom-player-cover" src="${currentTrack.cover || ''}">
      <div class="player-info">
        <span id="custom-player-title">${currentTrack.name}</span>
        <span class="player-splitter">-</span>
        <span id="custom-player-artist">${currentTrack.artist || ''}</span>
      </div>
      <div class="player-btns">
        <i id="custom-btn-prev" class="fas fa-step-backward"></i>
        <i id="custom-btn-toggle" class="fas ${isPaused ? 'fa-play' : 'fa-pause'}"></i>
        <i id="custom-btn-next" class="fas fa-step-forward"></i>
      </div>
    </div>
    
    <div id="custom-lyric-bar">
      <div id="lyric-text">✨ 乐音悠扬... ✨</div>
      <div class="lyric-icon"><i class="fas fa-fan"></i></div>
    </div>
  `;

  recentPosts.insertBefore(wrapper, recentPosts.firstChild);

  // 绑定事件
  document.getElementById('custom-btn-toggle').addEventListener('click', () => window.aplayerInstance.toggle());
  document.getElementById('custom-btn-prev').addEventListener('click', () => window.aplayerInstance.skipBack());
  document.getElementById('custom-btn-next').addEventListener('click', () => window.aplayerInstance.skipForward());
}

injectCustomMusicUI();
document.addEventListener('pjax:complete', injectCustomMusicUI);