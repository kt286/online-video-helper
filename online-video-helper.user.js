// ==UserScript==
// @name             在线视频助手
// @description      在线视频助手：H5播放、关闭弹幕、开启宽屏
// @version          0.9
// @author           Cloud
// @namespace        https://github.com/kt286/online-video-helper
// @homepageURL      https://github.com/kt286/online-video-helper
// @supportURL       https://github.com/kt286/online-video-helper/issues
// @updateURL        https://raw.githubusercontent.com/kt286/online-video-helper/master/online-video-helper.user.js
// @include          *://*.bilibili.com/video/*
// @include          *://*.438kan.com/*
// @include          *://438kan.com/*
// @grant            none
// @require          https://cdn.jsdelivr.net/npm/hls.js@1.1.3/dist/hls.min.js
// @require          https://cdn.bootcss.com/dplayer/1.26.0/DPlayer.min.js
// @grant            GM_addStyle
// @run-at           document-end
// ==/UserScript==
const host = location.hostname;
const fakeUA = ua => Object.defineProperty(navigator, "userAgent", {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
});
const disPlugins = () => Object.defineProperty(navigator, 'plugins', {
    get: function () {
        return {
            length: 0
        };
    }
});
const waitForElement = (selector) => {
    return new Promise(function (resolve, reject) {
        let element = document.querySelector(selector);

        if (element) {
            resolve(element);
            return;
        }

        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                let nodes = Array.from(mutation.addedNodes);
                for (let node of nodes) {
                    if (node.matches && node.matches(selector)) {
                        observer.disconnect();
                        resolve(node);
                        return;
                    }
                };
            });
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}
const click = async (target) => {
    waitForElement(target).then((button) => {
        button && button.click()
    })
}

const skipChargeList = async () => {
    const video = await waitForElement('video')
    video && video.addEventListener('ended', async () => {
        const jumpButton = await waitForElement('.bilibili-player-electric-panel-jump')
        jumpButton && jumpButton.click()
    })
}

if (host.indexOf("bilibili.com") != -1) {
    click(".bilibili-player-video-web-fullscreen"); // 网页全屏
} else if (host.indexOf("438kan.com") != -1) {
    //fakeUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
    var meta = document.createElement('meta');
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.getElementsByTagName('head')[0].appendChild(meta);

    GM_addStyle(".MacPlayer { padding:0!important }");

    // need block 438kan.com/static/player/dplayer.js
    var dplayer = new DPlayer({
        element: document.querySelector(".MacPlayer"),
        autoplay: true,
        video: {
            url: MacPlayer.PlayUrl,
            type: 'hls',
        }
    });
}
