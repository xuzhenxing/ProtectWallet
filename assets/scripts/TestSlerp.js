var n = require("util");
cc.Class({
    extends: cc.Component,
    properties: {
        startNode: {
            type: cc.Node,
            default: null
        },
        endNode: {
            type: cc.Node,
            default: null
        },
        Graph: null
    },
    start: function start() {
        this.Graph = this.getComponent(cc.Graphics), this.Graph.lineWidth = 3, this.Graph.strokeColor = cc.Color.GREEN;
        for (var e, t = this.startNode.position, i = this.endNode.position, a = (i.add(t).mul(.5), 1); a < 10; a++) {
            e = n.VectorSlerp(t, i, 90, .1 * a), this.Graph.strokeColor = cc.Color.RED, this.Graph.circle(e.x + cc.winSize.width / 2, e.y + cc.winSize.height / 2, 20), this.Graph.stroke();
        }
    },
    update: function update(e) {}
})

/*TestSlerp: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "767afZmKvpIfq4k5RB0LX49", "TestSlerp");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                startNode: {
                    type: cc.Node,
                    default: null
                },
                endNode: {
                    type: cc.Node,
                    default: null
                },
                Graph: null
            },
            start: function start() {
                this.Graph = this.getComponent(cc.Graphics), this.Graph.lineWidth = 3, this.Graph.strokeColor = cc.Color.GREEN;
                for (var e, t = this.startNode.position, i = this.endNode.position, a = (i.add(t).mul(.5), 1); a < 10; a++) {
                    e = n.default.VectorSlerp(t, i, 90, .1 * a), this.Graph.strokeColor = cc.Color.RED, this.Graph.circle(e.x + cc.winSize.width / 2, e.y + cc.winSize.height / 2, 20), this.Graph.stroke();
                }
            },
            update: function update(e) {}
        }), 
*/