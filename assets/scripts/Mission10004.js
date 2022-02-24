

cc.Class({
    extends: cc.Component,
    properties: {
        Kite1: cc.Node,
        Kite2: cc.Node,
        Kite3: cc.Node,
        Kite1Point: cc.Node,
        Kite2Point: cc.Node,
        Kite3Point: cc.Node,
        _Kite1Fly: !1,
        _Kite2Fly: !1,
        _Kite3Fly: !1,
        Len: cc.Integer = 200,
        CheckLen: cc.Integer = 5,
        SuccessCallBack: cc.Component.EventHandler,
        FailCallBack: cc.Component.EventHandler
    },
    onLoad: function onLoad() {
        this._Kite3Fly = !1, this._Kite2Fly = !1, this._Kite2Fly = !1, this.Kite1Point.on(cc.Node.EventType.TOUCH_START, this.startKite1PointClick, this), this.Kite1Point.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelKite1PointClick, this), this.Kite1Point.on(cc.Node.EventType.TOUCH_END, this.endKite1PointClick, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_START, this.startKite2PointClick, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelKite2PointClick, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_END, this.endKite2PointClick, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_START, this.startKite3PointClick, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelKite3PointClick, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_END, this.endKite3PointClick, this), this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1, this.CanFly = !0;
    },
    startKite1PointClick(){
        console.log('点击Mission10004    startKite1PointClick======')
        this._Kite1Fly = !1;
    },
    cancelKite1PointClick(){
        console.log('点击Mission10004    cancelKite1PointClick=====')
        this._Kite1Fly = !0;
    },
    endKite1PointClick(){
        console.log('点击Mission10004    endKite1PointClick======')
        this._Kite1Fly = !0;
    },
    startKite2PointClick(){
        console.log('点击Mission10004    startKite2PointClick++++++')
        this._Kite2Fly = !1;
    },
    cancelKite2PointClick(){
        console.log('点击Mission10004    cancelKite2PointClick++++++')
        this._Kite2Fly = !0;
    },
    endKite2PointClick(){
        console.log('点击Mission10004    endKite2PointClick++++++++')
        this._Kite2Fly = !0;
    },
    startKite3PointClick(){
        console.log('点击Mission10004    startKite3PointClick--------')
        this._Kite3Fly = !1;
    },
    cancelKite3PointClick(){
        console.log('点击Mission10004    cancelKite3PointClick-------')
        this._Kite3Fly = !0;
    },
    endKite3PointClick(){
        console.log('点击Mission10004    endKite3PointClick--------')
        this._Kite3Fly = !0;
    },
    AllKiteFly: function AllKiteFly() {
        this.CanFly && (this.CanFly = !1, this._Kite1Fly = !0, this._Kite2Fly = !0, this._Kite3Fly = !0, this.Kite1Point.active = !0, this.Kite2Point.active = !0, this.Kite3Point.active = !0);
    },
    OneKiteFly: function OneKiteFly() {
        this.CanFly && (this.CanFly = !1, this._Kite1Fly = !1, this._Kite2Fly = !1, this._Kite3Fly = !0, this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1);
    },
    update: function update(e) {
        if (this._Kite1Fly && (this.Kite1.y += 2), this._Kite2Fly && (this.Kite2.y += 2), this._Kite3Fly && (this.Kite3.y += 2), this.Kite1.y > this.Len || this.Kite2.y > this.Len || this.Kite3.y > this.Len) {
            if (this._Kite1Fly = !1, this._Kite2Fly = !1, this._Kite3Fly = !1, this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1, this.Kite1.y - this.Kite2.y > this.CheckLen && this.Kite1.y - this.Kite3.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
            if (this.Kite2.y - this.Kite1.y > this.CheckLen && this.Kite2.y - this.Kite3.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
            if (this.Kite3.y - this.Kite1.y > this.CheckLen && this.Kite3.y - this.Kite2.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
            null != this.FailCallBack && (this.FailCallBack.emit(), this.Kite1.y = 0, this.Kite2.y = 0, this.Kite3.y = 0, this.CanFly = !0);
        }
    }
})

/*Mission10004: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "88e475H4DNLKoEq4moqm7P1", "Mission10004"), cc.Class({
            extends: cc.Component,
            properties: {
                Kite1: cc.Node,
                Kite2: cc.Node,
                Kite3: cc.Node,
                Kite1Point: cc.Node,
                Kite2Point: cc.Node,
                Kite3Point: cc.Node,
                _Kite1Fly: !1,
                _Kite2Fly: !1,
                _Kite3Fly: !1,
                Len: cc.Integer = 200,
                CheckLen: cc.Integer = 5,
                SuccessCallBack: cc.Component.EventHandler,
                FailCallBack: cc.Component.EventHandler
            },
            onLoad: function onLoad() {
                this._Kite3Fly = !1, this._Kite2Fly = !1, this._Kite2Fly = !1, this.Kite1Point.on(cc.Node.EventType.TOUCH_START, function () {
                    this._Kite1Fly = !1;
                }, this), this.Kite1Point.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._Kite1Fly = !0;
                }, this), this.Kite1Point.on(cc.Node.EventType.TOUCH_END, function () {
                    this._Kite1Fly = !0;
                }, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_START, function () {
                    this._Kite2Fly = !1;
                }, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._Kite2Fly = !0;
                }, this), this.Kite2Point.on(cc.Node.EventType.TOUCH_END, function () {
                    this._Kite2Fly = !0;
                }, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_START, function () {
                    this._Kite3Fly = !1;
                }, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._Kite3Fly = !0;
                }, this), this.Kite3Point.on(cc.Node.EventType.TOUCH_END, function () {
                    this._Kite3Fly = !0;
                }, this), this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1, this.CanFly = !0;
            },
            AllKiteFly: function AllKiteFly() {
                this.CanFly && (this.CanFly = !1, this._Kite1Fly = !0, this._Kite2Fly = !0, this._Kite3Fly = !0, this.Kite1Point.active = !0, this.Kite2Point.active = !0, this.Kite3Point.active = !0);
            },
            OneKiteFly: function OneKiteFly() {
                this.CanFly && (this.CanFly = !1, this._Kite1Fly = !1, this._Kite2Fly = !1, this._Kite3Fly = !0, this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1);
            },
            update: function update(e) {
                if (this._Kite1Fly && (this.Kite1.y += 2), this._Kite2Fly && (this.Kite2.y += 2), this._Kite3Fly && (this.Kite3.y += 2), this.Kite1.y > this.Len || this.Kite2.y > this.Len || this.Kite3.y > this.Len) {
                    if (this._Kite1Fly = !1, this._Kite2Fly = !1, this._Kite3Fly = !1, this.Kite1Point.active = !1, this.Kite2Point.active = !1, this.Kite3Point.active = !1, this.Kite1.y - this.Kite2.y > this.CheckLen && this.Kite1.y - this.Kite3.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
                    if (this.Kite2.y - this.Kite1.y > this.CheckLen && this.Kite2.y - this.Kite3.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
                    if (this.Kite3.y - this.Kite1.y > this.CheckLen && this.Kite3.y - this.Kite2.y > this.CheckLen) return void(null != this.SuccessCallBack && this.SuccessCallBack.emit());
                    null != this.FailCallBack && (this.FailCallBack.emit(), this.Kite1.y = 0, this.Kite2.y = 0, this.Kite3.y = 0, this.CanFly = !0);
                }
            }
        }), 
*/