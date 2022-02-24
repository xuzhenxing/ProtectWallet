

var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        startCallBack: [cc.Component.EventHandler],
        callBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._boolTouch = !1, this._beginLocation = cc.Vec2.ZERO, this.node.on(cc.Node.EventType.TOUCH_START, this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveClick, this), this.node.on(cc.Node.EventType.TOUCH_END,this.endClick, this);
    },
    startClick(e){
        console.log('点击了startClick'),
        this._beginLocation = e.currentTouch.getLocation(), this._boolTouch = !0, null != this.startCallBack && this.startCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    moveClick(e){
        console.log('点击了moveClick');
        var t = e.currentTouch.getLocation();
        this._beginLocation.sub(t).mag() > 10 && (this._boolTouch = !1);
    },
    endClick(e){
        console.log('点击了endClick'),
        this._boolTouch && (gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        }));
    }
})

/*Touch: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7935222GjxMaYu/+ggy8jVJ", "Touch");
        var n = o(e("UIInfo")),
            a = o(e("ConstModName"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                startCallBack: [cc.Component.EventHandler],
                callBack: [cc.Component.EventHandler]
            },
            start: function start() {
                this._boolTouch = !1, this._beginLocation = cc.Vec2.ZERO, this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    this._beginLocation = e.currentTouch.getLocation(), this._boolTouch = !0, null != this.startCallBack && this.startCallBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    var t = e.currentTouch.getLocation();
                    this._beginLocation.sub(t).mag() > 10 && (this._boolTouch = !1);
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this._boolTouch && (gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    }));
                }, this);
            }
        }), 
*/