var n = require("GameDefine"),
    a = require("ModulesLib");
require("UIInfo"), require("ConstModName");
cc.Class({
    extends: require("IUpdateAttachIDispose"),
    properties: {
        moduleName: null,
        isInit: !1,
        isShow: !1,
        uiLayer: n.UILayer.UI,
        viewNode: null,
        viewScript: null,
        enabled: !1,
        isLoading: !1,
        mediator: null,
        viewAni: null,
        splash: null
    },
    Init: function Init(t) {
        this.mediator = t, this.moduleName = t.mediatorName, this.viewScript = new(require(this.moduleName))(), this.viewScript.baseUIView = this, this.isInit = !0, this.enabled = !0;
    },
    LoadView: function LoadView() {
        var e,
            t = "ui/" + a.ModuleToResourceDic[this.moduleName];
        if (null == (e = gm.CacheManager.GetCacheResource(n.CacheType.UI, this.moduleName))) {
            this.isLoading = !0;
            var i = this;
            gm.AssetManager.LoadSingleAssetAsync(t, function (e) {
                // debugger  cc.log(t), cc.log(e),
                i.isLoading = !1, i.viewNode = cc.instantiate(e),
                    i.splash = i.viewNode.getChildByName("Splash"),
                    i.GetAnimation(),
                    i.viewScript.Init(i),
                    i.viewNode.resumeSystemEvents(!0),
                    i.isShow ? (gm.UIManager.AddChild(i.viewNode, i.uiLayer),
                        i.PlayViewAnimation(), i.viewScript.ShowView()) : i.viewNode.active = !1;
                // console.log("jiazaichangjing")
                // console.log(i.viewNode)
            });
        } else this.viewNode = e,
            this.splash = this.viewNode.getChildByName("Splash"),
            this.GetAnimation(),
            this.viewScript.Init(this),
            this.ShowView();
    },
    GetAnimation: function GetAnimation() {
        this.viewAni = this.viewNode.getComponent(cc.Animation), this.viewAni;
    },
    ShowView: function ShowView() {
        this.isShow = !0, 0 != this.isLoading || null != this.viewNode ? null != this.viewNode && (null != this.splash && (this.splash.active = !0), gm.UIManager.AddChild(this.viewNode, this.uiLayer), this.PlayViewAnimation(), this.viewNode.resumeSystemEvents(!0), this.viewScript.ShowView()) : this.LoadView();
    },
    PlayViewAnimation: function PlayViewAnimation() {
        null != this.viewAni && this.viewAni.play();
    },
    CloseView: function CloseView() {
        if (this.isShow = !1, null != this.viewNode)
            if (null != this.splash && (this.splash.active = !1), null != this.viewAni) {
                this.viewAni.getAnimationState("WindowUp");
                this.CloseTargetView();
            } else this.CloseTargetView();
    },
    CloseTargetView: function CloseTargetView() {
        gm.UIManager.RemoveChild(this.viewNode, this.uiLayer), this.viewScript.CloseView(), this.viewNode.pauseSystemEvents(!0);
    },
    OnUpdate: function OnUpdate(e) {
        this.enabled && this.viewScript.OnUpdate(e);
    },
    HandleNotification: function HandleNotification(e) {
        this.viewScript.HandleNotification(e);
    },
    RegisterAllNotification: function RegisterAllNotification() {
        this.viewScript.RegisterNotification();
    },
    PushNotification: function PushNotification(e) {
        this.mediator.PushInfo(e);
    },
    ConvertPath: function ConvertPath(e) {
        return e.replace(/\//g, "#");
    },
    Dispose: function Dispose() {
        this.viewScript.CloseView(), this.viewScript = null, this.enabled = !1;
    }
})


/*BaseUIView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e4a03oBznRHOYuDOxOqN8cn", "BaseUIView");
        var n = o(e("GameDefine")),
            a = o(e("ModulesLib"));
        o(e("UIInfo")), o(e("ConstModName"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                moduleName: null,
                isInit: !1,
                isShow: !1,
                uiLayer: n.UILayer.UI,
                viewNode: null,
                viewScript: null,
                enabled: !1,
                isLoading: !1,
                mediator: null,
                viewAni: null,
                splash: null
            },
            Init: function Init(t) {
                this.mediator = t, this.moduleName = t.mediatorName, cc.log(this.moduleName), this.viewScript = new(e(this.moduleName))(), this.viewScript.baseUIView = this, this.isInit = !0, this.enabled = !0;
            },
            LoadView: function LoadView() {
                var e,
                    t = "ui/" + a.default.ModuleToResourceDic[this.moduleName];
                if (null == (e = gm.CacheManager.GetCacheResource(n.default.CacheType.UI, this.moduleName))) {
                    this.isLoading = !0;
                    var i = this;
                    gm.AssetManager.LoadSingleAssetAsync(t, function (e) {
                        i.isLoading = !1, cc.log(t), cc.log(e), i.viewNode = cc.instantiate(e), i.splash = i.viewNode.getChildByName("Splash"), i.GetAnimation(), i.viewScript.Init(i), i.viewNode.resumeSystemEvents(!0), i.isShow ? (gm.UIManager.AddChild(i.viewNode, i.uiLayer), i.PlayViewAnimation(), i.viewScript.ShowView()) : i.viewNode.active = !1;
                    });
                } else this.viewNode = e, this.splash = this.viewNode.getChildByName("Splash"), this.GetAnimation(), this.viewScript.Init(this), this.ShowView();
            },
            GetAnimation: function GetAnimation() {
                this.viewAni = this.viewNode.getComponent(cc.Animation), this.viewAni;
            },
            ShowView: function ShowView() {
                this.isShow = !0, 0 != this.isLoading || null != this.viewNode ? null != this.viewNode && (null != this.splash && (this.splash.active = !0), gm.UIManager.AddChild(this.viewNode, this.uiLayer), this.PlayViewAnimation(), this.viewNode.resumeSystemEvents(!0), this.viewScript.ShowView()) : this.LoadView();
            },
            PlayViewAnimation: function PlayViewAnimation() {
                null != this.viewAni && this.viewAni.play();
            },
            CloseView: function CloseView() {
                if (this.isShow = !1, null != this.viewNode)
                    if (null != this.splash && (this.splash.active = !1), null != this.viewAni) {
                        this.viewAni.getAnimationState("WindowUp");
                        this.CloseTargetView();
                    } else this.CloseTargetView();
            },
            CloseTargetView: function CloseTargetView() {
                gm.UIManager.RemoveChild(this.viewNode, this.uiLayer), this.viewScript.CloseView(), this.viewNode.pauseSystemEvents(!0);
            },
            OnUpdate: function OnUpdate(e) {
                this.enabled && this.viewScript.OnUpdate(e);
            },
            HandleNotification: function HandleNotification(e) {
                this.viewScript.HandleNotification(e);
            },
            RegisterAllNotification: function RegisterAllNotification() {
                this.viewScript.RegisterNotification();
            },
            PushNotification: function PushNotification(e) {
                this.mediator.PushInfo(e);
            },
            ConvertPath: function ConvertPath(e) {
                return e.replace(/\//g, "#");
            },
            Dispose: function Dispose() {
                this.viewScript.CloseView(), this.viewScript = null, this.enabled = !1;
            }
        }), 
*/