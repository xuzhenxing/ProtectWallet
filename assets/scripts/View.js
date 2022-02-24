
var n =require("Observer")
cc.Class({
    properties: {
        m_mediatorMap: null,
        m_observerMap: null,
        m_facade: null
    },
    Init: function Init(e) {
        this.m_facade = e, this.m_mediatorMap = new Array(), this.m_observerMap = new Array();
    },
    RegisterObserver: function RegisterObserver(e, t) {
        null == this.m_observerMap[e] && (this.m_observerMap[e] = new Array()), this.m_observerMap[e].push(t);
    },
    NotifyObservers: function NotifyObservers(e) {
        console.log("otifyObserversotifyObservers",e)
        var t = null;
        if (null == e.moduleName || null == this.m_mediatorMap[e.moduleName]) {
            if (null != this.m_observerMap[e.name])
                for (var i = (t = this.m_observerMap[e.name]).length, n = 0; n < i; n++) {
                    t[n].NotifyObserver(e);
                }
        } else this.m_mediatorMap[e.moduleName].HandleNotification(e);
    },
    RemoveObserver: function RemoveObserver(e, t) {
        if (null != this.m_observerMap[e]) {
            for (var i = this.m_observerMap[e], n = i.length - 1; n >= 0; n--) {
                i[n].CompareNotifyContext(t) && i.splice(n, 1);
            }
            i.length <= 0 && delete this.m_observerMap[e];
        }
    },
    RegisterMediator: function RegisterMediator(e) {
        if (null == this.m_mediatorMap[e.mediatorName]) {
            this.m_mediatorMap[e.mediatorName] = e;
            var t = e.ListNotificationInterests(),
                i = t.length;
            if (i > 0) {
                var a = new n();
                a.Init("HandleNotification", e);
                for (var o = 0; o < i; o++) {
                    this.RegisterObserver(t[o], a);
                }
            }
            e.OnRegister();
        }
    },
    RetrieveMediator: function RetrieveMediator(e) {
        return null != this.m_mediatorMap[e] ? this.m_mediatorMap[e] : null;
    },
    RemoveMediator: function RemoveMediator(e) {
        var t = null;
        if (null != this.m_mediatorMap[e]) {
            var i = (t = this.m_mediatorMap[e]).ListNotificationInterests(),
                n = i.length;
            if (n > 0) {
                for (var a = 0; a < n; a++) {
                    RemoveObserver(i[a], t);
                }
                delete this.m_mediatorMap[e];
            }
            null != t && t.OnRemove();
        }
    },
    HasMediator: function HasMediator(e) {
        return null != this.m_mediatorMap[e];
    }
})

/*View: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "1838biLDRdODYuCTCC+9+je", "View");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("Observer"));
        cc.Class({
            properties: {
                m_mediatorMap: null,
                m_observerMap: null,
                m_facade: null
            },
            Init: function Init(e) {
                this.m_facade = e, this.m_mediatorMap = new Array(), this.m_observerMap = new Array();
            },
            RegisterObserver: function RegisterObserver(e, t) {
                null == this.m_observerMap[e] && (this.m_observerMap[e] = new Array()), this.m_observerMap[e].push(t);
            },
            NotifyObservers: function NotifyObservers(e) {
                var t = null;
                if (null == e.moduleName || null == this.m_mediatorMap[e.moduleName]) {
                    if (null != this.m_observerMap[e.name])
                        for (var i = (t = this.m_observerMap[e.name]).length, n = 0; n < i; n++) {
                            t[n].NotifyObserver(e);
                        }
                } else this.m_mediatorMap[e.moduleName].HandleNotification(e);
            },
            RemoveObserver: function RemoveObserver(e, t) {
                if (null != this.m_observerMap[e]) {
                    for (var i = this.m_observerMap[e], n = i.length - 1; n >= 0; n--) {
                        i[n].CompareNotifyContext(t) && i.splice(n, 1);
                    }
                    i.length <= 0 && delete this.m_observerMap[e];
                }
            },
            RegisterMediator: function RegisterMediator(e) {
                if (null == this.m_mediatorMap[e.mediatorName]) {
                    this.m_mediatorMap[e.mediatorName] = e;
                    var t = e.ListNotificationInterests(),
                        i = t.length;
                    if (i > 0) {
                        var a = new n.default();
                        a.Init("HandleNotification", e);
                        for (var o = 0; o < i; o++) {
                            this.RegisterObserver(t[o], a);
                        }
                    }
                    e.OnRegister();
                }
            },
            RetrieveMediator: function RetrieveMediator(e) {
                return null != this.m_mediatorMap[e] ? this.m_mediatorMap[e] : null;
            },
            RemoveMediator: function RemoveMediator(e) {
                var t = null;
                if (null != this.m_mediatorMap[e]) {
                    var i = (t = this.m_mediatorMap[e]).ListNotificationInterests(),
                        n = i.length;
                    if (n > 0) {
                        for (var a = 0; a < n; a++) {
                            RemoveObserver(i[a], t);
                        }
                        delete this.m_mediatorMap[e];
                    }
                    null != t && t.OnRemove();
                }
            },
            HasMediator: function HasMediator(e) {
                return null != this.m_mediatorMap[e];
            }
        }), 
*/