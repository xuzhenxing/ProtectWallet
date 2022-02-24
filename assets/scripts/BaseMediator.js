var n = require("UIInfo");
require("ModulesLib");
cc.Class({
    properties: {
        mediatorName: null,
        viewComponent: null,
        notificationList: null,
        isLoading: !1,
        viewScript: null
    },
    Init: function Init(t) {
        this.mediatorName = t;
        var i = require("BaseUIView");
        this.viewComponent = new i(), this.notificationList = new Array(), this.viewComponent.Init(this), this.RegisterInfoListener();
    },
    HandleNotification: function HandleNotification(e) {
        switch (this.viewComponent.HandleNotification(e), e.name) {
            case n.UIInfo_ShowView:
                console.log("basemeHandleNotification",e)
                0 == this.viewComponent.isLoading && this.viewComponent.ShowView();
                break;
            case n.UIInfo_CloseView:
                null != this.viewComponent && this.viewComponent.CloseView();
        }
    },
    RegisterInfoListener: function RegisterInfoListener() {
        this.PushInfo(n.UIInfo_ShowView), this.PushInfo(n.UIInfo_CloseView), this.viewComponent.RegisterAllNotification();
    },
    PushInfo: function PushInfo(e) {
        this.notificationList.push(e);
    },
    ListNotificationInterests: function ListNotificationInterests() {
        return this.notificationList;
    },
    OnRegister: function OnRegister() {},
    OnRemove: function OnRemove() {}
})

/*BaseMediator: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b9f7aFQ/rBIuZR68SjTWd31", "BaseMediator");
        var n = a(e("UIInfo"));
        a(e("ModulesLib"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                mediatorName: null,
                viewComponent: null,
                notificationList: null,
                isLoading: !1,
                viewScript: null
            },
            Init: function Init(t) {
                this.mediatorName = t;
                var i = e("BaseUIView");
                this.viewComponent = new i(), this.notificationList = new Array(), this.viewComponent.Init(this), this.RegisterInfoListener();
            },
            HandleNotification: function HandleNotification(e) {
                switch (this.viewComponent.HandleNotification(e), e.name) {
                    case n.default.UIInfo_ShowView:
                        0 == this.viewComponent.isLoading && this.viewComponent.ShowView();
                        break;
                    case n.default.UIInfo_CloseView:
                        null != this.viewComponent && this.viewComponent.CloseView();
                }
            },
            RegisterInfoListener: function RegisterInfoListener() {
                this.PushInfo(n.default.UIInfo_ShowView), this.PushInfo(n.default.UIInfo_CloseView), this.viewComponent.RegisterAllNotification();
            },
            PushInfo: function PushInfo(e) {
                this.notificationList.push(e);
            },
            ListNotificationInterests: function ListNotificationInterests() {
                return this.notificationList;
            },
            OnRegister: function OnRegister() {},
            OnRemove: function OnRemove() {}
        }), 
*/