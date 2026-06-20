---
title: 周易起卦与人生智慧
date: 2026-06-20 20:40:00
top_img: false
aside: false
pjax: false
---

<div id="zhouyi-workspace">
<div class="zhouyi-header-box">
<h2 class="zhouyi-title">☯️ 周易经典三钱起卦台</h2>
<p class="zhouyi-subtitle">抛掷三枚硬币，重复六次，听听两千年前的东方智慧给你当下的生活小建议</p>
<div class="coin-stage">
<div id="coin-1" class="virtual-coin">🪙</div>
<div id="coin-2" class="virtual-coin">🪙</div>
<div id="coin-3" class="virtual-coin">🪙</div>
</div>
<div class="control-panel">
<button id="toss-btn" class="mystic-btn" onclick="tossCoins()">🪙 掷硬币 (第 <span id="toss-count-text">1</span> 次)</button>
<button class="reset-btn" onclick="resetZhouyi()">🔄 重新开始</button>
</div>
</div>

<div class="zhouyi-flex-layout">
<div class="zhouyi-board-box">
<h3 class="board-title">📊 你的专属卦象</h3>
<div class="gua-visual-container">
<div id="yao-6" class="yao-line-wrapper"><div class="yao-name-label">第六爻</div><div class="yao-bar-place">-</div></div>
<div id="yao-5" class="yao-line-wrapper"><div class="yao-name-label">第五爻</div><div class="yao-bar-place">-</div></div>
<div id="yao-4" class="yao-line-wrapper"><div class="yao-name-label">第四爻</div><div class="yao-bar-place">-</div></div>
<div id="yao-3" class="yao-line-wrapper"><div class="yao-name-label">第三爻</div><div class="yao-bar-place">-</div></div>
<div id="yao-2" class="yao-line-wrapper"><div class="yao-name-label">第二爻</div><div class="yao-bar-place">-</div></div>
<div id="yao-1" class="yao-line-wrapper"><div class="yao-name-label">初爻</div><div class="yao-bar-place">-</div></div>
</div>
<div class="gua-direction-tip">↑ 提示：卦象是从最底下的“初爻”开始往上生成的 ↑</div>
</div>

<div class="zhouyi-analysis-box">
<h3 class="board-title">📜 卦象白话解析报告</h3>
<div id="zhouyi-intro-tip" class="zhouyi-intro-tip">请在心里默想你最近烦恼的事、学业或某个面临的选择，然后连续点击 6 次“掷硬币”按钮即可。</div>
<div id="zhouyi-report" class="zhouyi-report" style="display: none;">
<div class="report-section">
<span class="report-tag tag-ben">当前处境</span>
<h4 id="report-ben-name" class="gua-display-title">读取中...</h4>
<p id="report-ben-struct" class="gua-struct-info"></p>
<p id="report-ben-desc" class="gua-meaning-text"></p>
</div>
<div id="report-change-section" class="report-section" style="border-top: 1px dashed var(--light-grey); margin-top:15px; padding-top:15px;">
<span class="report-tag tag-bian">未来转机</span>
<h4 id="report-bian-name" class="gua-display-title">无变动</h4>
<p id="report-bian-desc" class="gua-meaning-text"></p>
</div>
</div>
</div>
</div>
</div>

