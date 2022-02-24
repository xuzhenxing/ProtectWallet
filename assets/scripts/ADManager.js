var n,
    a = require("GameConfig"),
    o = require("AdType"),
    s = require("ConstModName"),
    r = require("UIInfo");

function l(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}
var u = (l(n = {
    AdsType: o.TT,
    IsRemoteConfig: !1,
    openClickBanner: !1,
    AdErrorClickRate: 80,
    AdErrorClickCount: 99,
    InterAdShowDelay: .3,
    InterAdShowGap: 20,
    VedioCallBack: {},
    init: function init() {
        // return
        // this.AdsType == o.IosInterface && (this.IosInterface = require("IosInterface"), this.IosInterface.initGame()), 
        // this.AdsType == o.LoveH5 && (this.H5Interface = require("H5Interface"), this.H5Interface.init()),
        //  this.AdsType == o.Ad4399 && (this.Web4399Interface = require("Web4399Interface")), 
        this.AdsType == o.HelloWorld && (this.HwAdInterface = cc.director.getScene().getChildByName("HwAd").getComponent("HwAdManager"), window.messager.AddEventListener("RVShowCB", this.RVedioPlayComplete.bind(this), this), require("GameAnalytics"),
                this.HwGameAnalytics = window.analytics, this.HwGameAnalytics.init()),
            //   this.AdsType == o.Oppo && (this.OppoInterface = require("OppoInterface"), this.OppoInterface.Init()),
            //    this.AdsType == o.Vivo && (this.VivoInterface = require("VivoInterface"), this.VivoInterface.Init()), 
            this.AdsType == o.GoogleBatmobi && (this.Batmobi = new(require("Batmobi"))(), this.Batmobi.Init()), this.AdsType == o.MHT && (this.MHTInterface = require("MHTInterface"), this.MHTInterface.Init()), this.AdsType == o.WeChat && gm.WXInterface.Init();
        // this.AdsType == o.QQ && (this.QQInterface = require("QQInterface"), this.QQInterface.Init()), 
        // this.AdsType == o.TT && (this.TTInterface = require("TTInterface"), this.TTInterface.Init()), 
        // this.AdsType == o.Baidu && (this.BaiduInterface = require("BaiduInterface"), this.BaiduInterface.Init());
    },
    checkLoginState: function checkLoginState() {
        return
        if (this.AdsType == o.default.QQ) {
            if (null != gm.qq) "1001" != (e = gm.qq.getLaunchOptionsSync()).scene && "3003" != e.scene || gm.DataBase.Data.isClickSaveBtn && 0 == gm.DataBase.Data.hasRewardSave && (gm.DataBase.ChangeHasRewardSave(!0), gm.DataBase.ChangeForeverReward());
            return "QQ";
        }
        if (this.AdsType == o.default.WeChat) {
            var e;
            if (null != gm.wx) "1001" != (e = gm.wx.getLaunchOptionsSync()).scene && "1089" != e.scene || gm.DataBase.Data.isClickSaveBtn && 0 == gm.DataBase.Data.hasRewardSave && (gm.DataBase.ChangeHasRewardSave(!0), gm.DataBase.ChangeForeverReward());
            return "WeChat";
        }
        return "";
    },
    InitBoxAd: function InitBoxAd() {
        return
        this.AdsType == o.default.WeChat && gm.WXInterface.InitBoxAd();
    },
    IsAlertGameExport: function IsAlertGameExport() {
        return
        return this.AdType == o.default.WeChat;
    },
    playADBanner: function playADBanner() {
        return
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this.AdsType == o.default.Vivo && this.VivoInterface.ShowBanner(e, t), this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForBanner(), this.AdsType == o.default.WeChat && gm.WXInterface.ShowBanner(e, t), this.AdsType == o.default.QQ && this.QQInterface.ShowBanner(e, t), this.AdsType == o.default.TT && this.TTInterface.ShowBanner(e, t), this.AdsType == o.default.Oppo && this.OppoInterface.ShowBanner(), this.AdsType == o.default.Baidu && this.BaiduInterface.ShowBanner();
    },
    closeAdBanner: function closeAdBanner() {
        return
        this.AdsType == o.default.WeChat && gm.WXInterface.HideBanner(), this.AdsType == o.default.QQ && this.QQInterface.HideBanner(), this.AdsType == o.default.TT && this.TTInterface.HideBanner(), this.AdsType == o.default.Oppo && this.OppoInterface.HideBanner(), this.AdsType == o.default.Vivo && this.VivoInterface.HideBanner(), this.AdsType == o.default.Baidu && this.BaiduInterface.HideBanner();
    },
    playInterstitial: function playInterstitial(e) {
        return
        if (1 != gm.DataBase.Data.IsNewer) return this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForInterstitial(), this.AdsType == o.default.HelloWorld && this.HwAdInterface.isInterAdAvailable() ? (this.dataRecode(a.default.DATA_InterwatchCount, "1th", "click"), this.HwAdInterface.showInterstitial(), !0) : this.AdsType == o.default.GoogleBatmobi ? (this.dataRecode(a.default.DATA_InterwatchCount, "1th", "click"), this.Batmobi.playInterstitial(e), !0) : (this.AdsType == o.default.Vivo && this.VivoInterface.playInterstitial(), !1);
    },
    PlayNativeAds: function PlayNativeAds(e) {
        return
        this.AdsType == o.default.Vivo && this.VivoInterface.PlayNativeAds(e);
    }
}, "PlayNativeAds", function (e) {
    return
    this.AdsType == o.default.Vivo && this.VivoInterface.PlayNativeAds(e);
}), l(n, "NativeReportAdShow", function (e) {
    return
    this.AdsType == o.default.Vivo && this.VivoInterface.NativeReportAdShow(e);
}), l(n, "NativeReportAdClick", function (e) {
    return
    this.AdsType == o.default.Vivo && this.VivoInterface.NativeReportAdClick(e);
}), l(n, "playVideo", function () {
    return
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return gm.AdManager.dataRecode(a.default.video_dot, e), null != t && (this.VedioCallBack[e] = t), this.isRVAvailable(e) ? this.AdsType != o.default.None ? (this.reportAnalytics("ShowAd", {
        From: e,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "unknow",
        Enter: "true"
    }), this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForVideo(data), this.AdsType == o.default.LoveH5 && this.H5Interface.playVideo(), this.AdsType == o.default.Ad4399 && this.Web4399Interface.ShowAds(), this.AdsType == o.default.HelloWorld && this.HwAdInterface.isRVAvailable() ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.HwAdInterface.showRewardedVideoAd(e), !0) : this.AdsType == o.default.GoogleBatmobi && this.isRVAvailable() ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.Batmobi.playVideo(e), !0) : this.AdsType == o.default.WeChat && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), gm.WXInterface.ShowVideo(e), !0) : this.AdsType == o.default.QQ && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.QQInterface.ShowVideo(e), !0) : this.AdsType == o.default.TT && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.TTInterface.ShowVideo(e), !0) : this.AdsType == o.default.Oppo && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.OppoInterface.ShowVideo(e), !0) : this.AdsType == o.default.Vivo && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.VivoInterface.ShowVideo(e), !0) : !(this.AdsType != o.default.Baidu || !this.isRVAvailable(e)) && (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.BaiduInterface.ShowVideo(e), !0)) : void this.watchADReward(e) : (gm.UIManager.SendNotification(s.default.MOD_TipsView, r.default.UIInfo_ShowView, a.default.LAN_ADNoReady), void this.reportAnalytics("ShowAd", {
        From: e,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "unknow",
        Enter: "false"
    }));
}), l(n, "isInterAdAvailable", function (e) {
    return
    return this.AdsType == o.default.HelloWorld ? this.HwAdInterface.isInterAdAvailable() : this.AdsType == o.default.GoogleBatmobi ? this.Batmobi.isInterAdAvailable(e) : this.AdsType == o.default.Vivo && this.VivoInterface.isInterAdAvailable(e);
}), l(n, "isRVAvailable", function (e) {
    return
    return this.AdsType == o.default.None || (this.AdsType == o.default.HelloWorld ? this.HwAdInterface.isRVAvailable() : this.AdsType == o.default.GoogleBatmobi ? this.Batmobi.isRVAvailable() : this.AdsType == o.default.WeChat ? gm.WXInterface.isRVAvailable(e) : this.AdsType == o.default.QQ ? this.QQInterface.isRVAvailable(e) : this.AdsType == o.default.TT ? this.TTInterface.isRVAvailable(e) : this.AdsType == o.default.Oppo ? this.OppoInterface.isRVAvailable(e) : this.AdsType == o.default.Vivo ? this.VivoInterface.isRVAvailable(e) : this.AdsType == o.default.Baidu && this.BaiduInterface.isRVAvailable(e));
}), l(n, "RVedioPlayComplete", function () {
    return
    var e = Array.prototype.slice.call(arguments);
    e[2] && gm.UIManager.SendNotification("RVShowCB", e[1]);
}), l(n, "dataRecode", function (e, t, i) {
    return
    cc.log("dataRecode:" + e), this.AdsType == o.default.IosInterface && ("gameOver" == e ? this.IosInterface.gameOver() : "gameStart" == e ? this.IosInterface.gameStartLevel() : this.IosInterface.userOperate(e)), this.AdsType == o.default.LoveH5 && ("gameOver" == e ? e = "gameOver" : "gameStart" == e && (e = "gameStart"), this.H5Interface.userOperate(e)), this.AdsType == o.default.HelloWorld && ("gameOver" == e ? this.HwAdInterface.plusGameCount() : 1 == arguments.length ? this.HwGameAnalytics.postDesignEvent(e) : 2 == arguments.length ? this.HwGameAnalytics.postDesignEvent(e, t) : 3 == arguments.length && this.HwGameAnalytics.postDesignEvent(e, t, i)), this.AdsType == o.default.GoogleBatmobi && (1 == arguments.length ? this.Batmobi.logEvent(e, "click") : 2 == arguments.length ? this.Batmobi.logEvent(e, t) : 3 == arguments.length && this.Batmobi.logEvent(e, t, i)), this.AdsType == o.default.WeChat && (null != i ? gm.WXInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? gm.WXInterface.dataRecord(e + "_" + t) : gm.WXInterface.dataRecord(e)), this.AdsType == o.default.QQ && (null != i ? this.QQInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? this.QQInterface.dataRecord(e + "_" + t) : this.QQInterface.dataRecord(e)), this.AdsType == o.default.TT && (null != i ? this.TTInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? this.TTInterface.dataRecord(e + "_" + t) : this.TTInterface.dataRecord(e)), this.AdsType, o.default.Oppo, this.AdsType, o.default.Vivo;
}), l(n, "uploadData", function (e, t) {
    return
    this.AdsType == o.default.IosInterface && this.IosInterface.updateScore(e), this.AdsType == o.default.Ad4399d && this.Web4399Interface.UpdateScore(e), this.AdsType == o.default.HelloWorld && this.HwAdInterface.updateScore(e, t);
}), l(n, "getRankData", function (e) {
    return
    return this.AdsType == o.default.Ad4399 && (window.h5api.getRank(e), !0);
}), l(n, "creatTestData", function () {
    return
    for (var e = [], t = 0; t < 100; t++) {
        e.push({
            id: t,
            score: 100 + t,
            rank: t + 1
        });
    }
    return e;
}), l(n, "showRank", function (e) {
    return
    return this.AdsType == o.default.IosInterface ? (this.IosInterface.showLeaderboad(), !1) : this.AdsType == o.default.Ad4399 ? this.getRankData(e) : this.AdsType == o.default.HelloWorld && this.HwAdInterface.showRank();
}), l(n, "share", function (e) {
    return
    if (this.AdsType == o.default.IosInterface) {
        var t = data.title || "",
            i = data.content || "",
            n = data.url || "";
        this.IosInterface.ShareTitle(t, i, n);
    } else this.AdsType == o.default.WeChat ? gm.WXInterface.shareAppMessage(e) : this.AdsType == o.default.QQ ? this.QQInterface.shareAppMessage(e) : this.AdsType == o.default.TT && this.QQInterface.shareAppMessage();
}), l(n, "shareToFriend", function (e, t) {
    return
    this.AdsType == o.default.WeChat ? gm.WXInterface.sendMessageToChild(e, t) : this.AdsType == o.default.QQ && this.QQInterface.sendMessageToChild(e, t);
}), l(n, "watchADReward", function (e) {
    return
    1 == (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) ? (this.reportAnalytics("ShowAd", {
        From: e,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "true",
        Enter: "true"
    }), gm.UIManager.SendNotification("RVShowCB", e), null != this.VedioCallBack[e] && (this.VedioCallBack[e](), delete this.VedioCallBack[e])) : this.reportAnalytics("ShowAd", {
        From: e,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "false",
        Enter: "true"
    });
}), l(n, "shareSuccess", function () {
    return
    this.AdsType == o.default.IosInterface && this.IosInterface.shareSuccess();
}), l(n, "shareFail", function () {
    return
    this.AdsType == o.default.IosInterface && this.IosInterface.shareFail();
}), l(n, "getGameData", function () {
    return
    if (this.AdsType == o.default.IosInterface) return this.IosInterface.getGameData;
}), l(n, "pasteBoard", function (e) {
    return
    this.AdsType == o.default.IosInterface && this.IosInterface.pasteBoard(e);
}), l(n, "ShakePhone", function (e) {
    return
    0;
}), l(n, "GoToStore", function () {
    return
    cc.log("GoToStore>>>>>>>>");
}), l(n, "GotoMiniProgram", function (e) {
    return
    this.AdsType == o.default.WeChat && gm.WXInterface.navigateToMiniProgram(e), this.AdsType == o.default.QQ && this.QQInterface.navigateToMiniProgram(e), this.AdsType == o.default.TT && this.TTInterface.navigateToMiniProgram(e);
}), l(n, "ShowBox", function () {
    return
    this.AdsType == o.default.QQ && this.QQInterface.ShowBox();
}), l(n, "screenStartRecord", function (e, t, i) {
    return
    this.AdsType == o.default.TT && this.TTInterface.screenStartRecord(e, t, i), this.AdsType == o.default.Baidu && this.BaiduInterface.screenStartRecord(e, t, i);
}), l(n, "screenStopRecord", function (e) {
    return
    this.AdsType == o.default.TT && this.TTInterface.screenStopRecord(e), this.AdsType == o.default.Baidu && this.BaiduInterface.screenStopRecord(e);
}), l(n, "OpenCustomerServiceConversation", function () {
    return
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.AdsType == o.default.WeChat && gm.WXInterface.openCustomerServiceConversation(e);
}), l(n, "sendMessageToChild", function (e, t) {
    return
    this.AdsType == o.default.WeChat ? gm.WXInterface.sendMessageToChild(e, t) : this.AdsType == o.default.QQ && gm.QQInterface.sendMessageToChild(e, t);
}), l(n, "OnUpdate", function (e) {
    return
    this.AdsType == o.default.GoogleBatmobi && this.Batmobi.OnUpdate(e);
}), l(n, "vibrateShort", function () {
    return
    gm.DataManager.SettingData.vibration && (this.AdsType == o.default.TT && null != gm.tt && tt.vibrateShort({
        success: function success(e) {},
        fail: function fail(e) {}
    }), cc.sys.platform === cc.sys.WECHAT_GAME && wx.vibrateShort());
}), l(n, "createUserInfoButton", function () {
    return
    this.AdsType, o.default.WeChat;
}), l(n, "BeginRecord", function () {
    return
    var e = new Date();
    this._BeginRecordTime = e.getTime() / 1e3, gm.AdManager.screenStartRecord(function () {
        this.RecrodShareSuccess();
    }.bind(this), null, function () {
        this.RecrodShareFail();
    }.bind(this));
}), l(n, "GetRecordTweenTime", function () {
    return
    return new Date().getTime() / 1e3 - this._BeginRecordTime;
}), l(n, "EndRecord", function (e, t) {
    return
    this.NowRecordAdType = e, t && this.reportAnalytics("Share", {
        From: e,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "unknow",
        Enter: "true"
    }), gm.AdManager.screenStopRecord(t);
}), l(n, "RecrodShareSuccess", function () {
    return
    this.reportAnalytics("Share", {
        From: this.NowRecordAdType,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "true",
        Enter: "true"
    }), gm.UIManager.SendNotification("RVShowCB", this.NowRecordAdType), gm.UIManager.SendNotification(s.default.MOD_TipsView, r.default.UIInfo_ShowView, a.default.LAN_RecordShareSuccess);
}), l(n, "RecrodShareFail", function () {
    return
    this.reportAnalytics("Share", {
        From: this.NowRecordAdType,
        Level: gm.DataManager.userData.NowMission,
        Mission: gm.GameData.NowPorgress,
        Success: "false",
        Enter: "true"
    });
}), l(n, "showMoreGamesModal", function () {
    return
    this.AdsType == o.default.TT && this.TTInterface.showMoreGamesModal();
}), l(n, "reportAnalytics", function (e, t) {
    return
    this.AdsType == o.default.TT && this.TTInterface.reportAnalytics(e, t);
}), n);
module.exports = u
/*ADManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "6a4282BvItFXIdky/d/5a9O", "ADManager");
        var n,
            a = c(e("GameConfig")),
            o = c(e("AdType")),
            s = c(e("ConstModName")),
            r = c(e("UIInfo"));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }

        function l(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        var u = (l(n = {
            AdsType: o.default.TT,
            IsRemoteConfig: !1,
            openClickBanner: !1,
            AdErrorClickRate: 80,
            AdErrorClickCount: 99,
            InterAdShowDelay: .3,
            InterAdShowGap: 20,
            VedioCallBack: {},
            init: function init() {
                this.AdsType == o.default.IosInterface && (this.IosInterface = e("IosInterface"), this.IosInterface.initGame()), this.AdsType == o.default.LoveH5 && (this.H5Interface = e("H5Interface"), this.H5Interface.init()), this.AdsType == o.default.Ad4399 && (this.Web4399Interface = e("Web4399Interface")), this.AdsType == o.default.HelloWorld && (this.HwAdInterface = cc.director.getScene().getChildByName("HwAd").getComponent("HwAdManager"), window.messager.AddEventListener("RVShowCB", this.RVedioPlayComplete.bind(this), this), e("GameAnalytics"), this.HwGameAnalytics = window.analytics, this.HwGameAnalytics.init()), this.AdsType == o.default.Oppo && (this.OppoInterface = e("OppoInterface"), this.OppoInterface.Init()), this.AdsType == o.default.Vivo && (this.VivoInterface = e("VivoInterface"), this.VivoInterface.Init()), this.AdsType == o.default.GoogleBatmobi && (this.Batmobi = new(e("Batmobi"))(), cc.log("this.Batmob>>>>>>>>>>>>>>>>>>>:" + this.Batmobi), this.Batmobi.Init()), cc.log("this.AdsType>>>>>>>>>>>>>>>>>>>:" + this.AdsType), this.AdsType == o.default.MHT && (this.MHTInterface = e("MHTInterface"), this.MHTInterface.Init()), this.AdsType == o.default.WeChat && gm.WXInterface.Init(), this.AdsType == o.default.QQ && (this.QQInterface = e("QQInterface"), this.QQInterface.Init()), this.AdsType == o.default.TT && (this.TTInterface = e("TTInterface"), this.TTInterface.Init()), this.AdsType == o.default.Baidu && (this.BaiduInterface = e("BaiduInterface"), this.BaiduInterface.Init());
            },
            checkLoginState: function checkLoginState() {
                if (this.AdsType == o.default.QQ) {
                    if (null != gm.qq) "1001" != (e = gm.qq.getLaunchOptionsSync()).scene && "3003" != e.scene || gm.DataBase.Data.isClickSaveBtn && 0 == gm.DataBase.Data.hasRewardSave && (gm.DataBase.ChangeHasRewardSave(!0), gm.DataBase.ChangeForeverReward());
                    return "QQ";
                }
                if (this.AdsType == o.default.WeChat) {
                    var e;
                    if (null != gm.wx) "1001" != (e = gm.wx.getLaunchOptionsSync()).scene && "1089" != e.scene || gm.DataBase.Data.isClickSaveBtn && 0 == gm.DataBase.Data.hasRewardSave && (gm.DataBase.ChangeHasRewardSave(!0), gm.DataBase.ChangeForeverReward());
                    return "WeChat";
                }
                return "";
            },
            InitBoxAd: function InitBoxAd() {
                this.AdsType == o.default.WeChat && gm.WXInterface.InitBoxAd();
            },
            IsAlertGameExport: function IsAlertGameExport() {
                return this.AdType == o.default.WeChat;
            },
            playADBanner: function playADBanner() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                this.AdsType == o.default.Vivo && this.VivoInterface.ShowBanner(e, t), this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForBanner(), this.AdsType == o.default.WeChat && gm.WXInterface.ShowBanner(e, t), this.AdsType == o.default.QQ && this.QQInterface.ShowBanner(e, t), this.AdsType == o.default.TT && this.TTInterface.ShowBanner(e, t), this.AdsType == o.default.Oppo && this.OppoInterface.ShowBanner(), this.AdsType == o.default.Baidu && this.BaiduInterface.ShowBanner();
            },
            closeAdBanner: function closeAdBanner() {
                this.AdsType == o.default.WeChat && gm.WXInterface.HideBanner(), this.AdsType == o.default.QQ && this.QQInterface.HideBanner(), this.AdsType == o.default.TT && this.TTInterface.HideBanner(), this.AdsType == o.default.Oppo && this.OppoInterface.HideBanner(), this.AdsType == o.default.Vivo && this.VivoInterface.HideBanner(), this.AdsType == o.default.Baidu && this.BaiduInterface.HideBanner();
            },
            playInterstitial: function playInterstitial(e) {
                if (1 != gm.DataBase.Data.IsNewer) return this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForInterstitial(), this.AdsType == o.default.HelloWorld && this.HwAdInterface.isInterAdAvailable() ? (this.dataRecode(a.default.DATA_InterwatchCount, "1th", "click"), this.HwAdInterface.showInterstitial(), !0) : this.AdsType == o.default.GoogleBatmobi ? (this.dataRecode(a.default.DATA_InterwatchCount, "1th", "click"), this.Batmobi.playInterstitial(e), !0) : (this.AdsType == o.default.Vivo && this.VivoInterface.playInterstitial(), !1);
            },
            PlayNativeAds: function PlayNativeAds(e) {
                this.AdsType == o.default.Vivo && this.VivoInterface.PlayNativeAds(e);
            }
        }, "PlayNativeAds", function (e) {
            this.AdsType == o.default.Vivo && this.VivoInterface.PlayNativeAds(e);
        }), l(n, "NativeReportAdShow", function (e) {
            this.AdsType == o.default.Vivo && this.VivoInterface.NativeReportAdShow(e);
        }), l(n, "NativeReportAdClick", function (e) {
            this.AdsType == o.default.Vivo && this.VivoInterface.NativeReportAdClick(e);
        }), l(n, "playVideo", function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return gm.AdManager.dataRecode(a.default.video_dot, e), null != t && (this.VedioCallBack[e] = t), this.isRVAvailable(e) ? this.AdsType != o.default.None ? (this.reportAnalytics("ShowAd", {
                From: e,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "unknow",
                Enter: "true"
            }), this.AdsType == o.default.IosInterface && this.IosInterface.showAdsForVideo(data), this.AdsType == o.default.LoveH5 && this.H5Interface.playVideo(), this.AdsType == o.default.Ad4399 && this.Web4399Interface.ShowAds(), this.AdsType == o.default.HelloWorld && this.HwAdInterface.isRVAvailable() ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.HwAdInterface.showRewardedVideoAd(e), !0) : this.AdsType == o.default.GoogleBatmobi && this.isRVAvailable() ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.Batmobi.playVideo(e), !0) : this.AdsType == o.default.WeChat && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), gm.WXInterface.ShowVideo(e), !0) : this.AdsType == o.default.QQ && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.QQInterface.ShowVideo(e), !0) : this.AdsType == o.default.TT && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.TTInterface.ShowVideo(e), !0) : this.AdsType == o.default.Oppo && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.OppoInterface.ShowVideo(e), !0) : this.AdsType == o.default.Vivo && this.isRVAvailable(e) ? (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.VivoInterface.ShowVideo(e), !0) : !(this.AdsType != o.default.Baidu || !this.isRVAvailable(e)) && (this.dataRecode(a.default.DATA_ViewVedioCount, "1th", "click"), this.BaiduInterface.ShowVideo(e), !0)) : void this.watchADReward(e) : (gm.UIManager.SendNotification(s.default.MOD_TipsView, r.default.UIInfo_ShowView, a.default.LAN_ADNoReady), void this.reportAnalytics("ShowAd", {
                From: e,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "unknow",
                Enter: "false"
            }));
        }), l(n, "isInterAdAvailable", function (e) {
            return this.AdsType == o.default.HelloWorld ? this.HwAdInterface.isInterAdAvailable() : this.AdsType == o.default.GoogleBatmobi ? this.Batmobi.isInterAdAvailable(e) : this.AdsType == o.default.Vivo && this.VivoInterface.isInterAdAvailable(e);
        }), l(n, "isRVAvailable", function (e) {
            return this.AdsType == o.default.None || (this.AdsType == o.default.HelloWorld ? this.HwAdInterface.isRVAvailable() : this.AdsType == o.default.GoogleBatmobi ? this.Batmobi.isRVAvailable() : this.AdsType == o.default.WeChat ? gm.WXInterface.isRVAvailable(e) : this.AdsType == o.default.QQ ? this.QQInterface.isRVAvailable(e) : this.AdsType == o.default.TT ? this.TTInterface.isRVAvailable(e) : this.AdsType == o.default.Oppo ? this.OppoInterface.isRVAvailable(e) : this.AdsType == o.default.Vivo ? this.VivoInterface.isRVAvailable(e) : this.AdsType == o.default.Baidu && this.BaiduInterface.isRVAvailable(e));
        }), l(n, "RVedioPlayComplete", function () {
            var e = Array.prototype.slice.call(arguments);
            e[2] && gm.UIManager.SendNotification("RVShowCB", e[1]);
        }), l(n, "dataRecode", function (e, t, i) {
            cc.log("dataRecode:" + e), this.AdsType == o.default.IosInterface && ("gameOver" == e ? this.IosInterface.gameOver() : "gameStart" == e ? this.IosInterface.gameStartLevel() : this.IosInterface.userOperate(e)), this.AdsType == o.default.LoveH5 && ("gameOver" == e ? e = "gameOver" : "gameStart" == e && (e = "gameStart"), this.H5Interface.userOperate(e)), this.AdsType == o.default.HelloWorld && ("gameOver" == e ? this.HwAdInterface.plusGameCount() : 1 == arguments.length ? this.HwGameAnalytics.postDesignEvent(e) : 2 == arguments.length ? this.HwGameAnalytics.postDesignEvent(e, t) : 3 == arguments.length && this.HwGameAnalytics.postDesignEvent(e, t, i)), this.AdsType == o.default.GoogleBatmobi && (1 == arguments.length ? this.Batmobi.logEvent(e, "click") : 2 == arguments.length ? this.Batmobi.logEvent(e, t) : 3 == arguments.length && this.Batmobi.logEvent(e, t, i)), this.AdsType == o.default.WeChat && (null != i ? gm.WXInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? gm.WXInterface.dataRecord(e + "_" + t) : gm.WXInterface.dataRecord(e)), this.AdsType == o.default.QQ && (null != i ? this.QQInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? this.QQInterface.dataRecord(e + "_" + t) : this.QQInterface.dataRecord(e)), this.AdsType == o.default.TT && (null != i ? this.TTInterface.dataRecord(e + "_" + t + "_" + i) : null != t ? this.TTInterface.dataRecord(e + "_" + t) : this.TTInterface.dataRecord(e)), this.AdsType, o.default.Oppo, this.AdsType, o.default.Vivo;
        }), l(n, "uploadData", function (e, t) {
            this.AdsType == o.default.IosInterface && this.IosInterface.updateScore(e), this.AdsType == o.default.Ad4399d && this.Web4399Interface.UpdateScore(e), this.AdsType == o.default.HelloWorld && this.HwAdInterface.updateScore(e, t);
        }), l(n, "getRankData", function (e) {
            return this.AdsType == o.default.Ad4399 && (window.h5api.getRank(e), !0);
        }), l(n, "creatTestData", function () {
            for (var e = [], t = 0; t < 100; t++) {
                e.push({
                    id: t,
                    score: 100 + t,
                    rank: t + 1
                });
            }
            return e;
        }), l(n, "showRank", function (e) {
            return this.AdsType == o.default.IosInterface ? (this.IosInterface.showLeaderboad(), !1) : this.AdsType == o.default.Ad4399 ? this.getRankData(e) : this.AdsType == o.default.HelloWorld && this.HwAdInterface.showRank();
        }), l(n, "share", function (e) {
            if (this.AdsType == o.default.IosInterface) {
                var t = data.title || "",
                    i = data.content || "",
                    n = data.url || "";
                this.IosInterface.ShareTitle(t, i, n);
            } else this.AdsType == o.default.WeChat ? gm.WXInterface.shareAppMessage(e) : this.AdsType == o.default.QQ ? this.QQInterface.shareAppMessage(e) : this.AdsType == o.default.TT && this.QQInterface.shareAppMessage();
        }), l(n, "shareToFriend", function (e, t) {
            this.AdsType == o.default.WeChat ? gm.WXInterface.sendMessageToChild(e, t) : this.AdsType == o.default.QQ && this.QQInterface.sendMessageToChild(e, t);
        }), l(n, "watchADReward", function (e) {
            1 == (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) ? (this.reportAnalytics("ShowAd", {
                From: e,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "true",
                Enter: "true"
            }), gm.UIManager.SendNotification("RVShowCB", e), null != this.VedioCallBack[e] && (this.VedioCallBack[e](), delete this.VedioCallBack[e])) : this.reportAnalytics("ShowAd", {
                From: e,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "false",
                Enter: "true"
            });
        }), l(n, "shareSuccess", function () {
            this.AdsType == o.default.IosInterface && this.IosInterface.shareSuccess();
        }), l(n, "shareFail", function () {
            this.AdsType == o.default.IosInterface && this.IosInterface.shareFail();
        }), l(n, "getGameData", function () {
            if (this.AdsType == o.default.IosInterface) return this.IosInterface.getGameData;
        }), l(n, "pasteBoard", function (e) {
            this.AdsType == o.default.IosInterface && this.IosInterface.pasteBoard(e);
        }), l(n, "ShakePhone", function (e) {
            0;
        }), l(n, "GoToStore", function () {
            cc.log("GoToStore>>>>>>>>");
        }), l(n, "GotoMiniProgram", function (e) {
            this.AdsType == o.default.WeChat && gm.WXInterface.navigateToMiniProgram(e), this.AdsType == o.default.QQ && this.QQInterface.navigateToMiniProgram(e), this.AdsType == o.default.TT && this.TTInterface.navigateToMiniProgram(e);
        }), l(n, "ShowBox", function () {
            this.AdsType == o.default.QQ && this.QQInterface.ShowBox();
        }), l(n, "screenStartRecord", function (e, t, i) {
            this.AdsType == o.default.TT && this.TTInterface.screenStartRecord(e, t, i), this.AdsType == o.default.Baidu && this.BaiduInterface.screenStartRecord(e, t, i);
        }), l(n, "screenStopRecord", function (e) {
            this.AdsType == o.default.TT && this.TTInterface.screenStopRecord(e), this.AdsType == o.default.Baidu && this.BaiduInterface.screenStopRecord(e);
        }), l(n, "OpenCustomerServiceConversation", function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.AdsType == o.default.WeChat && gm.WXInterface.openCustomerServiceConversation(e);
        }), l(n, "sendMessageToChild", function (e, t) {
            this.AdsType == o.default.WeChat ? gm.WXInterface.sendMessageToChild(e, t) : this.AdsType == o.default.QQ && gm.QQInterface.sendMessageToChild(e, t);
        }), l(n, "OnUpdate", function (e) {
            this.AdsType == o.default.GoogleBatmobi && this.Batmobi.OnUpdate(e);
        }), l(n, "vibrateShort", function () {
            gm.DataManager.SettingData.vibration && (this.AdsType == o.default.TT && null != gm.tt && tt.vibrateShort({
                success: function success(e) {},
                fail: function fail(e) {}
            }), cc.sys.platform === cc.sys.WECHAT_GAME && wx.vibrateShort());
        }), l(n, "createUserInfoButton", function () {
            this.AdsType, o.default.WeChat;
        }), l(n, "BeginRecord", function () {
            var e = new Date();
            this._BeginRecordTime = e.getTime() / 1e3, gm.AdManager.screenStartRecord(function () {
                this.RecrodShareSuccess();
            }.bind(this), null, function () {
                this.RecrodShareFail();
            }.bind(this));
        }), l(n, "GetRecordTweenTime", function () {
            return new Date().getTime() / 1e3 - this._BeginRecordTime;
        }), l(n, "EndRecord", function (e, t) {
            this.NowRecordAdType = e, t && this.reportAnalytics("Share", {
                From: e,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "unknow",
                Enter: "true"
            }), gm.AdManager.screenStopRecord(t);
        }), l(n, "RecrodShareSuccess", function () {
            this.reportAnalytics("Share", {
                From: this.NowRecordAdType,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "true",
                Enter: "true"
            }), gm.UIManager.SendNotification("RVShowCB", this.NowRecordAdType), gm.UIManager.SendNotification(s.default.MOD_TipsView, r.default.UIInfo_ShowView, a.default.LAN_RecordShareSuccess);
        }), l(n, "RecrodShareFail", function () {
            this.reportAnalytics("Share", {
                From: this.NowRecordAdType,
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Success: "false",
                Enter: "true"
            });
        }), l(n, "showMoreGamesModal", function () {
            this.AdsType == o.default.TT && this.TTInterface.showMoreGamesModal();
        }), l(n, "reportAnalytics", function (e, t) {
            this.AdsType == o.default.TT && this.TTInterface.reportAnalytics(e, t);
        }), n);
        t.exports = u, 
*/