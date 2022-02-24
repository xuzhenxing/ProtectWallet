

 var n = require("UIInfo"),
 a = require("ConstModName");
 cc.Class({
    extends: cc.Component,
    properties: {
        left: cc.Node,
        right: cc.Node,
        boat: cc.Node
    },
    start: function start() {
        this._touchLeft = !1, this._touchright = !1, this.left.on(cc.Node.EventType.TOUCH_MOVE, this.moveLeftClick, this), this.right.on(cc.Node.EventType.TOUCH_MOVE, this.moveRightClick, this), this.left.on(cc.Node.EventType.TOUCH_MOVE, this.moveLeft, this), this.right.on(cc.Node.EventType.TOUCH_MOVE, this.moveRight, this), this.left.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelLeftClick, this), this.right.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelRightClick, this), this.left.on(cc.Node.EventType.TOUCH_END, this.endLeftClick, this), this.right.on(cc.Node.EventType.TOUCH_END, this.endRightClick, this);
    },
    moveLeftClick(){
        console.log('点击Mission11    moveLeftClick')
        this._touchLeft = !0;
    },
    moveRightClick(){
        console.log('点击Mission11    moveRightClick')
        this._touchright = !0;
    },
    cancelLeftClick(){
        console.log('点击Mission11    cancelLeftClick')
        this._touchLeft = !1;
    },
    cancelRightClick(){
        console.log('点击Mission11    cancelRightClick')
        this._touchright = !1;
    },
    endLeftClick(){
        console.log('点击Mission11    endLeftClick')
        this._touchLeft = !1;
    },
    endRightClick(){
        console.log('点击Mission11    endRightClick')
        this._touchright = !1;
    },
    moveLeft: function moveLeft(e) {
        if (this._touchLeft && this._touchright) {
            var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
            (t = this.node.parent.convertToNodeSpaceAR(t)).x < -90 && (this.left.x = t.x, this.ChangeBoat());
        }
    },
    moveRight: function moveRight(e) {
        if (this._touchLeft && this._touchright) {
            var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
            (t = this.node.parent.convertToNodeSpaceAR(t)).x > 90 && (this.right.x = t.x, this.ChangeBoat());
        }
    },
    ChangeBoat: function ChangeBoat() {
        this.boat.scale = (this.right.x - this.left.x) / 344, this.boat.scale > 1 && (this.boat.scale = 1), this.boat.scale > .95 && gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, null);
    }
})
/*Mission11: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "224b7FqqBJGVaIU3PZeP906", "Mission11");
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
                left: cc.Node,
                right: cc.Node,
                boat: cc.Node
            },
            start: function start() {
                this._touchLeft = !1, this._touchright = !1, this.left.on(cc.Node.EventType.TOUCH_MOVE, function () {
                    this._touchLeft = !0;
                }, this), this.right.on(cc.Node.EventType.TOUCH_MOVE, function () {
                    this._touchright = !0;
                }, this), this.left.on(cc.Node.EventType.TOUCH_MOVE, this.moveLeft, this), this.right.on(cc.Node.EventType.TOUCH_MOVE, this.moveRight, this), this.left.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._touchLeft = !1;
                }, this), this.right.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._touchright = !1;
                }, this), this.left.on(cc.Node.EventType.TOUCH_END, function () {
                    this._touchLeft = !1;
                }, this), this.right.on(cc.Node.EventType.TOUCH_END, function () {
                    this._touchright = !1;
                }, this);
            },
            moveLeft: function moveLeft(e) {
                if (this._touchLeft && this._touchright) {
                    var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
                    (t = this.node.parent.convertToNodeSpaceAR(t)).x < -90 && (this.left.x = t.x, this.ChangeBoat());
                }
            },
            moveRight: function moveRight(e) {
                if (this._touchLeft && this._touchright) {
                    var t = new cc.Vec2(e.getLocationX(), e.getLocationY());
                    (t = this.node.parent.convertToNodeSpaceAR(t)).x > 90 && (this.right.x = t.x, this.ChangeBoat());
                }
            },
            ChangeBoat: function ChangeBoat() {
                this.boat.scale = (this.right.x - this.left.x) / 344, this.boat.scale > 1 && (this.boat.scale = 1), this.boat.scale > .95 && gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, null);
            }
        }), 
*/