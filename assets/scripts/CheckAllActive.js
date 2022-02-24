

require("UIInfo"), require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        target: [cc.Node],
        activeCallBack: [cc.Component.EventHandler],
        unActiveCallBack: [cc.Component.EventHandler]
    },
    CheckAllActive: function CheckAllActive() {
        if (0 != this.target.length) {
            for (var e = !0, t = !0, i = 0; i < this.target.length; i++) {
                var n = this.target[i];
                e && (n.active || (e = !1)), t && n.active && (t = !1);
            }
            e && null != this.activeCallBack && this.activeCallBack.forEach(function (e) {
                e.emit();
            }), t && null != this.unActiveCallBack && this.unActiveCallBack.forEach(function (e) {
                e.emit();
            });
        }
    }
})

/*CheckAllActive: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3095b9tYwtJqJ2Y3Yvt9Pgy", "CheckAllActive");
        n(e("UIInfo")), n(e("ConstModName"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                target: [cc.Node],
                activeCallBack: [cc.Component.EventHandler],
                unActiveCallBack: [cc.Component.EventHandler]
            },
            CheckAllActive: function CheckAllActive() {
                if (0 != this.target.length) {
                    for (var e = !0, t = !0, i = 0; i < this.target.length; i++) {
                        var n = this.target[i];
                        e && (n.active || (e = !1)), t && n.active && (t = !1);
                    }
                    e && null != this.activeCallBack && this.activeCallBack.forEach(function (e) {
                        e.emit();
                    }), t && null != this.unActiveCallBack && this.unActiveCallBack.forEach(function (e) {
                        e.emit();
                    });
                }
            }
        }), 
*/