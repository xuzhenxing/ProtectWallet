

require("util");
var n = require("ConstModName"),
a = require("UIInfo"),
o = require("GameDefine");
require("GameConfig");
var r = ["gem", "treasure"],
            c = ["Monster/iceEffects", "Monster/Glow", "Monster/Hit", "Monster/Hit0", "Monster/Hit1", "Monster/Hit2", "Monster/Hit3", "Monster/Hit4", "Monster/jg", "shandiancanliu", "FruitKing/AbsorptionOfInjury", "FruitKing/Invincible", "FruitKing/Treatment", "FruitKing/Call_Boss", "FruitKing/Call_Monster", "FruitKing/lift", "TargetEffect", "Diamond", "Monster/bbb", "Trai", "Monster/upstar", "Monster/nengliang", "DiamondTip", "PowerUp", "suipian01", "suipian02", "suipian03", "suipian04", "suipian05", "suipian06", "suipian07"],
            l = ["monster"],
            u = ["Ball", "SceneTool", "monster/Monster_2001", "monster/Monster_2002", "monster/Monster_2003", "monster/Monster_2004", "monster/Monster_2005", "monster/Monster_2006", "monster/Monster_2007", "monster/Monster_2101", "monster/Monster_2102", "monster/Monster_2103", "monster/Monster_2104", "monster/Monster_2105"],
            d = ["audio/Boom", "audio/Hit", "audio/Laser", "audio/Star", "audio/Win", "audio/Wind", "audio/EnemyDie"],
            h = ["ui/Battle", "ui/NewGuide", "ui/GameOver"];
        cc.Class({
            extends: require("IUpdateAttachIDispose"),
            properties: {
                loadTotal: 0,
                curLoadCount: 0,
                loadProgress: 0,
                isStart: !1
            },
            Start: function Start() {
                this.isStart = !0, this.curLoadCount = 0, this.loadTotal = r.length + c.length + l.length + u.length + h.length + d.length, gm.UIManager.SendNotification(n.MOD_GameLoading, a.UIInfo_ShowView, null), gm.GameApp.scheduleOnce(this.LoadHandle.bind(this), .1);
            },
            OnLoadFinish: function OnLoadFinish() {
                gm.SceneManager.OnPreloadComplete();
            },
            SetProgress: function SetProgress(e) {
                gm.UIManager.SendNotification(n.MOD_GameLoading, a.UIInfo_SetProgress, e), e >= 1 && this.OnLoadFinish();
            },
            SetTips: function SetTips(e) {},
            LoadHandle: function LoadHandle() {
                var e = this;
                d.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = t.replace(/\//g, "#"), gm.CacheManager.CacheResource(o.CacheType.Audio, n);
                    });
                }), r.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("config/" + t, function (i) {
                        e.curLoadCount += 1, gm.GameData.ParseData(t, i);
                    });
                }), c.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("effect/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        if (n.name = "effect#" + t.replace(/\//g, "#"), "suipian" == t || "Trai" == t || "DiamondTip" == t) {
                            var a = 10;
                            "Trai" == t && (a = 15);
                            for (var s = 0; s < a; s++) {
                                gm.CacheManager.CacheResource(o.CacheType.BattleEffect, n), (n = cc.instantiate(i)).name = "effect#" + t.replace(/\//g, "#");
                            }
                        } else gm.CacheManager.CacheResource(o.CacheType.BattleEffect, n);
                    });
                }), l.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("atlas/" + t, function (t) {
                        e.curLoadCount += 1;
                    }, cc.SpriteAtlas);
                }), u.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("model/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = "model#" + t.replace(/\//g, "#"), gm.CacheManager.CacheResource(o.CacheType.Model, n);
                    });
                }), h.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = t.name, gm.CacheManager.CacheResource(o.CacheType.UI, i);
                    });
                });
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.isStart && (this.progress = this.curLoadCount / this.loadTotal, this.SetProgress(this.progress));
            },
            Dispose: function Dispose() {}
        })
