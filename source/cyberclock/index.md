---
title: 赛博时空罗盘
date: 2026-06-20 20:10:00
top_img: false
aside: false
pjax: false
---

<!-- 警告：以下所有 HTML 标签必须顶格左对齐，不能有任何前置空格或 Tab -->
<div id="cyber-clock-container">
<!-- 左侧：3D赛博时空罗盘 -->
<div class="clock-dial-box">
<div class="matrix-bg"></div>
<div class="compass-wrapper">
<!-- 外环：干支地支环 -->
<div id="ring-earthly" class="compass-ring ring-outer"></div>
<!-- 中环：五行八卦流光环 -->
<div id="ring-elements" class="compass-ring ring-middle">
<div class="element-node e-mu">木</div>
<div class="element-node e-huo">火</div>
<div class="element-node e-tu">土</div>
<div class="element-node e-jin">金</div>
<div class="element-node e-shui">水</div>
</div>
<!-- 内心：太极内核 -->
<div class="compass-center">
<div class="taichi-logo">☯</div>
</div>
</div>
</div>

<!-- 右侧：时空解构面板与占卜卡片 -->
<div class="clock-info-box">
<h2 class="mystic-title">⚡ 赛博时空解构器</h2>
<p class="mystic-subtitle">实时追踪宇宙弦波动与传统历法时空能量</p>
<div class="deconstruct-display">
<div class="dec-item">
<span class="dec-label">当前公历</span>
<span id="dec-gregorian" class="dec-val">-</span>
</div>
<div class="dec-item">
<span class="dec-label">解构时辰</span>
<span id="dec-shichen" class="dec-val mystic-highlight">-</span>
</div>
<div class="dec-item">
<span class="dec-label">考时定刻</span>
<span id="dec-ke" class="dec-val mystic-highlight">-</span>
</div>
</div>

<button class="mystic-btn" onclick="triggerDivination()">⚡ 解构当下时空因果</button>

<!-- 动态弹出的测时/气场运势卡片 -->
<div id="divination-card" class="divination-card" style="display: none;">
<div class="card-header">
<span id="card-element-tag" class="element-tag">水</span>
<h3 id="card-title">时空波动报告</h3>
</div>
<div id="card-desc" class="card-body">
正在读取五行气场消长...
</div>
<div class="card-footer">
<div class="footer-item"><strong>宜：</strong><span id="card-yi">-</span></div>
<div class="footer-item"><strong>忌：</strong><span id="card-ji">-</span></div>
</div>
</div>
</div>
</div>

