var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName"),
    s = require("GameConfig");
require("GameDefine");
var gameSDK = require("gameSDK");
var lwsdk = require("lwsdk");
var cfs = require("configStore");
var wxUtils = require("wxUtils");
var giftPanel = require("giftPanel")
var levelView = cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null,
    },
    Init: function Init(e) {
        window['levelView'] = this
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable), n.ParseComponentByTable(this.viewNode, this.componentTable), this.componentTable.NodeAni = this.viewNode.getComponent(cc.Animation),
            this.widgetTable.ShareBtn.active = !1;
        this.widgetTable.RewardBtn.active = true;
        this.widgetTable.Close.active = !1;
        this.widgetTable.ShareBtn.on(cc.Node.EventType.TOUCH_END, this.shareClick, this),
            this.widgetTable.ShareCloseBtn.on(cc.Node.EventType.TOUCH_END, this.ShareCloseClcik, this),
            this.widgetTable.RewardBtn.on(cc.Node.EventType.TOUCH_END, this.RewardClick, this),
            this.widgetTable.RewardCloseBtn.on(cc.Node.EventType.TOUCH_END, this.RewardCloseClick, this),
            this.widgetTable.NextBtn.on(cc.Node.EventType.TOUCH_END, this.NextClick, this),
            this.widgetTable.ReturnBtn.on(cc.Node.EventType.TOUCH_END, this.ReturnClick, this),
            this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.checkmarkClick, this);
        this.widgetTable.Add.on(cc.Node.EventType.TOUCH_END, this.AddClick, this)
        this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.GetBtnClick, this)
        this.widgetTable.close.on(cc.Node.EventType.TOUCH_END, this.closeClick, this)
        this.widgetTable.backBtn.on(cc.Node.EventType.TOUCH_END, this.backClick, this)
        this.widgetTable.tipPanel.active = false
        // cc.log("Init>>>>>>>>>>>>5");
        // adSdk.showBanner("结算页", true, true, 10)
        if (cfs.default.ZJXJJ_FXCXLBY) {
            this.widgetTable.backBtn.active = true
        } else {
            this.widgetTable.backBtn.active = false
        }
        this.widgetTable.powerBG.active = false
    },
    BindUI: function BindUI() {

        this.widgetTable = new Array(), this.widgetTable.powerBG = "powerBG", this.widgetTable.backBtn = "backBtn", this.widgetTable.tipPanel = "tipPanel", this.widgetTable.close = "tipPanel/close", this.widgetTable.GetBtn = "tipPanel/GetBtn", this.widgetTable.ShareBtn = "ShareBtn", this.widgetTable.Add = "MoneyBgBtn/Add", this.widgetTable.ShareCloseBtn = "ShareCloseBtn", this.widgetTable.RewardBtn = "RewardBtn", this.widgetTable.RewardCloseBtn = "RewardCloseBtn", this.widgetTable.NextBtn = "NextBtn", this.widgetTable.ReturnBtn = "ReturnBtn", this.widgetTable.Close = "Close", this.widgetTable.AD = "RewardBtn/Background/AD", this.widgetTable.checkmark = "Close/Background/checkmark", this.componentTable = new Array(), this.componentTable.ShareBtn = ["ShareBtn", "cc.Animation"], this.componentTable.RewardBtn = ["RewardBtn", "cc.Animation"], this.componentTable.NextBtn = ["NextBtn", "cc.Animation"], this.componentTable.ReturnBtn = ["ReturnBtn", "cc.Animation"], this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"], this.componentTable.checkmark = ["Close/Background/checkmark", "cc.Sprite"], this.componentTable.Role = ["Role", "dragonBones.ArmatureDisplay"];
        // console.log(this.widgetTable.ShareBtn.active, 'this.widgetTable.ShareBtn.active')
    },
    AddClick() {
        console.log("点击胜利结算页的看视频Add按钮")
        this.widgetTable.tipPanel.active = true

    },
    backClick() {
        console.log("我点击了假退出  胜利界面", cfs.default.ZJXJJ_FXCXLBY);
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
        console.log("胜利界面看视频获取提示 cfs.default.ZJXJJ_SPKG", cfs.default.ZJXJJ_SPKG)
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
    shareClick() {
        console.log('点击分享shareClick按钮')
        gm.AdManager.EndRecord(s.AdPlayType_LevelViewShare, !0);
    },
    ShareCloseClcik() {
        console.log('点击ShareCloseClcik按钮')
        this.ShowProgress(2);
    },
    RewardClick() {
        console.log('点击RewardClick按钮', "过关奖励视频按钮", cfs.default.ZJXJJ_GGJL)
        if (cfs.default.ZJXJJ_GGJL) {
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
    RewardCloseClick() {
        console.log("胜利界面不了谢谢按钮banner显示  ,  cfs.default.ZJXJJ_SMJL", cfs.default.ZJXJJ_SMJL)
        // adSdk.showBanner("结算页", true, true, 10)
        if (cfs.default.ZJXJJ_SMJL) {
            cc.loader.loadRes("Prefabs/boxPanel", (err, spf) => {
                var box = cc.instantiate(spf);
                box.zIndex = 1000000;
                box.parent = cc.director.getScene().children[1].children[3].getChildByName("LevelView");
            });
            this.widgetTable.Close.active = true
            // if ((cc.view.getFrameSize().width / cc.view.getFrameSize().height) > 0.5) {
            //     //小屏
            //     console.log("小屏的关闭")
            //     this.widgetTable.Close.getComponent(cc.Widget).bottom = 230
            // }
        } else {

            this.widgetTable.Close.active = false
        }
        this.widgetTable.RewardBtn.active = false;
        this.ShowProgress(3);
    },
    NextClick() {
        // this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.AdPlayType_LevelViewNext) :
        // adSdk.showBanner("玩法页面", true, true, 10)
        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                cc.audioEngine.playMusic(f, true);
            });
        }
        // console.log('点击NextClick按钮 cfs.default.ZJXJJ_XYG', cfs.default.ZJXJJ_XYG);
        // gm.DataManager.userData.Tip++;
        // heartbeatSchedule.default.emitEvent()
        // if (cfs.default.ZJXJJ_QLSP) {
        //     gameSDK.gameSDK.showVideoAd(() => {}, "ZJXJJ-QLSP")
        // }
        if (this.componentTable.checkmark.enabled && cfs.default.ZJXJJ_XYG && cfs.default.ZJXJJ_QLSP) {
            gameSDK.gameSDK.showVideoAd(() => {
                gm.DataManager.userData.Tip++;
                // heartbeatSchedule.default.emitEvent()
                lwsdk.setToServer({
                    dataKey: "girlData",
                    dataType: "girlData",
                    data: gm.DataManager.userData,
                    expireTime: 3600
                })
                gm.GameLogic.LoadMission(!0), gm.UIManager.SendNotification(o.MOD_LevelView, a.UIInfo_CloseView, null)
                wxUtils.default.showToast("恭喜你获得了奖励!")
            }, "ZJXJJ-GGJL")
        } else {
            if (gm.DataManager.userData.power > 0) {
                gm.DataManager.userData.power--
                if (window['wx']) {
                    lwsdk.setToServer({
                        dataKey: "girlData",
                        dataType: "girlData",
                        data: gm.DataManager.userData,
                        expireTime: 3600
                    })
                }
                this.widgetTable.powerBG.active = false
                window.Refish()
                // console.log(gm.UIManager.SendNotification)
                gm.GameLogic.LoadMission(!0);
                gm.UIManager.SendNotification(o.MOD_LevelView, a.UIInfo_CloseView, null);
                window["powerShow"] = true
            } else {
                cc.loader.loadRes("ui/PowerGet", (err, pre) => {
                    var PowerGetPre = cc.instantiate(pre)
                    PowerGetPre.parent = this.baseUIView.viewNode
                })
            }
        }
    },
    ReturnClick() {
        lwsdk.showAuthoriseButton()
        // adSdk.showBanner("玩法页面", true, true, 10)
        // gm.DataManager.userData.Tip++;
        // heartbeatSchedule.default.emitEvent()
        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audio/" + "audio_bgm", cc.AudioClip, function (c, f) {
                cc.audioEngine.playMusic(f, true);
            });
        }
        gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.MOD_LevelView, a.UIInfo_CloseView, null);
        // giftPanel.instance.show()
        // console.log(o.MOD_BeginView,"o.MOD_BeginView")
        console.log("胜利界面神秘大礼 cfs.default.ZJXJJ_SMDL", cfs.default.ZJXJJ_SMDL)
        // this.loadAnswer()
        if (cfs.default.ZJXJJ_SMDL) {
            cc.loader.loadRes('Prefabs/giftPanel', (err, spf) => {
                var giftPre = cc.instantiate(spf);
                giftPre.parent = cc.director.getScene().children[1].children[3].children[0];
                giftPre.zIndex = 100000
            });

        }
    },
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
            // console.log(answerClone.parent)
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
    checkmarkClick() {
        console.log('点击checkmarkClick按钮')
        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    },

    AfterAd: function AfterAd() {
        gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_ShowView, null), this.ShowProgress(3);
    },
    AfterShare: function AfterShare() {
        gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_ShowView, null), this.ShowProgress(2);
    },
    AfterAdNext: function AfterAdNext() {
        gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_ShowView, o.MOD_LevelView);
    },
    AfterShowReward: function AfterShowReward() {
        gm.GameLogic.LoadMission(!0), gm.UIManager.SendNotification(o.MOD_LevelView, a.UIInfo_CloseView, null);
    },
    showDian() {
        gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_ShowView, null);
    },
    ShowProgress: function ShowProgress(e) {
        // this.loadAnswer()
        if (cfs.default.ZJXJJ_SPKG) {
            // adSdk.hideBanner()
        }
        var t = this;
        if (null != this.NowTimeOut && clearTimeout(this.NowTimeOut), cc.log(e + "number"),

            this.widgetTable.RewardBtn.active = 0, this.widgetTable.RewardCloseBtn.active = false, 1 == e) {
            this.componentTable.RewardBtn.play();
            // var i = s.AdLuckGap;
            this.NowTimeOut = setTimeout(function () {
                t.NowTimeOut = null, t.widgetTable.RewardCloseBtn.active = !0;
            }, 3000);

        }
        this.widgetTable.NextBtn.active = true, this.widgetTable.ReturnBtn.active = true,
            // this.widgetTable.Close.active = 3 == e,
            3 == e && (this.componentTable.NextBtn.play(), this.componentTable.ReturnBtn.play());
        if ((cc.view.getFrameSize().width / cc.view.getFrameSize().height) > 0.5) {
            //小屏
            console.log("小屏的关闭")
            this.widgetTable.Close.getComponent(cc.Widget).bottom = 0
        } else {
            this.widgetTable.Close.getComponent(cc.Widget).bottom = -20
        }
        // debugger
    },

    OnUpdate: function OnUpdate(e) {
        null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
    },
    loadJuhe(e) {
        cc.loader.loadRes("Prefabs/Panel/otherGames/juheGame", (err, spf) => {
            var juhe = cc.instantiate(spf);
            juhe.zIndex = 1000000;
            juhe.parent = this.baseUIView.viewNode;
            // juhe.position = cc.v2(360,667);
            // console.log(juhe, "Fashion.parent")
        });
    },
    ShowView: function ShowView() {
        cc.audioEngine.stopMusic();
        if (gm.DataManager.SettingData.sound) {
            cc.loader.loadRes("audios/audio_win", (err, prefab) => {
                var win = cc.instantiate(prefab)
                var wins = win.getComponent(cc.AudioSource)
                wins.play()
            })
        }
        // var Music = cc.loader.load
        gm.DataManager.userData.gold += 50
        window.Refish()
        // if (window['wx']) {
        //     lwsdk.setToServer({
        //         dataKey: "girlData",
        //         dataType: "girlData",
        //         data: gm.DataManager.userData,
        //         expireTime: 3600
        //     })
        // }
        if (cfs.default.ZJXJJ_HYRMTGY) {
            // adSdk.hideBanner()
            this.loadJuhe()
        } else if (cfs.default.ZJXJJ_CJJL) {
            // adSdk.hideBanner()
            gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_ShowView, null);
        } else {

        }
        cc.loader.loadRes("Prefabs/Level/Level_" + gm.DataManager.userData.NowMission, function (i, o) {
        })
        // gm.GameLogic.LoadMission(!0);
        if (gm.DataManager.userData.SetMission == 100) {
            // wxUtils.default.showToast("恭喜你全部通关")
            cc.loader.loadRes("Prefabs/through", (err, pre) => {
                var throuth = cc.instantiate(pre)
                throuth.parent = this.baseUIView.viewNode;
            })
        }
        // console.log(window ['Mission'])
        // debugger
        gm.AdManager.EndRecord(s.AdPlayType_LevelView, !1), gm.DataManager.userData.NowMission++, gm.DataManager.userData.SetMission++, gm.AdManager.reportAnalytics("FinishLevel", {
            Level: gm.DataManager.userData.NowMission,
            MaxLevel: gm.DataManager.userData.MaxMission
        }), gm.DataManager.userData.NowMission > gm.GameData.GameLevelDic.length - 1 && (gm.DataManager.userData.NowMission = gm.GameData.GameLevelDic.length - 1);
        if (gm.DataManager.userData.SetMission <= 10) {
            gm.DataManager.userData.SetMission > gm.DataManager.userData.MaxMission && (gm.DataManager.userData.MaxMission = gm.DataManager.userData.SetMission)
        } else if (gm.DataManager.userData.SetMission > 32 && gm.DataManager.userData.SetMission < 43) {
            gm.DataManager.userData.SetMission > gm.DataManager.userData.MaxMission && (gm.DataManager.userData.MaxMission = gm.DataManager.userData.SetMission)
        } else {
            gm.DataManager.userData.SetMission > gm.DataManager.userData.MaxMission && (gm.DataManager.userData.MaxMission = gm.DataManager.userData.SetMission)
        }
        gm.DataBase.SaveUserData(), this.componentTable.checkmark.enabled = !0, this._lastJump = !1, this.PlayRoleAni(), this.ShowProgress(4), this.componentTable.NodeAni.once("finished", function () {
            // this.ShowProgress(1);
        }, this);

    },
    PlayRoleAni: function PlayRoleAni() {
        // console.log("levelView33333")
        this._lastJump = !this._lastJump, this._lastJump ? this.componentTable.Role.playAnimation("cheer", 1) : this.componentTable.Role.playAnimation("stand", 1), this.componentTable.Role.once(dragonBones.EventObject.COMPLETE, function () {
            this.PlayRoleAni();
        }, this);
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.AD_RVPlayComplete:
                e.body == s.AdPlayType_LevelView && this.AfterAd(), e.body == s.AdPlayType_LevelViewShare && this.AfterShare(), e.body == s.AdPlayType_LevelViewNext && this.AfterAdNext();

                break;
            case a.UIInfo_AfterShowReward:
                this.AfterShowReward();
        }
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView), this.baseUIView.PushNotification(a.AD_RVPlayComplete), this.baseUIView.PushNotification(a.Info_AfterShowReward);
    },
    Dispose: function Dispose() {}
})
/*LevelView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "c8e772C4hpO+YhD87Ru/Buy", "LevelView");
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
                this.widgetTable = new Array(), this.widgetTable.ShareBtn = "ShareBtn", this.widgetTable.ShareCloseBtn = "ShareCloseBtn", this.widgetTable.RewardBtn = "RewardBtn", this.widgetTable.RewardCloseBtn = "RewardCloseBtn", this.widgetTable.NextBtn = "NextBtn", this.widgetTable.ReturnBtn = "ReturnBtn", this.widgetTable.Close = "Close", this.widgetTable.AD = "RewardBtn/Background/AD", this.widgetTable.checkmark = "Close/Background/checkmark", this.componentTable = new Array(), this.componentTable.ShareBtn = ["ShareBtn", "cc.Animation"], this.componentTable.RewardBtn = ["RewardBtn", "cc.Animation"], this.componentTable.NextBtn = ["NextBtn", "cc.Animation"], this.componentTable.ReturnBtn = ["ReturnBtn", "cc.Animation"], this.componentTable.MoneyBgBtnNum = ["MoneyBgBtn/Num", "cc.Label"], this.componentTable.checkmark = ["Close/Background/checkmark", "cc.Sprite"], this.componentTable.Role = ["Role", "dragonBones.ArmatureDisplay"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (e.currentTarget.name) {
                    case "ShareBtn":
                        gm.AdManager.EndRecord(s.default.AdPlayType_LevelViewShare, !0);
                        break;
                    case "ShareCloseBtn":
                        this.ShowProgress(2);
                        break;
                    case "RewardBtn":
                        gm.AdManager.playVideo(s.default.AdPlayType_LevelView);
                        break;
                    case "RewardCloseBtn":
                        this.ShowProgress(3);
                        break;
                    case "NextBtn":
                        this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.default.AdPlayType_LevelViewNext) : (gm.GameLogic.LoadMission(!0), gm.UIManager.SendNotification(o.default.MOD_LevelView, a.default.UIInfo_CloseView, null));
                        break;
                    case "ReturnBtn":
                        gm.GameData.NowPorgress = 0, gm.GameLogic.LoadMission(!1), gm.UIManager.SendNotification(o.default.MOD_BeginView, a.default.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.default.MOD_LevelView, a.default.UIInfo_CloseView, null);
                        break;
                    case "checkmark":
                        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
                }
            },
            AfterAd: function AfterAd() {
                gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_ShowView, null), this.ShowProgress(3);
            },
            AfterShare: function AfterShare() {
                gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_ShowView, null), this.ShowProgress(2);
            },
            AfterAdNext: function AfterAdNext() {
                gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_ShowView, o.default.MOD_LevelView);
            },
            AfterShowReward: function AfterShowReward() {
                gm.GameLogic.LoadMission(!0), gm.UIManager.SendNotification(o.default.MOD_LevelView, a.default.UIInfo_CloseView, null);
            },
            ShowProgress: function ShowProgress(e) {
                var t = this;
                if (null != this.NowTimeOut && clearTimeout(this.NowTimeOut), cc.log(e + "number"), this.widgetTable.ShareBtn.active = 1 == e, this.widgetTable.ShareCloseBtn.active = !1, 1 == e && (this.widgetTable.ShareBtn.scale = 0, this.componentTable.ShareBtn.play(), this.NowTimeOut = setTimeout(function () {
                        t.NowTimeOut = null, t.widgetTable.ShareCloseBtn.active = !0;
                    }, 2500)), this.widgetTable.RewardBtn.active = 2 == e, this.widgetTable.RewardCloseBtn.active = !1, 2 == e) {
                    this.componentTable.RewardBtn.play();
                    var i = s.default.AdLuckGap;
                    this.NowTimeOut = setTimeout(function () {
                        t.NowTimeOut = null, t.widgetTable.RewardCloseBtn.active = !0;
                    }, 2500);
                    for (var n = 0; n < i.length; n++) {
                        if (i[n] == gm.DataManager.userData.NowMission - 1) {
                            gm.UIManager.SendNotification(o.default.MOD_LuckBagView, a.default.UIInfo_ShowView, null);
                            break;
                        }
                    }
                }
                this.widgetTable.NextBtn.active = 3 == e, this.widgetTable.ReturnBtn.active = 3 == e, this.widgetTable.Close.active = 3 == e, 3 == e && (this.componentTable.NextBtn.play(), this.componentTable.ReturnBtn.play());
            },
            AddEvent: function AddEvent() {
                for (var e in this.widgetTable) {
                    if (this.widgetTable.hasOwnProperty(e)) {
                        var t = this.widgetTable[e]; - 1 != t.name.indexOf("Btn") && t.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
                    }
                }
                this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {
                null != this.componentTable && (this.componentTable.MoneyBgBtnNum.string = gm.DataManager.userData.Tip);
            },
            ShowView: function ShowView() {
                gm.AdManager.EndRecord(s.default.AdPlayType_LevelView, !1), gm.DataManager.userData.NowMission++, gm.AdManager.reportAnalytics("FinishLevel", {
                    Level: gm.DataManager.userData.NowMission,
                    MaxLevel: gm.DataManager.userData.MaxMission
                }), gm.DataManager.userData.NowMission > gm.GameData.GameLevelDic.length - 1 && (gm.DataManager.userData.NowMission = gm.GameData.GameLevelDic.length - 1), gm.DataManager.userData.NowMission > gm.DataManager.userData.MaxMission && (gm.DataManager.userData.MaxMission = gm.DataManager.userData.NowMission), gm.DataBase.SaveUserData(), this.componentTable.checkmark.enabled = !0, this._lastJump = !1, this.PlayRoleAni(), this.ShowProgress(4), this.componentTable.NodeAni.once("finished", function () {
                    this.ShowProgress(1);
                }, this);
            },
            PlayRoleAni: function PlayRoleAni() {
                this._lastJump = !this._lastJump, this._lastJump ? this.componentTable.Role.playAnimation("cheer", 1) : this.componentTable.Role.playAnimation("stand", 1), this.componentTable.Role.once(dragonBones.EventObject.COMPLETE, function () {
                    this.PlayRoleAni();
                }, this);
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.AD_RVPlayComplete:
                        e.body == s.default.AdPlayType_LevelView && this.AfterAd(), e.body == s.default.AdPlayType_LevelViewShare && this.AfterShare(), e.body == s.default.AdPlayType_LevelViewNext && this.AfterAdNext();
                        break;
                    case a.default.UIInfo_AfterShowReward:
                        this.AfterShowReward();
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView), this.baseUIView.PushNotification(a.default.AD_RVPlayComplete), this.baseUIView.PushNotification(a.default.Info_AfterShowReward);
            },
            Dispose: function Dispose() {}
        }), 
*/