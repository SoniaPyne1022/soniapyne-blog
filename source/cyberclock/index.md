---
title: 雷诺曼每日启示卡
date: 2026-06-20 20:25:00
top_img: false
aside: false
pjax: false
---

<div id="lenormand-workspace">
<!-- 头部控制面板 -->
<div class="lenormand-header-box">
<h2 class="lenormand-title">🔮 暖心雷诺曼启示卡工作台</h2>
<p class="lenormand-subtitle">用36张生活化的小卡片，帮你通俗易懂地梳理眼前的烦恼、卡点与接下来的行动建议</p>
<div class="lenormand-modes">
<button id="btn-spread-1" class="mode-btn active" onclick="switchSpread(1)">🎯 单牌每日指引</button>
<button id="btn-spread-3" class="mode-btn" onclick="switchSpread(3)">📐 三牌因果阵</button>
</div>
<button class="shuffle-btn" onclick="drawLenormand()">✨ 静心冥想并抽卡</button>
</div>

<!-- 卡牌物理牌桌 -->
<div id="lenormand-desk" class="lenormand-desk">
<!-- JS动态渲染 -->
</div>

<!-- 占卜结算报告卡片 -->
<div id="lenormand-report" class="lenormand-report" style="display: none;">
<h3 class="report-title">📜 你的专属卡片白话解析</h3>
<div id="report-content" class="report-content"></div>
</div>
</div>

<style>
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
.lenormand-card {
  width: 170px;
  height: 265px; 
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
  overflow: hidden; 
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
.card-kw { 
  font-size: 0.72rem !important; 
  color: #ff7875 !important; 
  background: rgba(255,120,117,0.08) !important; 
  padding: 4px 6px !important; 
  border-radius: 4px !important;
  display: inline-block !important; 
  line-height: 1.4 !important;      
  height: auto !important;          
  word-break: break-all !important; 
  box-sizing: border-box !important;
}
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
.report-item p { margin: 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-main-color); }

@keyframes pulse {
  from { transform: scale(0.95); opacity: 0.7; }
  to { transform: scale(1.05); opacity: 1; }
}
</style>

