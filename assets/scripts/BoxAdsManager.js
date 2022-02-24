

 var n = require("util"),
 a = require("ConstModName"),
 o = require("UIInfo"),
 s = require("umsdk"),
 r = require("GameConfig");

 cc.Class({
    properties: {
        BoxList: null,
        BoxSingles: null,
        LoopTime: 5e5,
        CurLoopTime: 0,
        AniTime: -1,
        CurAnitime: 0,
        ListNode: null,
        SingleList: null,
        curShowIndex: -1,
        SingleBoxClickDic: null,
        BoxListClickDic: null,
        SingleBoxCanShowDic: null,
        BoxListCanShowDic: null,
        IconAd: null,
        AdId: 0,
        ModName: "",
        Type: "",
        BoolBreak: !0,
        AllCanShow: !1,
        SlotId: ""
    },
    Show: function Show() {
        if (this.AllCanShow = !0, 1 == this.Type)
            for (var e = 0; e < this.SingleBoxCanShowDic.length; e++) {
                var t = this.SingleBoxCanShowDic[e];
                null != this.SingleBoxClickDic[t] && this.SingleBoxClickDic[t].show();
            } else
                for (var i = 0; i < this.BoxListCanShowDic.length; i++) {
                    var n = this.BoxListCanShowDic[i];
                    null != this.BoxListClickDic[n] && this.BoxListClickDic[n].show();
                }
    },
    Init: function Init(e, t, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
        this.AllCanShow = !1, this.AdId = i, this.Type = n, this.ListNode = e, this.SingleList = e, this.BoxList = [], this.BoxSingles = [], this.SingleBoxClickDic = {}, this.BoxListClickDic = {}, this.SingleBoxCanShowDic = new Array(), this.BoxListCanShowDic = new Array(), this.CurLoopTime = this.LoopTime, this.CurAnitime = this.AniTime, this.ModName = t, this.BoolBreak = a, this.InitBoxAd(), this.AddEvent();
    },
    InitBoxAd: function InitBoxAd() {
        null != s && null != gm.wx && (this.IconAd = s.createIconAd({
            slotId: this.AdId,
            limit: this.ListNode.length
        }), this.IconAd.load().then(function (e) {
            if (console.log("Box:" + e), this.AdId == r.AdBox) {
                cc.log(e);
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    cc.log(i.data.title);
                }
            }
            this.Refresh(e);
        }.bind(this)));
    },
    Refresh: function Refresh(e) {
        1 == this.Type ? this.RefreshSingleList(e) : this.RefreshBoxList(e);
    },
    HandleEvent: function HandleEvent(e) {
        console.log("暂时不知道这里是什么点击事件")
        var t = e.currentTarget,
            i = this.SingleBoxClickDic[t.name];
        null == i && (i = this.BoxListClickDic[t.name]), null != i && i.click({
            success: function success() {},
            fail: function () {
                this.ModName != a.MOD_AdView && gm.UIManager.SendNotification(a.MOD_AdView, o.UIInfo_ShowView, null);
            }.bind(this)
        });
        var n = t.getChildByName("RedPoint");
        null != n && (n.active = !1);
    },
    RefreshBoxList: function RefreshBoxList(e) {
        if (null != e && null != this.ListNode) {
            this.BoxList = e;
            for (var t = n.GetChildByName(this.ListNode, "Game_0"), i = this.BoxList.length, a = 0; a < i; a++) {
                a > 0 && ((t = cc.instantiate(t)).parent = this.ListNode, t.name = "Game_" + a), t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.BoxListClickDic[t.name] = this.BoxList[a];
                var o = t.getComponent(cc.Sprite),
                    s = t.getChildByName("icon");
                null != s && (o = s.getComponent(cc.Sprite));
                var r = t.getChildByName("Mask");
                null != r && (o = (s = r.getChildByName("icon")).getComponent(cc.Sprite)), this.loadImg(o, this.BoxList[a].data.icon, t);
                var c = t.getComponentInChildren(cc.Label);
                null != c && (c.string = this.BoxList[a].data.title);
            }
        }
    },
    AddEvent: function AddEvent() {
        if (1 == this.Type)
            for (var e = this.SingleList.length, t = 0; t < e; t++) {
                this.SingleList[t].on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            }
    },
    RefreshSingleList: function RefreshSingleList(e) {
        null != e && (this.BoxSingles = e, this.RefreshSingleIcons());
    },
    RefreshSingleIcons: function RefreshSingleIcons() {
        this.BoxSingles.length;
        this.BoolBreak && n.ArrayBreakOrder(this.SingleList);
        for (var e = this.SingleList.length, t = this.curShowIndex + 1, i = -1, a = t; a < t + e; a++) {
            if (null != this.BoxSingles[a]) {
                if (i++, null != this.SingleList[i]) {
                    this.curShowIndex += 1, this.SingleList[i].active = !0;
                    var o = this.SingleList[i].getComponent(cc.Sprite),
                        s = this.SingleList[i].getChildByName("icon");
                    null != s && (o = s.getComponent(cc.Sprite));
                    var r = this.SingleList[i].getChildByName("Mask");
                    null != r && (o = (s = r.getChildByName("icon")).getComponent(cc.Sprite)), this.SingleBoxClickDic[this.SingleList[i].name] = this.BoxSingles[a], this.loadImg(o, this.BoxSingles[a].data.icon, this.SingleList[i]);
                    var c = this.SingleList[i].getComponentInChildren(cc.Label);
                    null != c && (c.string = this.BoxSingles[a].data.title);
                } else this.curShowIndex = -1;
            } else this.curShowIndex = -1;
        }
    },
    loadImg: function loadImg(e, t, i) {
        cc.loader.load(t, function (t, n) {
            var a = new cc.SpriteFrame(n);
            e.spriteFrame = a, null != this.SingleBoxClickDic[i.name] && (this.AllCanShow ? this.SingleBoxClickDic[i.name].show() : -1 == this.SingleBoxCanShowDic.indexOf(i.name) && this.SingleBoxCanShowDic.push(i.name)), null != this.BoxListClickDic[i.name] && (this.AllCanShow ? this.BoxListClickDic[i.name].show() : -1 == this.BoxListCanShowDic.indexOf(i.name) && this.BoxListCanShowDic.push(i.name));
        }.bind(this));
    },
    OnUpdate: function OnUpdate(e) {
        if (null != gm.wx && (this.CurLoopTime > 0 && (this.CurLoopTime -= e, this.CurLoopTime <= 0 && (this.CurLoopTime = this.LoopTime, this.RefreshSingleIcons())), this.CurAnitime > 0 && (this.CurAnitime -= e, this.CurAnitime <= 0))) {
            this.CurAnitime = this.AniTime;
            for (var t = 0; t < this.SingleList.length; t++) {
                var i = this.SingleList[t].getComponent(cc.Animation);
                null != i && (cc.log(this.SingleList[t].name), i.playAdditive());
            }
        }
    }
})
/*BoxAdsManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "35b7bXvgCRPmpGRvMOJxp6A", "BoxAdsManager");
        var n = c(e("util")),
            a = c(e("ConstModName")),
            o = c(e("UIInfo")),
            s = c(e("umsdk")),
            r = c(e("GameConfig"));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                BoxList: null,
                BoxSingles: null,
                LoopTime: 5e5,
                CurLoopTime: 0,
                AniTime: -1,
                CurAnitime: 0,
                ListNode: null,
                SingleList: null,
                curShowIndex: -1,
                SingleBoxClickDic: null,
                BoxListClickDic: null,
                SingleBoxCanShowDic: null,
                BoxListCanShowDic: null,
                IconAd: null,
                AdId: 0,
                ModName: "",
                Type: "",
                BoolBreak: !0,
                AllCanShow: !1,
                SlotId: ""
            },
            Show: function Show() {
                if (this.AllCanShow = !0, 1 == this.Type)
                    for (var e = 0; e < this.SingleBoxCanShowDic.length; e++) {
                        var t = this.SingleBoxCanShowDic[e];
                        null != this.SingleBoxClickDic[t] && this.SingleBoxClickDic[t].show();
                    } else
                        for (var i = 0; i < this.BoxListCanShowDic.length; i++) {
                            var n = this.BoxListCanShowDic[i];
                            null != this.BoxListClickDic[n] && this.BoxListClickDic[n].show();
                        }
            },
            Init: function Init(e, t, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                    a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                this.AllCanShow = !1, this.AdId = i, this.Type = n, this.ListNode = e, this.SingleList = e, this.BoxList = [], this.BoxSingles = [], this.SingleBoxClickDic = {}, this.BoxListClickDic = {}, this.SingleBoxCanShowDic = new Array(), this.BoxListCanShowDic = new Array(), this.CurLoopTime = this.LoopTime, this.CurAnitime = this.AniTime, this.ModName = t, this.BoolBreak = a, this.InitBoxAd(), this.AddEvent();
            },
            InitBoxAd: function InitBoxAd() {
                null != s.default && null != gm.wx && (this.IconAd = s.default.createIconAd({
                    slotId: this.AdId,
                    limit: this.ListNode.length
                }), this.IconAd.load().then(function (e) {
                    if (console.log("Box:" + e), this.AdId == r.default.AdBox) {
                        cc.log(e);
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t];
                            cc.log(i.data.title);
                        }
                    }
                    this.Refresh(e);
                }.bind(this)));
            },
            Refresh: function Refresh(e) {
                1 == this.Type ? this.RefreshSingleList(e) : this.RefreshBoxList(e);
            },
            HandleEvent: function HandleEvent(e) {
                var t = e.currentTarget,
                    i = this.SingleBoxClickDic[t.name];
                null == i && (i = this.BoxListClickDic[t.name]), null != i && i.click({
                    success: function success() {},
                    fail: function () {
                        this.ModName != a.default.MOD_AdView && gm.UIManager.SendNotification(a.default.MOD_AdView, o.default.UIInfo_ShowView, null);
                    }.bind(this)
                });
                var n = t.getChildByName("RedPoint");
                null != n && (n.active = !1);
            },
            RefreshBoxList: function RefreshBoxList(e) {
                if (null != e && null != this.ListNode) {
                    this.BoxList = e;
                    for (var t = n.default.GetChildByName(this.ListNode, "Game_0"), i = this.BoxList.length, a = 0; a < i; a++) {
                        a > 0 && ((t = cc.instantiate(t)).parent = this.ListNode, t.name = "Game_" + a), t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.BoxListClickDic[t.name] = this.BoxList[a];
                        var o = t.getComponent(cc.Sprite),
                            s = t.getChildByName("icon");
                        null != s && (o = s.getComponent(cc.Sprite));
                        var r = t.getChildByName("Mask");
                        null != r && (o = (s = r.getChildByName("icon")).getComponent(cc.Sprite)), this.loadImg(o, this.BoxList[a].data.icon, t);
                        var c = t.getComponentInChildren(cc.Label);
                        null != c && (c.string = this.BoxList[a].data.title);
                    }
                }
            },
            AddEvent: function AddEvent() {
                if (1 == this.Type)
                    for (var e = this.SingleList.length, t = 0; t < e; t++) {
                        this.SingleList[t].on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
                    }
            },
            RefreshSingleList: function RefreshSingleList(e) {
                null != e && (this.BoxSingles = e, this.RefreshSingleIcons());
            },
            RefreshSingleIcons: function RefreshSingleIcons() {
                this.BoxSingles.length;
                this.BoolBreak && n.default.ArrayBreakOrder(this.SingleList);
                for (var e = this.SingleList.length, t = this.curShowIndex + 1, i = -1, a = t; a < t + e; a++) {
                    if (null != this.BoxSingles[a]) {
                        if (i++, null != this.SingleList[i]) {
                            this.curShowIndex += 1, this.SingleList[i].active = !0;
                            var o = this.SingleList[i].getComponent(cc.Sprite),
                                s = this.SingleList[i].getChildByName("icon");
                            null != s && (o = s.getComponent(cc.Sprite));
                            var r = this.SingleList[i].getChildByName("Mask");
                            null != r && (o = (s = r.getChildByName("icon")).getComponent(cc.Sprite)), this.SingleBoxClickDic[this.SingleList[i].name] = this.BoxSingles[a], this.loadImg(o, this.BoxSingles[a].data.icon, this.SingleList[i]);
                            var c = this.SingleList[i].getComponentInChildren(cc.Label);
                            null != c && (c.string = this.BoxSingles[a].data.title);
                        } else this.curShowIndex = -1;
                    } else this.curShowIndex = -1;
                }
            },
            loadImg: function loadImg(e, t, i) {
                cc.loader.load(t, function (t, n) {
                    var a = new cc.SpriteFrame(n);
                    e.spriteFrame = a, null != this.SingleBoxClickDic[i.name] && (this.AllCanShow ? this.SingleBoxClickDic[i.name].show() : -1 == this.SingleBoxCanShowDic.indexOf(i.name) && this.SingleBoxCanShowDic.push(i.name)), null != this.BoxListClickDic[i.name] && (this.AllCanShow ? this.BoxListClickDic[i.name].show() : -1 == this.BoxListCanShowDic.indexOf(i.name) && this.BoxListCanShowDic.push(i.name));
                }.bind(this));
            },
            OnUpdate: function OnUpdate(e) {
                if (null != gm.wx && (this.CurLoopTime > 0 && (this.CurLoopTime -= e, this.CurLoopTime <= 0 && (this.CurLoopTime = this.LoopTime, this.RefreshSingleIcons())), this.CurAnitime > 0 && (this.CurAnitime -= e, this.CurAnitime <= 0))) {
                    this.CurAnitime = this.AniTime;
                    for (var t = 0; t < this.SingleList.length; t++) {
                        var i = this.SingleList[t].getComponent(cc.Animation);
                        null != i && (cc.log(this.SingleList[t].name), i.playAdditive());
                    }
                }
            }
        }), 
*/