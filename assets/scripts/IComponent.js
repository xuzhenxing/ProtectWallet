

cc.Class({
    name: "IComponent",
    extends: require("IUpdateAttachIDispose"),
    properties: {
        enabled: !1,
        parentCom: null
    },
    Init: function Init(e) {
        this.parentCom = e, this.enabled = !0;
    },
    OnUpdate: function OnUpdate(e) {
        this.enabled;
    },
    Dispose: function Dispose() {
        this.parentCom = null;
    }
})

/*IComponent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "45c2cTorI1LI4j19scCEaBv", "IComponent"), cc.Class({
            name: "IComponent",
            extends: e("IUpdateAttachIDispose"),
            properties: {
                enabled: !1,
                parentCom: null
            },
            Init: function Init(e) {
                this.parentCom = e, this.enabled = !0;
            },
            OnUpdate: function OnUpdate(e) {
                this.enabled;
            },
            Dispose: function Dispose() {
                this.parentCom = null;
            }
        }), 
*/