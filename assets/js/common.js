/**
 * 共通JavaScript - 株式会社PLUS ウェブサイト
 */

// DOMContentLoaded を待ってから実行
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimation();
});

/**
 * モバイルメニューの開閉機能
 */
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    if (!menuButton) return;

    menuButton.addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        const iconOpen = document.getElementById('menu-icon-open');
        const iconClose = document.getElementById('menu-icon-close');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        menu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');

        this.setAttribute('aria-expanded', !isExpanded);
        this.setAttribute('aria-label', isExpanded ? 'メニューを開く' : 'メニューを閉じる');
    });
}

/**
 * スクロールアニメーション（IntersectionObserver使用）
 */
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // 最初のセクション以外にアニメーションを適用
    document.querySelectorAll('section:not(:first-of-type):not(.no-scroll-animate)').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
}
