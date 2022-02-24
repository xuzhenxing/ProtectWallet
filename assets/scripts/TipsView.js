

var n = require("util"),
a = require("UIInfo"),
o = require("ConstModName");
require("GameConfig"), require("GameDefine"), require("AdType");
cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null
    },
    Init: function Init(e) {
        this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.ParseWidgetByTable(this.viewNode, this.widgetTable), n.ParseComponentByTable(this.viewNode, this.componentTable), this.AddEvent();
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(), this.componentTable = new Array(), this.componentTable.Content = ["Content", "cc.Label"];
    },
    HandleEvent: function HandleEvent(e) {
        e.currentTarget;
    },
    AddEvent: function AddEvent() {},
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {
        this.componentTable.Content.string = this.NowshowText;
        var e = cc.delayTime(2),
            t = cc.callFunc(function () {
                gm.UIManager.SendNotification(o.MOD_TipsView, a.UIInfo_CloseView, null);
            }.bind(this), this, null);
        null != this._AniAction && (this.viewNode.stopAction(this._AniAction), this._AniAction = null), this._AniAction = this.viewNode.runAction(cc.sequence(e, t));
    },
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        this.NowshowText = e.body, e.name;
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView);
    },
    Dispose: function Dispose() {}
})
/*TipsView: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a3399C4jWdI85vChm/H5U0O", "TipsView");
        var n = s(e("util")),
            a = s(e("UIInfo")),
            o = s(e("ConstModName"));
        s(e("GameConfig")), s(e("GameDefine")), s(e("AdType"));

        function s(e) {
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
                this.widgetTable = new Array(), this.componentTable = new Array(), this.componentTable.Content = ["Content", "cc.Label"];
            },
            HandleEvent: function HandleEvent(e) {
                e.currentTarget;
            },
            AddEvent: function AddEvent() {},
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {
                this.componentTable.Content.string = this.NowshowText;
                var e = cc.delayTime(2),
                    t = cc.callFunc(function () {
                        gm.UIManager.SendNotification(o.default.MOD_TipsView, a.default.UIInfo_CloseView, null);
                    }.bind(this), this, null);
                null != this._AniAction && (this.viewNode.stopAction(this._AniAction), this._AniAction = null), this._AniAction = this.viewNode.runAction(cc.sequence(e, t));
            },
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                this.NowshowText = e.body, e.name;
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView);
            },
            Dispose: function Dispose() {}
        }), 
*/