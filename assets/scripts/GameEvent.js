

var n = require("UIInfo"),
a = require("ConstModName"),
o = require("GameConfig");
cc.Class({
    extends: cc.Component,
    properties: {},
    ShowError: function ShowError(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowError, e);
    },
    FinishLevel: function FinishLevel(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, e);
    },
    DelayFinishLevel: function DelayFinishLevel(e) {
        setTimeout(function () {
            gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, e);
        }, 1e3);
    },
    ResetGame: function ResetGame() {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_RefreshView, null);
    },
    ADShowTip: function ADShowTip() {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ADShowTip, null);
    },
    ADFinishMission: function ADFinishMission() {
        gm.AdManager.isRVAvailable(o.AdPlayType_MainViewGameAd) ? gm.AdManager.playVideo(o.AdPlayType_MainViewGameAd) : gm.UIManager.SendNotification(a.MOD_TipsView, n.UIInfo_ShowView, o.LAN_ADNoReady);
    }
})
/*GameEvent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "6a43bul3x9F24q2xLWgTrpZ", "GameEvent");
        var n = s(e("UIInfo")),
            a = s(e("ConstModName")),
            o = s(e("GameConfig"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {},
            ShowError: function ShowError(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowError, e);
            },
            FinishLevel: function FinishLevel(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, e);
            },
            DelayFinishLevel: function DelayFinishLevel(e) {
                setTimeout(function () {
                    gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, e);
                }, 1e3);
            },
            ResetGame: function ResetGame() {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_RefreshView, null);
            },
            ADShowTip: function ADShowTip() {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ADShowTip, null);
            },
            ADFinishMission: function ADFinishMission() {
                gm.AdManager.isRVAvailable(o.default.AdPlayType_MainViewGameAd) ? gm.AdManager.playVideo(o.default.AdPlayType_MainViewGameAd) : gm.UIManager.SendNotification(a.default.MOD_TipsView, n.default.UIInfo_ShowView, o.default.LAN_ADNoReady);
            }
        }), 
*/