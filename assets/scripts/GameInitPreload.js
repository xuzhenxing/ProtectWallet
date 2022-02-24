

var n = require("util"),
a = require("ConstModName"),
o = require("UIInfo"),
s = require("GameDefine"),
r = require("GameConfig");
var l = ["ActionConfig", "GameLevelConfig", "LevelActionConfig", "BubbleConfig", "PropsConfig"],
            u = ["Texture"],
            d = [],
            h = [],
            f = [],
            p = [],
            g = ["audios/audio_bgm", "audios/audio_clickBtn", "audios/audio_right", "audios/audio_win", "audios/audio_wrong"],
            m = [];
        cc.Class({
            extends: require("IUpdateAttachIDispose"),
            properties: {
                loadTotal: 0,
                curLoadCount: 0,
                loadProgress: 0,
                isStart: !1,
                subPacketsCount: 0,
                loadSubPacketNum: 0,
                curLoadNum: 0,
                visualTotal: 3e3,
                visualCur: 0
            },
            Start: function Start() {
                gm.AdManager.dataRecode(r.DATA_StartLoad), this.isStart = !0, this.progress = 0, this.curLoadCount = 0, null == gm.wx  || (this.subPacketsCount = u.length), this.loadTotal = l.length + d.length + g.length + m.length + h.length + p.length + f.length + this.subPacketsCount, gm.UIManager.SendNotification(a.MOD_GameLoading, o.UIInfo_ShowView, null), null == gm.wx  ? this.LoadHandle() : this.LoadSubPackets(u[0]);
            },
            LoadSubPackets: function LoadSubPackets(e) {
                if (cc.log("\u52A0\u8F7D\u5206\u5305\u554A\u554A" + this.subPacketsCount),console.log("加载资源列表",this.subPacketsCount), 0 != this.subPacketsCount) {
                    console.log("加载资源")
                    var t = gm.wx || gm.qq || gm.swan;
                    cc.log("\u52A0\u8F7DloadLib\u6210\u529F\u3002\u3002\u3002 " + t);
                    t.loadSubpackage({
                        name: e,
                        success: function (e) {
                            console.log("\u52A0\u8F7D\u6210\u529F\u3002\u3002\u3002"), this.loadSubPacketNum += 1, this.curLoadCount += 1, this.loadSubPacketNum >= this.subPacketsCount ? this.LoadHandle() : this.LoadSubPackets(u[this.loadSubPacketNum]);
                            // console.log(this.loadSubPacketNum,"this.loadSubPacketNum加载成功");
                        }.bind(this),
                        fail: function fail(e) {
                            // console.log("\u52A0\u8F7D\u5931\u8D25\u3002\u3002\u3002" + e);
                            console.log("加载失败",e)
                        }
                    });
                } else this.LoadHandle();
            },
            OnLoadFinish: function OnLoadFinish() {
                gm.AdManager.dataRecode(r.DATA_LoadComplete), gm.SceneManager.OnPreloadComplete();
            },
            SetProgress: function SetProgress(e) {
                var t = e;
                e >= 1 && this.curLoadCount < this.loadTotal ? t = .98 : this.curLoadCount >= this.loadTotal && (t = 1), gm.UIManager.SendNotification(a.MOD_GameLoading, o.UIInfo_SetProgress, t),  this.curLoadCount >= this.loadTotal && this.OnLoadFinish();
            },
            SetTips: function SetTips(e) {},
            LoadHandle: function LoadHandle() {
                var e = this;
                l.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("Config/" + t, function (i) {
                        e.curLoadCount += 1, gm.GameData.ParseData(t, i.json);
                    });
                    console.log("Config加载成功",t);
                }), d.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("effect/" + t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = "effect#" + t.name, gm.CacheManager.CacheResource(s.CacheType.BattleEffect, i);
                    });
                    console.log("effect  加载成功",t)
                }), h.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("atlas/" + t, function (i) {
                        e.curLoadCount += 1, "tool" == t && (r.ToolAltas = i), "ash" == t && (r.AshAltas = i), "treasure" == t && (r.TreasureAltas = i);
                    }, cc.SpriteAtlas);
                    console.log("atlas  加载成功",t);
                }), f.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("spines/" + t, function (i) {
                        e.curLoadCount += 1, gm.AssetManager.AddTexture(t, i);
                    }, cc.SpriteFrame);
                }), p.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("model/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = "model#" + t, gm.CacheManager.CacheResource(s.CacheType.Model, n);
                    });
                    console.log("model  加载成功",t)
                }), g.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        // debugger
                        n.name = t.replace(/\//g, "#"), console.log("\u52A0\u8F7D\u97F3\u6548" + t), gm.CacheManager.CacheResource(s.CacheType.Audio, n);
                    });
                }), m.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = t.name, gm.CacheManager.CacheResource(s.CacheType.UI, i);
                    });
                });
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.isStart && (this.visualCur += n.getRandom(8, 20), this.progress = this.visualCur / this.visualTotal, this.progress > 1 && (this.progress = 1), this.SetProgress(this.progress));
            },
            Dispose: function Dispose() {}
        })
