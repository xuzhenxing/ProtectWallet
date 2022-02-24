

var n = require("util");
var a = cc.Enum({
        RIGHT: 0,
        LEFT: 1
    }),
    o = cc.Enum({
        Clockwise: 0,
        Counterclockwise: 1
    });
cc.Class({
    extends: cc.Component,
    properties: {
        centerOffset: 0,
        rad: 0,
        extraLength: 0,
        texture: {
            type: cc.SpriteFrame,
            default: null
        },
        beltNodeList: null,
        beltNum: 0,
        beltIns: {
            type: cc.Node,
            default: null
        },
        dir: a.RIGHT,
        runDir: o.Clockwise,
        isStart: !1
    },
    Init: function Init() {
        this.beltNodeList = new Array();
        var t = 180 * this.rad * Math.PI / 180;
        this.beltNum = t / this.beltIns.width;
        for (var i = cc.Vec2.UP.mul(this.rad), o = cc.Vec2.UP.mul(-this.rad), s = 0; s <= this.beltNum; s++) {
            var r, c, l;
            this.dir == a.RIGHT ? (r = n.VectorSlerp(i, o, this.centerOffset, -s * this.beltIns.width / t), c = o, l = i) : (r = n.VectorSlerp(i, o, this.centerOffset, s * this.beltIns.width / t), c = i, l = o);
            var u = cc.instantiate(this.beltIns);
            u.active = !0, u.parent = this.node, u.position = r;
            var d = new(require("Belt"))();
            d.Init(u, this.rad, l, c, this.centerOffset, this.dir, this.runDir, s * this.beltIns.width / t), this.beltNodeList[s] = d;
        }
        this.startRun();
    },
    startRun: function startRun() {
        this.isStart = !0;
        var e = this.beltNodeList.length;
        if (this.runDir == o.Clockwise)
            if (this.dir == a.RIGHT)
                for (var t = 0; t < e; t++) {
                    var i = this.beltNodeList[t].node,
                        n = (t >= e - 1 || t <= 0 ? this.beltNodeList[t].node : this.beltNodeList[t + 1].node).position.sub(i.position).normalize(),
                        s = 180;
                    t <= 0 && (s = 0), n.mag() > 0 && (s = this.getDegree(n)), i.angle = s;
                } else
                    for (var r = e - 1; r >= 0; r--) {
                        i = this.beltNodeList[r].node, n = (r >= e - 1 || r <= 0 ? this.beltNodeList[r].node : this.beltNodeList[r - 1].node).position.sub(i.position).normalize(), s = 0;
                        r >= e - 1 && (s = 180), n.mag() > 0 && (s = this.getDegree(n)), i.angle = s;
                    }
    },
    getDegree: function getDegree(e) {
        var t = Math.atan(e.y / e.x) / Math.PI * 180;
        return e.x >= 0 ? e.y < 0 && (t += 360) : e.y > 0 ? t += 180 : t = 180 + t, t;
    },
    run: function run(e) {
        for (var t = this.beltNodeList.length, i = 0; i < t; i++) {
            this.beltNodeList[i].UpdatePos(e);
        }
    },
    setBeltTexture: function setBeltTexture() {},
    UpdatePos: function UpdatePos(e) {
        this.isStart && this.run(e);
    }
})


/*CurveBelt: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "84ce4CNh/5Lm6e88aMW4G9C", "CurveBelt");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        var a = cc.Enum({
                RIGHT: 0,
                LEFT: 1
            }),
            o = cc.Enum({
                Clockwise: 0,
                Counterclockwise: 1
            });
        cc.Class({
            extends: cc.Component,
            properties: {
                centerOffset: 0,
                rad: 0,
                extraLength: 0,
                texture: {
                    type: cc.SpriteFrame,
                    default: null
                },
                beltNodeList: null,
                beltNum: 0,
                beltIns: {
                    type: cc.Node,
                    default: null
                },
                dir: a.RIGHT,
                runDir: o.Clockwise,
                isStart: !1
            },
            Init: function Init() {
                this.beltNodeList = new Array();
                var t = 180 * this.rad * Math.PI / 180;
                this.beltNum = t / this.beltIns.width;
                for (var i = cc.Vec2.UP.mul(this.rad), o = cc.Vec2.UP.mul(-this.rad), s = 0; s <= this.beltNum; s++) {
                    var r, c, l;
                    this.dir == a.RIGHT ? (r = n.default.VectorSlerp(i, o, this.centerOffset, -s * this.beltIns.width / t), c = o, l = i) : (r = n.default.VectorSlerp(i, o, this.centerOffset, s * this.beltIns.width / t), c = i, l = o);
                    var u = cc.instantiate(this.beltIns);
                    u.active = !0, u.parent = this.node, u.position = r;
                    var d = new(e("Belt"))();
                    d.Init(u, this.rad, l, c, this.centerOffset, this.dir, this.runDir, s * this.beltIns.width / t), this.beltNodeList[s] = d;
                }
                this.startRun();
            },
            startRun: function startRun() {
                this.isStart = !0;
                var e = this.beltNodeList.length;
                if (this.runDir == o.Clockwise)
                    if (this.dir == a.RIGHT)
                        for (var t = 0; t < e; t++) {
                            var i = this.beltNodeList[t].node,
                                n = (t >= e - 1 || t <= 0 ? this.beltNodeList[t].node : this.beltNodeList[t + 1].node).position.sub(i.position).normalize(),
                                s = 180;
                            t <= 0 && (s = 0), n.mag() > 0 && (s = this.getDegree(n)), i.angle = s;
                        } else
                            for (var r = e - 1; r >= 0; r--) {
                                i = this.beltNodeList[r].node, n = (r >= e - 1 || r <= 0 ? this.beltNodeList[r].node : this.beltNodeList[r - 1].node).position.sub(i.position).normalize(), s = 0;
                                r >= e - 1 && (s = 180), n.mag() > 0 && (s = this.getDegree(n)), i.angle = s;
                            }
            },
            getDegree: function getDegree(e) {
                var t = Math.atan(e.y / e.x) / Math.PI * 180;
                return e.x >= 0 ? e.y < 0 && (t += 360) : e.y > 0 ? t += 180 : t = 180 + t, t;
            },
            run: function run(e) {
                for (var t = this.beltNodeList.length, i = 0; i < t; i++) {
                    this.beltNodeList[i].UpdatePos(e);
                }
            },
            setBeltTexture: function setBeltTexture() {},
            UpdatePos: function UpdatePos(e) {
                this.isStart && this.run(e);
            }
        }), 
*/