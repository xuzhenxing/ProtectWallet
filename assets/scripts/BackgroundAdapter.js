

// var n = cc._decorator,
// a = n.ccclass,
// o = (n.property, function (e) {
//     function t() {
//         return null !== e && e.apply(this, arguments) || this;
//     }
//     return __extends(t, e), t.prototype.onLoad = function () {
//         var e = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height),
//             t = this.node.width * e,
//             i = this.node.height * e;
//         this.node.scale = Math.max(cc.view.getCanvasSize().width / t, cc.view.getCanvasSize().height / i);
//     }, t = __decorate([a], t);
// }(cc.Component))

var o=cc.Class({
    extends: cc.Component,
    onLoad () {
        var e = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height),
            t = this.node.width * e,
            i = this.node.height * e;
        this.node.scale = Math.max(cc.view.getCanvasSize().width / t, cc.view.getCanvasSize().height / i);
    }
})
module = o 
/*BackgroundAdapter: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9f517FrKuJGK6cO3//gXgqo", "BackgroundAdapter"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            a = n.ccclass,
            o = (n.property, function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    var e = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height),
                        t = this.node.width * e,
                        i = this.node.height * e;
                    this.node.scale = Math.max(cc.view.getCanvasSize().width / t, cc.view.getCanvasSize().height / i);
                }, t = __decorate([a], t);
            }(cc.Component));
        i.default = o, 
*/