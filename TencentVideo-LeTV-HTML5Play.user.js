// ==UserScript==
// @name             腾讯、乐视视频h5播放
// @description      腾讯、乐视视频html5播放器
// @version          0.2
// @author           Cloud
// @namespace        https://github.com/kt286/TencentVideo-LeTV-HTML5Play
// @homepageURL      https://github.com/kt286/TencentVideo-LeTV-HTML5Play
// @supportURL       https://github.com/kt286/TencentVideo-LeTV-HTML5Play/issues
// @updateURL        https://raw.githubusercontent.com/kt286/TencentVideo-LeTV-HTML5Play/master/TencentVideo-LeTV-HTML5Play.user.js
// @include          *://v.qq.com/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://www.le.com/*
// @grant            none
// @run-at           document-start
// ==/UserScript==

if(location.hostname=="www.le.com"){
    Object.defineProperty(navigator,"userAgent",{
        value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.21 (KHTML, like Gecko) Version/10.2 Safari/602.1.21",
        writable:false,
        configurable:false,
        enumerable:true
    });
    Object.defineProperty(navigator, 'plugins', {
        get: function () {
            return { length: 0 };
        }
    });
}else if(location.hostname.indexOf("qq.com")!=-1){
    Object.defineProperty(navigator,"userAgent",{
        value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12;  rv:48.0) Gecko/20100101 Firefox/48.0",
        writable:false,
        configurable:false,
        enumerable:true
    });
    Object.defineProperty(navigator, 'plugins', {
        get: function () {
            return { length: 0 };
        }
    });
}