/*GameAssetPreload: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "4b0d0WJI0VGsqrf27G+I24p", "GameAssetPreload");
        s(e("util"));
        var n = s(e("ConstModName")),
            a = s(e("UIInfo")),
            o = s(e("GameDefine"));
        s(e("GameConfig"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = ["gem", "treasure"],
            c = ["Monster/iceEffects", "Monster/Glow", "Monster/Hit", "Monster/Hit0", "Monster/Hit1", "Monster/Hit2", "Monster/Hit3", "Monster/Hit4", "Monster/jg", "shandiancanliu", "FruitKing/AbsorptionOfInjury", "FruitKing/Invincible", "FruitKing/Treatment", "FruitKing/Call_Boss", "FruitKing/Call_Monster", "FruitKing/lift", "TargetEffect", "Diamond", "Monster/bbb", "Trai", "Monster/upstar", "Monster/nengliang", "DiamondTip", "PowerUp", "suipian01", "suipian02", "suipian03", "suipian04", "suipian05", "suipian06", "suipian07"],
            l = ["monster"],
            u = ["Ball", "SceneTool", "monster/Monster_2001", "monster/Monster_2002", "monster/Monster_2003", "monster/Monster_2004", "monster/Monster_2005", "monster/Monster_2006", "monster/Monster_2007", "monster/Monster_2101", "monster/Monster_2102", "monster/Monster_2103", "monster/Monster_2104", "monster/Monster_2105"],
            d = ["audio/Boom", "audio/Hit", "audio/Laser", "audio/Star", "audio/Win", "audio/Wind", "audio/EnemyDie"],
            h = ["ui/Battle", "ui/NewGuide", "ui/GameOver"];
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                loadTotal: 0,
                curLoadCount: 0,
                loadProgress: 0,
                isStart: !1
            },
            Start: function Start() {
                this.isStart = !0, this.curLoadCount = 0, this.loadTotal = r.length + c.length + l.length + u.length + h.length + d.length, gm.UIManager.SendNotification(n.default.MOD_GameLoading, a.default.UIInfo_ShowView, null), gm.GameApp.scheduleOnce(this.LoadHandle.bind(this), .1);
            },
            OnLoadFinish: function OnLoadFinish() {
                gm.SceneManager.OnPreloadComplete();
            },
            SetProgress: function SetProgress(e) {
                gm.UIManager.SendNotification(n.default.MOD_GameLoading, a.default.UIInfo_SetProgress, e), e >= 1 && this.OnLoadFinish();
            },
            SetTips: function SetTips(e) {},
            LoadHandle: function LoadHandle() {
                var e = this;
                d.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = t.replace(/\//g, "#"), gm.CacheManager.CacheResource(o.default.CacheType.Audio, n);
                    });
                }), r.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("config/" + t, function (i) {
                        e.curLoadCount += 1, gm.GameData.ParseData(t, i);
                    });
                }), c.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("effect/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        if (n.name = "effect#" + t.replace(/\//g, "#"), "suipian" == t || "Trai" == t || "DiamondTip" == t) {
                            var a = 10;
                            "Trai" == t && (a = 15);
                            for (var s = 0; s < a; s++) {
                                gm.CacheManager.CacheResource(o.default.CacheType.BattleEffect, n), (n = cc.instantiate(i)).name = "effect#" + t.replace(/\//g, "#");
                            }
                        } else gm.CacheManager.CacheResource(o.default.CacheType.BattleEffect, n);
                    });
                }), l.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("atlas/" + t, function (t) {
                        e.curLoadCount += 1;
                    }, cc.SpriteAtlas);
                }), u.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("model/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = "model#" + t.replace(/\//g, "#"), gm.CacheManager.CacheResource(o.default.CacheType.Model, n);
                    });
                }), h.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = t.name, gm.CacheManager.CacheResource(o.default.CacheType.UI, i);
                    });
                });
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.isStart && (this.progress = this.curLoadCount / this.loadTotal, this.SetProgress(this.progress));
            },
            Dispose: function Dispose() {}
        }), 
*/