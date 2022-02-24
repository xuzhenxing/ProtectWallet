
var n = require("util")
cc.Class({
    extends: cc.Component,
    properties: {
        callBack: [cc.Component.EventHandler]
    },
    RandomCall: function RandomCall() {
        if (null != this.callBack) {
            var e = n.getRandom(0, this.callBack.length - 1);
            this.callBack[e].emit();
        }
    }
})

/*RandomCall: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "14243f1YdVPcLfo/zwWq46q", "RandomCall");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                callBack: [cc.Component.EventHandler]
            },
            RandomCall: function RandomCall() {
                if (null != this.callBack) {
                    var e = n.default.getRandom(0, this.callBack.length - 1);
                    this.callBack[e].emit();
                }
            }
        }), 
*/