var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName"),
    s = require("GameConfig"),
    r = require("GameDefine");
var gameSDK = require("gameSDK")
// var heartbeatSchedule = require ("heartbeatSchedule");
// var lwsdk = require("lwsdk");
var cfs = require("configStore")

cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null,
        GapTime: .1,
        CutNum: .2,
        AddNum: 20,
        clickSuccessed: false,
    },
    onLoad() {
        // gm.AdManager.closeAdBanner(), this.NowPorgressNum = 0, this.GapWaitTime = 0, this.BoolBegin = !1, this.componentTable.Progress.node.active = !1, this.widgetTable.OpenBtn.active = !1, this.widgetTable.ProgressBg.active = !1, this.widgetTable.GetBtn.active = !1, this.widgetTable.AdLabel.active = !1, this.componentTable.checkmark.enabled = !1;
    },
    Init: function Init(e) {
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable), n.ParseComponentByTable(this.viewNode, this.componentTable),
            // this.AddEvent(),
            this.widgetTable.OpenBtn.on(cc.Node.EventType.TOUCH_END, this.openClick, this)
        // if(this.getBtn==false){
        this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.GetClick, this)
        // }else{

        // }
        this.widgetTable.videoBtn.on(cc.Node.EventType.TOUCH_END, this.onWatch, this)
        // this.widgetTable.CancelBtn.on(cc.Node.EventType.TOUCH_END,this.CancelClick,this)
        this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.checkmarkClick, this);
        this.widgetTable.close.on(cc.Node.EventType.TOUCH_END, this.closeClick, this);
        this.widgetTable.backBtn.on(cc.Node.EventType.TOUCH_END, this.backClick, this);
        // cc.log("Init>>>>>>>>>>>>6");
        this.widgetTable.GetBtn.active = false
        this.widgetTable.AdLabel.active = false
        this.widgetTable.close.active = false
        this.widgetTable.videoBtn.active = false
        this.widgetTable.videoLabel.active = false
        // this.widgetTable.openBox.active = false
        if (cfs.default.ZJXJJ_FXCXLBY) {
            this.widgetTable.backBtn.active = true
        }else{
            this.widgetTable.backBtn.active = false
        }
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array() , this.widgetTable.backBtn = "backBtn",this.widgetTable.openBox = "openBox",this.widgetTable.giftsBox = "giftsBox", this.widgetTable.OpenBtn = "OpenBtn", this.widgetTable.videoBtn = "videoBtn", this.widgetTable.videoLabel = "videoLabel", this.widgetTable.close = "close", this.widgetTable.GetBtn = "GetBtn", this.widgetTable.ProgressBg = "ProgressBg", this.widgetTable.checkmark = "AdLabel/Background/checkmark", this.widgetTable.AdLabel = "AdLabel", this.componentTable = new Array(), this.componentTable.Progress = ["Progress", "cc.Sprite"], this.componentTable.LuckBag = ["LuckBag", "cc.Animation"], this.componentTable.checkmark = ["AdLabel/Background/checkmark", "cc.Sprite"];
    },
    backClick(){
        console.log("我点击了假退出 失败界面",  cfs.default.ZJXJJ_FXCXLBY);
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
    openClick() {
        if (this.clickSuccessed) {
            return
        }
        // console.log('我点击了openClick按钮')
        var bannerSuccessClick = false
        if (CC_WECHATGAME) {
            // console.log("进入误触微信切出看视频")
            wx.onHide(() => {
                console.log("微信已经切出看视频")
                bannerSuccessClick = true
            })
        }
        this.NowPorgressNum += this.AddNum;
        if (this.NowPorgressNum >= 60 && this.NowPorgressNum <= 80) {
            this.widgetTable.giftsBox.active = false
            this.widgetTable.openBox.active = true
            // adSdk.showBanner("超级奖励", true, true, 10),
                this.clickSuccessed = true,
                // console.log("开始误触", CC_WECHATGAME, bannerSuccessClick),
                setTimeout(() => {
                    // console.log(bannerSuccessClick)
                    if (bannerSuccessClick) {
                        console.log("误触成功")
                        bannerSuccessClick = false
                        this.NowPorgressNum = 0
                        this.clickSuccessed = false
                        // this.widgetTable.OpenBtn.active = false
                        // this.widgetTable.videoBtn.active = false
                        // this.widgetTable.close.active = false
                        // this.widgetTable.videoLabel.active = false
                        // this.widgetTable.GetBtn.active = true
                        // this.widgetTable.AdLabel.active = true
                        // this.node.destroy()
                        gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_CloseView, null)
                        // let event = new cc.Event("bannerShow", true)
                        // cc.systemEvent.dispatchEvent(event)
                        if((cc.view.getFrameSize().width / cc.view.getFrameSize().height) > 0.5 ){
                            //小屏
                        }
                        // adSdk.showBanner("结算页",true,true,10)
                        console.log("误触结束删除")

                    } else {
                        bannerSuccessClick = false
                        this.NowPorgressNum = 0
                        this.clickSuccessed = false
                        // adSdk.hideBanner()
                        this.widgetTable.OpenBtn.active = false
                        this.widgetTable.videoBtn.active = true
                        this.widgetTable.GetBtn.active = false
                        this.widgetTable.AdLabel.active = false
                        setTimeout(() => {
                            this.widgetTable.close.active = true
                        },3000)
                        this.widgetTable.videoLabel.active = true
                    }
                }, 2000)
        }
        // if(this.NowPorgressNum > 70 ){
        // }
        // adSdk.showBanner("")
        // this.widgetTable.AdLabel.active = false
    },
    onWatch() {
        gameSDK.gameSDK.showVideoAd(() => {
            // PlayerManager.info.money += 100
            // GeneralTips.show(`恭喜获得100金币`);
            // this.node.destroy()
            let event = new cc.Event("bannerShow", true)
            cc.systemEvent.dispatchEvent(event)
            console.log('误触结束删除')
            // adSdk.hideBanner()
        }, "ZJXJJ-SMJL")
        this.widgetTable.AdLabel.active = true
        this.widgetTable.close.active = false
        this.widgetTable.GetBtn.active = true
        this.widgetTable.videoBtn.active = false
        this.widgetTable.videoLabel.active = false
    },
    GetClick() {
        console.log('我点击了GetClick按钮'),
            // adSdk.showBanner("结算页",true,true,10)
            // let event = new cc.Event("bannerShow", true)
            //     cc.systemEvent.dispatchEvent(event)
            //     console.log('误触结束删除')
            //     bannerManager.commonHide()
            this.componentTable.checkmark.enabled ? gameSDK.gameSDK.showVideoAd(() => {this.closeClick()}, "ZJXJJ-SMJL") : gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_CloseView, null);
            // adSdk.showBanner("结算页",true,true,10)
    },
    closeClick() {
        // this.getBtn = true
        console.log("超级奖励关闭按钮banner显示")
        // adSdk.showBanner("结算页",true,true,10)
        gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_CloseView, null)
        this.widgetTable.GetBtn.active = true
        this.widgetTable.AdLabel.active = true
        this.widgetTable.close.active = false
        this.widgetTable.videoBtn.active = false
        this.widgetTable.videoLabel.active = false
        this.widgetTable.giftsBox.active = true
        this.widgetTable.openBox.active = false

    },
    CancelClick() {
        console.log('我点击了CancelClick按钮');
    },
    checkmarkClick() {
        console.log('我点击了checkmarkClick按钮'),
            this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    },
    AfterAd: function AfterAd() {
        gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.MOD_LuckBagView, a.UIInfo_CloseView, null);
    },
    OnUpdate: function OnUpdate(e) {
        // this.node.active=false;
        // return
        var t = this;
        null != this.componentTable && this.BoolBegin && (this.GapWaitTime += e, this.GapWaitTime > this.GapTime && (this.NowPorgressNum -= this.CutNum, this.NowPorgressNum < 0 && (this.NowPorgressNum = 0)), this.componentTable.Progress.fillRange = this.NowPorgressNum / 100, this.NowPorgressNum > 100 && (this.BoolBegin = !1, this.componentTable.Progress.node.active = !1, this.widgetTable.ProgressBg.active = !1, this.widgetTable.OpenBtn.active = !1, this.componentTable.LuckBag.play("LuckBagView_Bag"), this.componentTable.LuckBag.once("finished", function () {}.bind(this), this), console.log("banner隐藏"), setTimeout(function () {
            t.widgetTable.GetBtn.active = !0, t.widgetTable.AdLabel.active = !0;
        }, 200)));
    },
    ShowView: function ShowView() {
        // return
        this.NowPorgressNum = 0, this.GapWaitTime = 0, this.BoolBegin = !0, this.componentTable.Progress.node.active = !0, this.widgetTable.OpenBtn.active = !0, this.widgetTable.ProgressBg.active = !0, this.widgetTable.GetBtn.active = !1, this.widgetTable.AdLabel.active = !1, this.componentTable.LuckBag.play("LuckBagView_Bag_rest"), this.componentTable.checkmark.enabled = !0;
    },
    CloseView: function CloseView() {
        0 == gm.DataManager.userData.AdOpenNewMission && gm.DataManager.userData.IQ >= s.NewMissionOpenIQ && gm.UIManager.SendNotification(o.MOD_NewMissionOpenView, a.UIInfo_ShowView, null), gm.AdManager.playADBanner();
    },
    HandleNotification: function HandleNotification(e) {
        switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.AD_RVPlayComplete:
                e.body == s.AdPlayType_LuckBagView && this.AfterAd();
        }
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView), this.baseUIView.PushNotification(a.AD_RVPlayComplete);
    },
    Dispose: function Dispose() {}
})
/*LuckBagView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7a523zI1SpHhowr1TNtnjjk", "LuckBagView");
        var n = c(e("util")),
            a = c(e("UIInfo")),
            o = c(e("ConstModName")),
            s = c(e("GameConfig")),
            r = c(e("GameDefine"));

        function c(e) {
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
                DataModule: null,
                GapTime: .1,
                CutNum: .6,
                AddNum: 10
            },
            Init: function Init(e) {
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.AddEvent(), cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.widgetTable.OpenBtn = "OpenBtn", this.widgetTable.GetBtn = "GetBtn", this.widgetTable.ProgressBg = "ProgressBg", this.widgetTable.checkmark = "AdLabel/Background/checkmark", this.widgetTable.AdLabel = "AdLabel", this.componentTable = new Array(), this.componentTable.Progress = ["Progress", "cc.Sprite"], this.componentTable.LuckBag = ["LuckBag", "cc.Animation"], this.componentTable.checkmark = ["AdLabel/Background/checkmark", "cc.Sprite"];
            },
            HandleEvent: function HandleEvent(e) {
                switch ("Click" != e.currentTarget.name && gm.AudioPlayManager.PlayAudio(r.default.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), e.currentTarget.name) {
                    case "OpenBtn":
                        this.NowPorgressNum += this.AddNum;
                        break;
                    case "GetBtn":
                        this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.default.AdPlayType_LuckBagView) : gm.UIManager.SendNotification(o.default.MOD_LuckBagView, a.default.UIInfo_CloseView, null);
                        break;
                    case "CancelBtn":
                        break;
                    case "checkmark":
                        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
                }
            },
            AfterAd: function AfterAd() {
                gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_ShowView, null), gm.UIManager.SendNotification(o.default.MOD_LuckBagView, a.default.UIInfo_CloseView, null);
            },
            AddEvent: function AddEvent() {
                this.widgetTable.OpenBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {
                var t = this;
                null != this.componentTable && this.BoolBegin && (this.GapWaitTime += e, this.GapWaitTime > this.GapTime && (this.NowPorgressNum -= this.CutNum, this.NowPorgressNum < 0 && (this.NowPorgressNum = 0)), this.componentTable.Progress.fillRange = this.NowPorgressNum / 100, this.NowPorgressNum > 100 && (this.BoolBegin = !1, this.componentTable.Progress.node.active = !1, this.widgetTable.ProgressBg.active = !1, this.widgetTable.OpenBtn.active = !1, this.componentTable.LuckBag.play("LuckBagView_Bag"), this.componentTable.LuckBag.once("finished", function () {}.bind(this), this), setTimeout(function () {
                    t.widgetTable.GetBtn.active = !0, t.widgetTable.AdLabel.active = !0;
                }, 200)));
            },
            ShowView: function ShowView() {
                gm.AdManager.closeAdBanner(), this.NowPorgressNum = 0, this.GapWaitTime = 0, this.BoolBegin = !0, this.componentTable.Progress.node.active = !0, this.widgetTable.OpenBtn.active = !0, this.widgetTable.ProgressBg.active = !0, this.widgetTable.GetBtn.active = !1, this.widgetTable.AdLabel.active = !1, this.componentTable.LuckBag.play("LuckBagView_Bag_rest"), this.componentTable.checkmark.enabled = !0;
            },
            CloseView: function CloseView() {
                0 == gm.DataManager.userData.AdOpenNewMission && gm.DataManager.userData.IQ >= s.default.NewMissionOpenIQ && gm.UIManager.SendNotification(o.default.MOD_NewMissionOpenView, a.default.UIInfo_ShowView, null), gm.AdManager.playADBanner();
            },
            HandleNotification: function HandleNotification(e) {
                switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.AD_RVPlayComplete:
                        e.body == s.default.AdPlayType_LuckBagView && this.AfterAd();
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView), this.baseUIView.PushNotification(a.default.AD_RVPlayComplete);
            },
            Dispose: function Dispose() {}
        }), 
*/