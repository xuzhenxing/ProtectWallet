var n = require("GameDefine")
 cc.Class({
    extends: require("IUpdateAttachIDispose"),
    properties: {
        effectNode: null,
        model: null,
        effectName: null,
        lastTime: 0,
        callBack: null,
        timeCallback: null,
        time: 0,
        startPlayTime: 0,
        parent: null,
        relationNode: null,
        isFront: null,
        isTimeCallback: !1,
        particleSystems: null,
        animations: null,
        isDispose: !1,
        effectId: 0,
        position: null,
        scale: 0,
        rotation: 0,
        color: null,
        labelCount: 0
    },
    Init: function Init(e, t, i, n, a, o) {
        this.effectName = e, this.lastTime = t, this.position = i, this.startPlayTime = 0, this.angle = n, this.scale = a, null != o && (this.parent = o.parent, this.relationNode = o.relationNode, this.isFront = o.isFront, this.time = o.time, this.callBack = o.callBack, this.timeCallback = o.timeCallback, this.color = o.color, this.labelCount = o.labelCount);
        var s = this.ConvertEffectName(e);
        if (this.effectNode = new cc.Node(s), null == this.parent && (this.parent = cc.director.getScene()), null != this.parent && (this.effectNode.parent = this.parent, this.effectNode.position = this.position), null != this.relationNode) {
            this.effectNode.parent = this.relationNode.parent, this.effectNode.position = this.relationNode.position;
            var r = this.relationNode.zIndex;
            this.isFront ? this.effectNode.zIndex = r + 1 : this.effectNode.zIndex = r - 1;
        }
        this.effectNode.scale = this.scale, this.effectNode.angle = this.angle, this.LoadEffect();
    },
    OnUpdate: function OnUpdate(e) {
        this.startPlayTime += e, this.lastTime > 0 && this.startPlayTime >= this.lastTime && (null != this.callBack && this.callBack(), gm.EffectManager.RemoveEffect(this)), null != this.timeCallback && this.startPlayTime >= this.time && 0 == this.isTimeCallback && (this.isTimeCallback = !0, this.timeCallback());
    },
    LoadEffect: function LoadEffect() {
        var e = this.effectNode.name,
            t = gm.CacheManager.GetCacheResource(n.CacheType.BattleEffect, e);
        if (null == t) {
            var i = this;
            gm.AssetManager.LoadSingleAssetAsync(this.effectName, function (t) {
                cc.log("\u52A0\u8F7D\u5B8C\u6210\uFF1A" + i.effectName);
                var a = cc.instantiate(t);
                a.name = e, i.isDispose ? gm.CacheManager.CacheResource(n.CacheType.BattleEffect, a) : i.LoadComplete(a);
            });
        } else this.LoadComplete(t);
    },
    LoadComplete: function LoadComplete(e) {
        var t = this;
        if (this.model = e, cc.isValid(this.effectNode)) {
            if (null != this.color) this.model.children.forEach(function (e) {
                e.color = t.color;
            });
            this.model.parent = this.effectNode, this.model.angle = 0, this.model.position = cc.Vec2.ZERO, this.model.scale = 1, this.particleSystems = this.model.getComponentsInChildren(cc.ParticleSystem), this.animations = this.model.getComponentsInChildren(cc.Animation), this.label = this.model.getComponent(cc.Label), null != this.label && null != this.labelCount && (this.label.string = "$" + this.labelCount);
            var i = 0;
            i = this.animations.length;
            for (var n = 0; n < i; n++) {
                this.animations[n].play();
            }
            i = this.particleSystems.length;
            for (n = 0; n < i; n++) {
                this.particleSystems[n].resetSystem();
            }
        } else gm.EffectManager.RemoveEffect(this);
    },
    Dispose: function Dispose() {
        this.isDispose || (cc.isValid(this.model) && gm.CacheManager.CacheResource(n.CacheType.BattleEffect, this.model), this.callBack = null, this.timeCallback = null, this.callBack = null, cc.isValid(this.effectNode) && (this.effectNode.destroy(), this.effectNode = null), this.model = null, this.parent = null, this.relationNode = null, this.particleSystems = null, this.animations = null, this.isDispose = !0);
    },
    ConvertEffectName: function ConvertEffectName(e) {
        return e.replace(/\//g, "#");
    }
})

/*EffectHandle: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "282fd6DgWVMaJH1WgFpAoQ7", "EffectHandle");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("GameDefine"));
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                effectNode: null,
                model: null,
                effectName: null,
                lastTime: 0,
                callBack: null,
                timeCallback: null,
                time: 0,
                startPlayTime: 0,
                parent: null,
                relationNode: null,
                isFront: null,
                isTimeCallback: !1,
                particleSystems: null,
                animations: null,
                isDispose: !1,
                effectId: 0,
                position: null,
                scale: 0,
                rotation: 0,
                color: null,
                labelCount: 0
            },
            Init: function Init(e, t, i, n, a, o) {
                this.effectName = e, this.lastTime = t, this.position = i, this.startPlayTime = 0, this.angle = n, this.scale = a, null != o && (this.parent = o.parent, this.relationNode = o.relationNode, this.isFront = o.isFront, this.time = o.time, this.callBack = o.callBack, this.timeCallback = o.timeCallback, this.color = o.color, this.labelCount = o.labelCount);
                var s = this.ConvertEffectName(e);
                if (this.effectNode = new cc.Node(s), null == this.parent && (this.parent = cc.director.getScene()), null != this.parent && (this.effectNode.parent = this.parent, this.effectNode.position = this.position), null != this.relationNode) {
                    this.effectNode.parent = this.relationNode.parent, this.effectNode.position = this.relationNode.position;
                    var r = this.relationNode.zIndex;
                    this.isFront ? this.effectNode.zIndex = r + 1 : this.effectNode.zIndex = r - 1;
                }
                this.effectNode.scale = this.scale, this.effectNode.angle = this.angle, this.LoadEffect();
            },
            OnUpdate: function OnUpdate(e) {
                this.startPlayTime += e, this.lastTime > 0 && this.startPlayTime >= this.lastTime && (null != this.callBack && this.callBack(), gm.EffectManager.RemoveEffect(this)), null != this.timeCallback && this.startPlayTime >= this.time && 0 == this.isTimeCallback && (this.isTimeCallback = !0, this.timeCallback());
            },
            LoadEffect: function LoadEffect() {
                var e = this.effectNode.name,
                    t = gm.CacheManager.GetCacheResource(n.default.CacheType.BattleEffect, e);
                if (null == t) {
                    var i = this;
                    gm.AssetManager.LoadSingleAssetAsync(this.effectName, function (t) {
                        cc.log("\u52A0\u8F7D\u5B8C\u6210\uFF1A" + i.effectName);
                        var a = cc.instantiate(t);
                        a.name = e, i.isDispose ? gm.CacheManager.CacheResource(n.default.CacheType.BattleEffect, a) : i.LoadComplete(a);
                    });
                } else this.LoadComplete(t);
            },
            LoadComplete: function LoadComplete(e) {
                var t = this;
                if (this.model = e, cc.isValid(this.effectNode)) {
                    if (null != this.color) this.model.children.forEach(function (e) {
                        e.color = t.color;
                    });
                    this.model.parent = this.effectNode, this.model.angle = 0, this.model.position = cc.Vec2.ZERO, this.model.scale = 1, this.particleSystems = this.model.getComponentsInChildren(cc.ParticleSystem), this.animations = this.model.getComponentsInChildren(cc.Animation), this.label = this.model.getComponent(cc.Label), null != this.label && null != this.labelCount && (this.label.string = "$" + this.labelCount);
                    var i = 0;
                    i = this.animations.length;
                    for (var n = 0; n < i; n++) {
                        this.animations[n].play();
                    }
                    i = this.particleSystems.length;
                    for (n = 0; n < i; n++) {
                        this.particleSystems[n].resetSystem();
                    }
                } else gm.EffectManager.RemoveEffect(this);
            },
            Dispose: function Dispose() {
                this.isDispose || (cc.isValid(this.model) && gm.CacheManager.CacheResource(n.default.CacheType.BattleEffect, this.model), this.callBack = null, this.timeCallback = null, this.callBack = null, cc.isValid(this.effectNode) && (this.effectNode.destroy(), this.effectNode = null), this.model = null, this.parent = null, this.relationNode = null, this.particleSystems = null, this.animations = null, this.isDispose = !0);
            },
            ConvertEffectName: function ConvertEffectName(e) {
                return e.replace(/\//g, "#");
            }
        }), 
*/