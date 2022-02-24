

require("UIInfo"), require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        left: cc.Node,
        right: cc.Node,
        ani: cc.Animation,
        weights: [cc.Node],
        SuccessCallBack: [cc.Component.EventHandler],
        ErrorCallBack: [cc.Component.EventHandler]
    },
    CheckBalance: function CheckBalance() {
        for (var e = 0; e < this.weights.length; e++) {
            var t = this.weights[e],
                i = t.convertToWorldSpaceAR(cc.Vec2.ZERO),
                n = this.node.convertToNodeSpaceAR(i);
            t.parent = this.node, t.position = n;
        }
        for (var a = this.left.convertToWorldSpaceAR(cc.Vec2.ZERO), o = this.right.convertToWorldSpaceAR(cc.Vec2.ZERO), s = this.GetWeight(a, this.left), r = this.GetWeight(o, this.right), c = 0; c < this.weights.length; c++) {
            var l = this.weights[c];
            l.parent == this.node && l.getComponent("ResetPos").ResetPosition();
        }
        if (this.ani.off("finished", this.SuccessCall, this), this.ani.off("finished", this.ErrorCall, this), s == r) {
            if (null != this.ani.currentClip && ("Mission34_left_down" == this.ani.currentClip.name || "Mission34_left_up" == this.ani.currentClip.name)) return;
            a.y > o.y ? this.ani.play("Mission34_left_down") : this.ani.play("Mission34_left_up"), this.ani.on("finished", this.SuccessCall, this);
        } else {
            if (s > r && a.y > o.y) {
                if (null != this.ani.currentClip && "Mission34_balance_down" == this.ani.currentClip.name) return;
                this.ani.play("Mission34_balance_down");
            }
            if (s < r && a.y < o.y) {
                if (null != this.ani.currentClip && "Mission34_balance_up" == this.ani.currentClip.name) return;
                this.ani.play("Mission34_balance_up");
            }
            this.ani.on("finished", this.ErrorCall, this);
        }
    },
    SuccessCall: function SuccessCall() {
        null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
            e.emit();
        });
    },
    ErrorCall: function ErrorCall() {
        null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
            e.emit();
        });
    },
    GetWeight: function GetWeight(e, t) {
        for (var i = 0, n = 0; n < this.weights.length; n++) {
            var a = this.weights[n],
                o = a.convertToWorldSpaceAR(cc.Vec2.ZERO);
            if (e.sub(o).mag() < 40) {
                i += Number.parseInt(a.name);
                var s = t.convertToNodeSpaceAR(o);
                a.parent = t, a.position = s;
            }
        }
        return i;
    }
})
/*Mission34: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8c7eam5mMtNWJ9IOxdy1L+K", "Mission34");
        n(e("UIInfo")), n(e("ConstModName"));

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                left: cc.Node,
                right: cc.Node,
                ani: cc.Animation,
                weights: [cc.Node],
                SuccessCallBack: [cc.Component.EventHandler],
                ErrorCallBack: [cc.Component.EventHandler]
            },
            CheckBalance: function CheckBalance() {
                for (var e = 0; e < this.weights.length; e++) {
                    var t = this.weights[e],
                        i = t.convertToWorldSpaceAR(cc.Vec2.ZERO),
                        n = this.node.convertToNodeSpaceAR(i);
                    t.parent = this.node, t.position = n;
                }
                for (var a = this.left.convertToWorldSpaceAR(cc.Vec2.ZERO), o = this.right.convertToWorldSpaceAR(cc.Vec2.ZERO), s = this.GetWeight(a, this.left), r = this.GetWeight(o, this.right), c = 0; c < this.weights.length; c++) {
                    var l = this.weights[c];
                    l.parent == this.node && l.getComponent("ResetPos").ResetPosition();
                }
                if (this.ani.off("finished", this.SuccessCall, this), this.ani.off("finished", this.ErrorCall, this), s == r) {
                    if (null != this.ani.currentClip && ("Mission34_left_down" == this.ani.currentClip.name || "Mission34_left_up" == this.ani.currentClip.name)) return;
                    a.y > o.y ? this.ani.play("Mission34_left_down") : this.ani.play("Mission34_left_up"), this.ani.on("finished", this.SuccessCall, this);
                } else {
                    if (s > r && a.y > o.y) {
                        if (null != this.ani.currentClip && "Mission34_balance_down" == this.ani.currentClip.name) return;
                        this.ani.play("Mission34_balance_down");
                    }
                    if (s < r && a.y < o.y) {
                        if (null != this.ani.currentClip && "Mission34_balance_up" == this.ani.currentClip.name) return;
                        this.ani.play("Mission34_balance_up");
                    }
                    this.ani.on("finished", this.ErrorCall, this);
                }
            },
            SuccessCall: function SuccessCall() {
                null != this.SuccessCallBack && this.SuccessCallBack.forEach(function (e) {
                    e.emit();
                });
            },
            ErrorCall: function ErrorCall() {
                null != this.ErrorCallBack && this.ErrorCallBack.forEach(function (e) {
                    e.emit();
                });
            },
            GetWeight: function GetWeight(e, t) {
                for (var i = 0, n = 0; n < this.weights.length; n++) {
                    var a = this.weights[n],
                        o = a.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    if (e.sub(o).mag() < 40) {
                        i += Number.parseInt(a.name);
                        var s = t.convertToNodeSpaceAR(o);
                        a.parent = t, a.position = s;
                    }
                }
                return i;
            }
        }), 
*/