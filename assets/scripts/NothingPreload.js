

var n = require("util"),
a = require("ConstModName"),
o = require("UIInfo");
cc.Class({
    extends: require("IUpdateAttachIDispose"),
    properties: {
        loadTotal: 0,
        curLoadCount: 0,
        loadProgress: 0,
        isStart: !1
    },
    Start: function Start() {
        this.isStart = !0, this.curLoadCount = 1, this.loadTotal = 50, gm.UIManager.SendNotification(a.MOD_GameLoading, o.UIInfo_ShowView, null);
    },
    OnLoadFinish: function OnLoadFinish() {
        gm.SceneManager.OnPreloadComplete(), gm.UIManager.SendNotification(a.MOD_GameLoading, o.UIInfo_CloseView, null);
    },
    SetProgress: function SetProgress(e) {
        gm.UIManager.SendNotification(a.MOD_GameLoading, o.UIInfo_SetProgress, e), e >= 1 && this.OnLoadFinish();
    },
    SetTips: function SetTips(e) {},
    LoadHandle: function LoadHandle() {
        this.curLoadCount += n.getRandom(1, 3);
    },
    OnUpdate: function OnUpdate(e) {
        0 != this.isStart && (this.LoadHandle(), this.progress = this.curLoadCount / this.loadTotal, this.SetProgress(this.progress));
    },
    Dispose: function Dispose() {}
})

/*NothingPreload: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "18350Y2Zn1M4408sUlBv6i6", "NothingPreload");
        var n = s(e("util")),
            a = s(e("ConstModName")),
            o = s(e("UIInfo"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IUpdateAttachIDispose"),
            properties: {
                loadTotal: 0,
                curLoadCount: 0,
                loadProgress: 0,
                isStart: !1
            },
            Start: function Start() {
                this.isStart = !0, this.curLoadCount = 1, this.loadTotal = 50, gm.UIManager.SendNotification(a.default.MOD_GameLoading, o.default.UIInfo_ShowView, null);
            },
            OnLoadFinish: function OnLoadFinish() {
                gm.SceneManager.OnPreloadComplete(), gm.UIManager.SendNotification(a.default.MOD_GameLoading, o.default.UIInfo_CloseView, null);
            },
            SetProgress: function SetProgress(e) {
                gm.UIManager.SendNotification(a.default.MOD_GameLoading, o.default.UIInfo_SetProgress, e), e >= 1 && this.OnLoadFinish();
            },
            SetTips: function SetTips(e) {},
            LoadHandle: function LoadHandle() {
                this.curLoadCount += n.default.getRandom(1, 3);
            },
            OnUpdate: function OnUpdate(e) {
                0 != this.isStart && (this.LoadHandle(), this.progress = this.curLoadCount / this.loadTotal, this.SetProgress(this.progress));
            },
            Dispose: function Dispose() {}
        }), 
*/