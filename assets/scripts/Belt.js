
        cc.Class({
            extends: require("IUpdateAttachIDispose"),
            properties: {
                startPos: null,
                node: null,
                endPos: null,
                centerPos: null,
                isStart: !1,
                dir: 0,
                runTime: 0,
                runDir: 0,
                startPercent: 0,
                rad: 0,
                type: 0,
                cornerPosition: null
            },
            Init: function Init(e, t, i, n, a, o, s, r, c, l) {
                this.node = e, this.rad = t, this.startPos = i, this.endPos = n, this.centerPos = a, this.runDir = s, this.dir = o, this.startPercent = r, this.type = c, this.cornerPosition = l, this.StartRun();
            },
            StartRun: function StartRun() {
                this.isStart = !0, this.runTime = this.startPercent;
            },
            UpdatePos: function UpdatePos(e) {
                if (this.isStart) {
                    var t;
                    if (0 == this.type || 2 == this.type)
                        if (this.runTime >= 1) this.type += 1;
                        else {
                            var i,
                                a = e / (this.rad * Math.PI / 180) / 180;
                            this.runTime += a, t = this.runTime;
                            var o = (i = 0 == this.runDir ? n.VectorSlerp(this.startPos, this.endPos, this.centerPos, -t) : n.VectorSlerp(this.startPos, this.endPos, this.centerPos, t)).sub(this.node.position);
                            a = n.getDegree(o);
                            this.node.position = i, this.node.angle = a;
                        } if (1 == this.type) {
                        if (this.node.angle = 0, t = cc.Vec2.RIGHT.mul(e), this.node.position = this.node.position.add(t), (s = this.node.position.x - this.cornerPosition[1].x) >= 0) {
                            this.type += 1, this.startPos = this.cornerPosition[1], this.endPos = this.cornerPosition[2], this.runDir = 0;
                            a = s / (this.rad * Math.PI / 180) / 180;
                            this.runTime = a;
                        }
                    } else if (3 == this.type) {
                        var s;
                        if (this.node.angle = 180, t = cc.Vec2.RIGHT.mul(-e), this.node.position = this.node.position.add(t), (s = this.node.position.x - this.cornerPosition[3].x) <= 0) {
                            this.type = 0, this.startPos = this.cornerPosition[3], this.endPos = this.cornerPosition[0], this.runDir = 0, this.runTime = 0;
                            a = s / (this.rad * Math.PI / 180) / 180;
                            this.runTime = -a;
                        }
                    }
                }
            },
            Dispose: function Dispose() {}
        })

/*Belt: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8971dBwS45C+b45IzOHM5VU", "Belt");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                startPos: null,
                node: null,
                endPos: null,
                centerPos: null,
                isStart: !1,
                dir: 0,
                runTime: 0,
                runDir: 0,
                startPercent: 0,
                rad: 0,
                type: 0,
                cornerPosition: null
            },
            Init: function Init(e, t, i, n, a, o, s, r, c, l) {
                this.node = e, this.rad = t, this.startPos = i, this.endPos = n, this.centerPos = a, this.runDir = s, this.dir = o, this.startPercent = r, this.type = c, this.cornerPosition = l, this.StartRun();
            },
            StartRun: function StartRun() {
                this.isStart = !0, this.runTime = this.startPercent;
            },
            UpdatePos: function UpdatePos(e) {
                if (this.isStart) {
                    var t;
                    if (0 == this.type || 2 == this.type)
                        if (this.runTime >= 1) this.type += 1;
                        else {
                            var i,
                                a = e / (this.rad * Math.PI / 180) / 180;
                            this.runTime += a, t = this.runTime;
                            var o = (i = 0 == this.runDir ? n.default.VectorSlerp(this.startPos, this.endPos, this.centerPos, -t) : n.default.VectorSlerp(this.startPos, this.endPos, this.centerPos, t)).sub(this.node.position);
                            a = n.default.getDegree(o);
                            this.node.position = i, this.node.angle = a;
                        } if (1 == this.type) {
                        if (this.node.angle = 0, t = cc.Vec2.RIGHT.mul(e), this.node.position = this.node.position.add(t), (s = this.node.position.x - this.cornerPosition[1].x) >= 0) {
                            this.type += 1, this.startPos = this.cornerPosition[1], this.endPos = this.cornerPosition[2], this.runDir = 0;
                            a = s / (this.rad * Math.PI / 180) / 180;
                            this.runTime = a;
                        }
                    } else if (3 == this.type) {
                        var s;
                        if (this.node.angle = 180, t = cc.Vec2.RIGHT.mul(-e), this.node.position = this.node.position.add(t), (s = this.node.position.x - this.cornerPosition[3].x) <= 0) {
                            this.type = 0, this.startPos = this.cornerPosition[3], this.endPos = this.cornerPosition[0], this.runDir = 0, this.runTime = 0;
                            a = s / (this.rad * Math.PI / 180) / 180;
                            this.runTime = -a;
                        }
                    }
                }
            },
            Dispose: function Dispose() {}
        }), 
*/