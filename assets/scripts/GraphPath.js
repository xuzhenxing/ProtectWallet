

cc.Class({
    properties: {
        startPoint: null,
        endPoint: null,
        nextNode: null,
        preNode: null
    },
    Init: function Init(e, t) {
        this.startPoint = e, this.endPoint = t;
    },
    SetNextNode: function SetNextNode(e) {
        this.nextNode = e;
    },
    setPreNode: function setPreNode(e) {
        this.preNode = e;
    }
}), cc.Class({
    properties: {
        edges: null
    },
    createGraph: function createGraph(t) {
        this.edges = [];
        for (var i = t.length, n = 0; n < i; n++) {
            var a = new(require("Node"))();
            n < i - 1 ? a.Init(t[n], t[n + 1]) : a.Init(t[n], t[0]), this.edges.push(a), n > 0 && (this.edges[n - 1].SetNextNode(a), this.edges[n].setPreNode(this.edges[n - 1])), n == i - 1 && (this.edges[n].SetNextNode(this.edges[0]), this.edges[0].setPreNode(this.edges[n]));
        }
    },
    sliceNode: function sliceNode(e) {
        var t = [],
            i = [],
            n = null,
            a = null,
            o = null,
            s = null,
            r = !0;
        for (2 == e.length ? (n = this.getPointInNode(e[0]), a = this.getPointInNode(e[1]), o = e[0], s = e[1], r = !0) : 3 == e.length && (n = this.getPointInNode(e[1]), a = this.getPointInNode(e[2]), o = e[1], s = e[2], r = !1), t.push(o), t.push(n.endPoint); n != a;) {
            n = n.nextNode, t.push(n.endPoint);
        }
        for (t.push(s), r || t.push(e[0]), i.push(o), i.push(n.startPoint); n != a;) {
            n = n.preNode, i.push(n.startPoint);
        }
        return i.push(s), r || i.push(e[0]), {
            pos1: t,
            pos2: i
        };
    },
    RefreshGraph: function RefreshGraph(e) {
        this.createGraph(e);
    },
    getPointInNode: function getPointInNode(e) {
        for (var t = null, i = this.edges.length, n = 0; n < i; n++) {
            var a = this.edges[n],
                o = e.sub(a.startPoint),
                s = a.endPoint.sub(e),
                r = 180 * o.signAngle(s) / Math.PI;
            if (Math.abs(r) <= 5) {
                t = a;
                break;
            }
        }
        return t;
    }
})


/*GraphPath: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "6c87anGXTlPeZYkx63PcOno", "GraphPath");
        cc.Class({
            properties: {
                startPoint: null,
                endPoint: null,
                nextNode: null,
                preNode: null
            },
            Init: function Init(e, t) {
                this.startPoint = e, this.endPoint = t;
            },
            SetNextNode: function SetNextNode(e) {
                this.nextNode = e;
            },
            setPreNode: function setPreNode(e) {
                this.preNode = e;
            }
        }), cc.Class({
            properties: {
                edges: null
            },
            createGraph: function createGraph(t) {
                this.edges = [];
                for (var i = t.length, n = 0; n < i; n++) {
                    var a = new(e("Node"))();
                    n < i - 1 ? a.Init(t[n], t[n + 1]) : a.Init(t[n], t[0]), this.edges.push(a), n > 0 && (this.edges[n - 1].SetNextNode(a), this.edges[n].setPreNode(this.edges[n - 1])), n == i - 1 && (this.edges[n].SetNextNode(this.edges[0]), this.edges[0].setPreNode(this.edges[n]));
                }
            },
            sliceNode: function sliceNode(e) {
                var t = [],
                    i = [],
                    n = null,
                    a = null,
                    o = null,
                    s = null,
                    r = !0;
                for (2 == e.length ? (n = this.getPointInNode(e[0]), a = this.getPointInNode(e[1]), o = e[0], s = e[1], r = !0) : 3 == e.length && (n = this.getPointInNode(e[1]), a = this.getPointInNode(e[2]), o = e[1], s = e[2], r = !1), t.push(o), t.push(n.endPoint); n != a;) {
                    n = n.nextNode, t.push(n.endPoint);
                }
                for (t.push(s), r || t.push(e[0]), i.push(o), i.push(n.startPoint); n != a;) {
                    n = n.preNode, i.push(n.startPoint);
                }
                return i.push(s), r || i.push(e[0]), {
                    pos1: t,
                    pos2: i
                };
            },
            RefreshGraph: function RefreshGraph(e) {
                this.createGraph(e);
            },
            getPointInNode: function getPointInNode(e) {
                for (var t = null, i = this.edges.length, n = 0; n < i; n++) {
                    var a = this.edges[n],
                        o = e.sub(a.startPoint),
                        s = a.endPoint.sub(e),
                        r = 180 * o.signAngle(s) / Math.PI;
                    if (Math.abs(r) <= 5) {
                        t = a;
                        break;
                    }
                }
                return t;
            }
        });
        
*/