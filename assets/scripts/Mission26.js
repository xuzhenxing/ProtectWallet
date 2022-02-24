

var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        label1: cc.Label,
        label2: cc.Label,
        label3: cc.Label,
        label4: cc.Label,
        realNum: cc.Integer
    },
    Imput: function Imput(e, t) {
        return 0 == this._num1 ? (this._num1 = t, void(this.label1.string = t)) : 0 == this._num2 ? (this._num2 = t, void(this.label2.string = t)) : 0 == this._num3 ? (this._num3 = t, void(this.label3.string = t)) : 0 == this._num4 ? (this._num4 = t, void(this.label4.string = t)) : void 0;
    },
    Sure: function Sure(e) {
        this._NowNum = 0, 0 != this._num1 && (this._NowNum += this._num1), 0 != this._num2 && (this._NowNum += 10 * this._num2), 0 != this._num3 && (this._NowNum += 100 * this._num3), 0 != this._num4 && (this._NowNum += 1e3 * this._num4), cc.log(this._NowNum), this._NowNum == this.realNum ? gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, e) : gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowError, e);
    },
    start: function start() {
        this._num1 = 0, this._num2 = 0, this._num3 = 0, this._num4 = 0;
    }
})

/*Mission26: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "841b0kR645BTo2MzYFse04u", "Mission26");
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
                label1: cc.Label,
                label2: cc.Label,
                label3: cc.Label,
                label4: cc.Label,
                realNum: cc.Integer
            },
            Imput: function Imput(e, t) {
                return 0 == this._num1 ? (this._num1 = t, void(this.label1.string = t)) : 0 == this._num2 ? (this._num2 = t, void(this.label2.string = t)) : 0 == this._num3 ? (this._num3 = t, void(this.label3.string = t)) : 0 == this._num4 ? (this._num4 = t, void(this.label4.string = t)) : void 0;
            },
            Sure: function Sure(e) {
                this._NowNum = 0, 0 != this._num1 && (this._NowNum += this._num1), 0 != this._num2 && (this._NowNum += 10 * this._num2), 0 != this._num3 && (this._NowNum += 100 * this._num3), 0 != this._num4 && (this._NowNum += 1e3 * this._num4), cc.log(this._NowNum), this._NowNum == this.realNum ? gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, e) : gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowError, e);
            },
            start: function start() {
                this._num1 = 0, this._num2 = 0, this._num3 = 0, this._num4 = 0;
            }
        }), 
*/