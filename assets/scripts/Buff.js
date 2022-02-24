

cc.Class({
    extends: require("IUpdateAttachIDispose"),
    properties: {
        buffType: null,
        effect: 1,
        duration: 0,
        lastTime: 0,
        buffId: 0,
        intervalTime: 0,
        buffCom: null,
        cacheParent: null,
        level: 0,
        skill: null
    },
    Init: function Init(e, t, i, n, a) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
        this.buffId = t, this.buffType = i, this.duration = n, this.buffCom = e, this.cacheParent = e.parent, this.level = a, this.skill = o, this.LoadEffect(), this.PropertyTrigger();
    },
    UpdateTime: function UpdateTime(e) {
        this.lastTime = 0, this.duration = e;
    },
    LoadEffect: function LoadEffect() {
        if (null != this.GetEffectPath()) {
            var e = {};
            e.parent = this.cacheParent.cacheNode, this.effect = gm.EffectManager.PlayEffect(this.GetEffectPath(), -1, cc.Vec2.ZERO, 0, 1, e);
        }
    },
    PropertyTrigger: function PropertyTrigger() {
        this.buffType == n.BuffType.AddHurt && (this.cacheParent.cacheNode.scale = 1);
    },
    RevertProperty: function RevertProperty() {
        this.buffType == n.BuffType.AddHurt && (this.cacheParent.cacheNode.scale = 1);
    },
    OnUpdate: function OnUpdate(e) {
        this.lastTime += e, -1 != this.duration && this.lastTime >= this.duration && this.buffCom.RemoveBuff(this.buffId);
    },
    OnHurt: function OnHurt(e, t) {
        if (this.buffType == n.BuffType.AbsorbHurtToHp) {
            var i = {};
            i.parent = e.cacheNode, gm.EffectManager.PlayEffect("effect/FruitKing/lift", 2, cc.Vec2.ZERO, 0, 1, i), e.ChangeHp(0, .5 * t);
        }
    },
    GetEffectPath: function GetEffectPath() {
        return this.buffType == n.BuffType.AddHurt ? "effect/Trai" : this.buffType == n.BuffType.Invincible ? "effect/FruitKing/Invincible" : this.buffType == n.BuffType.AbsorbHurtToHp ? "effect/FruitKing/AbsorptionOfInjury" : null;
    },
    Dispose: function Dispose() {
        this._super(), this.RevertProperty(), this.effect.Dispose(), this.buffCom = null, this.effect = null;
    }
})


/*Buff: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a9088VHKjBESY6JcGV8B1wg", "Buff");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameConfig"));
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                buffType: null,
                effect: null,
                duration: 0,
                lastTime: 0,
                buffId: 0,
                intervalTime: 0,
                buffCom: null,
                cacheParent: null,
                level: 0,
                skill: null
            },
            Init: function Init(e, t, i, n, a) {
                var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
                this.buffId = t, this.buffType = i, this.duration = n, this.buffCom = e, this.cacheParent = e.parent, this.level = a, this.skill = o, this.LoadEffect(), this.PropertyTrigger();
            },
            UpdateTime: function UpdateTime(e) {
                this.lastTime = 0, this.duration = e;
            },
            LoadEffect: function LoadEffect() {
                if (null != this.GetEffectPath()) {
                    var e = {};
                    e.parent = this.cacheParent.cacheNode, this.effect = gm.EffectManager.PlayEffect(this.GetEffectPath(), -1, cc.Vec2.ZERO, 0, 1, e);
                }
            },
            PropertyTrigger: function PropertyTrigger() {
                this.buffType == n.default.BuffType.AddHurt && (this.cacheParent.cacheNode.scale = 1);
            },
            RevertProperty: function RevertProperty() {
                this.buffType == n.default.BuffType.AddHurt && (this.cacheParent.cacheNode.scale = 1);
            },
            OnUpdate: function OnUpdate(e) {
                this.lastTime += e, -1 != this.duration && this.lastTime >= this.duration && this.buffCom.RemoveBuff(this.buffId);
            },
            OnHurt: function OnHurt(e, t) {
                if (this.buffType == n.default.BuffType.AbsorbHurtToHp) {
                    var i = {};
                    i.parent = e.cacheNode, gm.EffectManager.PlayEffect("effect/FruitKing/lift", 2, cc.Vec2.ZERO, 0, 1, i), e.ChangeHp(0, .5 * t);
                }
            },
            GetEffectPath: function GetEffectPath() {
                return this.buffType == n.default.BuffType.AddHurt ? "effect/Trai" : this.buffType == n.default.BuffType.Invincible ? "effect/FruitKing/Invincible" : this.buffType == n.default.BuffType.AbsorbHurtToHp ? "effect/FruitKing/AbsorptionOfInjury" : null;
            },
            Dispose: function Dispose() {
                this._super(), this.RevertProperty(), this.effect.Dispose(), this.buffCom = null, this.effect = null;
            }
        }), 
*/