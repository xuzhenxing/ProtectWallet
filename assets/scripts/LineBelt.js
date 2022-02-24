
cc.Class({
    extends: cc.Component,
    properties: {
        runDir: 0,
        beltList: {
            type: [cc.Node],
            default: []
        }
    },
    Init: function Init() {},
    UpdatePos: function UpdatePos(e) {
        for (var t = this.beltList.length, i = 0; i < t; i++) {
            var n,
                a = this.beltList[i],
                o = cc.Vec2.ZERO;
            0 == this.runDir ? (o = cc.Vec2.RIGHT.mul(e), (n = a.position.add(o)).x >= this.node.width ? a.position = new cc.Vec2(-this.node.width, n.y) : a.position = n) : (o = cc.Vec2.RIGHT.mul(-e), (n = a.position.add(o)).x <= -this.node.width ? a.position = new cc.Vec2(this.node.width, n.y) : a.position = n);
        }
    }
})

/*LineBelt: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "efa7dpB6ARCjIvuBNgxol2u", "LineBelt"), cc.Class({
            extends: cc.Component,
            properties: {
                runDir: 0,
                beltList: {
                    type: [cc.Node],
                    default: []
                }
            },
            Init: function Init() {},
            UpdatePos: function UpdatePos(e) {
                for (var t = this.beltList.length, i = 0; i < t; i++) {
                    var n,
                        a = this.beltList[i],
                        o = cc.Vec2.ZERO;
                    0 == this.runDir ? (o = cc.Vec2.RIGHT.mul(e), (n = a.position.add(o)).x >= this.node.width ? a.position = new cc.Vec2(-this.node.width, n.y) : a.position = n) : (o = cc.Vec2.RIGHT.mul(-e), (n = a.position.add(o)).x <= -this.node.width ? a.position = new cc.Vec2(this.node.width, n.y) : a.position = n);
                }
            }
        }), 
*/