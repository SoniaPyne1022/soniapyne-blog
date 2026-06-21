(function () {
    let loadedPoemPool = [];
    console.log("【诗词卡片】🎈 脚本已成功触发并加载...");

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

    window.refreshPoem = function () {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        
        if (textEl && fromEl && loadedPoemPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * loadedPoemPool.length);
            const selected = loadedPoemPool[randomIndex];
            textEl.innerText = selected.content;
            fromEl.innerText = `—— ${selected.source}`;
        }
    };

    async function loadPoemDatabase() {
        // 自动兼容绝对路径与相对路径，防止子目录 404
        const pathsToTry = ['/poems.json', 'poems.json', '../poems.json'];
        let response;
        
        for (let path of pathsToTry) {
            try {
                response = await fetch(path);
                if (response.ok) {
                    console.log(`【诗词卡片】✅ 成功从路径 [${path}] 读取到诗词库`);
                    break;
                }
            } catch(e) {}
        }

        if (response && response.ok) {
            try {
                loadedPoemPool = await response.json();
                window.refreshPoem();
            } catch (err) {
                console.error('【诗词卡片】❌ JSON 解析错误，请检查 poems.json 格式是否正确', err);
            }
        } else {
            console.error('【诗词卡片】❌ 尝试了多个路径，均未能成功加载 poems.json');
            const textEl = document.getElementById('poem-text');
            if (textEl) textEl.innerText = "欲寻诗意，奈何纸卷未开（未找到词库）。";
        }
    }

    function injectPoemCard() {
        const recentPosts = document.getElementById('recent-posts');
        
        if (!recentPosts) {
            console.log("【诗词卡片】⚠️ 当前页面未找到 #recent-posts 容器（可能不在主页，或主题结构不匹配）");
            return;
        }

        if (document.getElementById('custom-poem-card')) {
            console.log("【诗词卡片】检测到已有卡片，跳过重复注入");
            return;
        }

        console.log("【诗词卡片】⚡ 正在向主页注入古风诗词卡片...");
        const card = document.createElement('div');
        card.id = 'custom-poem-card';
        card.innerHTML = createPoemHTML();
        
        recentPosts.insertBefore(card, recentPosts.firstChild);
        loadPoemDatabase();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPoemCard);
    } else {
        injectPoemCard();
    }
    document.addEventListener('pjax:complete', injectPoemCard);
})();