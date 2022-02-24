

 var n = require("GameDefine"),
 a = require("Facade"),
 o = require("ModulesLib"),
 s = require("util");
 cc.Class({
    extends: require("IComponent"),
    properties: {
        UIROOT: null,
        UISceneLayers: null,
        LayerToDepth: null,
        LayerToUIList: null,
        PreOpenModuleName: null,
        Facade: null,
        ViewList: null
    },
    Init: function Init(e) {
        this._super(e), this.UIROOT = cc.find("Canvas"), this.UISceneLayers = new Array(), this.ViewList = new Array(), this.parent = e, this.Facade = new a(), this.Facade.Init(), this.Overloading(), this.InitUILayer(), o.RegisterAllModules();
    },
    Overloading: function Overloading() {
        var e = this;
        s.OverloadingFunc(this, "SendNotification", function (t, i) {
            e.Facade.SendNotification(t, i, "");
        }), s.OverloadingFunc(this, "SendNotification", function (t, i, n) {
            e.Facade.SendNotification(t, i, n, "");
        });
    },
    InitUILayer: function InitUILayer() {
        this.LayerToDepth = new Array(), this.LayerToUIList = new Array();
        for (var e = cc.Enum.getList(n.UILayer), t = e.length, i = 0; i < t; i++) {
            e[i].value != n.UILayer.NONE && (this.LayerToDepth[e[i].value] = e[i].value);
        }
        this.CreateSceneUI();
    },
    CreateSceneUILayer: function CreateSceneUILayer() {
        this.CreateSceneUI();
        var e = cc.director.getScene().name;
        for (var t in this.UISceneLayers) {
            this.UISceneLayers[t].active = t == e;
        }
    },
    InitSceneNodeEvent: function InitSceneNodeEvent() {
        var e = cc.director.getScene().name;
        for (var t in this.UISceneLayers) {
            if (t != e) this.UISceneLayers[t].active = !1, this.UISceneLayers[t].pauseSystemEvents(!0);
            else this.UISceneLayers[t].active = !0, this.UISceneLayers[t].children.forEach(function (e) {
                1 == e.active ? e.resumeSystemEvents(!0) : e.pauseSystemEvents(!0);
            });
        }
    },
    CreateSceneUI: function CreateSceneUI() {
        var e = cc.director.getScene().name;
        if (null == this.UISceneLayers[e]) {
            var t = new cc.Node(e);
            t.parent = this.parent.node, t.position = new cc.Vec2(0, 0), t.scale = new cc.Vec2(1, 1), t.angle = 0, this.addWidget(t), this.UISceneLayers[e] = t;
        }
    },
    AddChild: function AddChild(e, t) {
        null == this.LayerToUIList[t] && (this.LayerToUIList[t] = []);
        var i = cc.director.getScene().name;
        if (e.parent = this.UISceneLayers[i], e.position = new cc.Vec2(0, 0), e.scale = new cc.Vec2(1, 1), e.angle = 0, e.active = !0, this.LayerToUIList[t].indexOf(e) < 0) {
            t == n.UILayer.UI && this.LayerToUIList[t].length > 0 && (this.PreOpenModuleName = this.LayerToUIList[t][0].name), this.LayerToUIList[t].push(e), this.LayerToDepth[t] = t;
            for (var a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
            }
        } else {
            if (e.zIndex + 1 >= this.LayerToDepth[t]) return;
            var s = this.LayerToUIList[t].indexOf(e);
            this.LayerToUIList[t].splice(s, 1), this.LayerToUIList[t].push(e), this.LayerToDepth[t] = t;
            for (a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
            }
        }
    },
    RemoveChild: function RemoveChild(e) {
        for (var t = n.UILayer.NONE, i = cc.Enum.getList(n.UILayer), a = i.length, o = 0; o < a; o++) {
            if (null != this.LayerToUIList[i[o].value] && this.LayerToUIList[i[o].value].indexOf(e) > -1) {
                t = i[o].value;
                break;
            }
        }
        if (t != n.UILayer.NONE) {
            if (e.zIndex >= this.LayerToDepth[t] - 1) this.LayerToDepth[t]--, this.LayerToUIList[t].splice(this.LayerToUIList[t].indexOf(e), 1);
            else {
                this.LayerToUIList[t].splice(this.LayerToUIList[t].indexOf(e), 1), this.LayerToDepth[t] = t;
                for (a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                    this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
                }
            }
            e.active = !1;
        } else e.active = !1;
    },
    OnUpdate: function OnUpdate(e) {
        this.enabled && this.ViewList.forEach(function (t) {
            t.OnUpdate(e);
        });
    },
    GetChildByName: function GetChildByName(e, t, i) {
        var n = null,
            a = null;
        if (i) {
            if (null == (n = cc.find(t, e)) && null == (n = e.getChildByName(t)))
                for (var o = e.children, s = o.length, r = 0; r < s; r++) {
                    if (null != (a = o[r].getChildByName(t))) {
                        n = a;
                        break;
                    }
                    if (null != (n = this.GetChildByName(a, t, i))) break;
                }
        } else n = e.getChildByName(t);
        return n;
    },
    addWidget: function addWidget(e) {
        e.width = 640, e.height = 1136;
        var t = e.addComponent(cc.Widget);
        t.left = 0, t.right = 0, t.top = 0, t.bottom = 0, t.alignMode = cc.Widget.AlignMode.ALWAYS, t.isAlignLeft = !0, t.isAlignRight = !0, t.isAlignTop = !0, t.isAlignBottom = !0;
    },
    RegisterMediator: function RegisterMediator(e, t) {
        t.Init(e), this.Facade.RegisterMediator(t), this.ViewList.push(t.viewComponent);
    },
    RemoveMediator: function RemoveMediator(e) {
        this.Facade.RemoveMediator(e), this.ViewList.splice(this.ViewList.indexOf(e.viewComponent), 1);
    },
    RetrieveMediator: function RetrieveMediator(e) {
        return this.Facade.RetrieveMediator(mediator);
    }
})
/*UIManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "0c395JowH5KhKhxXDHR7+yu", "UIManager");
        var n = r(e("GameDefine")),
            a = r(e("Facade")),
            o = r(e("ModulesLib")),
            s = r(e("util"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IComponent"),
            properties: {
                UIROOT: null,
                UISceneLayers: null,
                LayerToDepth: null,
                LayerToUIList: null,
                PreOpenModuleName: null,
                Facade: null,
                ViewList: null
            },
            Init: function Init(e) {
                this._super(e), this.UIROOT = cc.find("Canvas"), this.UISceneLayers = new Array(), this.ViewList = new Array(), this.parent = e, this.Facade = new a.default(), this.Facade.Init(), this.Overloading(), this.InitUILayer(), cc.log("this.Facade\uFF1A" + this.Facade), o.default.RegisterAllModules();
            },
            Overloading: function Overloading() {
                var e = this;
                s.default.OverloadingFunc(this, "SendNotification", function (t, i) {
                    e.Facade.SendNotification(t, i, "");
                }), s.default.OverloadingFunc(this, "SendNotification", function (t, i, n) {
                    e.Facade.SendNotification(t, i, n, "");
                });
            },
            InitUILayer: function InitUILayer() {
                this.LayerToDepth = new Array(), this.LayerToUIList = new Array();
                for (var e = cc.Enum.getList(n.default.UILayer), t = e.length, i = 0; i < t; i++) {
                    e[i].value != n.default.UILayer.NONE && (this.LayerToDepth[e[i].value] = e[i].value);
                }
                this.CreateSceneUI();
            },
            CreateSceneUILayer: function CreateSceneUILayer() {
                this.CreateSceneUI();
                var e = cc.director.getScene().name;
                for (var t in this.UISceneLayers) {
                    this.UISceneLayers[t].active = t == e;
                }
            },
            InitSceneNodeEvent: function InitSceneNodeEvent() {
                var e = cc.director.getScene().name;
                for (var t in this.UISceneLayers) {
                    if (t != e) this.UISceneLayers[t].active = !1, this.UISceneLayers[t].pauseSystemEvents(!0);
                    else this.UISceneLayers[t].active = !0, this.UISceneLayers[t].children.forEach(function (e) {
                        1 == e.active ? e.resumeSystemEvents(!0) : e.pauseSystemEvents(!0);
                    });
                }
            },
            CreateSceneUI: function CreateSceneUI() {
                var e = cc.director.getScene().name;
                if (null == this.UISceneLayers[e]) {
                    var t = new cc.Node(e);
                    t.parent = this.parent.node, t.position = new cc.Vec2(0, 0), t.scale = new cc.Vec2(1, 1), t.angle = 0, this.addWidget(t), this.UISceneLayers[e] = t;
                }
            },
            AddChild: function AddChild(e, t) {
                null == this.LayerToUIList[t] && (this.LayerToUIList[t] = []);
                var i = cc.director.getScene().name;
                if (e.parent = this.UISceneLayers[i], e.position = new cc.Vec2(0, 0), e.scale = new cc.Vec2(1, 1), e.angle = 0, e.active = !0, this.LayerToUIList[t].indexOf(e) < 0) {
                    t == n.default.UILayer.UI && this.LayerToUIList[t].length > 0 && (this.PreOpenModuleName = this.LayerToUIList[t][0].name), this.LayerToUIList[t].push(e), this.LayerToDepth[t] = t;
                    for (var a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                        this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
                    }
                } else {
                    if (e.zIndex + 1 >= this.LayerToDepth[t]) return;
                    var s = this.LayerToUIList[t].indexOf(e);
                    this.LayerToUIList[t].splice(s, 1), this.LayerToUIList[t].push(e), this.LayerToDepth[t] = t;
                    for (a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                        this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
                    }
                }
            },
            RemoveChild: function RemoveChild(e) {
                for (var t = n.default.UILayer.NONE, i = cc.Enum.getList(n.default.UILayer), a = i.length, o = 0; o < a; o++) {
                    if (null != this.LayerToUIList[i[o].value] && this.LayerToUIList[i[o].value].indexOf(e) > -1) {
                        t = i[o].value;
                        break;
                    }
                }
                if (t != n.default.UILayer.NONE) {
                    if (e.zIndex >= this.LayerToDepth[t] - 1) this.LayerToDepth[t]--, this.LayerToUIList[t].splice(this.LayerToUIList[t].indexOf(e), 1);
                    else {
                        this.LayerToUIList[t].splice(this.LayerToUIList[t].indexOf(e), 1), this.LayerToDepth[t] = t;
                        for (a = this.LayerToUIList[t].length, o = 0; o < a; o++) {
                            this.LayerToUIList[t][o].zIndex = this.LayerToDepth[t], this.LayerToDepth[t]++;
                        }
                    }
                    e.active = !1;
                } else e.active = !1;
            },
            OnUpdate: function OnUpdate(e) {
                this.enabled && this.ViewList.forEach(function (t) {
                    t.OnUpdate(e);
                });
            },
            GetChildByName: function GetChildByName(e, t, i) {
                var n = null,
                    a = null;
                if (i) {
                    if (null == (n = cc.find(t, e)) && null == (n = e.getChildByName(t)))
                        for (var o = e.children, s = o.length, r = 0; r < s; r++) {
                            if (null != (a = o[r].getChildByName(t))) {
                                n = a;
                                break;
                            }
                            if (null != (n = this.GetChildByName(a, t, i))) break;
                        }
                } else n = e.getChildByName(t);
                return n;
            },
            addWidget: function addWidget(e) {
                e.width = 640, e.height = 1136;
                var t = e.addComponent(cc.Widget);
                t.left = 0, t.right = 0, t.top = 0, t.bottom = 0, t.alignMode = cc.Widget.AlignMode.ALWAYS, t.isAlignLeft = !0, t.isAlignRight = !0, t.isAlignTop = !0, t.isAlignBottom = !0;
            },
            RegisterMediator: function RegisterMediator(e, t) {
                t.Init(e), this.Facade.RegisterMediator(t), this.ViewList.push(t.viewComponent);
            },
            RemoveMediator: function RemoveMediator(e) {
                this.Facade.RemoveMediator(e), this.ViewList.splice(this.ViewList.indexOf(e.viewComponent), 1);
            },
            RetrieveMediator: function RetrieveMediator(e) {
                return this.Facade.RetrieveMediator(mediator);
            }
        }), 
*/