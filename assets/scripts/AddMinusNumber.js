var n = require("UIInfo"),
    a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        TargetNum: cc.Integer,
        NumLabel: cc.Label,
    },
    start: function start() {
        this._NowNum = 0, this.ChangeLabel();
    },
    ChangeLabel: function ChangeLabel() {
        this.NumLabel.string = this._NowNum;
    },
    AddNum: function AddNum(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), this._NowNum++, this.ChangeLabel();
    },
    MinusNum: function MinusNum(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), this._NowNum--, this.ChangeLabel();
    },
    ClearNum: function ClearNum(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), this._NowNum = 0, this.ChangeLabel();
    },
    CheckNum: function CheckNum(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), this._NowNum == this.TargetNum ? gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, null) : gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowError, null);
    }
})
/*AddMinusNumber: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "29721cB7kFKF6IgoFtG2zP+", "AddMinusNumber");
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
                TargetNum: cc.Integer,
                NumLabel: cc.Label
            },
            start: function start() {
                this._NowNum = 0, this.ChangeLabel();
            },
            ChangeLabel: function ChangeLabel() {
                this.NumLabel.string = this._NowNum;
            },
            AddNum: function AddNum(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), this._NowNum++, this.ChangeLabel();
            },
            MinusNum: function MinusNum(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), this._NowNum--, this.ChangeLabel();
            },
            ClearNum: function ClearNum(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), this._NowNum = 0, this.ChangeLabel();
            },
            CheckNum: function CheckNum(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), this._NowNum == this.TargetNum ? gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, null) : gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowError, null);
            }
        }), 
*/