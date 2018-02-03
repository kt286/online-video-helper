// ==UserScript==
// @name             在线视频助手
// @description      在线视频助手：H5播放、关闭弹幕、开启宽屏(腾讯、乐视、熊猫、AcFun、哔哩哔哩、爱奇艺)
// @version          0.7
// @author           Cloud
// @namespace        https://github.com/kt286/online-video-helper
// @homepageURL      https://github.com/kt286/online-video-helper
// @supportURL       https://github.com/kt286/online-video-helper/issues
// @updateURL        https://raw.githubusercontent.com/kt286/online-video-helper/master/online-video-helper.user.js
// @include          *://v.qq.com/*
// @include          *://y.qq.com/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://www.le.com/*
// @include          *://www.panda.tv/*
// @include          *://*acfun.cn/*
// @include          *://*acfun.tv/*
// @include          *://*aixifan.com/*
// @include          *://*.bilibili.com/video/av*
// @include          *://*.iqiyi.com/*
// @grant            none
// @run-at           document-start
// ==/UserScript==
const host = location.hostname;
const fakeUA = ua => Object.defineProperty(navigator, "userAgent", {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
});
const disPlugins = () => Object.defineProperty(navigator, 'plugins', {
    get: function() {
        return {
            length: 0
        };
    }
});

if (host == "www.le.com") {
    fakeUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.21 (KHTML, like Gecko) Version/10.2 Safari/602.1.21");
    disPlugins();
} else if (host.indexOf("qq.com") != -1) {
    fakeUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12;  rv:48.0) Gecko/20100101 Firefox/48.0");
    disPlugins();
    //适配QQ音乐MV
    localStorage.setItem('txp-user-setting', '{"isUseFlash":"0"}');
} else if (host.indexOf("www.panda.tv") != -1) {
    disPlugins();
    localStorage.setItem('panda.tv/user/player', '{"useH5player":true}');
    localStorage.setItem('panda.tv/user/setting', '{"forbid_chat_gift":"1","ftq_flash_show":"0","ftq_room_notice":"0","color_speak_card":"0","forbid_flash_gift":"0","chat_msg_color":"","forbid_chat_notice":"1","cate_sort":""}');
    // 关闭弹幕
    window.WebSocket = function() {};
    window.onload = () => {
        document.querySelector(".h5player-control-bar-danmu").click();//关闭弹幕
        document.querySelector(".h5player-control-bar-fullscreen").click();//网页全屏
        document.querySelector(".room-chat-expand-btn").click();//收起弹幕列表
    }
} else if (host.indexOf("acfun.cn") != -1 || host.indexOf("acfun.tv") != -1 || host.indexOf("aixifan.com") != -1) {
    window.onload = () => {
        var h5script = document.createElement('script');
        h5script.src = 'https://t5.haotown.cn/td/script.js?time=' + new Date().getTime();
        document.body.appendChild(h5script);
    }
} else if (host.indexOf("bilibili.com") != -1) {
    localStorage.setItem('defaulth5', 1);
    window.onload = () => {
        document.querySelector(".bilibili-player-video-btn-danmaku").click();//关闭弹幕
        document.querySelector(".bilibili-player-iconfont-widescreen").click();//宽屏模式
        var video;
        //每秒检测video出现
        var t = setInterval(function() {
            video = document.querySelector(".bilibili-player-video video");
            if (video) {
                clearInterval(t);
                document.querySelector(".bilibili-player-iconfont-start").click();//自动播放
                //document.querySelector(".bilibili-player-video").click();//自动播放
                //document.querySelector(".bilibili-player-video video").setAttribute('autoplay', '');//自动播放
            }
        }, 1000);
    }
} else if (host.indexOf("iqiyi.com") != -1) {
    //disPlugins();
    document.cookie.lplayer_forcedType='h5_VOD';
    // 关闭弹幕
    window.WebSocket = function() {};
    window.onload = () => {
        //document.querySelector(".danmu-close .switch").click();//关闭弹幕
        document.querySelector("[data-player-hook='webfullscreen']").click();//网页全屏
    }
}
