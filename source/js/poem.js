(function () {
    // 定义全局变量存储从文件里读出来的诗词
    let loadedPoemPool = [];

    function createPoemHTML() {
        return `
            <div class="poem-header">
                <span class="poem-tag">碎 金 拾 翠</span>
                <button onclick="window.refreshPoem()" class="poem-refresh-btn">
                    🔄 换 句
                </button>
            </div>
            <div class="poem-body">
                <p id="poem-text" class="poem-content">正在翻阅纸笺...</p>
                <p id="poem-from" class="poem-info"></p>
            </div>
        `;
    }

    // 随机刷新诗词的全局函数
    window.refreshPoem = function () {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        
        if (textEl && fromEl && loadedPoemPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * loadedPoemPool.length);
            const selected = loadedPoemPool[randomIndex];
            
            textEl.innerText = selected.content;
            fromEl.innerText = `—— ${selected.source}`;
        } else if (loadedPoemPool.length === 0 && textEl) {
            textEl.innerText = "暂无诗意存留，请检查词库。";
        }
    };

    // 异步加载本地 JSON 诗词库
async function loadPoemDatabase() {
    try {
        const response = await fetch('https://v1.jinrishici.com/all.json');
        const data = await response.json();
        
        // 适配公共接口的数据结构
        loadedPoemPool = [{
            content: data.content,
            source: `${data.author} · 《${data.origin}》`
        }];
        window.refreshPoem();
    } catch (error) {
        // 如果第三方接口挂了，用一句备用诗句兜底
        loadedPoemPool = [{ content: "寄蜉蝣于天地，渺沧海之一粟。", source: "苏轼 · 《前赤壁赋》" }];
        window.refreshPoem();
    }
}
    // 将卡片注入到主页的逻辑
    function injectPoemCard() {
        const recentPosts = document.getElementById('recent-posts');
        
        if (recentPosts && !document.getElementById('custom-poem-card')) {
            const card = document.createElement('div');
            card.id = 'custom-poem-card';
            card.innerHTML = createPoemHTML();
            
            recentPosts.insertBefore(card, recentPosts.firstChild);

            // 卡片生成后，去异步请求读取 JSON 数据
            loadPoemDatabase();
        }
    }

    // 适配常规加载与 Butterfly 的 PJAX 刷新
    document.addEventListener('DOMContentLoaded', injectPoemCard);
    document.addEventListener('pjax:complete', injectPoemCard);
})();