

var n = require("StageParams"),
a = require("GameDefine");
require("GameConfig");
cc.Class({
    extends: require("IComponent"),
    properties: {
        curStageType: null,
        curStage: null,
        stageDic: null,
        battlePlay: null,
        stageConfig: null
    },
    Init: function Init(e) {
        this._super(e), this.battlePlay = e, this.stageDic = new Array(), this.CreateStages(), this.curStageType = a.StageType.Stage_Invalid, this.stageConfig = gm.GameData.GetStageConfig(this.battlePlay.stageId);
        var t = new n();
        t.stageConfig = this.stageConfig, this.ChangeStage(this.stageConfig.stageType, t);
    },
    CreateStages: function CreateStages() {
        var e = new EndLessStage();
        e.Init(this), this.stageDic[a.StageType.Stage_Endless] = e;
    },
    RestartGame: function RestartGame(e) {
        this.stageConfig = gm.GameData.GetStageConfig(e), null != this.curStage && this.curStage.RestartGame(e);
    },
    GetCurBoss: function GetCurBoss() {
        if (null != this.curStage) return this.curStage.CurBoss;
    },
    ContinueStage: function ContinueStage() {},
    OnUpdate: function OnUpdate(e) {
        0 != this.enabled && null != this.curStage && this.curStage.OnUpdate(e);
    },
    ChangeStage: function ChangeStage(e, t) {
        e != this.curStageType && this.curStageType != a.StageType.Stage_Invalid && this.curStage.Exit(), this.curStage = this.stageDic[e], this.curStage.Enter(t);
    },
    GetCurCallMonsterType: function GetCurCallMonsterType() {
        return null != this.curStage ? this.curStage.GetCurCallMonsterType() : -1;
    },
    Dispose: function Dispose() {
        for (var e in this.stageDic) {
            this.stageDic[e].Dispose();
        }
        this.stageDic = null;
    }
})
/*StageManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "039447zctBK4bc0CA5LXNLv", "StageManager");
        var n = o(e("StageParams")),
            a = o(e("GameDefine"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        e("GameConfig");
        cc.Class({
            extends: e("IComponent"),
            properties: {
                curStageType: null,
                curStage: null,
                stageDic: null,
                battlePlay: null,
                stageConfig: null
            },
            Init: function Init(e) {
                this._super(e), this.battlePlay = e, this.stageDic = new Array(), this.CreateStages(), this.curStageType = a.default.StageType.Stage_Invalid, this.stageConfig = gm.GameData.GetStageConfig(this.battlePlay.stageId);
                var t = new n.default();
                t.stageConfig = this.stageConfig, this.ChangeStage(this.stageConfig.stageType, t);
            },
            CreateStages: function CreateStages() {
                var e = new EndLessStage();
                e.Init(this), this.stageDic[a.default.StageType.Stage_Endless] = e;
            },
            RestartGame: function RestartGame(e) {
                this.stageConfig = gm.GameData.GetStageConfig(e), null != this.curStage && this.curStage.RestartGame(e);
            },
            GetCurBoss: function GetCurBoss() {
                if (null != this.curStage) return this.curStage.CurBoss;
            },
            ContinueStage: function ContinueStage() {},
            OnUpdate: function OnUpdate(e) {
                0 != this.enabled && null != this.curStage && this.curStage.OnUpdate(e);
            },
            ChangeStage: function ChangeStage(e, t) {
                e != this.curStageType && this.curStageType != a.default.StageType.Stage_Invalid && this.curStage.Exit(), this.curStage = this.stageDic[e], this.curStage.Enter(t);
            },
            GetCurCallMonsterType: function GetCurCallMonsterType() {
                return null != this.curStage ? this.curStage.GetCurCallMonsterType() : -1;
            },
            Dispose: function Dispose() {
                for (var e in this.stageDic) {
                    this.stageDic[e].Dispose();
                }
                this.stageDic = null;
            }
        }), 
*/