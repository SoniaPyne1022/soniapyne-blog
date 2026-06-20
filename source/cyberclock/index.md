---
title: 赛博雷诺曼启示卡
date: 2026-06-20 20:25:00
top_img: false
aside: false
pjax: false
---

<div id="lenormand-workspace">
<div class="lenormand-header-box">
<h2 class="lenormand-title">🔮 赛博雷诺曼（Lenormand）工作台</h2>
<p class="lenormand-subtitle">通过36张欧式传统神秘符号，动态拆解你当下的现实因果镜像</p>
<div class="lenormand-modes">
<button id="btn-spread-1" class="mode-btn active" onclick="switchSpread(1)">🎯 单牌每日指引</button>
<button id="btn-spread-3" class="mode-btn" onclick="switchSpread(3)">📐 三牌因果阵</button>
</div>
<button class="shuffle-btn" onclick="drawLenormand()">✨ 冥想并洗牌抽卡</button>
</div>

<div id="lenormand-desk" class="lenormand-desk">
</div>

<div id="lenormand-report" class="lenormand-report" style="display: none;">
<h3 class="report-title">📜 时空潜意识镜象报告</h3>
<div id="report-content" class="report-content"></div>
</div>
</div>

<style>
/* 核心容器与板式控制 */
#lenormand-workspace {
  max-width: 950px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.lenormand-header-box, .lenormand-report {
  background: var(--card-bg, #fff);
  padding: 30px;
  border-radius: 16px;
  box-shadow: var(--card-hover-shadow, 0 4px 15px rgba(0,0,0,0.06));
  text-align: center;
  box-sizing: border-box;
}
.lenormand-modes {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}
.mode-btn {
  background: var(--background, #f4f4f4);
  color: var(--text-main-color, #333);
  border: 1px solid var(--light-grey, #eee);
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}
.mode-btn.active, .mode-btn:hover {
  background: var(--btn-bg, #49b1f5);
  color: #fff;
  border-color: var(--btn-bg, #49b1f5);
}
.shuffle-btn {
  background: linear-gradient(135deg, #722ed1 0%, var(--btn-bg, #49b1f5) 100%);
  color: #fff;
  border: none;
  padding: 12px 35px;
  border-radius: 25px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(114,46,209,0.35);
  transition: all 0.3s;
}
.shuffle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(114,46,209,0.5);
}
.lenormand-desk {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  flex-wrap: wrap;
  min-height: 260px;
  padding: 10px;
}

/* ================= 重点修复：卡牌 3D 与文本防御样式 ================= */
.lenormand-card {
  width: 170px;
  height: 265px; /* 稍微拉高15px，给底部文本留足呼吸空间 */
  perspective: 1000px;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.lenormand-card.is-flipped .card-inner {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  overflow: hidden; /* 强行切断任何可能超出圆角外框的内容 */
}
.card-back {
  background: linear-gradient(135deg, #111827 0%, #1e1b4b 100%);
  border: 2px solid #722ed1;
  color: #722ed1;
  justify-content: center;
  align-items: center;
}
.card-back-pattern {
  font-size: 3rem;
  text-shadow: 0 0 10px rgba(114,46,209,0.6);
  animation: pulse 2s infinite alternate;
}
.card-front {
  background: var(--background, #f9fafb);
  border: 2px solid var(--text-highlight-color, #49b1f5);
  color: var(--text-main-color, #333);
  transform: rotateY(180deg);
  justify-content: space-between;
  align-items: center;
}
.card-num { font-size: 0.85rem; color: #aaa; align-self: flex-start; font-family: monospace; }
.card-emoji { font-size: 3.2rem; margin: 5px 0; }

/* 底部文本容器微调 */
.card-text-content {
  width: 100%;
  margin-bottom: 5px;
}
.card-name { 
  font-size: 1.15rem; 
  font-weight: bold; 
  margin-bottom: 6px; 
  line-height: 1.3 !important;
}

/* 核心修复：彻底解决标签换行重叠与高度压实问题 */
.card-kw { 
  font-size: 0.72rem !important; 
  color: #ff7875 !important; 
  background: rgba(255,120,117,0.08) !important; 
  padding: 4px 6px !important; 
  border-radius: 4px !important;
  display: inline-block !important; /* 必须是 inline-block 或 block 才能正常拥有行高 */
  line-height: 1.4 !important;      /* 强制写死安全行高，绝不让文字重叠 */
  height: auto !important;          /* 消除可能继承自主题的固定高度 */
  word-break: break-all !important; /* 允许在任意字符间断行，防止撑爆容器 */
  box-sizing: border-box !important;
}

/* ================= 报告区域 ================= */
.report-title { color: var(--text-main-color); margin-top: 0; text-align: center; border-bottom: 2px solid var(--text-highlight-color); padding-bottom: 10px; }
.report-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
}
.report-item {
  border-left: 4px solid var(--btn-bg, #49b1f5);
  padding-left: 15px;
  margin-bottom: 5px;
}
.report-item h4 { margin: 0 0 6px 0; font-size: 1.1rem; color: var(--text-highlight-color); }
.report-item p { margin: 0; font-size: 0.95rem; line-height: 1.6; }

@keyframes pulse {
  from { transform: scale(0.95); opacity: 0.7; }
  to { transform: scale(1.05); opacity: 1; }
}
</style>

<script>
// 全套多重因果断语库保持不变
const lenormandDeck = [
  { id: 1, name: "骑士", emoji: "🏃‍♂️", kw: "消息、速度、行动", focus: "新消息或计划正在全速向你推进，执行力已被唤醒", block: "行动过于急躁粗糙，或者在缺乏深度思考的前提下盲目刚正面", future: "局势将以极快的速度迎来破局，新赛道彻底畅通" },
  { id: 2, name: "四叶草", emoji: "🍀", kw: "小幸运、惊喜、短暂窗口", focus: "眼前有随手可得的短暂转机，局势正在自发舒缓", block: "心态流于浮躁，过度依赖运气加成而忽视了主观的硬核沉淀", future: "将迎来一个能让你轻松化解 Bug 或危机的惊喜窗口期" },
  { id: 3, name: "船", emoji: "🚢", kw: "长期规划、跨界、远见", focus: "眼界大开，正在开辟需要长期投入的宏观新项目赛道", block: "目标定得过于长远宏大，导致脚下眼前的技术细节面临严重失控", future: "时空将引向跨界合作、跨学科融合或方向的开阔大变动" },
  { id: 4, name: "房子", emoji: "🏠", kw: "核心圈、根基、安全感", focus: "退回了最安全的已有成果圈中，正在梳理内部秩序", block: "思维陷入保守僵化，画地牢，过度防御而不敢做出任何改变", future: "核心根基全面稳固，你的学业或项目将搭建出坚不可摧的底层" },
  { id: 5, name: "树", emoji: "🌳", kw: "长期健康、缓慢扎根、底蕴", focus: "正处于底蕴积蓄期，当前的课题需要漫长的时间来沉淀", block: "时间跨度被拉得太长，你开始失去了耐心，产生了严重的焦虑内耗", future: "种子已然成活，你的心血和布局终将缓慢但极其稳健地长成参天大树" },
  { id: 6, name: "云", emoji: "☁️", kw: "短暂迷茫、不确定、盲区", focus: "视野暂时被不确定性的雾气遮蔽，方向有些模糊不清", block: "混沌的算法误区或信息不对称让你彻底看不清眼前的因果真相", future: "这团阴霾只是暂时的气流波动，不久后终将拨云见日、全然清朗" },
  { id: 7, name: "蛇", emoji: "🐍", kw: "复杂纠缠、曲线、逻辑陷阱", focus: "面对的是一个盘根错节的复杂局面或嵌套逻辑陷阱", block: "背后隐藏着复杂的弯路、代码死循环或有人在带偏你的注意力", future: "强行硬刚必会受挫，你必须运用曲线迂回策略才能精妙地化险为夷" },
  { id: 8, name: "棺材", emoji: "⚰️", kw: "彻底终结、断舍离、真空转型", focus: "旧的运行模式、死磕的沉没成本正迎来宿命般的彻底终结", block: "死守着被彻底卡住的死局死代码不肯放手，拒绝承认沉没成本", future: "彻底破旧立新，在旧事物的废墟之上迎来涅槃式的转型复苏" },
  { id: 9, name: "花束", emoji: "💐", kw: "正面赞赏、阶段果实、认可", focus: "正在迎来一波极其正面的外部反馈，才华收获肯定", block: "沉溺于眼前轻而易举获得的赞赏与虚荣中，不愿再向深水区钻研", future: "付出将惊艳显化，你的成果将在答辩汇报或公众面前收获极高赞誉" },
  { id: 10, name: "镰刀", emoji: "🗡️", kw: "突然决断、切割清除、突发中断", focus: "来到了必须快刀斩乱麻、大刀阔斧做出果断放弃的重大关口", block: "突如其来的计划中断、技术重构或关系切割打得你措手不及", future: "将以惊人的铁腕决心，干净利落地斩断并清除一切冗余隐患" },
  { id: 11, name: "鞭子", emoji: "💥", kw: "剧烈交锋、反复内耗、严苛洗礼", focus: "思维正在经历高强度的反驳、淬炼与剧烈激荡", block: "陷入了无穷无尽的自我全盘否定、严重的精神内耗与自我拷问中", future: "将在高压的磨砺与反复锤炼中，彻底逼出你最硬核的底层潜能" },
  { id: 12, name: "鸟", emoji: "🐦", kw: "碎片信息、高频交流、浮躁", focus: "高频、高密度的信息流正在交织，人际网在活跃运作", block: "声音太杂、信息太碎、无用噪声太多，带来了极大的情绪浮躁", future: "在一场场看似琐碎高频的头脑风暴碰撞中，将意外抓到破局线索" },
  { id: 13, name: "孩子", emoji: "👶", kw: "纯粹起点、全新无经验、破土", focus: "正站在一个完全从零开始、没有任何历史包袱的纯粹新起点上", block: "策略制定得过于幼稚简单，严重缺乏实战经验和严密合规度", future: "计划将如初生婴儿般，展现出完全不设限、野蛮生长的无限可能性" },
  { id: 14, name: "狐狸", emoji: "🦊", kw: "战术谋划、生存策略、精细辨识", focus: "正在运用高度精细的防御战术或策略思维来推进博弈", block: "聪明反被聪明误，心术过度沉迷于投机取巧而忽视了正道根基", future: "将凭借极其清醒冷酷的精细谋划，对现有困局达成降维打击" },
  { id: 15, name: "熊", emoji: "🐻", kw: "力量积蓄、资源把控、威严担当", focus: "处于掌控厚重资源或拥有长辈导师鼎力支持的稳健状态", block: "控制欲过强，刚愎自用、听不进旁人意见，甚至压制了其他可能性", future: "厚积薄发，你终将积蓄出足以独当一面、震慑全局的绝对力量" },
  { id: 16, name: "星星", emoji: "⭐", kw: "长远希望、高维直觉、愿景导航", focus: "心中秉持着长远的理想图景，直觉导航极其灵敏", block: "愿景和概念飘在空中沦为乌托邦，极度缺乏接引落地的具体方案", future: "理想照进现实，长远迷茫退散，星光将为你指明最正确的通途" },
  { id: 17, name: "鹳", emoji: "🕊️", kw: "正面改善、规律变动、阶梯跃升", focus: "顺应天时与事物规律的阶梯式好转和调整正在悄然发生", block: "频繁、无规律的环境变动或方向修改让你彻底无所适从、心力交瘁", future: "将顺理成章地完成大跨度的规律性大迁徙，实现阶梯式跃升" },
  { id: 18, name: "狗", emoji: "🐶", kw: "忠诚同盟、信任网、依赖稳定", focus: "身边拥有非常牢固的团队同盟、知心挚友或导师的完全信任", block: "过度依赖已有经验或熟人保护伞，失去了独立刚正面对抗的能力", future: "将收获一段绝对忠诚、牢不可破的核心联合纽带与支持" },
  { id: 19, name: "塔", emoji: "🏰", kw: "象牙塔、闭门钻研、权威机构边界", focus: "正处于极度孤独的象牙塔闭门深造、隔离钻研的状态中", block: "自我孤立，筑墙太高，思维与外界最新的学术/市场信息严重脱节", future: "将在深度的闭关中，筑起属于你个人极具权威性、极高壁垒的成果" },
  { id: 20, name: "花园", emoji: "⛲", kw: "开放社群、成果展示、流量碰撞", focus: "思维正在开放的网络环境或公共社群中接受激烈的交融碰撞", block: "外界社交诱惑和噪声太多，精力在迎合大众的过程中被严重蚕食", future: "成果将走向极具流量的公开展示大舞台，收获多点开花的破圈效应" },
  { id: 21, name: "山", emoji: "⛰️", kw: "巨大卡点、严重延迟、硬骨头", focus: "正面遭遇了一块以目前能力极难啃下的宏大硬骨头", block: "山头死死耸立在前，导致整个大创或研究进度面临全面卡死、延迟", future: "天堑变通途，你终将踏平这个终极卡点，在顶峰俯瞰众山小" },
  { id: 22, name: "十字路口", emoji: "🛣️", kw: "选择分叉、可能性、自由意志", focus: "来到了多重可能性交汇、必须要做出分流的决定性分叉口", block: "选项和诱惑太多，导致你陷入无休止的权衡中，优柔寡断卡在原地", future: "你将运用绝对冷酷的自由意志，做出最清醒的单向切割，全面推进" },
  { id: 23, name: "老鼠", emoji: "🐭", kw: "潜在隐患、精力泄漏、慢性损耗", focus: "警报：代表你的时间、成果或精力正处于不知名的慢性损耗中", block: "潜在的隐密 Bug 或负面内耗正在悄悄蚕食、偷走你辛苦累积的成果", future: "必须进行地毯式大排查，全面补齐底层漏洞，彻底终止精力泄漏" },
  { id: 24, name: "心", emoji: "❤️", kw: "绝对狂热、热爱锚点、纯粹激情", focus: "所问之事正是你内心狂热、灵感喷涌的绝对热爱所在", block: "过度被情绪化的潮汐或感情用事主导，完全丧失了严密的理智底线", future: "将全盘投入无限的纯粹激情，达成最炽热、毫无杂质的沉浸式心流" },
  { id: 25, name: "戒指", emoji: "💍", kw: "契约绑定、承诺、长期循环闭环", focus: "正在迎来一段极为稳定的契约达标、关系绑定或合作承诺", block: "陷入了某种死板死结的循环模式、或者被过期的协议僵化限制了思维", future: "所有的逻辑环、联盟和契约将达成最高等级的交织，完美绑定闭环" },
  { id: 26, name: "书", emoji: "📖", kw: "未知核心、隐藏知识、精深钻研", focus: "正在沉浸于深精硬核的隐藏学问里，尚未到公开的时机", block: "核心信息尚被完全隐藏，严重的信息不对称导致你卡在原地摸黑", future: "尘封的秘密将被你彻底读懂读穿，将真正攻克并掌握这门硬核技术" },
  { id: 27, name: "信", emoji: "✉️", kw: "书面包裹、实体凭证、立项包裹", focus: "某种白纸黑字的实体凭证、关键论文修改意见正在路上传达", block: "死板依赖条文规章和书面文本，思想教条化，缺乏实质行动去变通", future: "官方正式立项书、核心代码包或关键录取信件将顺利安全落地" },
  { id: 28, name: "男人", emoji: "👨", kw: "阳性意志、绝对理性、杀伐果断", focus: "极客式的钢骨理智已在主导，逻辑推演全面上线", block: "手段或思维过于刚毅冷硬、死板好强，极其缺乏柔性变通与直觉", future: "将全盘借助冷酷的逻辑代码、铁腕执行力把一切障碍彻底轰碎破局" },
  { id: 29, name: "女人", emoji: "👩", kw: "阴性直觉、感性共鸣、太极化劲", focus: "灵敏敏锐的潜意识直觉已全面苏醒，正以极高感知力共鸣局势", block: "心思过于敏感细腻，极易受到周围环境风吹草动和负面情绪的打乱", future: "将运用最柔韧的太极内劲包容一切，以极其精妙细腻的直觉化解危机" },
  { id: 30, name: "百合", emoji: "⚜️", kw: "平静优雅、漫长时间、底蕴资历", focus: "处于细水长流、极其纯洁平静的漫长安全平稳期", block: "发展节奏过于老旧缓慢、死气沉沉，缺乏破旧立新的冲劲与爆发力", future: "你过去长期积累的丰富资历与扎实功底，终将沉淀出最好的果实" },
  { id: 31, name: "太阳", emoji: "☀️", kw: "至高大吉、绝对高能、驱散一切", focus: "雷诺曼天花板大吉态！能量全盘大爆，核心自信正在全面觉醒", block: "运势过于耀眼炙热，容易让你盲目自大、狂妄，从而灼伤了核心细节", future: "一切阴霾、小人、Bug 被至阳之光瞬间融化驱散，迎来全面巅峰颠覆" },
  { id: 32, name: "月亮", emoji: "🌙", kw: "荣誉高光、名声流转、潜意识潮汐", focus: "你的才华、科研成果或作品正处于即将收获外界瞩目的高光期", block: "情绪潮汐波动异常剧烈，极度在意他人评价，整天患得患失", future: "你的心血将被强烈看见、引发轰动，收获应得的极高荣誉与名望" },
  { id: 33, name: "钥匙", emoji: "🔑", kw: "绝对解法、命运掌握、胜券在握", focus: "关键的通关密匙、核心破局灵感已被你牢牢掌控在手", block: "明明最完美的终极解法就在手边，你却缺乏勇气和果断去开启大门", future: "核心谜题瞬间迎刃而解，尘封的关卡全面爆破，拥有最高主控权" },
  { id: 34, name: "鱼", emoji: "🐟", kw: "流动资源、灵感丰盛、多点产出", focus: "江河奔涌般的丰盛态势，思路和资源都处于极高频的流动中", block: "想法概念像鱼群一样多而散乱，导致核心精力面临全面分散溃败", future: "财富、人脉和研究灵感将如同大江大河般全盘丰盛涌现，多源流产出" },
  { id: 35, name: "锚", emoji: "⚓", kw: "安全稳固、坚守定力、死磕僵化", focus: "定力极其稳健，底层基础打得极为牢固，无惧任何大风大浪", block: "安全感绑定得太死导致思维彻底僵化，安于现状不愿跨出舒适区", future: "稳坐钓鱼台，以泰山崩于前而不动之势，筑起坚不可摧的终极闭环" },
  { id: 36, name: "十字架", emoji: "✝️", kw: "沉重历练、宿命考验、磨砺升华", focus: "正在经受一段无法避免、极其沉重的宿命式高压负荷历练", block: "沉重巨大的精神包袱和考验压迫得你几乎窒息，快要到了崩溃边缘", future: "这是一场必经的渡劫，通过这场大磨砺后，你的灵魂和能力将完成蜕变" }
];

let currentSpreadMode = 1;

function switchSpread(mode) {
  currentSpreadMode = mode;
  document.getElementById('btn-spread-1').className = mode === 1 ? 'mode-btn active' : 'mode-btn';
  document.getElementById('btn-spread-3').className = mode === 3 ? 'mode-btn active' : 'mode-btn';
  document.getElementById('lenormand-desk').innerHTML = '';
  document.getElementById('lenormand-report').style.display = 'none';
}

function drawLenormand() {
  const desk = document.getElementById('lenormand-desk');
  const reportBox = document.getElementById('lenormand-report');
  const reportContent = document.getElementById('report-content');
  if (!desk || !reportBox || !reportContent) return;

  desk.innerHTML = '';
  reportBox.style.display = 'none';

  let shuffled = [...lenormandDeck].sort(() => Math.random() - 0.5);
  let pickedCards = shuffled.slice(0, currentSpreadMode);

  pickedCards.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'lenormand-card';
    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-back"><div class="card-back-pattern">🌌</div></div>
        <div class="card-front">
          <div class="card-num">#${String(card.id).padStart(2,'0')}</div>
          <div class="card-emoji">${card.emoji}</div>
          <div class="card-text-content">
            <div class="card-name">${card.name}</div>
            <div class="card-kw">${card.kw}</div>
          </div>
        </div>
      </div>
    `;
    desk.appendChild(cardEl);

    setTimeout(() => {
      cardEl.classList.add('is-flipped');
    }, 300 * (idx + 1));
  });

  let reportHTML = '';

  if (currentSpreadMode === 1) {
    const card = pickedCards[0];
    reportHTML += `
      <div class="report-item" style="border-left-color: #722ed1; background: rgba(114,46,209,0.02); padding: 15px; border-radius: 8px;">
        <h4 style="color: #722ed1; font-size:1.2rem;">🎯 今日核心天时能量显化 —— 【${card.emoji} ${card.name}】</h4>
        <p style="margin-top: 10px;"><strong>能量坐标系：</strong>${card.kw}</p>
        <p style="margin-top: 5px; color: var(--text-main-color);"><strong>时空因果镜象：</strong>当前你正停留在 ${card.focus} 的状态中。请深度感知这一磁场，化解眼前的局势。</p>
      </div>
    `;
  } else if (currentSpreadMode === 3) {
    const c1 = pickedCards[0]; 
    const c2 = pickedCards[1]; 
    const c3 = pickedCards[2]; 

    reportHTML += `
      <div class="report-item" style="border-left-color: #ff4d4f; background: rgba(255,77,79,0.02); padding: 18px; border-radius: 8px; margin-bottom: 25px;">
        <h4 style="color: #ff4d4f; font-size:1.2rem; margin-bottom:10px;">🔗 赛博因果锁链·深度解耦总评</h4>
        <p style="text-indent: 2em; line-height: 1.8; font-size: 1.02rem; color: var(--text-main-color);">
          根据潜意识网格的共振演算，<strong>当前你正处于【${c1.name}】映射的阶段：</strong>${c1.focus}。
          <strong>然而，由于时空中被注入了【${c2.name}】的干涉能量，导致发生了偏转：</strong>这表明你当前最核心的卡点或盲区恰恰在于${c2.block}。
          若想打破僵局、让能量彻底闭环，<strong>你必须强行将意志力和行动手段收束到【${c3.name}】的破局维中：</strong>只要你接下来${c3.future}。
        </p>
      </div>

      <div style="font-weight: bold; margin-bottom: 10px; color: #999; font-size:0.85rem;">📊 各象限微观干涉数据明细：</div>
      
      <div class="report-item">
        <h4>位置 ①：现状映射 【${c1.emoji} ${c1.name}】</h4>
        <p><strong>微观气场：</strong>${c1.kw}</p>
      </div>
      
      <div class="report-item" style="border-left-color: #faad14;">
        <h4 style="color: #faad14;">位置 ②：潜在潜意识阻碍 【${c2.emoji} ${c2.name}】</h4>
        <p><strong>卡点波动：</strong>${c2.kw}</p>
      </div>
      
      <div class="report-item" style="border-left-color: #52c41a;">
        <h4 style="color: #52c41a;">位置 ③：未来时空因果走向 【${c3.emoji} ${c3.name}】</h4>
        <p><strong>破局质能：</strong>${c3.kw}</p>
      </div>
    `;
  }

  setTimeout(() => {
    reportContent.innerHTML = reportHTML;
    reportBox.style.display = 'block';
  }, 400 * currentSpreadMode + 400);
}

function initLenormand() {
  const desk = document.getElementById('lenormand-desk');
  if(!desk) return;
  switchSpread(1);
}

if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.pjax) {
  document.addEventListener('pjax:complete', initLenormand);
} else {
  document.addEventListener('DOMContentLoaded', initLenormand);
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initLenormand();
}
</script>