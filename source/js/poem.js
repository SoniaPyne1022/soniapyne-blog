(function () {
    // 1. 渲染古典卡片 HTML 结构（右上角配备低调的古典刷新按钮）
    function createPoemHTML() {
        return `
            <div class="poem-header">
                <span class="poem-tag">岁 华 纪 胜</span>
                <button onclick="window.refreshPoem()" class="poem-refresh-btn">
                     换 句
                </button>
            </div>
            <div class="poem-body">
                <p id="poem-text" class="poem-content">正在翻阅纸笺...</p>
                <p id="poem-from" class="poem-info"></p>
            </div>
        `;
    }

    // 2. 核心刷新逻辑：每次触发都直接向「今日诗词库」请求新诗句
    window.refreshPoem = function () {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        if (!textEl || !fromEl) return;

        textEl.innerText = "正在翻阅纸笺...";
        fromEl.innerText = "";

        if (window.jinrishici) {
            window.jinrishici.load(function (result) {
                if (result && result.status === "success") {
                    textEl.innerText = result.data.content;
                    fromEl.innerText = `—— ${result.data.origin.author} · 《${result.data.origin.title}》`;
                } else {
                    fallBackPoem();
                }
            }, function (err) {
                fallBackPoem();
            });
        } else {
            fallBackPoem();
        }
    };

    // 🌿 网络异常时的兜底诗句
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
            fallBackPoem();
        };
        document.head.appendChild(script);
    }

    // 🚀 将卡片注入到主页的逻辑
    function injectPoemCard() {
        const recentPosts = document.getElementById('recent-posts');
        
        if (recentPosts) {
            // 如果卡片不存在，则创建并注入
            if (!document.getElementById('custom-poem-card')) {
                const card = document.createElement('div');
                card.id = 'custom-poem-card';
                card.innerHTML = createPoemHTML();
                
                recentPosts.insertBefore(card, recentPosts.firstChild);
                initJinrishiciSDK(window.refreshPoem);
            } else {
                // 如果卡片已存在（例如从其他页面通过 PJAX 局域切回主页），强制更新一次诗词
                window.refreshPoem();
            }
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