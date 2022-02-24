
 var n = {
    initGame: function initGame() {
        this.data = 0;
    },
    showAdsForInterstitial: function showAdsForInterstitial() {
        0;
    },
    showAdsForBanner: function showAdsForBanner() {
        0;
    },
    showAdsForVideo: function showAdsForVideo() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.data = e;
    },
    gameOver: function gameOver() {
        0;
    },
    watchADReward: function watchADReward() {
        if (gm.DataManager.ADS.doubleRew) return game.dispatchEvent(gm.GlobalMessage.DB_REWARD), void(gm.DataManager.ADS.doubleRew = !1);
        if (gm.DataManager.userData.freeType > -1) return game.dispatchEvent(gm.GlobalMessage.START_FREE), void game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
        if (gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"), game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE)), -1 != gm.DataManager.ADS.clickType) switch (gm.DataManager.ADS.clickType) {
            case 0:
            case 1:
                game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
        }
    },
    gameStartLevel: function gameStartLevel() {
        0;
    },
    updateScore: function updateScore(e) {
        0;
    },
    showLeaderboad: function showLeaderboad() {
        0;
    },
    userOperate: function userOperate(e) {
        0;
    },
    ShareTitle: function ShareTitle(e, t, i) {
        0;
    },
    ShareScreenShot: function ShareScreenShot(e) {
        0;
    },
    shareSuccess: function shareSuccess() {
        gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE), game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"));
    },
    shareFail: function shareFail() {
        game.uiToastLayer.showTips("\u5206\u4EAB\u5931\u8D25", 1.5);
    },
    getGameData: {
        getIDFV: function getIDFV() {
            var e;
            return e;
        },
        getIDFA: function getIDFA() {
            var e;
            return e;
        },
        getAppName: function getAppName() {},
        getBundleID: function getBundleID() {},
        getLocalAppVersion: function getLocalAppVersion() {}
    },
    pasteBoard: function pasteBoard(e) {
        0;
    }
};
module.exports = n
/*IosInterface: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "17bcbRcxkdOMboWgALpdKRj", "IosInterface");
        var n = {
            initGame: function initGame() {
                this.data = 0;
            },
            showAdsForInterstitial: function showAdsForInterstitial() {
                0;
            },
            showAdsForBanner: function showAdsForBanner() {
                0;
            },
            showAdsForVideo: function showAdsForVideo() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.data = e;
            },
            gameOver: function gameOver() {
                0;
            },
            watchADReward: function watchADReward() {
                if (gm.DataManager.ADS.doubleRew) return game.dispatchEvent(gm.GlobalMessage.DB_REWARD), void(gm.DataManager.ADS.doubleRew = !1);
                if (gm.DataManager.userData.freeType > -1) return game.dispatchEvent(gm.GlobalMessage.START_FREE), void game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
                if (gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"), game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE)), -1 != gm.DataManager.ADS.clickType) switch (gm.DataManager.ADS.clickType) {
                    case 0:
                    case 1:
                        game.dispatchEvent(gm.GlobalMessage.AD_REWARD);
                }
            },
            gameStartLevel: function gameStartLevel() {
                0;
            },
            updateScore: function updateScore(e) {
                0;
            },
            showLeaderboad: function showLeaderboad() {
                0;
            },
            userOperate: function userOperate(e) {
                0;
            },
            ShareTitle: function ShareTitle(e, t, i) {
                0;
            },
            ShareScreenShot: function ShareScreenShot(e) {
                0;
            },
            shareSuccess: function shareSuccess() {
                gm.DataManager.ADS.reGame && (gm.DataManager.ADS.reGame = !1, game.dispatchEvent(gm.GlobalMessage.REGAME_CLOSE), game.dispatchEvent(gm.GlobalMessage.USE_DIAMOND, "aliveOK"));
            },
            shareFail: function shareFail() {
                game.uiToastLayer.showTips("\u5206\u4EAB\u5931\u8D25", 1.5);
            },
            getGameData: {
                getIDFV: function getIDFV() {
                    var e;
                    return e;
                },
                getIDFA: function getIDFA() {
                    var e;
                    return e;
                },
                getAppName: function getAppName() {},
                getBundleID: function getBundleID() {},
                getLocalAppVersion: function getLocalAppVersion() {}
            },
            pasteBoard: function pasteBoard(e) {
                0;
            }
        };
        t.exports = n, 
*/