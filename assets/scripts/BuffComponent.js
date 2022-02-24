

var a = cc.Class({
    extends: require("IComponent"),
    properties: {
        buffs: null
    },
    statics: {
        buffId: 0
    },
    Init: function Init(e) {
        this._super(e), this.parent = e, this.buffs = new Array();
    },
    AddBuff: function AddBuff(t, i, o) {
        var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1;
        if (null != (r = this.CheckBuffType(t))) r.UpdateTime(n.BuffDuaration);
        else {
            a.buffId++;
            var r = new(require("Buff"))(),
                c = n.BuffDuaration; - 1 != s && (c = s), r.Init(this, a.buffId, t, c, 1, o), this.buffs[a.buffId] = r;
        }
    },
    CheckState: function CheckState(e) {
        for (var t in this.buffs) {
            if (this.buffs.hasOwnProperty(t)) {
                var i = this.buffs[t];
                if (null != i && i.buffType == e) return !0;
            }
        }
        return !1;
    },
    OnHurt: function OnHurt(e, t) {
        for (var i in this.buffs) {
            if (this.buffs.hasOwnProperty(i)) {
                var n = this.buffs[i];
                null != n && n.OnHurt(e, t);
            }
        }
    },
    RemoveBuff: function RemoveBuff(e) {
        null != this.buffs[e] && (this.buffs[e].Dispose(), delete this.buffs[e]);
    },
    OnUpdate: function OnUpdate(e) {
        if (0 != this.enabled)
            for (var t in this._super(e), this.buffs) {
                if (this.buffs.hasOwnProperty(t)) {
                    var i = this.buffs[t];
                    null != i && i.OnUpdate(e);
                }
            }
    },
    CheckBuffType: function CheckBuffType(e) {
        for (var t in this.buffs) {
            if (this.buffs.hasOwnProperty(t)) {
                var i = this.buffs[t];
                if (null != i && i.buffType == e) return i;
            }
        }
        return null;
    },
    Dispose: function Dispose() {
        for (var e in this._super(), this.buffs) {
            if (this.buffs.hasOwnProperty(e)) {
                var t = this.buffs[e];
                null != t && t.Dispose(), delete this.buffs[e];
            }
        }
        this.buffs = null;
    }
})

/*BuffComponent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "332b6wuoqhJ+7YClEd4E3QA", "BuffComponent");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameConfig"));
        var a = cc.Class({
            extends: e("IComponent"),
            properties: {
                buffs: null
            },
            statics: {
                buffId: 0
            },
            Init: function Init(e) {
                this._super(e), this.parent = e, this.buffs = new Array();
            },
            AddBuff: function AddBuff(t, i, o) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1;
                if (null != (r = this.CheckBuffType(t))) r.UpdateTime(n.default.BuffDuaration);
                else {
                    a.buffId++;
                    var r = new(e("Buff"))(),
                        c = n.default.BuffDuaration; - 1 != s && (c = s), r.Init(this, a.buffId, t, c, 1, o), this.buffs[a.buffId] = r;
                }
            },
            CheckState: function CheckState(e) {
                for (var t in this.buffs) {
                    if (this.buffs.hasOwnProperty(t)) {
                        var i = this.buffs[t];
                        if (null != i && i.buffType == e) return !0;
                    }
                }
                return !1;
            },
            OnHurt: function OnHurt(e, t) {
                for (var i in this.buffs) {
                    if (this.buffs.hasOwnProperty(i)) {
                        var n = this.buffs[i];
                        null != n && n.OnHurt(e, t);
                    }
                }
            },
            RemoveBuff: function RemoveBuff(e) {
                null != this.buffs[e] && (this.buffs[e].Dispose(), delete this.buffs[e]);
            },
            OnUpdate: function OnUpdate(e) {
                if (0 != this.enabled)
                    for (var t in this._super(e), this.buffs) {
                        if (this.buffs.hasOwnProperty(t)) {
                            var i = this.buffs[t];
                            null != i && i.OnUpdate(e);
                        }
                    }
            },
            CheckBuffType: function CheckBuffType(e) {
                for (var t in this.buffs) {
                    if (this.buffs.hasOwnProperty(t)) {
                        var i = this.buffs[t];
                        if (null != i && i.buffType == e) return i;
                    }
                }
                return null;
            },
            Dispose: function Dispose() {
                for (var e in this._super(), this.buffs) {
                    if (this.buffs.hasOwnProperty(e)) {
                        var t = this.buffs[e];
                        null != t && t.Dispose(), delete this.buffs[e];
                    }
                }
                this.buffs = null;
            }
        });
        
*/