<script>
// ================= 彻底去黑话：全套大白话雷诺曼词库 =================
const lenormandDeck = [
  { id: 1, name: "骑士", emoji: "🏃‍♂️", kw: "新消息、行动、速度", focus: "有一些新消息或新计划正在向你靠近，你的行动力被唤醒了", block: "做事有点太急躁粗糙，没有彻底想清楚就盲目乱冲", future: "事情会全速向前推进，很快就能打破眼前的闷局" },
  { id: 2, name: "四叶草", emoji: "🍀", kw: "小幸运、惊喜、短暂机会", focus: "眼前有一个很不错的小运气或新转机，压力正在减轻", block: "心态有点太浮躁，总想着靠运气碰巧通关，忽视了脚踏实地的积累", future: "会迎来一个让你感到惊喜的轻松时刻，随手化解掉眼前的烦恼" },
  { id: 3, name: "船", emoji: "🚢", kw: "长远规划、换方向、远见", focus: "眼界大开，你正在规划一个需要长线投入、很有远见的新方向", block: "目标定得太长远宏大，反而把脚下眼前的关键细节给搞砸、搞失控了", future: "会迎来新的合作，或者是出门旅行、换个环境的大转机" },
  { id: 4, name: "房子", emoji: "🏠", kw: "家庭、安全感、已有根基", focus: "退回到了最舒适的已有成果和私人空间里，正在重新梳理内部秩序", block: "思维太保守僵化了，总是画地为牢，抗拒做出任何改变", future: "大后方会全面稳固，为你接下来的拼搏提供最踏实平稳的底层支持" },
  { id: 5, name: "树", emoji: "🌳", kw: "缓慢成长、底蕴积蓄、健康", focus: "正处于默默积蓄实力的平稳期，当前的课题需要漫长的时间来沉淀成长", block: "成长的周期有点太长了，你开始失去了耐心，产生了严重的焦虑内耗", future: "种子已经成活，你的心血和布局终将像大树一样，虽然慢但极其稳健地长起来" },
  { id: 6, name: "云", emoji: "☁️", kw: "迷茫、不确定、看不清盲区", focus: "视野暂时被一些不确定性遮蔽住了，方向有点模糊不清", block: "暂时的误区或者信息不透明，让你有些看不清眼前的因果真相", future: "这团迷茫只是暂时的天气波动，不久后一定会拨云见日，彻底看清前路" },
  { id: 7, name: "蛇", emoji: "🐍", kw: "复杂局势、曲线逻辑、警惕陷阱", focus: "面对的是一个有点盘根错节的复杂局面，或者绕来绕去的逻辑陷阱", block: "背后隐藏着一些弯路、代码死循环，或者有人在悄悄带偏你的注意力", future: "强行硬碰硬肯定会吃亏，必须运用绕道、曲线迂回的聪明策略才能巧妙化解" },
  { id: 8, name: "棺材", emoji: "⚰️", kw: "彻底终结、断舍离、转型", focus: "旧的运行模式、死磕的沉没成本，正迎来宿命般的彻底结束", block: "死守着被彻底卡住的死局、不合适的旧方法不肯放手，舍不得放弃过去", future: "迎来彻底的破旧立新，在旧事物的废墟之上迎来涅槃式的全新复苏" },
  { id: 9, name: "花束", emoji: "💐", kw: "正面赞赏、收获、收获好运", focus: "正在迎来一波很棒的外部反馈，你的才华和努力收获了大家的肯定", block: "太容易沉溺在眼前的赞赏里沾沾自喜，失去了继续往深水区硬刚的拼劲", future: "你的心血将迎来最赞的成果，并在答辩或大家面前收获极高的赞誉" },
  { id: 10, name: "镰刀", emoji: "🗡️", kw: "果断取舍、清除、突发中断", focus: "来到了必须快刀斩乱麻、果断做出放弃或切割的关键关口", block: "突如其来的计划变动、意外中断或者关系切割打得你措手不及", future: "你会拿出惊人的果断决心，干净利落地切断并清除一切冗余隐患" },
  { id: 11, name: "鞭子", emoji: "💥", kw: "激烈讨论、精神内耗、严苛洗礼", focus: "思维正在经历高强度的自我反驳、严格讨论与反复激荡", block: "陷入了无穷无尽的自我全盘否定，整天在严重的精神内耗里反复折腾", future: "虽然过程有些痛苦，但会在高压的磨砺和反复锤炼中，彻底逼出你最大潜能" },
  { id: 12, name: "鸟", emoji: "🐦", kw: "八卦碎片、高频交流、略带浮躁", focus: "高频、高密度的信息正在和周围人交流，人际网在活跃运作中", block: "声音太杂、消息太碎、无用噪声太多，带给了你极大的情绪浮躁和焦虑", future: "在一场场看似琐碎高频的头脑风暴碰撞中，会意外抓到破局的关键线索" },
  { id: 13, name: "孩子", emoji: "👶", kw: "纯粹新起点、没经验、野蛮生长", focus: "正站在一个完全从零开始、没有任何历史包袱的纯粹新起点上", block: "想法或者策略制定得有点太幼稚、太简单，由于缺乏经验而把事情想简单了", future: "计划将如初生婴儿般，展现出完全不设限、充满惊喜的无限可能性" },
  { id: 14, name: "狐狸", emoji: "🦊", kw: "精细策略、聪明谋划、谨慎防备", focus: "正在运用精细的战术策略或者清醒的防御思维来推进手头的事情", block: "有点聪明反被聪明误，太想走捷径、投机取巧，反而忽视了最正道的根基", future: "能凭借极其清醒冷酷的细致谋划，对现有困局实现漂亮的降维突围" },
  { id: 15, name: "熊", emoji: "🐻", kw: "实力雄厚、长辈支持、掌控力", focus: "正处于掌控着不错的资源，或者有靠谱长辈、导师鼎力支持的状态", block: "控制欲有点太强了，听不进旁人意见，强烈的固执压制了别的可能性", future: "厚积薄发，你终将积蓄出足以独当一面、彻底稳住大局的绝对力量" },
  { id: 16, name: "星星", emoji: "⭐", kw: "希望指引、灵感导航、长期愿景", focus: "心中秉持着长远的理想图景，直觉和灵感现在非常灵敏活跃", block: "愿景和目标完全飘在空中变成了空想，极度缺乏接引落地的具体行动", future: "理想照进现实，眼前的短期迷茫全部退散，星光会指明最正确的路线" },
  { id: 17, name: "鹳", emoji: "🕊️", kw: "正面改善、良性变动、步步高升", focus: "顺应事物发展规律的正面向好、改善和微调正在悄然发生", block: "频繁、没有规律的环境变动或者反复修改方向，让你心力交瘁", future: "将顺理成章地完成一波大跨度的调整，实现生活或学业的阶梯式跃升" },
  { id: 18, name: "狗", emoji: "🐶", kw: "靠谱伙伴、信任网、稳定支持", focus: "身边拥有非常牢固的团队同盟、知心挚友或导师的完全信任", block: "过度依赖已有的老经验或别人的保护伞，失去了自己独立刚正面的能力", future: "在接下来的难关里，将收获一段绝对靠谱、牢不可破的核心联合支持" },
  { id: 19, name: "塔", emoji: "🏰", kw: "闭门深造、独立钻研、规则边界", focus: "正处于孤独闭门深造、一个人隔离噪声、疯狂钻研的专注状态中", block: "自我孤立，筑墙太高，思维和外界最新、最鲜活的信息严重脱节了", future: "在这段深度的闭关努力中，将筑起属于你个人极具权威和含金量的成果" },
  { id: 20, name: "花园", emoji: "⛲", kw: "开放社群、成果展示、大舞台", focus: "思维和想法正在开放的环境或大家面前接受激烈的交融碰撞", block: "外界社交诱惑和噪声太多，精力在迎合大众或无意义社交中被严重蚕食", future: "成果将走向极具瞩目的公开展示大舞台，收获多点开花的破圈效应" },
  { id: 21, name: "山", emoji: "⛰️", kw: "宏大阻碍、进度延迟、大硬骨头", focus: "正面遭遇了一块以目前能力很难啃下的巨大硬骨头、大难题", block: "大山死死挡在前面，导致目前的整个大创或研究进度面临全面的卡死", future: "天堑变通途，你终将踏平这个终极难关，在顶峰俯瞰风景，一切都是值得的" },
  { id: 22, name: "十字路口", emoji: "🛣️", kw: "自由抉择、方向分叉、面临选择", focus: "来到了多重可能性交汇、必须做出方向分流的决定性分叉路口", block: "选项和诱惑太多，导致你陷入无休止的得失权衡中，优柔寡断卡在原地", future: "你将运用绝对清醒的理智，做出最干净的单向取舍，全面推进下一步计划" },
  { id: 23, name: "老鼠", emoji: "🐭", kw: "潜在漏洞、精力流失、悄悄损耗", focus: "强烈警告：代表你的时间、成果或精力正处于不知名的慢性损耗中", block: "潜在的隐密 Bug 或负面内耗正在悄悄蚕食、偷走你辛苦累积的果实", future: "必须进行拉网式大排查，补齐漏洞，就能彻底终止精力泄漏" },
  { id: 24, name: "心", emoji: "❤️", kw: "绝对热爱、灵感锚点、激情全满", focus: "所问之事正是你内心狂热、灵感喷涌的绝对热爱所在", block: "过度被情绪化的潮汐或感情用事主导，完全丧失了严密的理智底线", future: "全盘投入无限的纯粹激情，能达成最炽热、毫无杂质的沉浸式心流" },
  { id: 25, name: "戒指", emoji: "💍", kw: "协议达成、承诺绑定、循环闭环", focus: "正在迎来一段极为稳定的契约达成、关系绑定或合作承诺", block: "陷入了某种死板死结的循环老套路模式，僵化限制了思维的灵活性", future: "所有的合作、协议和任务交织将迎来最圆满的闭环和落实，完美绑定" },
  { id: 26, name: "书", emoji: "📖", kw: "隐藏知识、未知核心、精深钻研", focus: "正在沉浸于高深硬核的隐藏学问里，目前还没到公开的最佳时机", block: "核心信息尚被完全隐藏，严重的信息不对称导致你只能摸黑前行", future: "尘封的秘密将被你彻底读懂读穿，真正攻克并掌握这门核心技术" },
  { id: 27, name: "信", emoji: "✉️", kw: "正式文件、实体凭证、正式通知", focus: "某种白纸黑字的实体凭证、正式通知或关键修改意见正在路上传达", block: "太死板地依赖条文规章和书面文本，思想教条化，缺乏实质行动去变通", future: "官方正式的立项书、核心代码包或关键信件将顺利、安全地落地" },
  { id: 28, name: "男人", emoji: "👨", kw: "理性主导、行动力、果断破局", focus: "清醒的理智已经占据绝对主导，严密的逻辑推演全面上线", block: "手段或思维过于刚毅冷硬、死板好强，极其缺乏柔性变通与感性觉察", future: "将全盘借助冷酷理智的逻辑和超强执行力，把一切障碍彻底冲碎" },
  { id: 29, name: "女人", emoji: "👩", kw: "直觉全面苏醒、以柔克刚、柔韧", focus: "灵敏的潜意识直觉已经全面苏醒，正以极高感知力觉察眼前的局势", block: "心思过于敏感细腻了，极易受到周围环境风吹草动和负面情绪的打乱", future: "将运用最柔韧的以柔克刚方式包容一切，靠细腻的直觉化解当前的危机" },
  { id: 30, name: "百合", emoji: "⚜️", kw: "平静优雅、漫长时间、资历底蕴", focus: "处于细水长流、极其纯洁平静的漫长安全平稳期中", block: "发展节奏过于老旧缓慢、死气沉沉，缺乏破旧立新的冲劲与爆发力", future: "你过去长期积累的丰富资历与扎实功底，终将沉淀出最好的果实" },
  { id: 31, name: "太阳", emoji: "☀️", kw: "大吉大利、状态大好、驱散困难", focus: "运势全面的大吉态！核心自信正在全面觉醒，能量满满", block: "势头过于耀眼炙热，容易让你盲目自大、轻敌，从而灼伤了核心细节", future: "一切阴霾、小人、Bug 被瞬间融化驱散，迎来全面的大放异彩" },
  { id: 32, name: "月亮", emoji: "🌙", kw: "荣誉高光、才华看见、情绪起伏", focus: "你的才华、科研成果或作品正处于即将收获外界强烈瞩目的高光期", block: "情绪起伏异常剧烈，极度在意他人的评价，整天患得患失、非常心累", future: "你的心血将被强烈看见、引发轰动，收获应得的极高荣誉与名望" },
  { id: 33, name: "钥匙", emoji: "🔑", kw: "终极解法、命运掌握、胜券在握", focus: "最关键的通关密匙、核心破局灵感已被你牢牢掌控在手", block: "明明最完美的终极解法就在手边，你却缺乏勇气和果断去开启大门", future: "核心难题瞬间迎刃而解，尘封的关卡全面爆破，拥有最高主控权" },
  { id: 34, name: "鱼", emoji: "🐟", kw: "流动资源、丰盛思维、超多点子", focus: "处于非常丰盛、活络的态势中，思路和资源都在极高频地流动", block: "想法和点子像鱼群一样多而散乱，导致核心精力面临全面分散溃败", future: "财富、人脉和研究灵感将如同大江大河般全盘涌现，多源流产出" },
  { id: 35, name: "锚", emoji: "⚓", kw: "安全稳固、抗击风浪、坚守定力", focus: "定力极其稳健，底层基础打得极为牢固，无惧任何大风大浪", block: "安全感绑定得太死导致思维彻底僵化，安于现状不愿跨出舒适区", future: "稳坐钓鱼台，以泰山崩于前而不动之势，筑起坚不可摧的终极闭环" },
  { id: 36, name: "十字架", emoji: "✝️", kw: "沉重考验、历练打磨、升华蜕变", focus: "正在经受一段无法避免、极其沉重的高压考验与负荷历练", block: "沉重巨大的精神包袱压迫得你几乎窒息，快要到了崩溃的边缘", future: "这是一场必经的渡劫，通过这场大磨砺后，你的灵魂和能力将完成蜕变" }
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

  // 【Fisher-Yates 真正纯随机洗牌算法】
  let shuffled = [...lenormandDeck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
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

  // ================= 核心白话拼装引擎重构 =================
  let reportHTML = '';

  if (currentSpreadMode === 1) {
    const card = pickedCards[0];
    reportHTML += `
      <div class="report-item" style="border-left-color: #722ed1; background: rgba(114,46,209,0.02); padding: 15px; border-radius: 8px;">
        <h4 style="color: #722ed1; font-size:1.2rem;">🎯 今日核心建议卡 —— 【${card.emoji} ${card.name}】</h4>
        <p style="margin-top: 10px;"><strong>核心标签：</strong>${card.kw}</p>
        <p style="margin-top: 5px; color: var(--text-main-color); text-align: justify;"><strong>大白话处境解析：</strong>${card.focus}。你可以根据这个小提示，来规划和调整今天的学习跟心态。</p>
      </div>
    `;
  } else if (currentSpreadMode === 3) {
    const c1 = pickedCards[0]; 
    const c2 = pickedCards[1]; 
    const c3 = pickedCards[2]; 

    reportHTML += `
      <div class="report-item" style="border-left-color: #ff4d4f; background: rgba(255,77,79,0.02); padding: 18px; border-radius: 8px; margin-bottom: 25px;">
        <h4 style="color: #ff4d4f; font-size:1.2rem; margin-bottom:10px;">🔗 暖心三牌阵·连贯解析</h4>
        <p style="line-height: 1.8; font-size: 1.02rem; color: var(--text-main-color); text-align: justify;">
          从你想问的问题来看，<strong>你目前面临的真实处境对应【${c1.name}】卡牌：</strong>${c1.focus}。
          <br><br>
          <strong>但是，你现在之所以觉得烦恼或卡住，是因为遇到了【${c2.name}】卡牌代表的阻碍：</strong>主要是因为${c2.block}。
          <br><br>
          <strong>如果你想打破眼前的僵局，让事情顺顺当当地发展，接下来的破局绝招藏在【${c3.name}】卡牌里：</strong>建议你接下来${c3.future}。
        </p>
      </div>

      <div style="font-weight: bold; margin-bottom: 10px; color: #999; font-size:0.85rem;">📊 各个卡片位置含义明细：</div>
      
      <div class="report-item">
        <h4>位置 ①：你的当前现状 【${c1.emoji} ${c1.name}】</h4>
        <p><strong>卡片含义：</strong>${c1.kw}</p>
      </div>
      
      <div class="report-item" style="border-left-color: #faad14;">
        <h4 style="color: #faad14;">位置 ②：核心卡点/阻碍 【${c2.emoji} ${c2.name}】</h4>
        <p><strong>卡片含义：</strong>${c2.kw}</p>
      </div>
      
      <div class="report-item" style="border-left-color: #52c41a;">
        <h4 style="color: #52c41a;">位置 ③：未来好转转机 【${c3.emoji} ${c3.name}】</h4>
        <p><strong>卡片含义：</strong>${c3.kw}</p>
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