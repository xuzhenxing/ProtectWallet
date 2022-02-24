

cc.Class({
    extends: cc.Component,
    properties: {
        targetValue: cc.Integer,
        changeValue: cc.Integer,
        boolX: cc.Boolean = !0,
        boolY: cc.Boolean = !0,
        SuccessCallBack: [cc.Component.EventHandler]
    },
    start: function start() {
        this._beginGap = 0, this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var t = e.getTouches();
            if (cc.log(t), 2 == t.length) {
                var i = t[0].getLocation().sub(t[1].getLocation()).mag();
                0 == this._beginGap ? (this._BeginTouch = t, this._beginGap = i, cc.log("BeginGap = " + this._beginGap)) : this.ChangeScale(i / this._beginGap);
            }
        }, this), this.node.on(cc.Node.EventType.TOUCH_END, this.nodeClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.nodebtnClick, this);
    },
    nodeClick(){
        this._beginGap = 0;
    },
    nodebtnClick(){
        this._beginGap = 0;
    },
    ChangeScale: function ChangeScale(e) {
        this.SetScale(e), this.GetScale() == this.targetValue && null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
            e.emit();
        });
    },
    SetScale: function SetScale(e) {
        this.GetBoolBig() ? e < this.changeValue ? e = this.changeValue : e > this.targetValue && (e = this.targetValue) : e > this.changeValue ? e = this.changeValue : e < this.targetValue && (e = this.targetValue), this.boolX && (this.node.scaleX = e), this.boolY && (this.node.scaleY = e);
    },
    GetScale: function GetScale() {
        return this.boolX ? this.node.scaleX : this.boolY ? this.node.scaleY : void 0;
    },
    GetBoolBig: function GetBoolBig() {
        return this.targetValue > this.changeValue;
    }
})


/*ChangeScale: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "74f378ku0ZI9ZM35zHnmjWF", "ChangeScale"), cc.Class({
            extends: cc.Component,
            properties: {
                targetValue: cc.Integer,
                changeValue: cc.Integer,
                boolX: cc.Boolean = !0,
                boolY: cc.Boolean = !0,
                SuccessCallBack: [cc.Component.EventHandler]
            },
            start: function start() {
                this._beginGap = 0, this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    var t = e.getTouches();
                    if (cc.log(t), 2 == t.length) {
                        var i = t[0].getLocation().sub(t[1].getLocation()).mag();
                        0 == this._beginGap ? (this._BeginTouch = t, this._beginGap = i, cc.log("BeginGap = " + this._beginGap)) : this.ChangeScale(i / this._beginGap);
                    }
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this._beginGap = 0;
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    this._beginGap = 0;
                }, this);
            },
            ChangeScale: function ChangeScale(e) {
                this.SetScale(e), this.GetScale() == this.targetValue && null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                });
            },
            SetScale: function SetScale(e) {
                this.GetBoolBig() ? e < this.changeValue ? e = this.changeValue : e > this.targetValue && (e = this.targetValue) : e > this.changeValue ? e = this.changeValue : e < this.targetValue && (e = this.targetValue), this.boolX && (this.node.scaleX = e), this.boolY && (this.node.scaleY = e);
            },
            GetScale: function GetScale() {
                return this.boolX ? this.node.scaleX : this.boolY ? this.node.scaleY : void 0;
            },
            GetBoolBig: function GetBoolBig() {
                return this.targetValue > this.changeValue;
            }
        }), 
*/