

var n = require("util"),
a = require("UIInfo"),
o = require("ConstModName"),
s = require("GameConfig"),
r = require("GameDefine");
cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null
    },
    Init: function Init(e) {
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable), n.ParseComponentByTable(this.viewNode, this.componentTable), 
        // this.AddEvent(),
        this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END,this.getBtnClick,this)
        this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END,this.checkmarkClick,this);
        // cc.log("Init>>>>>>>>>>>>9");
    },
    getBtnClick(){
        console.log('点击getBtnClick')
        this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.AdPlayType_ShowRewardView) : gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_CloseView, null);

    },
    checkmarkClick(){
        console.log('点击checkmarkClick')
        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(), this.widgetTable.GetBtn = "GetBtn", this.widgetTable.AdLabel = "AdLabel", this.widgetTable.checkmark = "AdLabel/Background/checkmark", this.componentTable = new Array(), this.componentTable.checkmark = ["AdLabel/Background/checkmark", "cc.Sprite"];
    },
    // HandleEvent: function HandleEvent(e) {
    //     switch (gm.AudioPlayManager.PlayAudio(r.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), e.currentTarget.name) {
    //         case "GetBtn":
    //             this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.AdPlayType_ShowRewardView) : gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_CloseView, null);
    //             break;
    //         case "checkmark":
    //             this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
    //     }
    // },
    AfterAd: function AfterAd() {
        gm.DataManager.userData.Tip++, gm.DataBase.SaveUserData(), gm.UIManager.SendNotification(o.MOD_ShowRewardView, a.UIInfo_CloseView, null);
    },
    // AddEvent: function AddEvent() {
    //     this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
    // },
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {
        gm.DataManager.userData.Tip++, gm.DataBase.SaveUserData(), null == this._ShowNum && (this._ShowNum = 0), this._ShowNum++, this._ShowNum > s.ShowRewardViewGap ? (this.widgetTable.AdLabel.active = !0, this.componentTable.checkmark.enabled = !0, this._ShowNum = 0) : (this.widgetTable.AdLabel.active = !1, this.componentTable.checkmark.enabled = !1);
    },
    CloseView: function CloseView() {
        null != this.CallBackMode && (cc.log(this.CallBackMode), gm.UIManager.SendNotification(this.CallBackMode, a.UIInfo_AfterShowReward, null));
    },
    HandleNotification: function HandleNotification(e) {
        switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.UIInfo_ShowView:
                this.CallBackMode = e.body;
                break;
            case a.AD_RVPlayComplete:
                e.body == s.AdPlayType_ShowRewardView && this.AfterAd();
        }
    },
    RegisterNotification: function RegisterNotification() {
         this.baseUIView.PushNotification(a.UIInfo_RefreshView), this.baseUIView.PushNotification(a.AD_RVPlayComplete);
    },
    Dispose: function Dispose() {}
})
/*ShowRewardView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "dd0c8qdrKlKrY2eHomsyCDS", "ShowRewardView");
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
                DataModule: null
            },
            Init: function Init(e) {
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.AddEvent(), cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.widgetTable.GetBtn = "GetBtn", this.widgetTable.AdLabel = "AdLabel", this.widgetTable.checkmark = "AdLabel/Background/checkmark", this.componentTable = new Array(), this.componentTable.checkmark = ["AdLabel/Background/checkmark", "cc.Sprite"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (gm.AudioPlayManager.PlayAudio(r.default.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), e.currentTarget.name) {
                    case "GetBtn":
                        this.componentTable.checkmark.enabled ? gm.AdManager.playVideo(s.default.AdPlayType_ShowRewardView) : gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_CloseView, null);
                        break;
                    case "checkmark":
                        this.componentTable.checkmark.enabled = !this.componentTable.checkmark.enabled;
                }
            },
            AfterAd: function AfterAd() {
                gm.DataManager.userData.Tip++, gm.DataBase.SaveUserData(), gm.UIManager.SendNotification(o.default.MOD_ShowRewardView, a.default.UIInfo_CloseView, null);
            },
            AddEvent: function AddEvent() {
                this.widgetTable.checkmark.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.GetBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {
                gm.DataManager.userData.Tip++, gm.DataBase.SaveUserData(), null == this._ShowNum && (this._ShowNum = 0), this._ShowNum++, this._ShowNum > s.default.ShowRewardViewGap ? (this.widgetTable.AdLabel.active = !0, this.componentTable.checkmark.enabled = !0, this._ShowNum = 0) : (this.widgetTable.AdLabel.active = !1, this.componentTable.checkmark.enabled = !1);
            },
            CloseView: function CloseView() {
                null != this.CallBackMode && (cc.log(this.CallBackMode), gm.UIManager.SendNotification(this.CallBackMode, a.default.UIInfo_AfterShowReward, null));
            },
            HandleNotification: function HandleNotification(e) {
                switch (cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.UIInfo_ShowView:
                        this.CallBackMode = e.body;
                        break;
                    case a.default.AD_RVPlayComplete:
                        e.body == s.default.AdPlayType_ShowRewardView && this.AfterAd();
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView), this.baseUIView.PushNotification(a.default.AD_RVPlayComplete);
            },
            Dispose: function Dispose() {}
        }), 
*/