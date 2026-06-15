// 确保播放器只初始化一次，防止 PJAX 刷新导致重复创建
if (!window.aplayerInstance) {
  // 在网页底部动态创建一个存放播放器的容器
  const aplayerContainer = document.createElement('div');
  aplayerContainer.id = 'aplayer';
  document.body.appendChild(aplayerContainer);

  // 初始化 APlayer
  window.aplayerInstance = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,      // 吸底挂件模式
    autoplay: true,   // 自动播放
    volume: 100,      // 默认音量
    audio: [
      {
        name: '蝴蝶',
        artist: '洛天依',
        url: '/music/洛天依Official - 蝴蝶.mp3',       // 对应你放在 source/music/ 下的文件名
        // cover: '/music/cover1.jpg'     // 对应你的封面图，没有的话可以删掉这行
      },
    //   {
    //     name: '歌曲名字 2',
    //     artist: '歌手 2',
    //     url: '/music/song2.mp3',
    //     cover: '/music/cover2.jpg'
    //   }
    ]
  });
}