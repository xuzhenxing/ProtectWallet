

 var n = require("GameConfig"),
 a = require("GameDefine"),
 o = require("util"),
 s = require("umsdk");
 var c = ["\u7B54\u9898\u5FEB\u5982\u95EA\u7535\uFF0C\u667A\u5546\u6311\u6218\u8D5B\u5F00\u59CB\u5566\uFF0C\u5FEB\u6765\u6D4B\u9A8C\u81EA\u5DF1\u7684\u667A\u5546\u5427", "\u52A8\u7269\u56ED\u91CC\u5927\u8C61\u7684\u9F3B\u5B50\u6700\u957F,\u90A3\u7B2C\u4E8C\u957F\u7684\u662F\u8C01\u5462?", "\u8FD9\u9898\u592A\u96BE\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u6211"],
 l = [
     ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpWEtFazWnGFZNufR3FnPAdia0ibsBDDxkWgVRshKcgjichBPwPnGLSWibf8/0", "xLwSLWmyTl+74q7XJDlmGw=="],
     ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpUk3oUHugY984kPM3ROYU4dbpiaoWsxicQMz4qavNSnVlhZcQSPDHg19l/0", "nRdBRZcSSTC9TPWdIolVPQ=="]
 ],
 u = {
     RewardType: "",
     BannerAd: null,
     AppBox: null,
     RewardAdsDic: null,
     RewardTypeDic: null,
     appSid: "",
     bannerId: "",
     AdRewardId: "",
     InsertId: "",
     isAdsDoubleRewardAvalibleAd: !1,
     isStartRecord: !1,
     timeId: -1,
     recordTime: 0,
     recorded: !1,
     callback: null,
     recordCallback: null,
     shareFail: null,
     btnPause: !1,
     videoPath: null,
     bannerTimerId: -1,
     showCallBack: null,
     ShowVideoTips: !1,
     Init: function Init() {
         cc.log("swan: " + swan), this.InitBanner(), this.InitRewardAd();
     },
     dataRecord: function dataRecord(e) {
         null != s && s.event("event", e);
     },
     InitRewardAd: function InitRewardAd() {
         var e = this;
         cc.log("InitRewardAd"), this.RewardAdsDic = {}, this.RewardAdsDic[this.AdRewardId] = {
             Ads: null,
             isAvalibleAd: !1
         }, this.RewardTypeDic = {}, this.RewardTypeDic[n.AdPlayType_MainView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LevelView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_RewardView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_MainViewForeAd] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_GetKeyView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_AddKeyView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LackKeyView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LevelLuckView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_MainViewGameAd] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_TipView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_MainViewNext] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_ErrorTipView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_MainViewEmptyKey] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_IQUpView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LuckBagView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_ContinueView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LackIQView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LevelViewBaidu] = this.AdRewardId;
         var t = function t(_t) {
             if (e.RewardAdsDic.hasOwnProperty(_t)) {
                 var i = e.RewardAdsDic[_t];
                 null == i.Ads && (i.Ads = swan.createRewardedVideoAd({
                     adUnitId: _t,
                     appSid: e.appSid
                 }), i.Ads.onError(function (e) {
                     cc.log("video" + _t + " : " + e.errMsg), setTimeout(function () {
                         i.Ads.load();
                     }, 1e3), gm.AdManager.dataRecode("RewardVideoLoadErr");
                 }), i.Ads.onClose(function (t) {
                     if (cc.log("video" + t), t && t.isEnded || void 0 === t) {
                         e.rewardType;
                         gm.AdManager.dataRecode("RewardVideoFinish" + e.RewardType), gm.AdManager.watchADReward(e.RewardType);
                     } else gm.AdManager.watchADReward(e.RewardType, !1), e.ShowVideoTips && (swan.showModal({
                         title: "\u63D0\u793A",
                         content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                         showCancel: !1
                     }), e.ShowVideoTips = !1);
                    //  i.Ads.load(), i.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                 }), i.Ads.onLoad(function () {
                     cc.log(_t + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), i.isAvalibleAd = !0, gm.AdManager.dataRecode("RewardVideoLoad");
                 }));
             }
         };
         for (var i in this.RewardAdsDic) {
             t(i);
         }
     },
     InitBanner: function InitBanner() {},
     ShowBanner: function ShowBanner() {
         arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
     },
     isRVAvailable: function isRVAvailable(e) {
         if (null != swan) {
             var t = this.RewardTypeDic[e];
             return this.RewardAdsDic[t].isAvalibleAd;
         }
         return !1;
     },
     HideBanner: function HideBanner() {},
     ShowVideo: function ShowVideo(e) {
         this.RewardType = e;
         var t = this.RewardTypeDic[e];
         null != this.RewardAdsDic[t] && this.RewardAdsDic[t].isAvalibleAd && (gm.DataManager.userData.VideoCount++, gm.AdManager.dataRecode("RewardVideo" + e), gm.DataBase.SaveUserData(), this.ShowVideoTips = !0, gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), this.RewardAdsDic[t].Ads.show(), this.RewardAdsDic[t].isAvalibleAd = !1);
     },
     SetUserInfo: function SetUserInfo(e) {
         null != swan && swan.setUserCloudStorage({
             KVDataList: e,
             success: function success(e) {
                 cc.log(e);
             },
             fail: function fail(e) {
                 cc.log(e);
             }
         });
     },
     InitScreenRecord: function InitScreenRecord() {
         cc.log("InitScreenRecord");
         var e = swan.getVideoRecorderManager();
         e.onStart(function () {
             cc.log("\u5F55\u5C4F\u5F00\u59CB");
         }.bind(this)), e.onPause(function () {
             cc.log("\u5F55\u5C4F\u6682\u505C");
         }), e.onResume(function () {
             cc.log("\u5F55\u5C4F\u6062\u590D");
         }), e.onStop(function (e) {
             cc.log("\u5F55\u5C4F\u505C\u6B62" + e.videoPath), null != this.recordCallback && this.recordCallback(), this.videoPath = e.videoPath;
         }.bind(this));
     },
     screenStartRecord: function screenStartRecord(e, t, i) {},
     screenStopRecord: function screenStopRecord(e) {},
     showShareMenu: function showShareMenu(e) {
         if (swan) {
             var t = e.withShareTicket,
                 i = e.success,
                 n = e.fail,
                 a = e.complete;
             swan.showShareMenu({
                 withShareTicket: t,
                 success: function success(e) {
                     i && i(e);
                 },
                 fail: function fail(e) {
                     n && n(e);
                 },
                 complete: function complete(e) {
                     a && a(e);
                 }
             });
         }
     },
     hideShareMenu: function hideShareMenu(e) {
         if (swan) {
             var t = e.success,
                 i = e.fail,
                 n = e.complete;
             swan.showShareMenu({
                 success: function success(e) {
                     t && t(e);
                 },
                 fail: function fail(e) {
                     i && i(e);
                 },
                 complete: function complete(e) {
                     n && n(e);
                 }
             });
         }
     },
     shareToFriend: function shareToFriend(e, t) {
         this.sendMessageToChild(e, t);
     },
     shareAppMessage: function shareAppMessage() {
         var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
         arguments.length > 1 && arguments[1];
         if (swan) {
             var t = "";
             t = e.title ? e.title : this.getRandomTitle();
             var i = this.getSharePic(),
                 n = i[0],
                 a = i[1],
                 o = e.query || "",
                 s = e.success,
                 r = e.fail,
                 c = e.complete;
             swan.shareAppMessage({
                 title: t,
                 imageUrl: n,
                 imageUrlId: a,
                 query: o,
                 success: function success(e) {
                     s && s(e);
                 },
                 fail: function fail(e) {
                     r && r(e);
                 },
                 complete: function complete(e) {
                     c && c(e);
                 }
             });
         }
     },
     onShareAppMessage: function onShareAppMessage() {
         var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
             t = (arguments.length > 1 && arguments[1], arguments.length > 2 ? arguments[2] : void 0);
         if (swan) {
             var i = e.query || "",
                 n = e.success,
                 a = e.fail,
                 o = e.complete;
             swan.onShareAppMessage(function (e) {
                 t && t(e);
                 var s = this.getSharePic();
                 return {
                     title: this.getRandomTitle(),
                     imageUrlId: s[1],
                     imageUrl: s[0],
                     query: i,
                     success: function success(e) {
                         n && n(e);
                     },
                     fail: function fail(e) {
                         a && a(e);
                     },
                     complete: function complete(e) {
                         o && o(e);
                     }
                 };
             }.bind(this));
         }
     },
     offShareAppMessage: function offShareAppMessage(e) {
         swan && swan.offShareAppMessage(function (t) {
             e && e(t);
         });
     },
     getShareInfo: function getShareInfo(e) {
         if (swan) {
             var t = e.shareTicket,
                 i = e.success,
                 n = e.fail,
                 a = e.complete;
             swan.getShareInfo({
                 shareTicket: t,
                 success: function success(e) {
                     i && i(e);
                 },
                 fail: function fail(e) {
                     n && n(e);
                 },
                 complete: function complete(e) {
                     a && a(e);
                 }
             });
         }
     },
     updateShareMenu: function updateShareMenu(e) {
         if (swan) {
             var t = e.shareTicket,
                 i = e.success,
                 n = e.fail,
                 a = e.complete;
             swan.updateShareMenu({
                 shareTicket: t,
                 success: function success(e) {
                     i && i(e);
                 },
                 fail: function fail(e) {
                     n && n(e);
                 },
                 complete: function complete(e) {
                     a && a(e);
                 }
             });
         }
     },
     onHide: function onHide(e) {
         null != swan && swan.onHide(e);
     },
     onShow: function onShow(e) {
         null != swan && swan.onShow(e);
     },
     getRandomTitle: function getRandomTitle() {
         var e = parseInt(Math.random() * c.length);
         return e >= c.length && (e %= c.length), c[e];
     },
     getSharePic: function getSharePic() {
         var e = o.getRandom(0, l.length);
         return l[e];
     },
     setUserClodStorage: function setUserClodStorage(e) {
         swan && swan.setUserCloudStorage({
             KVDataList: e.data,
             success: function success() {
                 e.success && e.success();
             },
             fail: function fail() {
                 e.fail && e.fail();
             },
             complete: function complete() {
                 e.complete && e.complete();
             }
         });
     },
     getUserAbility: function getUserAbility(e, t) {
         swan && swan.getSetting({
             success: function (i) {
                 var n = i.authSetting;
                 !0 === n[e] ? t && t() : !1 === n[e] ? (swan.openSetting(), this.showModule({
                     title: "\u5F00\u542F\u6388\u6743",
                     content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                     showCancel: !1,
                     cancelText: "\u53D6\u6D88",
                     confirmText: "\u786E\u8BA4",
                     success: function success() {}
                 })) : swan.authorize({
                     scope: e,
                     success: function success() {
                         t && t();
                     },
                     fail: function fail() {
                         (i.errMsg.indexOf("auth deny") > -1 || i.errMsg.indexOf("auth denied") > -1) && game.uiToastLayer.showTips("\u60A8\u5DF2\u62D2\u7EDD", 2);
                     }
                 });
             }.bind(this)
         });
     },
     sendMessageToChild: function sendMessageToChild(e, t) {
         if (swan)
             for (var i = 0, n = e.length, a = qq.getOpenDataContext(), o = 0; o < n; o++) {
                 a.postMessage({
                     type: e[o].type,
                     operate: e[o].operate,
                     success: function success() {
                         ++i == n && t && t();
                     }
                 });
             }
     },
     savePicToLocal: function savePicToLocal(e) {
         swan && swan.downloadFile({
             url: e,
             success: function success(e) {
                 qq.saveImageToPhotosAlbum({
                     filePath: e.tempFilePath,
                     success: function success() {
                         cc.log("\u56FE\u7247\u4FDD\u5B58\u5230\u672C\u5730\u6210\u529F");
                     },
                     fail: function fail() {
                         game.uiToastLayer.showTips("\u4FDD\u5B58\u56FE\u7247\u5931\u8D25", 3);
                     }
                 });
             },
             fail: function fail() {
                 cc.log("\u4E0B\u8F7D\u56FE\u7247\u5931\u8D25");
             }
         });
     },
     showModule: function showModule() {
         var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
         "{}" == JSON.stringify(e) && (e = {
             title: "\u63D0\u793A\u6846",
             content: "\u9ED8\u8BA4\u5185\u5BB9",
             cancelText: "\u53D6\u6D88",
             confirmText: "\u786E\u8BA4"
         }), swan && swan.showModal(e);
     },
     savePicTips: function savePicTips() {
         this.showModule({
             title: "\u600E\u4E48\u626B\u63CF\u4E8C\u7EF4\u7801",
             content: "\u56FE\u7247\u4FDD\u5B58\u5230\u76F8\u518C\u540E\uFF0C\u70B9\u51FB\u5FAE\u4FE1\u4E2D\u7684\u626B\u4E00\u626B\uFF0C\u7136\u540E\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u76F8\u518C\uFF0C\u4ECE\u76F8\u518C\u4E2D\u9009\u53D6\u8FD9\u5F20\u56FE\u7247\u5373\u53EF\uFF01",
             showCancel: !1,
             cancelText: "\u53D6\u6D88",
             confirmText: "\u786E\u8BA4",
             success: function (e) {
                 e.confirm && this.getUserAbility("scope.writePhotosAlbum", function () {
                     this.savePicToLocal("share.png");
                 }.bind(this));
             }.bind(this),
             fail: function fail() {
                 game.uiToastLayer.showTips("\u63D0\u793A\u6846\u6253\u5F00\u5931\u8D25", 2);
             }
         });
     },
     previewImage: function previewImage(e) {
         e.urls || (e.urls = [""]);
         var t = this.getSharePic(1);
         swan.previewImage({
             current: e.urls[t],
             urls: e.urls,
             success: function success() {
                 e.success && e.success();
             },
             fail: function fail() {
                 e.fail && e.fail();
             },
             complete: function complete() {
                 e.complete && e.complete();
             }
         });
     },
     navigateToMiniProgram: function navigateToMiniProgram(e) {
         cc.log(e), null != swan && swan.navigateToMiniProgram({
             appId: e
         });
     },
     showMoreGamesModal: function showMoreGamesModal() {
         null != swan && "ios" !== swan.getSystemInfoSync().platform && swan.showMoreGamesModal({
             appLaunchOptions: [{
                 appId: "tt7fa90914e0837d25",
                 query: "foo=bar&baz=qux",
                 extraData: {}
             }],
             success: function success(e) {
                 cc.log("success", e.errMsg);
             },
             fail: function fail(e) {
                 cc.log("fail", e.errMsg);
             }
         });
     }
 };
 module.exports = u
