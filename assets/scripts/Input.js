

 var n = require("UIInfo"),
a = require("ConstModName");
cc.Class({
    extends: cc.Component,
    properties: {
        targetNum: cc.Integer,
        editbox: cc.EditBox,
        rightCallback: [cc.Component.EventHandler],
        errCallback: [cc.Component.EventHandler],
        blurNode: cc.Node
    },
    start: function start() {
        this.blurNode.on(cc.Node.EventType.TOUCH_END,this.blurClick,this);
    },
    blurClick(){
        console.log('点击blur按钮')
        this.editbox.blur();
    },
    CheckNumber: function CheckNumber(e) {
        gm.UIManager.SendNotification(a.MOD_MainView, n.UIInfo_ShowClick, e), cc.log(this.editbox.textLabel.string), this.editbox.textLabel.string == this.targetNum ? null != this.rightCallback && this.rightCallback.forEach(function (e) {
            e.emit();
        }) : null != this.errCallback && this.errCallback.forEach(function (e) {
            e.emit();
        });
    },
    TextChange: function TextChange(e) {
        cc.log(e);
        var t = Number.parseInt(e);
        isNaN(t) && (t = ""), this.editbox.textLabel.string = t, this.editbox.placeholderLabel.string = t, this.editbox.string = t, cc.log(this.editbox.textLabel.string);
    },
    update: function update(e) {
        cc.log(this.editbox.isFocused());
    }
})
/*Input: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "09d57h5nh9Oh5iNTh8Q1ikS", "Input");
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
                targetNum: cc.Integer,
                editbox: cc.EditBox,
                rightCallback: [cc.Component.EventHandler],
                errCallback: [cc.Component.EventHandler],
                blurNode: cc.Node
            },
            start: function start() {
                this.blurNode.on(cc.Node.EventType.TOUCH_END, function () {
                    this.editbox.blur();
                }, this);
            },
            CheckNumber: function CheckNumber(e) {
                gm.UIManager.SendNotification(a.default.MOD_MainView, n.default.UIInfo_ShowClick, e), cc.log(this.editbox.textLabel.string), this.editbox.textLabel.string == this.targetNum ? null != this.rightCallback && this.rightCallback.forEach(function (e) {
                    e.emit();
                }) : null != this.errCallback && this.errCallback.forEach(function (e) {
                    e.emit();
                });
            },
            TextChange: function TextChange(e) {
                cc.log(e);
                var t = Number.parseInt(e);
                isNaN(t) && (t = ""), this.editbox.textLabel.string = t, this.editbox.placeholderLabel.string = t, this.editbox.string = t, cc.log(this.editbox.textLabel.string);
            },
            update: function update(e) {
                cc.log(this.editbox.isFocused());
            }
        }), 
*/