var n = require("util"),
    a = require("UIInfo"),
    o = require("GameConfig");

cc.Class({
    properties: {
        baseUIView: null,
        viewNode: null,
        widgetTable: null,
        componentTable: null,
        DataModule: null,
        Label: null,
        isLoad: !1
    },
    Init: function Init(e) {
        this.baseUIView = e,
            this.viewNode = this.baseUIView.viewNode,
            this.BindUI(),
            n.ParseWidgetByTable(this.viewNode, this.widgetTable),
            n.ParseComponentByTable(this.viewNode, this.Label),
            n.ParseComponentByTable(this.viewNode, this.componentTable);
        this.AddEvent(),
            this.isLoad = !0;
    },
    BindUI: function BindUI() {
        this.widgetTable = new Array(),
            this.widgetTable.peo = 'peo',
            this.componentTable = new Array(),
            this.componentTable.progress = ["Progress", "cc.Sprite"];
        this.Label = new Array(),
            this.Label.String = ["Label", "cc.Label"];
    },
    HandleEvent: function HandleEvent(e) {
        e.currentTarget;
    },
    AddEvent: function AddEvent() {},
    OnUpdate: function OnUpdate(e) {},
    ShowView: function ShowView() {
        this.componentTable.progress.fillRange = 0,
            // this.componentTable.Label.string = "0%",
            o.Start_loading_1, gm.AdManager.dataRecode(o.Start_loading_1);
        // console.log(o.Start_loading_1,"o.Start_loading_1")
    },
    CloseView: function CloseView() {
        o.loaded_1, gm.AdManager.dataRecode(o.loaded_1);
    },
    HandleNotification: function HandleNotification(e) {
        
        switch (e.name) {
            case a.UIInfo_SetProgress:
                console.log(111111111,e.body)
                
                let ss=e.body*10

                if(ss>1){
                    ss=1
                }
                this.Label.String.string = Math.floor(100 * ss) + "%"
                this.isLoad && (this.componentTable.progress.fillRange = ss, ss > 1 && (ss = 1));
                var s = (4 * Math.floor(100 * ss)) - 220;
                // console.log(s,"s    =====")
                // var s = .7 * Math.floor(100 * e.body);
                // console.log(this.componentTable.Label.string,"this.componentTable.Label.string"  ,(4 * Math.floor(100 * e.body)));
                // console.log(s);
                this.widgetTable.peo.x = s;
                // console.log(p)
        }
    },
    RegisterNotification: function RegisterNotification() {
        this.baseUIView.PushNotification(a.UIInfo_RefreshView), this.baseUIView.PushNotification(a.UIInfo_SetProgress);
    },
    Dispose: function Dispose() {}
})
/*GameLoading: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "76e317AahRLWpIpobDplTup", "GameLoading");
        var n = s(e("util")),
            a = s(e("UIInfo")),
            o = s(e("GameConfig"));

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
                DataModule: null,
                isLoad: !1
            },
            Init: function Init(e) {
                this.baseUIView = e, this.viewNode = this.baseUIView.viewNode, this.BindUI(), n.default.ParseWidgetByTable(this.viewNode, this.widgetTable), n.default.ParseComponentByTable(this.viewNode, this.componentTable), this.AddEvent(), this.isLoad = !0, cc.log("Init>>>>>>>>>>>>");
            },
            BindUI: function BindUI() {
                this.widgetTable = new Array(), this.componentTable = new Array(), this.componentTable.progress = ["Progress", "cc.Sprite"], this.componentTable.Label = ["Label", "cc.Label"];
            },
            HandleEvent: function HandleEvent(e) {
                e.currentTarget;
            },
            AddEvent: function AddEvent() {},
            OnUpdate: function OnUpdate(e) {},
            ShowView: function ShowView() {
                this.componentTable.progress.fillRange = 0, this.componentTable.Label.string = "0%", gm.AdManager.dataRecode(o.default.Start_loading_1);
            },
            CloseView: function CloseView() {
                gm.AdManager.dataRecode(o.default.loaded_1);
            },
            HandleNotification: function HandleNotification(e) {
                switch (e.name) {
                    case a.default.UIInfo_SetProgress:
                        this.isLoad && (this.componentTable.progress.fillRange = e.body, e.body > 1 && (e.body = 1), this.componentTable.Label.string = Math.floor(100 * e.body) + "%");
                }
            },
            RegisterNotification: function RegisterNotification() {
                this.baseUIView.PushNotification(a.default.UIInfo_RefreshView), this.baseUIView.PushNotification(a.default.UIInfo_SetProgress);
            },
            Dispose: function Dispose() {}
        }), 
*/