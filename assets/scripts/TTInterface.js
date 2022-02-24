

var n = require("GameConfig"),
a = require("GameDefine"),
o = require("util");
// function s(e) {
//     return e && e.__esModule ? e : {
//         default: e
//     };
// }
var r = ["\u7B54\u9898\u5FEB\u5982\u95EA\u7535\uFF0C\u667A\u5546\u6311\u6218\u8D5B\u5F00\u59CB\u5566\uFF0C\u5FEB\u6765\u6D4B\u9A8C\u81EA\u5DF1\u7684\u667A\u5546\u5427", "\u52A8\u7269\u56ED\u91CC\u5927\u8C61\u7684\u9F3B\u5B50\u6700\u957F,\u90A3\u7B2C\u4E8C\u957F\u7684\u662F\u8C01\u5462?", "\u8FD9\u9898\u592A\u96BE\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u6211"],
    c = [
        ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpWEtFazWnGFZNufR3FnPAdia0ibsBDDxkWgVRshKcgjichBPwPnGLSWibf8/0", "xLwSLWmyTl+74q7XJDlmGw=="],
        ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpUk3oUHugY984kPM3ROYU4dbpiaoWsxicQMz4qavNSnVlhZcQSPDHg19l/0", "nRdBRZcSSTC9TPWdIolVPQ=="]
    ],
    l = {
        RewardType: "",
        BannerAd: null,
        AppBox: null,
        RewardAdsDic: null,
        RewardTypeDic: null,
        bannerId: "6ap09n9t4k4256djc0",
        AdRewardId: "5el23j2d4fi986f12q",
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
        Topics: ["\u6551\u6551\u6821\u82B1"],
        bannerTimerId: -1,
        showCallBack: null,
        ShowVideoTips: !1,
        Init: function Init() {
            // ????
            if (console.log("gm.tt:" + gm.tt), null != gm.tt) {
                var e = tt.getLaunchOptionsSync();
                console.log("LaunchOptions is " + JSON.stringify(e)), Math.random() > .95 && tt.reportAnalytics("LaunchOptions", {
                    str: JSON.stringify(e)
                }), this.CheckUpdate(), this.InitBanner(), this.InitRewardAd(), this.InitScreenRecord();
            }
        },
        CheckUpdate: function CheckUpdate() {
            var e = tt.getUpdateManager();
            e.onUpdateReady(function () {
                tt.showModal({
                    title: "\u66F4\u65B0\u63D0\u793A",
                    content: "\u65B0\u7248\u672C\u5DF2\u7ECF\u51C6\u5907\u597D\uFF0C\u662F\u5426\u7ACB\u5373\u4F7F\u7528\uFF1F",
                    success: function success(t) {
                        t.confirm ? e.applyUpdate() : tt.showToast({
                            icon: "none",
                            title: "\u6E38\u620F\u4E0B\u6B21\u542F\u52A8\u65F6\u4F1A\u4F7F\u7528\u65B0\u7248\u672C"
                        });
                    }
                });
            });
        },
        dataRecord: function dataRecord(e, t) {},
        reportAnalytics: function reportAnalytics(e, t) {
            tt.reportAnalytics(e, t);
        },
        InitRewardAd: function InitRewardAd() {
            var e = this;
            cc.log("InitRewardAd"), this.RewardAdsDic = {}, this.RewardAdsDic[this.AdRewardId] = {
                Ads: null,
                isAvalibleAd: !1
            }, this.RewardTypeDic = {}, this.RewardTypeDic[n.AdPlayType_LevelView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LevelFailView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_MainViewTip] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LevelViewNext] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_LuckBagView] = this.AdRewardId, this.RewardTypeDic[n.AdPlayType_ShowRewardView] = this.AdRewardId;
            var t = function t(_t11) {
                if (e.RewardAdsDic.hasOwnProperty(_t11)) {
                    var i = e.RewardAdsDic[_t11];
                    null == i.Ads && (i.Ads = gm.tt.createRewardedVideoAd({
                        adUnitId: _t11
                    }), i.Ads.onError(function (e) {
                        console.log("video" + _t11 + " : " + e.errMsg), setTimeout(function () {
                            i.Ads.load();
                        }, 1e3), gm.AdManager.dataRecode("RewardVideoLoadErr");
                    }), i.Ads.onClose(function (n) {
                        for (var o in cc.log("video" + n), n) {
                            if (n.hasOwnProperty(o)) {
                                var s = n[o];
                                cc.log("key " + _t11 + " value " + s);
                            }
                        }
                        n && n.isEnded || void 0 === n ? gm.AdManager.watchADReward(e.RewardType) : (gm.AdManager.watchADReward(e.RewardType, !1), e.ShowVideoTips && (gm.tt.showModal({
                            title: "\u63D0\u793A",
                            content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                            showCancel: !1
                        }), e.ShowVideoTips = !1)), i.Ads.load(), i.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                    }), i.Ads.onLoad(function () {
                        console.log(_t11 + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), i.isAvalibleAd = !0, gm.AdManager.dataRecode("RewardVideoLoad"), gm.AdManager.reportAnalytics("AdRequest", {
                            id: _t11
                        });
                    }));
                }
            };
            for (var i in this.RewardAdsDic) {
                t(i);
            }
        },
        InitBanner: function InitBanner() {
            var e = this;
            console.log("InitBanner");
            var t = gm.tt.getSystemInfoSync(),
                i = (t.windowWidth, t.windowHeight, !1);
            t.model.indexOf("iPhone") > -1 ? i = t.windowWidth / t.windowHeight < .5 : i = !1, this.BannerAd = gm.tt.createBannerAd({
                adUnitId: this.bannerId,
                adIntervals: 30,
                style: {
                    width: 208
                }
            }), this.BannerAd.onError(function (e) {
                for (var t in console.log("banner" + e), e) {
                    if (e.hasOwnProperty(t)) {
                        var i = e[t];
                        console.log("BannerErr " + t + " " + i);
                    }
                }
            }), this.BannerAd.onLoad(function () {
                console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
            });
            var o = tt.getSystemInfoSync(),
                s = o.windowWidth,
                r = o.windowHeight;
            this.BannerAd.onResize(function (t) {
                console.log("bannersize"), console.log(t), e.BannerAd.style.top = i ? r - t.height - 40 : r - t.height, e.BannerAd.style.left = (s - t.width) / 2;
                var o = t.height / r * a.GameSize.y;
                n.bottomHeight = i ? o + 100 : o + 10;
            }), this.BannerAd.hide();
        },
        ShowBanner: function ShowBanner() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        },
        isRVAvailable: function isRVAvailable(e) {
            if (null != gm.tt) {
                var t = this.RewardTypeDic[e];
                return this.RewardAdsDic[t].isAvalibleAd;
            }
            return !1;
        },
        HideBanner: function HideBanner() {},
        ShowVideo: function ShowVideo(e) {
            this.RewardType = e;
            var t = this.RewardTypeDic[e];
            null != this.RewardAdsDic[t] && this.RewardAdsDic[t].isAvalibleAd && (gm.DataManager.userData.VideoCount++, tt.reportAnalytics("RewardVideo", {
                From: e,
                Level: gm.DataManager.userData.NowLevel,
                Count: gm.DataManager.userData.VideoCount
            }), gm.AdManager.dataRecode("RewardVideo" + e), gm.DataBase.SaveUserData(), this.ShowVideoTips = !0, this.RewardAdsDic[t].Ads.show(), this.RewardAdsDic[t].isAvalibleAd = !1);
        },
        SetUserInfo: function SetUserInfo(e) {
            null != gm.tt && gm.tt.setUserCloudStorage({
                KVDataList: e,
                success: function success(e) {
                    console.log(e);
                },
                fail: function fail(e) {
                    console.log(e);
                }
            });
        },
        getUserInfo: function getUserInfo() {
            gm.wx && gm.wx.authorize({
                scope: "scope.userInfo"
            });
        },
        updateRecord: function updateRecord() {},
        InitScreenRecord: function InitScreenRecord() {
            cc.log("InitScreenRecord");
            var e = gm.tt.getGameRecorderManager();
            e.onStart(function () {
                console.log("\u5F55\u5C4F\u5F00\u59CB");
            }.bind(this)), e.onPause(function () {
                console.log("\u5F55\u5C4F\u6682\u505C");
            }), e.onResume(function () {
                console.log("\u5F55\u5C4F\u6062\u590D");
            }), e.onStop(function (e) {
                console.log("\u5F55\u5C4F\u505C\u6B62" + e.videoPath), null != this.recordCallback && this.recordCallback(), this.videoPath = e.videoPath;
            }.bind(this));
        },
        screenStartRecord: function screenStartRecord(e, t, i) {
            null != gm.tt && (this.callback = e, this.recordCallback = t, this.shareFail = i, gm.tt.getGameRecorderManager().start({
                duration: 300
            }), cc.log("\u5F00\u59CB\u5F55\u5C4F"));
        },
        screenStopRecord: function screenStopRecord(e) {
            if (null != gm.tt) {
                cc.log("\u5C4F\u5E55\u7ED3\u675F\u5F55\u5236");
                var t = gm.tt.getGameRecorderManager();
                this.btnPause = e, 1 == this.btnPause ? null != this.videoPath ? (console.log("BeginShare"), gm.tt.shareAppMessage({
                    channel: "video",
                    title: "\u6551\u6551\u6821\u82B1",
                    desc: "\u6821\u82B1\u9047\u5230\u4E86\u52AB\u532A\uFF0C\u5FEB\u53BB\u6551\u6551\u5979",
                    query: "",
                    extra: {
                        withVideoId: !0,
                        videoPath: this.videoPath,
                        videoTopics: this.Topics,
                        createChallenge: !0
                    },
                    success: function (e) {
                        console.log(JSON.stringify(e)), console.log("\u5206\u4EAB\u89C6\u9891\u6210\u529F"), null != this.callback && this.callback();
                    }.bind(this),
                    fail: function (e) {
                        null != this.shareFail && this.shareFail(), null != e.errMsg && e.errMsg.indexOf("cancel"), console.log("\u5206\u4EAB\u89C6\u9891\u5931\u8D25" + JSON.stringify(e));
                    }.bind(this)
                })) : cc.log("video Path ==null  ") : t.stop();
            }
        },
        showShareMenu: function showShareMenu(e) {
            if (gm.tt) {
                var t = e.withShareTicket,
                    i = e.success,
                    n = e.fail,
                    a = e.complete;
                gm.tt.showShareMenu({
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
            if (gm.tt) {
                var t = e.success,
                    i = e.fail,
                    n = e.complete;
                gm.tt.showShareMenu({
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
            if (gm.tt) {
                var t = "";
                t = e.title ? e.title : this.getRandomTitle();
                var i = this.getSharePic(),
                    n = i[0],
                    a = i[1],
                    o = e.query || "",
                    s = e.success,
                    r = e.fail,
                    c = e.complete;
                gm.tt.shareAppMessage({
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
            if (gm.tt) {
                var i = e.query || "",
                    n = e.success,
                    a = e.fail,
                    o = e.complete;
                gm.tt.onShareAppMessage(function (e) {
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
            gm.tt && gm.tt.offShareAppMessage(function (t) {
                e && e(t);
            });
        },
        getShareInfo: function getShareInfo(e) {
            if (gm.tt) {
                var t = e.shareTicket,
                    i = e.success,
                    n = e.fail,
                    a = e.complete;
                gm.tt.getShareInfo({
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
            if (gm.tt) {
                var t = e.shareTicket,
                    i = e.success,
                    n = e.fail,
                    a = e.complete;
                gm.tt.updateShareMenu({
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
            null != gm.tt && gm.tt.onHide(e);
        },
        onShow: function onShow(e) {
            null != gm.tt && gm.tt.onShow(e);
        },
        getRandomTitle: function getRandomTitle() {
            var e = parseInt(Math.random() * r.length);
            return e >= r.length && (e %= r.length), r[e];
        },
        getSharePic: function getSharePic() {
            var e = o.getRandom(0, c.length);
            return c[e];
        },
        setUserClodStorage: function setUserClodStorage(e) {
            gm.tt && gm.tt.setUserCloudStorage({
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
            gm.tt && gm.tt.getSetting({
                success: function (i) {
                    var n = i.authSetting;
                    !0 === n[e] ? t && t() : !1 === n[e] ? (gm.tt.openSetting(), this.showModule({
                        title: "\u5F00\u542F\u6388\u6743",
                        content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                        showCancel: !1,
                        cancelText: "\u53D6\u6D88",
                        confirmText: "\u786E\u8BA4",
                        success: function success() {}
                    })) : gm.tt.authorize({
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
            if (gm.tt)
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
            gm.tt && gm.tt.downloadFile({
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
            }), gm.tt && gm.tt.showModal(e);
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
            gm.tt.previewImage({
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
            console.log(e), null != gm.tt && gm.tt.navigateToMiniProgram({
                appId: e
            });
        },
        showMoreGamesModal: function showMoreGamesModal() {
            null != gm.tt && "ios" !== tt.getSystemInfoSync().platform && tt.showMoreGamesModal({
                appLaunchOptions: [{
                    appId: "tt7fa90914e0837d25",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                }],
                success: function success(e) {
                    console.log("success", e.errMsg);
                },
                fail: function fail(e) {
                    console.log("fail", e.errMsg);
                }
            });
        }
    };
    module.exports = l
/*TTInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b277bOruphPR7NtOQ7AJF+k", "TTInterface");
        var n = s(e("GameConfig")),
            a = s(e("GameDefine")),
            o = s(e("util"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = ["\u7B54\u9898\u5FEB\u5982\u95EA\u7535\uFF0C\u667A\u5546\u6311\u6218\u8D5B\u5F00\u59CB\u5566\uFF0C\u5FEB\u6765\u6D4B\u9A8C\u81EA\u5DF1\u7684\u667A\u5546\u5427", "\u52A8\u7269\u56ED\u91CC\u5927\u8C61\u7684\u9F3B\u5B50\u6700\u957F,\u90A3\u7B2C\u4E8C\u957F\u7684\u662F\u8C01\u5462?", "\u8FD9\u9898\u592A\u96BE\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u6211"],
            c = [
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpWEtFazWnGFZNufR3FnPAdia0ibsBDDxkWgVRshKcgjichBPwPnGLSWibf8/0", "xLwSLWmyTl+74q7XJDlmGw=="],
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpUk3oUHugY984kPM3ROYU4dbpiaoWsxicQMz4qavNSnVlhZcQSPDHg19l/0", "nRdBRZcSSTC9TPWdIolVPQ=="]
            ],
            l = {
                RewardType: "",
                BannerAd: null,
                AppBox: null,
                RewardAdsDic: null,
                RewardTypeDic: null,
                bannerId: "6ap09n9t4k4256djc0",
                AdRewardId: "5el23j2d4fi986f12q",
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
                Topics: ["\u6551\u6551\u6821\u82B1"],
                bannerTimerId: -1,
                showCallBack: null,
                ShowVideoTips: !1,
                Init: function Init() {
                    if (console.log("gm.tt:" + gm.tt), null != gm.tt) {
                        var e = tt.getLaunchOptionsSync();
                        console.log("LaunchOptions is " + JSON.stringify(e)), Math.random() > .95 && tt.reportAnalytics("LaunchOptions", {
                            str: JSON.stringify(e)
                        }), this.CheckUpdate(), this.InitBanner(), this.InitRewardAd(), this.InitScreenRecord();
                    }
                },
                CheckUpdate: function CheckUpdate() {
                    var e = tt.getUpdateManager();
                    e.onUpdateReady(function () {
                        tt.showModal({
                            title: "\u66F4\u65B0\u63D0\u793A",
                            content: "\u65B0\u7248\u672C\u5DF2\u7ECF\u51C6\u5907\u597D\uFF0C\u662F\u5426\u7ACB\u5373\u4F7F\u7528\uFF1F",
                            success: function success(t) {
                                t.confirm ? e.applyUpdate() : tt.showToast({
                                    icon: "none",
                                    title: "\u6E38\u620F\u4E0B\u6B21\u542F\u52A8\u65F6\u4F1A\u4F7F\u7528\u65B0\u7248\u672C"
                                });
                            }
                        });
                    });
                },
                dataRecord: function dataRecord(e, t) {},
                reportAnalytics: function reportAnalytics(e, t) {
                    tt.reportAnalytics(e, t);
                },
                InitRewardAd: function InitRewardAd() {
                    var e = this;
                    cc.log("InitRewardAd"), this.RewardAdsDic = {}, this.RewardAdsDic[this.AdRewardId] = {
                        Ads: null,
                        isAvalibleAd: !1
                    }, this.RewardTypeDic = {}, this.RewardTypeDic[n.default.AdPlayType_LevelView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LevelFailView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_MainViewTip] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LevelViewNext] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_LuckBagView] = this.AdRewardId, this.RewardTypeDic[n.default.AdPlayType_ShowRewardView] = this.AdRewardId;
                    var t = function t(_t11) {
                        if (e.RewardAdsDic.hasOwnProperty(_t11)) {
                            var i = e.RewardAdsDic[_t11];
                            null == i.Ads && (i.Ads = gm.tt.createRewardedVideoAd({
                                adUnitId: _t11
                            }), i.Ads.onError(function (e) {
                                console.log("video" + _t11 + " : " + e.errMsg), setTimeout(function () {
                                    i.Ads.load();
                                }, 1e3), gm.AdManager.dataRecode("RewardVideoLoadErr");
                            }), i.Ads.onClose(function (n) {
                                for (var o in cc.log("video" + n), n) {
                                    if (n.hasOwnProperty(o)) {
                                        var s = n[o];
                                        cc.log("key " + _t11 + " value " + s);
                                    }
                                }
                                n && n.isEnded || void 0 === n ? gm.AdManager.watchADReward(e.RewardType) : (gm.AdManager.watchADReward(e.RewardType, !1), e.ShowVideoTips && (gm.tt.showModal({
                                    title: "\u63D0\u793A",
                                    content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                                    showCancel: !1
                                }), e.ShowVideoTips = !1)), i.Ads.load(), i.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                            }), i.Ads.onLoad(function () {
                                console.log(_t11 + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), i.isAvalibleAd = !0, gm.AdManager.dataRecode("RewardVideoLoad"), gm.AdManager.reportAnalytics("AdRequest", {
                                    id: _t11
                                });
                            }));
                        }
                    };
                    for (var i in this.RewardAdsDic) {
                        t(i);
                    }
                },
                InitBanner: function InitBanner() {
                    var e = this;
                    console.log("InitBanner");
                    var t = gm.tt.getSystemInfoSync(),
                        i = (t.windowWidth, t.windowHeight, !1);
                    t.model.indexOf("iPhone") > -1 ? i = t.windowWidth / t.windowHeight < .5 : i = !1, this.BannerAd = gm.tt.createBannerAd({
                        adUnitId: this.bannerId,
                        adIntervals: 30,
                        style: {
                            width: 208
                        }
                    }), this.BannerAd.onError(function (e) {
                        for (var t in console.log("banner" + e), e) {
                            if (e.hasOwnProperty(t)) {
                                var i = e[t];
                                console.log("BannerErr " + t + " " + i);
                            }
                        }
                    }), this.BannerAd.onLoad(function () {
                        console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
                    });
                    var o = tt.getSystemInfoSync(),
                        s = o.windowWidth,
                        r = o.windowHeight;
                    this.BannerAd.onResize(function (t) {
                        console.log("bannersize"), console.log(t), e.BannerAd.style.top = i ? r - t.height - 40 : r - t.height, e.BannerAd.style.left = (s - t.width) / 2;
                        var o = t.height / r * a.default.GameSize.y;
                        n.default.bottomHeight = i ? o + 100 : o + 10;
                    }), this.BannerAd.hide();
                },
                ShowBanner: function ShowBanner() {
                    arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                },
                isRVAvailable: function isRVAvailable(e) {
                    if (null != gm.tt) {
                        var t = this.RewardTypeDic[e];
                        return this.RewardAdsDic[t].isAvalibleAd;
                    }
                    return !1;
                },
                HideBanner: function HideBanner() {},
                ShowVideo: function ShowVideo(e) {
                    this.RewardType = e;
                    var t = this.RewardTypeDic[e];
                    null != this.RewardAdsDic[t] && this.RewardAdsDic[t].isAvalibleAd && (gm.DataManager.userData.VideoCount++, tt.reportAnalytics("RewardVideo", {
                        From: e,
                        Level: gm.DataManager.userData.NowLevel,
                        Count: gm.DataManager.userData.VideoCount
                    }), gm.AdManager.dataRecode("RewardVideo" + e), gm.DataBase.SaveUserData(), this.ShowVideoTips = !0, this.RewardAdsDic[t].Ads.show(), this.RewardAdsDic[t].isAvalibleAd = !1);
                },
                SetUserInfo: function SetUserInfo(e) {
                    null != gm.tt && gm.tt.setUserCloudStorage({
                        KVDataList: e,
                        success: function success(e) {
                            console.log(e);
                        },
                        fail: function fail(e) {
                            console.log(e);
                        }
                    });
                },
                getUserInfo: function getUserInfo() {
                    gm.wx && gm.wx.authorize({
                        scope: "scope.userInfo"
                    });
                },
                updateRecord: function updateRecord() {},
                InitScreenRecord: function InitScreenRecord() {
                    cc.log("InitScreenRecord");
                    var e = gm.tt.getGameRecorderManager();
                    e.onStart(function () {
                        console.log("\u5F55\u5C4F\u5F00\u59CB");
                    }.bind(this)), e.onPause(function () {
                        console.log("\u5F55\u5C4F\u6682\u505C");
                    }), e.onResume(function () {
                        console.log("\u5F55\u5C4F\u6062\u590D");
                    }), e.onStop(function (e) {
                        console.log("\u5F55\u5C4F\u505C\u6B62" + e.videoPath), null != this.recordCallback && this.recordCallback(), this.videoPath = e.videoPath;
                    }.bind(this));
                },
                screenStartRecord: function screenStartRecord(e, t, i) {
                    null != gm.tt && (this.callback = e, this.recordCallback = t, this.shareFail = i, gm.tt.getGameRecorderManager().start({
                        duration: 300
                    }), cc.log("\u5F00\u59CB\u5F55\u5C4F"));
                },
                screenStopRecord: function screenStopRecord(e) {
                    if (null != gm.tt) {
                        cc.log("\u5C4F\u5E55\u7ED3\u675F\u5F55\u5236");
                        var t = gm.tt.getGameRecorderManager();
                        this.btnPause = e, 1 == this.btnPause ? null != this.videoPath ? (console.log("BeginShare"), gm.tt.shareAppMessage({
                            channel: "video",
                            title: "\u6551\u6551\u6821\u82B1",
                            desc: "\u6821\u82B1\u9047\u5230\u4E86\u52AB\u532A\uFF0C\u5FEB\u53BB\u6551\u6551\u5979",
                            query: "",
                            extra: {
                                withVideoId: !0,
                                videoPath: this.videoPath,
                                videoTopics: this.Topics,
                                createChallenge: !0
                            },
                            success: function (e) {
                                console.log(JSON.stringify(e)), console.log("\u5206\u4EAB\u89C6\u9891\u6210\u529F"), null != this.callback && this.callback();
                            }.bind(this),
                            fail: function (e) {
                                null != this.shareFail && this.shareFail(), null != e.errMsg && e.errMsg.indexOf("cancel"), console.log("\u5206\u4EAB\u89C6\u9891\u5931\u8D25" + JSON.stringify(e));
                            }.bind(this)
                        })) : cc.log("video Path ==null  ") : t.stop();
                    }
                },
                showShareMenu: function showShareMenu(e) {
                    if (gm.tt) {
                        var t = e.withShareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.tt.showShareMenu({
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
                    if (gm.tt) {
                        var t = e.success,
                            i = e.fail,
                            n = e.complete;
                        gm.tt.showShareMenu({
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
                    if (gm.tt) {
                        var t = "";
                        t = e.title ? e.title : this.getRandomTitle();
                        var i = this.getSharePic(),
                            n = i[0],
                            a = i[1],
                            o = e.query || "",
                            s = e.success,
                            r = e.fail,
                            c = e.complete;
                        gm.tt.shareAppMessage({
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
                    if (gm.tt) {
                        var i = e.query || "",
                            n = e.success,
                            a = e.fail,
                            o = e.complete;
                        gm.tt.onShareAppMessage(function (e) {
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
                    gm.tt && gm.tt.offShareAppMessage(function (t) {
                        e && e(t);
                    });
                },
                getShareInfo: function getShareInfo(e) {
                    if (gm.tt) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.tt.getShareInfo({
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
                    if (gm.tt) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.tt.updateShareMenu({
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
                    null != gm.tt && gm.tt.onHide(e);
                },
                onShow: function onShow(e) {
                    null != gm.tt && gm.tt.onShow(e);
                },
                getRandomTitle: function getRandomTitle() {
                    var e = parseInt(Math.random() * r.length);
                    return e >= r.length && (e %= r.length), r[e];
                },
                getSharePic: function getSharePic() {
                    var e = o.default.getRandom(0, c.length);
                    return c[e];
                },
                setUserClodStorage: function setUserClodStorage(e) {
                    gm.tt && gm.tt.setUserCloudStorage({
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
                    gm.tt && gm.tt.getSetting({
                        success: function (i) {
                            var n = i.authSetting;
                            !0 === n[e] ? t && t() : !1 === n[e] ? (gm.tt.openSetting(), this.showModule({
                                title: "\u5F00\u542F\u6388\u6743",
                                content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                                showCancel: !1,
                                cancelText: "\u53D6\u6D88",
                                confirmText: "\u786E\u8BA4",
                                success: function success() {}
                            })) : gm.tt.authorize({
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
                    if (gm.tt)
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
                    gm.tt && gm.tt.downloadFile({
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
                    }), gm.tt && gm.tt.showModal(e);
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
                    gm.tt.previewImage({
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
                    console.log(e), null != gm.tt && gm.tt.navigateToMiniProgram({
                        appId: e
                    });
                },
                showMoreGamesModal: function showMoreGamesModal() {
                    null != gm.tt && "ios" !== tt.getSystemInfoSync().platform && tt.showMoreGamesModal({
                        appLaunchOptions: [{
                            appId: "tt7fa90914e0837d25",
                            query: "foo=bar&baz=qux",
                            extraData: {}
                        }],
                        success: function success(e) {
                            console.log("success", e.errMsg);
                        },
                        fail: function fail(e) {
                            console.log("fail", e.errMsg);
                        }
                    });
                }
            };
        t.exports = l, 
*/
