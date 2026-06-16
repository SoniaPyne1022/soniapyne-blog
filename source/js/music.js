// 确保播放器只初始化一次，防止 PJAX 刷新导致重复创建
if (!window.aplayerInstance) {
  // 1. 创建隐藏的原生播放器容器
  const aplayerContainer = document.createElement('div');
  aplayerContainer.id = 'aplayer';
  document.body.appendChild(aplayerContainer);

  // 2. 动态创建长条全局字幕栏
  const lyricBar = document.createElement('div');
  lyricBar.id = 'custom-lyric-bar';
  lyricBar.innerHTML = `
    <div class="lyric-dots">•••••</div>
    <div id="lyric-text">♪ 正在载入背景音乐...</div>
    <div class="lyric-icon"><i class="fas fa-music"></i></div>
  `;
  document.body.appendChild(lyricBar);

  // 3. 初始化 APlayer
  window.aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,      // 吸底挂件模式
    autoplay: true,   // 自动播放
    volume: 0.6,      // 默认音量
    lrcType: 3,       // 开启外部 LRC 歌词文件支持
    order: 'list',    // 💡 播放顺序：'list' 代表顺序播放，'random' 代表随机播放
    audio: [
      // {
      //   name: '一枕秋山',
      //   artist: '松茶',
      //   url: '/music/一枕秋山.mp3',
      //   cover: '/music/4d5a70b253581fa22d8c8187c6f6cd3c.jpg',
      //   lrc: '/music/一枕秋山.lrc'
      // }, // 👈 注意：第一首歌结束的大括号后面一定要有一个【英文逗号】！
      // {
      //   name: '第二首歌名',
      //   artist: '歌手名字',
      //   url: '/music/第二首歌.mp3',
      //   cover: '', // 如果没有封面图，留空字符串即可
      //   lrc: '/music/第二首歌.lrc'
      // },
      {
        name: '一枕秋山',
        artist: '松茶',
        url: '/music/一枕秋山.mp3',
        cover: '/music/4d5a70b253581fa22d8c8187c6f6cd3c.jpg',
        lrc: '/music/一枕秋山.lrc'
      } // 👈 最后一首歌的结尾大括号后面【不需要】加逗号
    ]
  });

  // 4. 实时监听播放进度，将歌词同步镜像到长条字幕栏中
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
    if (lyricTextEl) lyricTextEl.innerText = '🎵 音乐已暂停';
  });
}