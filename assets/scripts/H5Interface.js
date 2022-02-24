

var n = {
    init: function init() {
        this.ADIsReady = !1, this.isClick = !1, this.initAD();
    },
    initAD: function initAD() {
        var e = this;
        window.Vijs && (this.myAd45653 = Vijs.setAD({
            unitid: 45653,
            loadedCallback: function loadedCallback() {
                console.log("load success"), e.ADIsReady = !0;
            },
            rewardedCallback: function rewardedCallback(e, t) {
                console.log(t);
            },
            closeCallback: function closeCallback(t) {
                t ? e.videoReward() : game.uiToastLayer.showTips("\u83B7\u5F97\u5956\u52B1\u5931\u8D25", 1);
            },
            errorcallback: function errorcallback() {
                cc.log("\u5E7F\u544A\u62C9\u53D6\u5931\u8D25\u3002\u3002\u3002");
            }
        }));
    },
    playVideo: function playVideo() {
        if (!this.isClick) {
            var e = this;
            if (this.isClick = !0, this.ADIsReady) {
                if (this.myAd45653 && this.myAd45653.checkIsLoadComplete()) this.myAd45653.show(), e.isClick = !1;
                else {
                    game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u4E2D", 1);
                    var t = 0,
                        i = setInterval(function () {
                            e.myAd45653.checkIsLoadComplete() && (e.myAd45653.show(), e.isClick = !1, clearInterval(i)), (t += .1) >= 3 && (clearInterval(i), e.isClick = !1, game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u5931\u8D25", 1));
                        }, 100);
                }
            } else game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u5931\u8D25", 1), e.isClick = !1;
        }
    },
    playBanner: function playBanner() {},
    videoReward: function videoReward() {
        if (this.userOperate(gm.DataManager.UMEvent.NewViewVedioComplete), gm.DataManager.ADS.doubleRew) return game.dispatchEvent(gm.GlobalMessage.DB_REWARD), void(gm.DataManager.ADS.doubleRew = !1);
        if (gm.DataManager.userData.freeType > -1) return game.dispatchEvent(gm.GlobalMessage.START_FREE), void game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
        if (gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"), game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE)), -1 != gm.DataManager.ADS.clickType) switch (gm.DataManager.ADS.clickType) {
            case 0:
            case 1:
                game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
        }
    },
    userOperate: function userOperate(e) {
        var t = gm.StorageManager.getItem("loveLoginData");
        if (t && t.ssid) {
            var i = "ssid=" + t.ssid + "&event=" + e,
                n = game.Config.LOVE_REQUEST_URL + "/event?data=" + gm.Base.encode(i);
            gm.HttpRequest.httpGets(n, function (e) {}.bind(this), !1);
        }
    }
};
module.exports = n

/*H5Interface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "d9bd3fUcO9ApadOondQU5nI", "H5Interface");
        var n = {
            init: function init() {
                this.ADIsReady = !1, this.isClick = !1, this.initAD();
            },
            initAD: function initAD() {
                var e = this;
                window.Vijs && (this.myAd45653 = Vijs.setAD({
                    unitid: 45653,
                    loadedCallback: function loadedCallback() {
                        console.log("load success"), e.ADIsReady = !0;
                    },
                    rewardedCallback: function rewardedCallback(e, t) {
                        console.log(t);
                    },
                    closeCallback: function closeCallback(t) {
                        t ? e.videoReward() : game.uiToastLayer.showTips("\u83B7\u5F97\u5956\u52B1\u5931\u8D25", 1);
                    },
                    errorcallback: function errorcallback() {
                        cc.log("\u5E7F\u544A\u62C9\u53D6\u5931\u8D25\u3002\u3002\u3002");
                    }
                }));
            },
            playVideo: function playVideo() {
                if (!this.isClick) {
                    var e = this;
                    if (this.isClick = !0, this.ADIsReady) {
                        if (this.myAd45653 && this.myAd45653.checkIsLoadComplete()) this.myAd45653.show(), e.isClick = !1;
                        else {
                            game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u4E2D", 1);
                            var t = 0,
                                i = setInterval(function () {
                                    e.myAd45653.checkIsLoadComplete() && (e.myAd45653.show(), e.isClick = !1, clearInterval(i)), (t += .1) >= 3 && (clearInterval(i), e.isClick = !1, game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u5931\u8D25", 1));
                                }, 100);
                        }
                    } else game.uiToastLayer.showTips("\u6FC0\u52B1\u89C6\u9891\u52A0\u8F7D\u5931\u8D25", 1), e.isClick = !1;
                }
            },
            playBanner: function playBanner() {},
            videoReward: function videoReward() {
                if (this.userOperate(gm.DataManager.UMEvent.NewViewVedioComplete), gm.DataManager.ADS.doubleRew) return game.dispatchEvent(gm.GlobalMessage.DB_REWARD), void(gm.DataManager.ADS.doubleRew = !1);
                if (gm.DataManager.userData.freeType > -1) return game.dispatchEvent(gm.GlobalMessage.START_FREE), void game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
                if (gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"), game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE)), -1 != gm.DataManager.ADS.clickType) switch (gm.DataManager.ADS.clickType) {
                    case 0:
                    case 1:
                        game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
                }
            },
            userOperate: function userOperate(e) {
                var t = gm.StorageManager.getItem("loveLoginData");
                if (t && t.ssid) {
                    var i = "ssid=" + t.ssid + "&event=" + e,
                        n = game.Config.LOVE_REQUEST_URL + "/event?data=" + gm.Base.encode(i);
                    gm.HttpRequest.httpGets(n, function (e) {}.bind(this), !1);
                }
            }
        };
        t.exports = n, 
*/