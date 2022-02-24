

cc.Class({
    extends: cc.Component,
    properties: {
        target: cc.Node
    },
    Follow: function Follow() {
        var e = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO),
            t = this.node.parent.convertToNodeSpaceAR(e);
        this.node.position = t;
    }
})

/*Follow: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a3ea71096dGsZ8YA+taqHev", "Follow"), cc.Class({
            extends: cc.Component,
            properties: {
                target: cc.Node
            },
            Follow: function Follow() {
                var e = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO),
                    t = this.node.parent.convertToNodeSpaceAR(e);
                this.node.position = t;
            }
        }), 
*/