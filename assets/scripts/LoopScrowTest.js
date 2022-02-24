var n = require("./LoopScrow");
// a = cc._decorator,
// o = a.ccclass,
// s = a.property,
// r = function (e) {
//     function t() {
//         var t = null !== e && e.apply(this, arguments) || this;
//         return t.loopScrow = null, t.dataCount = 50, t;
//     }
//     return __extends(t, e), t.prototype.start = function () {
//         var e = this;
//         cc.log("LoopScrowTest:"), this.loopScrow.initData(this.dataCount, function (t, i, n) {
//             e.dataCount;
//         });
//     }, __decorate([s(n)], t.prototype, "loopScrow", void 0), t = __decorate([o], t);
// }(cc.Component)
var r=cc.Class({
    extends: cc.Component,
    properties: {
        loopScrow : null,
        dataCount : 50
    },
    start  () {
        var e = this;
        cc.log("LoopScrowTest:"), this.loopScrow.initData(this.dataCount, function (t, i, n) {
            e.dataCount;
        });}
})
module = r 
// var r=cc.Class({
//     extends: cc.Component,
//     properties: {
//         // DEFAULT_RESOLUTION_WIDTH = 720,
//         // DEFAULT_RESOLUTION_HEIGHT = 1280
//     },
// })
/*LoopScrowTest: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "d5a4adKd+FAgreONlSgkxyk", "LoopScrowTest"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = e("./LoopScrow"),
            a = cc._decorator,
            o = a.ccclass,
            s = a.property,
            r = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.loopScrow = null, t.dataCount = 50, t;
                }
                return __extends(t, e), t.prototype.start = function () {
                    var e = this;
                    cc.log("LoopScrowTest:"), this.loopScrow.initData(this.dataCount, function (t, i, n) {
                        e.dataCount;
                    });
                }, __decorate([s(n.default)], t.prototype, "loopScrow", void 0), t = __decorate([o], t);
            }(cc.Component);
        i.LoopScrowTest = r, 
*/