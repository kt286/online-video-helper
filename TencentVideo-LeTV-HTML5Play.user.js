// ==UserScript==
// @name             腾讯、乐视视频h5播放
// @version          0.1
// @include          *://v.qq.com/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://www.le.com/*
// @author           Cloud
// @description      腾讯、乐视视频html5播放器
// @grant            none
// @run-at           document-start
// @namespace        https://greasyfork.org/users/60675
// ==/UserScript==

Object.defineProperty(navigator, 'plugins', {
    get: function () {
        return { length: 0 };
    }
});

if(location.hostname=="www.le.com"){
    Object.defineProperty(navigator,"userAgent",{
        value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.21 (KHTML, like Gecko) Version/10.2 Safari/602.1.21",
        writable:false,
        configurable:false,
        enumerable:true
    });
}else{
    Object.defineProperty(navigator,"userAgent",{
        value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10;  rv:48.0) Gecko/20100101 Firefox/48.0",
        writable:false,
        configurable:false,
        enumerable:true
    });
}
