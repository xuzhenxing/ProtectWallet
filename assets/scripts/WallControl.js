

cc.Class({
    extends: cc.Component,
    properties: {
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        },
        top: {
            default: null,
            type: cc.Node
        },
        bottom: {
            default: null,
            type: cc.Node
        }
    },
    start: function start() {
        this.left.active = !0, this.right.active = !0, this.top.active = !0, this.bottom.active = !0;
    }
})

/*WallControl: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "f19f7Qo6YdCgJ58HgBSg4S/", "WallControl"), cc.Class({
            extends: cc.Component,
            properties: {
                left: {
                    default: null,
                    type: cc.Node
                },
                right: {
                    default: null,
                    type: cc.Node
                },
                top: {
                    default: null,
                    type: cc.Node
                },
                bottom: {
                    default: null,
                    type: cc.Node
                }
            },
            start: function start() {
                this.left.active = !0, this.right.active = !0, this.top.active = !0, this.bottom.active = !0;
            }
        }), 
*/