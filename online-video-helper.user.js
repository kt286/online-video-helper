// ==UserScript==
// @name             在线视频助手
// @description      在线视频助手：H5播放、关闭弹幕、开启宽屏(腾讯、乐视、AcFun、哔哩哔哩、爱奇艺、优酷)
// @version          0.9
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
// @include          *://*acfun.cn/*
// @include          *://*acfun.tv/*
// @include          *://*aixifan.com/*
// @include          *://*.bilibili.com/video/av*
// @include          *://*.iqiyi.com/*
// @include          *://*.youku.com/*
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
    get: function () {
        return {
            length: 0
        };
    }
});

if (host == "www.le.com") {
    fakeUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/602.1.21 (KHTML, like Gecko) Version/10.2 Safari/602.1.21");
    disPlugins();
} else if (host.indexOf("qq.com") != -1) {
    fakeUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14;  rv:48.0) Gecko/20100101 Firefox/67.0");
    disPlugins();
    //适配QQ音乐MV
    localStorage.setItem('txp-user-setting', '{"isUseFlash":"0"}');
} else if (host.indexOf("acfun.cn") != -1 || host.indexOf("acfun.tv") != -1 || host.indexOf("aixifan.com") != -1) {
    window.onload = () => {
        var h5script = document.createElement('script');
        h5script.src = 'https://t5.haotown.cn/td/script.js?time=' + new Date().getTime();
        document.body.appendChild(h5script);
    }
} else if (host.indexOf("bilibili.com") != -1) {
    localStorage.setItem('defaulth5', 1);
    window.onload = () => {
        document.querySelector(".bilibili-player-video-btn-danmaku").click(); //关闭弹幕
        document.querySelector(".bilibili-player-iconfont-widescreen").click(); //宽屏模式
        var video;
        //每秒检测video出现
        var t = setInterval(function () {
            video = document.querySelector(".bilibili-player-video video");
            if (video) {
                clearInterval(t);
                document.querySelector(".bilibili-player-iconfont-start").click(); //自动播放
                //document.querySelector(".bilibili-player-video").click();//自动播放
                //document.querySelector(".bilibili-player-video video").setAttribute('autoplay', '');//自动播放
            }
        }, 1000);
    }
} else if (host.indexOf("iqiyi.com") != -1) {
    //disPlugins();
    document.cookie.lplayer_forcedType = 'h5_VOD';
    // 关闭弹幕
    window.WebSocket = function () { };
    window.onload = () => {
        //document.querySelector(".danmu-close .switch").click();//关闭弹幕
        document.querySelector("[data-player-hook='webfullscreen']").click(); //网页全屏
    }
} else if (host.indexOf("youku.com") != -1) {
    window.onload = () => {
        const webfullscreenbtn = `
        <div data-tip="网页全屏" class="control-icon control-fullscreen-icon control-webfullscreen-icon">
             <span class="iconfont icon-quanping_normal"></span>
        </div>`;
        const webhalfscreenbtn = `
        <div data-tip="退出网页全屏" class="control-icon control-halfscreen-icon control-webhalfscreen-icon" style="display:none;">
             <span class="iconfont icon-tuichuquanping_normal"></span>
        </div>`;
        const webfullscreenstyle = `
        <style>
            .webfullscreen {
                position: fixed;
                z-index: 100000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        </style>`;
        $(".h5player-dashboard .control-right-grid").append(webfullscreenbtn);
        $(".h5player-dashboard .control-right-grid").append(webhalfscreenbtn);
        $("head").append(webfullscreenstyle);

        // 网页全屏
        $(".control-webfullscreen-icon").click(function () {
            $(".control-webhalfscreen-icon").css("display", "inline-block");
            $(".control-webfullscreen-icon").css("display", "none");
            $(".youku-player").toggleClass("webfullscreen");
        });

        // 退出网页全屏
        $(".control-webhalfscreen-icon").click(function () {
            $(".control-webfullscreen-icon").css("display", "inline-block");
            $(".control-webhalfscreen-icon").css("display", "none");
            $(".youku-player").toggleClass("webfullscreen");
        });
    };
}
