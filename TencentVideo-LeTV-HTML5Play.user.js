// ==UserScript==
// @name             视频h5播放
// @description      视频html5播放(腾讯、乐视、熊猫)
// @version          0.4
// @author           Cloud
// @namespace        https://github.com/kt286/TencentVideo-LeTV-HTML5Play
// @homepageURL      https://github.com/kt286/TencentVideo-LeTV-HTML5Play
// @supportURL       https://github.com/kt286/TencentVideo-LeTV-HTML5Play/issues
// @updateURL        https://raw.githubusercontent.com/kt286/TencentVideo-LeTV-HTML5Play/master/TencentVideo-LeTV-HTML5Play.user.js
// @include          *://v.qq.com/*
// @include          *://y.qq.com/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://www.le.com/*
// @include          *://www.panda.tv/*
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
}
