

var n = require("GameConfig"),
a = require("GameDefine"),
o = require("util"),
s = require("umsdk");

// function r(e) {
// return e && e.__esModule ? e : {
//     default: e
// };
// }
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
    TmpVideo: null,
    bannerId: "c6ee51a86d8ab11f1d9c068197d13dd4",
    qqBoxAdsId: "f736f7afe5d191115c521aecd7707401",
    AdRewardId: "b43666b4fd1ca95ff6ff406cb3b0f1e1",
    isAppBoxAvalibleAd: !1,
    isAvalibleAd: !1,
    AdConfig: [],
    Init: function Init() {
        null != gm.qq && (s.init({
            gameId: 10011,
            authRequired: !0
        }), s.auth().then(function (e) {
            console.log("Alreay auth"), console.log(e), s.loadAttrLib(function () {});
        }), s.fetchConfig().then(function (e) {
            for (var t in console.log("fechConfig():", e), e) {
                e.hasOwnProperty(t) && (n[t] = e[t]);
            }
            s.fetchLocation().then(function (e) {
                console.log("Location():", e), console.log("errorcity:", n.errorcity), null != e && (console.log("Location", e), null != e.province && (console.log("province" + n.errorcity.indexOf(e.province)), -1 != n.errorcity.indexOf(e.province) && (console.log("No ShowBanner"), n.DelayShowCheck = 999, n.DelayShowbanner = 0)), null != e.city && (console.log("city" + n.errorcity.indexOf(e.city)), -1 != n.errorcity.indexOf(e.city) && (console.log("No ShowBanner"), n.DelayShowCheck = 999, n.DelayShowbanner = 0)));
            });
        }), this.InitBanner(), this.InitRewardAd(), this.InitAppBox());
    },
    dataRecord: function dataRecord(e) {
        null != s && s.event("event", e);
    },
    InitRewardAd: function InitRewardAd() {
        var e = this;
        this.RewardAdsDic = {};
        for (var t = function t(_t10) {
                var i = e.AdConfig[_t10],
                    n = s.createRewardedVideoAd({
                        adUnitId: e.AdRewardId,
                        slotId: i[1]
                    });
                e.RewardAdsDic[i[0]] = {
                    Ads: n
                };
                var o = e;
                n.onError(function (t) {
                    console.log("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u9519\u8BEF"), console.log(e.AdRewardId + " : " + t.errMsg), setTimeout(function () {
                        o.ReloadVideo(n);
                    }, 1e3);
                }), n.onClose(function (e) {
                    return function (t) {
                        console.log(t), console.log("AlreayShow"), t && t.isEnded || void 0 === t ? (console.log("BeforeAd"), gm.AdManager.watchADReward(o.RewardType), console.log("AfterAd")) : qq.showModal({
                            title: "\u63D0\u793A",
                            content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                            showCancel: !1
                        }), console.log("make Sure Check"), o.ReloadVideo(e), gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                    };
                }(n)), n.onLoad(function () {
                    console.log(e.AdRewardId + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), e.isAvalibleAd = !0;
                }), e.TmpVideo = n;
            }, i = 0; i < this.AdConfig.length; i++) {
            t(i);
        }
    },
    ReloadVideo: function ReloadVideo(e) {
        var t = this,
            i = this;
        e.load().then(function () {
            console.log("\u6FC0\u52B1\u89C6\u9891\u8BFB\u53D6\u6210\u529F"), i.isAvalibleAd = !0;
        }, function (i) {
            console.log("\u6FC0\u52B1\u89C6\u9891\u8BFB\u53D6\u9519\u8BEF"), console.log(i), setTimeout(function () {
                t.ReloadVideo(e);
            }, 1e3);
        });
    },
    InitBanner: function InitBanner() {
        var e = gm.qq.getSystemInfoSync(),
            t = e.screenWidth,
            i = e.windowHeight;
        this.BannerAd = gm.qq.createBannerAd({
            adUnitId: this.bannerId,
            style: {
                left: t,
                top: i,
                width: 320,
                height: 150
            }
        }), this.BannerAd.onError(function (e) {
            console.log(e);
        }), this.BannerAd.onLoad(function () {
            console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
        }), this.BannerAd.onResize(function (e) {
            this.BannerAd.style.top = i - 85, this.BannerAd.style.left = (t - e.width) / 2;
        }.bind(this)), this.BannerAd.hide();
    },
    InitAppBox: function InitAppBox() {
        this.AppBox = gm.qq.createAppBox({
            adUnitId: this.qqBoxAdsId
        });
        var e = this;
        this.AppBox.load().then(function () {
            e.isAppBoxAvalibleAd = !0;
        });
    },
    ShowBox: function ShowBox() {
        this.isAppBoxAvalibleAd && this.AppBox.show();
    },
    ShowBanner: function ShowBanner() {
        null != this.BannerAd && this.BannerAd.show();
    },
    isRVAvailable: function isRVAvailable(e) {
        return this.isAvalibleAd;
    },
    HideBanner: function HideBanner() {
        null != this.BannerAd && this.BannerAd.hide();
    },
    ShowVideo: function ShowVideo(e) {
        this.RewardType = e, null != this.RewardAdsDic[e] && this.isAvalibleAd && this.RewardAdsDic[e].Ads.show();
    },
    SetUserInfo: function SetUserInfo(e) {
        null != gm.qq && gm.qq.setUserCloudStorage({
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
    showShareMenu: function showShareMenu(e) {
        if (gm.qq) {
            var t = e.withShareTicket,
                i = e.success,
                n = e.fail,
                a = e.complete;
            gm.qq.showShareMenu({
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
        if (gm.qq) {
            var t = e.success,
                i = e.fail,
                n = e.complete;
            gm.qq.showShareMenu({
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
    shareAppMessage: function shareAppMessage(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        arguments.length > 2 && arguments[2];
        if (gm.qq) {
            var i = "";
            i = t.title ? t.title : this.getRandomTitle();
            var n = this.getSharePic(),
                a = n[0],
                o = n[1],
                r = t.query || "";
            t.success, t.fail, t.complete;
            s.shareAppMessage({
                slotId: e,
                data: {
                    title: i,
                    imageUrl: a,
                    imageUrlId: o,
                    query: r
                }
            });
        }
    },
    onShareAppMessage: function onShareAppMessage() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = (arguments.length > 1 && arguments[1], arguments.length > 2 ? arguments[2] : void 0);
        if (gm.qq) {
            var i = e.query || "",
                n = e.success,
                a = e.fail,
                o = e.complete;
            gm.qq.onShareAppMessage(function (e) {
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
        gm.qq && gm.qq.offShareAppMessage(function (t) {
            e && e(t);
        });
    },
    getShareInfo: function getShareInfo(e) {
        if (gm.qq) {
            var t = e.shareTicket,
                i = e.success,
                n = e.fail,
                a = e.complete;
            gm.qq.getShareInfo({
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
        if (gm.qq) {
            var t = e.shareTicket,
                i = e.success,
                n = e.fail,
                a = e.complete;
            gm.qq.updateShareMenu({
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
        null != gm.qq && gm.qq.onHide(e);
    },
    onShow: function onShow(e) {
        null != gm.qq && gm.qq.onShow(e);
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
        gm.qq && gm.qq.setUserCloudStorage({
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
        gm.qq && gm.qq.getSetting({
            success: function (i) {
                var n = i.authSetting;
                !0 === n[e] ? t && t() : !1 === n[e] ? (gm.qq.openSetting(), this.showModule({
                    title: "\u5F00\u542F\u6388\u6743",
                    content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                    showCancel: !1,
                    cancelText: "\u53D6\u6D88",
                    confirmText: "\u786E\u8BA4",
                    success: function success() {}
                })) : gm.qq.authorize({
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
        if (gm.qq)
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
        gm.qq && gm.qq.downloadFile({
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
        }), gm.qq && gm.qq.showModal(e);
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
        gm.qq.previewImage({
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
    }
};
module.exports = u 
/*QQInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "2d101x6HrZLq6CDBVsI5ADT", "QQInterface");
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
                TmpVideo: null,
                bannerId: "c6ee51a86d8ab11f1d9c068197d13dd4",
                qqBoxAdsId: "f736f7afe5d191115c521aecd7707401",
                AdRewardId: "b43666b4fd1ca95ff6ff406cb3b0f1e1",
                isAppBoxAvalibleAd: !1,
                isAvalibleAd: !1,
                AdConfig: [],
                Init: function Init() {
                    null != gm.qq && (s.default.init({
                        gameId: 10011,
                        authRequired: !0
                    }), s.default.auth().then(function (e) {
                        console.log("Alreay auth"), console.log(e), s.default.loadAttrLib(function () {});
                    }), s.default.fetchConfig().then(function (e) {
                        for (var t in console.log("fechConfig():", e), e) {
                            e.hasOwnProperty(t) && (n.default[t] = e[t]);
                        }
                        s.default.fetchLocation().then(function (e) {
                            console.log("Location():", e), console.log("errorcity:", n.default.errorcity), null != e && (console.log("Location", e), null != e.province && (console.log("province" + n.default.errorcity.indexOf(e.province)), -1 != n.default.errorcity.indexOf(e.province) && (console.log("No ShowBanner"), n.default.DelayShowCheck = 999, n.default.DelayShowbanner = 0)), null != e.city && (console.log("city" + n.default.errorcity.indexOf(e.city)), -1 != n.default.errorcity.indexOf(e.city) && (console.log("No ShowBanner"), n.default.DelayShowCheck = 999, n.default.DelayShowbanner = 0)));
                        });
                    }), this.InitBanner(), this.InitRewardAd(), this.InitAppBox());
                },
                dataRecord: function dataRecord(e) {
                    null != s.default && s.default.event("event", e);
                },
                InitRewardAd: function InitRewardAd() {
                    var e = this;
                    this.RewardAdsDic = {};
                    for (var t = function t(_t10) {
                            var i = e.AdConfig[_t10],
                                n = s.default.createRewardedVideoAd({
                                    adUnitId: e.AdRewardId,
                                    slotId: i[1]
                                });
                            e.RewardAdsDic[i[0]] = {
                                Ads: n
                            };
                            var o = e;
                            n.onError(function (t) {
                                console.log("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u9519\u8BEF"), console.log(e.AdRewardId + " : " + t.errMsg), setTimeout(function () {
                                    o.ReloadVideo(n);
                                }, 1e3);
                            }), n.onClose(function (e) {
                                return function (t) {
                                    console.log(t), console.log("AlreayShow"), t && t.isEnded || void 0 === t ? (console.log("BeforeAd"), gm.AdManager.watchADReward(o.RewardType), console.log("AfterAd")) : qq.showModal({
                                        title: "\u63D0\u793A",
                                        content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                                        showCancel: !1
                                    }), console.log("make Sure Check"), o.ReloadVideo(e), gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                                };
                            }(n)), n.onLoad(function () {
                                console.log(e.AdRewardId + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), e.isAvalibleAd = !0;
                            }), e.TmpVideo = n;
                        }, i = 0; i < this.AdConfig.length; i++) {
                        t(i);
                    }
                },
                ReloadVideo: function ReloadVideo(e) {
                    var t = this,
                        i = this;
                    e.load().then(function () {
                        console.log("\u6FC0\u52B1\u89C6\u9891\u8BFB\u53D6\u6210\u529F"), i.isAvalibleAd = !0;
                    }, function (i) {
                        console.log("\u6FC0\u52B1\u89C6\u9891\u8BFB\u53D6\u9519\u8BEF"), console.log(i), setTimeout(function () {
                            t.ReloadVideo(e);
                        }, 1e3);
                    });
                },
                InitBanner: function InitBanner() {
                    var e = gm.qq.getSystemInfoSync(),
                        t = e.screenWidth,
                        i = e.windowHeight;
                    this.BannerAd = gm.qq.createBannerAd({
                        adUnitId: this.bannerId,
                        style: {
                            left: t,
                            top: i,
                            width: 320,
                            height: 150
                        }
                    }), this.BannerAd.onError(function (e) {
                        console.log(e);
                    }), this.BannerAd.onLoad(function () {
                        console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
                    }), this.BannerAd.onResize(function (e) {
                        this.BannerAd.style.top = i - 85, this.BannerAd.style.left = (t - e.width) / 2;
                    }.bind(this)), this.BannerAd.hide();
                },
                InitAppBox: function InitAppBox() {
                    this.AppBox = gm.qq.createAppBox({
                        adUnitId: this.qqBoxAdsId
                    });
                    var e = this;
                    this.AppBox.load().then(function () {
                        e.isAppBoxAvalibleAd = !0;
                    });
                },
                ShowBox: function ShowBox() {
                    this.isAppBoxAvalibleAd && this.AppBox.show();
                },
                ShowBanner: function ShowBanner() {
                    null != this.BannerAd && this.BannerAd.show();
                },
                isRVAvailable: function isRVAvailable(e) {
                    return this.isAvalibleAd;
                },
                HideBanner: function HideBanner() {
                    null != this.BannerAd && this.BannerAd.hide();
                },
                ShowVideo: function ShowVideo(e) {
                    this.RewardType = e, null != this.RewardAdsDic[e] && this.isAvalibleAd && this.RewardAdsDic[e].Ads.show();
                },
                SetUserInfo: function SetUserInfo(e) {
                    null != gm.qq && gm.qq.setUserCloudStorage({
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
                showShareMenu: function showShareMenu(e) {
                    if (gm.qq) {
                        var t = e.withShareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.qq.showShareMenu({
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
                    if (gm.qq) {
                        var t = e.success,
                            i = e.fail,
                            n = e.complete;
                        gm.qq.showShareMenu({
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
                shareAppMessage: function shareAppMessage(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    arguments.length > 2 && arguments[2];
                    if (gm.qq) {
                        var i = "";
                        i = t.title ? t.title : this.getRandomTitle();
                        var n = this.getSharePic(),
                            a = n[0],
                            o = n[1],
                            r = t.query || "";
                        t.success, t.fail, t.complete;
                        s.default.shareAppMessage({
                            slotId: e,
                            data: {
                                title: i,
                                imageUrl: a,
                                imageUrlId: o,
                                query: r
                            }
                        });
                    }
                },
                onShareAppMessage: function onShareAppMessage() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = (arguments.length > 1 && arguments[1], arguments.length > 2 ? arguments[2] : void 0);
                    if (gm.qq) {
                        var i = e.query || "",
                            n = e.success,
                            a = e.fail,
                            o = e.complete;
                        gm.qq.onShareAppMessage(function (e) {
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
                    gm.qq && gm.qq.offShareAppMessage(function (t) {
                        e && e(t);
                    });
                },
                getShareInfo: function getShareInfo(e) {
                    if (gm.qq) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.qq.getShareInfo({
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
                    if (gm.qq) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.qq.updateShareMenu({
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
                    null != gm.qq && gm.qq.onHide(e);
                },
                onShow: function onShow(e) {
                    null != gm.qq && gm.qq.onShow(e);
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
                    gm.qq && gm.qq.setUserCloudStorage({
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
                    gm.qq && gm.qq.getSetting({
                        success: function (i) {
                            var n = i.authSetting;
                            !0 === n[e] ? t && t() : !1 === n[e] ? (gm.qq.openSetting(), this.showModule({
                                title: "\u5F00\u542F\u6388\u6743",
                                content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                                showCancel: !1,
                                cancelText: "\u53D6\u6D88",
                                confirmText: "\u786E\u8BA4",
                                success: function success() {}
                            })) : gm.qq.authorize({
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
                    if (gm.qq)
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
                    gm.qq && gm.qq.downloadFile({
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
                    }), gm.qq && gm.qq.showModal(e);
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
                    gm.qq.previewImage({
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
                }
            };
        t.exports = u, 
*/
