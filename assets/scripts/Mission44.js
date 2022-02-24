

cc.Class({
    extends: cc.Component,
    properties: {
        touch: cc.Node,
        carrot: cc.Node,
        ani: cc.Animation
    },
    start: function start() {
        this.BeginPos = this.touch.position, cc.log(this.carrot.angle), this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.moveTouchClick, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.cancelTouchClick, this), this.touch.on(cc.Node.EventType.TOUCH_END, this.endTouchClick, this);
    },
    moveTouchClick(e){
        console.log('点击Mission44    moveTouchClick')
        var t = this.touch.position.y - this.BeginPos.y,
        i = this.BeginPos.sub(this.touch.position);
    cc.log(i);
    var n = new cc.Vec2(i.x, i.y),
        a = cc.v2(0, 1),
        o = n.signAngle(a),
        s = 180 - cc.misc.radiansToDegrees(o);
    cc.log("befor" + s), s > 45 && s < 180 && (s = 45), s >= 180 && s < 315 && (s = -45), cc.log("after" + s), this.carrot.angle = s, t > 0 && t < 150 && (this.carrot.scaleY = 1 + .5 * t / 150, this.carrot.scaleX = 1 - .3 * t / 150), t > 150 && this.ani.play(), t < 30 && (this.carrot.angle = 0);
    },
    cancelTouchClick(e){
        console.log('点击Mission44    cancelTouchClick')
        this.carrot.scaleY = 1, this.carrot.scaleX = 1, this.carrot.angle = 0, this.ani.stop();
    },
    endTouchClick(e){
        console.log('点击Mission44    endTouchClick')
        this.carrot.scaleY = 1, this.carrot.scaleX = 1, this.carrot.angle = 0, this.ani.stop();
    }
})

/*Mission44: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1c0f6qsFSVFzritOJAoBc4h", "Mission44"), cc.Class({
            extends: cc.Component,
            properties: {
                touch: cc.Node,
                carrot: cc.Node,
                ani: cc.Animation
            },
            start: function start() {
                this.BeginPos = this.touch.position, cc.log(this.carrot.angle), this.touch.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                    var t = this.touch.position.y - this.BeginPos.y,
                        i = this.BeginPos.sub(this.touch.position);
                    cc.log(i);
                    var n = new cc.Vec2(i.x, i.y),
                        a = cc.v2(0, 1),
                        o = n.signAngle(a),
                        s = 180 - cc.misc.radiansToDegrees(o);
                    cc.log("befor" + s), s > 45 && s < 180 && (s = 45), s >= 180 && s < 315 && (s = -45), cc.log("after" + s), this.carrot.angle = s, t > 0 && t < 150 && (this.carrot.scaleY = 1 + .5 * t / 150, this.carrot.scaleX = 1 - .3 * t / 150), t > 150 && this.ani.play(), t < 30 && (this.carrot.angle = 0);
                }, this), this.touch.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                    this.carrot.scaleY = 1, this.carrot.scaleX = 1, this.carrot.angle = 0, this.ani.stop();
                }, this), this.touch.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this.carrot.scaleY = 1, this.carrot.scaleX = 1, this.carrot.angle = 0, this.ani.stop();
                }, this);
            }
        }), 
*/