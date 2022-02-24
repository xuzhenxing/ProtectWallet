
cc.Class({
    extends: cc.Component,
    properties: {},
    start:function start() {
        this.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(-1500, -800);
    }
})

/*AddForce: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "01525KAG+BJmpVrOHI1Qfsm", "AddForce"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function start() {
                this.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(-1500, -800);
            }
        }), 
*/