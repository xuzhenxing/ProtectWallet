

var n = require("ConstModName"),
a = require("UIInfo");
cc.Class({
    extends: cc.Component,
    properties: {
        time: cc.Integer,
        SuccessCallBack: [cc.Component.EventHandler],
        ErrorCallBack: [cc.Component.EventHandler],
        canShake: cc.Boolean = !0
    },
    start: function start() {
        var e = this;
        this._Timer = 0, this.lastTimer = !1, this.DeviceTimer = 0, cc.systemEvent.setAccelerometerEnabled(!0), setTimeout(function () {
            cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION), cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, e.onDeviceMotionEvent, e);
        }, 100);
    },
    onDeviceMotionEvent: function onDeviceMotionEvent(e) {
        cc.log(e), cc.log(this.canShake), 0 != this.canShake && (console.log(e.acc.x), 0 == e.acc.x && (this.DeviceTimer++, 5 == this.DeviceTimer && setTimeout(function () {
            gm.UIManager.SendNotification(n.MOD_MainView, a.UIInfo_RefreshView, null);
        }, 50)), this.lastTimer ? e.acc.x < -.3 && (this.lastTimer = !1, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (null != this.SuccessCallBack ? this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
            e.emit();
        }))) : e.acc.x > .3 && (this.lastTimer = !0, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (null != this.SuccessCallBack ? this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
            e.emit();
        }))));
    },
    CanShake: function CanShake() {
        this.canShake = !0;
    },
    CancelShake: function CancelShake() {
        this.canShake = !1;
    }
})
/*ShakeTimer: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7b2f0zdi1dHO7+CSd4JjMzk", "ShakeTimer");
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
                time: cc.Integer,
                SuccessCallBack: [cc.Component.EventHandler],
                ErrorCallBack: [cc.Component.EventHandler],
                canShake: cc.Boolean = !0
            },
            start: function start() {
                var e = this;
                this._Timer = 0, this.lastTimer = !1, this.DeviceTimer = 0, cc.systemEvent.setAccelerometerEnabled(!0), setTimeout(function () {
                    cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION), cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, e.onDeviceMotionEvent, e);
                }, 100);
            },
            onDeviceMotionEvent: function onDeviceMotionEvent(e) {
                cc.log(e), cc.log(this.canShake), 0 != this.canShake && (console.log(e.acc.x), 0 == e.acc.x && (this.DeviceTimer++, 5 == this.DeviceTimer && setTimeout(function () {
                    gm.UIManager.SendNotification(n.default.MOD_MainView, a.default.UIInfo_RefreshView, null);
                }, 50)), this.lastTimer ? e.acc.x < -.3 && (this.lastTimer = !1, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (null != this.SuccessCallBack ? this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
                    e.emit();
                }))) : e.acc.x > .3 && (this.lastTimer = !0, this._Timer++, console.log("Change" + this._Timer), this._Timer > this.time && (null != this.SuccessCallBack ? this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
                    e.emit();
                }))));
            },
            CanShake: function CanShake() {
                this.canShake = !0;
            },
            CancelShake: function CancelShake() {
                this.canShake = !1;
            }
        }), 
*/