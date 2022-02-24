
var n = require("ConstModName"),
a = require("UIInfo");
cc.Class({
    extends: require("IComponent"),
    properties: {
        isOnlyStopLogic: !1,
        stageId: 0,
        components: null,
        isGameOver: !1,
        curGameStep: 0,
        gameSpeedScale: 1
    },
    Init: function Init(e) {
        this.Resume(), this._super(e), this.isOnlyStopLogic = !1, this.components = [], this.isGameOver = !1;
    },
    StartBattle: function StartBattle(e) {
        this.stageId = e, gm.SceneManager.GotoScene("Battle", this.LoadComplete.bind(this));
    },
    LoadComplete: function LoadComplete() {
        gm.UIManager.SendNotification(n.MOD_Battle, a.UIInfo_ShowView, this.stageId);
    },
    Pause: function Pause(e) {
        this.enabled = !1, cc.director.getPhysicsManager().enabled = !1, this.curGameStep = 3;
    },
    Resume: function Resume() {
        this.curGameStep = 1, this.enabled = !0, cc.director.getPhysicsManager().enabled = !0;
    },
    ChangeGameSpeedScale: function ChangeGameSpeedScale(e) {
        this.gameSpeedScale = e;
    },
    ExitBattle: function ExitBattle() {
        this.Dispose(), gm.SceneManager.GotoScene("MainView", null);
    },
    OnUpdate: function OnUpdate(e) {
        if (0 != this.enabled && null != this.components)
            for (var t = this.components.length, i = 0; i < t; i++) {
                this.components[i].OnUpdate(e);
            }
    },
    Dispose: function Dispose() {
        if (this.Pause(), null != this.components)
            for (var e = this.components.length, t = 0; t < e; t++) {
                this.components[t].Dispose();
            }
        this.components = null;
    }
})

/*BattlePlay: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "d584dT71f5ARLxJDFY+pWvG", "BattlePlay");
        var n = o(e("ConstModName")),
            a = o(e("UIInfo"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("IComponent"),
            properties: {
                isOnlyStopLogic: !1,
                stageId: 0,
                components: null,
                isGameOver: !1,
                curGameStep: 0,
                gameSpeedScale: 1
            },
            Init: function Init(e) {
                this.Resume(), this._super(e), this.isOnlyStopLogic = !1, this.components = [], this.isGameOver = !1;
            },
            StartBattle: function StartBattle(e) {
                this.stageId = e, gm.SceneManager.GotoScene("Battle", this.LoadComplete.bind(this));
            },
            LoadComplete: function LoadComplete() {
                gm.UIManager.SendNotification(n.default.MOD_Battle, a.default.UIInfo_ShowView, this.stageId);
            },
            Pause: function Pause(e) {
                this.enabled = !1, cc.director.getPhysicsManager().enabled = !1, this.curGameStep = 3;
            },
            Resume: function Resume() {
                this.curGameStep = 1, this.enabled = !0, cc.director.getPhysicsManager().enabled = !0;
            },
            ChangeGameSpeedScale: function ChangeGameSpeedScale(e) {
                this.gameSpeedScale = e;
            },
            ExitBattle: function ExitBattle() {
                this.Dispose(), gm.SceneManager.GotoScene("MainView", null);
            },
            OnUpdate: function OnUpdate(e) {
                if (0 != this.enabled && null != this.components)
                    for (var t = this.components.length, i = 0; i < t; i++) {
                        this.components[i].OnUpdate(e);
                    }
            },
            Dispose: function Dispose() {
                if (this.Pause(), null != this.components)
                    for (var e = this.components.length, t = 0; t < e; t++) {
                        this.components[t].Dispose();
                    }
                this.components = null;
            }
        }), 
*/