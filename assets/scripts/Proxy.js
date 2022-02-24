

cc.Class({
    properties: {
        proxyName: null,
        data: null
    },
    Init: function Init(e, t) {
        this.proxyName = e, this.data = t;
    },
    OnRegister: function OnRegister() {},
    OnRemove: function OnRemove() {}
})

/*Proxy: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8d25eYATWtGjqutPd4mi3l5", "Proxy"), cc.Class({
            properties: {
                proxyName: null,
                data: null
            },
            Init: function Init(e, t) {
                this.proxyName = e, this.data = t;
            },
            OnRegister: function OnRegister() {},
            OnRemove: function OnRemove() {}
        }), 
*/