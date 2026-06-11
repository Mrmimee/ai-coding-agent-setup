// ==UserScript==
// @name         BiniBini 去开屏广告
// @namespace    https://bilibili.com
// @version      1.0
// @description  自动跳过 Bilibili 网页端开屏广告/弹窗/推广浮层
// @author       mnb77
// @match        *://*.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        GM_addStyle
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // ============================================
    //  1. CSS 强制隐藏广告容器（先发制人）
    // ============================================

    GM_addStyle(`
        /* 开屏弹窗 */
        .bili-splash-layer,
        .splash-layer,
        .bilibili-splash-layer,
        [class*="splash"],
        [id*="splash"],

        /* 右下角推广浮层 */
        .bili-mini-news,
        .international-gift,
        .bili-international-gift,
        .ad-report,

        /* 直播房间广告 */
        .live-room-ad,
        .ad-floor,

        /* 通用弹窗屏蔽 */
        .bili-modal-wrap[style*="visibility: visible"],
        .bili-modal-mask,

        /* 视频页底部推广 */
        .recommend-ad,
        .ad-container,
        [class*="ad_"],

        /* 新用户引导/活动浮层 */
        .guide-layer,
        .activity-layer,
        .bili-activity-layer,

        /* 确保不占用布局 */
        .bili-splash-layer,
        .splash-layer {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            z-index: -9999 !important;
        }
    `);

    // ============================================
    //  2. 主动移除（防慢加载广告）
    // ============================================

    function removeAds() {
        // 选择器列表
        const selectors = [
            '.bili-splash-layer',
            '.splash-layer',
            '.bilibili-splash-layer',
            '.bili-mini-news',
            '.international-gift',
            '.bili-international-gift',
            '.ad-report',
            '.ad-floor',
            '.live-room-ad',
            '.guide-layer',
            '.activity-layer',
            '[class*="splash"]',
            '[id*="splash"]',
            '.recommend-ad',
            '.ad-container',
            '.bili-modal-wrap',
        ];

        // 移除匹配元素
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.remove();
            });
        });

        // 找到并点击"跳过"按钮（如果有倒计时）
        document.querySelectorAll('span, button, a, div').forEach(el => {
            const text = (el.textContent || '').trim();
            if (text === '跳过' || text === '跳过广告' || text.includes('跳过') && el.offsetParent !== null) {
                el.click();
            }
        });
    }

    // ============================================
    //  3. 在多个时机执行
    // ============================================

    // DOM 变更时监听（SPA 页面切换也会触发）
    const observer = new MutationObserver(() => removeAds());
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
    });

    // 页面加载完成后也执行一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeAds);
    } else {
        removeAds();
    }

    // 延迟再清一次（防广告比脚本加载快）
    setTimeout(removeAds, 1000);
    setTimeout(removeAds, 3000);

    console.log('[BiniBini] 开屏广告已屏蔽');
})();
