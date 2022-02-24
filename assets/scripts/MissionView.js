var n = require("util"),
    a = require("UIInfo"),
    o = require("ConstModName"),
    s = (require("GameConfig"), require("GameDefine"));
var lwsdk = require("lwsdk");
var wxUtils = require("wxUtils");
cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null
    },
    Init: function Init(e) {
        this.baseUIView = e,
            this.viewNode = this.baseUIView.viewNode,
            this.BindUI(),
            n.ParseWidgetByTable(this.viewNode, this.widgetTable),
            n.ParseComponentByTable(this.viewNode, this.componentTable),
            this.returnClick();
        // adSdk.showBanner("关卡",true,true,10)

    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(),
            this.widgetTable.Return = "Return",
            this.widgetTable.Item = "ScrollView/view/content/Item",
            this.widgetTable.content = "ScrollView/view/content",
            this.componentTable = new Array(),
            this.componentTable.ScrollView = ["ScrollView", "cc.ScrollView"];
    },
    returnBtnClick: function returnBtnClick(e) {
        lwsdk.showAuthoriseButton()
        switch (e.currentTarget.name) {
            case "Return":
                // adSdk.showBanner("玩法页面",true,true,10)
                gm.UIManager.SendNotification(o.MOD_MissionView, a.UIInfo_CloseView, null),
                    gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_ShowView, null);
        }
    },
    returnClick: function returnClick() {
        this.widgetTable.Return.on(cc.Node.EventType.TOUCH_END, this.returnBtnClick, this);
    },
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {
        // gm.UIManager.SendNotification(o.MOD_BeginView, a.UIInfo_CloseView, null);
        if (this.widgetTable.content.childrenCount < gm.GameData.GameLevelDic.length - 1) {
            this.widgetTable.Item.on(cc.Node.EventType.TOUCH_END, this.ChlickItemClick, this);
            for (var e = 0; e < gm.GameData.GameLevelDic.length - 2; e++) {
                var t = cc.instantiate(this.widgetTable.Item);
                t.parent = this.widgetTable.content, t.on(cc.Node.EventType.TOUCH_END, this.ChlickItemClick, this);
            }
        }
        for (var i = 0; i < gm.GameData.GameLevelDic.length - 1; i++) {
            var n = this.widgetTable.content.children[i];
            // console.log(n, gm.DataManager.userData.MaxMission)
            n.getChildByName("Mission").getComponent(cc.Label).string = i + 1,
                n.getChildByName("Progress").active = i < gm.DataManager.userData.MaxMission - 1,
                n.getChildByName("FinishedBtn").active = i < gm.DataManager.userData.MaxMission - 1,
                n.getChildByName("Lock").active = i > gm.DataManager.userData.MaxMission - 1;
            if (i == gm.DataManager.userData.MaxMission - 1) {
                n.getChildByName("help").active = true
            } else {
                n.getChildByName("help").active = false
            }
        }
        this.componentTable.ScrollView.scrollToOffset(cc.v2(0, 285 * Math.floor((gm.DataManager.userData.NowLevel - 1) / 3 - 2)), .05);
    },
    ChlickItemClick: function ChlickItemClick(e) {
        // console.log("家载关卡",o)
        // if (gm.DataManager.userData.power > 0) {//新
        //     gm.DataManager.userData.power -- 
        //     window.Refish()
        //     heartbeatSchedule.default.emitEvent()
        var t = e.currentTarget.getSiblingIndex();
        // console.log(t, gm.DataManager.userData.MaxMission, gm.DataManager.userData.NowMission, (t + 1),(gm.DataManager.userData.SetMission == t + 1))
        if (t < gm.DataManager.userData.MaxMission && (gm.DataManager.userData.NowMission = t + 1) || t < gm.DataManager.userData.MaxMission && (gm.DataManager.userData.SetMission == t + 1)) {
            if (gm.DataManager.userData.power > 0) { //新
                gm.DataManager.userData.power--
                gm.DataManager.userData.SetMission = t + 1
                // console.log(gm.DataManager.userData.SetMission)
                // wxUtils.default.showToast("消耗了1体力")
                window.Refish()
                // heartbeatSchedule.default.emitEvent()
                if (window['wx']) {
                    lwsdk.setToServer({
                        dataKey: "girlData",
                        dataType: "girlData",
                        data: gm.DataManager.userData,
                        expireTime: 3600
                    })
                }
                gm.UIManager.SendNotification(o.MOD_MissionView, a.UIInfo_CloseView, null), gm.GameLogic.LoadMission(!0)
            } else {
                cc.loader.loadRes("ui/PowerGet", (err, pre) => {
                    var PowerGetPre = cc.instantiate(pre)
                    PowerGetPre.parent = this.baseUIView.viewNode
                })
            }
        } else {
            wxUtils.default.showToast("关卡未解锁!")
        }
        // t < gm.DataManager.userData.MaxMission && (gm.DataManager.userData.NowMission = t + 1, gm.UIManager.SendNotification(o.MOD_MissionView, a.UIInfo_CloseView, null), gm.GameLogic.LoadMission(!0));
        // }else{
        //     wxUtils.default.showToast("体力不足!") 
        // }
    },
    CloseView: function CloseView() {
        gm.AdManager.closeAdBanner();
    },
    HandleNotification: function HandleNotification(e) {
        cc.log("notification" + e.name + ":" + e.body), e.name;
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView);
    },
    Dispose: function Dispose() {}
})
/*MissionView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3ec22dVevlL8YeU9Ikgm0L8", "MissionView");
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
                this.widgetTable = new Array(), this.widgetTable.Return = "Return", this.widgetTable.Item = "ScrollView/view/content/Item", this.widgetTable.content = "ScrollView/view/content", this.componentTable = new Array(), this.componentTable.ScrollView = ["ScrollView", "cc.ScrollView"];
            },
            HandleEvent: function HandleEvent(e) {
                switch (gm.AudioPlayManager.PlayAudio(s.default.AudioChannelType.Channel_UI, "audios/audio_clickBtn", 1), e.currentTarget.name) {
                    case "Return":
                        gm.UIManager.SendNotification(o.default.MOD_MissionView, a.default.UIInfo_CloseView, null), gm.UIManager.SendNotification(o.default.MOD_BeginView, a.default.UIInfo_ShowView, null);
                }
            },
            AddEvent: function AddEvent() {
                this.widgetTable.Return.on(cc.Node.EventType.TOUCH_END, this.HandleEvent, this);
            },
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {
                if (this.widgetTable.content.childrenCount < gm.GameData.GameLevelDic.length - 1) {
                    this.widgetTable.Item.on(cc.Node.EventType.TOUCH_END, this.ChlickItem, this);
                    for (var e = 0; e < gm.GameData.GameLevelDic.length - 2; e++) {
                        var t = cc.instantiate(this.widgetTable.Item);
                        t.parent = this.widgetTable.content, t.on(cc.Node.EventType.TOUCH_END, this.ChlickItem, this);
                    }
                }
                for (var i = 0; i < gm.GameData.GameLevelDic.length - 1; i++) {
                    var n = this.widgetTable.content.children[i];
                    n.getChildByName("Mission").getComponent(cc.Label).string = i + 1, n.getChildByName("Progress").active = i < gm.DataManager.userData.MaxMission - 1, n.getChildByName("FinishedBtn").active = i < gm.DataManager.userData.MaxMission - 1, n.getChildByName("Lock").active = i > gm.DataManager.userData.MaxMission - 1;
                }
                this.componentTable.ScrollView.scrollToOffset(cc.v2(0, 285 * Math.floor((gm.DataManager.userData.NowLevel - 1) / 3 - 2)), .05);
            },
            ChlickItem: function ChlickItem(e) {
                var t = e.currentTarget.getSiblingIndex();
                t < gm.DataManager.userData.MaxMission && (gm.DataManager.userData.NowMission = t + 1, gm.UIManager.SendNotification(o.default.MOD_MissionView, a.default.UIInfo_CloseView, null), gm.GameLogic.LoadMission(!0));
            },
            CloseView: function CloseView() {
                gm.AdManager.closeAdBanner();
            },
            HandleNotification: function HandleNotification(e) {
                cc.log("notification" + e.name + ":" + e.body), e.name;
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView);
            },
            Dispose: function Dispose() {}
        }), 
*/