/*BaiduInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9c492L64GxLMo4SWQeiaNxy", "BaiduInterface");
        var n = r(e("GameConfig")),
            a = r(e("GameDefine")),
            o = r(e("util")),
            s = r(e("umsdk"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var c = ["\u7B54\u9898\u5FEB\u5982\u95EA\u7535\uFF0C\u667A\u5546\u6311\u6218\u8D5B\u5F00\u59CB\u5566\uFF0C\u5FEB\u6765\u6D4B\u9A8C\u81EA\u5DF1\u7684\u667A\u5546\u5427", "\u52A8\u7269\u56ED\u91CC\u5927\u8C61\u7684\u9F3B\u5B50\u6700\u957F,\u90A3\u7B2C\u4E8C\u957F\u7684\u662F\u8C01\u5462?", "\u8FD9\u9898\u592A\u96BE\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u6211"],
            l = [
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpWEtFazWnGFZNufR3FnPAdia0ibsBDDxkWgVRshKcgjichBPwPnGLSWibf8/0", "xLwSLWmyTl+74q7XJDlmGw=="],
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpUk3oUHugY984kPM3ROYU4dbpiaoWsxicQMz4qavNSnVlhZcQSPDHg19l/0", "nRdBRZcSSTC9TPWdIolVPQ=="]
            ],
            u = {
                RewardType: "",
                BannerAd: null,
                AppBox: null,
                RewardAdsDic: null,
                RewardTypeDic: null,
                appSid: "c449e266",
                bannerId: "7013609",
                AdRewardId: "7013608",
                InsertId: "1ao9736p7j4lej40io",
                isAdsDoubleRewardAvalibleAd: !1,
                isStartRecord: !1,
                timeId: -1,
                recordTime: 0,
                recorded: !1,
                callback: null,
                recordCallback: null,
                shareFail: null,
                btnPause: !1,
                videoPath: null,
                bannerTimerId: -1,
                showCallBack: null,
                ShowVideoTips: !1,
                Init: function Init() {
                    cc.log("swan: " + swan), this.InitBanner(), this.InitRewardAd();
                },
                dataRecord: function dataRecord(e) {
                    null != s.default && s.default.event("event", e);
                },
                InitRewardAd: function InitRewardAd() {
                    var e = this;
                    cc.log("InitRewardAd"), this.RewardAdsDic = {}, this.RewardAdsDic[this.AdRewardId] = {
                        Ads: null,
                        isAvalibleAd: !1
                    }, this.RewardTypeDic = {}, this.RewardTypeDic[n.default.AdPlayType_MainView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LevelView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_RewardView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_MainViewForeAd] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_GetKeyView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_AddKeyView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LackKeyView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LevelLuckView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_MainViewGameAd] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_TipView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_MainViewNext] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_ErrorTipView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_MainViewEmptyKey] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_IQUpView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LuckBagView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_ContinueView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LackIQView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LevelViewBaidu] = this.AdRewardId;
                    var t = function t(_t) {
                        if (e.RewardAdsDic.hasOwnProperty(_t)) {
                            var i = e.RewardAdsDic[_t];
                            null == i.Ads && (i.Ads = swan.createRewardedVideoAd({
                                adUnitId: _t,
                                appSid: e.appSid
                            }), i.Ads.onError(function (e) {
                                cc.log("video" + _t + " : " + e.errMsg), setTimeout(function () {
                                    i.Ads.load();
                                }, 1e3), gm.AdManager.dataRecode("RewardVideoLoadErr");
                            }), i.Ads.onClose(function (t) {
                                if (cc.log("video" + t), t && t.isEnded || void 0 === t) {
                                    e.rewardType;
                                    gm.AdManager.dataRecode("RewardVideoFinish" + e.RewardType), gm.AdManager.watchADReward(e.RewardType);
                                } else gm.AdManager.watchADReward(e.RewardType, !1), e.ShowVideoTips && (swan.showModal({
                                    title: "\u63D0\u793A",
                                    content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                                    showCancel: !1
                                }), e.ShowVideoTips = !1);
                                i.Ads.load(), i.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                            }), i.Ads.onLoad(function () {
                                cc.log(_t + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), i.isAvalibleAd = !0, gm.AdManager.dataRecode("RewardVideoLoad");
                            }));
                        }
                    };
                    for (var i in this.RewardAdsDic) {
                        t(i);
                    }
                },
                InitBanner: function InitBanner() {},
                ShowBanner: function ShowBanner() {
                    arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                },
                isRVAvailable: function isRVAvailable(e) {
                    if (null != swan) {
                        var t = this.RewardTypeDic[e];
                        return this.RewardAdsDic[t].isAvalibleAd;
                    }
                    return !1;
                },
                HideBanner: function HideBanner() {},
                ShowVideo: function ShowVideo(e) {
                    this.RewardType = e;
                    var t = this.RewardTypeDic[e];
                    null != this.RewardAdsDic[t] && this.RewardAdsDic[t].isAvalibleAd && (gm.DataManager.userData.VideoCount++, gm.AdManager.dataRecode("RewardVideo" + e), gm.DataBase.SaveUserData(), this.ShowVideoTips = !0, gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), this.RewardAdsDic[t].Ads.show(), this.RewardAdsDic[t].isAvalibleAd = !1);
                },
                SetUserInfo: function SetUserInfo(e) {
                    null != swan && swan.setUserCloudStorage({
                        KVDataList: e,
                        success: function success(e) {
                            cc.log(e);
                        },
                        fail: function fail(e) {
                            cc.log(e);
                        }
                    });
                },
                InitScreenRecord: function InitScreenRecord() {
                    cc.log("InitScreenRecord");
                    var e = swan.getVideoRecorderManager();
                    e.onStart(function () {
                        cc.log("\u5F55\u5C4F\u5F00\u59CB");
                    }.bind(this)), e.onPause(function () {
                        cc.log("\u5F55\u5C4F\u6682\u505C");
                    }), e.onResume(function () {
                        cc.log("\u5F55\u5C4F\u6062\u590D");
                    }), e.onStop(function (e) {
                        cc.log("\u5F55\u5C4F\u505C\u6B62" + e.videoPath), null != this.recordCallback && this.recordCallback(), this.videoPath = e.videoPath;
                    }.bind(this));
                },
                screenStartRecord: function screenStartRecord(e, t, i) {},
                screenStopRecord: function screenStopRecord(e) {},
                showShareMenu: function showShareMenu(e) {
                    if (swan) {
                        var t = e.withShareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        swan.showShareMenu({
                            withShareTicket: t,
                            success: function success(e) {
                                i && i(e);
                            },
                            fail: function fail(e) {
                                n && n(e);
                            },
                            complete: function complete(e) {
                                a && a(e);
                            }
                        });
                    }
                },
                hideShareMenu: function hideShareMenu(e) {
                    if (swan) {
                        var t = e.success,
                            i = e.fail,
                            n = e.complete;
                        swan.showShareMenu({
                            success: function success(e) {
                                t && t(e);
                            },
                            fail: function fail(e) {
                                i && i(e);
                            },
                            complete: function complete(e) {
                                n && n(e);
                            }
                        });
                    }
                },
                shareToFriend: function shareToFriend(e, t) {
                    this.sendMessageToChild(e, t);
                },
                shareAppMessage: function shareAppMessage() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    arguments.length > 1 && arguments[1];
                    if (swan) {
                        var t = "";
                        t = e.title ? e.title : this.getRandomTitle();
                        var i = this.getSharePic(),
                            n = i[0],
                            a = i[1],
                            o = e.query || "",
                            s = e.success,
                            r = e.fail,
                            c = e.complete;
                        swan.shareAppMessage({
                            title: t,
                            imageUrl: n,
                            imageUrlId: a,
                            query: o,
                            success: function success(e) {
                                s && s(e);
                            },
                            fail: function fail(e) {
                                r && r(e);
                            },
                            complete: function complete(e) {
                                c && c(e);
                            }
                        });
                    }
                },
                onShareAppMessage: function onShareAppMessage() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = (arguments.length > 1 && arguments[1], arguments.length > 2 ? arguments[2] : void 0);
                    if (swan) {
                        var i = e.query || "",
                            n = e.success,
                            a = e.fail,
                            o = e.complete;
                        swan.onShareAppMessage(function (e) {
                            t && t(e);
                            var s = this.getSharePic();
                            return {
                                title: this.getRandomTitle(),
                                imageUrlId: s[1],
                                imageUrl: s[0],
                                query: i,
                                success: function success(e) {
                                    n && n(e);
                                },
                                fail: function fail(e) {
                                    a && a(e);
                                },
                                complete: function complete(e) {
                                    o && o(e);
                                }
                            };
                        }.bind(this));
                    }
                },
                offShareAppMessage: function offShareAppMessage(e) {
                    swan && swan.offShareAppMessage(function (t) {
                        e && e(t);
                    });
                },
                getShareInfo: function getShareInfo(e) {
                    if (swan) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        swan.getShareInfo({
                            shareTicket: t,
                            success: function success(e) {
                                i && i(e);
                            },
                            fail: function fail(e) {
                                n && n(e);
                            },
                            complete: function complete(e) {
                                a && a(e);
                            }
                        });
                    }
                },
                updateShareMenu: function updateShareMenu(e) {
                    if (swan) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        swan.updateShareMenu({
                            shareTicket: t,
                            success: function success(e) {
                                i && i(e);
                            },
                            fail: function fail(e) {
                                n && n(e);
                            },
                            complete: function complete(e) {
                                a && a(e);
                            }
                        });
                    }
                },
                onHide: function onHide(e) {
                    null != swan && swan.onHide(e);
                },
                onShow: function onShow(e) {
                    null != swan && swan.onShow(e);
                },
                getRandomTitle: function getRandomTitle() {
                    var e = parseInt(Math.random() * c.length);
                    return e >= c.length && (e %= c.length), c[e];
                },
                getSharePic: function getSharePic() {
                    var e = o.default.getRandom(0, l.length);
                    return l[e];
                },
                setUserClodStorage: function setUserClodStorage(e) {
                    swan && swan.setUserCloudStorage({
                        KVDataList: e.data,
                        success: function success() {
                            e.success && e.success();
                        },
                        fail: function fail() {
                            e.fail && e.fail();
                        },
                        complete: function complete() {
                            e.complete && e.complete();
                        }
                    });
                },
                getUserAbility: function getUserAbility(e, t) {
                    swan && swan.getSetting({
                        success: function (i) {
                            var n = i.authSetting;
                            !0 === n[e] ? t && t() : !1 === n[e] ? (swan.openSetting(), this.showModule({
                                title: "\u5F00\u542F\u6388\u6743",
                                content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                                showCancel: !1,
                                cancelText: "\u53D6\u6D88",
                                confirmText: "\u786E\u8BA4",
                                success: function success() {}
                            })) : swan.authorize({
                                scope: e,
                                success: function success() {
                                    t && t();
                                },
                                fail: function fail() {
                                    (i.errMsg.indexOf("auth deny") > -1 || i.errMsg.indexOf("auth denied") > -1) && game.uiToastLayer.showTips("\u60A8\u5DF2\u62D2\u7EDD", 2);
                                }
                            });
                        }.bind(this)
                    });
                },
                sendMessageToChild: function sendMessageToChild(e, t) {
                    if (swan)
                        for (var i = 0, n = e.length, a = qq.getOpenDataContext(), o = 0; o < n; o++) {
                            a.postMessage({
                                type: e[o].type,
                                operate: e[o].operate,
                                success: function success() {
                                    ++i == n && t && t();
                                }
                            });
                        }
                },
                savePicToLocal: function savePicToLocal(e) {
                    swan && swan.downloadFile({
                        url: e,
                        success: function success(e) {
                            qq.saveImageToPhotosAlbum({
                                filePath: e.tempFilePath,
                                success: function success() {
                                    cc.log("\u56FE\u7247\u4FDD\u5B58\u5230\u672C\u5730\u6210\u529F");
                                },
                                fail: function fail() {
                                    game.uiToastLayer.showTips("\u4FDD\u5B58\u56FE\u7247\u5931\u8D25", 3);
                                }
                            });
                        },
                        fail: function fail() {
                            cc.log("\u4E0B\u8F7D\u56FE\u7247\u5931\u8D25");
                        }
                    });
                },
                showModule: function showModule() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    "{}" == JSON.stringify(e) && (e = {
                        title: "\u63D0\u793A\u6846",
                        content: "\u9ED8\u8BA4\u5185\u5BB9",
                        cancelText: "\u53D6\u6D88",
                        confirmText: "\u786E\u8BA4"
                    }), swan && swan.showModal(e);
                },
                savePicTips: function savePicTips() {
                    this.showModule({
                        title: "\u600E\u4E48\u626B\u63CF\u4E8C\u7EF4\u7801",
                        content: "\u56FE\u7247\u4FDD\u5B58\u5230\u76F8\u518C\u540E\uFF0C\u70B9\u51FB\u5FAE\u4FE1\u4E2D\u7684\u626B\u4E00\u626B\uFF0C\u7136\u540E\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u76F8\u518C\uFF0C\u4ECE\u76F8\u518C\u4E2D\u9009\u53D6\u8FD9\u5F20\u56FE\u7247\u5373\u53EF\uFF01",
                        showCancel: !1,
                        cancelText: "\u53D6\u6D88",
                        confirmText: "\u786E\u8BA4",
                        success: function (e) {
                            e.confirm && this.getUserAbility("scope.writePhotosAlbum", function () {
                                this.savePicToLocal("share.png");
                            }.bind(this));
                        }.bind(this),
                        fail: function fail() {
                            game.uiToastLayer.showTips("\u63D0\u793A\u6846\u6253\u5F00\u5931\u8D25", 2);
                        }
                    });
                },
                previewImage: function previewImage(e) {
                    e.urls || (e.urls = [""]);
                    var t = this.getSharePic(1);
                    swan.previewImage({
                        current: e.urls[t],
                        urls: e.urls,
                        success: function success() {
                            e.success && e.success();
                        },
                        fail: function fail() {
                            e.fail && e.fail();
                        },
                        complete: function complete() {
                            e.complete && e.complete();
                        }
                    });
                },
                navigateToMiniProgram: function navigateToMiniProgram(e) {
                    cc.log(e), null != swan && swan.navigateToMiniProgram({
                        appId: e
                    });
                },
                showMoreGamesModal: function showMoreGamesModal() {
                    null != swan && "ios" !== swan.getSystemInfoSync().platform && swan.showMoreGamesModal({
                        appLaunchOptions: [{
                            appId: "tt7fa90914e0837d25",
                            query: "foo=bar&baz=qux",
                            extraData: {}
                        }],
                        success: function success(e) {
                            cc.log("success", e.errMsg);
                        },
                        fail: function fail(e) {
                            cc.log("fail", e.errMsg);
                        }
                    });
                }
            };
        t.exports = u, 
*/
