

var n = require("util"),
a = require("UIInfo");
require("ConstModName"), require("GameConfig"), require("GameDefine");

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
        this.widgetTable = new Array(), this.componentTable = new Array();
    },
    HandleEvent: function HandleEvent(e) {
        e.currentTarget;
    },
    AddEvent: function AddEvent() {},
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {},
    CloseView: function CloseView() {},
    HandleNotification: function HandleNotification(e) {
        cc.log("notification" + e.name + ":" + e.body), e.name;
    },
    RegisterNotification: function RegisterNotification() {
         this.baseUIView.PushNotification(a.UIInfo_RefreshView);
    },
    Dispose: function Dispose() {}
})
/*UITemplate: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "37f6b0KV2tEXaxn/SO6+gCw", "UITemplate");
        var n = o(e("util")),
            a = o(e("UIInfo"));
        o(e("ConstModName")), o(e("GameConfig")), o(e("GameDefine"));

        function o(e) {
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
                this.widgetTable = new Array(), this.componentTable = new Array();
            },
            HandleEvent: function HandleEvent(e) {
                e.currentTarget;
            },
            AddEvent: function AddEvent() {},
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {},
            CloseView: function CloseView() {},
            HandleNotification: function HandleNotification(e) {
                cc.log("notification" + e.name + ":" + e.body), e.name;
            },
            RegisterNotification: function RegisterNotification() {
                cc.log("RegisterNotification>>>>>>>>>>>>"), this.baseUIView.PushNotification(a.default.UIInfo_RefreshView);
            },
            Dispose: function Dispose() {}
        }), 
*/