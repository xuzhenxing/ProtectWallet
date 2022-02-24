

cc.Class({
    extends: cc.Component,
    properties: {
        BeginPosition: cc.Vec2
    },
    start: function start() {
        this._beginPostion = this.node.position, cc.log(this);
    },
    ResetPosition: function ResetPosition() {
        null != this._beginPostion && (0 != this.BeginPosition.x && 0 != this.BeginPosition.y ? this.node.position = this.BeginPosition : this.node.position = this._beginPostion);
    }
})


/*ResetPos: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "93eddRRV7VPnJG0WcJt1gky", "ResetPos"), cc.Class({
            extends: cc.Component,
            properties: {
                BeginPosition: cc.Vec2
            },
            start: function start() {
                this._beginPostion = this.node.position, cc.log(this);
            },
            ResetPosition: function ResetPosition() {
                null != this._beginPostion && (0 != this.BeginPosition.x && 0 != this.BeginPosition.y ? this.node.position = this.BeginPosition : this.node.position = this._beginPostion);
            }
        }), 
*/