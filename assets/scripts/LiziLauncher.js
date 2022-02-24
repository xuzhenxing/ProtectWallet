var n = require("util");
cc.Class({
    extends: cc.Component,
    properties: {
        RecycleTime: {
            default: 1,
            displayName: "\u56DE\u6536\u65F6\u95F4"
        },
        LifeTime: {
            default: 1,
            displayName: "\u53D1\u5C04\u6301\u7EED\u65F6\u95F4"
        },
        LiziCreateTime: {
            default: cc.Vec2.ONE,
            displayName: "\u9694\u591A\u4E45\u521B\u5EFA\u4E00\u6B21"
        },
        LiziCreateNum: {
            default: cc.Vec2.ONE,
            displayName: "\u6BCF\u6B21\u521B\u5EFA\u6570\u91CF"
        },
        Lizi: cc.Prefab,
        _LiziBoxNodePool: null
    },
    onLoad: function onLoad() {
        this._LiziBoxNodePool = new Array();
    },
    Fire: function Fire(e) {
        this._LifeTime = 0, this._LiziCreateTime = n.getRandom(100 * this.LiziCreateTime.x, 100 * this.LiziCreateTime.y) / 100, this._LiziCreateTimer = 0, this._spriteFrame = e;
    },
    update: function update(e) {
        if (this._LifeTime += e, this._LifeTime > this.RecycleTime) gm.MapLogic.LiziLauncherRecycle(this);
        else if (this._LifeTime > this.LifeTime);
        else if (this._LiziCreateTimer += e, this._LiziCreateTimer > this._LiziCreateTime) {
            this._LiziCreateTimer = 0, this._LiziCreateTime = n.getRandom(100 * this.LiziCreateTime.x, 100 * this.LiziCreateTime.y) / 100;
            for (var t = n.getRandom(this.LiziCreateNum.x, this.LiziCreateTime.y), i = 0; i < t; i++) {
                var a = this.LiziGet();
                a.node.x = 0, a.node.y = 0, a.Fire(this, this._spriteFrame);
            }
        }
    },
    LiziRecycle: function LiziRecycle(e) {
        this.UnActiveNode(e.node), this._LiziBoxNodePool.push(e);
    },
    LiziGet: function LiziGet() {
        var e = this._LiziBoxNodePool.shift();
        if (null == e) {
            var t = cc.instantiate(this.Lizi);
            return t.name = "Lizi", t.parent = this.node, e = t.getComponent("Lizi"), this.LiziRecycle(e), this.LiziGet();
        }
        return this.ActiveNode(e.node), e;
    },
    ActiveNode: function ActiveNode(e) {
        0 == e.active && (e.active = !0);
    },
    UnActiveNode: function UnActiveNode(e) {
        1 == e.active && (e.active = !1);
    }
})

/*LiziLauncher: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7296aRWwsBK9ImqHcNR46E0", "LiziLauncher");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                RecycleTime: {
                    default: 1,
                    displayName: "\u56DE\u6536\u65F6\u95F4"
                },
                LifeTime: {
                    default: 1,
                    displayName: "\u53D1\u5C04\u6301\u7EED\u65F6\u95F4"
                },
                LiziCreateTime: {
                    default: cc.Vec2.ONE,
                    displayName: "\u9694\u591A\u4E45\u521B\u5EFA\u4E00\u6B21"
                },
                LiziCreateNum: {
                    default: cc.Vec2.ONE,
                    displayName: "\u6BCF\u6B21\u521B\u5EFA\u6570\u91CF"
                },
                Lizi: cc.Prefab,
                _LiziBoxNodePool: null
            },
            onLoad: function onLoad() {
                this._LiziBoxNodePool = new Array();
            },
            Fire: function Fire(e) {
                this._LifeTime = 0, this._LiziCreateTime = n.default.getRandom(100 * this.LiziCreateTime.x, 100 * this.LiziCreateTime.y) / 100, this._LiziCreateTimer = 0, this._spriteFrame = e;
            },
            update: function update(e) {
                if (this._LifeTime += e, this._LifeTime > this.RecycleTime) gm.MapLogic.LiziLauncherRecycle(this);
                else if (this._LifeTime > this.LifeTime);
                else if (this._LiziCreateTimer += e, this._LiziCreateTimer > this._LiziCreateTime) {
                    this._LiziCreateTimer = 0, this._LiziCreateTime = n.default.getRandom(100 * this.LiziCreateTime.x, 100 * this.LiziCreateTime.y) / 100;
                    for (var t = n.default.getRandom(this.LiziCreateNum.x, this.LiziCreateTime.y), i = 0; i < t; i++) {
                        var a = this.LiziGet();
                        a.node.x = 0, a.node.y = 0, a.Fire(this, this._spriteFrame);
                    }
                }
            },
            LiziRecycle: function LiziRecycle(e) {
                this.UnActiveNode(e.node), this._LiziBoxNodePool.push(e);
            },
            LiziGet: function LiziGet() {
                var e = this._LiziBoxNodePool.shift();
                if (null == e) {
                    var t = cc.instantiate(this.Lizi);
                    return t.name = "Lizi", t.parent = this.node, e = t.getComponent("Lizi"), this.LiziRecycle(e), this.LiziGet();
                }
                return this.ActiveNode(e.node), e;
            },
            ActiveNode: function ActiveNode(e) {
                0 == e.active && (e.active = !0);
            },
            UnActiveNode: function UnActiveNode(e) {
                1 == e.active && (e.active = !1);
            }
        }), 
*/