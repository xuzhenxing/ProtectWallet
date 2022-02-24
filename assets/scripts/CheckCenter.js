

require("UIInfo"), require("ConstModName");

cc.Class({
    extends: cc.Component,
    properties: {
        target: [cc.Node],
        Errtarget: [cc.Node],
        length: cc.Integer = 50,
        outside: cc.Boolean = !1,
        SuccessCallBack: [cc.Component.EventHandler],
        ErrorCallBack: [cc.Component.EventHandler]
    },
    start: function start() {
        var e = this;
        this.target.forEach(function (t) {
            t.on(cc.Node.EventType.TOUCH_END, e.chooseSuccess, e), t.on(cc.Node.EventType.TOUCH_CANCEL, e.chooseSuccess, e);
        }), this.Errtarget.forEach(function (t) {
            t.on(cc.Node.EventType.TOUCH_END, e.chooseError, e), t.on(cc.Node.EventType.TOUCHTOUCH_CANCEL_END, e.chooseError, e);
        });
    },
    chooseSuccess: function chooseSuccess(e) {
        console.log("选择正确")
        var t = e.currentTarget;
        0 != this.node.active && (this.outside ? Math.abs(t.x - this.node.x) > this.length || Math.abs(t.y - this.node.y) > this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (t) {
            t.emit([e]);
        }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
            t.emit([e]);
        }) : Math.abs(t.x - this.node.x) < this.length && Math.abs(t.y - this.node.y) < this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (t) {
            t.emit([e]);
        }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
            t.emit([e]);
        }));
    },
    chooseError: function chooseError(e) {
        console.log ('选择错误')
        0 != this.node.active && null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
            t.emit([e]);
        });
    }
})
/*CheckCenter: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8929fT5CE9LxYp+W+q/C7T4", "CheckCenter");
        n(e("UIInfo")), n(e("ConstModName"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                target: [cc.Node],
                Errtarget: [cc.Node],
                length: cc.Integer = 50,
                outside: cc.Boolean = !1,
                SuccessCallBack: [cc.Component.EventHandler],
                ErrorCallBack: [cc.Component.EventHandler]
            },
            start: function start() {
                var e = this;
                this.target.forEach(function (t) {
                    t.on(cc.Node.EventType.TOUCH_END, e.CheckSuccess, e), t.on(cc.Node.EventType.TOUCH_CANCEL, e.CheckSuccess, e);
                }), this.Errtarget.forEach(function (t) {
                    t.on(cc.Node.EventType.TOUCH_END, e.CheckError, e), t.on(cc.Node.EventType.TOUCHTOUCH_CANCEL_END, e.CheckError, e);
                });
            },
            CheckSuccess: function CheckSuccess(e) {
                var t = e.currentTarget;
                0 != this.node.active && (this.outside ? Math.abs(t.x - this.node.x) > this.length || Math.abs(t.y - this.node.y) > this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (t) {
                    t.emit([e]);
                }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
                    t.emit([e]);
                }) : Math.abs(t.x - this.node.x) < this.length && Math.abs(t.y - this.node.y) < this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (t) {
                    t.emit([e]);
                }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
                    t.emit([e]);
                }));
            },
            CheckError: function CheckError(e) {
                0 != this.node.active && null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (t) {
                    t.emit([e]);
                });
            }
        }), 
*/