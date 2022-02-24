

cc.Class({
    properties: {
        m_proxyMap: null
    },
    Init: function Init() {
        this.m_proxyMap = new Array();
    },
    RegisterProxy: function RegisterProxy(e) {
        null == this.m_proxyMap[e.proxyName] && (this.m_proxyMap[e.proxyName] = e), e.OnRegister();
    },
    RemoveProxy: function RemoveProxy(e) {
        if (null != this.m_proxyMap[e]) {
            var t = this.m_proxyMap[e];
            return delete this.m_proxyMap[e], t.OnRemove(), t;
        }
        return null;
    },
    RetrieveProxy: function RetrieveProxy(e) {
        return this.m_proxyMap[e];
    },
    HasProxy: function HasProxy(e) {
        return null != this.m_proxyMap[e];
    }
})
/*Model: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "2cd86c8CixBUYF6P6P0jMrf", "Model"), cc.Class({
            properties: {
                m_proxyMap: null
            },
            Init: function Init() {
                this.m_proxyMap = new Array();
            },
            RegisterProxy: function RegisterProxy(e) {
                null == this.m_proxyMap[e.proxyName] && (this.m_proxyMap[e.proxyName] = e), e.OnRegister();
            },
            RemoveProxy: function RemoveProxy(e) {
                if (null != this.m_proxyMap[e]) {
                    var t = this.m_proxyMap[e];
                    return delete this.m_proxyMap[e], t.OnRemove(), t;
                }
                return null;
            },
            RetrieveProxy: function RetrieveProxy(e) {
                return this.m_proxyMap[e];
            },
            HasProxy: function HasProxy(e) {
                return null != this.m_proxyMap[e];
            }
        }), 
*/