<style>
/* Style 和 Script 标签内部的缩进是安全的，可以保留 */
#cyber-clock-container {
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
.clock-dial-box, .clock-info-box {
  flex: 1;
  min-width: 320px;
  background: var(--card-bg, #fff);
  padding: 35px;
  border-radius: 16px;
  box-shadow: var(--card-hover-shadow, 0 4px 15px rgba(0,0,0,0.06));
  box-sizing: border-box;
}
.clock-dial-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: radial-gradient(circle at center, var(--card-bg, #fff) 40%, var(--background, #f0f2f5) 100%);
  overflow: hidden;
}
.compass-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.compass-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed var(--btn-bg, #49b1f5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.1, 0.8, 0.25, 1);
}
.ring-outer {
  width: 300px;
  height: 300px;
  animation: spinClockwise 60s linear infinite reverse;
}
.ring-middle {
  width: 200px;
  height: 200px;
  animation: spinClockwise 40s linear infinite;
}
.branch-node, .element-node {
  position: absolute;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  color: var(--text-main-color, #333);
}
.branch-node { font-size: 1.1rem; }
.element-node {
  font-size: 0.9rem;
  padding: 3px 6px;
  border-radius: 4px;
  color: #fff;
}
.e-mu { background: #52c41a; }
.e-huo { background: #ff4d4f; }
.e-tu { background: #faad14; }
.e-jin { background: #13c2c2; }
.e-shui { background: #2f54eb; }

.compass-center {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--text-main-color, #333);
  color: var(--card-bg, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  z-index: 5;
}
.taichi-logo {
  font-size: 2.8rem;
  animation: spinClockwise 10s linear infinite;
}

@keyframes spinClockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.mystic-title { margin-top: 0; margin-bottom: 5px; color: var(--text-main-color); }
.mystic-subtitle { font-size: 0.85rem; color: #999; margin-bottom: 25px; }
.deconstruct-display {
  background: var(--background);
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}
.dec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--light-grey);
  padding-bottom: 8px;
}
.dec-item:last-child { border-bottom: none; padding-bottom: 0; }
.dec-label { font-size: 0.9rem; color: #888; }
.dec-val { font-family: monospace; font-size: 1.05rem; font-weight: bold; }
.mystic-highlight { color: var(--text-highlight-color, #49b1f5); font-size: 1.2rem; }

.mystic-btn {
  width: 100%;
  background: linear-gradient(135deg, #2f54eb 0%, var(--btn-bg, #49b1f5) 100%);
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(73,177,245,0.3);
  transition: all 0.3s;
}
.mystic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(73,177,245,0.5);
}

.divination-card {
  margin-top: 25px;
  border: 1px solid var(--text-highlight-color);
  background: rgba(73,177,245,0.04);
  border-radius: 12px;
  padding: 20px;
  animation: fadeInUp 0.4s ease-out;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.element-tag {
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  font-size: 0.85rem;
}
.card-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-main-color);
  margin-bottom: 15px;
}
.card-footer {
  border-top: 1px dashed var(--light-grey);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script>
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const keNames = ["初刻", "一刻", "二刻", "三刻"];

const shichenDatabase = {
  "子": { element: "水", color: "#2f54eb", name: "夜半子时（暗流涌动）", desc: "此刻天地水气最旺，万物归寂。宇宙弦波动平缓，极其适合屏蔽外界喧嚣，深入算法底层、重构核心逻辑架构或清理思维碎片。", yi: "潜心冥想、代码重构、极端深度硬核思考", ji: "强行熬夜突击、情绪化Debug、多任务分心" },
  "丑": { element: "土", color: "#faad14", name: "鸡鸣丑时（厚德载物）", desc: "大地产出交替之刻，土气凝重。此刻思维沉稳但活跃度较低，适合进行知识点的归纳总结、大创报告的查漏补缺或休养生息。", yi: "文档整理、错题分类、数据容灾备份", ji: "开辟全新高难度项目、高强度脑力刚正面" },
  "寅": { element: "木", color: "#52c41a", name: "平旦寅时（旭日初升）", desc: "木气萌发，破晓之始。时空阻尼开始减小，思维灵感如泉涌。极其适合开启构思一个全新的项目大纲、撰写全新论文开篇。", yi: "灵感发散、策划全新项目方案、晨读背诵", ji: "陷入细节死磕、过度沉溺于历史沉没成本" },
  "卯": { element: "木", color: "#52c41a", name: "日出卯时（生机蓬勃）", desc: "旭日跃升，木气纯正。机体与宏观电磁场共振达到顶峰。大脑运算速率拉满，效率极高，宜全速输出核心生产力代码或学习重难点。", yi: "攻克数学模型、连贯性高强编写、硬核备考", ji: "闲逛论坛、被无效通知频繁打断" },
  "辰": { element: "土", color: "#faad14", name: "食时辰时（飞龙在天）", desc: "土生万物，气吞山河。此时人世间社交与阳气交织。适合整理大创汇报、推进对外学术沟通、或者与团队同步进度，力求果断。", yi: "对外邮件联络、团队协作、制定周计划表", ji: "优柔寡断、逃避核心问题、过度悲观" },
  "巳": { element: "火", color: "#ff4d4f", name: "隅中巳时（精力充沛）", desc: "火曜中天，精力如炽。宇宙能量场极度高能。此时是战胜高难度 Bug、优化复杂 Python 脚本性能或攻克硬核物理海洋学推导的绝佳黄金期。", yi: "复杂Bug清零、重难点攻坚、算法逻辑压榨", ji: "做简单机械工作浪费精力、拖延核心任务" },
  "午": { element: "火", color: "#ff4d4f", name: "日中午时（日中则移）", desc: "盛极必衰，火气流转。此时阳气达到极限开始收敛。不宜强行高载荷运转，宜定心午憩、放空大脑，平复午前焦虑，复盘得失。", yi: "午休小憩、平复心绪、轻度文档阅读", ji: "情绪烦躁下盲目改代码、连续高负荷开会" },
  "未": { element: "土", color: "#faad14", name: "日昳未时（承前启后）", desc: "土气沉降，承接火之余温。适合耐心地整理实验室数据、修正绘图脚本坐标轴、或补充完善繁琐的实验步骤文档。", yi: "实验数据清洗、完善科研文档、图形可视化微调", ji: "挑战毫无头绪的全新未知领域" },
  "申": { element: "金", color: "#13c2c2", name: "晡时申时（锋芒毕露）", desc: "金气锐利，肃杀果断。午后的慵懒彻底退去，执行力与审判力攀上顶峰。适合开启秒表进行大段高压沉浸式“心流刚正面”，极其利剪裁冗余代码。", yi: "高强度极速刷题、敏捷重构解耦、大刀阔斧删减", ji: "拖延不决、反复纠结细枝末节" },
  "酉": { element: "金", color: "#13c2c2", name: "日入酉时（金气收敛）", desc: "夕阳西下，金气归拢。宏观噪声降低，适合对一天的产出进行精确复盘，归纳Bug日志，将阶段性成果妥善归档。", yi: "收尾今天的工作、复盘专注记录、整理桌面空间", ji: "开启可能需要通宵才能搞定的宏观工程" },
  "戌": { element: "土", color: "#faad14", name: "黄昏戌时（华灯初上）", desc: "土入火库，神思发散。此时思维跳脱出严谨的公式框架，艺术和数字美学灵感爆棚。非常适合规划 UI 界面、寻找调色灵感、或者进行泛读。", yi: "界面设计美化、泛读前沿文献、兴趣驱动研究", ji: "机械式刷题、高重复性体力劳动" },
  "亥": { element: "水", color: "#2f54eb", name: "人定亥时（万物归藏）", desc: "水气凝聚，天地安宁。一天因果在此处收束闭环。宜锁屏离线，清空浏览器冗余标签页，总结全天专注时长并给予自己积极正反馈。", yi: "关闭设备、离线思考总结、心流全面闭环", ji: "强行开辟新工作赛道、沉迷信息流冲浪" }
};

function initCompassRings() {
  const outerRing = document.getElementById('ring-earthly');
  if (!outerRing) return;
  outerRing.innerHTML = '';

  earthlyBranches.forEach((branch, index) => {
    const angle = index * 30; 
    const node = document.createElement('div');
    node.className = 'branch-node';
    node.textContent = branch;
    node.style.transform = `rotate(${angle}deg) translateY(-125px) rotate(${-angle}deg)`;
    outerRing.appendChild(node);
  });

  const middleRing = document.getElementById('ring-elements');
  if(middleRing) {
    const nodes = middleRing.querySelectorAll('.element-node');
    nodes.forEach((node, index) => {
      const angle = index * 72;
      node.style.transform = `rotate(${angle}deg) translateY(-80px) rotate(${-angle}deg)`;
    });
  }
}

function updateCyberClock() {
  const now = new Date();
  
  const gStr = now.getFullYear() + '/' + 
               String(now.getMonth()+1).padStart(2,'0') + '/' + 
               String(now.getDate()).padStart(2,'0') + ' ' + 
               String(now.getHours()).padStart(2,'0') + ':' + 
               String(now.getMinutes()).padStart(2,'0') + ':' + 
               String(now.getSeconds()).padStart(2,'0');
  const gregEl = document.getElementById('dec-gregorian');
  if(gregEl) gregEl.textContent = gStr;

  const hour = now.getHours();
  const minute = now.getMinutes();

  const shichenIdx = Math.floor((hour + 1) / 2) % 12;
  const currentShichen = earthlyBranches[shichenIdx];
  const shichenEl = document.getElementById('dec-shichen');
  if(shichenEl) shichenEl.textContent = currentShichen + "时 (" + shichenDatabase[currentShichen].element + "气)";

  const prefix = (hour % 2 !== 0) ? "初" : "正";
  const keIdx = Math.floor(minute / 15);
  const currentKe = prefix + keNames[keIdx];
  const keEl = document.getElementById('dec-ke');
  if(keEl) keEl.textContent = currentKe;

  const outerRing = document.getElementById('ring-earthly');
  if(outerRing && !outerRing.dataset.customInteracted) {
    const targetAngle = -shichenIdx * 30;
    outerRing.style.transform = `rotate(${targetAngle}deg)`;
  }
}

function triggerDivination() {
  const now = new Date();
  const hour = now.getHours();
  const shichenIdx = Math.floor((hour + 1) / 2) % 12;
  const currentShichen = earthlyBranches[shichenIdx];
  const data = shichenDatabase[currentShichen];

  const card = document.getElementById('divination-card');
  const tag = document.getElementById('card-element-tag');
  const title = document.getElementById('card-title');
  const desc = document.getElementById('card-body');
  const yi = document.getElementById('card-yi');
  const ji = document.getElementById('card-ji');

  if(!card) return;

  const outerRing = document.getElementById('ring-earthly');
  if(outerRing) {
    outerRing.style.transition = "transform 1s cubic-bezier(0.2, 2, 0.4, 1)";
    const randomExtraSpin = 720 + (-shichenIdx * 30);
    outerRing.style.transform = `rotate(${randomExtraSpin}deg)`;
    outerRing.dataset.customInteracted = "true";
    
    setTimeout(() => {
      outerRing.style.transition = "transform 0.5s ease-out";
      outerRing.dataset.customInteracted = "";
    }, 3000);
  }

  tag.textContent = data.element + "气";
  tag.style.background = data.color;
  title.textContent = data.name;
  desc.innerHTML = `<strong>宇宙时空共振态：</strong>${data.desc}`;
  yi.textContent = data.yi;
  ji.textContent = data.ji;

  card.style.display = 'block';
}

function initAllMysticComponents() {
  initCompassRings();
  updateCyberClock();
  setInterval(updateCyberClock, 1000);
}

if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initAllMysticComponents);
} else {
  document.addEventListener('DOMContentLoaded', initAllMysticComponents);
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initAllMysticComponents();
}
</script>