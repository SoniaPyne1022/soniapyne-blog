(function () {
    // 记录上一次抽到的诗词索引，防止连续重复
    let lastPickedIndex = -1;

    // 垂直典雅纸笺布局：换句按钮稳稳锁在最下方
    function createPoemHTML() {
        return `
            <div class="poem-inner-border">
                <div class="poem-header-title">岁 华 纪 胜</div>
                <div class="poem-main-body">
                    <p id="poem-text" class="poem-content">正在引水研墨...</p>
                    <p id="poem-from" class="poem-info"></p>
                </div>
                <div class="poem-footer-action">
                    <button onclick="window.refreshPoem()" class="poem-btn-bottom">翻 阅 新 笺</button>
                </div>
            </div>
        `;
    }

    // 纯前端本地库随机抽卡机制
    window.refreshPoem = function () {
        const textEl = document.getElementById('poem-text');
        const fromEl = document.getElementById('poem-from');
        if (!textEl || !fromEl) return;

        const pool = window.MyMasterPoemLibrary;
        
        // 自检：防止库文件没加载进来
        if (!pool || pool.length === 0) {
            textEl.innerText = "欲寻诗意，奈何藏书阁未启（请检查poems-data.js是否引入）。";
            return;
        }

        let randomIndex = Math.floor(Math.random() * pool.length);
        
        // 防重复算法：如果摇到了跟上次一样的，且库里不只有一首，就重新摇
        while (randomIndex === lastPickedIndex && pool.length > 1) {
            randomIndex = Math.floor(Math.random() * pool.length);
        }
        
        lastPickedIndex = randomIndex;
        const selected = pool[randomIndex];

        // 动效平滑上屏
        textEl.innerText = selected.content;
        fromEl.innerText = `—— ${selected.source}`;
    };

    // 注入主页
    function injectPoemCard() {
        const recentPosts = document.getElementById('recent-posts');
        
        if (recentPosts) {
            if (!document.getElementById('custom-poem-card')) {
                const card = document.createElement('div');
                card.id = 'custom-poem-card';
                card.innerHTML = createPoemHTML();
                
                recentPosts.insertBefore(card, recentPosts.firstChild);
                window.refreshPoem();
            } else {
                // PJAX 局部切回主页时同样强制摇号
                window.refreshPoem();
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPoemCard);
    } else {
        injectPoemCard();
    }
    document.addEventListener('pjax:complete', injectPoemCard);
})();