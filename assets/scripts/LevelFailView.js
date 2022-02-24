var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName"),
    s = require("GameConfig");
require("GameDefine");
var gameview=require("GameView")
var gameSDK = require("gameSDK")
var lwsdk = require("lwsdk");
var cfs = require("configStore")
var wxUtils = require("wxUtils");
var levelFailView = cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null
    },
    Init: function Init(e) {
        window['levelFailView'] = this;
        // console.log(this.node)
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable),
            n.ParseComponentByTable(this.viewNode, this.componentTable), this.componentTable.NodeAni = this.viewNode.getComponent(cc.Animation),
            // this.AddEvent(),
            // this.widgetTable.ShareCloseBtn.active = !1;
            // this.widgetTable.ShareBtn.active = !1;
            this.widgetTable.AdRevival.active = !1;
        this.widgetTable.Continue.active = !1,
            this.widgetTable.Close.active = !1;
        // this.widgetTable.checkmark.active =!1;
        this.widgetTable.MoneyRevival.active = !0;
        // console.log(this.widgetTable.AdRevival.active,"this.widgetTable.AdRevival.active",this.widgetTable.AdRevival.position)
        // this.widgetTable.ShareBtn.on(cc.Node.EventType.TOUCH_END,this.shareClick,this),
        this.widgetTable.ShareCloseBtn.on(cc.Node.EventType.TOUCH_END, this.ShareCloseClick, this),
            this.widgetTable.MoneyRevival.on(cc.Node.EventType.TOUCH_END, this.MoneyRevivalClick, this),
            this.widgetTable.AdRevival.on(cc.Node.EventType.TOUCH_END, this.AdRevivalClick, this),
            this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.checkmarkClick, this);
        this.widgetTable.Add.on(cc.Node.EventType.TOUCH_END, this.AddClick, this)
        this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.GetBtnClick, this)
        this.widgetTable.close.on(cc.Node.EventType.TOUCH_END, this.closeClick, this)
        this.widgetTable.backBtn.on(cc.Node.EventType.TOUCH_END, this.backClick, this)
        this.widgetTable.Back.on(cc.Node.EventType.TOUCH_END, this.BackBtnClick, this) //新
        this.widgetTable.BackClose.on(cc.Node.EventType.TOUCH_END, this.BackCloseClick, this) //新

        this.widgetTable.tipPanel.active = false
        // cc.log("Init>>>>>>>>>>>>4");
        // adSdk.showBanner("结算页", true, true, 10)
        if (cfs.default.ZJXJJ_FXCXLBY) {
            this.widgetTable.backBtn.active = true
        } else {
            this.widgetTable.backBtn.active = false
        }
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(), this.widgetTable.Back = "fuhuo/Back",
            this.widgetTable.BackClose = "fuhuo/BackClose",
            this.widgetTable.backBtn = "backBtn",
            this.widgetTable.tipPanel = "tipPanel",
            this.widgetTable.close = "tipPanel/close",
            this.widgetTable.GetBtn = "tipPanel/GetBtn",
            this.widgetTable.ShareBtn = "ShareBtn",
            this.widgetTable.Add = "MoneyBgBtn/Add",
            this.widgetTable.ShareCloseBtn = "ShareCloseBtn",
            this.widgetTable.MoneyRevival = "MoneyRevival",
            this.widgetTable.AdRevival = "AdRevival",
            this.widgetTable.Continue = "Continue",
            this.widgetTable.Close = "Close",
            this.widgetTable.checkmark = "Close/Background/checkmark",
            this.componentTable = new Array(),
            // this.componentTable.ShareBtn = ["ShareBtn", "cc.Animation"],
            this.componentTable.AdRevival = ["AdRevival", "cc.Animation"],
            this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"],
            this.componentTable.checkmark = ["Close/Background/checkmark", "cc.Sprite"],
            this.componentTable.BackLabel = ["fuhuo/BackLabel", "cc.Label"];
    },
    BackBtnClick() {
        // if (gm.DataManager.userData.Tip > 0) {
        //     gm.DataManager.userData.Tip--
        //     // heartbeatSchedule.default.emitEvent()
        //     if (window['wx']) {
        //         lwsdk.setToServer({
        //             dataKey: "girlData",
        //             dataType: "girlData",
        //             data: gm.DataManager.userData,
        //             expireTime: 3600
        //         })
        //         gm.DataBase.SaveUserData(), this.AfterAd()
        //     }
        // } else {
        //     wxUtils.default.showToast("复活次数不足") //TODO
        //     console.log("提示等不足")

        // }

    },
    BackCloseClick() {
        this.widgetTable.BackClose.parent.active = false
    },
    backClick() {
        console.log("我点击了假退出 失败界面", cfs.default.ZJXJJ_FXCXLBY);
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
    GetBtnClick() {
        console.log("点击失败结算页的看视频获取提示灯 ,cfs.default.ZJXJJ_SPKG", cfs.default.ZJXJJ_SPKG)
        if (cfs.default.ZJXJJ_SPKG) {
            gameSDK.gameSDK.showVideoAd(() => {
                gm.DataManager.userData.Tip++;
                // heartbeatSchedule.default.emitEvent()
                lwsdk.setToServer({
                    dataKey: "girlData",
                    dataType: "girlData",
                    data: gm.DataManager.userData,
                    expireTime: 3600
                })
                wxUtils.default.showToast("恭喜你获得了奖励!")
            }, "ZJXJJ-GGJL")
        } else {
            wxUtils.default.showToast("今日暂无分享视频!")
        }
    },
    closeClick() {
        this.widgetTable.tipPanel.active = false
    },
    AddClick() {
        console.log("点击失败结算页的看视频Add按钮")
        this.widgetTable.tipPanel.active = true
        // if (cfs.default.ZJXJJ_SPKG) {
        //     gameSDK.gameSDK.showVideoAd(() => {
        //         gm.DataManager.userData.Tip++;
        //         heartbeatSchedule.default.emitEvent()
        //     }, "ZJXJJ-GGJL")
        // } else {
        //     wxUtils.default.showToast("今日暂无分享视频!")
        // }
    },
    shareClick() {
        console.log('点击shareClick按钮')
        gm.AdManager.EndRecord(s.AdPlayType_LevelFailViewShare, !0);
    },
    ShareCloseClick() {
        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                cc.audioEngine.playMusic(f, true);
            });
        }
        console.log('点击ShareCloseClick按钮');
        // adSdk.showBanner("结算页", true, true, 10)
        this.widgetTable.MoneyRevival.active = false;
        this.widgetTable.ShareCloseBtn.active = false
        // this.ShowProgress(2);
        //将复活界面隐藏
        this.baseUIView.viewNode.getChildByName("fuhuo").active = false
        this.widgetTable.Continue.active = true
        this.widgetTable.AdRevival.active = true
        // this.widgetTable.Close.active = true
        // gm.DataManager.userData.LittleMission=0

    },
    MoneyRevivalClick() {

        lwsdk.setSceneEvent({
            sceneName: "第" + gm.DataManager.userData.SetMission + "-" + (window.Mission) + "关复活",
            eventName: "点击",
            eventId: "第" + gm.DataManager.userData.SetMission + "-" + (window.Mission) + "复活弹窗点击复活按钮"
        });
        if (gm.DataManager.userData.Tip > 0) {
            window['fuhuo'] = true
            gm.DataManager.userData.Tip--
            gm.UIManager.SendNotification(n.MOD_GameView, a.UIInfo_ShowFail, null)
            gm.DataBase.SaveUserData(), this.AfterAd()
            // heartbeatSchedule.default.emitEvent()
            cc.director.emit("LevelProgress");
            if (gm.DataManager.SettingData.sound) {
                cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                    cc.audioEngine.playMusic(f, true);
                });
            }
            if (window['wx']) {
                lwsdk.setToServer({
                    dataKey: "girlData",
                    dataType: "girlData",
                    data: gm.DataManager.userData,
                    expireTime: 3600
                })
            }
        } else {
            if (window['wx']) {
                wxUtils.default.showToast("复活次数不足")
            } else {
                window['fuhuo'] = true
                gm.DataBase.SaveUserData(), this.AfterAd()
                cc.director.emit("LevelProgress");
            }
        }
        // gm.DataBase.SaveUserData(), this.AfterAd()//复活测试
        if (cfs.default.ZJXJJ_FH) {
            gameSDK.gameSDK.showVideoAd(() => {

            }, "ZJXJJ-FH")
            return;
        }
    },
    AdRevivalClick() {
        // lwsdk.showAuthoriseButton()
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
        // adSdk.showBanner("玩法页面", true, true, 10)
        // this.componentTable.checkmark.enabled && cfs.default.ZJXJJ_FH  ?  gameSDK.gameSDK.showVideoAd(()=>{gm.DataBase.SaveUserData(), this.AfterAd()},"ZJXJJ-FH") : 
        gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.MOD_LevelFailView, a.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_ShowView, null);
        // cc.loader.loadRes("ui/AnswerView", (err, AnsPre) => {
        //     var answerClone = cc.instantiate(AnsPre)
        //     answerClone.parent = cc.director.getScene().children[1].children[3].children[0];
        //     if (gm.DataManager.userData.MaxMission <= 20) {
        //         answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].quest
        //         answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.A
        //         answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.B
        //         answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.C
        //         if (window['AnswerJSON'].json[0].Simple[RSimple].answer.D == undefined || window['AnswerJSON'].json[0].Simple[RSimple].answer.D == null) {
        //             answerClone.getChildByName("BGD").active = false
        //         } else {
        //             answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[0].Simple[RSimple].answer.D
        //         }
        //     } else if (gm.DataManager.userData.MaxMission > 20 && gm.DataManager.userData.MaxMission <= 50) {
        //         answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].quest
        //         answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.A
        //         answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.B
        //         answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.C
        //         if (window['AnswerJSON'].json[1].Middle[RMiddle].answer.D == undefined || window['AnswerJSON'].json[1].Middle[RMiddle].answer.D == null) {
        //             answerClone.getChildByName("BGD").active = false
        //         } else {
        //             answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[1].Middle[RMiddle].answer.D
        //         }
        //     } else {
        //         answerClone.getChildByName("datikuang").getChildByName("QuestLabel").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].quest
        //         answerClone.getChildByName("BGA").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.A
        //         answerClone.getChildByName("BGB").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.B
        //         answerClone.getChildByName("BGC").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.C
        //         if (window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D == undefined || window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D == null) {
        //             answerClone.getChildByName("BGD").active = false
        //         } else {
        //             answerClone.getChildByName("BGD").getChildByName("Answer").getComponent(cc.Label).string = window['AnswerJSON'].json[2].Difficulty[RDifficulty].answer.D
        //         }
        //     }
        // })
        if (cfs.default.ZJXJJ_SMDL) {
            cc.loader.loadRes('Prefabs/giftPanel', (err, spf) => {
                var giftPre = cc.instantiate(spf);
                giftPre.parent = cc.director.getScene().children[1].children[3].children[0];
                giftPre.zIndex = 100000
            });
        }

        gm.DataManager.userData.LittleMission=0
        // gm.GameData.NowPorgress=0
        // // gm.DataManager.userData.SetMission=0
        // // console.log(window["GameView"])
        // // window["GameView"].refreshLevelPlan(-1)
    },
    checkmarkClick() {
        console.log('点击checkmarkClick按钮')
        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    },
    // HandleEvent: function HandleEvent(e) {
    //     switch (e.currentTarget.name) {
    //         case "ShareBtn":
    //             gm.AdManager.EndRecord(s.AdPlayType_LevelFailViewShare, !0);
    //             break;
    //         case "ShareCloseBtn":
    //             this.ShowProgress(2);
    //             break;
    //         case "MoneyRevival":
    //             if (gm.DataManager.userData.Tip < 1) return;
    //             gm.DataManager.userData.Tip--, gm.DataBase.SaveUserData(), this.AfterAd();
    //             break;
    //         case "AdRevival":
    //             this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.AdPlayType_LevelFailView) : (gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.MOD_LevelFailView, a.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_ShowView, null));
    //             break;
    //         case "checkmark":
    //             this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    //     }
    // },
    AfterAd: function AfterAd() {
        gm.UIManager.SendNotification(o.MOD_LevelFailView, a.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.MOD_GameView, a.UIInfo_ShowView, null);
    },
    AfterShare: function AfterShare() {
        gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_ShowView, null), this.ShowProgress(2);
    },
    ShowProgress: function ShowProgress(e) {
        // gm.AudioPlayManager.PlayAudio(null, "audios/audio_bgm", 1)
        lwsdk.setSceneEvent({
            sceneName: "第" + gm.DataManager.userData.SetMission + "-" + (window.Mission) + "关失败",
            eventName: "页面触发",
            eventId: "第" + gm.DataManager.userData.SetMission + "-" + (window.Mission) + "失败"
        });

        if (cfs.default.ZJXJJ_SPKG) {
            // adSdk.hideBanner()
        }
        this.componentTable.BackLabel.string = gm.DataManager.userData.Tip
        // var t = this;
        // t.widgetTable.MoneyRevival.active = !0;
        // this.scheduleOnce(function(){
        //     this.widgetTable.ShareCloseBtn.active = !1;
        // },3000);
        this.baseUIView.viewNode.getChildByName("fuhuo").active = true
        var t = this;
        t.widgetTable.AdRevival.active = !1
        // t.widgetTable.Close.active = !1
        t.widgetTable.MoneyRevival.active = !0
        null != this.NowTimeOut && clearTimeout(this.NowTimeOut), cc.log(e + "number"),
            this.widgetTable.ShareCloseBtn.active = !0, (
                this.NowTimeOut = setTimeout(function () {
                    // t.widgetTable.ShareCloseBtn.active = !0;
                }, 100))
    },
    OnUpdate: function OnUpdate(e) {
        null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
    },
    loadJuhe(e) {
        cc.loader.loadRes("Prefabs/Panel/otherGames/juheGame", (err, spf) => {
            var juhe = cc.instantiate(spf);
            juhe.zIndex = 1000000;
            juhe.parent = this.baseUIView.viewNode;
            // juhe.parent = o.MOD_LuckBagView;
            // juhe.position = cc.v2(360,667);
            // e()
            // console.log(juhe, "Fashion.parent")
        });
    },
    showDian() {
        gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_ShowView, null);
    },
    ShowView: function ShowView() {
        // function(){
        // cc.loader.loadRes("Prefabs/Panel/otherGames/juhe", (err, spf) => {
        //         var juhe = cc.instantiate(spf);
        //         juhe.zIndex = 1000000;
        //         // juhe.parent = cc.director.getScene().children[1].children[3].getChildByName("LevelFailView");
        //         juhe.parent = o.MOD_LuckBagView;
        //         console.log(juhe.parent,"Fashion.parent")
        //         // box.position = cc.v2(360,667);
        //     }); 
        // }
        // adSdk.showBanner("结算页", true, true, 10)
        cc.audioEngine.stopMusic()
        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audios/audio_fail", (err, prefab) => {
                var fail = cc.instantiate(prefab)
                var fails = fail.getComponent(cc.AudioSource)
                fails.play()
            })
        }
        // this.loadJuhe()
        if (cfs.default.ZJXJJ_HYRMTGY) {
            // adSdk.hideBanner()
            this.loadJuhe()
        } else if (cfs.default.ZJXJJ_CJJL) {
            // adSdk.hideBanner()
            gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_ShowView, null);
        }
        gm.AdManager.EndRecord(s.AdPlayType_LevelFailViewShare, !1), this.componentTable.checkmark.enabled = !0, this.ShowProgress(3), this.componentTable.NodeAni.once("finished", function () {
            this.ShowProgress(1);
        }, this);
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.AD_RVPlayComplete:
                e.body == s.AdPlayType_LevelFailView && this.AfterAd(), e.body == s.AdPlayType_LevelFailViewShare && this.AfterShare();
        }
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView), this.baseUIView.PushNotification(a.AD_RVPlayComplete);
    },
    Dispose: function Dispose() {}
})

