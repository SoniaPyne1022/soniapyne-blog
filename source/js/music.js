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

  // 3. 精准布局注入器：把字幕栏精准塞进你截图里标注的空白处
  const contentInner = document.getElementById('content-inner');
  if (contentInner) {
    contentInner.parentNode.insertBefore(lyricBar, contentInner);
  } else {
    document.body.appendChild(lyricBar); // 如果找不到布局，则备用兜底挂在最底部
  }

  // 4. 初始化 APlayer
  window.aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,      // 吸底挂件模式
    autoplay: true,   // 自动播放
    volume: 0.6,      // 默认音量
    lrcType: 3,       // 开启外部 LRC 歌词文件支持
    order: 'list',    // 列表循环顺序播放
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

  // 5. 实时监听播放进度，将歌词同步镜像到古典字幕栏中
  window.aplayerInstance.on('timeupdate', function () {
    const currentLyric = document.querySelector('.aplayer-lrc-current');
    const lyricTextEl = document.getElementById('lyric-text');
    if (currentLyric && lyricTextEl) {
      if (lyricTextEl.innerText !== currentLyric.innerText) {
        lyricTextEl.innerText = currentLyric.innerText;
      }
    }
  });
  
  // 暂停时状态提示
  window.aplayerInstance.on('pause', function () {
    const lyricTextEl = document.getElementById('lyric-text');
    if (lyricTextEl) lyricTextEl.innerText = '📜 弦音暂歇';
  });
}