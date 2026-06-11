/* 鼠标点击弹出小花特效 */
document.addEventListener('click', function (e) {
  // 各种可爱的小花、樱花和闪烁星星
  const flowers = ['🌸', '💮', '🌺', '🌼', '✨', '💮'];
  // 随机选一朵
  const flower = flowers[Math.floor(Math.random() * flowers.length)];
  
  // 创建一个用来承载花朵的标签
  const span = document.createElement('span');
  span.textContent = flower;
  span.style.position = 'absolute';
  // 让小花出现在鼠标点击的中心位置
  span.style.top = `${e.pageY - 15}px`;
  span.style.left = `${e.pageX - 10}px`;
  span.style.zIndex = 999999;
  span.style.fontSize = `${Math.random() * 10 + 14}px`; // 随机大小 (14px ~ 24px)
  span.style.userSelect = 'none';
  span.style.pointerEvents = 'none'; // 确保不阻挡正常的网页点击
  span.style.opacity = '1';
  span.style.transition = 'all 1.2s ease-out'; // 动画过渡时间
  
  document.body.appendChild(span);
  
  // 动画效果：点击后向上缓缓飘动、随机旋转角度、微微放大、然后优雅淡出
  setTimeout(() => {
    const randomX = (Math.random() - 0.5) * 40; // 左右随机轻微晃动
    span.style.transform = `translate(${randomX}px, -60px) rotate(${Math.random() * 360}deg) scale(1.4)`;
    span.style.opacity = '0';
  }, 50);
  
  // 动画结束后，自动把小花从网页里销毁，释放内存
  setTimeout(() => {
    span.remove();
  }, 1250);
});