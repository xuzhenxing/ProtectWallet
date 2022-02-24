var n = require("ConstModName"),
            a = require("UIInfo");

 cc.Class({
    extends: cc.Component,
    properties: {
        callBack: [cc.Component.EventHandler]
    },
    start: function start() {
        gm.UIManager.SendNotification(n.MOD_MainView, a.UIInfo_SetAdForce, this);
    },
    AfterShowAd: function AfterShowAd() {
        null != this.callBack && this.callBack.forEach(function (e) {
            e.emit();
        });
    }
})


/*AfterForceAd: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9d2bfK81NpBWqfGH9FDU3zG", "AfterForceAd");
        var n = o(e("ConstModName")),
            a = o(e("UIInfo"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                callBack: [cc.Component.EventHandler]
            },
            start: function start() {
                gm.UIManager.SendNotification(n.default.MOD_MainView, a.default.UIInfo_SetAdForce, this);
            },
            AfterShowAd: function AfterShowAd() {
                null != this.callBack && this.callBack.forEach(function (e) {
                    e.emit();
                });
            }
        }), 
*/