/*LevelFailView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b7363sbnxZIcbaKKjdlzPOk", "LevelFailView");
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
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.componentTable.NodeAni = this.viewNode.getComponent(cc.Animation), this.AddEvent(), cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.widgetTable.ShareBtn = "ShareBtn", this.widgetTable.ShareCloseBtn = "ShareCloseBtn", this.widgetTable.MoneyRevival = "MoneyRevival", this.widgetTable.AdRevival = "AdRevival", this.widgetTable.Continue = "Continue", this.widgetTable.Close = "Close", this.widgetTable.checkmark = "Close/Background/checkmark", this.componentTable = new Array(), this.componentTable.ShareBtn = ["ShareBtn", "cc.Animation"], this.componentTable.AdRevival = ["AdRevival", "cc.Animation"], this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"], this.componentTable.checkmark = ["Close/Background/checkmark", "cc.Sprite"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (e.currentTarget.name) {
                    case "ShareBtn":
                        gm.AdManager.EndRecord(s.default.AdPlayType_LevelFailViewShare, !0);
                        break;
                    case "ShareCloseBtn":
                        this.ShowProgress(2);
                        break;
                    case "MoneyRevival":
                        if (gm.DataManager.userData.Tip < 1) return;
                        gm.DataManager.userData.Tip--, gm.DataBase.SaveUserData(), this.AfterAd();
                        break;
                    case "AdRevival":
                        this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.default.AdPlayType_LevelFailView) : (gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.default.MOD_LevelFailView, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.default.MOD_BeginView, a.default.UIInfo_ShowView, null));
                        break;
                    case "checkmark":
                        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
                }
            },
            AfterAd: function AfterAd() {
                gm.UIManager.SendNotification(o.default.MOD_LevelFailView, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.default.MOD_GameView, a.default.UIInfo_ShowView, null);
            },
            AfterShare: function AfterShare() {
                gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_ShowView, null), this.ShowProgress(2);
            },
            ShowProgress: function ShowProgress(e) {
                var t = this;
                null != this.NowTimeOut && clearTimeout(this.NowTimeOut), cc.log(e + "number"), this.widgetTable.ShareBtn.active = 1 == e, this.widgetTable.ShareCloseBtn.active = !1, 1 == e && (this.widgetTable.ShareBtn.scale = 0, this.componentTable.ShareBtn.play(), this.NowTimeOut = setTimeout(function () {
                    t.widgetTable.ShareCloseBtn.active = !0;
                }, 2500)), this.widgetTable.Continue.active = 2 == e, this.widgetTable.AdRevival.active = 2 == e, this.widgetTable.Close.active = 2 == e;
            },
            AddEvent: function AddEvent() {
                this.widgetTable.MoneyRevival.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.AdRevival.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.ShareCloseBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.ShareBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {
                null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
            },
            ShowView: function ShowView() {
                gm.AdManager.EndRecord(s.default.AdPlayType_LevelFailViewShare, !1), this.componentTable.checkmark.enabled = !0, this.ShowProgress(3), this.componentTable.NodeAni.once("finished", function () {
                    this.ShowProgress(1);
                }, this);
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.AD_RVPlayComplete:
                        e.body == s.default.AdPlayType_LevelFailView && this.AfterAd(), e.body == s.default.AdPlayType_LevelFailViewShare && this.AfterShare();
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView), this.baseUIView.PushNotification(a.default.AD_RVPlayComplete);
            },
            Dispose: function Dispose() {}
        }), 
*/