

module.exports = {
    LoadWay: cc.Enum({
        Single: 0,
        Mutil: 1,
        Dir: 2
    }),
    LoadModel: cc.Enum({
        Local: 0,
        Remote: 1
    }),
    UILayer: cc.Enum({
        NONE: -1,
        UI: 1200,
        UI_ALERT: 1400,
        UI_TIPS: 1500,
        UI_OTHER: 1600,
        UI_TOP: 1700,
        UI_GuideDialogue: 3e3
    }),
    CacheType: cc.Enum({
        Model: 0,
        UI: 1,
        UIEffect: 2,
        BattleEffect: 3,
        Audio: 4,
        DontDestroy: 5
    }),
    AudioChannelType: cc.Enum({
        Channel_UI: 0,
        Channel_Background: 1,
        Channel_Battle: 2
    }),
    StageType: cc.Enum({
        Stage_Endless: 0,
        Stage_Score: 1,
        Stage_Fruit: 2,
        Stage_ClearAll: 3,
        Stage_Boss: 4
    }),
    GameLoadModel: null,
    GameSize: new cc.Vec2(720, 1280),
    GamePercent: 1e4
}

/*GameDefine: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e3564ElJhhBx7F2WRcRET2a", "GameDefine"), t.exports = {
            LoadWay: cc.Enum({
                Single: 0,
                Mutil: 1,
                Dir: 2
            }),
            LoadModel: cc.Enum({
                Local: 0,
                Remote: 1
            }),
            UILayer: cc.Enum({
                NONE: -1,
                UI: 1200,
                UI_ALERT: 1400,
                UI_TIPS: 1500,
                UI_OTHER: 1600,
                UI_TOP: 1700,
                UI_GuideDialogue: 3e3
            }),
            CacheType: cc.Enum({
                Model: 0,
                UI: 1,
                UIEffect: 2,
                BattleEffect: 3,
                Audio: 4,
                DontDestroy: 5
            }),
            AudioChannelType: cc.Enum({
                Channel_UI: 0,
                Channel_Background: 1,
                Channel_Battle: 2
            }),
            StageType: cc.Enum({
                Stage_Endless: 0,
                Stage_Score: 1,
                Stage_Fruit: 2,
                Stage_ClearAll: 3,
                Stage_Boss: 4
            }),
            GameLoadModel: null,
            GameSize: new cc.Vec2(720, 1280),
            GamePercent: 1e4
        }, 
*/