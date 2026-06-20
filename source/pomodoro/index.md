---
title: 专注番茄钟
date: 2026-06-20 19:36:00
top_img: false # 可以选择关闭顶部大图，让界面更紧凑
aside: false   # 关闭侧边栏，给番茄钟和记录留出足够空间
pjax: false    # 关键：关闭该页面的PJAX，防止定时器冲突
---

<div id="pomo-container">
  <div class="pomo-timer-box">
    <div id="pomo-status">准备专注</div>
    <div id="pomo-time-display">25:00</div>
    <div class="pomo-controls">
      <button id="pomo-start-btn" onclick="toggleTimer()">开始</button>
      <button id="pomo-reset-btn" onclick="resetTimer()">重置</button>
    </div>
  </div>

  <div class="pomo-history-box">
    <h3>📊 专注历史记录</h3>
    <div class="pomo-table-wrapper">
      <table id="pomo-history-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>专注时长</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody id="pomo-history-body">
          </tbody>
      </table>
    </div>
    <button id="pomo-clear-btn" onclick="clearHistory()">清空所有记录</button>
  </div>
</div>

<style>
/* 样式调优：完美适配 Butterfly 主题的圆角与阴影 */
#pomo-container {
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.pomo-timer-box, .pomo-history-box {
  background: var(--card-bg, #fff);
  padding: 30px;
  border-radius: 12px;
  box-shadow: var(--card-hover-shadow, 0 4px 12px rgba(0,0,0,0.08));
  text-align: center;
  transition: all 0.3s;
}
#pomo-status {
  font-size: 1.2rem;
  color: var(--text-highlight-color, #49b1f5);
  font-weight: bold;
  margin-bottom: 10px;
}
#pomo-time-display {
  font-size: 4rem;
  font-weight: 700;
  font-family: monospace;
  margin: 10px 0 20px 0;
  color: var(--text-main-color, #333);
}
.pomo-controls button, #pomo-clear-btn {
  background: var(--btn-bg, #49b1f5);
  color: #fff;
  border: none;
  padding: 10px 24px;
  margin: 0 10px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.pomo-controls button:hover, #pomo-clear-btn:hover {
  background: var(--btn-hover-bg, #1f91e5);
}
#pomo-clear-btn {
  background: #ff4d4f;
  margin-top: 15px;
  padding: 6px 16px;
  font-size: 0.85rem;
}
#pomo-clear-btn:hover {
  background: #ff7875;
}
.pomo-table-wrapper {
  overflow-x: auto;
  margin-top: 15px;
}
#pomo-history-table {
  width: 100%;
  border-collapse: collapse;
}
#pomo-history-table th, #pomo-history-table td {
  padding: 12px;
  border-bottom: 1px solid var(--light-grey, #eee);
  text-align: center;
}
</style>

<script>
let countdown;
let isRunning = false;
let timeLeft = 25 * 60; // 25分钟默认时长
const defaultTime = 25 * 60;

const display = document.getElementById('pomo-time-display');
const startBtn = document.getElementById('pomo-start-btn');
const statusText = document.getElementById('pomo-status');

// 初始化载入记录
document.addEventListener('DOMContentLoaded', () => {
  updateDisplay(timeLeft);
  renderHistory();
});

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
}

function toggleTimer() {
  if (isRunning) {
    // 暂停逻辑
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = '开始';
    statusText.textContent = '已暂停';
  } else {
    // 开始逻辑
    isRunning = true;
    startBtn.textContent = '暂停';
    statusText.textContent = '🚀 专注中...';
    
    countdown = setInterval(() => {
      timeLeft--;
      updateDisplay(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = '开始';
        statusText.textContent = '🎉 释压一下，完成单次专注！';
        
        // 成功完成，记录数据（25分钟）
        saveRecord(25, '完成');
        timeLeft = defaultTime;
        updateDisplay(timeLeft);
        
        // 播放提示音（可选，使用浏览器自带API）
        playAlert();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  
  // 如果在专注中途重置，可以选择是否记录未完成的时长
  const minutesSpent = Math.floor((defaultTime - timeLeft) / 60);
  if (minutesSpent > 0 && statusText.textContent.includes('专注中')) {
    saveRecord(minutesSpent, '中断');
  }

  timeLeft = defaultTime;
  updateDisplay(timeLeft);
  startBtn.textContent = '开始';
  statusText.textContent = '准备专注';
}

// 存储记录到 LocalStorage
function saveRecord(minutes, status) {
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
  const newRecord = {
    time: new Date().toLocaleString(),
    duration: minutes + ' 分钟',
    status: status
  };
  records.unshift(newRecord); // 最新记录排在前面
  localStorage.setItem('pomo_history', JSON.stringify(records));
  renderHistory();
}

// 渲染历史记录表格
function renderHistory() {
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
  const tbody = document.getElementById('pomo-history-body');
  tbody.innerHTML = '';

  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="color:#999;">暂无专注记录，开始你的第一个番茄钟吧！</td></tr>`;
    return;
  }

  records.forEach(r => {
    const tr = document.createElement('tr');
    const statusStyle = r.status === '完成' ? 'color: #52c41a; font-weight:bold;' : 'color: #faad14;';
    tr.innerHTML = `
      <td>${r.time}</td>
      <td>${r.duration}</td>
      <td style="${statusStyle}">${r.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 清空历史记录
function clearHistory() {
  if (confirm('确定要清空所有的专注历史记录吗？数据将无法恢复。')) {
    localStorage.removeItem('pomo_history');
    renderHistory();
  }
}

// 浏览器音频提示
function playAlert() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5); // 响铃0.5秒
  } catch (e) {
    console.log('Audio context not supported or blocked by browser policy.');
  }
}
</script>