

var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Label
    },
    Imput: function Imput(e, t) {
        if (cc.log(t), "0" == this.label.string && 0 == t) return this.label.string = "\u221E", void cc.log(this.label.string);
        "\u221E" == this.label.string && (this.label.string = null), null == this.label.string ? this.label.string = t.toString() : (cc.log(this.label.string), cc.log(t.toString()), this.label.string = this.label.string + t.toString()), cc.log(this.label.string);
    },
    Sure: function Sure(e) {
        cc.log(this.label.string), "\u221E" == this.label.string ? gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, e) : gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowError, e);
    }
})
/*Mission28: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "2f126GixwdFb4DNYVVRgOzh", "Mission28");
        var n = o(e("UIInfo")),
            a = o(e("ConstModName"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        cc.Class({
            extends: cc.Component,
            properties: {
                label: cc.Label
            },
            Imput: function Imput(e, t) {
                if (cc.log(t), "0" == this.label.string && 0 == t) return this.label.string = "\u221E", void cc.log(this.label.string);
                "\u221E" == this.label.string && (this.label.string = null), null == this.label.string ? this.label.string = t.toString() : (cc.log(this.label.string), cc.log(t.toString()), this.label.string = this.label.string + t.toString()), cc.log(this.label.string);
            },
            Sure: function Sure(e) {
                cc.log(this.label.string), "\u221E" == this.label.string ? gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, e) : gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowError, e);
            }
        }), 
*/