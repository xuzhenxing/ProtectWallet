

var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        startCallBack: [cc.Component.EventHandler],
        callBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._boolTouch = !1, this.node.on(cc.Node.EventType.TOUCH_START, this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_END, this.endClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelClick, this);
    },
    startClick(e){
        console.log('点击了startClick  ++++++  startClick')
        null != this.startCallBack && this.startCallBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    endClick(e){
        console.log('点击了endClick ++++++++  endClick')
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        });
    },
    cancelClick(e){
        console.log('点击了cancelClick ++++++++ cancelClick')
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        });
    }
})
/*Press: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9022e9py0JHoZuhYp2VSIig", "Press");
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
                this._boolTouch = !1, this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    null != this.startCallBack && this.startCallBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }, this);
            }
        }), 
*/