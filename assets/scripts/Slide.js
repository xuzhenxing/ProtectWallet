

require("UIInfo"), require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        time: cc.Integer,
        callBack: [cc.Component.EventHandler],
        item: cc.Node,
        _hadShowCallBack: cc.Boolean
    },
    start: function start() {
        this._Timer = 0, this._beSlide = !1, this._hadShowCallBack = !1, this.node.on(cc.Node.EventType.TOUCH_START, this.startClick, this), this.node.on(cc.Node.EventType.TOUCH_MOVE,this.moveClick, this), this.node.on(cc.Node.EventType.TOUCH_END,this.endClick, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.cancelClick, this);
    },
    startClick(e){
        console.log('点击了startClick')
        this._beSlide = !0;
    },
    moveClick(e){
        console.log('点击了moveClick')
        var t = e.touch.getLocation();
        this._beSlide ? this.item.getBoundingBoxToWorld().contains(t) && (cc.log("contain"), this._beSlide = !1, this._Timer++, this._Timer >= this.time && 0 == this._hadShowCallBack && (this._hadShowCallBack = !0, null != this.callBack && this.callBack.forEach(function (t) {
            t.emit([e]);
        }))) : this.item.getBoundingBoxToWorld().contains(t) || (cc.log("contain"), this._beSlide = !0);
    },
    endClick(e){
        console.log('点击了endClick')
        this._Timer = 0, this._beSlide = !1;
    },
    cancelClick(e){
        console.log('点击了cancelClick')
        this._Timer = 0, this._beSlide = !1;
    }
})
/*Slide: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1a8602VuktNOLLhcxenGA3S", "Slide");
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
                item: cc.Node,
                _hadShowCallBack: cc.Boolean
            },
            start: function start() {
                this._Timer = 0, this._beSlide = !1, this._hadShowCallBack = !1, this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    this._beSlide = !0;
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    var t = e.touch.getLocation();
                    this._beSlide ? this.item.getBoundingBoxToWorld().contains(t) && (cc.log("contain"), this._beSlide = !1, this._Timer++, this._Timer >= this.time && 0 == this._hadShowCallBack && (this._hadShowCallBack = !0, null != this.callBack && this.callBack.forEach(function (t) {
                        t.emit([e]);
                    }))) : this.item.getBoundingBoxToWorld().contains(t) || (cc.log("contain"), this._beSlide = !0);
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this._Timer = 0, this._beSlide = !1;
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    this._Timer = 0, this._beSlide = !1;
                }, this);
            }
        }), 
*/