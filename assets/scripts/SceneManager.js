var n = require("ConstModName"),
    a = require("UIInfo");
require("GameDefine");
var s = cc.Class({
    properties: {
        isLoadOnce: !1,
        preloadClass: null
    },
    Init: function Init(e, t) {
        this.isLoadOnce = e, this.preloadClass = t;
    }
});
cc.Class({
    extends: require("IComponent"),
    properties: {
        curScene: null,
        preScene: null,
        targetScene: null,
        preloadMrg: null,
        isLoading: !1,
        loadCallback: null,
        curPreload: null,
        sceneLoadRecord: null
    },
    Init: function Init(e) {
        this._super(e), this.preloadMrg = new Array(), this.sceneLoadRecord = new Array(), this.curScene = cc.director.getScene().name;
        var t = new s();
        t.Init(!0, "NothingPreload"), this.preloadMrg.Client = t, (t = new s()).Init(!0, "GameInitPreload"), this.preloadMrg.MainView = t, (t = new s()).Init(!0, "GameAssetPreload"), this.preloadMrg.Battle = t, (t = new s()).Init(!0, "NothingPreload"), this.preloadMrg.NothingPreload = t;
    },
    OnUpdate: function OnUpdate(e) {
        this._super(e), null != this.curPreload && this.curPreload.OnUpdate(e);
    },
    GotoScene: function GotoScene(t, i) {
        var n;
        this.isLoading || (this.preScene = this.curScene, 
            this.targetScene = t, 
            this.loadCallback = i, 
            null == this.sceneLoadRecord[t] && 
            (this.sceneLoadRecord[t] = -1), 
            this.sceneLoadRecord[t] += 1, 
            null != this.preloadMrg[t] ? (n = this.preloadMrg[t]).isLoadOnce && this.sceneLoadRecord[t] >= 1 
            && (n = this.preloadMrg.NothingPreload) : n = this.preloadMrg.NothingPreload, 
            this.isLoading = !0, this.curPreload = new(require(n.preloadClass))(), this.curPreload.Start());
    },
    OnPreloadComplete: function OnPreloadComplete() {
        this.curPreload.Dispose(),
            this.curPreload = null,
            cc.director.loadScene(this.targetScene, this.OnSceneLoadComplete.bind(this));
    },
    OnSceneLoadComplete: function OnSceneLoadComplete() {
        cc.director.getScene().scale = 1,
            this.targetScene, gm.UIManager.CreateSceneUILayer(),
            this.curScene = this.targetScene, this.isLoading = !1,
            null != this.loadCallback && this.loadCallback(),
            gm.UIManager.InitSceneNodeEvent(),
            gm.UIManager.SendNotification(n.MOD_GameLoading, a.UIInfo_CloseView, null),
            gm.UIManager.SendNotification(a.UIInfo_TransferSceneComplete, this.preScene);
        // debugger
    },
    Dispose: function Dispose() {}
})
/*SceneManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1a581GdlHRJ27B2HyGSHru1", "SceneManager");
        var n = o(e("ConstModName")),
            a = o(e("UIInfo"));
        o(e("GameDefine"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = cc.Class({
            properties: {
                isLoadOnce: !1,
                preloadClass: null
            },
            Init: function Init(e, t) {
                this.isLoadOnce = e, this.preloadClass = t;
            }
        });
        cc.Class({
            extends: e("IComponent"),
            properties: {
                curScene: null,
                preScene: null,
                targetScene: null,
                preloadMrg: null,
                isLoading: !1,
                loadCallback: null,
                curPreload: null,
                sceneLoadRecord: null
            },
            Init: function Init(e) {
                this._super(e), this.preloadMrg = new Array(), this.sceneLoadRecord = new Array(), this.curScene = cc.director.getScene().name;
                var t = new s();
                t.Init(!0, "NothingPreload"), this.preloadMrg.Client = t, (t = new s()).Init(!0, "GameInitPreload"), this.preloadMrg.MainView = t, (t = new s()).Init(!0, "GameAssetPreload"), this.preloadMrg.Battle = t, (t = new s()).Init(!0, "NothingPreload"), this.preloadMrg.NothingPreload = t;
            },
            OnUpdate: function OnUpdate(e) {
                this._super(e), null != this.curPreload && this.curPreload.OnUpdate(e);
            },
            GotoScene: function GotoScene(t, i) {
                var n;
                this.isLoading || (this.preScene = this.curScene, this.targetScene = t, this.loadCallback = i, null == this.sceneLoadRecord[t] && (this.sceneLoadRecord[t] = -1), this.sceneLoadRecord[t] += 1, null != this.preloadMrg[t] ? (n = this.preloadMrg[t]).isLoadOnce && this.sceneLoadRecord[t] >= 1 && (n = this.preloadMrg.NothingPreload) : n = this.preloadMrg.NothingPreload, this.isLoading = !0, this.curPreload = new(e(n.preloadClass))(), this.curPreload.Start());
            },
            OnPreloadComplete: function OnPreloadComplete() {
                this.curPreload.Dispose(), this.curPreload = null, cc.director.loadScene(this.targetScene, this.OnSceneLoadComplete.bind(this));
            },
            OnSceneLoadComplete: function OnSceneLoadComplete() {
                cc.director.getScene().scale = 1, this.targetScene, gm.UIManager.CreateSceneUILayer(), this.curScene = this.targetScene, this.isLoading = !1, null != this.loadCallback && this.loadCallback(), gm.UIManager.InitSceneNodeEvent(), gm.UIManager.SendNotification(n.default.MOD_GameLoading, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(a.default.UIInfo_TransferSceneComplete, this.preScene);
            },
            Dispose: function Dispose() {}
        }), 
*/