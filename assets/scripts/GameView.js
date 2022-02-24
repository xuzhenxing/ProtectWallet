var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName"),
    s = require("GameConfig");
require("GameDefine");
var gameSDK = require("gameSDK")
var cfs = require("configStore");
var wxUtils = require("wxUtils");
var lwsdk = require("lwsdk")
var GameView = cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null,
        times: 0,
        NowLevel: 0,
        Next: 0,
        yNum: 0,
        ShowTitle: false,
    },
    Init: function Init(e) {
        console.log("=================gameview——INIT");
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode,
            this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable),
            n.ParseComponentByTable(this.viewNode, this.componentTable),
            // this.AddEvent(), 
            this.widgetTable.FashionBtn.on(cc.Node.EventType.TOUCH_END, this.fashionClick, this),
            this.widgetTable.MainBtn.on(cc.Node.EventType.TOUCH_END, this.MainClick, this),
            this.widgetTable.Choose1Btn.on(cc.Node.EventType.TOUCH_END, this.Choose1Click, this),
            this.widgetTable.Choose2Btn.on(cc.Node.EventType.TOUCH_END, this.Choose2Click, this),
            this.widgetTable.Choose3Btn.on(cc.Node.EventType.TOUCH_END, this.Choose3Click, this),
            this.widgetTable.MoneyBgBtn.on(cc.Node.EventType.TOUCH_END, this.MoneyBgClick, this),
            this.widgetTable.TipBtn.on(cc.Node.EventType.TOUCH_END, this.TipClick, this);
        this.widgetTable.close.on(cc.Node.EventType.TOUCH_END, this.closeClick, this);
        this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.GetBtnClick, this);
        this.widgetTable.backBtn.on(cc.Node.EventType.TOUCH_END, this.backClick, this);
        this.widgetTable.continue.on(cc.Node.EventType.TOUCH_END, this.ContinueClick, this);
        this.widgetTable.tipPanel.active = false
        window['fuhuo'] = false
        this.widgetTable.continue.active = false
        // cc.log("Init>>>>>>>>>>>>3");
        // adSdk.showBanner("玩法页面",true,true,10)
        if (cfs.default.ZJXJJ_FXCXLBY) {
            this.widgetTable.backBtn.active = true
        } else {
            this.widgetTable.backBtn.active = false
        }
        this.widgetTable.powerBG.active = false
        //  this.refreshLevelPlan()
        this.NowLevel = gm.DataManager.userData.NowMission
        this.componentTable.Now.string = gm.DataManager.userData.SetMission
        this.componentTable.Next.string = gm.DataManager.userData.SetMission + 1
        this.widgetTable.bgNext.active = false
        // console.log(this.NowLevel, gm.DataManager.userData.SetMission)
        if (this.NowLevel == 1 || this.NowLevel == 2 || this.NowLevel == 3) { //只有一小关
            this.widgetTable.bg1.active = false
            this.widgetTable.bg2.active = true
            this.widgetTable.bg3.active = false
            this.widgetTable.bg4.active = false
            this.widgetTable.bg5.active = false
            this.widgetTable.bg2.getChildByName("bg").active = false
        } else if (this.NowLevel == 4 || this.NowLevel == 29 || this.NowLevel == 5) { //有两小关
            this.widgetTable.bg1.active = false
            this.widgetTable.bg2.active = false
            this.widgetTable.bg3.active = false
            this.widgetTable.bg4.active = true
            this.widgetTable.bg5.active = true
            this.widgetTable.bg4.getChildByName("bg").active = false
            this.widgetTable.bg5.getChildByName("bg").active = false
        } else {
            this.widgetTable.bg1.active = true
            this.widgetTable.bg2.active = true
            this.widgetTable.bg3.active = true
            this.widgetTable.bg4.active = false
            this.widgetTable.bg5.active = false
            this.widgetTable.bg1.getChildByName("bg").active = false
            this.widgetTable.bg2.getChildByName("bg").active = false
            this.widgetTable.bg3.getChildByName("bg").active = false
        }
        cc.director.on("showContinue", this.ShowContinue.bind(this))
        cc.director.on("LevelProgress", this.refreshProgress.bind(this))

        console.log("=================gameview——INITOFF");

    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(),
            this.widgetTable.continue = "Continue",
            this.widgetTable.powerBG = "powerBG",
            this.widgetTable.bgNext = "Level/bgNext/Pass",
            this.widgetTable.bg1 = "Level/1",
            this.widgetTable.bg2 = "Level/2",
            this.widgetTable.bg3 = "Level/3",
            this.widgetTable.bg4 = "Level/4",
            this.widgetTable.bg5 = "Level/5",
            this.widgetTable.bg = "power/bg",
            this.widgetTable.backBtn = "backBtn",
            this.widgetTable.GetBtn = "tipPanel/GetBtn",
            this.widgetTable.close = "tipPanel/close",
            this.widgetTable.tipPanel = "tipPanel",
            this.widgetTable.FashionBtn = "FashionBtn",
            this.widgetTable.MainBtn = "MainBtn",
            this.widgetTable.MoneyBgBtn = "MoneyBgBtn",
            this.widgetTable.Choose = "Choose",
            this.widgetTable.Choose1Btn = "Choose/Choose1Btn",
            this.widgetTable.Choose1Ad = "Choose/Choose1Btn/Choose1Ad",
            this.widgetTable.Choose1Top = "Choose/Choose1Btn/Choose1Top",
            this.widgetTable.Choose1Right = "Choose/Choose1Btn/Choose1Right",
            this.widgetTable.Choose1Wrong = "Choose/Choose1Btn/Choose1Wrong",
            this.widgetTable.Choose1Arrow = "Choose/Choose1Btn/Choose1Arrow",
            this.widgetTable.Choose2Btn = "Choose/Choose2Btn",
            this.widgetTable.Choose2Ad = "Choose/Choose2Btn/Choose2Ad",
            this.widgetTable.Choose2Top = "Choose/Choose2Btn/Choose2Top",
            this.widgetTable.Choose2Right = "Choose/Choose2Btn/Choose2Right",
            this.widgetTable.Choose2Wrong = "Choose/Choose2Btn/Choose2Wrong",
            this.widgetTable.Choose2Arrow = "Choose/Choose2Btn/Choose2Arrow",
            this.widgetTable.Choose3Btn = "Choose/Choose3Btn",
            this.widgetTable.Choose3Ad = "Choose/Choose3Btn/Choose3Ad",
            this.widgetTable.Choose3Top = "Choose/Choose3Btn/Choose3Top",
            this.widgetTable.Choose3Right = "Choose/Choose3Btn/Choose3Right",
            this.widgetTable.Choose3Wrong = "Choose/Choose3Btn/Choose3Wrong",
            this.widgetTable.Choose3Arrow = "Choose/Choose3Btn/Choose3Arrow",
            this.widgetTable.Already = "CollectBg/Already",
            this.widgetTable.CollectBgNum = "CollectBg/Num",
            this.widgetTable.ChooseBlock = "ChooseBlock",
            this.widgetTable.TipBtn = "TipBtn",
            this.widgetTable.AD = "TipBtn/Background/AD",
            this.componentTable = new Array(),
            this.componentTable.Choose = ["Choose", "cc.Animation"],
            this.componentTable.CollectBgNum = ["CollectBg/Num", "cc.Label"],
            this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"],
            this.componentTable.Choose1Icon = ["Choose/Choose1Btn/Choose1Icon", "cc.Sprite"],
            this.componentTable.Choose2Icon = ["Choose/Choose2Btn/Choose2Icon", "cc.Sprite"],
            this.componentTable.Choose3Icon = ["Choose/Choose3Btn/Choose3Icon", "cc.Sprite"],
            this.componentTable.powerLabel = ["power/powerLabel", "cc.Label"],
            this.componentTable.time = ["power/time", "cc.Label"],
            this.componentTable.GoldLabel = ["goldBG/GoldLabel", "cc.Label"],
            this.componentTable.Now = ["Level/bg/Now", "cc.Label"],
            this.componentTable.Next = ["Level/bgNext/Next", "cc.Label"],
            this.componentTable.ChooseText1 = ["Choose/Choose1Btn/Ground/ChooseText", "cc.Label"],
            this.componentTable.ChooseText2 = ["Choose/Choose2Btn/Ground/ChooseText", "cc.Label"];
    },

    ShowContinue() {
        this.widgetTable.continue.active = true
    },
    ContinueClick() {
        this.widgetTable.continue.active = false
        cc.director.resume()
    },
    refreshLevelPlan() {
        console.log("gm.DataManager.userData.NowMissiongm.DataManager.userData.NowMission")
        console.log(gm.DataManager.userData.NowMission,gm.DataManager.userData.SetMission)
        console.log(this.Next)
        this.NowLevel = gm.DataManager.userData.NowMission
        this.componentTable.Now.string = gm.DataManager.userData.SetMission
        this.componentTable.Next.string = gm.DataManager.userData.SetMission + 1
        this.widgetTable.bgNext.active = false
        if (this.NowLevel == 1 || this.NowLevel == 2 || this.NowLevel == 3) { //只有一小关
            this.widgetTable.bg1.active = false
            this.widgetTable.bg2.active = true
            this.widgetTable.bg3.active = false
            this.widgetTable.bg4.active = false
            this.widgetTable.bg5.active = false
            if (this.Next == 0) {
                this.widgetTable.bg2.getChildByName("bg").active = true
            } else {
                this.widgetTable.bg2.getChildByName("bg").active = false
            }
            // this.widgetTable.bg2.getChildByName("bg").active = false
        } else if (this.NowLevel == 4 || this.NowLevel == 29 || this.NowLevel == 5) { //有两小关
            this.widgetTable.bg1.active = false
            this.widgetTable.bg2.active = false
            this.widgetTable.bg3.active = false
            this.widgetTable.bg4.active = true
            this.widgetTable.bg5.active = true
            if (this.Next == 0) {
                this.widgetTable.bg4.getChildByName("bg").active = true
                this.widgetTable.bg5.getChildByName("bg").active = false
            } else if (this.Next == 1) {
                this.widgetTable.bg4.getChildByName("bg").active = true
                this.widgetTable.bg5.getChildByName("bg").active = true
            } else {
                this.widgetTable.bg4.getChildByName("bg").active = false
                this.widgetTable.bg5.getChildByName("bg").active = false
            }

        } else {
            this.widgetTable.bg1.active = true
            this.widgetTable.bg2.active = true
            this.widgetTable.bg3.active = true
            if (this.Next == 0) {
                this.widgetTable.bg1.getChildByName("bg").active = true
                this.widgetTable.bg2.getChildByName("bg").active = false
                this.widgetTable.bg3.getChildByName("bg").active = false
            } else if (this.Next == 1) {
                this.widgetTable.bg1.getChildByName("bg").active = true
                this.widgetTable.bg2.getChildByName("bg").active = true
                this.widgetTable.bg3.getChildByName("bg").active = false
            } else if (this.Next == 2) {
                this.widgetTable.bg1.getChildByName("bg").active = true
                this.widgetTable.bg2.getChildByName("bg").active = true
                this.widgetTable.bg3.getChildByName("bg").active = false

            } else if (this.Next == 3) {
                this.widgetTable.bg1.getChildByName("bg").active = true
                this.widgetTable.bg2.getChildByName("bg").active = true
                this.widgetTable.bg3.getChildByName("bg").active = true

            } else {
                this.widgetTable.bg1.getChildByName("bg").active = false
                this.widgetTable.bg2.getChildByName("bg").active = false
                this.widgetTable.bg3.getChildByName("bg").active = false
            }
            this.widgetTable.bg4.active = false
            this.widgetTable.bg5.active = false

        }
    },
    refreshLabel() {
        this.componentTable.powerLabel.string = gm.DataManager.userData.power
        this.componentTable.GoldLabel.string = gm.DataManager.userData.gold

    },
    backClick() {
        // console.log("我点击了假退出  游戏界面", cfs.default.ZJXJJ_FXCXLBY);
        // adSdk.hideBanner()
        if (cfs.default.ZJXJJ_FXCXLBY) {
            cc.loader.loadRes("Prefabs/Panel/otherGames/falseDialogGame", (err, spf) => {
                var back = cc.instantiate(spf);
                back.parent = this.baseUIView.viewNode;
                back.position = cc.v2(375, 667);
                back.zIndex = 100000
            })

        }
    },
    closeClick() {
        this.widgetTable.tipPanel.active = false
    },
    GetBtnClick() {
        // console.log("主界面  cfs.default.ZJXJJ_SPKG", cfs.default.ZJXJJ_SPKG)
        if (cfs.default.ZJXJJ_SPKG) {
            gameSDK.gameSDK.showVideoAd(() => {
                gm.DataManager.userData.Tip++;
                // heartbeatSchedule.default.emitEvent()
                if (window['wx']) {
                    lwsdk.setToServer({
                        dataKey: "girlData",
                        dataType: "girlData",
                        data: gm.DataManager.userData,
                        expireTime: 3600
                    })
                }
                wxUtils.default.showToast("恭喜你获得了奖励!")
            }, "ZJXJJ-GGJL")
        } else {
            wxUtils.default.showToast("今日暂无分享视频!")
        }
    },
    fashionClick() {
        console.log("我点击了FashionBtn")
        gm.UIManager.SendNotification(o.MOD_FashionView, a.UIInfo_ShowView, null);
    },
    MainClick() {
        console.log("我点击了MainBtn"),
            gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_CloseView, null);
    },
    Choose1Click() {
        console.log("我点击了Choose1Btn"),
            this.ChooseAction(1);
    },
    Choose2Click() {
        console.log("我点击了Choose2Btn"),
            this.ChooseAction(2);
    },
    Choose3Click() {
        console.log("我点击了Choose3Btn"),
            this.ChooseAction(3);
    },
    MoneyBgClick() {
        console.log("我点击了MoneyBgBtn");
        this.widgetTable.tipPanel.active = true

    },
    TipClick() {
        // console.log("提示灯不足视频按钮 cfs.default.ZJXJJ_TSDBZ", cfs.default.ZJXJJ_TSDBZ)
        if (cfs.default.ZJXJJ_TSDBZ && gm.DataManager.userData.Tip < 1) {
            gameSDK.gameSDK.showVideoAd(() => {
                gm.DataManager.userData.Tip++;
                // heartbeatSchedule.default.emitEvent()
                if (window['wx']) {
                    lwsdk.setToServer({
                        dataKey: "girlData",
                        dataType: "girlData",
                        data: gm.DataManager.userData,
                        expireTime: 3600
                    })
                }
                wxUtils.default.showToast("恭喜你获得了奖励!")
            }, "ZJXJJ-TSDBZ")
        } else if (gm.DataManager.userData.Tip >= 1) {
            gm.DataManager.userData.Tip--, gm.DataBase.SaveUserData(), this.AfterAd()
        } else {
            wxUtils.default.showToast("今日暂无分享视频!")
        }
        console.log("我点击了TipBtn")
        // gm.DataManager.userData.Tip < 1 ? gameSDK.gameSDK.showVideoAd(()=>{
        //     gm.DataManager.userData.Tip++;
        //     heartbeatSchedule.default.emitEvent()
        // },"ZJXJJ-TSDBZ") : (gm.DataManager.userData.Tip--, gm.DataBase.SaveUserData(), this.AfterAd());

    },
    AfterAd: function AfterAd() {
        gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_ShowGameTip, null);
    },
    ChooseAction: function ChooseAction(e) {
        if (!this.widgetTable.ChooseBlock.active) {
            gm.AdManager.reportAnalytics("ChooseTime", {
                Level: gm.DataManager.userData.NowMission,
                Mission: gm.GameData.NowPorgress,
                Choose: e
            });
            var t = gm.GameData.GetActionType(e);
            switch (this.lastChoose = e, cc.log(t), t) {
                case 1:
                    this.Next = gm.GameData.NowPorgress
                    this.refreshLevelPlan()
                    if (this.Next == 0) {
                        if (this.NowLevel == 1 || this.NowLevel == 2 || this.NowLevel == 3) { //只有一小关
                            this.widgetTable.bg2.getChildByName("bg").active = true
                            this.widgetTable.bgNext.active = true
                            this.Next = 4
                        } else if (this.NowLevel == 4 || this.NowLevel == 29 || this.NowLevel == 5) { //有两小关
                            this.widgetTable.bg4.getChildByName("bg").active = true
                        } else {
                            this.widgetTable.bg1.getChildByName("bg").active = true
                        }
                    } else if (this.Next == 1) {
                        if (this.NowLevel == 4 && this.NowLevel == 29 || this.NowLevel == 5) { //有两小关
                            this.widgetTable.bg4.getChildByName("bg").active = true
                            this.widgetTable.bg5.getChildByName("bg").active = true
                            this.Next = 4
                            this.widgetTable.bgNext.active = true
                        } else {
                            this.widgetTable.bg1.getChildByName("bg").active = true
                            this.widgetTable.bg2.getChildByName("bg").active = true
                        }
                    } else if (this.Next == 2) {
                        this.Next = 4
                        this.widgetTable.bg1.getChildByName("bg").active = true
                        this.widgetTable.bg2.getChildByName("bg").active = true
                        this.widgetTable.bg3.getChildByName("bg").active = true
                        this.widgetTable.bgNext.active = true
                    }
                    gm.GameLogic.playWinAni();
                    break;
                case 2:
                    gm.GameLogic.PlayFailAni();
                    break;
                case 3:
                    gm.GameLogic.PlayAdAni();
            }
            this.widgetTable.ChooseBlock.active = !0, this.widgetTable.TipBtn.active = false, this.widgetTable["Choose" + e + "Top"].active = !0, this.widgetTable.Choose1Arrow.active = !1, this.widgetTable.Choose2Arrow.active = !1, this.widgetTable.Choose3Arrow.active = !1;
        }
    },
    // AddEvent: function AddEvent() {
    //     for (var e in this.widgetTable) {
    //         if (this.widgetTable.hasOwnProperty(e)) {
    //             var t = this.widgetTable[e]; - 1 != t.name.indexOf("Btn") && t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
    //         }
    //     }
    // },
    OnUpdate: function OnUpdate(e) {
        let self = this
        null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
        if (gm.DataManager.userData.power < 5) {
            if (this.componentTable) {
                if (this.widgetTable.bg) {
                    this.widgetTable.bg.active = true
                }
            }
            this.times++
            if (this.times >= 60) {
                this.times = 0
                var s = gm.DataManager.userData.powerNum
                var minute = Math.floor(s / 60)
                var second = s % 60
                if (second < 10) {
                    second = "0" + second
                    if (this.componentTable && this.widgetTable) {
                        self.refreshLabel()
                    }
                }
                if (this.componentTable && this.widgetTable) {
                    if (this.componentTable.time) {
                        this.componentTable.time.string = minute + ":" + second
                    }
                }
            }
        } else {
            if (this.componentTable && this.widgetTable) {
                if (this.componentTable.time) {
                    this.widgetTable.bg.active = false
                    this.componentTable.time.string = ''
                }
            }
        }
        if (window["powerShow"]) {
            this.yNum++
            if (this.yNum >= 3) {
                this.yNum = 0
                this.widgetTable.powerBG.y += 3
                if (this.widgetTable.powerBG.y >= 680) {
                    this.widgetTable.powerBG.y = 600
                    this.widgetTable.powerBG.active = false
                    window["powerShow"] = false
                }
            }
        }
        // var time = gm.DataManager.userData.powerNum
    },
    ShowView: function ShowView() {
        console.log("=======================ShowView");
        if (window["powerShow"]) {
            this.Next = 5
            this.widgetTable.powerBG.active = true
            this.refreshLevelPlan()
        }
        // this.refreshLevelPlan()
        gm.AdManager.BeginRecord(),
            this.widgetTable.Choose.active = !1,
            this.widgetTable.Choose.scale = 0,
            this.widgetTable.ChooseBlock.active = !0,
            // this.widgetTable.TipBtn.active = !1,
            this.widgetTable.TipBtn.active = false,
            gm.GameLogic.playProcessAni(),
            this.RefreshChooseIcon(),
            this.widgetTable.AD.active = gm.DataManager.userData.Tip < 1;

    },
    RefreshChooseIcon: function RefreshChooseIcon() {
        // debugger
        this.RefreshAllIcon(),
            this.refreshLabel()
        this.widgetTable.Choose1Btn.active = null != gm.GameData.GetActionType(1),
            this.widgetTable.Choose2Btn.active = null != gm.GameData.GetActionType(2),
            this.widgetTable.Choose3Btn.active = null != gm.GameData.GetActionType(3),
            this.widgetTable.Choose1Ad.active = 3 == gm.GameData.GetActionType(1),
            this.widgetTable.Choose2Ad.active = 3 == gm.GameData.GetActionType(2),
            this.widgetTable.Choose3Ad.active = 3 == gm.GameData.GetActionType(3),
            this.widgetTable.Choose1Right.active = !1, this.widgetTable.Choose2Right.active = !1,
            this.widgetTable.Choose3Right.active = !1, this.widgetTable.Choose1Wrong.active = !1,
            this.widgetTable.Choose2Wrong.active = !1, this.widgetTable.Choose3Wrong.active = !1,
            this.widgetTable.Choose1Arrow.active = !1, this.widgetTable.Choose2Arrow.active = !1,
            this.widgetTable.Choose3Arrow.active = !1, this.widgetTable.Choose1Top.active = !1,
            this.widgetTable.Choose2Top.active = !1, this.widgetTable.Choose3Top.active = !1;
    },
    RefreshAllIcon: function RefreshAllIcon() {
        var e = this,
            t = gm.GameData.GetActionIcon(1);
        // console.log(gm.DataManager.userData.LittleMission,"gm.DataManager.userData.LittleMission===")
        console.log(gm.DataManager.userData.NowMission - 1,((gm.DataManager.userData.LittleMission + 1) * 2) - 1,gm.DataManager.userData.NowMission,gm.DataManager.userData.LittleMission)
        console.log(gm.DataManager.userData.NowMission, "gm.DataManager.userData.LittleMission===")
        null != t && (cc.log(t), cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                null == t ? e.componentTable.Choose1Icon.spriteFrame = i : cc.error(t);
                e.componentTable.ChooseText1.string = window['ChooseHint'].json[gm.DataManager.userData.NowMission - 1][((gm.DataManager.userData.LittleMission + 1) * 2) - 1]
            })),
            null != (t = gm.GameData.GetActionIcon(2)) && (cc.log(t),
                cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                    null == t ? e.componentTable.Choose2Icon.spriteFrame = i : cc.error(t);
                    e.componentTable.ChooseText2.string = window['ChooseHint'].json[gm.DataManager.userData.NowMission - 1][(gm.DataManager.userData.LittleMission + 1) * 2]
                })),
            null != (t = gm.GameData.GetActionIcon(3)) && (cc.log(t),
                cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                    null == t ? e.componentTable.Choose3Icon.spriteFrame = i : cc.error(t);

                }));
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {

        if (this.ShowTitle) {
            this.Next = 4
            this.ShowTitle = false
            this.refreshLevelPlan()
        }
        var t = this;
        switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.AD_RVPlayComplete:
                e.body == s.AdPlayType_MainViewTip && this.AfterAd();
                break;
            case a.UIInfo_ShowGameTip:
                this.widgetTable.TipBtn.active = false, 1 == gm.GameData.GetActionType(1) &&
                    (this.widgetTable.Choose1Arrow.active = !0), 1 == gm.GameData.GetActionType(2) &&
                    (this.widgetTable.Choose2Arrow.active = !0), 11 == gm.GameData.GetActionType(3) &&
                    (this.widgetTable.Choose3Arrow.active = !0);
                break;
            case a.UIInfo_ShowChoose:
                this.widgetTable.Choose.active = true, this.componentTable.Choose.play(),
                    this.widgetTable.ChooseBlock.active = !1, this.widgetTable.TipBtn.active = false;
                break;
            case a.UIInfo_ShowWin:
                gm.GameData.NowPorgress++, gm.GameData.CheckHadNextProgress() ?
                    gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_ShowView, null) :
                    window['show'] ? (gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_CloseView, null),
                        this.ShowTitle = true, gm.UIManager.SendNotification(o.MOD_LevelView, a.UIInfo_ShowView, null)) : this.loadAnswer();
                break;
            case a.UIInfo_ShowFail:
                gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_CloseView, null),
                    gm.UIManager.SendNotification(o.MOD_LevelFailView, a.UIInfo_ShowView, null);
                break;
            case a.UIInfo_ShowADWin:
                break;
            case a.UIInfo_ShowUIRight:
                switch (this.lastChoose) {
                    case 1:
                        this.widgetTable.Choose1Right.active = !0;
                        break;
                    case 2:
                        this.widgetTable.Choose2Right.active = !0;
                        break;
                    case 3:
                        this.widgetTable.Choose3Right.active = !0;
                }
                setTimeout(function () {
                    t.componentTable.Choose.play("selectIconCloseAnim");
                }, 1e3);
                break;
            case a.UIInfo_ShowUIWrong:
                switch (this.lastChoose) {
                    case 1:
                        this.widgetTable.Choose1Wrong.active = !0;
                        break;
                    case 2:
                        this.widgetTable.Choose2Wrong.active = !0;
                        break;
                    case 3:
                        this.widgetTable.Choose3Wrong.active = !0;
                }
                setTimeout(function () {
                    t.componentTable.Choose.play("selectIconCloseAnim");
                }, 1e3);
                break;
            case a.UIInfo_Revival:
                this.ShowView();

        }
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.AD_RVPlayComplete),
            this.baseUIView.PushNotification(a.UIInfo_ShowChoose),
            this.baseUIView.PushNotification(a.UIInfo_ShowWin),
            this.baseUIView.PushNotification(a.UIInfo_ShowFail),
            this.baseUIView.PushNotification(a.UIInfo_ShowADWin),
            this.baseUIView.PushNotification(a.UIInfo_ShowGameTip);
    },
    refreshProgress() {
        console.log("刷新进度")
        window['fuhuo'] ? (this.Next = gm.GameData.NowPorgress - 1, this.refreshLevelPlan(), window['fuhuo'] = false) :
            (this.refreshLevelPlan(), window['fuhuo'] = false, this.Next = 4, this.ShowTitle = true)
    },
    Dispose: function Dispose() {},
    loadAnswer() {
        let sR = window['AnswerJSON'].json[0].Simple
        let sM = window['AnswerJSON'].json[1].Middle
        let sD = window['AnswerJSON'].json[2].Difficulty
        var indexR = 0
        var indexM = 0
        var indexD = 0
        for (var i in sR) {
            indexR++
        }
        for (var i in sM) {
            indexM++
        }
        for (var i in sD) {
            indexD++
        }
        var RSimple = Math.floor(Math.random() * (indexR - 2) + 1);
        var RMiddle = Math.floor(Math.random() * (indexM - 2) + 1);
        var RDifficulty = Math.floor(Math.random() * (indexD - 2) + 1);
        window['RSimple'] = RSimple
        window['RMiddle'] = RMiddle
        window['RDifficulty'] = RDifficulty
        cc.loader.loadRes("ui/AnswerView", (err, AnsPre) => {
            var answerClone = cc.instantiate(AnsPre)
            answerClone.parent = this.baseUIView.viewNode;
            if (gm.DataManager.userData.MaxMission <= 20) {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.C
                if (window['AnswerJSON'].json[0].Simple[RSimple].answer.D == undefined || window['AnswerJSON'].json[0].Simple[RSimple].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.D
                }
            } else if (gm.DataManager.userData.MaxMission > 20 && gm.DataManager.userData.MaxMission <= 50) {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.C
                if (window['AnswerJSON'].json[1].Middle[RMiddle].answer.D == undefined || window['AnswerJSON'].json[1].Middle[RMiddle].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.D
                }
            } else {
                answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].quest
                answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.A
                answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.B
                answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.C
                if (window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D == undefined || window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D == null) {
                    answerClone.getChildByName("BGD").active = false
                } else {
                    answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D
                }
            }
        })
    },
})
module.exports = GameView
window["GameView"]=new GameView()
/*GameView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a3678i0/M9JnLBK63Vdgw/e", "GameView");
        var n = r(e("util")),
            a = r(e("UIInfo")),
            o = r(e("ConstModName")),
            s = r(e("GameConfig"));
        r(e("GameDefine"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                baseUIView: null,
                viewNode: null,
                widgetTable: null,
                componentTable: null,
                DataModule: null
            },
            Init: function Init(e) {
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.AddEvent(), cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.widgetTable.FashionBtn = "FashionBtn", this.widgetTable.MainBtn = "MainBtn", this.widgetTable.MoneyBgBtn = "MoneyBgBtn", this.widgetTable.Choose = "Choose", this.widgetTable.Choose1Btn = "Choose/Choose1Btn", this.widgetTable.Choose1Ad = "Choose/Choose1Btn/Choose1Ad", this.widgetTable.Choose1Top = "Choose/Choose1Btn/Choose1Top", this.widgetTable.Choose1Right = "Choose/Choose1Btn/Choose1Right", this.widgetTable.Choose1Wrong = "Choose/Choose1Btn/Choose1Wrong", this.widgetTable.Choose1Arrow = "Choose/Choose1Btn/Choose1Arrow", this.widgetTable.Choose2Btn = "Choose/Choose2Btn", this.widgetTable.Choose2Ad = "Choose/Choose2Btn/Choose2Ad", this.widgetTable.Choose2Top = "Choose/Choose2Btn/Choose2Top", this.widgetTable.Choose2Right = "Choose/Choose2Btn/Choose2Right", this.widgetTable.Choose2Wrong = "Choose/Choose2Btn/Choose2Wrong", this.widgetTable.Choose2Arrow = "Choose/Choose2Btn/Choose2Arrow", this.widgetTable.Choose3Btn = "Choose/Choose3Btn", this.widgetTable.Choose3Ad = "Choose/Choose3Btn/Choose3Ad", this.widgetTable.Choose3Top = "Choose/Choose3Btn/Choose3Top", this.widgetTable.Choose3Right = "Choose/Choose3Btn/Choose3Right", this.widgetTable.Choose3Wrong = "Choose/Choose3Btn/Choose3Wrong", this.widgetTable.Choose3Arrow = "Choose/Choose3Btn/Choose3Arrow", this.widgetTable.Already = "CollectBg/Already", this.widgetTable.CollectBgNum = "CollectBg/Num", this.widgetTable.ChooseBlock = "ChooseBlock", this.widgetTable.TipBtn = "TipBtn", this.widgetTable.AD = "TipBtn/Background/AD", this.componentTable = new Array(), this.componentTable.Choose = ["Choose", "cc.Animation"], this.componentTable.CollectBgNum = ["CollectBg/Num", "cc.Label"], this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"], this.componentTable.Choose1Icon = ["Choose/Choose1Btn/Choose1Icon", "cc.Sprite"], this.componentTable.Choose2Icon = ["Choose/Choose2Btn/Choose2Icon", "cc.Sprite"], this.componentTable.Choose3Icon = ["Choose/Choose3Btn/Choose3Icon", "cc.Sprite"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (e.currentTarget.name) {
                    case "FashionBtn":
                        gm.UIManager.SendNotification(o.default.MOD_FashionView, a.default.UIInfo_ShowView, null);
                        break;
                    case "MainBtn":
                        gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.default.MOD_BeginView, a.default.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_CloseView, null);
                        break;
                    case "Choose1Btn":
                        this.ChooseAction(1);
                        break;
                    case "Choose2Btn":
                        this.ChooseAction(2);
                        break;
                    case "Choose3Btn":
                        this.ChooseAction(3);
                        break;
                    case "MoneyBgBtn":
                        break;
                    case "TipBtn":
                        gm.DataManager.userData.Tip < 1 ? gm.AdManager.playVideo(s.default.AdPlayType_MainViewTip) : (gm.DataManager.userData.Tip--, gm.DataBase.SaveUserData(), this.AfterAd());
                }
            },
            AfterAd: function AfterAd() {
                gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_ShowGameTip, null);
            },
            ChooseAction: function ChooseAction(e) {
                if (!this.widgetTable.ChooseBlock.active) {
                    gm.AdManager.reportAnalytics("ChooseTime", {
                        Level: gm.DataManager.userData.NowMission,
                        Mission: gm.GameData.NowPorgress,
                        Choose: e
                    });
                    var t = gm.GameData.GetActionType(e);
                    switch (this.lastChoose = e, cc.log(t), t) {
                        case 1:
                            gm.GameLogic.playWinAni();
                            break;
                        case 2:
                            gm.GameLogic.PlayFailAni();
                            break;
                        case 3:
                            gm.GameLogic.PlayAdAni();
                    }
                    this.widgetTable.ChooseBlock.active = !0, this.widgetTable.TipBtn.active = !1, this.widgetTable["Choose" + e + "Top"].active = !0, this.widgetTable.Choose1Arrow.active = !1, this.widgetTable.Choose2Arrow.active = !1, this.widgetTable.Choose3Arrow.active = !1;
                }
            },
            AddEvent: function AddEvent() {
                for (var e in this.widgetTable) {
                    if (this.widgetTable.hasOwnProperty(e)) {
                        var t = this.widgetTable[e]; - 1 != t.name.indexOf("Btn") && t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
                    }
                }
            },
            OnUpdate: function OnUpdate(e) {
                null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
            },
            ShowView: function ShowView() {
                gm.AdManager.BeginRecord(), this.widgetTable.Choose.active = !1, this.widgetTable.Choose.scale = 0, this.widgetTable.ChooseBlock.active = !0, this.widgetTable.TipBtn.active = !1, gm.GameLogic.playProcessAni(), this.RefreshChooseIcon(), this.widgetTable.AD.active = gm.DataManager.userData.Tip < 1;
            },
            RefreshChooseIcon: function RefreshChooseIcon() {
                this.widgetTable.Choose1Btn.active = null != gm.GameData.GetActionType(1), this.widgetTable.Choose2Btn.active = null != gm.GameData.GetActionType(2), this.widgetTable.Choose3Btn.active = null != gm.GameData.GetActionType(3), this.widgetTable.Choose1Ad.active = 3 == gm.GameData.GetActionType(1), this.widgetTable.Choose2Ad.active = 3 == gm.GameData.GetActionType(2), this.widgetTable.Choose3Ad.active = 3 == gm.GameData.GetActionType(3), this.RefreshAllIcon(), this.widgetTable.Choose1Right.active = !1, this.widgetTable.Choose2Right.active = !1, this.widgetTable.Choose3Right.active = !1, this.widgetTable.Choose1Wrong.active = !1, this.widgetTable.Choose2Wrong.active = !1, this.widgetTable.Choose3Wrong.active = !1, this.widgetTable.Choose1Arrow.active = !1, this.widgetTable.Choose2Arrow.active = !1, this.widgetTable.Choose3Arrow.active = !1, this.widgetTable.Choose1Top.active = !1, this.widgetTable.Choose2Top.active = !1, this.widgetTable.Choose3Top.active = !1;
            },
            RefreshAllIcon: function RefreshAllIcon() {
                var e = this,
                    t = gm.GameData.GetActionIcon(1);
                null != t && (cc.log(t), cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                    null == t ? e.componentTable.Choose1Icon.spriteFrame = i : cc.error(t);
                })), null != (t = gm.GameData.GetActionIcon(2)) && (cc.log(t), cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                    null == t ? e.componentTable.Choose2Icon.spriteFrame = i : cc.error(t);
                })), null != (t = gm.GameData.GetActionIcon(3)) && (cc.log(t), cc.loader.loadRes("Texture/Props/" + t, cc.SpriteFrame, function (t, i) {
                    null == t ? e.componentTable.Choose3Icon.spriteFrame = i : cc.error(t);
                }));
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                var t = this;
                switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.AD_RVPlayComplete:
                        e.body == s.default.AdPlayType_MainViewTip && this.AfterAd();
                        break;
                    case a.default.UIInfo_ShowGameTip:
                        this.widgetTable.TipBtn.active = !1, 1 == gm.GameData.GetActionType(1) && (this.widgetTable.Choose1Arrow.active = !0), 1 == gm.GameData.GetActionType(2) && (this.widgetTable.Choose2Arrow.active = !0), 11 == gm.GameData.GetActionType(3) && (this.widgetTable.Choose3Arrow.active = !0);
                        break;
                    case a.default.UIInfo_ShowChoose:
                        this.widgetTable.Choose.active = !0, this.componentTable.Choose.play(), this.widgetTable.ChooseBlock.active = !1, this.widgetTable.TipBtn.active = !0;
                        break;
                    case a.default.UIInfo_ShowWin:
                        gm.GameData.NowPorgress++, gm.GameData.CheckHadNextProgress() ? gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_ShowView, null) : (gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.default.MOD_LevelView, a.default.UIInfo_ShowView, null));
                        break;
                    case a.default.UIInfo_ShowFail:
                        gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.default.MOD_LevelFailView, a.default.UIInfo_ShowView, null);
                        break;
                    case a.default.UIInfo_ShowADWin:
                        break;
                    case a.default.UIInfo_ShowUIRight:
                        switch (cc.log("?????????????????????"), cc.log(this.lastChoose), this.lastChoose) {
                            case 1:
                                this.widgetTable.Choose1Right.active = !0;
                                break;
                            case 2:
                                this.widgetTable.Choose2Right.active = !0;
                                break;
                            case 3:
                                this.widgetTable.Choose3Right.active = !0;
                        }
                        setTimeout(function () {
                            t.componentTable.Choose.play("selectIconCloseAnim");
                        }, 1e3);
                        break;
                    case a.default.UIInfo_ShowUIWrong:
                        switch (this.lastChoose) {
                            case 1:
                                this.widgetTable.Choose1Wrong.active = !0;
                                break;
                            case 2:
                                this.widgetTable.Choose2Wrong.active = !0;
                                break;
                            case 3:
                                this.widgetTable.Choose3Wrong.active = !0;
                        }
                        setTimeout(function () {
                            t.componentTable.Choose.play("selectIconCloseAnim");
                        }, 1e3);
                        break;
                    case a.default.UIInfo_Revival:
                        this.ShowView();
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.AD_RVPlayComplete), this.baseUIView.PushNotification(a.default.UIInfo_ShowChoose), this.baseUIView.PushNotification(a.default.UIInfo_ShowWin), this.baseUIView.PushNotification(a.default.UIInfo_ShowFail), this.baseUIView.PushNotification(a.default.UIInfo_ShowADWin), this.baseUIView.PushNotification(a.default.UIInfo_ShowGameTip);
            },
            Dispose: function Dispose() {}
        }), 
*/