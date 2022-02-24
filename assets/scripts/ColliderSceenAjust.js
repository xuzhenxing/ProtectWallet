

cc.Class({
    extends: cc.Component,
    properties: {
        top: {
            default: null,
            type: cc.Node
        },
        bottom: {
            default: null,
            type: cc.Node
        },
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        }
    },
    update: function update(e) {
        var t,
            i = cc.winSize;
        null != this.left && (t = this.left.position, t = new cc.Vec2(-i.width / 2, t.y), this.left.position = t), null != this.right && (t = this.right.position, t = new cc.Vec2(i.width / 2, t.y), this.right.position = t);
    }
})

/*ColliderSceenAjust: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "c000f/UC3pMvJzxJipay3BC", "ColliderSceenAjust"), cc.Class({
            extends: cc.Component,
            properties: {
                top: {
                    default: null,
                    type: cc.Node
                },
                bottom: {
                    default: null,
                    type: cc.Node
                },
                left: {
                    default: null,
                    type: cc.Node
                },
                right: {
                    default: null,
                    type: cc.Node
                }
            },
            update: function update(e) {
                var t,
                    i = cc.winSize;
                null != this.left && (t = this.left.position, t = new cc.Vec2(-i.width / 2, t.y), this.left.position = t), null != this.right && (t = this.right.position, t = new cc.Vec2(i.width / 2, t.y), this.right.position = t);
            }
        }), 
*/