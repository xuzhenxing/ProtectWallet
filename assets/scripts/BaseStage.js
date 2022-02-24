
require("util"), require("GameConfig"), require("GameDefine");
cc.Class({
    properties: {
        Param: null,
        stageMgr: null,
        curClearRow: 0,
        CurBoss: null,
        initLife: 1,
        positions: null
    },
    Init: function Init(e) {
        this.stageMgr = e;
    },
    Enter: function Enter(e) {
        this.Param = e, this.InitData();
    },
    InitData: function InitData() {},
    OnUpdate: function OnUpdate(e) {},
    Exit: function Exit() {},
    ContinueStage: function ContinueStage() {},
    RestartGame: function RestartGame(e) {
        this.InitData();
    },
    Dispose: function Dispose() {
        this.Param = null, this.stageMgr = null;
    }
})


/*BaseStage: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "91544HJVPlB0pVJvn1nJ3H2", "BaseStage");
        n(e("util")), n(e("GameConfig")), n(e("GameDefine"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                Param: null,
                stageMgr: null,
                curClearRow: 0,
                CurBoss: null,
                initLife: 1,
                positions: null
            },
            Init: function Init(e) {
                this.stageMgr = e;
            },
            Enter: function Enter(e) {
                this.Param = e, this.InitData();
            },
            InitData: function InitData() {},
            OnUpdate: function OnUpdate(e) {},
            Exit: function Exit() {},
            ContinueStage: function ContinueStage() {},
            RestartGame: function RestartGame(e) {
                this.InitData();
            },
            Dispose: function Dispose() {
                this.Param = null, this.stageMgr = null;
            }
        }), 
*/