

var n = require("ConstModName"),
a = require("UIInfo");
cc.Class({
    extends: cc.Component,
    properties: {
        SuccessCallBack: [cc.Component.EventHandler]
    },
    start: function start() {
        var e = this;
        this.DeviceTimer = 0, this._already = !1, cc.systemEvent.setAccelerometerEnabled(!0), setTimeout(function () {
            cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION), cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, e.onDeviceMotionEvent, e);
        }, 100);
    },
    onDeviceMotionEvent: function onDeviceMotionEvent(e) {
        cc.log(" x " + e.acc.x + " y " + e.acc.y), 0 == e.acc.y && (this.DeviceTimer++, (this.DeviceTimer = 5) && setTimeout(function () {
            gm.UIManager.SendNotification(n.MOD_MainView, a.UIInfo_RefreshView, null);
        }, 50)), e.acc.y > .8 && 0 == this._already && null != this.SuccessCallBack && (this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }), this._already = !0);
    }
})
/*Overturn: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "56f7cDS0r9GUoINCOCcGTxn", "Overturn");
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
                SuccessCallBack: [cc.Component.EventHandler]
            },
            start: function start() {
                var e = this;
                this.DeviceTimer = 0, this._already = !1, cc.systemEvent.setAccelerometerEnabled(!0), setTimeout(function () {
                    cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION), cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, e.onDeviceMotionEvent, e);
                }, 100);
            },
            onDeviceMotionEvent: function onDeviceMotionEvent(e) {
                cc.log(" x " + e.acc.x + " y " + e.acc.y), 0 == e.acc.y && (this.DeviceTimer++, (this.DeviceTimer = 5) && setTimeout(function () {
                    gm.UIManager.SendNotification(n.default.MOD_MainView, a.default.UIInfo_RefreshView, null);
                }, 50)), e.acc.y > .8 && 0 == this._already && null != this.SuccessCallBack && (this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }), this._already = !0);
            }
        }), 
*/