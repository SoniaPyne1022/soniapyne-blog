---
title: 专注番茄钟
date: 2026-06-20 19:55:00
top_img: false 
aside: false   
pjax: false    
---

<div id="pomo-container">
<div class="pomo-timer-box">

<div id="pomo-prompt-overlay" style="display: none;">
<div id="pomo-prompt-text">🎯 专注完成！要开启休息吗？(30秒后自动进入下一轮专注)</div>
<div class="pomo-prompt-controls">
<button id="pomo-confirm-yes" onclick="choosePrompt('yes')">☕ 开始休息</button>
<button id="pomo-confirm-no" onclick="choosePrompt('no')">💪 不歇了，继续专注</button>
</div>
</div>

<div class="pomo-task-area">
<input type="text" id="pomo-task-input" placeholder="✨ 这轮专注你打算做点什么...？(例如：修改大创报告)">
</div>

<div class="pomo-settings">
<div class="setting-item">
<label for="pomo-focus-input">🎯 专注</label>
<input type="number" id="pomo-focus-input" value="25" min="1" max="120" onchange="handleInputChange()">
<span>分钟</span>
</div>
<div class="setting-item">
<label for="pomo-break-input">☕ 休息</label>
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
<th>任务内容</th>
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
#pomo-container { max-width: 800px; margin: 20px auto; display: flex; flex-direction: column; gap: 30px; }
.pomo-timer-box { position: relative; background: var(--card-bg, #fff); padding: 30px; border-radius: 12px; box-shadow: var(--card-hover-shadow, 0 4px 12px rgba(0,0,0,0.08)); text-align: center; transition: all 0.3s; overflow: hidden; }
#pomo-prompt-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--card-bg, #fff); z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding: 20px; box-sizing: border-box; }
#pomo-prompt-text { font-size: 1.25rem; font-weight: bold; color: var(--text-main-color, #333); line-height: 1.6; }
.pomo-prompt-controls button { border: none; padding: 12px 24px; margin: 0 10px; border-radius: 8px; font-size: 1rem; cursor: pointer; color: #fff; transition: opacity 0.2s; }
#pomo-confirm-yes { background: var(--btn-bg, #49b1f5); }
#pomo-confirm-no { background: #858585; }

/* 新增任务框样式 */
.pomo-task-area { margin-bottom: 20px; }
#pomo-task-input { width: 80%; max-width: 500px; padding: 10px 16px; border: 1px solid var(--light-grey, #eee); border-radius: 20px; background: var(--background, #f9f9f9); color: var(--text-main-color, #333); text-align: center; font-size: 0.95rem; outline: none; transition: all 0.3s; }
#pomo-task-input:focus { border-color: var(--btn-bg, #49b1f5); box-shadow: 0 0 5px rgba(73,177,245,0.3); }

.pomo-settings { display: flex; justify-content: center; gap: 30px; margin-bottom: 15px; flex-wrap: wrap; }
.setting-item { display: flex; align-items: center; gap: 6px; }
.setting-item label { font-weight: bold; color: var(--text-main-color, #333); }
.setting-item input { width: 60px; padding: 6px; border: 1px solid var(--light-grey, #ccc); border-radius: 6px; background: var(--background, #fff); color: var(--text-main-color, #333); text-align: center; }
.pomo-divider { margin: 20px auto; border: 0; border-top: 1px dashed var(--light-grey, #eee); width: 80%; }
#pomo-status { font-size: 1.3rem; color: var(--text-highlight-color, #49b1f5); font-weight: bold; margin-bottom: 5px; }
#pomo-time-display { font-size: 4.5rem; font-weight: 700; font-family: monospace; margin: 5px 0 20px 0; color: var(--text-main-color, #333); }
.pomo-controls button, #pomo-clear-btn { background: var(--btn-bg, #49b1f5); color: #fff; border: none; padding: 10px 28px; margin: 0 10px; border-radius: 8px; font-size: 1rem; cursor: pointer; }
#pomo-clear-btn { background: #ff4d4f; margin-top: 15px; padding: 6px 16px; font-size: 0.85rem; }
.pomo-table-wrapper { overflow-x: auto; margin-top: 15px; }
#pomo-history-table { width: 100%; border-collapse: collapse; }
#pomo-history-table th, #pomo-history-table td { padding: 12px; border-bottom: 1px solid var(--light-grey, #eee); text-align: center; }
</style>

<script>
let countdown, promptInterval;
let isRunning = false;
let currentMode = 'focus'; 
let timeLeft, promptTimeLeft = 30;
let originalTitle = document.title; // 记录最初的博客标题

let startBtn, statusText, focusInput, breakInput, display, promptOverlay, promptText, taskInput;

function initPomodoro() {
  display = document.getElementById('pomo-time-display');
  startBtn = document.getElementById('pomo-start-btn');
  statusText = document.getElementById('pomo-status');
  focusInput = document.getElementById('pomo-focus-input');
  breakInput = document.getElementById('pomo-break-input');
  promptOverlay = document.getElementById('pomo-prompt-overlay');
  promptText = document.getElementById('pomo-prompt-text');
  taskInput = document.getElementById('pomo-task-input');

  if(!display) return;

  clearInterval(countdown);
  clearInterval(promptInterval);
  if(promptOverlay) promptOverlay.style.display = 'none';
  document.title = originalTitle; // 页面初始化还原标题
  
  isRunning = false;
  currentMode = 'focus';
  resetToConfiguredTime();
  renderHistory();
}

if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initPomodoro);
} else {
  document.addEventListener('DOMContentLoaded', initPomodoro);
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initPomodoro();
}

function resetToConfiguredTime() {
  const minutes = currentMode === 'focus' ? (parseInt(focusInput.value) || 25) : (parseInt(breakInput.value) || 5);
  timeLeft = minutes * 60;
  updateDisplay(timeLeft);
}

function handleInputChange() {
  if (!isRunning) resetToConfiguredTime();
}

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  if(display) display.textContent = `${mins}:${secs}`;
  
  // 功能1实现：动态修改浏览器标签页标题
  if (isRunning) {
    const icon = currentMode === 'focus' ? '🚀' : '☕';
    const statusWord = currentMode === 'focus' ? '专注中' : '休息中';
    document.title = `(${mins}:${secs}) ${icon} ${statusWord} | ${originalTitle}`;
  } else {
    document.title = originalTitle; // 暂停或重置时还原
  }
}

function setInputsDisabled(disabled) {
  if(focusInput) focusInput.disabled = disabled;
  if(breakInput) breakInput.disabled = disabled;
  if(taskInput) taskInput.disabled = disabled; // 倒计时期间不允许改任务
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = '开始';
    statusText.textContent = currentMode === 'focus' ? '专注已暂停' : '休息已暂停';
    setInputsDisabled(false);
    document.title = originalTitle;
  } else {
    autoStartTimer();
  }
}

function autoStartTimer() {
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
      document.title = originalTitle;
      playAlert();

      if (currentMode === 'focus') {
        const configuredFocus = parseInt(focusInput.value) || 25;
        saveRecord(configuredFocus, '完成'); // 结算
        triggerBreakPrompt();
      } else {
        currentMode = 'focus';
        statusText.textContent = '💪 休息结束，准备新一轮专注！';
        resetToConfiguredTime();
      }
    }
  }, 1000);
}

function triggerBreakPrompt() {
  if (!promptOverlay || !promptText) return;
  promptOverlay.style.display = 'flex';
  promptTimeLeft = 30;
  promptText.innerHTML = `🎯 单次专注已完成！<br>要开始休息吗？<br><span style="color:#ff4d4f; font-size:1.1rem;">⏱️ ${promptTimeLeft} 秒后将自动开启下一轮专注</span>`;

  promptInterval = setInterval(() => {
    promptTimeLeft--;
    promptText.innerHTML = `🎯 单次专注已完成！<br>要开始休息吗？<br><span style="color:#ff4d4f; font-size:1.1rem;">⏱️ ${promptTimeLeft} 秒后将自动开启下一轮专注</span>`;
    
    if (promptTimeLeft <= 0) {
      clearInterval(promptInterval);
      promptOverlay.style.display = 'none';
      currentMode = 'focus';
      resetToConfiguredTime();
      autoStartTimer();
    }
  }, 1000);
}

function choosePrompt(choice) {
  clearInterval(promptInterval);
  if(promptOverlay) promptOverlay.style.display = 'none';
  if (choice === 'yes') {
    currentMode = 'break';
  } else {
    currentMode = 'focus';
  }
  resetToConfiguredTime();
  autoStartTimer();
}

function resetTimer() {
  clearInterval(countdown);
  clearInterval(promptInterval);
  if(promptOverlay) promptOverlay.style.display = 'none';
  
  isRunning = false;
  startBtn.textContent = '开始';
  setInputsDisabled(false);
  document.title = originalTitle;
  
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

// 存储记录（带任务名字）
function saveRecord(minutes, status) {
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
  const taskName = taskInput && taskInput.value.trim() ? taskInput.value.trim() : '未命名专注任务';
  const newRecord = {
    time: new Date().toLocaleString(),
    task: taskName, // 存入任务名
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
    tbody.innerHTML = `<tr><td colspan="4" style="color:#999;">暂无专注记录，开始你的第一个番茄钟吧！</td></tr>`;
    return;
  }

  records.forEach(r => {
    const tr = document.createElement('tr');
    const statusStyle = r.status === '完成' ? 'color: #52c41a; font-weight:bold;' : 'color: #faad14;';
    tr.innerHTML = `
      <td>${r.time}</td>
      <td style="color: var(--text-main-color); max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${r.task || '无'}</td>
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
  } catch (e) { console.log('Audio error:', e); }
}
</script>