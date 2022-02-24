

require("UIInfo"), require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        time: cc.Integer,
        callBack: [cc.Component.EventHandler],
        errCallBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._BoolTouch = !1, this._TouchTime = 0, this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this._BoolTouch = !0, this._TouchTime = 0;
        }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this._BoolTouch = !1;
        }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this._BoolTouch = !1, this._TouchTime < this.time && null != this.errCallBack && this.errCallBack.forEach(function (t) {
                t.emit([e]);
            });
        }.bind(this), this);
    },
    update: function update(e) {
        this._BoolTouch && (this._TouchTime += e, cc.log(this._TouchTime), this._TouchTime > this.time && null != this.callBack && this.callBack.forEach(function (e) {
            e.emit();
        }));
    }
})
/*LongTouch: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "d99d3v1k8JDXru9PxY+aG2h", "LongTouch");
        n(e("UIInfo")), n(e("ConstModName"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                time: cc.Integer,
                callBack: [cc.Component.EventHandler],
                errCallBack: [cc.Component.EventHandler]
            },
            start: function start() {
                this._BoolTouch = !1, this._TouchTime = 0, this.node.on(cc.Node.EventType.TOUCH_START, function () {
                    this._BoolTouch = !0, this._TouchTime = 0;
                }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._BoolTouch = !1;
                }.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this._BoolTouch = !1, this._TouchTime < this.time && null != this.errCallBack && this.errCallBack.forEach(function (t) {
                        t.emit([e]);
                    });
                }.bind(this), this);
            },
            update: function update(e) {
                this._BoolTouch && (this._TouchTime += e, cc.log(this._TouchTime), this._TouchTime > this.time && null != this.callBack && this.callBack.forEach(function (e) {
                    e.emit();
                }));
            }
        }), 
*/