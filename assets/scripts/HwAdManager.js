

cc.Class({
    extends: cc.Component,
    properties: {
        serverUrl_Android: "http://cnf.mideoshow.com/advertise/advlist?appid=81",
        serverUrl_IOS: "http://console.gamebrain.io/advertise/advlist?appid=86",
        noAdTime: 20,
        noAdDay: 0,
        interAdsCount: 3,
        noAdsInterval: 20,
        interAdsInterval: 90,
        isInterstitialAvailable: !1,
        isRewardedVideoAvailable: !1,
        gameCount: 0,
        lastShowAdTime: 0
    },
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        var e = cc.sys.localStorage.getItem("Hw_InstallTime"),
            t = cc.sys.localStorage.getItem("Hw_CountryCode");
        if (null == e || "" == e || "undefined" == e) {
            var i = (Date.parse(new Date()) / 1e3).toString();
            cc.sys.localStorage.setItem("Hw_InstallTime", i);
        } else console.log("Hw_InstallTime:" + e);
        if (null != t && "" != t && "undefined" != t || (t = "-1"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) var n = this.serverUrl_IOS;
        else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) n = this.serverUrl_Android;
        n = n + "&country=" + t, this.hw_getAdConfig(n);
    },
    hw_getAdConfig: function hw_getAdConfig(url) {
        var xhr = new XMLHttpRequest(),
            _this = this;
        xhr.onreadystatechange = function () {
            if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
                var data = eval("(" + xhr.responseText + ")");
                _this.noAdDay = parseInt(data.conf.noadday), _this.noAdTime = parseInt(data.conf.noadtime), _this.interAdsCount = parseInt(data.conf.interadscount), _this.noAdsInterval = parseInt(data.conf.hwnoadsinterval), _this.interAdsInterval = parseInt(data.conf.interadsinteral), console.log("hw_getAdConfig ---- this.noAdDay = " + _this.noAdDay + " this.noAdTime= " + _this.noAdTime), "" != data.country && null != data.country && "undefined" != data.country && cc.sys.localStorage.setItem("Hw_CountryCode", data.country);
            }
        }, xhr.open("GET", url, !0);
        try {
            xhr.send();
        } catch (e) {
            console.log("hw_getAdConfig error = " + e);
        } finally {
            this.initMpAd();
        }
    },
    initMpAd: function initMpAd() {
        console.log("initMoPub"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "initAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "initMopubSdk", "()V");
    },
    startLoadAd: function startLoadAd() {
        Date.parse(new Date()) / 1e3 - parseInt(cc.sys.localStorage.getItem("Hw_InstallTime")) >= 24 * this.noAdDay * 3600 && this.loadInterstitialAd(), this.loadRewardedVideoAd();
    },
    loadInterstitialAd: function loadInterstitialAd() {
        console.log("\u5F00\u59CB\u52A0\u8F7D\u63D2\u5C4F\u5E7F\u544A"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "loadAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "interstitialShow", "()V");
    },
    loadRewardedVideoAd: function loadRewardedVideoAd() {
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "loadRewardedVideo") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "rewardLoad", "()V");
    },
    sdkInitFinished: function sdkInitFinished() {
        var e = this;
        setTimeout(function () {
            e.startLoadAd();
        }, 3e3);
    },
    interAdLoadCb: function interAdLoadCb(e) {
        if ("true" === e) var t = !0;
        else t = !1;
        this.isInterstitialAvailable = t, t ? console.log("loadInterSuccessed ") : console.log("loadInterFailed "), window.messager.dispatch("success", t);
    },
    interAdDisappearCb: function interAdDisappearCb() {
        this.isInterstitialAvailable = !1, this.lastShowAdTime = Date.parse(new Date()) / 1e3;
    },
    rewrdedVideoLoadCb: function rewrdedVideoLoadCb(e) {
        if ("true" === e) var t = !0;
        else t = !1;
        this.isRewardedVideoAvailable = t, t ? console.log("loadRVSuccessed") : console.log("loadRVFailed"), window.messager.dispatch("RVsuccess", t);
    },
    rewardedVideoShowCb: function rewardedVideoShowCb(e, t) {
        if ("true" === t) var i = !0;
        else i = !1;
        this.isRewardedVideoAvailable = !1, window.messager.dispatch("RVShowCB", e, i);
    },
    showInterstitial: function showInterstitial() {
        var e = Date.parse(new Date()) / 1e3 - parseInt(cc.sys.localStorage.getItem("Hw_InstallTime"));
        e >= 24 * this.noAdDay * 3600 && e >= this.noAdTime && (Date.parse(new Date()) / 1e3 - this.lastShowAdTime < this.noAdsInterval ? console.log("current less than " + this.noAdsInterval + " no show interstitial") : (Date.parse(new Date()) / 1e3 - this.lastShowAdTime >= this.interAdsInterval || this.interAdsCount > 0 && this.gameCount >= this.interAdsCount) && (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "interstitialShow", "()V"), this.lastShowAdTime = Date.parse(new Date()) / 1e3));
    },
    showRewardedVideoAd: function showRewardedVideoAd(e) {
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showRewardedVideo:", e) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "rewardShow", "()V");
    },
    updateScore: function updateScore(e, t) {
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "updateScore:type:", e, t) : cc.sys.isNative && (cc.sys.os, cc.sys.OS_ANDROID);
    },
    showRank: function showRank() {
        cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showLeaderboad") : cc.sys.isNative && (cc.sys.os, cc.sys.OS_ANDROID);
    },
    plusGameCount: function plusGameCount() {
        this.gameCount = 1;
    },
    isInterAdAvailable: function isInterAdAvailable() {
        return this.isInterstitialAvailable;
    },
    isRVAvailable: function isRVAvailable() {
        return this.isRewardedVideoAvailable;
    }
})


