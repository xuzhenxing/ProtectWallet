

require("UIInfo"), require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        target: cc.Node,
        length: cc.Integer = 50,
        SuccessCallBack: [cc.Component.EventHandler],
        ErrorCallBack: [cc.Component.EventHandler]
    },
    CheckDistance: function CheckDistance() {
        var e = this.target.convertToWorldSpaceAR(cc.v2(0, 0)),
            t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        cc.log("targetWorldPos" + e), cc.log("nodeWrldPos" + t), Math.abs(e.x - t.x) < this.length && Math.abs(e.y - t.y) < this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
            e.emit();
        }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
            e.emit();
        });
    }
})

/*CheckDistance: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b2a17SRFdlIeZlgZtj7IQX1", "CheckDistance");
        n(e("UIInfo")), n(e("ConstModName"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                target: cc.Node,
                length: cc.Integer = 50,
                SuccessCallBack: [cc.Component.EventHandler],
                ErrorCallBack: [cc.Component.EventHandler]
            },
            CheckDistance: function CheckDistance() {
                var e = this.target.convertToWorldSpaceAR(cc.v2(0, 0)),
                    t = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                cc.log("targetWorldPos" + e), cc.log("nodeWrldPos" + t), Math.abs(e.x - t.x) < this.length && Math.abs(e.y - t.y) < this.length ? null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                }) : null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
                    e.emit();
                });
            }
        }), 
*/