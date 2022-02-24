

// var n = cc._decorator,
// a = n.ccclass,
// o = n.property,
// s = function (e) {
//     function t() {
//         var t = null !== e && e.apply(this, arguments) || this;
//         return t.closeToBottom = !1, t.marginBottomInPx = 0, t;
//     }
//     return __extends(t, e), 
//     t.prototype.onLoad = function () {
//         this.closeToBottom && (this.node.position = cc.v2(this.node.position.x, -this.node.parent.height / 2 + this.node.anchorY * this.node.height + this.marginBottomInPx));
//     }, __decorate([o({
//         tooltip: "\u662F\u5426\u7D27\u8D34\u4E0B\u65B9\uFF0C\u4E0D\u80FD\u548C\u7D27\u8D34\u4E0A\u65B9\u540C\u65F6\u4F7F\u7528"
//     })], t.prototype, "closeToBottom", void 0), __decorate([o({
//         tooltip: "\u8DDD\u79BB\u4E0B\u65B9\u7684\u8DDD\u79BB\uFF08px\uFF09\uFF0C\u5F00\u542F\u7D27\u8D34\u4E0B\u65B9\u65F6\u4F7F\u7528"
//     })], t.prototype, "marginBottomInPx", void 0), t = __decorate([a], t);
// }(cc.Component)
var s=cc.Class({
    extends: cc.Component,
    properties: {
        
    },
    onLoad() {
        this.closeToBottom && (this.node.position = cc.v2(this.node.position.x, -this.node.parent.height / 2 + this.node.anchorY * this.node.height + this.marginBottomInPx));
    }
    // , __decorate([o({
    //     tooltip: "\u662F\u5426\u7D27\u8D34\u4E0B\u65B9\uFF0C\u4E0D\u80FD\u548C\u7D27\u8D34\u4E0A\u65B9\u540C\u65F6\u4F7F\u7528"
    // })], t.prototype, "closeToBottom", void 0), __decorate([o({
    //     tooltip: "\u8DDD\u79BB\u4E0B\u65B9\u7684\u8DDD\u79BB\uFF08px\uFF09\uFF0C\u5F00\u542F\u7D27\u8D34\u4E0B\u65B9\u65F6\u4F7F\u7528"
    // })], t.prototype, "marginBottomInPx", void 0), t = __decorate([a], t);
})
module = s

/*CloseToBorderComponent: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "3abdbhmrDdCkJriJ05hoOMn", "CloseToBorderComponent"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            a = n.ccclass,
            o = n.property,
            s = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.closeToBottom = !1, t.marginBottomInPx = 0, t;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    this.closeToBottom && (this.node.position = cc.v2(this.node.position.x, -this.node.parent.height / 2 + this.node.anchorY * this.node.height + this.marginBottomInPx));
                }, __decorate([o({
                    tooltip: "\u662F\u5426\u7D27\u8D34\u4E0B\u65B9\uFF0C\u4E0D\u80FD\u548C\u7D27\u8D34\u4E0A\u65B9\u540C\u65F6\u4F7F\u7528"
                })], t.prototype, "closeToBottom", void 0), __decorate([o({
                    tooltip: "\u8DDD\u79BB\u4E0B\u65B9\u7684\u8DDD\u79BB\uFF08px\uFF09\uFF0C\u5F00\u542F\u7D27\u8D34\u4E0B\u65B9\u65F6\u4F7F\u7528"
                })], t.prototype, "marginBottomInPx", void 0), t = __decorate([a], t);
            }(cc.Component);
        i.default = s, 
*/