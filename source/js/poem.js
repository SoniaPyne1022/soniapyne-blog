(function () {
    // 1. 获取当前日期字符串（格式：YYYY-MM-DD，过了凌晨12点自动改变）
    function getTodayString() {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    }

    // 2. 渲染古典卡片 HTML 结构
    function createPoemHTML() {
        return `
            <div class="poem-header">
                <span class="poem-tag">岁 华 纪 胜</span>
                <span id="poem-date-badge" class="poem-date-badge">今日笺</span>
            </div>
            <div class="poem-body">
                <p id="poem-text" class="poem-content">正在翻阅纸笺...</p>
                <p id="poem-from" class="poem-info"></p>
            </div>
        `;
    }

    // 3. 核心逻辑：结合【今日诗词官方库】与【每日锁定机制】
    function loadDailyPoem() {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        if (!textEl || !fromEl) return;

        const todayStr = getTodayString();
        const savedDate = localStorage.getItem('daily_poem_date');

        // 🛡️ 凌晨12点锁定检查：如果今天已经摇过诗词了，直接读取缓存，不触发网络请求
        if (savedDate === todayStr) {
            const savedData = localStorage.getItem('daily_poem_data');
            if (savedData) {
                try {
                    const poem = JSON.parse(savedData);
                    textEl.innerText = poem.content;
                    fromEl.innerText = `—— ${poem.source}`;
                    return;
                } catch (e) {
                    console.error("【诗词卡片】缓存解析失败，重新获取...");
                }
            }
        }

        // 🔮 若到了新的一天（过了零点），或者首次访问，直接调用引入的第三方诗词库 SDK
        if (window.jinrishici) {
            window.jinrishici.load(function (result) {
                if (result && result.status === "success") {
                    const poemData = {
                        content: result.data.content,
                        source: `${result.data.origin.author} · 《${result.data.origin.title}》`
                    };
                    
                    // 展现给读者
                    textEl.innerText = poemData.content;
                    fromEl.innerText = `—— ${poemData.source}`;
                    
                    // 写入浏览器缓存，锁定当天的缘分，直到跨入次日凌晨
                    localStorage.setItem('daily_poem_date', todayStr);
                    localStorage.setItem('daily_poem_data', JSON.stringify(poemData));
                    console.log("【诗词卡片】📅 新的一天，已成功从今日诗词库获取新笺。");
                } else {
                    fallBackPoem();
                }
            }, function (err) {
                fallBackPoem();
            });
        } else {
            fallBackPoem();
        }
    }

    // 🌿 极小概率网络断开时的优雅兜底诗句
    function fallBackPoem() {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        if (textEl && fromEl) {
            textEl.innerText = "江山代有才人出，各领风骚数百年。";
            fromEl.innerText = "—— 赵翼 · 《论诗五首》";
        }
    }

    // 📦 动态引入「今日诗词官方 SDK 库」
    function initJinrishiciSDK(callback) {
        if (window.jinrishici) {
            callback();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://sdk.jinrishici.com/v2/browser/jinrishici.js';
        script.charset = 'utf-8';
        script.onload = callback;
        script.onerror = function() {
            console.error("【诗词卡片】❌ 第三方诗词库 SDK 加载失败，启用本地兜底。");
            fallBackPoem();
        };
        document.head.appendChild(script);
    }

    // 🚀 将卡片无损注入到主页
    function injectPoemCard() {
        const recentPosts = document.getElementById('recent-posts');
        
        if (recentPosts && !document.getElementById('custom-poem-card')) {
            const card = document.createElement('div');
            card.id = 'custom-poem-card';
            card.innerHTML = createPoemHTML();
            
            recentPosts.insertBefore(card, recentPosts.firstChild);

            // 先拉取/激活官方库，成功后再执行每日一诗的加载与锁定
            initJinrishiciSDK(loadDailyPoem);
        }
    }

    // 完美适配常规加载和 Butterfly 的 PJAX 局域刷新
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPoemCard);
    } else {
        injectPoemCard();
    }
    document.addEventListener('pjax:complete', injectPoemCard);
})();