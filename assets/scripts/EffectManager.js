

var n = cc.Class({
    extends: require("IComponent"),
    statics: {
        effectId: 0
    },
    properties: {
        effectList: null
    },
    Init: function Init(e) {
        this._super(e), this.effectList = new Array();
    },
    OnUpdate: function OnUpdate(e) {
        if (this.enabled)
            for (var t in this.effectList) {
                if (this.effectList.hasOwnProperty(t)) this.effectList[t].OnUpdate(e);
            }
    },
    PlayEffect: function PlayEffect(t, i, a, o, s, r) {
        var c = new(e("EffectHandle"))();
        return n.effectId++, c.effectId = n.effectId, c.Init(t, i, a, o, s, r), this.effectList[c.effectId] = c, c;
    },
    RemoveEffect: function RemoveEffect(e) {
        e.Dispose(), delete this.effectList[e.effectId];
    },
    ClearAllEffect: function ClearAllEffect() {
        for (var e in this.effectList) {
            if (this.effectList.hasOwnProperty(e)) this.effectList[e].Dispose();
        }
        this.effectList = new Array();
    },
    Dispose: function Dispose() {
        this._super();
    }
})


/*EffectManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "ac4c8Z7cjZMaLvhoUMa/8Fl", "EffectManager");
        var n = cc.Class({
            extends: e("IComponent"),
            statics: {
                effectId: 0
            },
            properties: {
                effectList: null
            },
            Init: function Init(e) {
                this._super(e), this.effectList = new Array();
            },
            OnUpdate: function OnUpdate(e) {
                if (this.enabled)
                    for (var t in this.effectList) {
                        if (this.effectList.hasOwnProperty(t)) this.effectList[t].OnUpdate(e);
                    }
            },
            PlayEffect: function PlayEffect(t, i, a, o, s, r) {
                var c = new(e("EffectHandle"))();
                return n.effectId++, c.effectId = n.effectId, c.Init(t, i, a, o, s, r), this.effectList[c.effectId] = c, c;
            },
            RemoveEffect: function RemoveEffect(e) {
                e.Dispose(), delete this.effectList[e.effectId];
            },
            ClearAllEffect: function ClearAllEffect() {
                for (var e in this.effectList) {
                    if (this.effectList.hasOwnProperty(e)) this.effectList[e].Dispose();
                }
                this.effectList = new Array();
            },
            Dispose: function Dispose() {
                this._super();
            }
        });
        
*/