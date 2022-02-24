
var n = require("GameConfig"),
a = require("GameDefine"),
o = require("util"),
s = require("umsdk");
require("ConstModName"), require("UIInfo");
var c = ["\u7B54\u9898\u5FEB\u5982\u95EA\u7535\uFF0C\u667A\u5546\u6311\u6218\u8D5B\u5F00\u59CB\u5566\uFF0C\u5FEB\u6765\u6D4B\u9A8C\u81EA\u5DF1\u7684\u667A\u5546\u5427", "\u52A8\u7269\u56ED\u91CC\u5927\u8C61\u7684\u9F3B\u5B50\u6700\u957F,\u90A3\u7B2C\u4E8C\u957F\u7684\u662F\u8C01\u5462?", "\u8FD9\u9898\u592A\u96BE\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u6211"],
            l = [
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpWEtFazWnGFZNufR3FnPAdia0ibsBDDxkWgVRshKcgjichBPwPnGLSWibf8/0", "xLwSLWmyTl+74q7XJDlmGw=="],
                ["https://mmocgame.qpic.cn/wechatgame/0j21Xibv3qpUk3oUHugY984kPM3ROYU4dbpiaoWsxicQMz4qavNSnVlhZcQSPDHg19l/0", "nRdBRZcSSTC9TPWdIolVPQ=="]
            ],
            u = {
                RewardType: "",
                BannerAd: null,
                bannerId: "adunit-9c2c4e4e091ae6b5",
                AdRewardId: "adunit-e724b44a0acdf1e2",
                isAvalibleAd: !1,
                SubscribeMessageId: ["dVxneEA72o1LmKM8wRW26mNMVMlNnJbQo-8rv5YxPh0"],
                AdConfig: [],
                Init: function Init() {
                    return
                    null != gm.wx && (s.init({
                        gameId: 10010,
                        authRequired: !0
                    }), s.auth().then(function (t) {
                        console.log("Alreay auth"), console.log(t), s.loadAttrLib(function () {
                            e("ald-game-conf"), e("ald-game");
                            var i = t.openid;
                            console.log("auth openId:" + i), wx.aldSendOpenid(i);
                        }), gm.WXInterface.onShareAppMessage({
                            query: "type=2"
                        });
                    }), s.fetchConfig().then(function (e) {
                        for (var t in console.log("fechConfig():", e), e) {
                            e.hasOwnProperty(t) && (n[t] = e[t]);
                        }
                    }), this.InitBanner(), this.InitRewardAd(), wx.setPreferredFramesPerSecond(60));
                },
                navigateToMiniProgram: function navigateToMiniProgram(e) {
                    null != gm.wx && gm.wx.navigateToMiniProgram({
                        appId: e
                    });
                },
                dataRecord: function dataRecord(e) {
                    null != s && null != gm.wx && s.event("event", e);
                },
                InitRewardAd: function InitRewardAd() {
                    var e = this;
                    this.RewardAdsDic = {};
                    for (var t = function t(_t12) {
                            var i = e.AdConfig[_t12],
                                n = s.createRewardedVideoAd({
                                    adUnitId: e.AdRewardId,
                                    slotId: i[1]
                                });
                            e.RewardAdsDic[i[0]] = {
                                Ads: n
                            }, n.onError(function (t) {
                                console.log("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u9519\u8BEF"), console.log(e.AdRewardId + " : " + t.errMsg), n.load();
                            }), n.onClose(function (t) {
                                t && t.isEnded || void 0 === t ? gm.AdManager.watchADReward(e.RewardType) : gm.wx.showModal({
                                    title: "\u63D0\u793A",
                                    content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                                    showCancel: !1
                                }), e.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                            }), n.onLoad(function () {
                                console.log(e.AdRewardId + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), e.isAvalibleAd = !0;
                            });
                        }, i = 0; i < this.AdConfig.length; i++) {
                        t(i);
                    }
                },
                InitBanner: function InitBanner() {
                    var e = gm.wx.getSystemInfoSync(),
                        t = e.screenWidth,
                        i = e.windowHeight;
                    this.BannerAd = s.createBannerAd({
                        adUnitId: this.bannerId,
                        slotId: "757dfb293bd9ae5d",
                        adIntervals: 30,
                        style: {
                            width: 320,
                            height: 150,
                            top: i - 150,
                            left: (t - 320) / 2
                        }
                    }), this.BannerAd.onError(function (e) {
                        cc.log("Banner Err" + e), console.log("Banner Err" + e);
                    }), this.BannerAd.onLoad(function () {
                        console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
                    }), this.BannerAd.onResize(function () {
                        this.BannerAd.style.top = i - this.BannerAd.style.realHeight - 1, this.BannerAd.style.left = (t - this.BannerAd.style.realWidth) / 2;
                    }.bind(this)), this.BannerAd.hide();
                },
                ShowBanner: function ShowBanner() {
                    null != this.BannerAd && this.BannerAd.show();
                },
                isRVAvailable: function isRVAvailable(e) {
                    return null != gm.wx && this.isAvalibleAd;
                },
                HideBanner: function HideBanner() {
                    null != this.BannerAd && this.BannerAd.hide();
                },
                ShowVideo: function ShowVideo(e) {
                    this.RewardType = e, null != this.RewardAdsDic[e] && this.isAvalibleAd && this.RewardAdsDic[e].Ads.show();
                },
                SetUserInfo: function SetUserInfo(e) {
                    null != gm.wx && gm.wx.setUserCloudStorage({
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
                    if (gm.wx) {
                        var t = e.withShareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.showShareMenu({
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
                    if (gm.wx) {
                        var t = e.success,
                            i = e.fail,
                            n = e.complete;
                        gm.wx.showShareMenu({
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
                    if (gm.wx) {
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
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    arguments.length > 1 && arguments[1], arguments.length > 2 && arguments[2];
                    if (gm.wx) {
                        var t = e.query || "",
                            i = this.getRandomTitle(),
                            a = this.getSharePic();
                        console.log("onShareAppMessage " + n.ShareType_Top), s.onShareAppMessage(n.ShareType_Top, function () {
                            return {
                                title: i,
                                imageUrlId: a[1],
                                imageUrl: a[0],
                                query: t
                            };
                        });
                    }
                },
                getShareInfo: function getShareInfo(e) {
                    if (gm.wx) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.getShareInfo({
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
                    if (gm.wx) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.updateShareMenu({
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
                    null != gm.wx && gm.wx.onHide(e);
                },
                onShow: function onShow(e) {
                    null != gm.wx && gm.wx.onShow(e);
                },
                getRandomTitle: function getRandomTitle() {
                    var e = parseInt(Math.random() * c.length);
                    return e >= c.length && (e %= c.length), c[e];
                },
                getSharePic: function getSharePic() {
                    var e = o.getRandom(0, l.length - 1);
                    return l[e];
                },
                setUserClodStorage: function setUserClodStorage(e) {
                    gm.wx && gm.wx.setUserCloudStorage({
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
                    gm.wx && gm.wx.getSetting({
                        success: function (i) {
                            var n = i.authSetting;
                            !0 === n[e] ? t && t() : !1 === n[e] ? (gm.wx.openSetting(), this.showModule({
                                title: "\u5F00\u542F\u6388\u6743",
                                content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                                showCancel: !1,
                                cancelText: "\u53D6\u6D88",
                                confirmText: "\u786E\u8BA4",
                                success: function success() {}
                            })) : gm.wx.authorize({
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
                    if (gm.wx)
                        for (var i = 0, n = e.length, a = wx.getOpenDataContext(), o = 0; o < n; o++) {
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
                    gm.wx && gm.wx.downloadFile({
                        url: e,
                        success: function success(e) {
                            wx.saveImageToPhotosAlbum({
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
                openCustomerServiceConversation: function openCustomerServiceConversation() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    null != gm.wx && (e.success = function (t) {
                        t.path == e.sendMessagePath && e.sendSuccess();
                    }, gm.wx.openCustomerServiceConversation(e));
                },
                showModule: function showModule() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    "{}" == JSON.stringify(e) && (e = {
                        title: "\u63D0\u793A\u6846",
                        content: "\u9ED8\u8BA4\u5185\u5BB9",
                        cancelText: "\u53D6\u6D88",
                        confirmText: "\u786E\u8BA4"
                    }), gm.wx && gm.wx.showModal(e);
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
                    gm.wx.previewImage({
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
                createSubscribeMessageButton: function createSubscribeMessageButton(e, t) {
                    if (!n.HadShowSubscribe) {
                        var i = this.SubscribeMessageId;
                        wx.onTouchEnd(function () {
                            n.HadShowSubscribe || wx.requestSubscribeMessage({
                                tmplIds: i,
                                success: function success(t) {
                                    n.HadShowSubscribe = !0, console.log("SubscribeMessageSuccess", t);
                                    for (var a = [], o = 0; o < i.length; o++) {
                                        var r = i[o];
                                        "accept" == t[r] && a.push(r);
                                    }
                                    console.log(a), s.subscribe({
                                        ids: a
                                    }), null != e && a.length > 0 && e();
                                },
                                fail: function fail(e) {
                                    console.log("fail", e), n.HadShowSubscribe = !0, null != t && t();
                                }
                            });
                        });
                    }
                },
                createUserInfoButton: function createUserInfoButton() {
                    var e = wx.getSystemInfoSync(),
                        t = e.windowWidth,
                        i = e.windowHeight,
                        n = wx.createUserInfoButton({
                            type: "text",
                            text: "",
                            style: {
                                left: 0,
                                top: 0,
                                width: t,
                                height: i,
                                lineHeight: 40,
                                backgroundColor: "#00000000",
                                color: "#00000000",
                                textAlign: "center",
                                fontSize: 10,
                                borderRadius: 4
                            }
                        });
                    n.onTap(function (e) {
                        if (!e.userInfo) return n.hide(), void n.destroy();
                        cc.log("userInfo"), cc.log(e), wx.getOpenDataContext().postMessage({
                            message: "User info get success."
                        }), n.hide(), n.destroy();
                    });
                }
            };
            module.exports = u
/*WXInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "45babVOHfRK+4ayQVn6pave", "WXInterface");
        var n = r(e("GameConfig")),
            a = r(e("GameDefine")),
            o = r(e("util")),
            s = r(e("umsdk"));
        r(e("ConstModName")), r(e("UIInfo"));

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
                bannerId: "adunit-9c2c4e4e091ae6b5",
                AdRewardId: "adunit-e724b44a0acdf1e2",
                isAvalibleAd: !1,
                SubscribeMessageId: ["dVxneEA72o1LmKM8wRW26mNMVMlNnJbQo-8rv5YxPh0"],
                AdConfig: [],
                Init: function Init() {
                    null != gm.wx && (s.default.init({
                        gameId: 10010,
                        authRequired: !0
                    }), s.default.auth().then(function (t) {
                        console.log("Alreay auth"), console.log(t), s.default.loadAttrLib(function () {
                            e("ald-game-conf"), e("ald-game");
                            var i = t.openid;
                            console.log("auth openId:" + i), wx.aldSendOpenid(i);
                        }), gm.WXInterface.onShareAppMessage({
                            query: "type=2"
                        });
                    }), s.default.fetchConfig().then(function (e) {
                        for (var t in console.log("fechConfig():", e), e) {
                            e.hasOwnProperty(t) && (n.default[t] = e[t]);
                        }
                    }), this.InitBanner(), this.InitRewardAd(), wx.setPreferredFramesPerSecond(60));
                },
                navigateToMiniProgram: function navigateToMiniProgram(e) {
                    null != gm.wx && gm.wx.navigateToMiniProgram({
                        appId: e
                    });
                },
                dataRecord: function dataRecord(e) {
                    null != s.default && null != gm.wx && s.default.event("event", e);
                },
                InitRewardAd: function InitRewardAd() {
                    var e = this;
                    this.RewardAdsDic = {};
                    for (var t = function t(_t12) {
                            var i = e.AdConfig[_t12],
                                n = s.default.createRewardedVideoAd({
                                    adUnitId: e.AdRewardId,
                                    slotId: i[1]
                                });
                            e.RewardAdsDic[i[0]] = {
                                Ads: n
                            }, n.onError(function (t) {
                                console.log("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u9519\u8BEF"), console.log(e.AdRewardId + " : " + t.errMsg), n.load();
                            }), n.onClose(function (t) {
                                t && t.isEnded || void 0 === t ? gm.AdManager.watchADReward(e.RewardType) : gm.wx.showModal({
                                    title: "\u63D0\u793A",
                                    content: "\u60A8\u7684\u89C6\u9891\u8FD8\u6CA1\u770B\u5B8C\uFF0C\u65E0\u6CD5\u83B7\u5F97\u5956\u52B1",
                                    showCancel: !1
                                }), e.isAvalibleAd = !1, gm.AudioPlayManager.StopAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm"), gm.AudioPlayManager.PlayAudio(a.default.AudioChannelType.Channel_Background, "audios/audio_bgm", -1);
                            }), n.onLoad(function () {
                                console.log(e.AdRewardId + " \u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u52A0\u8F7D\u6210\u529F"), e.isAvalibleAd = !0;
                            });
                        }, i = 0; i < this.AdConfig.length; i++) {
                        t(i);
                    }
                },
                InitBanner: function InitBanner() {
                    var e = gm.wx.getSystemInfoSync(),
                        t = e.screenWidth,
                        i = e.windowHeight;
                    this.BannerAd = s.default.createBannerAd({
                        adUnitId: this.bannerId,
                        slotId: "757dfb293bd9ae5d",
                        adIntervals: 30,
                        style: {
                            width: 320,
                            height: 150,
                            top: i - 150,
                            left: (t - 320) / 2
                        }
                    }), this.BannerAd.onError(function (e) {
                        cc.log("Banner Err" + e), console.log("Banner Err" + e);
                    }), this.BannerAd.onLoad(function () {
                        console.log("banner \u5E7F\u544A\u52A0\u8F7D\u6210\u529F");
                    }), this.BannerAd.onResize(function () {
                        this.BannerAd.style.top = i - this.BannerAd.style.realHeight - 1, this.BannerAd.style.left = (t - this.BannerAd.style.realWidth) / 2;
                    }.bind(this)), this.BannerAd.hide();
                },
                ShowBanner: function ShowBanner() {
                    null != this.BannerAd && this.BannerAd.show();
                },
                isRVAvailable: function isRVAvailable(e) {
                    return null != gm.wx && this.isAvalibleAd;
                },
                HideBanner: function HideBanner() {
                    null != this.BannerAd && this.BannerAd.hide();
                },
                ShowVideo: function ShowVideo(e) {
                    this.RewardType = e, null != this.RewardAdsDic[e] && this.isAvalibleAd && this.RewardAdsDic[e].Ads.show();
                },
                SetUserInfo: function SetUserInfo(e) {
                    null != gm.wx && gm.wx.setUserCloudStorage({
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
                    if (gm.wx) {
                        var t = e.withShareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.showShareMenu({
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
                    if (gm.wx) {
                        var t = e.success,
                            i = e.fail,
                            n = e.complete;
                        gm.wx.showShareMenu({
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
                    if (gm.wx) {
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
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    arguments.length > 1 && arguments[1], arguments.length > 2 && arguments[2];
                    if (gm.wx) {
                        var t = e.query || "",
                            i = this.getRandomTitle(),
                            a = this.getSharePic();
                        console.log("onShareAppMessage " + n.default.ShareType_Top), s.default.onShareAppMessage(n.default.ShareType_Top, function () {
                            return {
                                title: i,
                                imageUrlId: a[1],
                                imageUrl: a[0],
                                query: t
                            };
                        });
                    }
                },
                getShareInfo: function getShareInfo(e) {
                    if (gm.wx) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.getShareInfo({
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
                    if (gm.wx) {
                        var t = e.shareTicket,
                            i = e.success,
                            n = e.fail,
                            a = e.complete;
                        gm.wx.updateShareMenu({
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
                    null != gm.wx && gm.wx.onHide(e);
                },
                onShow: function onShow(e) {
                    null != gm.wx && gm.wx.onShow(e);
                },
                getRandomTitle: function getRandomTitle() {
                    var e = parseInt(Math.random() * c.length);
                    return e >= c.length && (e %= c.length), c[e];
                },
                getSharePic: function getSharePic() {
                    var e = o.default.getRandom(0, l.length - 1);
                    return l[e];
                },
                setUserClodStorage: function setUserClodStorage(e) {
                    gm.wx && gm.wx.setUserCloudStorage({
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
                    gm.wx && gm.wx.getSetting({
                        success: function (i) {
                            var n = i.authSetting;
                            !0 === n[e] ? t && t() : !1 === n[e] ? (gm.wx.openSetting(), this.showModule({
                                title: "\u5F00\u542F\u6388\u6743",
                                content: "\u8BF7\u5F00\u542F\u76F8\u5173\u6388\u6743",
                                showCancel: !1,
                                cancelText: "\u53D6\u6D88",
                                confirmText: "\u786E\u8BA4",
                                success: function success() {}
                            })) : gm.wx.authorize({
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
                    if (gm.wx)
                        for (var i = 0, n = e.length, a = wx.getOpenDataContext(), o = 0; o < n; o++) {
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
                    gm.wx && gm.wx.downloadFile({
                        url: e,
                        success: function success(e) {
                            wx.saveImageToPhotosAlbum({
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
                openCustomerServiceConversation: function openCustomerServiceConversation() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    null != gm.wx && (e.success = function (t) {
                        t.path == e.sendMessagePath && e.sendSuccess();
                    }, gm.wx.openCustomerServiceConversation(e));
                },
                showModule: function showModule() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    "{}" == JSON.stringify(e) && (e = {
                        title: "\u63D0\u793A\u6846",
                        content: "\u9ED8\u8BA4\u5185\u5BB9",
                        cancelText: "\u53D6\u6D88",
                        confirmText: "\u786E\u8BA4"
                    }), gm.wx && gm.wx.showModal(e);
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
                    gm.wx.previewImage({
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
                createSubscribeMessageButton: function createSubscribeMessageButton(e, t) {
                    if (!n.default.HadShowSubscribe) {
                        var i = this.SubscribeMessageId;
                        wx.onTouchEnd(function () {
                            n.default.HadShowSubscribe || wx.requestSubscribeMessage({
                                tmplIds: i,
                                success: function success(t) {
                                    n.default.HadShowSubscribe = !0, console.log("SubscribeMessageSuccess", t);
                                    for (var a = [], o = 0; o < i.length; o++) {
                                        var r = i[o];
                                        "accept" == t[r] && a.push(r);
                                    }
                                    console.log(a), s.default.subscribe({
                                        ids: a
                                    }), null != e && a.length > 0 && e();
                                },
                                fail: function fail(e) {
                                    console.log("fail", e), n.default.HadShowSubscribe = !0, null != t && t();
                                }
                            });
                        });
                    }
                },
                createUserInfoButton: function createUserInfoButton() {
                    var e = wx.getSystemInfoSync(),
                        t = e.windowWidth,
                        i = e.windowHeight,
                        n = wx.createUserInfoButton({
                            type: "text",
                            text: "",
                            style: {
                                left: 0,
                                top: 0,
                                width: t,
                                height: i,
                                lineHeight: 40,
                                backgroundColor: "#00000000",
                                color: "#00000000",
                                textAlign: "center",
                                fontSize: 10,
                                borderRadius: 4
                            }
                        });
                    n.onTap(function (e) {
                        if (!e.userInfo) return n.hide(), void n.destroy();
                        cc.log("userInfo"), cc.log(e), wx.getOpenDataContext().postMessage({
                            message: "User info get success."
                        }), n.hide(), n.destroy();
                    });
                }
            };
        t.exports = u, 
*/
