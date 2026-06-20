---
title: 专注番茄钟
date: 2026-06-20 19:40:00
top_img: false 
aside: false   
pjax: false    
---

<div id="pomo-container">
<div class="pomo-timer-box">
<div class="pomo-settings">
<div class="setting-item">
<label for="pomo-focus-input">🎯 专注时长</label>
<input type="number" id="pomo-focus-input" value="25" min="1" max="120" onchange="handleInputChange()">
<span>分钟</span>
</div>
<div class="setting-item">
<label for="pomo-break-input">☕ 休息时长</label>
<input type="number" id="pomo-break-input" value="5" min="1" max="60" onchange="handleInputChange()">
<span>分钟</span>
</div>
</div>

<hr class="pomo-divider">

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
/* 这里面的内容可以缩进，不会出错 */
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
.pomo-settings {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.setting-item label {
  font-weight: bold;
  color: var(--text-main-color, #333);
}
.setting-item input {
  width: 70px;
  padding: 6px 10px;
  border: 1px solid var(--light-grey, #ccc);
  border-radius: 6px;
  background: var(--background, #fff);
  color: var(--text-main-color, #333);
  text-align: center;
  font-size: 1rem;
}
.pomo-divider {
  margin: 20px auto;
  border: 0;
  border-top: 1px dashed var(--light-grey, #eee);
  width: 80%;
}
#pomo-status {
  font-size: 1.3rem;
  color: var(--text-highlight-color, #49b1f5);
  font-weight: bold;
  margin-bottom: 5px;
}
#pomo-time-display {
  font-size: 4.5rem;
  font-weight: 700;
  font-family: monospace;
  margin: 5px 0 20px 0;
  color: var(--text-main-color, #333);
}
.pomo-controls button, #pomo-clear-btn {
  background: var(--btn-bg, #49b1f5);
  color: #fff;
  border: none;
  padding: 10px 28px;
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
// 这里面的内容可以缩进，不会出错
let countdown;
let isRunning = false;
let currentMode = 'focus'; 
let timeLeft;
let startBtn;
let statusText;
let focusInput;
let breakInput;
let display;

// 确保 DOM 加载完成后再绑定变量和执行逻辑，防止 PJAX 引起的 bug
function initPomodoro() {
  display = document.getElementById('pomo-time-display');
  startBtn = document.getElementById('pomo-start-btn');
  statusText = document.getElementById('pomo-status');
  focusInput = document.getElementById('pomo-focus-input');
  breakInput = document.getElementById('pomo-break-input');

  // 初始化检查，如果找不到元素直接返回（防止在其他页面报错）
  if(!display) return;

  clearInterval(countdown); // 切换页面时重置老计时器
  isRunning = false;
  currentMode = 'focus';

  resetToConfiguredTime();
  renderHistory();
}

// 兼容 PJAX 的加载
if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initPomodoro);
} else {
  document.addEventListener('DOMContentLoaded', initPomodoro);
}

// 如果首屏就是这个页面
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initPomodoro();
}

function resetToConfiguredTime() {
  const minutes = currentMode === 'focus' 
    ? (parseInt(focusInput.value) || 25) 
    : (parseInt(breakInput.value) || 5);
  timeLeft = minutes * 60;
  updateDisplay(timeLeft);
}

function handleInputChange() {
  if (!isRunning) {
    resetToConfiguredTime();
  }
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  if(display) display.textContent = `${mins}:${secs}`;
}

function setInputsDisabled(disabled) {
  if(focusInput) focusInput.disabled = disabled;
  if(breakInput) breakInput.disabled = disabled;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = '开始';
    statusText.textContent = currentMode === 'focus' ? '专注已暂停' : '休息已暂停';
    setInputsDisabled(false);
  } else {
    isRunning = true;
    startBtn.textContent = '暂停';
    setInputsDisabled(true);
    statusText.textContent = currentMode === 'focus' ? '🚀 专注中...' : '☕ 休息中...';
    
    countdown = setInterval(() => {
      timeLeft--;
      updateDisplay(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = '开始';
        setInputsDisabled(false);
        playAlert();

        if (currentMode === 'focus') {
          const configuredFocus = parseInt(focusInput.value) || 25;
          saveRecord(configuredFocus, '完成');
          currentMode = 'break';
          statusText.textContent = '🎉 搞定！点击“开始”享受休息吧';
        } else {
          currentMode = 'focus';
          statusText.textContent = '💪 休息结束，准备新一轮专注！';
        }
        resetToConfiguredTime();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  startBtn.textContent = '开始';
  setInputsDisabled(false);
  
  if (currentMode === 'focus') {
    const configuredFocus = parseInt(focusInput.value) || 25;
    const minutesSpent = Math.floor((configuredFocus * 60 - timeLeft) / 60);
    if (minutesSpent > 0 && statusText.textContent.includes('专注中')) {
      saveRecord(minutesSpent, '中断');
    }
    statusText.textContent = '准备专注';
  } else {
    statusText.textContent = '休息已重置';
  }
  resetToConfiguredTime();
}

function saveRecord(minutes, status) {
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
  const newRecord = {
    time: new Date().toLocaleString(),
    duration: minutes + ' 分钟',
    status: status
  };
  records.unshift(newRecord);
  localStorage.setItem('pomo_history', JSON.stringify(records));
  renderHistory();
}

function renderHistory() {
  const tbody = document.getElementById('pomo-history-body');
  if(!tbody) return;
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
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

function clearHistory() {
  if (confirm('确定要清空所有的专注历史记录吗？')) {
    localStorage.removeItem('pomo_history');
    renderHistory();
  }
}

function playAlert() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.6);
  } catch (e) {
    console.log('Audio context not supported or blocked.');
  }
}
</script>