<style>
#zhouyi-workspace {
  max-width: 950px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.zhouyi-header-box, .zhouyi-board-box, .zhouyi-analysis-box {
  background: var(--card-bg, #fff);
  padding: 25px;
  border-radius: 16px;
  box-shadow: var(--card-hover-shadow, 0 4px 15px rgba(0,0,0,0.06));
  box-sizing: border-box;
}
.zhouyi-header-box { text-align: center; }
.zhouyi-flex-layout {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  width: 100%;
}
.zhouyi-board-box, .zhouyi-analysis-box {
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
}
.coin-stage {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
  font-size: 2.8rem;
}
.virtual-coin {
  transition: transform 0.5s ease-out;
  display: inline-block;
}
.coin-flipping {
  animation: coinSpin 0.5s linear infinite;
}
@keyframes coinSpin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.mystic-btn {
  background: linear-gradient(135deg, #096dd9 0%, var(--btn-bg, #49b1f5) 100%);
  color: #fff; border: none; padding: 12px 30px; border-radius: 25px;
  font-size: 1rem; font-weight: bold; cursor: pointer;
  box-shadow: 0 4px 12px rgba(9,109,217,0.3); transition: all 0.2s;
}
.mystic-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(9,109,217,0.45); }
.reset-btn {
  background: #8c8c8c; color: #fff; border: none; padding: 10px 20px; border-radius: 25px;
  font-size: 0.9rem; cursor: pointer; transition: opacity 0.2s;
}
.reset-btn:hover { opacity: 0.9; }

.gua-visual-container {
  display: flex;
  flex-direction: column-reverse; 
  gap: 14px;
  margin: 30px auto;
  width: 80%;
  max-width: 300px;
}
.yao-line-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
}
.yao-name-label {
  font-size: 0.85rem; color: #999; width: 45px; text-align: right; font-family: monospace;
}
.yao-bar-place { flex: 1; display: flex; gap: 16px; height: 18px; }
.yao-yang { background: var(--text-main-color, #333); width: 100%; border-radius: 3px; height: 100%; }
.yao-yin-part { background: var(--text-main-color, #333); flex: 1; border-radius: 3px; height: 100%; }
.yao-moving-active {
  box-shadow: 0 0 10px #ff4d4f;
  animation: borderPulse 1.5s infinite alternate;
}
.gua-direction-tip { text-align: center; font-size: 0.8rem; color: #aaa; margin-top: 10px; }

@keyframes borderPulse {
  from { opacity: 0.6; } to { opacity: 1; }
}

.board-title { margin-top: 0; color: var(--text-main-color); border-bottom: 2px solid var(--btn-bg); padding-bottom: 6px; display: inline-block; }
.zhouyi-intro-tip { color: #999; font-size: 0.95rem; line-height: 1.6; margin: auto 0; text-align: center; }
.report-section { position: relative; }
.report-tag {
  position: absolute; right: 0; top: 0; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; color: #fff; font-weight: bold;
}
.tag-ben { background: #096dd9; }
.tag-bian { background: #52c41a; }
.gua-display-title { margin: 0 0 8px 0; font-size: 1.3rem; color: var(--text-main-color); }
.gua-struct-info { margin: 0 0 10px 0; font-size: 0.85rem; color: var(--text-highlight-color); font-weight: bold; }
.gua-meaning-text { margin: 0; font-size: 0.98rem; line-height: 1.7; color: var(--text-main-color); text-align: justify; }
</style>

<script>
// ================= 彻底去技术黑话：大白话微观因子库 =================
const trigramDatabase = {
  '111': { name: '天', spirit: '乾', tech: '充满力量、方向非常顺畅，现在正是放手大干、全速前进的好时机' },
  '000': { name: '地', spirit: '坤', tech: '稳重、包容性强，适合放慢脚步，安心做好基础准备和整理工作' },
  '100': { name: '雷', spirit: '震', tech: '充满干劲和突发的变化，能打破死气沉沉的僵局，适合做出全新尝试' },
  '011': { name: '风', spirit: '巽', tech: '像微风一样温柔渗透，适合慢慢调整、一点一点改进，千万不能着急' },
  '010': { name: '水', spirit: '坎', tech: '遇到了暂时的困难或看不见的陷阱，让人感到压力，需要小心应对、谨慎调整' },
  '101': { name: '火', spirit: '离', tech: '光明磊落、非常引人注目，适合展示自己的成果，多向大家表现自己' },
  '001': { name: '山', spirit: '艮', tech: '遇到了像大山一样的阻碍，暂时走不通了，这时候最适合停下来休息和复盘' },
  '110': { name: '泽', spirit: '兑', tech: '气氛非常轻松愉快，人际关系很好，适合多和别人交流、沟通与合作' }
};

// 剥离掉古怪后缀，换成通俗白话大标签
const hexagramNames = {
  "天天": "乾为天 (充满干劲，全速前进)", "地地": "坤为地 (脚踏实地，包容万物)", "雷雷": "震为雷 (大刀阔斧，迎来改变)", "风风": "巽为风 (顺应时势，潜移默化)",
  "水水": "坎为水 (重重困难，需要耐心)", "火火": "离为火 (寻找光明，展现成果)", "山山": "艮为山 (见好就收，适时止步)", "泽泽": "兑为泽 (心情愉悦，人缘极佳)",
  "天地": "天地否 (沟通不畅，暂时沉寂)", "地天": "地天泰 (万事顺遂，丝滑顺畅)", "水雷": "水雷屯 (万事开头难，别放弃)", "山水": "山水蒙 (迷茫摸索，需要指引)",
  "水天": "水天需 (耐着性子，静等时机)", "天水": "天水讼 (容易起冲突，多自我反思)", "地水": "地水师 (需要团队合作与纪律)", "水地": "水地比 (互帮互助，打成一片)",
  "风天": "风天小畜 (积累微小的力量)", "天泽": "天泽履 (如履薄冰，小心规矩)", "天火": "天火同人 (志同道合，开源共享)", "火天": "火天大有 (收获满满，大丰收)",
  "地山": "地山谦 (低调内敛，反而受益)", "雷地": "雷地豫 (心情欢畅，士气高涨)", "泽雷": "泽雷随 (顺应规律，不要强求)", "山风": "山风蛊 (内部有积弊，抓紧清理)",
  "地泽": "地泽临 (大好时机，主动推进)", "风地": "风地观 (登高望远，全局审视)", "火雷": "火雷噬嗑 (强力突破，咬碎阻碍)", "山火": "山火贲 (精心打扮，注重美学)",
  "山地": "山地剥 (能量流失，注意防守)", "地雷": "地雷复 (触底反弹，迎来复苏)", "天雷": "天雷无妄 (顺其自然，别动歪脑筋)", "山天": "山天大畜 (储备雄厚，大成之兆)",
  "山雷": "山雷颐 (闭门修养，调理自身)", "泽风": "泽风大过 (压力太大，注意减压)", "水山": "水山蹇 (寸步难行，找人帮忙)", "雷水": "雷水解 (大势松绑，误会冰释)",
  "山泽": "山泽损 (精简架构，适度减负)", "风雷": "风雷益 (强强联合，成倍增益)", "泽天": "泽天夬 (果断决裂，清除冗余)", "天风": "天风姤 (防范突发的小意外)",
  "泽地": "泽地萃 (人才相聚，资源聚合)", "地风": "地风升 (像竹子一样稳步攀升)", "泽水": "泽水困 (陷入围困，注意节约)", "水风": "水风井 (源源不断，细水长流)",
  "泽火": "泽火革 (迎来彻底的颠覆大改)", "火风": "火风鼎 (稳扎稳打，全新立项)", "雷风": "雷风恒 (持之以恒，死磕长线)", "天山": "天山遁 (战略退出，暂避锋芒)",
  "雷天": "雷天大壮 (力量极强，强势爆破)", "火地": "火地晋 (蒸蒸日上，全速前进)", "地火": "地火明夷 (黑暗潜行，低调藏锋)", "风火": "风火家人 (内部家庭/团队和睦闭环)",
  "火泽": "火泽睽 (有分歧，但求同存异)", "雷山": "雷山小过 (小有越界，注意微调)", "风泽": "风泽中孚 (绝对诚信，打动人心)", "风山": "风山渐 (循序渐进，走得很稳)",
  "雷泽": "雷泽归妹 (位置错位，别越权行事)", "雷火": "雷火丰 (高光繁荣，成果丰硕)", "火山": "火山旅 (跨平台探索，人在旅途)", "泽山": "泽山咸 (心灵感应，一拍即合)",
  "水泽": "水泽节 (适度节制，开源节流)", "水火": "水火既济 (完美成功，严防虎头蛇尾)", "火水": "火水未济 (尚未成功，仍需努力死磕)"
};

let yaoResults = [];

function resetZhouyi() {
  yaoResults = [];
  document.getElementById('toss-btn').disabled = false;
  document.getElementById('toss-count-text').textContent = '1';
  document.getElementById('zhouyi-intro-tip').style.display = 'block';
  document.getElementById('zhouyi-report').style.display = 'none';
  
  for (let i = 1; i <= 6; i++) {
    const barPlace = document.querySelector(`#yao-${i} .yao-bar-place`);
    if(barPlace) {
      barPlace.innerHTML = '-';
      barPlace.className = 'yao-bar-place';
    }
  }
}

function tossCoins() {
  if (yaoResults.length >= 6) return;

  const coins = document.querySelectorAll('.virtual-coin');
  coins.forEach(c => c.classList.add('coin-flipping'));
  document.getElementById('toss-btn').disabled = true;

  setTimeout(() => {
    coins.forEach(c => c.classList.remove('coin-flipping'));
    
    let tossScore = 0;
    for(let i=0; i<3; i++) {
      const isHead = Math.random() > 0.5;
      tossScore += isHead ? 3 : 2;
    }

    yaoResults.push(tossScore);
    renderCurrentYao(yaoResults.length, tossScore);

    if (yaoResults.length < 6) {
      document.getElementById('toss-count-text').textContent = yaoResults.length + 1;
      document.getElementById('toss-btn').disabled = false;
    } else {
      document.getElementById('toss-btn').disabled = true;
      document.getElementById('toss-count-text').textContent = '满';
      清算时空大报告();
    }
  }, 500);
}

function renderCurrentYao(yaoIndex, score) {
  const barPlace = document.querySelector(`#yao-${yaoIndex} .yao-bar-place`);
  if (!barPlace) return;

  barPlace.innerHTML = '';
  
  if (score === 7 || score === 9) {
    const yang = document.createElement('div');
    yang.className = 'yao-yang';
    barPlace.appendChild(yang);
  } else if (score === 8 || score === 6) {
    const yin1 = document.createElement('div');
    yin1.className = 'yao-yin-part';
    const yin2 = document.createElement('div');
    yin2.className = 'yao-yin-part';
    barPlace.appendChild(yin1);
    barPlace.appendChild(yin2);
  }

  if (score === 6 || score === 9) {
    barPlace.classList.add('yao-moving-active');
  }
}

// ================= 核心重写：完全大白话文案拼装流 =================
function 清算时空大报告() {
  document.getElementById('zhouyi-intro-tip').style.display = 'none';

  let benBinary = yaoResults.map(s => (s === 7 || s === 9) ? '1' : '0');
  let benLowerCode = benBinary.slice(0, 3).join('');
  let benUpperCode = benBinary.slice(3, 6).join('');

  const benLowerGua = trigramDatabase[benLowerCode];
  const benUpperGua = trigramDatabase[benUpperCode];
  const benGuaName = hexagramNames[benUpperGua.name + benLowerGua.name] || (benUpperGua.name + benLowerGua.name + "卦");

  document.getElementById('report-ben-name').textContent = benGuaName;
  document.getElementById('report-ben-struct').textContent = `【卦象组合】：外卦为“${benUpperGua.name}”，内卦为“${benLowerGua.name}”`;
  
  // 大白话现状分析
  document.getElementById('report-ben-desc').innerHTML = `<strong>当前处境大白话解析：</strong>从你想问的事情来看，你目前自己的状态和内部情况对应【${benLowerGua.name}】，特点是：<em>${benLowerGua.tech}</em>。而你面临的外部环境和客观条件对应【${benUpperGua.name}】，特点是：<em>${benUpperGua.tech}</em>。这两者相互结合影响，就是你目前所处的真实情况。`;

  let movingYaoIndices = [];
  yaoResults.forEach((s, idx) => {
    if (s === 6 || s === 9) movingYaoIndices.push(idx + 1);
  });

  const bianSection = document.getElementById('report-change-section');
  if (movingYaoIndices.length === 0) {
    // 纯静卦
    bianSection.style.display = 'none';
  } else {
    // 存在动爻，触发事情发展的变化走向
    bianSection.style.display = 'block';
    let bianBinary = yaoResults.map(s => {
      if (s === 9) return '0'; 
      if (s === 6) return '1'; 
      return (s === 7) ? '1' : '0';
    });

    let bianLowerCode = bianBinary.slice(0, 3).join('');
    let bianUpperCode = bianBinary.slice(3, 6).join('');
    const bianLowerGua = trigramDatabase[bianLowerCode];
    const bianUpperGua = trigramDatabase[bianUpperCode];
    const bianGuaName = hexagramNames[bianUpperGua.name + bianLowerGua.name] || (bianUpperGua.name + bianLowerGua.name + "卦");

    document.getElementById('report-bian-name').textContent = `未来的好转契机：${bianGuaName}`;
    
    // 大白话未来转机建议
    document.getElementById('report-bian-desc').innerHTML = `<strong>给你的下一步小建议：</strong>你在第 <strong>[${movingYaoIndices.join(', ')}]</strong> 爻发生了变化（物极必反）。这说明在这个地方有些不稳定，或者事情正在发生转折。变卦提示你：随着你解决了眼前的难题或者局势的自然发展，未来的走向会变成 <em>【${bianLowerGua.name}】（${bianLowerGua.tech}）</em> 和 <em>【${bianUpperGua.name}】（${bianUpperGua.tech}）</em> 的完美结合状态。你可以把这个变化后的情况，当作你接下来调整心态和行动的指南针。`;
  }

  document.getElementById('zhouyi-report').style.display = 'block';
}

function initZhouyi() {
  const btn = document.getElementById('toss-btn');
  if(!btn) return;
  resetZhouyi();
}

if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initZhouyi);
} else {
  document.addEventListener('DOMContentLoaded', initZhouyi);
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initZhouyi();
}
</script>