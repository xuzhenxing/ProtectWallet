

require("util"), require("GameConfig"), require("GameDefine");
cc.Class({
    extends: require("BaseStage"),
    properties: {},
    Enter: function Enter(e) {
        this._super(e);
    },
    OnUpdate: function OnUpdate(e) {
        this._super(e);
    },
    Exit: function Exit() {
        this._super();
    },
    ContinueStage: function ContinueStage() {
        this._super();
    },
    RestartGame: function RestartGame(e) {
        this.Param.stageConfig = gm.GameData.GetStageConfig(e), this._super(e);
    },
    Dispose: function Dispose() {
        this._super();
    }
})

/*EndLessStage: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "c1761/8LN1AS7HQ6LSeInGr", "EndLessStage");
        n(e("util")), n(e("GameConfig")), n(e("GameDefine"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: e("BaseStage"),
            properties: {},
            Enter: function Enter(e) {
                this._super(e);
            },
            OnUpdate: function OnUpdate(e) {
                this._super(e);
            },
            Exit: function Exit() {
                this._super();
            },
            ContinueStage: function ContinueStage() {
                this._super();
            },
            RestartGame: function RestartGame(e) {
                this.Param.stageConfig = gm.GameData.GetStageConfig(e), this._super(e);
            },
            Dispose: function Dispose() {
                this._super();
            }
        }), 
*/