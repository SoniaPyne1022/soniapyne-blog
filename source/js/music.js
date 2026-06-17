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

  // 核心事件监听：实时同步歌词 与 进度条位置
  window.aplayerInstance.on('timeupdate', function () {
    // 【同步歌词】
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    const lyricTextEl = document.getElementById('lyric-text');
    if (currentLyric && lyricTextEl && lyricTextEl.innerText !== currentLyric.innerText) {
      lyricTextEl.innerText = currentLyric.innerText;
    }

    // 【同步进度条】
    const audio = window.aplayerInstance.audio;
    const progressPlayed = document.getElementById('custom-player-progress-played');
    if (audio && audio.duration && progressPlayed) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressPlayed.style.width = percentage + '%';
    }
  });

  // 监听播放状态更新控制台
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

  window.aplayerInstance.on('listswitch', function (data) {
    const titleEl = document.getElementById('custom-player-title');
    const artistEl = document.getElementById('custom-player-artist');
    const coverImg = document.getElementById('custom-player-cover');
    if (titleEl) titleEl.innerText = data.audio.name;
    if (artistEl) artistEl.innerText = data.audio.artist || '';
    if (coverImg) coverImg.src = data.audio.cover || '';
  });
}

// 2. 桌面组件生成与拖拽核心逻辑
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
      
      <div id="custom-player-progress-wrapper" class="player-progress-wrapper">
        <div id="custom-player-progress-played" class="player-progress-played">
          <div class="player-progress-dot"></div>
        </div>
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

  // 绑定常规按钮切歌/暂停事件
  document.getElementById('custom-btn-toggle').addEventListener('click', () => window.aplayerInstance.toggle());
  document.getElementById('custom-btn-prev').addEventListener('click', () => window.aplayerInstance.skipBack());
  document.getElementById('custom-btn-next').addEventListener('click', () => window.aplayerInstance.skipForward());

  // 🟢 核心算法：进度条点击与拖拽跳转逻辑
  const progressWrapper = document.getElementById('custom-player-progress-wrapper');
  if (progressWrapper) {
    let isDragging = false;

    const handleSeek = (e) => {
      const rect = progressWrapper.getBoundingClientRect();
      // 兼容鼠标点击与手机触屏多端坐标
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      let clickX = clientX - rect.left;
      let percentage = clickX / rect.width;
      
      if (percentage < 0) percentage = 0;
      if (percentage > 1) percentage = 1;
      
      const duration = window.aplayerInstance.audio.duration;
      if (duration) {
        // 更新本地视觉样式，防止拖拽时出现明显的断点卡顿
        const progressPlayed = document.getElementById('custom-player-progress-played');
        if (progressPlayed) progressPlayed.style.width = (percentage * 100) + '%';
        // 让底层核心 APlayer 跳转到指定时间
        window.aplayerInstance.seek(percentage * duration);
      }
    };

    // 鼠标点击跳转
    progressWrapper.addEventListener('click', handleSeek);

    // 鼠标按住拖拽
    progressWrapper.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mousemove', (e) => { if (isDragging) handleSeek(e); });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // 移动端手指触屏拖拽
    progressWrapper.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchmove', (e) => { if (isDragging) { e.preventDefault(); handleSeek(e); } }, { passive: false });
    window.addEventListener('touchend', () => { isDragging = false; });
  }
}

injectCustomMusicUI();
document.addEventListener('pjax:complete', injectCustomMusicUI);


// ==================== 右下角小人点击互动挂件（支持 PJAX） ====================
function initPetInteraction() {
  // 🔍 核心定位：请确保你的右下角小人图片或容器带有一个类名或ID
  // 这里默认尝试抓取常见的 class，如果你知道它的确切 id，可以改成 document.getElementById('你的ID')
  const pet = document.querySelector('.custom-pet') || document.querySelector('[class*="pet"]') || document.querySelector('[id*="pet"]');
  
  if (!pet) return; // 如果在当前页面没找到小人，则静默退出

  // 检查并创建全局唯一的对话气泡，防止 PJAX 刷新导致重复生成
  let bubble = document.getElementById('pet-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'pet-bubble';
    document.body.appendChild(bubble);
  }

  // 📜 独家定制的典雅话术库（每次点击随机展示一句）
  const messages = [
    "戳我做什么？莫非是想听曲了？唱片正转着呢~",
    "就让自己的胸襟，不止是一潭水，而是一座湖泊，一片海阔天空，你的眼界，就会更阔。✨",
    "清风拂兮竹心涤，明眸盼兮秋水离，美人坐兮抚弦音，有客来兮寥听意。🍃",
    "韶华不负，今日也是元气满满的一天呀！",
    "浮生若梦，何妨在此一歇，看看文章？📜",
    "弦音未绝，侠骨香飘。今天也要开开心心哦！"
  ];

  let timer = null;
  pet.style.cursor = 'pointer'; // 鼠标移上去自动变成“小手”形状，提示可点击

  // 绑定点击事件
  pet.addEventListener('click', function (e) {
    e.stopPropagation(); // 阻止事件冒泡

    // 随机抽取一句台词
    const randomText = messages[Math.floor(Math.random() * messages.length)];
    bubble.innerText = randomText;

    // 📐 核心算法：实时动态计算小人当前在屏幕上的绝对位置，把气泡完美钉在小人头顶正中间
    const rect = pet.getBoundingClientRect();
    bubble.style.left = (rect.left + rect.width / 2) + 'px';
    bubble.style.bottom = (window.innerHeight - rect.top + 12) + 'px'; /* 12px 为距离头顶的间隙 */

    // 弹出气泡
    bubble.classList.add('show');

    // 4秒后气泡自动平滑隐去
    clearTimeout(timer);
    timer = setTimeout(() => {
      bubble.classList.remove('show');
    }, 4000);
  });
}

// 确保首次进入网页和执行 PJAX 异步切换页面时，互动都能百分之百完美绑定
initPetInteraction();
document.addEventListener('pjax:complete', initPetInteraction);