

 var n = require("util"),
 a = require("UIInfo"),
 o = require("ConstModName"),
 s = (require("GameConfig"), require("GameDefine"));
 cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null
    },
    Init: function Init(e) {
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable), n.ParseComponentByTable(this.viewNode, this.componentTable), this.setClick();
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(), this.widgetTable.Close = "Close", this.widgetTable.MusicBtn = "MusicBtn", this.widgetTable.MusicBtnOpen = "MusicBtn/Background/Open", this.widgetTable.MusicBtnClose = "MusicBtn/Background/Close", this.componentTable = new Array();
    },
    setBtnClick: function setBtnClick(e) {
        console.log('点击了设置界面关闭按钮')
        // adSdk.showBanner("玩法页面",true,true,10)
        var t = e.currentTarget.name;
        "Close" == t ? gm.UIManager.SendNotification(o.MOD_SettingView, a.UIInfo_CloseView, null) : "MusicBtn" == t && (gm.DataManager.SettingData.sound = !gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnOpen.active = gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnClose.active = !gm.DataManager.SettingData.sound, gm.DataBase.SaveSettingData());
    },
    setClick: function setClick() {
        this.widgetTable.Close.on(cc.Node.EventType.TOUCH_END, this.setBtnClick, this), this.widgetTable.MusicBtn.on(cc.Node.EventType.TOUCH_END, this.setBtnClick, this);
    },
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {
        this.widgetTable.MusicBtnOpen.active = gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnClose.active = !gm.DataManager.SettingData.sound;
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        switch (gm.AudioPlayManager.PlayAudio(s.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), cc.log("notification" + e.name + ":" + e.body), e.name) {
            case a.UIInfo_ShowView:
        }
    },
    RegisterNotification: function RegisterNotification() {
         this.baseUIView.PushNotification(a.UIInfo_RefreshView);
    },
    Dispose: function Dispose() {}
})
/*SettingView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "fbd84eLZJFHF5W3bCvzkMcs", "SettingView");
        var n = r(e("util")),
            a = r(e("UIInfo")),
            o = r(e("ConstModName")),
            s = (r(e("GameConfig")), r(e("GameDefine")));

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
                this.widgetTable = new Array(), this.widgetTable.Close = "Close", this.widgetTable.MusicBtn = "MusicBtn", this.widgetTable.MusicBtnOpen = "MusicBtn/Background/Open", this.widgetTable.MusicBtnClose = "MusicBtn/Background/Close", this.componentTable = new Array();
            },
            HandleEvent: function HandleEvent(e) {
                var t = e.currentTarget.name;
                "Close" == t ? gm.UIManager.SendNotification(o.default.MOD_SettingView, a.default.UIInfo_CloseView, null) : "MusicBtn" == t && (gm.DataManager.SettingData.sound = !gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnOpen.active = gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnClose.active = !gm.DataManager.SettingData.sound, gm.DataBase.SaveSettingData());
            },
            AddEvent: function AddEvent() {
                this.widgetTable.Close.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this), this.widgetTable.MusicBtn.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {
                this.widgetTable.MusicBtnOpen.active = gm.DataManager.SettingData.sound, this.widgetTable.MusicBtnClose.active = !gm.DataManager.SettingData.sound;
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                switch (gm.AudioPlayManager.PlayAudio(s.default.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), cc.log("notification" + e.name + ":" + e.body), e.name) {
                    case a.default.UIInfo_ShowView:
                }
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView);
            },
            Dispose: function Dispose() {}
        }), 
*/