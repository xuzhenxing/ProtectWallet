

 var n = require("Model"),
 a = require("View"),
 o = require("Notification"),
 s = require("util");

 cc.Class({
    properties: {
        m_model: null,
        m_view: null
    },
    Init: function Init() {
        this.m_model = new n(), this.m_model.Init(), this.m_view = new a(), this.m_view.Init(this), this.Overloading();
    },
    RegisterProxy: function RegisterProxy(e) {
        this.m_model.RegisterProxy(e);
    },
    RetrieveProxy: function RetrieveProxy(e) {
        return this.m_model.RetrieveProxy(e);
    },
    RemoveProxy: function RemoveProxy(e) {
        this.m_model.RemoveProxy(e);
    },
    HasProxy: function HasProxy(e) {
        return this.m_model.HasProxy(e);
    },
    RegisterMediator: function RegisterMediator(e) {
        this.m_view.RegisterMediator(e);
    },
    RetrieveMediator: function RetrieveMediator(e) {
        return this.m_view.RetrieveMediator(e);
    },
    RemoveMediator: function RemoveMediator(e) {
        this.m_view.RemoveMediator(e);
    },
    HasMediator: function HasMediator(e) {
        return this.m_view.HasMediator(e);
    },
    RegisterObserver: function RegisterObserver(e, t) {
        this.m_view.RegisterObserver(e, t);
    },
    RemoveObserver: function RemoveObserver(e, t) {
        this.m_view.RemoveObserver(e, t);
    },
    NotifyObservers: function NotifyObservers(e) {
        this.m_view.NotifyObservers(e);
    },
    Overloading: function Overloading() {
        var e = this,
            t = function t(_t2) {
                var i = new o();
                i.Init(_t2), e.NotifyObservers(i);
            };
        s.OverloadingFunc(this, "SendNotification", t), t = function t(_t3, i) {
            var n = new o();
            n.Init(_t3, i), e.NotifyObservers(n);
        }, s.OverloadingFunc(this, "SendNotification", t), t = function t(_t4, i, n) {
            var a = new o();
            a.Init(_t4, i, n), e.NotifyObservers(a);
        }, s.OverloadingFunc(this, "SendNotification", t), t = function t(_t5, i, n, a) {
            var s = new o();
            s.Init(_t5, i, n, a), e.NotifyObservers(s);
        }, s.OverloadingFunc(this, "SendNotification", t);
    }
})

/*Facade: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "26c36SaVPFM04A+s13xJ0Jg", "Facade");
        var n = r(e("Model")),
            a = r(e("View")),
            o = r(e("Notification")),
            s = r(e("util"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            properties: {
                m_model: null,
                m_view: null
            },
            Init: function Init() {
                this.m_model = new n.default(), this.m_model.Init(), this.m_view = new a.default(), this.m_view.Init(this), this.Overloading();
            },
            RegisterProxy: function RegisterProxy(e) {
                this.m_model.RegisterProxy(e);
            },
            RetrieveProxy: function RetrieveProxy(e) {
                return this.m_model.RetrieveProxy(e);
            },
            RemoveProxy: function RemoveProxy(e) {
                this.m_model.RemoveProxy(e);
            },
            HasProxy: function HasProxy(e) {
                return this.m_model.HasProxy(e);
            },
            RegisterMediator: function RegisterMediator(e) {
                this.m_view.RegisterMediator(e);
            },
            RetrieveMediator: function RetrieveMediator(e) {
                return this.m_view.RetrieveMediator(e);
            },
            RemoveMediator: function RemoveMediator(e) {
                this.m_view.RemoveMediator(e);
            },
            HasMediator: function HasMediator(e) {
                return this.m_view.HasMediator(e);
            },
            RegisterObserver: function RegisterObserver(e, t) {
                this.m_view.RegisterObserver(e, t);
            },
            RemoveObserver: function RemoveObserver(e, t) {
                this.m_view.RemoveObserver(e, t);
            },
            NotifyObservers: function NotifyObservers(e) {
                this.m_view.NotifyObservers(e);
            },
            Overloading: function Overloading() {
                var e = this,
                    t = function t(_t2) {
                        var i = new o.default();
                        i.Init(_t2), e.NotifyObservers(i);
                    };
                s.default.OverloadingFunc(this, "SendNotification", t), t = function t(_t3, i) {
                    var n = new o.default();
                    n.Init(_t3, i), e.NotifyObservers(n);
                }, s.default.OverloadingFunc(this, "SendNotification", t), t = function t(_t4, i, n) {
                    var a = new o.default();
                    a.Init(_t4, i, n), e.NotifyObservers(a);
                }, s.default.OverloadingFunc(this, "SendNotification", t), t = function t(_t5, i, n, a) {
                    var s = new o.default();
                    s.Init(_t5, i, n, a), e.NotifyObservers(s);
                }, s.default.OverloadingFunc(this, "SendNotification", t);
            }
        }), 
*/