/*GameInitPreload: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "cd329z/K01H8LiprBn29mV7", "GameInitPreload");
        var n = c(e("util")),
            a = c(e("ConstModName")),
            o = c(e("UIInfo")),
            s = c(e("GameDefine")),
            r = c(e("GameConfig"));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var l = ["ActionConfig", "GameLevelConfig", "LevelActionConfig", "BubbleConfig", "PropsConfig"],
            u = ["Texture"],
            d = [],
            h = [],
            f = [],
            p = [],
            g = ["audios/audio_bgm", "audios/audio_clickBtn", "audios/audio_right", "audios/audio_win", "audios/audio_wrong"],
            m = [];
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                loadTotal: 0,
                curLoadCount: 0,
                loadProgress: 0,
                isStart: !1,
                subPacketsCount: 0,
                loadSubPacketNum: 0,
                curLoadNum: 0,
                visualTotal: 3e3,
                visualCur: 0
            },
            Start: function Start() {
                gm.AdManager.dataRecode(r.default.DATA_StartLoad), this.isStart = !0, this.progress = 0, this.curLoadCount = 0, null == gm.wx && null == gm.qq && null == gm.swan || (this.subPacketsCount = u.length), this.loadTotal = l.length + d.length + g.length + m.length + h.length + p.length + f.length + this.subPacketsCount, gm.UIManager.SendNotification(a.default.MOD_GameLoading, o.default.UIInfo_ShowView, null), null == gm.wx && null == gm.qq && null == gm.swan ? this.LoadHandle() : this.LoadSubPackets(u[0]);
            },
            LoadSubPackets: function LoadSubPackets(e) {
                if (cc.log("\u52A0\u8F7D\u5206\u5305\u554A\u554A" + this.subPacketsCount), 0 != this.subPacketsCount) {
                    var t = gm.wx || gm.qq || gm.swan;
                    cc.log("\u52A0\u8F7DloadLib\u6210\u529F\u3002\u3002\u3002 " + t);
                    t.loadSubpackage({
                        name: e,
                        success: function (e) {
                            console.log("\u52A0\u8F7D\u6210\u529F\u3002\u3002\u3002"), this.loadSubPacketNum += 1, this.curLoadCount += 1, this.loadSubPacketNum >= this.subPacketsCount ? this.LoadHandle() : this.LoadSubPackets(u[this.loadSubPacketNum]);
                        }.bind(this),
                        fail: function fail(e) {
                            console.log("\u52A0\u8F7D\u5931\u8D25\u3002\u3002\u3002" + e);
                        }
                    });
                } else this.LoadHandle();
            },
            OnLoadFinish: function OnLoadFinish() {
                gm.AdManager.dataRecode(r.default.DATA_LoadComplete), gm.SceneManager.OnPreloadComplete();
            },
            SetProgress: function SetProgress(e) {
                var t = e;
                e >= 1 && this.curLoadCount < this.loadTotal ? t = .98 : this.curLoadCount >= this.loadTotal && (t = 1), gm.UIManager.SendNotification(a.default.MOD_GameLoading, o.default.UIInfo_SetProgress, t), this.curLoadCount >= this.loadTotal && this.OnLoadFinish();
            },
            SetTips: function SetTips(e) {},
            LoadHandle: function LoadHandle() {
                var e = this;
                l.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("Config/" + t, function (i) {
                        e.curLoadCount += 1, gm.GameData.ParseData(t, i.json);
                    });
                }), d.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("effect/" + t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = "effect#" + t.name, gm.CacheManager.CacheResource(s.default.CacheType.BattleEffect, i);
                    });
                }), h.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("atlas/" + t, function (i) {
                        e.curLoadCount += 1, "tool" == t && (r.default.ToolAltas = i), "ash" == t && (r.default.AshAltas = i), "treasure" == t && (r.default.TreasureAltas = i);
                    }, cc.SpriteAtlas);
                }), f.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("spines/" + t, function (i) {
                        e.curLoadCount += 1, gm.AssetManager.AddTexture(t, i);
                    }, cc.SpriteFrame);
                }), p.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync("model/" + t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = "model#" + t, gm.CacheManager.CacheResource(s.default.CacheType.Model, n);
                    });
                }), g.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (i) {
                        e.curLoadCount += 1;
                        var n = cc.instantiate(i);
                        n.name = t.replace(/\//g, "#"), console.log("\u52A0\u8F7D\u97F3\u6548" + t), gm.CacheManager.CacheResource(s.default.CacheType.Audio, n);
                    });
                }), m.forEach(function (t) {
                    gm.AssetManager.LoadSingleAssetAsync(t, function (t) {
                        e.curLoadCount += 1;
                        var i = cc.instantiate(t);
                        i.name = t.name, gm.CacheManager.CacheResource(s.default.CacheType.UI, i);
                    });
                });
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.isStart && (this.visualCur += n.default.getRandom(8, 20), this.progress = this.visualCur / this.visualTotal, this.progress > 1 && (this.progress = 1), this.SetProgress(this.progress));
            },
            Dispose: function Dispose() {}
        }), 
*/