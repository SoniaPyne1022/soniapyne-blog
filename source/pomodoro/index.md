---
title: 沉浸式专注工作台
date: 2026-06-20 20:00:00
top_img: false 
aside: false   
pjax: false    
---

<div id="pomo-container">

<div class="pomo-flex-layout">

<div class="pomo-timer-box">
<div id="pomo-prompt-overlay" style="display: none;">
<div id="pomo-prompt-text">🎯 专注完成！要开启休息吗？(30秒后自动进入下一轮专注)</div>
<div class="pomo-prompt-controls">
<button id="pomo-confirm-yes" onclick="choosePrompt('yes')">☕ 开始休息</button>
<button id="pomo-confirm-no" onclick="choosePrompt('no')">💪 不歇了，继续专注</button>
</div>
</div>

<div class="pomo-card-header">🎯 番茄倒计时</div>

<div class="pomo-task-area">
<input type="text" id="pomo-task-input" placeholder="✨ 这轮番茄钟你打算做点什么...？">
</div>

<div class="pomo-settings">
<div class="setting-item">
<label for="pomo-focus-input">专注</label>
<input type="number" id="pomo-focus-input" value="25" min="1" max="120" onchange="handleInputChange()">
<span>分</span>
</div>
<div class="setting-item">
<label for="pomo-break-input">休息</label>
<input type="number" id="pomo-break-input" value="5" min="1" max="60" onchange="handleInputChange()">
<span>分</span>
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


<div class="stopwatch-box">
<div class="pomo-card-header">⏱️ 流式正向计时</div>

<div class="pomo-task-area">
<input type="text" id="sw-task-input" placeholder="✨ 开启不设限的沉浸心流状态...">
</div>

<div class="sw-tip">适合深度钻研、刷题或Debug，无闹铃打扰</div>
<hr class="pomo-divider" style="margin-top: 24px;">

<div id="sw-status">心流未开启</div>
<div id="sw-time-display">00:00:00</div>
<div class="pomo-controls">
<button id="sw-start-btn" onclick="toggleStopwatch()">开始</button>
<button id="sw-save-btn" onclick="saveStopwatch()">结束并记录</button>
</div>
</div>

