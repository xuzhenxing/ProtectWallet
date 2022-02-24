

var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Label,
        red: cc.Node,
        blue: cc.Node
    },
    start: function start() {
        this.redNum = 0, this.blueNum = 0, this.red.on(cc.Node.EventType.TOUCH_END, this.startRedClick, this), this.blue.on(cc.Node.EventType.TOUCH_END, this.endRedClick, this);
    },
    startRedClick(e){
        console.log('点击Mission33    startRedClick')
        this.redNum++, this.chooseRight();
    },
    endRedClick(e){
        console.log('点击Mission33    endRedClick')
        this.blueNum++, this.label.string = this.blueNum, this.blueNum > 6 && (this.label.string = this.blueNum + 1);
    },
    chooseRight: function chooseRight(e) {
        1 == this.redNum && 10 == this.blueNum ? gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_FinishLevel, e) : (gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowError, e), gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_RefreshView, e));
    }
})
/*Mission33: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7d36fjuej5D8p0WCggI/7ce", "Mission33");
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
                label: cc.Label,
                red: cc.Node,
                blue: cc.Node
            },
            start: function start() {
                this.redNum = 0, this.blueNum = 0, this.red.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this.redNum++, this.CheckRight();
                }, this), this.blue.on(cc.Node.EventType.TOUCH_END, function (e) {
                    this.blueNum++, this.label.string = this.blueNum, this.blueNum > 6 && (this.label.string = this.blueNum + 1);
                }, this);
            },
            CheckRight: function CheckRight(e) {
                1 == this.redNum && 10 == this.blueNum ? gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_FinishLevel, e) : (gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowError, e), gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_RefreshView, e));
            }
        }), 
*/