/*HwAdManager: [function (require, module, exports) {
        "use strict";
        cc._RF.push(module, "042bfUkqCNFgL8wUVRqHnHw", "HwAdManager"), cc.Class({
            extends: cc.Component,
            properties: {
                serverUrl_Android: "http://cnf.mideoshow.com/advertise/advlist?appid=81",
                serverUrl_IOS: "http://console.gamebrain.io/advertise/advlist?appid=86",
                noAdTime: 20,
                noAdDay: 0,
                interAdsCount: 3,
                noAdsInterval: 20,
                interAdsInterval: 90,
                isInterstitialAvailable: !1,
                isRewardedVideoAvailable: !1,
                gameCount: 0,
                lastShowAdTime: 0
            },
            onLoad: function onLoad() {
                cc.game.addPersistRootNode(this.node);
                var e = cc.sys.localStorage.getItem("Hw_InstallTime"),
                    t = cc.sys.localStorage.getItem("Hw_CountryCode");
                if (null == e || "" == e || "undefined" == e) {
                    var i = (Date.parse(new Date()) / 1e3).toString();
                    cc.sys.localStorage.setItem("Hw_InstallTime", i);
                } else console.log("Hw_InstallTime:" + e);
                if (null != t && "" != t && "undefined" != t || (t = "-1"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) var n = this.serverUrl_IOS;
                else if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) n = this.serverUrl_Android;
                n = n + "&country=" + t, this.hw_getAdConfig(n);
            },
            hw_getAdConfig: function hw_getAdConfig(url) {
                var xhr = new XMLHttpRequest(),
                    _this = this;
                xhr.onreadystatechange = function () {
                    if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
                        var data = eval("(" + xhr.responseText + ")");
                        _this.noAdDay = parseInt(data.conf.noadday), _this.noAdTime = parseInt(data.conf.noadtime), _this.interAdsCount = parseInt(data.conf.interadscount), _this.noAdsInterval = parseInt(data.conf.hwnoadsinterval), _this.interAdsInterval = parseInt(data.conf.interadsinteral), console.log("hw_getAdConfig ---- this.noAdDay = " + _this.noAdDay + " this.noAdTime= " + _this.noAdTime), "" != data.country && null != data.country && "undefined" != data.country && cc.sys.localStorage.setItem("Hw_CountryCode", data.country);
                    }
                }, xhr.open("GET", url, !0);
                try {
                    xhr.send();
                } catch (e) {
                    console.log("hw_getAdConfig error = " + e);
                } finally {
                    this.initMpAd();
                }
            },
            initMpAd: function initMpAd() {
                console.log("initMoPub"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "initAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "initMopubSdk", "()V");
            },
            startLoadAd: function startLoadAd() {
                Date.parse(new Date()) / 1e3 - parseInt(cc.sys.localStorage.getItem("Hw_InstallTime")) >= 24 * this.noAdDay * 3600 && this.loadInterstitialAd(), this.loadRewardedVideoAd();
            },
            loadInterstitialAd: function loadInterstitialAd() {
                console.log("\u5F00\u59CB\u52A0\u8F7D\u63D2\u5C4F\u5E7F\u544A"), cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "loadAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "interstitialShow", "()V");
            },
            loadRewardedVideoAd: function loadRewardedVideoAd() {
                cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "loadRewardedVideo") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "rewardLoad", "()V");
            },
            sdkInitFinished: function sdkInitFinished() {
                var e = this;
                setTimeout(function () {
                    e.startLoadAd();
                }, 3e3);
            },
            interAdLoadCb: function interAdLoadCb(e) {
                if ("true" === e) var t = !0;
                else t = !1;
                this.isInterstitialAvailable = t, t ? console.log("loadInterSuccessed ") : console.log("loadInterFailed "), window.messager.dispatch("success", t);
            },
            interAdDisappearCb: function interAdDisappearCb() {
                this.isInterstitialAvailable = !1, this.lastShowAdTime = Date.parse(new Date()) / 1e3;
            },
            rewrdedVideoLoadCb: function rewrdedVideoLoadCb(e) {
                if ("true" === e) var t = !0;
                else t = !1;
                this.isRewardedVideoAvailable = t, t ? console.log("loadRVSuccessed") : console.log("loadRVFailed"), window.messager.dispatch("RVsuccess", t);
            },
            rewardedVideoShowCb: function rewardedVideoShowCb(e, t) {
                if ("true" === t) var i = !0;
                else i = !1;
                this.isRewardedVideoAvailable = !1, window.messager.dispatch("RVShowCB", e, i);
            },
            showInterstitial: function showInterstitial() {
                var e = Date.parse(new Date()) / 1e3 - parseInt(cc.sys.localStorage.getItem("Hw_InstallTime"));
                e >= 24 * this.noAdDay * 3600 && e >= this.noAdTime && (Date.parse(new Date()) / 1e3 - this.lastShowAdTime < this.noAdsInterval ? console.log("current less than " + this.noAdsInterval + " no show interstitial") : (Date.parse(new Date()) / 1e3 - this.lastShowAdTime >= this.interAdsInterval || this.interAdsCount > 0 && this.gameCount >= this.interAdsCount) && (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showAd") : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "interstitialShow", "()V"), this.lastShowAdTime = Date.parse(new Date()) / 1e3));
            },
            showRewardedVideoAd: function showRewardedVideoAd(e) {
                cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showRewardedVideo:", e) : cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID && jsb.reflection.callStaticMethod("com.SpiralRushGo/MoPubSampleActivity", "rewardShow", "()V");
            },
            updateScore: function updateScore(e, t) {
                cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "updateScore:type:", e, t) : cc.sys.isNative && (cc.sys.os, cc.sys.OS_ANDROID);
            },
            showRank: function showRank() {
                cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSJSHelper", "showLeaderboad") : cc.sys.isNative && (cc.sys.os, cc.sys.OS_ANDROID);
            },
            plusGameCount: function plusGameCount() {
                this.gameCount = 1;
            },
            isInterAdAvailable: function isInterAdAvailable() {
                return this.isInterstitialAvailable;
            },
            isRVAvailable: function isRVAvailable() {
                return this.isRewardedVideoAvailable;
            }
        }), 
*/