</div>
<div class="pomo-history-box">
<h3>📊 专注历史工作台</h3>
<div class="pomo-table-wrapper">
<table id="pomo-history-table">
<thead>
<tr>
<th>结算时间</th>
<th>任务内容</th>
<th>专注时长</th>
<th>计时模式</th>
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
/* 核心 Flex 布局：PC端并列，手机端自动单列堆叠 */
#pomo-container { max-width: 1000px; margin: 20px auto; display: flex; flex-direction: column; gap: 30px; }
.pomo-flex-layout { display: flex; gap: 25px; width: 100%; flex-wrap: wrap; }
.pomo-timer-box, .stopwatch-box { flex: 1; min-width: 320px; position: relative; background: var(--card-bg, #fff); padding: 25px; border-radius: 12px; box-shadow: var(--card-hover-shadow, 0 4px 12px rgba(0,0,0,0.08)); text-align: center; transition: all 0.3s; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }

/* 标题样式 */
.pomo-card-header { font-size: 1.2rem; font-weight: bold; margin-bottom: 15px; color: var(--text-main-color, #333); border-bottom: 2px solid var(--btn-bg, #49b1f5); padding-bottom: 5px; display: inline-block; margin: 0 auto 15px auto; }

/* 30秒询问遮罩层 */
#pomo-prompt-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--card-bg, #fff); z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding: 20px; box-sizing: border-box; }
#pomo-prompt-text { font-size: 1.15rem; font-weight: bold; color: var(--text-main-color, #333); line-height: 1.6; }
.pomo-prompt-controls button { border: none; padding: 10px 20px; margin: 0 8px; border-radius: 8px; font-size: 0.95rem; cursor: pointer; color: #fff; }
#pomo-confirm-yes { background: var(--btn-bg, #49b1f5); }
#pomo-confirm-no { background: #858585; }

/* 任务输入框 */
.pomo-task-area { margin-bottom: 12px; }
#pomo-task-input, #sw-task-input { width: 90%; padding: 8px 14px; border: 1px solid var(--light-grey, #eee); border-radius: 20px; background: var(--background, #f9f9f9); color: var(--text-main-color, #333); text-align: center; font-size: 0.9rem; outline: none; transition: all 0.3s; }
#pomo-task-input:focus, #sw-task-input:focus { border-color: var(--btn-bg, #49b1f5); box-shadow: 0 0 5px rgba(73,177,245,0.3); }

/* 正向计时提示语 */
.sw-tip { font-size: 0.85rem; color: #999; margin-top: 5px; }

/* 时长设置 */
.pomo-settings { display: flex; justify-content: center; gap: 15px; margin-bottom: 10px; }
.setting-item { display: flex; align-items: center; gap: 4px; font-size: 0.9rem; }
.setting-item label { font-weight: bold; color: var(--text-main-color, #333); }
.setting-item input { width: 50px; padding: 4px; border: 1px solid var(--light-grey, #ccc); border-radius: 6px; background: var(--background, #fff); color: var(--text-main-color, #333); text-align: center; }

.pomo-divider { margin: 15px auto; border: 0; border-top: 1px dashed var(--light-grey, #eee); width: 85%; }
#pomo-status, #sw-status { font-size: 1.1rem; color: var(--text-highlight-color, #49b1f5); font-weight: bold; margin-bottom: 5px; }
#sw-status { color: #2ec4b6; }
#pomo-time-display, #sw-time-display { font-size: 3.8rem; font-weight: 700; font-family: monospace; margin: 5px 0 15px 0; color: var(--text-main-color, #333); }

/* 控制按钮 */
.pomo-controls button, #pomo-clear-btn { background: var(--btn-bg, #49b1f5); color: #fff; border: none; padding: 8px 24px; margin: 0 6px; border-radius: 8px; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
.pomo-controls button:hover { opacity: 0.9; }
#sw-start-btn { background: #2ec4b6; }
#sw-save-btn { background: #70e000; }
#pomo-clear-btn { background: #ff4d4f; margin-top: 15px; padding: 6px 16px; font-size: 0.85rem; }

/* 历史表格 */
.pomo-history-box { background: var(--card-bg, #fff); padding: 25px; border-radius: 12px; box-shadow: var(--card-hover-shadow, 0 4px 12px rgba(0,0,0,0.08)); text-align: center; }
.pomo-table-wrapper { overflow-x: auto; margin-top: 15px; }
#pomo-history-table { width: 100%; border-collapse: collapse; }
#pomo-history-table th, #pomo-history-table td { padding: 12px; border-bottom: 1px solid var(--light-grey, #eee); text-align: center; }
</style>

<script>
// ================= 全局状态变量 =================
let countdown, promptInterval;
let isRunning = false;
let currentMode = 'focus'; 
let timeLeft, promptTimeLeft = 30;

// 新增：正向计时秒表变量
let stopwatchInterval;
let swRunning = false;
let swSeconds = 0;

let originalTitle = document.title;

// DOM 节点变量
let startBtn, statusText, focusInput, breakInput, display, promptOverlay, promptText, taskInput;
let swStartBtn, swStatusText, swDisplay, swTaskInput;

function initPomodoro() {
  // 绑定番茄钟节点
  display = document.getElementById('pomo-time-display');
  startBtn = document.getElementById('pomo-start-btn');
  statusText = document.getElementById('pomo-status');
  focusInput = document.getElementById('pomo-focus-input');
  breakInput = document.getElementById('pomo-break-input');
  promptOverlay = document.getElementById('pomo-prompt-overlay');
  promptText = document.getElementById('pomo-prompt-text');
  taskInput = document.getElementById('pomo-task-input');

  // 绑定正向计时秒表节点
  swStartBtn = document.getElementById('sw-start-btn');
  swStatusText = document.getElementById('sw-status');
  swDisplay = document.getElementById('sw-time-display');
  swTaskInput = document.getElementById('sw-task-input');

  if(!display || !swDisplay) return;

  // 清除所有潜在定时器
  clearInterval(countdown);
  clearInterval(promptInterval);
  clearInterval(stopwatchInterval);
  
  if(promptOverlay) promptOverlay.style.display = 'none';
  document.title = originalTitle;
  
  isRunning = false;
  swRunning = false;
  swSeconds = 0;
  currentMode = 'focus';

  resetToConfiguredTime();
  updateSwDisplay();
  renderHistory();
}

// PJAX 与首屏加载监听
if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initPomodoro);
} else {
  document.addEventListener('DOMContentLoaded', initPomodoro);
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initPomodoro();
}

// ================= 核心逻辑：番茄钟（倒计时） =================
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
  updateTabTitle();
}

function setInputsDisabled(disabled) {
  if(focusInput) focusInput.disabled = disabled;
  if(breakInput) breakInput.disabled = disabled;
  if(taskInput) taskInput.disabled = disabled;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = '开始';
    statusText.textContent = currentMode === 'focus' ? '专注已暂停' : '休息已暂停';
    setInputsDisabled(false);
    updateTabTitle();
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
      updateTabTitle();
      playAlert();

      if (currentMode === 'focus') {
        const configuredFocus = parseInt(focusInput.value) || 25;
        saveRecord(taskInput.value.trim() || '未命名番茄任务', configuredFocus + ' 分钟', '完成 (番茄钟)');
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
  promptText.innerHTML = `🎯 单次专注已完成！<br>要开始休息吗？<br><span style="color:#ff4d4f; font-size:1.05rem;">⏱️ ${promptTimeLeft} 秒后将自动开启下一轮专注</span>`;

  promptInterval = setInterval(() => {
    promptTimeLeft--;
    promptText.innerHTML = `🎯 单次专注已完成！<br>要开始休息吗？<br><span style="color:#ff4d4f; font-size:1.05rem;">⏱️ ${promptTimeLeft} 秒后将自动开启下一轮专注</span>`;
    
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
  currentMode = choice === 'yes' ? 'break' : 'focus';
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
  
  if (currentMode === 'focus') {
    const configuredFocus = parseInt(focusInput.value) || 25;
    const minutesSpent = Math.floor((configuredFocus * 60 - timeLeft) / 60);
    if (minutesSpent > 0 && statusText.textContent.includes('专注中')) {
      saveRecord(taskInput.value.trim() || '未命名番茄任务', minutesSpent + ' 分钟', '中断 (番茄钟)');
    }
    statusText.textContent = '准备专注';
  } else {
    statusText.textContent = '休息已重置';
  }
  resetToConfiguredTime();
}

// ================= 新增核心逻辑：正向计时器（秒表） =================
function toggleStopwatch() {
  if (swRunning) {
    // 暂停秒表
    clearInterval(stopwatchInterval);
    swRunning = false;
    swStartBtn.textContent = '继续';
    swStatusText.textContent = '心流已暂停';
    updateTabTitle();
  } else {
    // 开启/续跑秒表
    swRunning = true;
    swStartBtn.textContent = '暂停';
    swStatusText.textContent = '🌊 深度心流中...';
    if(swTaskInput) swTaskInput.disabled = true;

    stopwatchInterval = setInterval(() => {
      swSeconds++;
      updateSwDisplay();
    }, 1000);
  }
}

function updateSwDisplay() {
  const hrs = Math.floor(swSeconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((swSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (swSeconds % 60).toString().padStart(2, '0');
  if(swDisplay) swDisplay.textContent = `${hrs}:${mins}:${secs}`;
  updateTabTitle();
}

function saveStopwatch() {
  if (swSeconds === 0) {
    alert('计时尚未开启，无法结束记录哦~');
    return;
  }
  
  clearInterval(stopwatchInterval);
  swRunning = false;
  
  // 计算可读写的时长
  let durationStr = '';
  const hrs = Math.floor(swSeconds / 3600);
  const mins = Math.floor((swSeconds % 3600) / 60);
  const secs = swSeconds % 60;
  
  if (hrs > 0) durationStr += hrs + '小时';
  if (mins > 0 || hrs > 0) durationStr += mins + '分钟';
  durationStr += secs + '秒';

  // 写入历史记录
  const taskName = swTaskInput && swTaskInput.value.trim() ? swTaskInput.value.trim() : '流式自主专注';
  saveRecord(taskName, durationStr, '完成 (正向计时)');

  // 数据彻底重置
  swSeconds = 0;
  updateSwDisplay();
  swStartBtn.textContent = '开始';
  swStatusText.textContent = '记录成功！心流已闭环';
  if(swTaskInput) {
    swTaskInput.disabled = false;
    swTaskInput.value = '';
  }
}

// ================= 联动逻辑：动态浏览器标签页标题 =================
function updateTabTitle() {
  if (isRunning) {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    const icon = currentMode === 'focus' ? '🚀' : '☕';
    document.title = `(${mins}:${secs}) ${icon} 番茄中... | ${originalTitle}`;
  } else if (swRunning) {
    const mins = Math.floor((swSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (swSeconds % 60).toString().padStart(2, '0');
    document.title = `(${mins}:${secs}) 🌊 心流中... | ${originalTitle}`;
  } else {
    document.title = originalTitle;
  }
}

// ================= 数据持久化与渲染 =================
function saveRecord(task, duration, status) {
  const records = JSON.parse(localStorage.getItem('pomo_history') || '[]');
  const newRecord = {
    time: new Date().toLocaleString(),
    task: task,
    duration: duration,
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
    tbody.innerHTML = `<tr><td colspan="4" style="color:#999;">工作台空空如也，开启你的高效交响乐吧！</td></tr>`;
    return;
  }

  records.forEach(r => {
    const tr = document.createElement('tr');
    
    // 智能渲染标签颜色
    let statusStyle = 'color: #faad14;'; // 默认中断
    if (r.status.includes('完成')) {
      statusStyle = r.status.includes('正向') ? 'color: #2ec4b6; font-weight:bold;' : 'color: #52c41a; font-weight:bold;';
    }
    
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
  if (confirm('确定要清空工作台所有的专注历史记录吗？')) {
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